// // 'use client';

// // import React, { useState, useEffect, useRef } from 'react';
// // import { 
// //   Zap, 
// //   LayoutDashboard, 
// //   Receipt, 
// //   Tv, 
// //   Sparkles, 
// //   Settings, 
// //   HelpCircle, 
// //   Send, 
// //   Bot, 
// //   User, 
// //   MoreVertical, 
// //   ChevronRight, 
// //   AlertTriangle, 
// //   Check, 
// //   Lightbulb, 
// //   TrendingUp, 
// //   Trash2, 
// //   RefreshCw,
// //   Info,
// //   ShieldCheck,
// //   ChevronDown
// // } from 'lucide-react';

// // export default function AiInsights() {
// //   // Navigation State
// //   const [activeTab, setActiveTab] = useState('ai-insights');

// //   // Interactive UI States
// //   const [scheduleApplied, setScheduleApplied] = useState(false);
// //   const [isGenerating, setIsGenerating] = useState(false);
// //   const [selectedQuickPrompt, setSelectedQuickPrompt] = useState(null);

// //   // Form & Chat State
// //   const [inputMessage, setInputMessage] = useState('');
// //   const [messages, setMessages] = useState([
// //     {
// //       id: 1,
// //       sender: 'bot',
// //       text: "Hello! I've analyzed your energy usage for this week. It looks like you're on track to hit the 61-90 unit CEB tier.",
// //       timestamp: '10:14 AM'
// //     },
// //     {
// //       id: 2,
// //       sender: 'user',
// //       text: "How can I keep my bill under LKR 8000 this month?",
// //       timestamp: '10:15 AM'
// //     },
// //     {
// //       id: 3,
// //       sender: 'bot',
// //       text: "To stay under LKR 8,000, you need to reduce consumption by approximately 12 units before the 25th.\n\nHere are tailored actions for your home:",
// //       bulletPoints: [
// //         "Limit A/C usage in the Master Bedroom to 2 hours/night. (Est. saving: 6 units)",
// //         "Run the washing machine only on weekends during off-peak hours. (Est. saving: 4 units)",
// //         "Turn off the water pump manually instead of waiting for the auto-shutoff; it currently runs 10 mins extra daily. (Est. saving: 2 units)"
// //       ],
// //       hasAction: true,
// //       actionType: 'ac_schedule',
// //       timestamp: '10:15 AM'
// //     }
// //   ]);

// //   const chatEndRef = useRef(null);

// //   // Auto-scroll chat to bottom
// //   const scrollToBottom = () => {
// //     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
// //   };

// //   useEffect(() => {
// //     scrollToBottom();
// //   }, [messages, isGenerating]);

// //   // Handle Quick Prompt Clicks
// //   const handleQuickPrompt = (promptText) => {
// //     setInputMessage(promptText);
// //   };

// //   // Apply Schedule Action Trigger
// //   const handleApplySchedule = () => {
// //     setScheduleApplied(true);
// //     setMessages(prev => [
// //       ...prev,
// //       {
// //         id: Date.now(),
// //         sender: 'bot',
// //         text: "✅ Optimised A/C Smart Schedule applied! Your thermostat will now shift cooling cycles automatically during peak hours (10 PM - 5 AM).",
// //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
// //       }
// //     ]);
// //   };

// //   // Send Message Handler (Integrates Gemini API or Fallback Demonstration Engine)
// //   const handleSendMessage = async (e) => {
// //     e.preventDefault();
// //     if (!inputMessage.trim()) return;

// //     const userText = inputMessage.trim();
// //     const newUserMsg = {
// //       id: Date.now(),
// //       sender: 'user',
// //       text: userText,
// //       timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
// //     };

// //     setMessages(prev => [...prev, newUserMsg]);
// //     setInputMessage('');
// //     setIsGenerating(true);

// //     const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

// //     if (apiKey) {
// //       try {
// //         const response = await fetch(
// //           `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
// //           {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify({
// //               contents: [
// //                 {
// //                   role: 'user',
// //                   parts: [
// //                     {
// //                       text: `You are PowerTrack SL Assistant, an expert AI energy manager for Sri Lankan households adhering strictly to Ceylon Electricity Board (CEB) tariff tiers (0-30, 31-60, 61-90, 91-120, 121-180, >180). Provide helpful, precise, concise advice in LKR and kWh units.\n\nUser Question: ${userText}`
// //                     }
// //                   ]
// //                 }
// //               ]
// //             })
// //           }
// //         );

// //         const data = await response.json();
// //         const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I have analyzed your request based on CEB current tariffs. Consider shifting your water pump and heavy power appliances to off-peak periods to avoid jumping into higher cost slabs.";

// //         setMessages(prev => [
// //           ...prev,
// //           {
// //             id: Date.now() + 1,
// //             sender: 'bot',
// //             text: botReply,
// //             timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
// //           }
// //         ]);
// //       } catch (err) {
// //         console.error("Gemini API Error:", err);
// //         generateFallbackResponse(userText);
// //       } finally {
// //         setIsGenerating(false);
// //       }
// //     } else {
// //       // Demonstration Mode when API key is not present
// //       setTimeout(() => {
// //         generateFallbackResponse(userText);
// //         setIsGenerating(false);
// //       }, 1200);
// //     }
// //   };

// //   // Mock responses tailored for Sri Lankan CEB energy demonstration
// //   const generateFallbackResponse = (query) => {
// //     let replyText = "";
// //     let bullets = null;

// //     const lower = query.toLowerCase();

// //     if (lower.includes('yesterday') || lower.includes('analyze')) {
// //       replyText = "Yesterday's total consumption was 11.2 kWh (approx. LKR 340).";
// //       bullets = [
// //         "Peak hour spike observed between 7:30 PM - 9:00 PM (A/C & Rice Cooker simultaneous load).",
// //         "Standby power consumed 0.8 kWh throughout the night.",
// //         "Recommendation: Delay washing machine cycle by 1 hour to stay out of the 61-90 unit bracket."
// //       ];
// //     } else if (lower.includes('solar') || lower.includes('projection')) {
// //       replyText = "Based on your 420 kWh average monthly usage, a 3 kW On-Grid Solar System would yield:";
// //       bullets = [
// //         "Estimated Monthly Generation: ~360 kWh",
// //         "Estimated Monthly Savings: ~LKR 18,500",
// //         "Payback Period: Approx. 3.2 Years based on current CEB net-metering tariffs."
// //       ];
// //     } else {
// //       replyText = `Regarding "${query}": To keep your household within lower CEB tariff slabs, monitor your high-wattage appliances (A/C, Water Heater, Irons). Shaving just 1.5 units daily saves ~LKR 1,200/month on current rates.`;
// //     }

// //     setMessages(prev => [
// //       ...prev,
// //       {
// //         id: Date.now(),
// //         sender: 'bot',
// //         text: replyText,
// //         bulletPoints: bullets,
// //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
// //       }
// //     ]);
// //   };

// //   const clearChat = () => {
// //     setMessages([
// //       {
// //         id: Date.now(),
// //         sender: 'bot',
// //         text: "Chat cleared. Ask me anything about your household electricity usage or CEB bill forecasts!",
// //         timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
// //       }
// //     ]);
// //   };

// //   return (
// //     <div className="min-h-screen bg-[#0B1326] text-slate-100 flex items-center justify-center p-2 sm:p-4 md:p-6 font-sans">
      
// //       {/* Outer Dashboard Shell */}
// //       <div className="w-full max-w-[1280px] h-[860px] bg-[#0F172A] border border-slate-800/80 rounded-2xl shadow-2xl flex overflow-hidden">
        
// //         {/* ========================================== */}
// //         {/* SIDEBAR NAVIGATION                         */}
// //         {/* ========================================== */}
// //         <aside className="w-60 bg-[#0B1326]/60 border-r border-slate-800/80 flex flex-col justify-between p-4 shrink-0 hidden md:flex">
// //           <div>
// //             {/* Logo */}
// //             <div className="flex items-center gap-2.5 px-3 py-2 mb-8 text-[#10DB91] font-bold text-lg tracking-tight">
// //               <Zap className="w-6 h-6 fill-[#10DB91]" />
// //               <div className="flex flex-col">
// //                 <span className="leading-tight text-white font-extrabold text-base">PowerTrack <span className="text-[#10DB91]">SL</span></span>
// //                 <span className="text-[10px] text-slate-400 font-normal">Smart Energy Management</span>
// //               </div>
// //             </div>

// //             {/* Main Menu Links */}
// //             <nav className="space-y-1.5">
// //               <button 
// //                 onClick={() => setActiveTab('dashboard')}
// //                 className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
// //                   activeTab === 'dashboard' ? 'bg-[#10DB91] text-slate-950 shadow-md shadow-[#10DB91]/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
// //                 }`}
// //               >
// //                 <LayoutDashboard className="w-4 h-4" />
// //                 <span>Dashboard</span>
// //               </button>

// //               <button 
// //                 onClick={() => setActiveTab('bills')}
// //                 className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
// //                   activeTab === 'bills' ? 'bg-[#10DB91] text-slate-950 shadow-md shadow-[#10DB91]/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
// //                 }`}
// //               >
// //                 <Receipt className="w-4 h-4" />
// //                 <span>Bills</span>
// //               </button>

// //               <button 
// //                 onClick={() => setActiveTab('appliances')}
// //                 className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
// //                   activeTab === 'appliances' ? 'bg-[#10DB91] text-slate-950 shadow-md shadow-[#10DB91]/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
// //                 }`}
// //               >
// //                 <Tv className="w-4 h-4" />
// //                 <span>Appliances</span>
// //               </button>

// //               <button 
// //                 onClick={() => setActiveTab('ai-insights')}
// //                 className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
// //                   activeTab === 'ai-insights' ? 'bg-[#10DB91] text-slate-950 shadow-lg shadow-[#10DB91]/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
// //                 }`}
// //               >
// //                 <Sparkles className="w-4 h-4" />
// //                 <span>AI Insights</span>
// //               </button>
// //             </nav>
// //           </div>

// //           {/* Bottom Settings & Support Links */}
// //           <div className="space-y-1.5 pt-4 border-t border-slate-800/60">
// //             <button 
// //               onClick={() => setActiveTab('settings')}
// //               className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800/40 hover:text-white transition-all"
// //             >
// //               <Settings className="w-4 h-4" />
// //               <span>Settings</span>
// //             </button>

// //             <button 
// //               onClick={() => setActiveTab('support')}
// //               className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800/40 hover:text-white transition-all"
// //             >
// //               <HelpCircle className="w-4 h-4" />
// //               <span>Support</span>
// //             </button>
// //           </div>
// //         </aside>

// //         {/* ========================================== */}
// //         {/* MAIN BODY AREA                             */}
// //         {/* ========================================== */}
// //         <main className="flex-1 flex flex-col min-w-0 bg-[#0F172A] overflow-hidden">
          
// //           {/* Top Header */}
// //           <header className="h-14 border-b border-slate-800/80 px-6 flex items-center justify-between shrink-0 bg-[#0F172A]">
// //             <div className="flex items-center gap-2">
// //               <h1 className="text-base font-bold text-white tracking-wide">AI Insights & Assistant</h1>
// //               <span className="px-2 py-0.5 rounded-full bg-[#10DB91]/10 text-[#10DB91] text-[10px] font-semibold border border-[#10DB91]/30">
// //                 CEB Live Sync
// //               </span>
// //             </div>

// //             <div className="flex items-center gap-3">
// //               <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300">
// //                 <span className="w-2 h-2 rounded-full bg-[#10DB91] animate-pulse"></span>
// //                 <span>Tariff Cycle: <b>Feb 2026</b></span>
// //               </div>
// //             </div>
// //           </header>

// //           {/* Grid Layout: Left Cards + Right Chatbot */}
// //           <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
            
// //             {/* ========================================== */}
// //             {/* LEFT COLUMN: Cost Predictions & Advice    */}
// //             {/* ========================================== */}
// //             <section className="lg:col-span-5 border-r border-slate-800/80 p-5 flex flex-col gap-5 overflow-y-auto custom-scrollbar bg-[#0F172A]/50">
              
// //               {/* Card 1: Cost Predictions */}
// //               <div className="bg-[#0B1326] border border-slate-800 rounded-xl p-5 shadow-lg relative overflow-hidden">
// //                 <div className="flex items-center justify-between mb-3">
// //                   <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm">
// //                     <TrendingUp className="w-4 h-4 text-[#36B6D4]" />
// //                     <span>Cost Predictions</span>
// //                   </div>
// //                   <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">CEB Tariff</span>
// //                 </div>

// //                 <p className="text-xs text-slate-400 leading-snug mb-4">
// //                   Estimated CEB Bill for current billing cycle.
// //                 </p>

// //                 {/* Amount Display */}
// //                 <div className="flex items-baseline gap-2 mb-4">
// //                   <span className="text-2xl font-black text-[#10DB91]">LKR</span>
// //                   <span className="text-4xl font-extrabold text-white tracking-tight">8,450</span>
// //                   <span className="text-xs font-semibold text-slate-400 ml-1">/ month</span>
// //                 </div>

// //                 {/* CEB Slab Progress Bar */}
// //                 <div className="space-y-1.5">
// //                   <div className="flex justify-between text-[11px] font-medium text-slate-400">
// //                     <span>Current Tier: <b>61-90 Units</b></span>
// //                     <span className="text-[#F9BE0B] font-semibold">Next Tier at 91 Units</span>
// //                   </div>

// //                   <div className="w-full h-2.5 bg-slate-800 rounded-full flex overflow-hidden p-0.5 border border-slate-700/50">
// //                     <div className="h-full bg-[#10DB91] w-[33%] rounded-l-full" title="0-30 Units"></div>
// //                     <div className="h-full bg-[#36B6D4] w-[33%]" title="31-60 Units"></div>
// //                     <div className="h-full bg-[#F9BE0B] w-[25%]" title="61-90 Units"></div>
// //                     <div className="h-full bg-slate-700 w-[9%]" title="91-120 Units (Unreached)"></div>
// //                   </div>

// //                   <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
// //                     <span>0-30</span>
// //                     <span>31-60</span>
// //                     <span className="text-[#F9BE0B] font-bold">61-90</span>
// //                     <span>91+</span>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Card 2: Optimization Advice */}
// //               <div className="flex-1 bg-[#0B1326] border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col">
// //                 <div className="flex items-center gap-2 text-slate-300 font-semibold text-sm mb-4">
// //                   <Lightbulb className="w-4 h-4 text-[#F9BE0B]" />
// //                   <span>Optimization Advice</span>
// //                 </div>

// //                 <div className="space-y-3 flex-1 overflow-y-auto pr-1">
                  
// //                   {/* Advice Item 1 */}
// //                   <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all group cursor-pointer">
// //                     <div className="flex items-center justify-between mb-1">
// //                       <h4 className="text-xs font-bold text-slate-200 group-hover:text-[#10DB91] transition-colors flex items-center gap-1.5">
// //                         <span>A/C Usage Peak</span>
// //                       </h4>
// //                       <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
// //                     </div>
// //                     <p className="text-[11px] text-slate-400 leading-relaxed">
// //                       Shift cooling to off-peak hours (10 PM - 5 AM) to save <b className="text-white">~LKR 1,200</b>.
// //                     </p>
// //                   </div>

// //                   {/* Advice Item 2 */}
// //                   <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all group cursor-pointer">
// //                     <div className="flex items-center justify-between mb-1">
// //                       <h4 className="text-xs font-bold text-slate-200 group-hover:text-[#36B6D4] transition-colors flex items-center gap-1.5">
// //                         <span>Phantom Load</span>
// //                       </h4>
// //                       <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
// //                     </div>
// //                     <p className="text-[11px] text-slate-400 leading-relaxed">
// //                       Entertainment center is drawing 15W while off. Unplug to optimize.
// //                     </p>
// //                   </div>

