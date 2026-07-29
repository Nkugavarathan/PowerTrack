// PowerTrack SL — demo data
// In production these come from MongoDB via your API routes. Kept here so the
// UI is fully demo-able without a backend during the practicum presentation.

export const CEB_TARIFF_BLOCKS = [
  { label: "0–30", from: 0, to: 30, rate: 8, color: "var(--color-primary)" },
  { label: "31–60", from: 31, to: 60, rate: 10, color: "var(--color-secondary)" },
  { label: "61–90", from: 61, to: 90, rate: 27.75, color: "var(--color-tertiary)" },
  { label: "91–120", from: 91, to: 120, rate: 32, color: "var(--color-tertiary)" },
  { label: "121–180", from: 121, to: 180, rate: 44.55, color: "var(--color-danger)" },
  { label: "181+", from: 181, to: Infinity, rate: 55.86, color: "var(--color-danger)" },
];

export const currentUsage = {
  unitsThisMonth: 72,
  daysIntoCycle: 18,
  daysInCycle: 30,
  projectedUnits: 120,
  projectedBillLKR: 8450,
  lastMonthBillLKR: 7120,
  targetBillLKR: 8000,
};

export const appliances = [
  { id: "ac", name: "Air Conditioner — Master Bedroom", units: 34, share: 0.34, trend: "up" },
  { id: "fridge", name: "Refrigerator", units: 18, share: 0.18, trend: "flat" },
  { id: "heater", name: "Water Heater", units: 16, share: 0.16, trend: "up" },
  { id: "wash", name: "Washing Machine", units: 9, share: 0.09, trend: "down" },
  { id: "lights", name: "Lighting (whole house)", units: 8, share: 0.08, trend: "flat" },
  { id: "tv", name: "Entertainment Center", units: 7, share: 0.07, trend: "flat" },
  { id: "other", name: "Other devices", units: 8, share: 0.08, trend: "flat" },
];

export const optimizationAdvice = [
  {
    id: "ac-peak",
    title: "A/C Usage Peak",
    severity: "tertiary",
    summary: "Shift cooling to off-peak hours (10 PM – 5 AM) to save ~LKR 1,200.",
    detail:
      "Your Master Bedroom A/C runs heaviest between 7–9 PM, which overlaps the CEB peak tariff window. Shifting 2 hours of usage to after 10 PM keeps the same comfort level at a lower effective rate.",
    estimatedSavingLKR: 1200,
    estimatedSavingUnits: 6,
    action: "Apply A/C Schedule",
  },
  {
    id: "phantom",
    title: "Phantom Load",
    severity: "secondary",
    summary: "Entertainment center is drawing 15W while off. Unplug to optimize.",
    detail:
      "Standby draw from the TV, soundbar, and set-top box adds up to roughly 11 units a month even when nothing is being watched. A single switched power strip removes this entirely.",
    estimatedSavingLKR: 340,
    estimatedSavingUnits: 3,
    action: "Set Standby Reminder",
  },
  {
    id: "heater",
    title: "Water Heater",
    severity: "danger",
    summary: "Reduce thermostat from 60°C to 50°C. High impact on current slab.",
    detail:
      "Your water heater is the second largest contributor this cycle. Lowering the thermostat by 10°C typically cuts heating energy by 12–15% with no noticeable difference in shower comfort.",
    estimatedSavingLKR: 950,
    estimatedSavingUnits: 5,
    action: "Adjust Thermostat Target",
  },
  {
    id: "wash-offpeak",
    title: "Washing Machine Timing",
    severity: "primary",
    summary: "Run wash cycles on weekends during off-peak hours to save ~4 units.",
    detail:
      "Weekday evening loads land in the most expensive tariff block. Moving laundry to Saturday/Sunday mornings avoids peak pricing without changing your routine much.",
    estimatedSavingLKR: 260,
    estimatedSavingUnits: 4,
    action: "Add Weekend Reminder",
  },
];

export const suggestedPrompts = [
  "Analyze weekend usage",
  "Solar projection",
  "Why is my bill higher this month?",
  "How can I keep my bill under LKR 8,000?",
];

export const initialMessages = [
  {
    id: "m1",
    role: "assistant",
    content:
      "Hello! I've analyzed your energy usage for this week. It looks like you're on track to hit the 61–90 unit CEB tier.",
    timestamp: "09:12",
  },
];

export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "grid" },
  { id: "bills", label: "Bills", icon: "receipt" },
  { id: "appliances", label: "Appliances", icon: "plug" },
  { id: "ai-insights", label: "AI Insights", icon: "spark" },
];

export const footerNavItems = [
  { id: "settings", label: "Settings", icon: "gear" },
  { id: "support", label: "Support", icon: "help" },
];
