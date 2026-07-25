import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { NotConnectedPanel } from "@/components/not-connected-panel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/risk")({
  component: RiskPage,
  head: () => ({
    meta: [
      { title: "Risk Management — SignalOps" },
      { name: "description", content: "Sizing rules, limits, drawdown and margin usage." },
      { property: "og:title", content: "Risk Management — SignalOps" },
      { property: "og:description", content: "Sizing rules, limits, drawdown and margin usage." },
    ],
  }),
});

function RiskPage() {
  const { t } = useI18n();
  return (
    <AppShell>
      <PageHeader title={t("nav.risk")} />
      <Tabs defaultValue="policy">
        <TabsList>
          <TabsTrigger value="policy">Policy</TabsTrigger>
          <TabsTrigger value="limits">Limits</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="policy" className="mt-4">
          <Card className="p-4 text-sm text-muted-foreground">{t("common.needsAdapter")}</Card>
        </TabsContent>
        <TabsContent value="limits" className="mt-4">
          <NotConnectedPanel />
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <NotConnectedPanel />
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}