// //                   {/* Advice Item 3 */}
// //                   <div className="p-3.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all group cursor-pointer">
// //                     <div className="flex items-center justify-between mb-1">
// //                       <h4 className="text-xs font-bold text-slate-200 group-hover:text-[#F9BE0B] transition-colors flex items-center gap-1.5">
// //                         <span>Water Heater</span>
// //                       </h4>
// //                       <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
// //                     </div>
// //                     <p className="text-[11px] text-slate-400 leading-relaxed">
// //                       Reduce thermostat from 60°C to 50°C. High impact on current slab.
// //                     </p>
// //                   </div>

// //                 </div>
// //               </div>

// //             </section>

// //             {/* ========================================== */}
// //             {/* RIGHT COLUMN: PowerTrack Assistant Chatbot */}
// //             {/* ========================================== */}
// //             <section className="lg:col-span-7 flex flex-col bg-[#0F172A] relative overflow-hidden">
              
// //               {/* Chatbot Header */}
// //               <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-[#0F172A]/90 backdrop-blur">
// //                 <div className="flex items-center gap-3">
// //                   <div className="w-9 h-9 rounded-full bg-[#10DB91]/20 border border-[#10DB91]/40 flex items-center justify-center text-[#10DB91]">
// //                     <Bot className="w-5 h-5" />
// //                   </div>
// //                   <div>
// //                     <h3 className="text-sm font-bold text-white leading-tight">PowerTrack Assistant</h3>
// //                     <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
// //                       <span>Powered by Gemini AI</span>
// //                       <span className="inline-block w-1 h-1 rounded-full bg-[#10DB91]"></span>
// //                     </p>
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center gap-1">
// //                   <button 
// //                     onClick={clearChat}
// //                     title="Clear Conversation"
// //                     className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors"
// //                   >
// //                     <Trash2 className="w-4 h-4" />
// //                   </button>
// //                   <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 transition-colors">
// //                     <MoreVertical className="w-4 h-4" />
// //                   </button>
// //                 </div>
// //               </div>

// //               {/* Chat Message Stream */}
// //               <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 custom-scrollbar">
                
// //                 {messages.map((msg) => (
// //                   <div 
// //                     key={msg.id} 
// //                     className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
// //                   >
// //                     {/* Avatar */}
// //                     <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
// //                       msg.sender === 'user' 
// //                         ? 'bg-[#36B6D4] text-slate-950 font-bold text-xs' 
// //                         : 'bg-[#10DB91]/20 text-[#10DB91] border border-[#10DB91]/30'
// //                     }`}>
// //                       {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-3.5 h-3.5" />}
// //                     </div>

// //                     {/* Bubble Content */}
// //                     <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
// //                       msg.sender === 'user'
// //                         ? 'bg-[#36B6D4] text-slate-950 font-medium rounded-tr-none'
// //                         : 'bg-[#0B1326] text-slate-200 border border-slate-800 rounded-tl-none shadow-md'
// //                     }`}>
// //                       <p className="whitespace-pre-line">{msg.text}</p>

// //                       {/* Rendered Bullet Points if present */}
// //                       {msg.bulletPoints && (
// //                         <ul className="mt-2.5 space-y-2 border-t border-slate-800/80 pt-2.5 text-slate-300">
// //                           {msg.bulletPoints.map((pt, idx) => (
// //                             <li key={idx} className="flex items-start gap-2">
// //                               <span className="text-[#10DB91] mt-0.5">•</span>
// //                               <span>{pt}</span>
// //                             </li>
// //                           ))}
// //                         </ul>
// //                       )}

// //                       {/* Action Button inside Bot Message */}
// //                       {msg.hasAction && msg.actionType === 'ac_schedule' && (
// //                         <div className="mt-3.5 pt-2 border-t border-slate-800/80">
// //                           <button
// //                             onClick={handleApplySchedule}
// //                             disabled={scheduleApplied}
// //                             className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
// //                               scheduleApplied 
// //                                 ? 'bg-slate-800 text-slate-400 cursor-default border border-slate-700' 
// //                                 : 'bg-[#10DB91] hover:bg-[#0ece87] text-slate-950 shadow-md shadow-[#10DB91]/20 cursor-pointer active:scale-95'
// //                             }`}
// //                           >
// //                             {scheduleApplied ? (
// //                               <>
// //                                 <Check className="w-3.5 h-3.5 text-[#10DB91]" />
// //                                 <span>Schedule Applied</span>
// //                               </>
// //                             ) : (
// //                               <span>Apply A/C Schedule</span>
// //                             )}
// //                           </button>
// //                         </div>
// //                       )}

// //                       <span className={`block text-[9px] mt-1.5 text-right ${
// //                         msg.sender === 'user' ? 'text-slate-800' : 'text-slate-500'
// //                       }`}>
// //                         {msg.timestamp}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 ))}

// //                 {/* AI Generating Loader Indicator */}
// //                 {isGenerating && (
// //                   <div className="flex items-start gap-3">
// //                     <div className="w-7 h-7 rounded-full bg-[#10DB91]/20 text-[#10DB91] border border-[#10DB91]/30 flex items-center justify-center">
// //                       <Bot className="w-3.5 h-3.5" />
// //                     </div>
// //                     <div className="bg-[#0B1326] border border-slate-800 text-slate-400 rounded-2xl rounded-tl-none px-4 py-3 text-xs flex items-center gap-2 shadow-md">
// //                       <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#10DB91]" />
// //                       <span>Analyzing CEB usage patterns...</span>
// //                     </div>
// //                   </div>
// //                 )}

// //                 <div ref={chatEndRef} />
// //               </div>

// //               {/* Quick Prompts & Chat Input Form */}
// //               <div className="p-4 border-t border-slate-800/80 bg-[#0B1326]/60">
                
// //                 {/* Quick Action Suggestion Chips */}
// //                 <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
// //                   <button
// //                     onClick={() => handleQuickPrompt("Analyze yesterday's usage")}
// //                     className="px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700/60 whitespace-nowrap transition-colors"
// //                   >
// //                     "Analyze yesterday's usage"
// //                   </button>
// //                   <button
// //                     onClick={() => handleQuickPrompt("Solar projection")}
// //                     className="px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700/60 whitespace-nowrap transition-colors"
// //                   >
// //                     "Solar projection"
// //                   </button>
// //                   <button
// //                     onClick={() => handleQuickPrompt("CEB Tariff Slabs")}
// //                     className="px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-medium border border-slate-700/60 whitespace-nowrap transition-colors"
// //                   >
// //                     "CEB Tariff Slabs"
// //                   </button>
// //                 </div>

// //                 {/* Input Field */}
// //                 <form onSubmit={handleSendMessage} className="relative flex items-center">
// //                   <input
// //                     type="text"
// //                     value={inputMessage}
// //                     onChange={(e) => setInputMessage(e.target.value)}
// //                     placeholder="Ask about your energy usage..."
// //                     className="w-full bg-[#0F172A] border border-slate-800 rounded-xl pl-4 pr-12 py-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#10DB91] focus:ring-1 focus:ring-[#10DB91] transition-all"
// //                   />
// //                   <button
// //                     type="submit"
// //                     disabled={!inputMessage.trim() || isGenerating}
// //                     className="absolute right-2 p-2 rounded-lg bg-[#10DB91] hover:bg-[#0ece87] disabled:opacity-40 disabled:hover:bg-[#10DB91] text-slate-950 transition-all cursor-pointer"
// //                   >
// //                     <Send className="w-4 h-4 fill-slate-950" />
// //                   </button>
// //                 </form>

// //               </div>

// //             </section>

// //           </div>
// //         </main>

// //       </div>
// //     </div>
// //   );
// // }

// 'use client';

// /**
//  * ============================================================================
//  *  PowerTrack SL-AI Insights & Assistant (MOCK-DATA EDITION)
//  * ============================================================================
//  *
//  *  This file is 100% self-contained and 100% mock data:
//  *    - There is NO fetch() call anywhere in this file.
//  *    - There is NO API key, NO env variable, NO network request of any kind.
//  *    - The "AI" replies come from a local, keyword-driven response engine
//  *      (see `generateAssistantReply` below) so the whole experience works
//  *      offline, in a sandbox, or in front of examiners with zero setup.
//  *
//  *  Scope, per request:
//  *    - No sidebar. This is the dashboard panel only (header + the two-column
//  *      "Cost Predictions / Optimization Advice" + "PowerTrack Assistant chat"
//  *      layout from the reference screenshot).
//  *    - Single component, single file, Next.js (JS) + Tailwind CSS.
//  *    - Uses lucide-react for icons (already a supported/available package).
//  *
//  *  Drop-in usage:
//  *
//  *    import AIInsightsDashboard from "@/components/chatbot";
//  *    export default function Page() {
//  *      return <AIInsightsDashboard />;
//  *    }
//  *
//  *  Everything below-tariff data, appliance data, advice, chat replies-is
//  *  demonstration data for the IS5107 practicum presentation. Swap the
//  *  constants and `generateAssistantReply` out for real API calls once the
//  *  backend team's endpoints exist; the component's shape won't need to change.
//  * ============================================================================
//  */

// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Zap,
//   TrendingUp,
//   Lightbulb,
//   ChevronRight,
//   ChevronDown,
//   Bot,
//   User,
//   Send,
//   Trash2,
//   MoreVertical,
//   Check,
//   RefreshCw,
//   AlertTriangle,
//   Info,
//   ShieldCheck,
//   Flame,
//   Droplets,
//   WashingMachine,
//   Refrigerator,
//   Tv,
//   Lamp,
//   Sun,
//   BatteryCharging,
//   CalendarClock,
//   Sparkles,
// } from 'lucide-react';

// /* ============================================================================
//  * 1. MOCK DATA-CEB TARIFF STRUCTURE
//  * ==========================================================================*/

// // Ceylon Electricity Board domestic tariff blocks used purely for the demo.
// // (Rates are illustrative, not the live CEB schedule.)
// const CEB_TARIFF_BLOCKS = [
//   { id: 'b1', label: '0-30', from: 0, to: 30, rate: 8.0, color: '#10DB91' },
//   { id: 'b2', label: '31-60', from: 31, to: 60, rate: 10.0, color: '#36B6D4' },
//   { id: 'b3', label: '61-90', from: 61, to: 90, rate: 27.75, color: '#F9BE0B' },
//   { id: 'b4', label: '91-120', from: 91, to: 120, rate: 32.0, color: '#F9BE0B' },
//   { id: 'b5', label: '121-180', from: 121, to: 180, rate: 44.55, color: '#F2555A' },
//   { id: 'b6', label: '181+', from: 181, to: Infinity, rate: 55.86, color: '#F2555A' },
// ];

// // The household's current mock billing-cycle snapshot.
// const MOCK_USAGE_SNAPSHOT = {
//   unitsThisCycle: 72,
//   cycleLabel: 'Feb 2026',
//   daysElapsed: 18,
//   daysInCycle: 30,
//   projectedUnits: 91,
//   projectedBillLKR: 8450,
//   lastMonthBillLKR: 7120,
//   targetBillLKR: 8000,
//   nextTierAt: 91,
// };

// // Appliance-level mock breakdown, ordered by consumption share.
// const MOCK_APPLIANCES = [
//   { id: 'ac', name: 'A/C-Master Bedroom', icon: 'ac', units: 24.5, share: 0.34 },
//   { id: 'heater', name: 'Water Heater', icon: 'heater', units: 11.5, share: 0.16 },
//   { id: 'fridge', name: 'Refrigerator', icon: 'fridge', units: 13.0, share: 0.18 },
//   { id: 'wash', name: 'Washing Machine', icon: 'wash', units: 6.5, share: 0.09 },
//   { id: 'tv', name: 'Entertainment Center', icon: 'tv', units: 5.0, share: 0.07 },
//   { id: 'lights', name: 'Lighting (whole house)', icon: 'lights', units: 5.8, share: 0.08 },
//   { id: 'other', name: 'Other devices', icon: 'other', units: 5.7, share: 0.08 },
// ];

// /* ============================================================================
//  * 2. MOCK DATA-OPTIMIZATION ADVICE
//  * ==========================================================================*/

// const OPTIMIZATION_ADVICE = [
//   {
//     id: 'ac-peak',
//     title: 'A/C Usage Peak',
//     severity: 'tertiary',
//     icon: 'ac',
//     summary: 'Shift cooling to off-peak hours (10 PM - 5 AM) to save ~LKR 1,200.',
//     detail:
//       'Your Master Bedroom A/C runs heaviest 7-9 PM, overlapping the CEB peak window. Shifting two hours of runtime to after 10 PM keeps the room just as cool at a lower effective rate.',
//     estSavingLKR: 1200,
//     estSavingUnits: 6,
//     actionLabel: 'Apply A/C Schedule',
//     actionAppliedLabel: 'Schedule Applied',
//   },
//   {
//     id: 'phantom',
//     title: 'Phantom Load',
//     severity: 'secondary',
//     icon: 'tv',
//     summary: 'Entertainment center is drawing 15W while off. Unplug to optimize.',
//     detail:
//       'Standby draw from the TV, soundbar, and set-top box quietly adds ~11 units a month even when nothing is switched on. A single switched power strip removes this entirely.',
//     estSavingLKR: 340,
//     estSavingUnits: 3,
//     actionLabel: 'Set Standby Reminder',
//     actionAppliedLabel: 'Reminder Set',
//   },
//   {
//     id: 'heater',
//     title: 'Water Heater',
//     severity: 'danger',
//     icon: 'heater',
//     summary: 'Reduce thermostat from 60°C to 50°C. High impact on current slab.',
//     detail:
//       'The water heater is your second largest load this cycle. Lowering the thermostat by 10°C typically cuts heating energy by 12-15% with no noticeable comfort loss.',
//     estSavingLKR: 950,
//     estSavingUnits: 5,
//     actionLabel: 'Adjust Thermostat Target',
//     actionAppliedLabel: 'Target Adjusted',
//   },
//   {
//     id: 'wash-offpeak',
//     title: 'Washing Machine Timing',
//     severity: 'primary',
//     icon: 'wash',
//     summary: 'Run wash cycles on weekends during off-peak hours to save ~4 units.',
//     detail:
//       'Weekday evening loads land in the most expensive tariff block. Moving laundry to Saturday or Sunday mornings avoids peak pricing without changing your routine much.',
//     estSavingLKR: 260,
//     estSavingUnits: 4,
//     actionLabel: 'Add Weekend Reminder',
//     actionAppliedLabel: 'Reminder Added',
//   },
//   {
//     id: 'fridge-seal',
//     title: 'Refrigerator Door Seal',
//     severity: 'secondary',
//     icon: 'fridge',
//     summary: 'Door seal is letting in warm air, forcing the compressor to overwork.',
//     detail:
//       'A worn gasket lets warm air leak in, so the compressor cycles more often than it should. A LKR 1,500 seal replacement typically pays for itself within two months.',
//     estSavingLKR: 420,
//     estSavingUnits: 2.5,
//     actionLabel: 'Schedule Maintenance Check',
//     actionAppliedLabel: 'Check Scheduled',
//   },
//   {
//     id: 'lighting-led',
//     title: 'Lighting Upgrade',
//     severity: 'primary',
//     icon: 'lights',
//     summary: 'Two rooms still use CFL bulbs-switching to LED saves ~3 units/month.',
//     detail:
//       'The living room and kitchen still run older CFL bulbs. LED equivalents use roughly 60% less energy for the same brightness and last far longer.',
//     estSavingLKR: 210,
//     estSavingUnits: 3,
//     actionLabel: 'Add to Shopping List',
//     actionAppliedLabel: 'Added to List',
//   },
// ];

// /* ============================================================================
//  * 3. MOCK DATA-CHAT: QUICK PROMPTS + INITIAL MESSAGES
//  * ==========================================================================*/

// const QUICK_PROMPTS = [
//   "Analyze yesterday's usage",
//   'Solar projection',
//   'CEB tariff slabs',
//   'How can I keep my bill under LKR 8000 this month?',
// ];

// const INITIAL_MESSAGES = [
//   {
//     id: 'm-seed-1',
//     sender: 'bot',
//     text:
//       "Hello! I've analyzed your energy usage for this week. It looks like you're on track to hit the 61-90 unit CEB tier.",
//     timestamp: '09:12 AM',
//   },
// ];

