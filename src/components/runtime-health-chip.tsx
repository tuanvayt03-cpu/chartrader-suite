import { Badge } from "@/components/ui/badge";
import { useRuntimeHealth } from "@/lib/runtime-health";
import { useI18n } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const TONE: Record<string, string> = {
  healthy: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  degraded: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  input_required: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  blocked: "bg-rose-100 text-rose-700 hover:bg-rose-100",
  stale: "bg-slate-100 text-slate-700 hover:bg-slate-100",
  unavailable: "bg-muted text-muted-foreground",
};

export function RuntimeHealthChip() {
  const { t } = useI18n();
  const { state } = useRuntimeHealth();
  const label = t(`health.${state}` as never);
  return (
    <Link
      to="/runtime"
      className="inline-flex"
      aria-label={label}
    >
      <Badge variant="secondary" className={cn("gap-1.5 rounded-full", TONE[state])}>
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
        {label}
      </Badge>
    </Link>
  );
}