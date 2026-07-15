import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { DashboardHeader } from "@/components/dashboard-header";
import { AnalyticsCarousel } from "@/components/analytics-carousel";
import { RiskLimitCard } from "@/components/risk-limit-card";
import { MostTradedCard } from "@/components/most-traded-card";
import { MetricCard } from "@/components/metric-card";
import { NotificationsPanel } from "@/components/notifications-panel";
import { OrderHistoryTable } from "@/components/order-history-table";
import { useI18n } from "@/lib/i18n";
import { summary } from "@/lib/mock-data";
import { Target, ShieldAlert, TrendingUp, TrendingDown, Award, Trophy, Percent, Scale } from "lucide-react";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { t, formatCurrency, formatPercent } = useI18n();
  return (
    <AppShell>
      <DashboardHeader title={t("dash.title")} subtitle={t("dash.subtitle")} />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AnalyticsCarousel />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <RiskLimitCard
            icon={<Target className="h-4 w-4" />}
            title={t("dash.profitTarget")}
            subtitle={`Of ${formatCurrency(12009)}`}
            value={formatCurrency(summary.profitTarget)}
            footerLabel={t("dash.equityPassLevel")}
            footerValue={formatCurrency(summary.equityPassLevel)}
          />
          <RiskLimitCard
            icon={<ShieldAlert className="h-4 w-4" />}
            title={t("dash.dailyLossLimit")}
            subtitle={`Of ${formatCurrency(12009)}`}
            value={formatCurrency(summary.dailyLossLimit)}
            footerLabel={t("dash.equityBreachLevel")}
            footerValue={formatCurrency(summary.equityBreachLevel)}
          />
          <MostTradedCard />
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
          <MetricCard icon={<TrendingUp className="h-4 w-4" />} label={t("dash.avgWin")} value={formatCurrency(summary.avgWin)} trend={{ text: "+7%", positive: true }} tone="positive" />
          <MetricCard icon={<TrendingDown className="h-4 w-4" />} label={t("dash.avgLoss")} value={formatCurrency(summary.avgLoss)} trend={{ text: "0%", positive: true }} tone="negative" />
          <MetricCard icon={<Award className="h-4 w-4" />} label={t("dash.profitFactor")} value={String(summary.profitFactor)} tone="neutral" />
          <MetricCard icon={<Trophy className="h-4 w-4" />} label={t("dash.bestTrade")} value={formatCurrency(summary.bestTrade)} tone="positive" />
          <MetricCard icon={<Percent className="h-4 w-4" />} label={t("dash.winRate")} value={formatPercent(summary.winRate, 0)} tone="neutral" />
          <MetricCard icon={<Scale className="h-4 w-4" />} label={t("dash.riskReward")} value={`${summary.riskReward}`} tone="neutral" />
        </div>
        <NotificationsPanel />
      </div>

      <div className="mt-4">
        <OrderHistoryTable />
      </div>
    </AppShell>
  );
}
