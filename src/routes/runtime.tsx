import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NotConnectedPanel } from "@/components/not-connected-panel";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/runtime")({
  component: RuntimePage,
  head: () => ({
    meta: [
      { title: "Runtime — SignalOps" },
      { name: "description", content: "Runtime components, providers, versions and logs." },
      { property: "og:title", content: "Runtime — SignalOps" },
      { property: "og:description", content: "Runtime components, providers, versions and logs." },
    ],
  }),
});

const COMPONENTS = ["Panel API", "Core", "Bridge", "Worker", "Telegram", "MT5 terminals", "DB"];

function RuntimePage() {
  const { t } = useI18n();
  return (
    <AppShell>
      <PageHeader title={t("nav.runtime")} />
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">{t("common.overview")}</TabsTrigger>
          <TabsTrigger value="components">{t("common.components")}</TabsTrigger>
          <TabsTrigger value="providers">{t("common.providers")}</TabsTrigger>
          <TabsTrigger value="versions">{t("common.versions")}</TabsTrigger>
          <TabsTrigger value="logs">{t("common.logs")}</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4"><NotConnectedPanel /></TabsContent>
        <TabsContent value="components" className="mt-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {COMPONENTS.map((c) => (
              <Card key={c} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold">{c}</div>
                  <Badge variant="outline">{t("common.notConnected")}</Badge>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">{t("common.dataUnavailable")}</div>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="providers" className="mt-4"><NotConnectedPanel /></TabsContent>
        <TabsContent value="versions" className="mt-4"><NotConnectedPanel /></TabsContent>
        <TabsContent value="logs" className="mt-4"><NotConnectedPanel /></TabsContent>
      </Tabs>
    </AppShell>
  );
}