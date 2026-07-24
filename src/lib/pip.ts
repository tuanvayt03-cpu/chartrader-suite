const XAUUSD_FAMILY = new Set(["XAUUSD", "XAUEUR", "XAUAUD"]);

export function priceMoveToPips(symbol: string, priceMove: number): number {
  const s = symbol.toUpperCase();
  if (XAUUSD_FAMILY.has(s)) return priceMove * 10;
  if (s.endsWith("JPY")) return priceMove * 100;
  return priceMove * 10000;
}

export function pipsBetween(symbol: string, from: number, to: number): number {
  return priceMoveToPips(symbol, to - from);
}