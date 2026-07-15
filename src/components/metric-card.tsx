import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function MetricCard({
  icon, label, value, trend, tone = "neutral",
}: {
  icon: ReactNode; label: string; value: string; trend?: { text: string; positive?: boolean };
  tone?: "neutral" | "positive" | "negative";
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span
          className={cn(
            "grid h-7 w-7 place-items-center rounded-lg",
            tone === "positive" && "bg-emerald-50 text-emerald-600",
            tone === "negative" && "bg-rose-50 text-rose-600",
            tone === "neutral" && "bg-primary/10 text-primary",
          )}
        >
          {icon}
        </span>
        <span className="truncate font-medium text-foreground">{label}</span>
      </div>
      <div className="mt-3 flex items-end justify-between gap-2">
        <div className="truncate text-xl font-semibold tracking-tight">{value}</div>
        {trend && (
          <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-medium",
            trend.positive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600")}>
            {trend.text}
          </span>
        )}
      </div>
    </Card>
  );
}