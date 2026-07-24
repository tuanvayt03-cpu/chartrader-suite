export type RuntimeHealth = "healthy" | "degraded" | "input_required" | "blocked" | "stale" | "unavailable";

// No backend adapter is wired. Default to "unavailable — not connected".
export function useRuntimeHealth(): { state: RuntimeHealth; label: string; tone: string } {
  return { state: "unavailable", label: "notConnected", tone: "muted" };
}