// /* ============================================================================
//  * 4. SMALL HELPERS
//  * ==========================================================================*/

// function cx(...parts) {
//   return parts.filter(Boolean).join(' ');
// }

// function formatLKR(n) {
//   const rounded = Math.round(n);
//   return `LKR ${rounded.toLocaleString('en-LK')}`;
// }

// function nowTime() {
//   return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// }

// function findActiveTariffBlock(units) {
//   return (
//     CEB_TARIFF_BLOCKS.find((b) => units >= b.from && units <= b.to) ||
//     CEB_TARIFF_BLOCKS[CEB_TARIFF_BLOCKS.length - 1]
//   );
// }

// // Maps an advice/appliance "icon" key to a lucide-react component.
// function ApplianceIcon({ name, className }) {
//   switch (name) {
//     case 'ac':
//       return <BatteryCharging className={className} />;
//     case 'heater':
//       return <Flame className={className} />;
//     case 'fridge':
//       return <Refrigerator className={className} />;
//     case 'wash':
//       return <WashingMachine className={className} />;
//     case 'tv':
//       return <Tv className={className} />;
//     case 'lights':
//       return <Lamp className={className} />;
//     default:
//       return <Zap className={className} />;
//   }
// }

// const SEVERITY_STYLES = {
//   primary: { dot: 'bg-[#10DB91]', text: 'text-[#10DB91]', ring: 'border-[#10DB91]/30' },
//   secondary: { dot: 'bg-[#36B6D4]', text: 'text-[#36B6D4]', ring: 'border-[#36B6D4]/30' },
//   tertiary: { dot: 'bg-[#F9BE0B]', text: 'text-[#F9BE0B]', ring: 'border-[#F9BE0B]/30' },
//   danger: { dot: 'bg-[#F2555A]', text: 'text-[#F2555A]', ring: 'border-[#F2555A]/30' },
// };

// /* ============================================================================
//  * 5. MOCK AI RESPONSE ENGINE
//  * ----------------------------------------------------------------------------
//  *  Pure local logic-no network call. Looks at keywords in the user's
//  *  question and returns a canned-but-tailored reply object:
//  *    { text, bullets?, hasAction?, actionId? }
//  * ==========================================================================*/

// function pickMonthlyTargetFromQuery(query) {
//   const match = query.match(/(\d{3,6})/);
//   if (!match) return null;
//   return parseInt(match[1], 10);
// }

// function generateAssistantReply(rawQuery, { appliedActionIds }) {
//   const query = rawQuery.trim();
//   const lower = query.toLowerCase();

//   // --- "keep my bill under LKR X" ------------------------------------------
//   if (lower.includes('under') && (lower.includes('lkr') || lower.includes('bill'))) {
//     const target = pickMonthlyTargetFromQuery(query) || MOCK_USAGE_SNAPSHOT.targetBillLKR;
//     const unitsOver = Math.max(
//       0,
//       Math.round((MOCK_USAGE_SNAPSHOT.projectedBillLKR - target) / 90)
//     );
//     return {
//       text: `To stay under ${formatLKR(target)}, you need to reduce consumption by approximately ${unitsOver} units before the 25th.\n\nHere are tailored actions for your home:`,
//       bullets: [
//         'Limit A/C usage in the Master Bedroom to 2 hours/night. (Est. saving: 6 units)',
//         'Run the washing machine only on weekends during off-peak hours. (Est. saving: 4 units)',
//         'Turn off the water pump manually instead of waiting for the auto-shutoff; it currently runs 10 mins extra daily. (Est. saving: 2 units)',
//       ],
//       hasAction: true,
//       actionId: 'ac-peak',
//     };
//   }

//   // --- "analyze / yesterday" ------------------------------------------------
//   if (lower.includes('yesterday') || lower.includes('analyze') || lower.includes('analyse')) {
//     return {
//       text: "Yesterday's total consumption was 11.2 units (approx. LKR 340).",
//       bullets: [
//         'Peak-hour spike observed between 7:30 PM - 9:00 PM (A/C and rice cooker running together).',
//         'Standby power drew 0.8 units overnight from devices left plugged in.',
//         'Recommendation: delay the washing machine cycle by 1 hour to avoid the 61-90 unit bracket.',
//       ],
//     };
//   }

//   // --- "solar" ---------------------------------------------------------------
//   if (lower.includes('solar')) {
//     return {
//       text: `Based on your ~${
//         MOCK_USAGE_SNAPSHOT.projectedUnits * 4
//       } unit average monthly usage, a 3kW on-grid solar system would look like this:`,
//       bullets: [
//         'Estimated monthly generation: ~360 units',
//         'Estimated monthly savings: ~LKR 18,500',
//         'Payback period: approx. 3.2 years at current CEB net-metering rates.',
//       ],
//     };
//   }

//   // --- "tariff" / "slab" / "block" -------------------------------------------
//   if (lower.includes('tariff') || lower.includes('slab') || lower.includes('block')) {
//     const active = findActiveTariffBlock(MOCK_USAGE_SNAPSHOT.unitsThisCycle);
//     return {
//       text: `You're currently in the ${active.label} unit CEB tariff block (LKR ${active.rate.toFixed(
//         2
//       )}/unit). Here's the full domestic tariff ladder:`,
//       bullets: CEB_TARIFF_BLOCKS.map(
//         (b) => `${b.label} units-LKR ${b.rate.toFixed(2)}/unit${b.id === active.id ? '  ← you are here' : ''}`
//       ),
//     };
//   }

//   // --- A/C specific -----------------------------------------------------------
//   if (lower.includes('ac') || lower.includes('air condition') || lower.includes('a/c')) {
//     return {
//       text: 'Your A/C is the single biggest contributor this cycle at roughly 34% of total usage.',
//       bullets: [
//         'Set the thermostat to 24-25°C instead of 20-22°C-every degree lower can add ~5% to running cost.',
//         'Clean the filter monthly; a clogged filter makes the compressor work harder for the same cooling.',
//         'Consider the off-peak schedule below to automatically shift usage after 10 PM.',
//       ],
//       hasAction: true,
//       actionId: 'ac-peak',
//     };
//   }

//   // --- water heater ------------------------------------------------------------
//   if (lower.includes('water heater') || lower.includes('geyser') || lower.includes('hot water')) {
//     return {
//       text: 'The water heater is your second largest load. A thermostat tweak is the fastest win here.',
//       bullets: [
//         'Lower the thermostat from 60°C to 50°C-still comfortably hot for showers.',
//         'Insulate exposed pipework near the tank to reduce standby heat loss.',
//         'Estimated saving: ~5 units (about LKR 950) per month.',
//       ],
//     };
//   }

//   // --- appliance breakdown -------------------------------------------------------
//   if (lower.includes('appliance') || lower.includes('breakdown') || lower.includes('which device')) {
//     const top = [...MOCK_APPLIANCES].sort((a, b) => b.units - a.units).slice(0, 4);
//     return {
//       text: 'Here is your current appliance-level breakdown for this billing cycle:',
//       bullets: top.map((a) => `${a.name}: ${a.units} units (${Math.round(a.share * 100)}% of total)`),
//     };
//   }

//   // --- greetings -----------------------------------------------------------------
//   if (['hi', 'hello', 'hey', 'good morning', 'good evening'].some((g) => lower.startsWith(g))) {
//     return {
//       text: "Hi there! I'm your PowerTrack Assistant. Ask me about your bill, appliances, or how to cut down your CEB tariff tier.",
//     };
//   }

//   // --- thanks -----------------------------------------------------------------------
//   if (lower.includes('thank')) {
//     return { text: "You're welcome! I'll keep watching your usage and flag anything unusual." };
//   }

//   // --- fallback / default -------------------------------------------------------------
//   return {
//     text: `Regarding "${query}": keeping an eye on your highest-wattage appliances (A/C, water heater, iron) is the fastest lever. Shaving even 1.5 units a day saves roughly LKR 1,200/month at your current tariff block.`,
//   };
// }

// /* ============================================================================
//  * 6. SUB-COMPONENT-TARIFF SLAB PROGRESS BAR
//  * ==========================================================================*/

// function TariffSlabBar({ unitsUsed }) {
//   const maxScale = 180;
//   const activeBlock = findActiveTariffBlock(unitsUsed);

//   return (
//     <div className="space-y-1.5">
//       <div className="flex justify-between text-[11px] font-medium text-slate-400">
//         <span>
//           Current tier: <b className="text-slate-200">{activeBlock.label} units</b>
//         </span>
//         <span className="text-[#F9BE0B] font-semibold">
//           Next tier at {MOCK_USAGE_SNAPSHOT.nextTierAt} units
//         </span>
//       </div>

//       <div className="flex h-2.5 w-full overflow-hidden rounded-full border border-slate-700/50 bg-slate-800 p-0.5">
//         {CEB_TARIFF_BLOCKS.slice(0, 3).map((b, idx) => (
//           <div
//             key={b.id}
//             className={cx('h-full', idx === 0 && 'rounded-l-full')}
//             style={{ width: '33%', backgroundColor: b.color }}
//             title={`${b.label} units`}
//           />
//         ))}
//         <div className="h-full flex-1 rounded-r-full bg-slate-700" title="Unreached tiers" />
//       </div>

//       <div className="flex justify-between pt-0.5 text-[10px] text-slate-400">
//         <span>0-30</span>
//         <span>31-60</span>
//         <span className="font-bold text-[#F9BE0B]">61-90</span>
//         <span>91+</span>
//       </div>
//     </div>
//   );
// }

// /* ============================================================================
//  * 7. SUB-COMPONENT-COST PREDICTION CARD
//  * ==========================================================================*/

// function CostPredictionCard() {
//   const { projectedBillLKR, lastMonthBillLKR, unitsThisCycle, cycleLabel } = MOCK_USAGE_SNAPSHOT;
//   const delta = projectedBillLKR - lastMonthBillLKR;
//   const isUp = delta > 0;
//   const deltaPct = Math.round((Math.abs(delta) / lastMonthBillLKR) * 100);

//   return (
//     <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-[#0B1326] p-5 shadow-lg">
//       <div className="mb-3 flex items-center justify-between">
//         <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
//           <TrendingUp className="h-4 w-4 text-[#36B6D4]" />
//           <span>Cost Predictions</span>
//         </div>
//         <span className="rounded bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-400">
//           {cycleLabel}
//         </span>
//       </div>

//       <p className="mb-4 text-xs leading-snug text-slate-400">
//         Estimated CEB bill for current billing cycle.
//       </p>

//       <div className="mb-1 flex items-baseline gap-2">
//         <span className="text-2xl font-black text-[#10DB91]">LKR</span>
//         <span className="text-4xl font-extrabold tracking-tight text-white">
//           {projectedBillLKR.toLocaleString('en-LK')}
//         </span>
//         <span className="ml-1 text-xs font-semibold text-slate-400">/ month</span>
//       </div>

//       <div
//         className={cx(
//           'mb-4 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium',
//           isUp ? 'bg-[#F2555A]/15 text-[#F2555A]' : 'bg-[#10DB91]/15 text-[#10DB91]'
//         )}
//       >
//         {isUp ? '▲' : '▼'} {deltaPct}% vs last month ({formatLKR(lastMonthBillLKR)})
//       </div>

//       <TariffSlabBar unitsUsed={unitsThisCycle} />

//       <div className="mt-4 flex items-center justify-between rounded-lg border border-dashed border-slate-700/60 px-3 py-2 text-[11px] text-slate-400">
//         <span>Your target this cycle</span>
//         <span className="font-semibold text-white">{formatLKR(MOCK_USAGE_SNAPSHOT.targetBillLKR)}</span>
//       </div>
//     </div>
//   );
// }

// /* ============================================================================
//  * 8. SUB-COMPONENT-SINGLE ADVICE ROW (expandable)
//  * ==========================================================================*/

// function AdviceRow({ item, isOpen, onToggle, isApplied, onApply }) {
//   const styles = SEVERITY_STYLES[item.severity] || SEVERITY_STYLES.secondary;

//   return (
//     <div
//       className={cx(
//         'rounded-lg border bg-slate-900/80 transition-all',
//         isOpen ? styles.ring : 'border-slate-800 hover:border-slate-700'
//       )}
//     >
//       <button
//         onClick={onToggle}
//         className="group flex w-full items-center justify-between gap-3 p-3.5 text-left"
//       >
//         <div className="flex min-w-0 items-start gap-2.5">
//           <span
//             className={cx(
//               'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-800',
//               styles.text
//             )}
//           >
//             <ApplianceIcon name={item.icon} className="h-3.5 w-3.5" />
//           </span>
//           <div className="min-w-0">
//             <h4 className={cx('text-xs font-bold text-slate-200 transition-colors', `group-hover:${styles.text}`)}>
//               {item.title}
//             </h4>
//             <p className="mt-0.5 truncate text-[11px] leading-relaxed text-slate-400">
//               {item.summary}
//             </p>
//           </div>
//         </div>
//         <ChevronRight
//           className={cx(
//             'h-3.5 w-3.5 shrink-0 text-slate-500 transition-transform',
//             isOpen && 'rotate-90'
//           )}
//         />
//       </button>

//       {isOpen && (
//         <div className="border-t border-slate-800 px-3.5 py-3">
//           <p className="text-[11px] leading-relaxed text-slate-400">{item.detail}</p>
//           <div className="mt-3 flex items-center justify-between">
//             <span className="text-[11px] text-slate-500">
//               Est. saving:{' '}
//               <span className="font-semibold text-[#10DB91]">{formatLKR(item.estSavingLKR)}</span>{' '}
//               ({item.estSavingUnits} units)
//             </span>
//             <button
//               onClick={onApply}
//               disabled={isApplied}
//               className={cx(
//                 'rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all',
//                 isApplied
//                   ? 'cursor-default border border-slate-700 bg-slate-800 text-slate-400'
//                   : 'cursor-pointer bg-[#10DB91] text-slate-950 hover:bg-[#0ece87] active:scale-95'
//               )}
//             >
//               {isApplied ? (
//                 <span className="flex items-center gap-1">
//                   <Check className="h-3.5 w-3.5" /> {item.actionAppliedLabel}
//                 </span>
//               ) : (
//                 item.actionLabel
//               )}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ============================================================================
//  * 9. SUB-COMPONENT-OPTIMIZATION ADVICE LIST
//  * ==========================================================================*/

// function OptimizationAdviceCard({ appliedIds, onApply }) {
//   const [openId, setOpenId] = useState(null);

//   return (
//     <div className="flex flex-1 flex-col rounded-xl border border-slate-800 bg-[#0B1326] p-5 shadow-lg">
//       <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-300">
//         <Lightbulb className="h-4 w-4 text-[#F9BE0B]" />
//         <span>Optimization Advice</span>
//         <span className="ml-auto rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-normal text-slate-400">
//           {OPTIMIZATION_ADVICE.length} tips
//         </span>
//       </div>

//       <div className="flex-1 space-y-3 overflow-y-auto pr-1">
//         {OPTIMIZATION_ADVICE.map((item) => (
//           <AdviceRow
//             key={item.id}
//             item={item}
//             isOpen={openId === item.id}
//             onToggle={() => setOpenId(openId === item.id ? null : item.id)}
//             isApplied={appliedIds.includes(item.id)}
//             onApply={() => onApply(item)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ============================================================================
//  * 10. SUB-COMPONENT-CHAT MESSAGE BUBBLE
//  * ==========================================================================*/

// function MessageBubble({ message, isActionApplied, onApplyAction }) {
//   const isUser = message.sender === 'user';

//   return (
//     <div className={cx('flex items-start gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}>
//       <div
//         className={cx(
//           'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
//           isUser
//             ? 'bg-[#36B6D4] text-xs font-bold text-slate-950'
//             : 'border border-[#10DB91]/30 bg-[#10DB91]/20 text-[#10DB91]'
//         )}
//       >
//         {isUser ? <User className="h-4 w-4" /> : <Bot className="h-3.5 w-3.5" />}
//       </div>

