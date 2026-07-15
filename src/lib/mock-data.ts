import type { Notification, Order } from "./types";

export const balanceSeries = [
  { t: "Mon", balance: 118500, equity: 118000 },
  { t: "Tue", balance: 119800, equity: 118600 },
  { t: "Wed", balance: 117200, equity: 116400 },
  { t: "Thu", balance: 120100, equity: 119200 },
  { t: "Fri", balance: 121500, equity: 120400 },
  { t: "Sat", balance: 120900, equity: 120000 },
  { t: "Sun", balance: 120567.9, equity: 119800 },
];

export const revenueBubbles: number[][] = (() => {
  const rand = (seed: number) => {
    let s = seed;
    return () => (s = (s * 9301 + 49297) % 233280) / 233280;
  };
  const r = rand(42);
  return Array.from({ length: 12 }, () =>
    Array.from({ length: 8 }, (_, i) => {
      const base = i < 3 ? 3 : i < 5 ? 2 : i < 7 ? 1 : 0;
      const jitter = r() > 0.75 ? -1 : r() > 0.6 ? 1 : 0;
      return Math.max(0, Math.min(3, base + jitter));
    }),
  );
})();

export const monthLabels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const mostTraded = [
  { symbol: "XAUUSD", color: "#2563eb" },
  { symbol: "EURUSD", color: "#f97316" },
  { symbol: "GBPUSD", color: "#0ea5e9" },
  { symbol: "USDJPY", color: "#14b8a6" },
  { symbol: "AUDCHF", color: "#8b5cf6" },
  { symbol: "NZDUSD", color: "#e11d48" },
];

export const notifications: Notification[] = [
  { id: "n1", time: "12m ago", type: "RiskBreach", message: "Closed trade not placed with a stop-loss", severity: "warning" },
  { id: "n2", time: "1h ago", type: "SignalDrop", message: "Provider Alpha missed 2 signals in last hour", severity: "info" },
  { id: "n3", time: "3h ago", type: "MarginCall", message: "Free margin below 25% on account 9999-042", severity: "danger" },
  { id: "n4", time: "8h ago", type: "RulesSoftBreach", message: "Trade opened outside allowed session window", severity: "warning" },
  { id: "n5", time: "1d ago", type: "SystemInfo", message: "Weekly performance report generated", severity: "info" },
];

export const orders: Order[] = Array.from({ length: 12 }, (_, i) => {
  const buy = i % 2 === 0;
  const symbols = ["XAUUSD", "EURUSD", "GBPUSD", "USDJPY", "AUDCHF"];
  const symbol = symbols[i % symbols.length];
  const profit = (buy ? 1 : -1) * (5 + (i * 7) % 40);
  return {
    id: `t${1000 + i}`,
    symbol,
    type: buy ? "buy" : "sell",
    openDate: `2026-07-${String(2 + (i % 12)).padStart(2, "0")}T06:12:16Z`,
    openPrice: 2.80568 + i * 0.001,
    sl: 0,
    tp: 0,
    closeDate: `2026-07-${String(2 + (i % 12)).padStart(2, "0")}T06:22:16Z`,
    closePrice: 1.80568 + i * 0.001,
    lots: 100,
    profit,
    duration: `${(i + 3) * 4}s`,
    gainPct: profit / 100,
  };
});

export const summary = {
  balance: 120567.9,
  equity: 240952,
  profitPct: 0.8,
  profitTarget: 8908.99,
  dailyLossLimit: 12908.99,
  equityPassLevel: 124900,
  equityBreachLevel: 124900,
  avgWin: 642,
  avgLoss: 0,
  profitFactor: 6.4,
  bestTrade: 8908.99,
  winRate: 68,
  riskReward: 3.49,
  revenueTotal: 90650278,
  revenueTrendPct: 56,
};