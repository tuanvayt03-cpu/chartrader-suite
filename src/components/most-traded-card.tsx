import { Card } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { mostTraded } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n";

export function MostTradedCard() {
  const { t } = useI18n();
  const total = 16;
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="text-sm font-medium">{t("dash.mostTraded")}</div>
        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-3 flex items-center gap-4">
        <div className="grid flex-1 grid-cols-2 gap-x-3 gap-y-2 text-xs">
          {mostTraded.map((m) => (
            <div key={m.symbol} className="flex items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-sm" style={{ background: m.color }} />
              <span className="truncate">{m.symbol}</span>
            </div>
          ))}
        </div>
        <div className="relative grid h-16 w-16 shrink-0 place-items-center">
          <svg viewBox="0 0 36 36" className="absolute inset-0 h-full w-full -rotate-90">
            <circle cx="18" cy="18" r="15" fill="none" stroke="var(--color-border)" strokeWidth="3" />
            <circle cx="18" cy="18" r="15" fill="none" stroke="var(--color-primary)" strokeWidth="3"
              strokeDasharray={`${(total / 20) * 94.25} 94.25`} strokeLinecap="round" />
          </svg>
          <div className="text-center">
            <div className="text-[10px] text-muted-foreground">{t("common.total")}</div>
            <div className="text-sm font-semibold">{total}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}