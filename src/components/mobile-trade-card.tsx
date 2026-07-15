import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Order } from "@/lib/types";

export function MobileTradeCard({ order: o }: { order: Order }) {
  const { t, formatCurrency, formatDate } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <button className="flex w-full items-center justify-between gap-2 text-left" onClick={() => setOpen(!open)}>
        <div className="flex min-w-0 items-center gap-2">
          <span className="font-semibold">{o.symbol}</span>
          <span className={cn("rounded-md px-1.5 py-0.5 text-[10px] font-medium",
            o.type === "buy" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700")}>
            {o.type === "buy" ? t("order.buy") : t("order.sell")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn("text-sm font-semibold", o.profit >= 0 ? "text-emerald-600" : "text-rose-600")}>
            {o.profit >= 0 ? "+" : ""}{formatCurrency(o.profit)}
          </span>
          <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")} />
        </div>
      </button>
      <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
        <span>{formatDate(o.openDate)}</span>
        <span>{o.duration} · {o.lots} lot</span>
      </div>
      {open && (
        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 border-t border-border pt-3 text-[11px]">
          {[
            [t("order.openPrice"), o.openPrice.toFixed(5)],
            [t("order.closePrice"), o.closePrice.toFixed(5)],
            [t("order.sl"), String(o.sl || 0)],
            [t("order.tp"), String(o.tp || 0)],
            [t("order.closeDate"), formatDate(o.closeDate)],
            [t("order.gain"), `${o.gainPct >= 0 ? "+" : ""}${o.gainPct.toFixed(2)}%`],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <dt className="text-muted-foreground">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}