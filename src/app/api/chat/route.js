// app/api/chat/route.js
//
// PowerTrack SL - Gemini-powered assistant endpoint.
//
// - Reads GEMINI_API_KEY from the server environment (.env.local -> GEMINI_API_KEY=...)
// - Never exposes the key to the client - this file only runs on the server.
// - Grounds Gemini's answer in the app's live mock context (tariff blocks,
//   usage snapshot, appliance breakdown, available optimization actions) so
//   answers stay consistent with what's shown on screen.
// - Forces a strict JSON response shape so the client can render it exactly
//   like the existing local mock-engine replies (text / bullets / hasAction / actionId).
// - On any failure (missing key, quota exhausted / 429, network error, bad
//   JSON from the model) it returns a non-200 response. The client is
//   responsible for falling back to the local rule-based engine in that case
//   - see fetchAssistantReply() in the component.

import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const VALID_ACTION_IDS = [
  'ac-peak',
  'phantom',
  'heater',
  'wash-offpeak',
  'fridge-seal',
  'lighting-led',
];

function buildSystemPrompt({ usage, appliances, advice }) {
  return `You are "PowerTrack Assistant", an AI energy advisor embedded in a Sri Lankan household electricity bill tracking app called PowerTrack SL. You help users understand their CEB (Ceylon Electricity Board) electricity usage, forecast bills, and give practical, appliance-specific energy-saving advice for their home.

CONTEXT - current billing cycle snapshot (JSON):
${JSON.stringify(usage, null, 2)}

CONTEXT - appliance-level breakdown, units used this cycle (JSON):
${JSON.stringify(appliances, null, 2)}

CONTEXT - available optimization actions the user can apply from the UI (JSON):
${JSON.stringify(
  (advice || []).map((a) => ({
    id: a.id,
    title: a.title,
    estSavingLKR: a.estSavingLKR,
    estSavingUnits: a.estSavingUnits,
  })),
  null,
  2
)}

CEB domestic tariff blocks (LKR per unit): 0-30 @ 8.00, 31-60 @ 10.00, 61-90 @ 27.75, 91-120 @ 32.00, 121-180 @ 44.55, 181+ @ 55.86.

Rules:
- Keep replies short, concrete, and specific to the numbers above - don't invent data that contradicts the context.
- If your advice matches one of the available optimization actions, set hasAction to true and actionId to that action's id so the UI can show an "Apply" button. Otherwise set hasAction to false and actionId to null.
- Reply in STRICT JSON only - no markdown code fences, no commentary outside the JSON object. Match this exact schema:

{
  "text": "string - main reply, 1-3 sentences",
  "bullets": ["short string", "short string"],
  "hasAction": boolean,
  "actionId": "one of ${VALID_ACTION_IDS.join(', ')}, or null"
}

"bullets" may be an empty array if a bullet list isn't useful for this answer.`;
}

export async function POST(request) {
  const apiKey = process.env.GEMINI_API_KEY;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { query, usage, appliances, advice } = body || {};

  if (!query || typeof query !== 'string' || !query.trim()) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 });
  }

  if (!apiKey) {
    // Not configured - client should fall back to the local mock engine.
    return NextResponse.json(
      { error: 'GEMINI_API_KEY not configured on the server' },
      { status: 503 }
    );
  }

  const systemPrompt = buildSystemPrompt({ usage, appliances, advice });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\nUser question: ${query}` }],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          responseMimeType: 'application/json',
        },
      }),
    });

    clearTimeout(timeoutId);

    if (!geminiRes.ok) {
      const errText = await geminiRes.text().catch(() => '');
      // 429 usually means the free-tier quota / rate limit is exhausted.
      console.error('Gemini API error:', geminiRes.status, errText);
      return NextResponse.json(
        { error: 'Gemini request failed', status: geminiRes.status },
        { status: 502 }
      );
    }

    const data = await geminiRes.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      return NextResponse.json({ error: 'Empty Gemini response' }, { status: 502 });
    }

    let parsed;
    try {
      parsed = JSON.parse(rawText);
    } catch {
      // Model returned non-JSON text - still show it rather than failing outright.
      parsed = { text: rawText.trim(), bullets: [], hasAction: false, actionId: null };
    }

    const actionId = VALID_ACTION_IDS.includes(parsed.actionId) ? parsed.actionId : null;

    return NextResponse.json({
      text: parsed.text || "Here's what I found.",
      bullets: Array.isArray(parsed.bullets) ? parsed.bullets.slice(0, 4) : [],
      hasAction: Boolean(parsed.hasAction) && Boolean(actionId),
      actionId,
      source: 'gemini',
    });
  } catch (err) {
    clearTimeout(timeoutId);
    console.error('Gemini call failed:', err);
    return NextResponse.json({ error: 'Gemini call failed' }, { status: 502 });
  }
}