//       <div
//         className={cx(
//           'max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed sm:max-w-[78%]',
//           isUser
//             ? 'rounded-tr-none bg-[#36B6D4] font-medium text-slate-950'
//             : 'rounded-tl-none border border-slate-800 bg-[#0B1326] text-slate-200 shadow-md'
//         )}
//       >
//         <p className="whitespace-pre-line">{message.text}</p>

//         {message.bullets && (
//           <ul className="mt-2.5 space-y-2 border-t border-slate-800/80 pt-2.5 text-slate-300">
//             {message.bullets.map((pt, idx) => (
//               <li key={idx} className="flex items-start gap-2">
//                 <span className="mt-0.5 text-[#10DB91]">•</span>
//                 <span>{pt}</span>
//               </li>
//             ))}
//           </ul>
//         )}

//         {message.hasAction && (
//           <div className="mt-3.5 border-t border-slate-800/80 pt-2">
//             <button
//               onClick={onApplyAction}
//               disabled={isActionApplied}
//               className={cx(
//                 'flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition-all',
//                 isActionApplied
//                   ? 'cursor-default border border-slate-700 bg-slate-800 text-slate-400'
//                   : 'cursor-pointer bg-[#10DB91] text-slate-950 shadow-md shadow-[#10DB91]/20 hover:bg-[#0ece87] active:scale-95'
//               )}
//             >
//               {isActionApplied ? (
//                 <>
//                   <Check className="h-3.5 w-3.5" />
//                   <span>Schedule Applied</span>
//                 </>
//               ) : (
//                 <span>Apply A/C Schedule</span>
//               )}
//             </button>
//           </div>
//         )}

//         <span
//           className={cx(
//             'mt-1.5 block text-right text-[9px]',
//             isUser ? 'text-slate-800' : 'text-slate-500'
//           )}
//         >
//           {message.timestamp}
//         </span>
//       </div>
//     </div>
//   );
// }

// /* ============================================================================
//  * 11. SUB-COMPONENT-TYPING / "ANALYZING" INDICATOR
//  * ==========================================================================*/

// function AnalyzingIndicator() {
//   return (
//     <div className="flex items-start gap-3">
//       <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#10DB91]/30 bg-[#10DB91]/20 text-[#10DB91]">
//         <Bot className="h-3.5 w-3.5" />
//       </div>
//       <div className="flex items-center gap-2 rounded-2xl rounded-tl-none border border-slate-800 bg-[#0B1326] px-4 py-3 text-xs text-slate-400 shadow-md">
//         <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#10DB91]" />
//         <span>Analyzing CEB usage patterns...</span>
//       </div>
//     </div>
//   );
// }

// /* ============================================================================
//  * 12. SUB-COMPONENT-QUICK PROMPT CHIPS
//  * ==========================================================================*/

// function QuickPromptRow({ onPick, disabled }) {
//   return (
//     <div className="no-scrollbar mb-3 flex items-center gap-2 overflow-x-auto pb-1">
//       {QUICK_PROMPTS.map((p) => (
//         <button
//           key={p}
//           onClick={() => onPick(p)}
//           disabled={disabled}
//           className="whitespace-nowrap rounded-full border border-slate-700/60 bg-slate-800/80 px-3 py-1 text-[11px] font-medium text-slate-300 transition-colors hover:bg-slate-700 disabled:opacity-50"
//         >
//           "{p}"
//         </button>
//       ))}
//     </div>
//   );
// }

// /* ============================================================================
//  * 13. SUB-COMPONENT-CHAT INPUT BAR
//  * ==========================================================================*/

// function ChatInputBar({ value, onChange, onSubmit, disabled }) {
//   return (
//     <form onSubmit={onSubmit} className="relative flex items-center">
//       <input
//         type="text"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder="Ask about your energy usage..."
//         disabled={disabled}
//         className="w-full rounded-xl border border-slate-800 bg-[#0F172A] py-3 pl-4 pr-12 text-xs text-white placeholder-slate-500 transition-all focus:border-[#10DB91] focus:outline-none focus:ring-1 focus:ring-[#10DB91] disabled:opacity-60"
//       />
//       <button
//         type="submit"
//         disabled={disabled || !value.trim()}
//         className="absolute right-2 cursor-pointer rounded-lg bg-[#10DB91] p-2 text-slate-950 transition-all hover:bg-[#0ece87] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#10DB91]"
//         aria-label="Send message"
//       >
//         <Send className="h-4 w-4" />
//       </button>
//     </form>
//   );
// }

// /* ============================================================================
//  * 14. SUB-COMPONENT-CHAT PANEL HEADER
//  * ==========================================================================*/

// function ChatPanelHeader({ onClear }) {
//   return (
//     <div className="flex items-center justify-between border-b border-slate-800/80 bg-[#0F172A]/90 p-4 backdrop-blur">
//       <div className="flex items-center gap-3">
//         <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#10DB91]/40 bg-[#10DB91]/20 text-[#10DB91]">
//           <Bot className="h-5 w-5" />
//         </div>
//         <div>
//           <h3 className="text-sm font-bold leading-tight text-white">PowerTrack Assistant</h3>
//           {/* <p className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400">
//             <span>Demo mode-mock responses</span>
//             <span className="inline-block h-1 w-1 rounded-full bg-[#10DB91]" />
//           </p> */}
//         </div>
//       </div>

//       <div className="flex items-center gap-1">
//         <button
//           onClick={onClear}
//           title="Clear conversation"
//           className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-slate-200"
//         >
//           <Trash2 className="h-4 w-4" />
//         </button>
//         <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-slate-200">
//           <MoreVertical className="h-4 w-4" />
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ============================================================================
//  * 15. SUB-COMPONENT-DASHBOARD TOP HEADER
//  * ==========================================================================*/

// function DashboardHeader() {
//   return (
//     <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800/80 bg-[#0F172A] px-6">
//       <div className="flex items-center gap-2">
//         <h1 className="text-base font-bold tracking-wide text-white">AI Insights &amp; Assistant</h1>
//         {/* <span className="rounded-full border border-[#10DB91]/30 bg-[#10DB91]/10 px-2 py-0.5 text-[10px] font-semibold text-[#10DB91]">
//           Demo Data
//         </span> */}
//       </div>

//       <div className="flex items-center gap-3">
//         <div className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/60 px-3 py-1 text-xs text-slate-300">
//           <span className="h-2 w-2 animate-pulse rounded-full bg-[#10DB91]" />
//           <span>
//             Tariff Cycle: <b>{MOCK_USAGE_SNAPSHOT.cycleLabel}</b>
//           </span>
//         </div>
//       </div>
//     </header>
//   );
// }

// /* ============================================================================
//  * 16. MAIN COMPONENT
//  * ==========================================================================*/

// export default function AIInsightsDashboard() {
//   // Chat state
//   const [messages, setMessages] = useState(INITIAL_MESSAGES);
//   const [inputValue, setInputValue] = useState('');
//   const [isThinking, setIsThinking] = useState(false);

//   // Advice / action state-tracked by id so both the advice card list and
//   // any inline chat "Apply" buttons stay in sync.
//   const [appliedActionIds, setAppliedActionIds] = useState([]);

//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, isThinking]);

//   // --- Apply an optimization action (from either the advice card list or a
//   //     chat message's inline button). Pure local state-no backend call. ---
//   function applyAction(item) {
//     if (appliedActionIds.includes(item.id)) return;
//     setAppliedActionIds((prev) => [...prev, item.id]);

//     setMessages((prev) => [
//       ...prev,
//       {
//         id: `applied-${item.id}-${Date.now()}`,
//         sender: 'bot',
//         text: `✅ ${item.actionLabel} applied! Estimated saving: ${formatLKR(
//           item.estSavingLKR
//         )} (${item.estSavingUnits} units) this cycle.`,
//         timestamp: nowTime(),
//       },
//     ]);
//   }

//   // --- Handle chat submit-always resolves locally via the mock engine. ---
//   function handleSubmit(e) {
//     e.preventDefault();
//     const text = inputValue.trim();
//     if (!text || isThinking) return;

//     const userMessage = {
//       id: `user-${Date.now()}`,
//       sender: 'user',
//       text,
//       timestamp: nowTime(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInputValue('');
//     setIsThinking(true);

//     // Simulate a short "thinking" delay so the demo feels alive, then resolve
//     // with a reply from the local mock engine. No network involved.
//     window.setTimeout(() => {
//       const reply = generateAssistantReply(text, { appliedActionIds });
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: `bot-${Date.now()}`,
//           sender: 'bot',
//           text: reply.text,
//           bullets: reply.bullets,
//           hasAction: reply.hasAction || false,
//           actionId: reply.actionId || null,
//           timestamp: nowTime(),
//         },
//       ]);
//       setIsThinking(false);
//     }, 900 + Math.random() * 500);
//   }

//   function handleQuickPrompt(promptText) {
//     setInputValue(promptText);
//   }

