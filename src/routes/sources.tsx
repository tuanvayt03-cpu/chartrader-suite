import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { DashboardHeader } from "@/components/dashboard-header";
import { SourceManagementPage } from "@/components/sources/source-management-page";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/sources")({
  component: SourcesRoute,
  head: () => ({
    meta: [
      { title: "Telegram Sources — SignalOps" },
      { name: "description", content: "Manage Telegram signal source groups feeding your automation." },
      { property: "og:title", content: "Telegram Sources — SignalOps" },
      { property: "og:description", content: "Manage Telegram signal source groups feeding your automation." },
    ],
  }),
});

function SourcesRoute() {
  const { t } = useI18n();
  return (
    <AppShell>
      <DashboardHeader title={t("sources.title")} subtitle={t("sources.subtitle")} />
      <SourceManagementPage />
    </AppShell>
  );
}