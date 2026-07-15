import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { DashboardHeader } from "@/components/dashboard-header";
import { OrderHistoryTable } from "@/components/order-history-table";
import { useI18n } from "@/lib/i18n";
export const Route = createFileRoute("/orders")({
  component: () => { const { t } = useI18n(); return (
    <AppShell>
      <DashboardHeader title={t("nav.orderHistory")} />
      <OrderHistoryTable />
    </AppShell>
  ); },
});