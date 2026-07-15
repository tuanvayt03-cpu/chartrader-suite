import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { orders } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { MobileTradeCard } from "./mobile-trade-card";

export function OrderHistoryTable() {
  const { t, formatCurrency, formatDate } = useI18n();
  const [tab, setTab] = useState<"open" | "closed">("open");
  return (
    <Card className="p-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
        <div className="text-sm font-medium">{t("dash.orderHistory")}</div>
        <div className="inline-flex rounded-lg border border-border bg-muted/50 p-0.5 text-xs">
          {(["open", "closed"] as const).map((k) => (
            <button key={k} onClick={() => setTab(k)}
              className={cn("rounded-md px-3 py-1 font-medium transition-colors",
                tab === k ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground")}>
              {k === "open" ? t("dash.openTrades") : t("dash.closedTrades")}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-[900px] text-sm">
          <thead className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
            <tr>
              {[
                "order.symbol","order.type","order.openDate","order.openPrice","order.sl","order.tp",
                "order.closeDate","order.closePrice","order.lots","order.profitCol","order.duration","order.gain",
              ].map((k) => <th key={k} className="px-4 py-3 font-medium">{t(k as never)}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((o) => (
              <tr key={o.id} className="text-xs">
                <td className="px-4 py-3 font-medium">{o.symbol}</td>
                <td className="px-4 py-3">
                  <span className={cn("rounded-md px-2 py-0.5 text-[11px] font-medium",
                    o.type === "buy" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700")}>
                    {o.type === "buy" ? t("order.buy") : t("order.sell")}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(o.openDate)}</td>
                <td className="px-4 py-3">{o.openPrice.toFixed(5)}</td>
                <td className="px-4 py-3 text-muted-foreground">{o.sl || 0}</td>
                <td className="px-4 py-3 text-muted-foreground">{o.tp || 0}</td>
                <td className="px-4 py-3 text-muted-foreground">{formatDate(o.closeDate)}</td>
                <td className="px-4 py-3">{o.closePrice.toFixed(5)}</td>
                <td className="px-4 py-3">{o.lots}</td>
                <td className={cn("px-4 py-3 font-medium", o.profit >= 0 ? "text-emerald-600" : "text-rose-600")}>
                  {o.profit >= 0 ? "+" : ""}{formatCurrency(o.profit)}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{o.duration}</td>
                <td className={cn("px-4 py-3 font-medium", o.gainPct >= 0 ? "text-emerald-600" : "text-rose-600")}>
                  {o.gainPct >= 0 ? "+" : ""}{o.gainPct.toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-2 p-3 lg:hidden">
        {orders.map((o) => <MobileTradeCard key={o.id} order={o} />)}
      </div>

      <div className="flex items-center justify-between border-t border-border p-3 text-xs text-muted-foreground">
        <span>Showing 12</span>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" className="h-7 text-xs">1</Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs">2</Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs">3</Button>
        </div>
      </div>
    </Card>
  );
}