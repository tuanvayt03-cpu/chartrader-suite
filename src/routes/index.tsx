import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { MetricCard } from "@/components/metric-card";
import { NotificationsPanel } from "@/components/notifications-panel";
import { OrderHistoryTable } from "@/components/order-history-table";
import { useI18n } from "@/lib/i18n";
import { summary } from "@/lib/mock-data";
import { usePrivacy } from "@/lib/privacy";
import { TrendingUp, TrendingDown, Award, Trophy, Percent, Scale, Target, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { t, formatCurrency, formatPercent } = useI18n();
  const { mask } = usePrivacy();
  const money = (n: number) => mask(formatCurrency(n), "money");
  return (
    <AppShell>
      <PageHeader title={t("dash.title")} subtitle={t("dash.subtitle")} />

      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard icon={<Target className="h-4 w-4" />} label={t("dash.profitTarget")} value={money(summary.profitTarget)} tone="positive" />
        <MetricCard icon={<ShieldAlert className="h-4 w-4" />} label={t("dash.dailyLossLimit")} value={money(summary.dailyLossLimit)} tone="negative" />
        <MetricCard icon={<Trophy className="h-4 w-4" />} label={t("dash.bestTrade")} value={money(summary.bestTrade)} tone="positive" />
        <MetricCard icon={<Percent className="h-4 w-4" />} label={t("dash.winRate")} value={formatPercent(summary.winRate, 0)} tone="neutral" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
          <MetricCard icon={<TrendingUp className="h-4 w-4" />} label={t("dash.avgWin")} value={money(summary.avgWin)} trend={{ text: "+7%", positive: true }} tone="positive" />
          <MetricCard icon={<TrendingDown className="h-4 w-4" />} label={t("dash.avgLoss")} value={money(summary.avgLoss)} trend={{ text: "0%", positive: true }} tone="negative" />
          <MetricCard icon={<Award className="h-4 w-4" />} label={t("dash.profitFactor")} value={String(summary.profitFactor)} tone="neutral" />
          <MetricCard icon={<Scale className="h-4 w-4" />} label={t("dash.riskReward")} value={`${summary.riskReward}`} tone="neutral" />
          <Card className="p-4 text-sm text-muted-foreground sm:col-span-2">{t("common.needsAdapter")}</Card>
        </div>
        <NotificationsPanel />
      </div>

      <div className="mt-4">
        <OrderHistoryTable />
      </div>
    </AppShell>
  );
}
