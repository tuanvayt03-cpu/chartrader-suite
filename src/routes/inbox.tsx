import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { NotConnectedPanel } from "@/components/not-connected-panel";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/inbox")({
  component: InboxPage,
  head: () => ({
    meta: [
      { title: "Processing Inbox — SignalOps" },
      { name: "description", content: "Items requiring input, review, or manual verification." },
      { property: "og:title", content: "Processing Inbox — SignalOps" },
      { property: "og:description", content: "Items requiring input, review, or manual verification." },
    ],
  }),
});

function InboxPage() {
  const { t } = useI18n();
  return (
    <AppShell>
      <PageHeader title={t("nav.inbox")} subtitle={t("common.dataUnavailable")} />
      <NotConnectedPanel
        sections={[
          { label: "Input required", body: "0 items" },
          { label: "Machine blocked", body: "0 items" },
          { label: "Review", body: "0 items" },
          { label: "Resolved", body: "0 items" },
        ]}
      />
    </AppShell>
  );
}