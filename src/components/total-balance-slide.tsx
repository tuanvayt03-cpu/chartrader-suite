import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { TrendingUp } from "lucide-react";
import { PeriodSelector, type Period } from "./period-selector";
import { balanceSeries, summary } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n";

export function TotalBalanceSlide() {
  const { t, formatCurrency, formatPercent } = useI18n();
  const [period, setPeriod] = useState<Period>("7d");

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-base font-semibold">{t("dash.totalBalance")}</div>
          <div className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            {t("dash.profit")}: +{formatPercent(summary.profitPct, 1)}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div>
            <div className="text-muted-foreground">{t("dash.balance")}</div>
            <div className="text-sm font-semibold">{formatCurrency(summary.balance)}</div>
          </div>
          <div>
            <div className="text-muted-foreground">{t("dash.equity")}</div>
            <div className="text-sm font-semibold">{formatCurrency(summary.equity)}</div>
          </div>
          <PeriodSelector value={period} onChange={setPeriod} />
        </div>
      </div>

      <div className="mt-4 min-h-0 flex-1">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={balanceSeries} margin={{ top: 10, right: 8, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="var(--color-border)" strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="t" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
              tickFormatter={(v) => `$${Math.round(v / 1000)}k`} width={48} />
            <Tooltip
              contentStyle={{ borderRadius: 10, border: "1px solid var(--color-border)", fontSize: 12 }}
              formatter={(v: number, name) => [formatCurrency(v), String(name)]}
            />
            <Line type="monotone" dataKey="balance" stroke="#2563eb" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} name={t("dash.balance")} />
            <Line type="monotone" dataKey="equity" stroke="#f97316" strokeWidth={2.5} dot={false} activeDot={{ r: 4 }} name={t("dash.equity")} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}