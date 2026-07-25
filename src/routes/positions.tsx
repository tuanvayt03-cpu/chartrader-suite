import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { NotConnectedPanel } from "@/components/not-connected-panel";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/positions")({
  component: PositionsPage,
  head: () => ({
    meta: [
      { title: "Open Positions — SignalOps" },
      { name: "description", content: "Live open positions across MT5 accounts." },
      { property: "og:title", content: "Open Positions — SignalOps" },
      { property: "og:description", content: "Live open positions across MT5 accounts." },
    ],
  }),
});

function PositionsPage() {
  const { t } = useI18n();
  return (
    <AppShell>
      <PageHeader title={t("nav.openPositions")} subtitle={t("common.dataUnavailable")} />
      <NotConnectedPanel
        sections={[
          { label: t("common.overview"), body: "Positions, floating P&L, and correlation IDs will appear once the MT5 bridge is connected." },
          { label: t("common.status"), body: t("common.notConnected") },
        ]}
      />
    </AppShell>
  );
}