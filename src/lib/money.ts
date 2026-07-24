import type { AccountCurrency } from "./account-scope";

/** Reporting-only conversion. Never used to modify sizing configuration. */
export function toUsdReport(amount: number, native: AccountCurrency): number {
  return native === "USC" ? amount / 100 : amount;
}

export function formatNative(amount: number, native: AccountCurrency, locale = "en-US"): string {
  return new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount) + " " + native;
}