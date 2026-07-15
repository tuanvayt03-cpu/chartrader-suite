// Mock service boundary for future backend integration.
// NOTE: When wired to a real backend, disableSource() MUST unsubscribe the
// source from the active ingestion pipeline BEFORE any parser runs — the
// disabled state means "not received or parsed at all", not "parsed then
// blocked downstream".
import type { ImportRow, TelegramSource } from "./types";

const groups = ["Gold Desk", "FX Majors", "Indices", "Crypto Desk", "Beta"];
const parsers = ["parser.gold.v3", "parser.forex.v2", "parser.indices.v1", "parser.crypto.v2"];
const symbols = ["symbols.gold", "symbols.majors", "symbols.indices", "symbols.crypto"];

function sanitizeAutoName(raw: string): string {
  const tokens = raw.split(/\s+/).filter((w) => !/^(channel|group|trading)$/i.test(w));
  return tokens.join(" ").trim() || raw;
}

const seed: TelegramSource[] = [
  { id: "src-01", displayName: "GOLD VIP", rawTitle: "GOLD VIP TRADING CHANNEL", link: "https://t.me/goldvipexample", username: "@goldvipexample", group: groups[0], parserProfile: parsers[0], symbolProfile: symbols[0], priority: "high", visibility: "public", membership: "member", historyAccess: "verified", realtimeFollow: "verified", state: "enabled", lastVerified: "2026-07-14T09:22:00Z", chatId: "-1001987654321", commentName: "GOLD VIP", tags: ["gold", "london"] },
  { id: "src-02", displayName: "London Majors", rawTitle: "London Majors Trading Group", link: "https://t.me/londonmajorsex", username: "@londonmajorsex", group: groups[1], parserProfile: parsers[1], symbolProfile: symbols[1], priority: "medium", visibility: "public", membership: "member", historyAccess: "verified", realtimeFollow: "verified", state: "enabled", lastVerified: "2026-07-14T08:11:00Z", chatId: "-1001123456780", commentName: "LDN MAJORS" },
  { id: "src-03", displayName: "TradingView Signals", rawTitle: "TradingView Channel", link: "https://t.me/tvsignalsexample", username: "@tvsignalsexample", group: groups[2], parserProfile: parsers[2], symbolProfile: symbols[2], priority: "medium", visibility: "public", membership: "member", historyAccess: "verified", realtimeFollow: "pending", state: "enabled", lastVerified: "2026-07-13T22:40:00Z", chatId: "-1001998877665", commentName: "TV" },
  { id: "src-04", displayName: "BotBC", rawTitle: "BotBC Trading Group", link: "https://t.me/botbcexample", username: "@botbcexample", group: groups[3], parserProfile: parsers[3], symbolProfile: symbols[3], priority: "low", visibility: "private", membership: "member", historyAccess: "verified", realtimeFollow: "verified", state: "disabled", lastVerified: "2026-07-12T10:04:00Z", chatId: "-1001445566778", commentName: "BOTBC" },
  { id: "src-05", displayName: "Alpha Scalp", rawTitle: "Alpha Scalp Channel", link: "https://t.me/alphascalpexample", username: "@alphascalpexample", group: groups[4], parserProfile: parsers[1], symbolProfile: symbols[1], priority: "high", visibility: "public", membership: "not_member", historyAccess: "failed", realtimeFollow: "failed", state: "disabled", lastVerified: "2026-07-10T14:00:00Z", chatId: "-1001554433221", commentName: "ALPHASCALP" },
  { id: "src-06", displayName: "Indices Pro", rawTitle: "Indices Pro Group", link: "https://t.me/indicesproex", username: "@indicesproex", group: groups[2], parserProfile: parsers[2], symbolProfile: symbols[2], priority: "medium", visibility: "public", membership: "member", historyAccess: "verified", realtimeFollow: "verified", state: "enabled", lastVerified: "2026-07-14T07:00:00Z", chatId: "-1001112223330", commentName: "IDX PRO" },
];

export const SOURCE_GROUPS = groups;
export const PARSER_PROFILES = parsers;
export const SYMBOL_PROFILES = symbols;
export const PRIORITIES = ["high", "medium", "low"] as const;

export function generateDisplayName(raw: string) { return sanitizeAutoName(raw); }
export function listSources(): TelegramSource[] { return seed.slice(); }

export function previewImport(text: string): ImportRow[] {
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const existing = new Set(seed.map((s) => s.username.toLowerCase()));
  return lines.map((line): ImportRow => {
    const m = line.match(/^(?:https?:\/\/t\.me\/|@)([a-zA-Z0-9_]{3,})$/);
    if (!m) return { input: line, category: "invalid", detail: "Not a Telegram link" };
    const uname = "@" + m[1].toLowerCase();
    if (existing.has(uname)) return { input: line, category: "existing", displayName: uname };
    if (/noparser/i.test(uname)) return { input: line, category: "noParser" };
    if (/nosymbol/i.test(uname)) return { input: line, category: "noSymbol" };
    if (/conflict/i.test(uname)) return { input: line, category: "conflict" };
    return { input: line, category: "new", displayName: sanitizeAutoName(m[1]) };
  });
}

export function validateImport(rows: ImportRow[]) {
  return {
    ok: rows.filter((r) => r.category === "new").length,
    blocked: rows.filter((r) => r.category !== "new" && r.category !== "existing").length,
    rows,
  };
}

export async function applyImport(rows: ImportRow[]): Promise<{ applied: number }> {
  return { applied: rows.filter((r) => r.category === "new").length };
}
export async function enableSource(_id: string) { return { ok: true }; }
export async function disableSource(_id: string) { return { ok: true }; }
export async function deleteSource(_id: string) { return { ok: true }; }
export async function updateSource(_s: TelegramSource) { return { ok: true }; }