//   function handleClearChat() {
//     setMessages([
//       {
//         id: `cleared-${Date.now()}`,
//         sender: 'bot',
//         text: 'Chat cleared. Ask me anything about your household electricity usage or CEB bill forecasts!',
//         timestamp: nowTime(),
//       },
//     ]);
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-[#0B1326] p-2 font-sans text-slate-100 sm:p-4 md:p-6">
//       {/* Dashboard shell-sidebar intentionally omitted per spec */}
//       <div className="flex h-[860px] w-full max-w-[1280px] flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0F172A] shadow-2xl">
//         <DashboardHeader />

//         {/* Two-column body: advice column + chat column */}
//         <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-12">
//           {/* ================= LEFT: Cost + Advice ================= */}
//           <section className="custom-scrollbar flex flex-col gap-5 overflow-y-auto border-r border-slate-800/80 bg-[#0F172A]/50 p-5 lg:col-span-5">
//             <CostPredictionCard />
//             <OptimizationAdviceCard appliedIds={appliedActionIds} onApply={applyAction} />
//           </section>

//           {/* ================= RIGHT: Chat Assistant ================= */}
//           <section className="relative flex flex-col overflow-hidden bg-[#0F172A] lg:col-span-7">
//             <ChatPanelHeader onClear={handleClearChat} />

//             <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
//               {messages.map((message) => (
//                 <MessageBubble
//                   key={message.id}
//                   message={message}
//                   isActionApplied={
//                     message.actionId ? appliedActionIds.includes(message.actionId) : false
//                   }
//                   onApplyAction={() => {
//                     if (!message.actionId) return;
//                     const item = OPTIMIZATION_ADVICE.find((a) => a.id === message.actionId);
//                     if (item) applyAction(item);
//                   }}
//                 />
//               ))}

//               {isThinking && <AnalyzingIndicator />}

//               <div ref={chatEndRef} />
//             </div>

//             <div className="border-t border-slate-800/80 bg-[#0B1326]/60 p-4">
//               <QuickPromptRow onPick={handleQuickPrompt} disabled={isThinking} />
//               <ChatInputBar
//                 value={inputValue}
//                 onChange={setInputValue}
//                 onSubmit={handleSubmit}
//                 disabled={isThinking}
//               />
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client"

import React, { useEffect, useRef, useState } from 'react';
import {
  Zap,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  ChevronRight,
  ChevronDown,
  Bot,
  User,
  Send,
  Trash2,
  MoreVertical,
  Check,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  Info,
  ShieldCheck,
  Flame,
  Droplets,
  WashingMachine,
  Refrigerator,
  Tv,
  Lamp,
  Sun,
  BatteryCharging,
  CalendarClock,
  Sparkles,
} from 'lucide-react';

/* ============================================================================
 * 1. MOCK DATA-CEB TARIFF STRUCTURE
 * ==========================================================================*/

// Ceylon Electricity Board domestic tariff blocks used purely for the demo.
// (Rates are illustrative, not the live CEB schedule.)
const CEB_TARIFF_BLOCKS = [
  { id: 'b1', label: '0-30', from: 0, to: 30, rate: 8.0, color: '#10DB91' },
  { id: 'b2', label: '31-60', from: 31, to: 60, rate: 10.0, color: '#36B6D4' },
  { id: 'b3', label: '61-90', from: 61, to: 90, rate: 27.75, color: '#F9BE0B' },
  { id: 'b4', label: '91-120', from: 91, to: 120, rate: 32.0, color: '#F9BE0B' },
  { id: 'b5', label: '121-180', from: 121, to: 180, rate: 44.55, color: '#F2555A' },
  { id: 'b6', label: '181+', from: 181, to: Infinity, rate: 55.86, color: '#F2555A' },
];

// The household's current mock billing-cycle snapshot.
const MOCK_USAGE_SNAPSHOT = {
  unitsThisCycle: 72,
  cycleLabel: 'Feb 2026',
  daysElapsed: 18,
  daysInCycle: 30,
  projectedUnits: 91,
  projectedBillLKR: 8450,
  lastMonthBillLKR: 7120,
  targetBillLKR: 8000,
  nextTierAt: 91,
};

// Appliance-level mock breakdown, ordered by consumption share.
const MOCK_APPLIANCES = [
  { id: 'ac', name: 'A/C-Master Bedroom', icon: 'ac', units: 24.5, share: 0.34 },
  { id: 'heater', name: 'Water Heater', icon: 'heater', units: 11.5, share: 0.16 },
  { id: 'fridge', name: 'Refrigerator', icon: 'fridge', units: 13.0, share: 0.18 },
  { id: 'wash', name: 'Washing Machine', icon: 'wash', units: 6.5, share: 0.09 },
  { id: 'tv', name: 'Entertainment Center', icon: 'tv', units: 5.0, share: 0.07 },
  { id: 'lights', name: 'Lighting (whole house)', icon: 'lights', units: 5.8, share: 0.08 },
  { id: 'other', name: 'Other devices', icon: 'other', units: 5.7, share: 0.08 },
];

/* ============================================================================
 * 2. MOCK DATA-OPTIMIZATION ADVICE
 * ==========================================================================*/

const OPTIMIZATION_ADVICE = [
  {
    id: 'ac-peak',
    title: 'A/C Usage Peak',
    severity: 'tertiary',
    icon: 'ac',
    summary: 'Shift cooling to off-peak hours (10 PM - 5 AM) to save ~LKR 1,200.',
    detail:
      'Your Master Bedroom A/C runs heaviest 7-9 PM, overlapping the CEB peak window. Shifting two hours of runtime to after 10 PM keeps the room just as cool at a lower effective rate.',
    estSavingLKR: 1200,
    estSavingUnits: 6,
    actionLabel: 'Apply A/C Schedule',
    actionAppliedLabel: 'Schedule Applied',
  },
  {
    id: 'phantom',
    title: 'Phantom Load',
    severity: 'secondary',
    icon: 'tv',
    summary: 'Entertainment center is drawing 15W while off. Unplug to optimize.',
    detail:
      'Standby draw from the TV, soundbar, and set-top box quietly adds ~11 units a month even when nothing is switched on. A single switched power strip removes this entirely.',
    estSavingLKR: 340,
    estSavingUnits: 3,
    actionLabel: 'Set Standby Reminder',
    actionAppliedLabel: 'Reminder Set',
  },
  {
    id: 'heater',
    title: 'Water Heater',
    severity: 'danger',
    icon: 'heater',
    summary: 'Reduce thermostat from 60°C to 50°C. High impact on current slab.',
    detail:
      'The water heater is your second largest load this cycle. Lowering the thermostat by 10°C typically cuts heating energy by 12-15% with no noticeable comfort loss.',
    estSavingLKR: 950,
    estSavingUnits: 5,
    actionLabel: 'Adjust Thermostat Target',
    actionAppliedLabel: 'Target Adjusted',
  },
  {
    id: 'wash-offpeak',
    title: 'Washing Machine Timing',
    severity: 'primary',
    icon: 'wash',
    summary: 'Run wash cycles on weekends during off-peak hours to save ~4 units.',
    detail:
      'Weekday evening loads land in the most expensive tariff block. Moving laundry to Saturday or Sunday mornings avoids peak pricing without changing your routine much.',
    estSavingLKR: 260,
    estSavingUnits: 4,
    actionLabel: 'Add Weekend Reminder',
    actionAppliedLabel: 'Reminder Added',
  },
  {
    id: 'fridge-seal',
    title: 'Refrigerator Door Seal',
    severity: 'secondary',
    icon: 'fridge',
    summary: 'Door seal is letting in warm air, forcing the compressor to overwork.',
    detail:
      'A worn gasket lets warm air leak in, so the compressor cycles more often than it should. A LKR 1,500 seal replacement typically pays for itself within two months.',
    estSavingLKR: 420,
    estSavingUnits: 2.5,
    actionLabel: 'Schedule Maintenance Check',
    actionAppliedLabel: 'Check Scheduled',
  },
  {
    id: 'lighting-led',
    title: 'Lighting Upgrade',
    severity: 'primary',
    icon: 'lights',
    summary: 'Two rooms still use CFL bulbs-switching to LED saves ~3 units/month.',
    detail:
      'The living room and kitchen still run older CFL bulbs. LED equivalents use roughly 60% less energy for the same brightness and last far longer.',
    estSavingLKR: 210,
    estSavingUnits: 3,
    actionLabel: 'Add to Shopping List',
    actionAppliedLabel: 'Added to List',
  },
];

/* ============================================================================
 * 3. MOCK DATA-CHAT: QUICK PROMPTS + INITIAL MESSAGES
 * ==========================================================================*/

const QUICK_PROMPTS = [
  "Analyze yesterday's usage",
  'Solar projection',
  'CEB tariff slabs',
  'How can I keep my bill under LKR 8000 this month?',
];

const INITIAL_MESSAGES = [
  {
    id: 'm-seed-1',
    sender: 'bot',
    text:
      "Hello! I've analyzed your energy usage for this week. It looks like you're on track to hit the 61-90 unit CEB tier.",
    timestamp: '09:12 AM',
  },
];

/* ============================================================================
 * 4. SMALL HELPERS
 * ==========================================================================*/

function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

function formatLKR(n) {
  const rounded = Math.round(n);
  return `LKR ${rounded.toLocaleString('en-LK')}`;
}

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function findActiveTariffBlock(units) {
  return (
    CEB_TARIFF_BLOCKS.find((b) => units >= b.from && units <= b.to) ||
    CEB_TARIFF_BLOCKS[CEB_TARIFF_BLOCKS.length - 1]
  );
}

// Maps an advice/appliance "icon" key to a lucide-react component.
function ApplianceIcon({ name, className }) {
  switch (name) {
    case 'ac':
      return <BatteryCharging className={className} />;
    case 'heater':
      return <Flame className={className} />;
    case 'fridge':
      return <Refrigerator className={className} />;
    case 'wash':
      return <WashingMachine className={className} />;
    case 'tv':
      return <Tv className={className} />;
    case 'lights':
      return <Lamp className={className} />;
    default:
      return <Zap className={className} />;
  }
}

const SEVERITY_STYLES = {
  primary: { dot: 'bg-[#10DB91]', text: 'text-[#10DB91]', ring: 'border-[#10DB91]/30' },
  secondary: { dot: 'bg-[#36B6D4]', text: 'text-[#36B6D4]', ring: 'border-[#36B6D4]/30' },
  tertiary: { dot: 'bg-[#F9BE0B]', text: 'text-[#F9BE0B]', ring: 'border-[#F9BE0B]/30' },
  danger: { dot: 'bg-[#F2555A]', text: 'text-[#F2555A]', ring: 'border-[#F2555A]/30' },
};

/* ============================================================================
 * 5. LOCAL MOCK AI RESPONSE ENGINE (FALLBACK)
 * ----------------------------------------------------------------------------
 *  Pure local logic-no network call. Used automatically whenever the Gemini
 *  API route is unavailable (no key configured, quota/rate-limit exhausted,
 *  network error, timeout, etc). Looks at keywords in the user's question
 *  and returns a canned-but-tailored reply object:
 *    { text, bullets?, hasAction?, actionId? }
 * ==========================================================================*/

function pickMonthlyTargetFromQuery(query) {
  const match = query.match(/(\d{3,6})/);
  if (!match) return null;
  return parseInt(match[1], 10);
}

function generateAssistantReply(rawQuery, { appliedActionIds }) {
  const query = rawQuery.trim();
  const lower = query.toLowerCase();

  // --- "keep my bill under LKR X" ------------------------------------------
  if (lower.includes('under') && (lower.includes('lkr') || lower.includes('bill'))) {
    const target = pickMonthlyTargetFromQuery(query) || MOCK_USAGE_SNAPSHOT.targetBillLKR;
    const unitsOver = Math.max(
      0,
      Math.round((MOCK_USAGE_SNAPSHOT.projectedBillLKR - target) / 90)
    );
    return {
      text: `To stay under ${formatLKR(target)}, you need to reduce consumption by approximately ${unitsOver} units before the 25th.\n\nHere are tailored actions for your home:`,
      bullets: [
        'Limit A/C usage in the Master Bedroom to 2 hours/night. (Est. saving: 6 units)',
        'Run the washing machine only on weekends during off-peak hours. (Est. saving: 4 units)',
        'Turn off the water pump manually instead of waiting for the auto-shutoff; it currently runs 10 mins extra daily. (Est. saving: 2 units)',
      ],
      hasAction: true,
      actionId: 'ac-peak',
    };
  }

  // --- "analyze / yesterday" ------------------------------------------------
  if (lower.includes('yesterday') || lower.includes('analyze') || lower.includes('analyse')) {
    return {
      text: "Yesterday's total consumption was 11.2 units (approx. LKR 340).",
      bullets: [
        'Peak-hour spike observed between 7:30 PM - 9:00 PM (A/C and rice cooker running together).',
        'Standby power drew 0.8 units overnight from devices left plugged in.',
        'Recommendation: delay the washing machine cycle by 1 hour to avoid the 61-90 unit bracket.',
      ],
    };
  }

  // --- "solar" ---------------------------------------------------------------
  if (lower.includes('solar')) {
    return {
      text: `Based on your ~${
        MOCK_USAGE_SNAPSHOT.projectedUnits * 4
      } unit average monthly usage, a 3kW on-grid solar system would look like this:`,
      bullets: [
        'Estimated monthly generation: ~360 units',
        'Estimated monthly savings: ~LKR 18,500',
        'Payback period: approx. 3.2 years at current CEB net-metering rates.',
      ],
    };
  }

  // --- "tariff" / "slab" / "block" -------------------------------------------
  if (lower.includes('tariff') || lower.includes('slab') || lower.includes('block')) {
    const active = findActiveTariffBlock(MOCK_USAGE_SNAPSHOT.unitsThisCycle);
    return {
      text: `You're currently in the ${active.label} unit CEB tariff block (LKR ${active.rate.toFixed(
        2
      )}/unit). Here's the full domestic tariff ladder:`,
      bullets: CEB_TARIFF_BLOCKS.map(
        (b) => `${b.label} units-LKR ${b.rate.toFixed(2)}/unit${b.id === active.id ? '  ← you are here' : ''}`
      ),
    };
  }

  // --- A/C specific -----------------------------------------------------------
  if (lower.includes('ac') || lower.includes('air condition') || lower.includes('a/c')) {
    return {
      text: 'Your A/C is the single biggest contributor this cycle at roughly 34% of total usage.',
      bullets: [
        'Set the thermostat to 24-25°C instead of 20-22°C-every degree lower can add ~5% to running cost.',
        'Clean the filter monthly; a clogged filter makes the compressor work harder for the same cooling.',
        'Consider the off-peak schedule below to automatically shift usage after 10 PM.',
      ],
      hasAction: true,
      actionId: 'ac-peak',
    };
  }

  // --- water heater ------------------------------------------------------------
  if (lower.includes('water heater') || lower.includes('geyser') || lower.includes('hot water')) {
    return {
      text: 'The water heater is your second largest load. A thermostat tweak is the fastest win here.',
      bullets: [
        'Lower the thermostat from 60°C to 50°C-still comfortably hot for showers.',
        'Insulate exposed pipework near the tank to reduce standby heat loss.',
        'Estimated saving: ~5 units (about LKR 950) per month.',
      ],
    };
  }

  // --- appliance breakdown -------------------------------------------------------
  if (lower.includes('appliance') || lower.includes('breakdown') || lower.includes('which device')) {
    const top = [...MOCK_APPLIANCES].sort((a, b) => b.units - a.units).slice(0, 4);
    return {
      text: 'Here is your current appliance-level breakdown for this billing cycle:',
      bullets: top.map((a) => `${a.name}: ${a.units} units (${Math.round(a.share * 100)}% of total)`),
    };
  }

  // --- greetings -----------------------------------------------------------------
  if (['hi', 'hello', 'hey', 'good morning', 'good evening'].some((g) => lower.startsWith(g))) {
    return {
      text: "Hi there! I'm your PowerTrack Assistant. Ask me about your bill, appliances, or how to cut down your CEB tariff tier.",
    };
  }

  // --- thanks -----------------------------------------------------------------------
  if (lower.includes('thank')) {
    return { text: "You're welcome! I'll keep watching your usage and flag anything unusual." };
  }

  // --- fallback / default -------------------------------------------------------------
  return {
    text: `Regarding "${query}": keeping an eye on your highest-wattage appliances (A/C, water heater, iron) is the fastest lever. Shaving even 1.5 units a day saves roughly LKR 1,200/month at your current tariff block.`,
  };
}

/* ============================================================================
 * 5b. LIVE AI REPLY-Gemini via /api/chat, with automatic local fallback
 * ----------------------------------------------------------------------------
 *  Tries the server-side Gemini route first (keeps GEMINI_API_KEY private).
 *  If that call fails for ANY reason-missing key, quota/rate-limit hit
 *  (HTTP 429), network error, timeout, malformed response-this transparently
 *  falls back to the local generateAssistantReply() engine above, so the
 *  chatbot never goes silent even when the Gemini token runs out.
 * ==========================================================================*/

async function fetchAssistantReply(query, ctx) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        query,
        usage: MOCK_USAGE_SNAPSHOT,
        appliances: MOCK_APPLIANCES,
        advice: OPTIMIZATION_ADVICE,
      }),
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Gemini API responded with status ${res.status}`);
    }

    const data = await res.json();
    return {
      text: data.text,
      bullets: data.bullets || [],
      hasAction: Boolean(data.hasAction),
      actionId: data.actionId || null,
    };
  } catch (err) {
    // Gemini unavailable-quota exhausted, offline, misconfigured key, etc.
    // Fall back to the local rule-based engine so the assistant keeps working.
    console.warn('[PowerTrack] Gemini call failed, using local fallback engine:', err?.message || err);
    return generateAssistantReply(query, ctx);
  }
}

/* ============================================================================
 * 6. SUB-COMPONENT-TARIFF SLAB PROGRESS BAR
 * ==========================================================================*/

function TariffSlabBar({ unitsUsed }) {
  const maxScale = 180;
  const activeBlock = findActiveTariffBlock(unitsUsed);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[11px] font-medium text-slate-400">
        <span>
          Current tier: <b className="text-slate-200">{activeBlock.label} units</b>
        </span>
        <span className="text-[#F9BE0B] font-semibold">
          Next tier at {MOCK_USAGE_SNAPSHOT.nextTierAt} units
        </span>
      </div>

      <div className="flex h-2.5 w-full overflow-hidden rounded-full border border-slate-700/50 bg-slate-800 p-0.5">
        {CEB_TARIFF_BLOCKS.slice(0, 3).map((b, idx) => (
          <div
            key={b.id}
            className={cx('h-full', idx === 0 && 'rounded-l-full')}
            style={{ width: '33%', backgroundColor: b.color }}
            title={`${b.label} units`}
          />
        ))}
        <div className="h-full flex-1 rounded-r-full bg-slate-700" title="Unreached tiers" />
      </div>

      <div className="flex justify-between pt-0.5 text-[10px] text-slate-400">
        <span>0-30</span>
        <span>31-60</span>
        <span className="font-bold text-[#F9BE0B]">61-90</span>
        <span>91+</span>
      </div>
    </div>
  );
}

/* ============================================================================
 * 7. SUB-COMPONENT-COST PREDICTION CARD
 * ==========================================================================*/

function CostPredictionCard() {
  const { projectedBillLKR, lastMonthBillLKR, unitsThisCycle, cycleLabel } = MOCK_USAGE_SNAPSHOT;
  const delta = projectedBillLKR - lastMonthBillLKR;
  const isUp = delta > 0;
  const deltaPct = Math.round((Math.abs(delta) / lastMonthBillLKR) * 100);

  return (
    <div className="rounded-xl border border-slate-800 bg-[#0B1326] p-5 shadow-lg">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <TrendingUp className="h-4 w-4 text-[#36B6D4]" />
          <span>Cost Predictions</span>
        </div>
        <span className="rounded bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-400">
          {cycleLabel}
        </span>
      </div>

      <p className="mb-4 text-xs leading-snug text-slate-400">
        Estimated CEB bill for current billing cycle.
      </p>

      <div className="mb-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <span className="text-xl font-black leading-none text-[#10DB91]">LKR</span>
        <span className="text-4xl font-extrabold leading-none tracking-tight tabular-nums text-white">
          {projectedBillLKR.toLocaleString('en-LK')}
        </span>
        <span className="text-xs font-semibold leading-none text-slate-400">/ month</span>
      </div>

      <div
        className={cx(
          'mb-4 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium',
          isUp ? 'bg-[#F2555A]/15 text-[#F2555A]' : 'bg-[#10DB91]/15 text-[#10DB91]'
        )}
      >
        {isUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        <span>
          {deltaPct}% vs last month ({formatLKR(lastMonthBillLKR)})
        </span>
      </div>

      <TariffSlabBar unitsUsed={unitsThisCycle} />

      <div className="mt-4 flex items-center justify-between rounded-lg border border-dashed border-slate-700/60 px-3 py-2 text-[11px] text-slate-400">
        <span>Your target this cycle</span>
        <span className="font-semibold text-white">{formatLKR(MOCK_USAGE_SNAPSHOT.targetBillLKR)}</span>
      </div>
    </div>
  );
}

/* ============================================================================
 * 8. SUB-COMPONENT-SINGLE ADVICE ROW (expandable)
 * ==========================================================================*/

function AdviceRow({ item, isOpen, onToggle, isApplied, onApply }) {
  const styles = SEVERITY_STYLES[item.severity] || SEVERITY_STYLES.secondary;

  return (
    <div
      className={cx(
        'rounded-lg border bg-slate-900/80 transition-all',
        isOpen ? styles.ring : 'border-slate-800 hover:border-slate-700'
      )}
    >
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between gap-3 p-3.5 text-left"
      >
        <div className="flex min-w-0 items-start gap-2.5">
          <span
            className={cx(
              'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-800',
              styles.text
            )}
          >
            <ApplianceIcon name={item.icon} className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0">
            <h4 className={cx('text-xs font-bold text-slate-200 transition-colors', `group-hover:${styles.text}`)}>
              {item.title}
            </h4>
            <p className="mt-0.5 truncate text-[11px] leading-relaxed text-slate-400">
              {item.summary}
            </p>
          </div>
        </div>
        <ChevronRight
          className={cx(
            'h-3.5 w-3.5 shrink-0 text-slate-500 transition-transform',
            isOpen && 'rotate-90'
          )}
        />
      </button>

      {isOpen && (
        <div className="border-t border-slate-800 px-3.5 py-3">
          <p className="text-[11px] leading-relaxed text-slate-400">{item.detail}</p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              Est. saving:{' '}
              <span className="font-semibold text-[#10DB91]">{formatLKR(item.estSavingLKR)}</span>{' '}
              ({item.estSavingUnits} units)
            </span>
            <button
              onClick={onApply}
              disabled={isApplied}
              className={cx(
                'rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all',
                isApplied
                  ? 'cursor-default border border-slate-700 bg-slate-800 text-slate-400'
                  : 'cursor-pointer bg-[#10DB91] text-slate-950 hover:bg-[#0ece87] active:scale-95'
              )}
            >
              {isApplied ? (
                <span className="flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" /> {item.actionAppliedLabel}
                </span>
              ) : (
                item.actionLabel
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================================
 * 9. SUB-COMPONENT-OPTIMIZATION ADVICE LIST
 * ==========================================================================*/

function OptimizationAdviceCard({ appliedIds, onApply }) {
  const [openId, setOpenId] = useState(null);

  return (
    <div className="flex flex-1 flex-col rounded-xl border border-slate-800 bg-[#0B1326] p-5 shadow-lg">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-300">
        <Lightbulb className="h-4 w-4 text-[#F9BE0B]" />
        <span>Optimization Advice</span>
        <span className="ml-auto rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-normal text-slate-400">
          {OPTIMIZATION_ADVICE.length} tips
        </span>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pr-1">
        {OPTIMIZATION_ADVICE.map((item) => (
          <AdviceRow
            key={item.id}
            item={item}
            isOpen={openId === item.id}
            onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            isApplied={appliedIds.includes(item.id)}
            onApply={() => onApply(item)}
          />
        ))}
      </div>
    </div>
  );
}

/* ============================================================================
 * 10. SUB-COMPONENT-CHAT MESSAGE BUBBLE
 * ==========================================================================*/

function MessageBubble({ message, isActionApplied, onApplyAction }) {
  const isUser = message.sender === 'user';

  return (
    <div className={cx('flex items-start gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}>
      <div
        className={cx(
          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
          isUser
            ? 'bg-[#36B6D4] text-xs font-bold text-slate-950'
            : 'border border-[#10DB91]/30 bg-[#10DB91]/20 text-[#10DB91]'
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-3.5 w-3.5" />}
      </div>

      <div
        className={cx(
          'max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed sm:max-w-[78%]',
          isUser
            ? 'rounded-tr-none bg-[#36B6D4] font-medium text-slate-950'
            : 'rounded-tl-none border border-slate-800 bg-[#0B1326] text-slate-200 shadow-md'
        )}
      >
        {message.kind === 'confirmation' ? (
          <div className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#10DB91]" />
            <p className="whitespace-pre-line">{message.text}</p>
          </div>
        ) : (
          <p className="whitespace-pre-line">{message.text}</p>
        )}

        {message.bullets && (
          <ul className="mt-2.5 space-y-2 border-t border-slate-800/80 pt-2.5 text-slate-300">
            {message.bullets.map((pt, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-0.5 text-[#10DB91]">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        )}

        {message.hasAction && (
          <div className="mt-3.5 border-t border-slate-800/80 pt-2">
            <button
              onClick={onApplyAction}
              disabled={isActionApplied}
              className={cx(
                'flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition-all',
                isActionApplied
                  ? 'cursor-default border border-slate-700 bg-slate-800 text-slate-400'
                  : 'cursor-pointer bg-[#10DB91] text-slate-950 shadow-md shadow-[#10DB91]/20 hover:bg-[#0ece87] active:scale-95'
              )}
            >
              {isActionApplied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Schedule Applied</span>
                </>
              ) : (
                <span>Apply A/C Schedule</span>
              )}
            </button>
          </div>
        )}

        <span
          className={cx(
            'mt-1.5 block text-right text-[9px]',
            isUser ? 'text-slate-800' : 'text-slate-500'
          )}
        >
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}

/* ============================================================================
 * 11. SUB-COMPONENT-TYPING / "ANALYZING" INDICATOR
 * ==========================================================================*/

function AnalyzingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#10DB91]/30 bg-[#10DB91]/20 text-[#10DB91]">
        <Bot className="h-3.5 w-3.5" />
      </div>
      <div className="flex items-center gap-2 rounded-2xl rounded-tl-none border border-slate-800 bg-[#0B1326] px-4 py-3 text-xs text-slate-400 shadow-md">
        <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#10DB91]" />
        <span>Analyzing CEB usage patterns...</span>
      </div>
    </div>
  );
}

/* ============================================================================
 * 12. SUB-COMPONENT-QUICK PROMPT CHIPS
 * ==========================================================================*/

function QuickPromptRow({ onPick, disabled }) {
  return (
    <div className="no-scrollbar mb-3 flex items-center gap-2 overflow-x-auto pb-1">
      {QUICK_PROMPTS.map((p) => (
        <button
          key={p}
          onClick={() => onPick(p)}
          disabled={disabled}
          className="whitespace-nowrap rounded-full border border-slate-700/60 bg-slate-800/80 px-3 py-1 text-[11px] font-medium text-slate-300 transition-colors hover:bg-slate-700 disabled:opacity-50"
        >
          "{p}"
        </button>
      ))}
    </div>
  );
}

/* ============================================================================
 * 13. SUB-COMPONENT-CHAT INPUT BAR
 * ==========================================================================*/

function ChatInputBar({ value, onChange, onSubmit, disabled }) {
  return (
    <form onSubmit={onSubmit} className="relative flex items-center">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ask about your energy usage..."
        disabled={disabled}
        className="w-full rounded-xl border border-slate-800 bg-[#0F172A] py-3 pl-4 pr-12 text-xs text-white placeholder-slate-500 transition-all focus:border-[#10DB91] focus:outline-none focus:ring-1 focus:ring-[#10DB91] disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="absolute right-2 cursor-pointer rounded-lg bg-[#10DB91] p-2 text-slate-950 transition-all hover:bg-[#0ece87] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#10DB91]"
        aria-label="Send message"
      >
        <Send className="h-4 w-4" />
      </button>
    </form>
  );
}

/* ============================================================================
 * 14. SUB-COMPONENT-CHAT PANEL HEADER
 * ==========================================================================*/

function ChatPanelHeader({ onClear }) {
  return (
    <div className="flex items-center justify-between border-b border-slate-800/80 bg-[#0F172A]/90 p-4 backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#10DB91]/40 bg-[#10DB91]/20 text-[#10DB91]">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold leading-tight text-white">PowerTrack Assistant</h3>
          {/* <p className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400">
            <span>Demo mode-mock responses</span>
            <span className="inline-block h-1 w-1 rounded-full bg-[#10DB91]" />
          </p> */}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={onClear}
          title="Clear conversation"
          className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-slate-200"
        >
          <Trash2 className="h-4 w-4" />
        </button>
        <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-slate-200">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ============================================================================
 * 15. SUB-COMPONENT-DASHBOARD TOP HEADER
 * ==========================================================================*/

function DashboardHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800/80 bg-[#0F172A] px-6">
      <div className="flex items-center gap-2">
        <h1 className="text-base font-bold tracking-wide text-white">AI Insights &amp; Assistant</h1>
        {/* <span className="rounded-full border border-[#10DB91]/30 bg-[#10DB91]/10 px-2 py-0.5 text-[10px] font-semibold text-[#10DB91]">
          Demo Data
        </span> */}
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/60 px-3 py-1 text-xs text-slate-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#10DB91]" />
          <span>
            Tariff Cycle: <b>{MOCK_USAGE_SNAPSHOT.cycleLabel}</b>
          </span>
        </div>
      </div>
    </header>
  );
}

/* ============================================================================
 * 16. MAIN COMPONENT
 * ==========================================================================*/

export default function AIInsightsDashboard() {
  // Chat state
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // Advice / action state-tracked by id so both the advice card list and
  // any inline chat "Apply" buttons stay in sync.
  const [appliedActionIds, setAppliedActionIds] = useState([]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // --- Apply an optimization action (from either the advice card list or a
  //     chat message's inline button). Pure local state-no backend call. ---
  function applyAction(item) {
    if (appliedActionIds.includes(item.id)) return;
    setAppliedActionIds((prev) => [...prev, item.id]);

    setMessages((prev) => [
      ...prev,
      {
        id: `applied-${item.id}-${Date.now()}`,
        sender: 'bot',
        kind: 'confirmation',
        text: `${item.actionLabel} applied! Estimated saving: ${formatLKR(
          item.estSavingLKR
        )} (${item.estSavingUnits} units) this cycle.`,
        timestamp: nowTime(),
      },
    ]);
  }

  // --- Handle chat submit-tries the Gemini-backed /api/chat route first,
  //     and transparently falls back to the local mock engine if Gemini is
  //     unavailable (missing key, quota exhausted, network error, etc). ---
  async function handleSubmit(e) {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text || isThinking) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: nowTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsThinking(true);

    // Keep a small minimum delay so the "Analyzing..." indicator doesn't just
    // flash instantly when the fallback engine resolves synchronously fast.
    const minDelay = new Promise((resolve) => setTimeout(resolve, 500));
    const [reply] = await Promise.all([
      fetchAssistantReply(text, { appliedActionIds }),
      minDelay,
    ]);

    setMessages((prev) => [
      ...prev,
      {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: reply.text,
        bullets: reply.bullets,
        hasAction: reply.hasAction || false,
        actionId: reply.actionId || null,
        timestamp: nowTime(),
      },
    ]);
    setIsThinking(false);
  }

  function handleQuickPrompt(promptText) {
    setInputValue(promptText);
  }

  function handleClearChat() {
    setMessages([
      {
        id: `cleared-${Date.now()}`,
        sender: 'bot',
        text: 'Chat cleared. Ask me anything about your household electricity usage or CEB bill forecasts!',
        timestamp: nowTime(),
      },
    ]);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0B1326] p-2 font-sans text-slate-100 sm:p-4 md:p-6">
      {/* Dashboard shell-sidebar intentionally omitted per spec */}
      <div className="flex h-[860px] w-full max-w-[1280px] flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0F172A] shadow-2xl">
        <DashboardHeader />

        {/* Two-column body: advice column + chat column */}
        <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-12">
          {/* ================= LEFT: Cost + Advice ================= */}
          <section className="custom-scrollbar flex flex-col gap-5 overflow-y-auto border-r border-slate-800/80 bg-[#0F172A]/50 p-5 lg:col-span-5">
            <CostPredictionCard />
            <OptimizationAdviceCard appliedIds={appliedActionIds} onApply={applyAction} />
          </section>

          {/* ================= RIGHT: Chat Assistant ================= */}
          <section className="relative flex flex-col overflow-hidden bg-[#0F172A] lg:col-span-7">
            <ChatPanelHeader onClear={handleClearChat} />

            <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isActionApplied={
                    message.actionId ? appliedActionIds.includes(message.actionId) : false
                  }
                  onApplyAction={() => {
                    if (!message.actionId) return;
                    const item = OPTIMIZATION_ADVICE.find((a) => a.id === message.actionId);
                    if (item) applyAction(item);
                  }}
                />
              ))}

              {isThinking && <AnalyzingIndicator />}

              <div ref={chatEndRef} />
            </div>

            <div className="border-t border-slate-800/80 bg-[#0B1326]/60 p-4">
              <QuickPromptRow onPick={handleQuickPrompt} disabled={isThinking} />
              <ChatInputBar
                value={inputValue}
                onChange={setInputValue}
                onSubmit={handleSubmit}
                disabled={isThinking}
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


// import React, { useEffect, useRef, useState } from 'react';
// import {
//   Zap,
//   TrendingUp,
//   Lightbulb,
//   ChevronRight,
//   ChevronDown,
//   Bot,
//   User,
//   Send,
//   Trash2,
//   MoreVertical,
//   Check,
//   RefreshCw,
//   AlertTriangle,
//   Info,
//   ShieldCheck,
//   Flame,
//   Droplets,
//   WashingMachine,
//   Refrigerator,
//   Tv,
//   Lamp,
//   Sun,
//   BatteryCharging,
//   CalendarClock,
//   Sparkles,
// } from 'lucide-react';

// /* ============================================================================
//  * 1. MOCK DATA-CEB TARIFF STRUCTURE
//  * ==========================================================================*/

// // Ceylon Electricity Board domestic tariff blocks used purely for the demo.
// // (Rates are illustrative, not the live CEB schedule.)
// const CEB_TARIFF_BLOCKS = [
//   { id: 'b1', label: '0-30', from: 0, to: 30, rate: 8.0, color: '#10DB91' },
//   { id: 'b2', label: '31-60', from: 31, to: 60, rate: 10.0, color: '#36B6D4' },
//   { id: 'b3', label: '61-90', from: 61, to: 90, rate: 27.75, color: '#F9BE0B' },
//   { id: 'b4', label: '91-120', from: 91, to: 120, rate: 32.0, color: '#F9BE0B' },
//   { id: 'b5', label: '121-180', from: 121, to: 180, rate: 44.55, color: '#F2555A' },
//   { id: 'b6', label: '181+', from: 181, to: Infinity, rate: 55.86, color: '#F2555A' },
// ];

// // The household's current mock billing-cycle snapshot.
// const MOCK_USAGE_SNAPSHOT = {
//   unitsThisCycle: 72,
//   cycleLabel: 'Feb 2026',
//   daysElapsed: 18,
//   daysInCycle: 30,
//   projectedUnits: 91,
//   projectedBillLKR: 8450,
//   lastMonthBillLKR: 7120,
//   targetBillLKR: 8000,
//   nextTierAt: 91,
// };

// // Appliance-level mock breakdown, ordered by consumption share.
// const MOCK_APPLIANCES = [
//   { id: 'ac', name: 'A/C-Master Bedroom', icon: 'ac', units: 24.5, share: 0.34 },
//   { id: 'heater', name: 'Water Heater', icon: 'heater', units: 11.5, share: 0.16 },
//   { id: 'fridge', name: 'Refrigerator', icon: 'fridge', units: 13.0, share: 0.18 },
//   { id: 'wash', name: 'Washing Machine', icon: 'wash', units: 6.5, share: 0.09 },
//   { id: 'tv', name: 'Entertainment Center', icon: 'tv', units: 5.0, share: 0.07 },
//   { id: 'lights', name: 'Lighting (whole house)', icon: 'lights', units: 5.8, share: 0.08 },
//   { id: 'other', name: 'Other devices', icon: 'other', units: 5.7, share: 0.08 },
// ];

// /* ============================================================================
//  * 2. MOCK DATA-OPTIMIZATION ADVICE
//  * ==========================================================================*/

// const OPTIMIZATION_ADVICE = [
//   {
//     id: 'ac-peak',
//     title: 'A/C Usage Peak',
//     severity: 'tertiary',
//     icon: 'ac',
//     summary: 'Shift cooling to off-peak hours (10 PM - 5 AM) to save ~LKR 1,200.',
//     detail:
//       'Your Master Bedroom A/C runs heaviest 7-9 PM, overlapping the CEB peak window. Shifting two hours of runtime to after 10 PM keeps the room just as cool at a lower effective rate.',
//     estSavingLKR: 1200,
//     estSavingUnits: 6,
//     actionLabel: 'Apply A/C Schedule',
//     actionAppliedLabel: 'Schedule Applied',
//   },
//   {
//     id: 'phantom',
//     title: 'Phantom Load',
//     severity: 'secondary',
//     icon: 'tv',
//     summary: 'Entertainment center is drawing 15W while off. Unplug to optimize.',
//     detail:
//       'Standby draw from the TV, soundbar, and set-top box quietly adds ~11 units a month even when nothing is switched on. A single switched power strip removes this entirely.',
//     estSavingLKR: 340,
//     estSavingUnits: 3,
//     actionLabel: 'Set Standby Reminder',
//     actionAppliedLabel: 'Reminder Set',
//   },
//   {
//     id: 'heater',
//     title: 'Water Heater',
//     severity: 'danger',
//     icon: 'heater',
//     summary: 'Reduce thermostat from 60°C to 50°C. High impact on current slab.',
//     detail:
//       'The water heater is your second largest load this cycle. Lowering the thermostat by 10°C typically cuts heating energy by 12-15% with no noticeable comfort loss.',
//     estSavingLKR: 950,
//     estSavingUnits: 5,
//     actionLabel: 'Adjust Thermostat Target',
//     actionAppliedLabel: 'Target Adjusted',
//   },
//   {
//     id: 'wash-offpeak',
//     title: 'Washing Machine Timing',
//     severity: 'primary',
//     icon: 'wash',
//     summary: 'Run wash cycles on weekends during off-peak hours to save ~4 units.',
//     detail:
//       'Weekday evening loads land in the most expensive tariff block. Moving laundry to Saturday or Sunday mornings avoids peak pricing without changing your routine much.',
//     estSavingLKR: 260,
//     estSavingUnits: 4,
//     actionLabel: 'Add Weekend Reminder',
//     actionAppliedLabel: 'Reminder Added',
//   },
//   {
//     id: 'fridge-seal',
//     title: 'Refrigerator Door Seal',
//     severity: 'secondary',
//     icon: 'fridge',
//     summary: 'Door seal is letting in warm air, forcing the compressor to overwork.',
//     detail:
//       'A worn gasket lets warm air leak in, so the compressor cycles more often than it should. A LKR 1,500 seal replacement typically pays for itself within two months.',
//     estSavingLKR: 420,
//     estSavingUnits: 2.5,
//     actionLabel: 'Schedule Maintenance Check',
//     actionAppliedLabel: 'Check Scheduled',
//   },
//   {
//     id: 'lighting-led',
//     title: 'Lighting Upgrade',
//     severity: 'primary',
//     icon: 'lights',
//     summary: 'Two rooms still use CFL bulbs-switching to LED saves ~3 units/month.',
//     detail:
//       'The living room and kitchen still run older CFL bulbs. LED equivalents use roughly 60% less energy for the same brightness and last far longer.',
//     estSavingLKR: 210,
//     estSavingUnits: 3,
//     actionLabel: 'Add to Shopping List',
//     actionAppliedLabel: 'Added to List',
//   },
// ];

// /* ============================================================================
//  * 3. MOCK DATA-CHAT: QUICK PROMPTS + INITIAL MESSAGES
//  * ==========================================================================*/

// const QUICK_PROMPTS = [
//   "Analyze yesterday's usage",
//   'Solar projection',
//   'CEB tariff slabs',
//   'How can I keep my bill under LKR 8000 this month?',
// ];

// const INITIAL_MESSAGES = [
//   {
//     id: 'm-seed-1',
//     sender: 'bot',
//     text:
//       "Hello! I've analyzed your energy usage for this week. It looks like you're on track to hit the 61-90 unit CEB tier.",
//     timestamp: '09:12 AM',
//   },
// ];

// /* ============================================================================
//  * 4. SMALL HELPERS
//  * ==========================================================================*/

// function cx(...parts) {
//   return parts.filter(Boolean).join(' ');
// }

// function formatLKR(n) {
//   const rounded = Math.round(n);
//   return `LKR ${rounded.toLocaleString('en-LK')}`;
// }

// function nowTime() {
//   return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
// }

// function findActiveTariffBlock(units) {
//   return (
//     CEB_TARIFF_BLOCKS.find((b) => units >= b.from && units <= b.to) ||
//     CEB_TARIFF_BLOCKS[CEB_TARIFF_BLOCKS.length - 1]
//   );
// }

// // Maps an advice/appliance "icon" key to a lucide-react component.
// function ApplianceIcon({ name, className }) {
//   switch (name) {
//     case 'ac':
//       return <BatteryCharging className={className} />;
//     case 'heater':
//       return <Flame className={className} />;
//     case 'fridge':
//       return <Refrigerator className={className} />;
//     case 'wash':
//       return <WashingMachine className={className} />;
//     case 'tv':
//       return <Tv className={className} />;
//     case 'lights':
//       return <Lamp className={className} />;
//     default:
//       return <Zap className={className} />;
//   }
// }

// const SEVERITY_STYLES = {
//   primary: { dot: 'bg-[#10DB91]', text: 'text-[#10DB91]', ring: 'border-[#10DB91]/30' },
//   secondary: { dot: 'bg-[#36B6D4]', text: 'text-[#36B6D4]', ring: 'border-[#36B6D4]/30' },
//   tertiary: { dot: 'bg-[#F9BE0B]', text: 'text-[#F9BE0B]', ring: 'border-[#F9BE0B]/30' },
//   danger: { dot: 'bg-[#F2555A]', text: 'text-[#F2555A]', ring: 'border-[#F2555A]/30' },
// };

// /* ============================================================================
//  * 5. LOCAL MOCK AI RESPONSE ENGINE (FALLBACK)
//  * ----------------------------------------------------------------------------
//  *  Pure local logic-no network call. Used automatically whenever the Gemini
//  *  API route is unavailable (no key configured, quota/rate-limit exhausted,
//  *  network error, timeout, etc). Looks at keywords in the user's question
//  *  and returns a canned-but-tailored reply object:
//  *    { text, bullets?, hasAction?, actionId? }
//  * ==========================================================================*/

// function pickMonthlyTargetFromQuery(query) {
//   const match = query.match(/(\d{3,6})/);
//   if (!match) return null;
//   return parseInt(match[1], 10);
// }

// function generateAssistantReply(rawQuery, { appliedActionIds }) {
//   const query = rawQuery.trim();
//   const lower = query.toLowerCase();

//   // --- "keep my bill under LKR X" ------------------------------------------
//   if (lower.includes('under') && (lower.includes('lkr') || lower.includes('bill'))) {
//     const target = pickMonthlyTargetFromQuery(query) || MOCK_USAGE_SNAPSHOT.targetBillLKR;
//     const unitsOver = Math.max(
//       0,
//       Math.round((MOCK_USAGE_SNAPSHOT.projectedBillLKR - target) / 90)
//     );
//     return {
//       text: `To stay under ${formatLKR(target)}, you need to reduce consumption by approximately ${unitsOver} units before the 25th.\n\nHere are tailored actions for your home:`,
//       bullets: [
//         'Limit A/C usage in the Master Bedroom to 2 hours/night. (Est. saving: 6 units)',
//         'Run the washing machine only on weekends during off-peak hours. (Est. saving: 4 units)',
//         'Turn off the water pump manually instead of waiting for the auto-shutoff; it currently runs 10 mins extra daily. (Est. saving: 2 units)',
//       ],
//       hasAction: true,
//       actionId: 'ac-peak',
//     };
//   }

//   // --- "analyze / yesterday" ------------------------------------------------
//   if (lower.includes('yesterday') || lower.includes('analyze') || lower.includes('analyse')) {
//     return {
//       text: "Yesterday's total consumption was 11.2 units (approx. LKR 340).",
//       bullets: [
//         'Peak-hour spike observed between 7:30 PM - 9:00 PM (A/C and rice cooker running together).',
//         'Standby power drew 0.8 units overnight from devices left plugged in.',
//         'Recommendation: delay the washing machine cycle by 1 hour to avoid the 61-90 unit bracket.',
//       ],
//     };
//   }

//   // --- "solar" ---------------------------------------------------------------
//   if (lower.includes('solar')) {
//     return {
//       text: `Based on your ~${
//         MOCK_USAGE_SNAPSHOT.projectedUnits * 4
//       } unit average monthly usage, a 3kW on-grid solar system would look like this:`,
//       bullets: [
//         'Estimated monthly generation: ~360 units',
//         'Estimated monthly savings: ~LKR 18,500',
//         'Payback period: approx. 3.2 years at current CEB net-metering rates.',
//       ],
//     };
//   }

//   // --- "tariff" / "slab" / "block" -------------------------------------------
//   if (lower.includes('tariff') || lower.includes('slab') || lower.includes('block')) {
//     const active = findActiveTariffBlock(MOCK_USAGE_SNAPSHOT.unitsThisCycle);
//     return {
//       text: `You're currently in the ${active.label} unit CEB tariff block (LKR ${active.rate.toFixed(
//         2
//       )}/unit). Here's the full domestic tariff ladder:`,
//       bullets: CEB_TARIFF_BLOCKS.map(
//         (b) => `${b.label} units-LKR ${b.rate.toFixed(2)}/unit${b.id === active.id ? '  ← you are here' : ''}`
//       ),
//     };
//   }

//   // --- A/C specific -----------------------------------------------------------
//   if (lower.includes('ac') || lower.includes('air condition') || lower.includes('a/c')) {
//     return {
//       text: 'Your A/C is the single biggest contributor this cycle at roughly 34% of total usage.',
//       bullets: [
//         'Set the thermostat to 24-25°C instead of 20-22°C-every degree lower can add ~5% to running cost.',
//         'Clean the filter monthly; a clogged filter makes the compressor work harder for the same cooling.',
//         'Consider the off-peak schedule below to automatically shift usage after 10 PM.',
//       ],
//       hasAction: true,
//       actionId: 'ac-peak',
//     };
//   }

//   // --- water heater ------------------------------------------------------------
//   if (lower.includes('water heater') || lower.includes('geyser') || lower.includes('hot water')) {
//     return {
//       text: 'The water heater is your second largest load. A thermostat tweak is the fastest win here.',
//       bullets: [
//         'Lower the thermostat from 60°C to 50°C-still comfortably hot for showers.',
//         'Insulate exposed pipework near the tank to reduce standby heat loss.',
//         'Estimated saving: ~5 units (about LKR 950) per month.',
//       ],
//     };
//   }

//   // --- appliance breakdown -------------------------------------------------------
//   if (lower.includes('appliance') || lower.includes('breakdown') || lower.includes('which device')) {
//     const top = [...MOCK_APPLIANCES].sort((a, b) => b.units - a.units).slice(0, 4);
//     return {
//       text: 'Here is your current appliance-level breakdown for this billing cycle:',
//       bullets: top.map((a) => `${a.name}: ${a.units} units (${Math.round(a.share * 100)}% of total)`),
//     };
//   }

//   // --- greetings -----------------------------------------------------------------
//   if (['hi', 'hello', 'hey', 'good morning', 'good evening'].some((g) => lower.startsWith(g))) {
//     return {
//       text: "Hi there! I'm your PowerTrack Assistant. Ask me about your bill, appliances, or how to cut down your CEB tariff tier.",
//     };
//   }

//   // --- thanks -----------------------------------------------------------------------
//   if (lower.includes('thank')) {
//     return { text: "You're welcome! I'll keep watching your usage and flag anything unusual." };
//   }

//   // --- fallback / default -------------------------------------------------------------
//   return {
//     text: `Regarding "${query}": keeping an eye on your highest-wattage appliances (A/C, water heater, iron) is the fastest lever. Shaving even 1.5 units a day saves roughly LKR 1,200/month at your current tariff block.`,
//   };
// }

// /* ============================================================================
//  * 5b. LIVE AI REPLY-Gemini via /api/chat, with automatic local fallback
//  * ----------------------------------------------------------------------------
//  *  Tries the server-side Gemini route first (keeps GEMINI_API_KEY private).
//  *  If that call fails for ANY reason-missing key, quota/rate-limit hit
//  *  (HTTP 429), network error, timeout, malformed response-this transparently
//  *  falls back to the local generateAssistantReply() engine above, so the
//  *  chatbot never goes silent even when the Gemini token runs out.
//  * ==========================================================================*/

// async function fetchAssistantReply(query, ctx) {
//   try {
//     const controller = new AbortController();
//     const timeoutId = setTimeout(() => controller.abort(), 12000);

//     const res = await fetch('/api/chat', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       signal: controller.signal,
//       body: JSON.stringify({
//         query,
//         usage: MOCK_USAGE_SNAPSHOT,
//         appliances: MOCK_APPLIANCES,
//         advice: OPTIMIZATION_ADVICE,
//       }),
//     });

//     clearTimeout(timeoutId);

//     if (!res.ok) {
//       throw new Error(`Gemini API responded with status ${res.status}`);
//     }

//     const data = await res.json();
//     return {
//       text: data.text,
//       bullets: data.bullets || [],
//       hasAction: Boolean(data.hasAction),
//       actionId: data.actionId || null,
//     };
//   } catch (err) {
//     // Gemini unavailable-quota exhausted, offline, misconfigured key, etc.
//     // Fall back to the local rule-based engine so the assistant keeps working.
//     console.warn('[PowerTrack] Gemini call failed, using local fallback engine:', err?.message || err);
//     return generateAssistantReply(query, ctx);
//   }
// }

// /* ============================================================================
//  * 6. SUB-COMPONENT-TARIFF SLAB PROGRESS BAR
//  * ==========================================================================*/

// function TariffSlabBar({ unitsUsed }) {
//   const maxScale = 180;
//   const activeBlock = findActiveTariffBlock(unitsUsed);

//   return (
//     <div className="space-y-1.5">
//       <div className="flex justify-between text-[11px] font-medium text-slate-400">
//         <span>
//           Current tier: <b className="text-slate-200">{activeBlock.label} units</b>
//         </span>
//         <span className="text-[#F9BE0B] font-semibold">
//           Next tier at {MOCK_USAGE_SNAPSHOT.nextTierAt} units
//         </span>
//       </div>

//       <div className="flex h-2.5 w-full overflow-hidden rounded-full border border-slate-700/50 bg-slate-800 p-0.5">
//         {CEB_TARIFF_BLOCKS.slice(0, 3).map((b, idx) => (
//           <div
//             key={b.id}
//             className={cx('h-full', idx === 0 && 'rounded-l-full')}
//             style={{ width: '33%', backgroundColor: b.color }}
//             title={`${b.label} units`}
//           />
//         ))}
//         <div className="h-full flex-1 rounded-r-full bg-slate-700" title="Unreached tiers" />
//       </div>

//       <div className="flex justify-between pt-0.5 text-[10px] text-slate-400">
//         <span>0-30</span>
//         <span>31-60</span>
//         <span className="font-bold text-[#F9BE0B]">61-90</span>
//         <span>91+</span>
//       </div>
//     </div>
//   );
// }

// /* ============================================================================
//  * 7. SUB-COMPONENT-COST PREDICTION CARD
//  * ==========================================================================*/

// function CostPredictionCard() {
//   const { projectedBillLKR, lastMonthBillLKR, unitsThisCycle, cycleLabel } = MOCK_USAGE_SNAPSHOT;
//   const delta = projectedBillLKR - lastMonthBillLKR;
//   const isUp = delta > 0;
//   const deltaPct = Math.round((Math.abs(delta) / lastMonthBillLKR) * 100);

//   return (
//     <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-[#0B1326] p-5 shadow-lg">
//       <div className="mb-3 flex items-center justify-between">
//         <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
//           <TrendingUp className="h-4 w-4 text-[#36B6D4]" />
//           <span>Cost Predictions</span>
//         </div>
//         <span className="rounded bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-400">
//           {cycleLabel}
//         </span>
//       </div>

//       <p className="mb-4 text-xs leading-snug text-slate-400">
//         Estimated CEB bill for current billing cycle.
//       </p>

//       <div className="mb-1 flex items-baseline gap-2">
//         <span className="text-2xl font-black text-[#10DB91]">LKR</span>
//         <span className="text-4xl font-extrabold tracking-tight text-white">
//           {projectedBillLKR.toLocaleString('en-LK')}
//         </span>
//         <span className="ml-1 text-xs font-semibold text-slate-400">/ month</span>
//       </div>

//       <div
//         className={cx(
//           'mb-4 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium',
//           isUp ? 'bg-[#F2555A]/15 text-[#F2555A]' : 'bg-[#10DB91]/15 text-[#10DB91]'
//         )}
//       >
//         {isUp ? '▲' : '▼'} {deltaPct}% vs last month ({formatLKR(lastMonthBillLKR)})
//       </div>

//       <TariffSlabBar unitsUsed={unitsThisCycle} />

//       <div className="mt-4 flex items-center justify-between rounded-lg border border-dashed border-slate-700/60 px-3 py-2 text-[11px] text-slate-400">
//         <span>Your target this cycle</span>
//         <span className="font-semibold text-white">{formatLKR(MOCK_USAGE_SNAPSHOT.targetBillLKR)}</span>
//       </div>
//     </div>
//   );
// }

// /* ============================================================================
//  * 8. SUB-COMPONENT-SINGLE ADVICE ROW (expandable)
//  * ==========================================================================*/

// function AdviceRow({ item, isOpen, onToggle, isApplied, onApply }) {
//   const styles = SEVERITY_STYLES[item.severity] || SEVERITY_STYLES.secondary;

//   return (
//     <div
//       className={cx(
//         'rounded-lg border bg-slate-900/80 transition-all',
//         isOpen ? styles.ring : 'border-slate-800 hover:border-slate-700'
//       )}
//     >
//       <button
//         onClick={onToggle}
//         className="group flex w-full items-center justify-between gap-3 p-3.5 text-left"
//       >
//         <div className="flex min-w-0 items-start gap-2.5">
//           <span
//             className={cx(
//               'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-800',
//               styles.text
//             )}
//           >
//             <ApplianceIcon name={item.icon} className="h-3.5 w-3.5" />
//           </span>
//           <div className="min-w-0">
//             <h4 className={cx('text-xs font-bold text-slate-200 transition-colors', `group-hover:${styles.text}`)}>
//               {item.title}
//             </h4>
//             <p className="mt-0.5 truncate text-[11px] leading-relaxed text-slate-400">
//               {item.summary}
//             </p>
//           </div>
//         </div>
//         <ChevronRight
//           className={cx(
//             'h-3.5 w-3.5 shrink-0 text-slate-500 transition-transform',
//             isOpen && 'rotate-90'
//           )}
//         />
//       </button>

//       {isOpen && (
//         <div className="border-t border-slate-800 px-3.5 py-3">
//           <p className="text-[11px] leading-relaxed text-slate-400">{item.detail}</p>
//           <div className="mt-3 flex items-center justify-between">
//             <span className="text-[11px] text-slate-500">
//               Est. saving:{' '}
//               <span className="font-semibold text-[#10DB91]">{formatLKR(item.estSavingLKR)}</span>{' '}
//               ({item.estSavingUnits} units)
//             </span>
//             <button
//               onClick={onApply}
//               disabled={isApplied}
//               className={cx(
//                 'rounded-lg px-3 py-1.5 text-[11px] font-bold transition-all',
//                 isApplied
//                   ? 'cursor-default border border-slate-700 bg-slate-800 text-slate-400'
//                   : 'cursor-pointer bg-[#10DB91] text-slate-950 hover:bg-[#0ece87] active:scale-95'
//               )}
//             >
//               {isApplied ? (
//                 <span className="flex items-center gap-1">
//                   <Check className="h-3.5 w-3.5" /> {item.actionAppliedLabel}
//                 </span>
//               ) : (
//                 item.actionLabel
//               )}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ============================================================================
//  * 9. SUB-COMPONENT-OPTIMIZATION ADVICE LIST
//  * ==========================================================================*/

// function OptimizationAdviceCard({ appliedIds, onApply }) {
//   const [openId, setOpenId] = useState(null);

//   return (
//     <div className="flex flex-1 flex-col rounded-xl border border-slate-800 bg-[#0B1326] p-5 shadow-lg">
//       <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-slate-300">
//         <Lightbulb className="h-4 w-4 text-[#F9BE0B]" />
//         <span>Optimization Advice</span>
//         <span className="ml-auto rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-normal text-slate-400">
//           {OPTIMIZATION_ADVICE.length} tips
//         </span>
//       </div>

//       <div className="flex-1 space-y-3 overflow-y-auto pr-1">
//         {OPTIMIZATION_ADVICE.map((item) => (
//           <AdviceRow
//             key={item.id}
//             item={item}
//             isOpen={openId === item.id}
//             onToggle={() => setOpenId(openId === item.id ? null : item.id)}
//             isApplied={appliedIds.includes(item.id)}
//             onApply={() => onApply(item)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ============================================================================
//  * 10. SUB-COMPONENT-CHAT MESSAGE BUBBLE
//  * ==========================================================================*/

// function MessageBubble({ message, isActionApplied, onApplyAction }) {
//   const isUser = message.sender === 'user';

//   return (
//     <div className={cx('flex items-start gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}>
//       <div
//         className={cx(
//           'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
//           isUser
//             ? 'bg-[#36B6D4] text-xs font-bold text-slate-950'
//             : 'border border-[#10DB91]/30 bg-[#10DB91]/20 text-[#10DB91]'
//         )}
//       >
//         {isUser ? <User className="h-4 w-4" /> : <Bot className="h-3.5 w-3.5" />}
//       </div>

//       <div
//         className={cx(
//           'max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed sm:max-w-[78%]',
//           isUser
//             ? 'rounded-tr-none bg-[#36B6D4] font-medium text-slate-950'
//             : 'rounded-tl-none border border-slate-800 bg-[#0B1326] text-slate-200 shadow-md'
//         )}
//       >
//         <p className="whitespace-pre-line">{message.text}</p>

//         {message.bullets && (
//           <ul className="mt-2.5 space-y-2 border-t border-slate-800/80 pt-2.5 text-slate-300">
//             {message.bullets.map((pt, idx) => (
//               <li key={idx} className="flex items-start gap-2">
//                 <span className="mt-0.5 text-[#10DB91]">•</span>
//                 <span>{pt}</span>
//               </li>
//             ))}
//           </ul>
//         )}

//         {message.hasAction && (
//           <div className="mt-3.5 border-t border-slate-800/80 pt-2">
//             <button
//               onClick={onApplyAction}
//               disabled={isActionApplied}
//               className={cx(
//                 'flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-bold transition-all',
//                 isActionApplied
//                   ? 'cursor-default border border-slate-700 bg-slate-800 text-slate-400'
//                   : 'cursor-pointer bg-[#10DB91] text-slate-950 shadow-md shadow-[#10DB91]/20 hover:bg-[#0ece87] active:scale-95'
//               )}
//             >
//               {isActionApplied ? (
//                 <>
//                   <Check className="h-3.5 w-3.5" />
//                   <span>Schedule Applied</span>
//                 </>
//               ) : (
//                 <span>Apply A/C Schedule</span>
//               )}
//             </button>
//           </div>
//         )}

//         <span
//           className={cx(
//             'mt-1.5 block text-right text-[9px]',
//             isUser ? 'text-slate-800' : 'text-slate-500'
//           )}
//         >
//           {message.timestamp}
//         </span>
//       </div>
//     </div>
//   );
// }

// /* ============================================================================
//  * 11. SUB-COMPONENT-TYPING / "ANALYZING" INDICATOR
//  * ==========================================================================*/

// function AnalyzingIndicator() {
//   return (
//     <div className="flex items-start gap-3">
//       <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#10DB91]/30 bg-[#10DB91]/20 text-[#10DB91]">
//         <Bot className="h-3.5 w-3.5" />
//       </div>
//       <div className="flex items-center gap-2 rounded-2xl rounded-tl-none border border-slate-800 bg-[#0B1326] px-4 py-3 text-xs text-slate-400 shadow-md">
//         <RefreshCw className="h-3.5 w-3.5 animate-spin text-[#10DB91]" />
//         <span>Analyzing CEB usage patterns...</span>
//       </div>
//     </div>
//   );
// }

// /* ============================================================================
//  * 12. SUB-COMPONENT-QUICK PROMPT CHIPS
//  * ==========================================================================*/

// function QuickPromptRow({ onPick, disabled }) {
//   return (
//     <div className="no-scrollbar mb-3 flex items-center gap-2 overflow-x-auto pb-1">
//       {QUICK_PROMPTS.map((p) => (
//         <button
//           key={p}
//           onClick={() => onPick(p)}
//           disabled={disabled}
//           className="whitespace-nowrap rounded-full border border-slate-700/60 bg-slate-800/80 px-3 py-1 text-[11px] font-medium text-slate-300 transition-colors hover:bg-slate-700 disabled:opacity-50"
//         >
//           "{p}"
//         </button>
//       ))}
//     </div>
//   );
// }

// /* ============================================================================
//  * 13. SUB-COMPONENT-CHAT INPUT BAR
//  * ==========================================================================*/

// function ChatInputBar({ value, onChange, onSubmit, disabled }) {
//   return (
//     <form onSubmit={onSubmit} className="relative flex items-center">
//       <input
//         type="text"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         placeholder="Ask about your energy usage..."
//         disabled={disabled}
//         className="w-full rounded-xl border border-slate-800 bg-[#0F172A] py-3 pl-4 pr-12 text-xs text-white placeholder-slate-500 transition-all focus:border-[#10DB91] focus:outline-none focus:ring-1 focus:ring-[#10DB91] disabled:opacity-60"
//       />
//       <button
//         type="submit"
//         disabled={disabled || !value.trim()}
//         className="absolute right-2 cursor-pointer rounded-lg bg-[#10DB91] p-2 text-slate-950 transition-all hover:bg-[#0ece87] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#10DB91]"
//         aria-label="Send message"
//       >
//         <Send className="h-4 w-4" />
//       </button>
//     </form>
//   );
// }

// /* ============================================================================
//  * 14. SUB-COMPONENT-CHAT PANEL HEADER
//  * ==========================================================================*/

// function ChatPanelHeader({ onClear }) {
//   return (
//     <div className="flex items-center justify-between border-b border-slate-800/80 bg-[#0F172A]/90 p-4 backdrop-blur">
//       <div className="flex items-center gap-3">
//         <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#10DB91]/40 bg-[#10DB91]/20 text-[#10DB91]">
//           <Bot className="h-5 w-5" />
//         </div>
//         <div>
//           <h3 className="text-sm font-bold leading-tight text-white">PowerTrack Assistant</h3>
//           {/* <p className="mt-0.5 flex items-center gap-1 text-[10px] text-slate-400">
//             <span>Demo mode-mock responses</span>
//             <span className="inline-block h-1 w-1 rounded-full bg-[#10DB91]" />
//           </p> */}
//         </div>
//       </div>

//       <div className="flex items-center gap-1">
//         <button
//           onClick={onClear}
//           title="Clear conversation"
//           className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-slate-200"
//         >
//           <Trash2 className="h-4 w-4" />
//         </button>
//         <button className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-800/60 hover:text-slate-200">
//           <MoreVertical className="h-4 w-4" />
//         </button>
//       </div>
//     </div>
//   );
// }

// /* ============================================================================
//  * 15. SUB-COMPONENT-DASHBOARD TOP HEADER
//  * ==========================================================================*/

// function DashboardHeader() {
//   return (
//     <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-800/80 bg-[#0F172A] px-6">
//       <div className="flex items-center gap-2">
//         <h1 className="text-base font-bold tracking-wide text-white">AI Insights &amp; Assistant</h1>
//         {/* <span className="rounded-full border border-[#10DB91]/30 bg-[#10DB91]/10 px-2 py-0.5 text-[10px] font-semibold text-[#10DB91]">
//           Demo Data
//         </span> */}
//       </div>

//       <div className="flex items-center gap-3">
//         <div className="flex items-center gap-2 rounded-lg border border-slate-700/50 bg-slate-800/60 px-3 py-1 text-xs text-slate-300">
//           <span className="h-2 w-2 animate-pulse rounded-full bg-[#10DB91]" />
//           <span>
//             Tariff Cycle: <b>{MOCK_USAGE_SNAPSHOT.cycleLabel}</b>
//           </span>
//         </div>
//       </div>
//     </header>
//   );
// }

// /* ============================================================================
//  * 16. MAIN COMPONENT
//  * ==========================================================================*/

// export default function AIInsightsDashboard() {
//   // Chat state
//   const [messages, setMessages] = useState(INITIAL_MESSAGES);
//   const [inputValue, setInputValue] = useState('');
//   const [isThinking, setIsThinking] = useState(false);

//   // Advice / action state-tracked by id so both the advice card list and
//   // any inline chat "Apply" buttons stay in sync.
//   const [appliedActionIds, setAppliedActionIds] = useState([]);

//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages, isThinking]);

//   // --- Apply an optimization action (from either the advice card list or a
//   //     chat message's inline button). Pure local state-no backend call. ---
//   function applyAction(item) {
//     if (appliedActionIds.includes(item.id)) return;
//     setAppliedActionIds((prev) => [...prev, item.id]);

//     setMessages((prev) => [
//       ...prev,
//       {
//         id: `applied-${item.id}-${Date.now()}`,
//         sender: 'bot',
//         text: `✅ ${item.actionLabel} applied! Estimated saving: ${formatLKR(
//           item.estSavingLKR
//         )} (${item.estSavingUnits} units) this cycle.`,
//         timestamp: nowTime(),
//       },
//     ]);
//   }

//   // --- Handle chat submit-tries the Gemini-backed /api/chat route first,
//   //     and transparently falls back to the local mock engine if Gemini is
//   //     unavailable (missing key, quota exhausted, network error, etc). ---
//   async function handleSubmit(e) {
//     e.preventDefault();
//     const text = inputValue.trim();
//     if (!text || isThinking) return;

//     const userMessage = {
//       id: `user-${Date.now()}`,
//       sender: 'user',
//       text,
//       timestamp: nowTime(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInputValue('');
//     setIsThinking(true);

//     // Keep a small minimum delay so the "Analyzing..." indicator doesn't just
//     // flash instantly when the fallback engine resolves synchronously fast.
//     const minDelay = new Promise((resolve) => setTimeout(resolve, 500));
//     const [reply] = await Promise.all([
//       fetchAssistantReply(text, { appliedActionIds }),
//       minDelay,
//     ]);

//     setMessages((prev) => [
//       ...prev,
//       {
//         id: `bot-${Date.now()}`,
//         sender: 'bot',
//         text: reply.text,
//         bullets: reply.bullets,
//         hasAction: reply.hasAction || false,
//         actionId: reply.actionId || null,
//         timestamp: nowTime(),
//       },
//     ]);
//     setIsThinking(false);
//   }

//   function handleQuickPrompt(promptText) {
//     setInputValue(promptText);
//   }

//   function handleClearChat() {
//     setMessages([
//       {
//         id: `cleared-${Date.now()}`,
//         sender: 'bot',
//         text: 'Chat cleared. Ask me anything about your household electricity usage or CEB bill forecasts!',
//         timestamp: nowTime(),
//       },
//     ]);
//   }

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-[#0B1326] p-2 font-sans text-slate-100 sm:p-4 md:p-6">
//       {/* Dashboard shell-sidebar intentionally omitted per spec */}
//       <div className="flex h-[860px] w-full max-w-[1280px] flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-[#0F172A] shadow-2xl">
//         <DashboardHeader />

//         {/* Two-column body: advice column + chat column */}
//         <div className="grid flex-1 grid-cols-1 overflow-hidden lg:grid-cols-12">
//           {/* ================= LEFT: Cost + Advice ================= */}
//           <section className="custom-scrollbar flex flex-col gap-5 overflow-y-auto border-r border-slate-800/80 bg-[#0F172A]/50 p-5 lg:col-span-5">
//             <CostPredictionCard />
//             <OptimizationAdviceCard appliedIds={appliedActionIds} onApply={applyAction} />
//           </section>

//           {/* ================= RIGHT: Chat Assistant ================= */}
//           <section className="relative flex flex-col overflow-hidden bg-[#0F172A] lg:col-span-7">
//             <ChatPanelHeader onClear={handleClearChat} />

//             <div className="custom-scrollbar flex-1 space-y-4 overflow-y-auto p-4 sm:p-6">
//               {messages.map((message) => (
//                 <MessageBubble
//                   key={message.id}
//                   message={message}
//                   isActionApplied={
//                     message.actionId ? appliedActionIds.includes(message.actionId) : false
//                   }
//                   onApplyAction={() => {
//                     if (!message.actionId) return;
//                     const item = OPTIMIZATION_ADVICE.find((a) => a.id === message.actionId);
//                     if (item) applyAction(item);
//                   }}
//                 />
//               ))}

//               {isThinking && <AnalyzingIndicator />}

//               <div ref={chatEndRef} />
//             </div>

//             <div className="border-t border-slate-800/80 bg-[#0B1326]/60 p-4">
//               <QuickPromptRow onPick={handleQuickPrompt} disabled={isThinking} />
//               <ChatInputBar
//                 value={inputValue}
//                 onChange={setInputValue}
//                 onSubmit={handleSubmit}
//                 disabled={isThinking}
//               />
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// }