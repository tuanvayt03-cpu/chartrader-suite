import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { PeriodSelector, type Period } from "./period-selector";
import { monthLabels, revenueBubbles, summary } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n";

const INTENSITY = ["#e6f7f4", "#8ed8ce", "#2fb3a1", "#0d8f7f"];
const Y_LABELS = [1800, 1500, 1200, 900, 600, 300, 0];

export function RevenueOverTimeSlide() {
  const { t, formatCurrency, formatPercent } = useI18n();
  const [period, setPeriod] = useState<Period>("30d");
  const [hover, setHover] = useState<{ m: number; b: number } | null>(null);

  const rows = 8; // 8 buckets vertically
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-base font-semibold">{t("dash.revenueOverTime")}</div>
          <div className="mt-1 text-xl font-bold tracking-tight">{formatCurrency(summary.revenueTotal)}</div>
          <div className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            +{formatPercent(summary.revenueTrendPct, 0)} {t("dash.increasedVsLastMonth")}
          </div>
        </div>
        <PeriodSelector value={period} onChange={setPeriod} />
      </div>

      <div className="mt-4 flex min-h-0 flex-1 gap-2">
        <div className="flex flex-col justify-between py-1 text-[10px] text-muted-foreground">
          {Y_LABELS.map((y) => <div key={y}>{y}</div>)}
        </div>
        <div className="relative flex-1">
          <div className="grid h-[220px] grid-cols-12 gap-1.5">
            {revenueBubbles.map((col, m) => (
              <div key={m} className="flex flex-col-reverse items-center justify-between">
                {Array.from({ length: rows }, (_, b) => {
                  const intensity = col[b] ?? 0;
                  const hi = hover?.m === m && hover.b === b;
                  return (
                    <div
                      key={b}
                      className="relative"
                      onMouseEnter={() => setHover({ m, b })}
                      onMouseLeave={() => setHover(null)}
                    >
                      <div
                        className="h-3.5 w-3.5 rounded-full transition-transform sm:h-4 sm:w-4"
                        style={{ background: INTENSITY[intensity], transform: hi ? "scale(1.4)" : undefined }}
                      />
                      {hi && (
                        <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[10px] font-medium text-background shadow">
                          {monthLabels[m]} · {Y_LABELS[rows - 1 - b] ?? 0}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="mt-2 grid grid-cols-12 gap-1.5 text-center text-[10px] text-muted-foreground">
            {monthLabels.map((m) => <div key={m}>{m}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}