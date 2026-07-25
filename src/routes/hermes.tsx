import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { NotConnectedPanel } from "@/components/not-connected-panel";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/hermes")({
  component: HermesPage,
  head: () => ({
    meta: [
      { title: "Hermes — SignalOps" },
      { name: "description", content: "Intelligence layer: activation, decisions, learning data." },
      { property: "og:title", content: "Hermes — SignalOps" },
      { property: "og:description", content: "Intelligence layer: activation, decisions, learning data." },
    ],
  }),
});

function HermesPage() {
  const { t } = useI18n();
  return (
    <AppShell>
      <PageHeader title={t("nav.hermes")} subtitle="Intelligence layer" />
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">{t("common.overview")}</TabsTrigger>
          <TabsTrigger value="activation">Activation</TabsTrigger>
          <TabsTrigger value="decisions">Decisions</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mt-4"><NotConnectedPanel /></TabsContent>
        <TabsContent value="activation" className="mt-4"><NotConnectedPanel /></TabsContent>
        <TabsContent value="decisions" className="mt-4"><NotConnectedPanel /></TabsContent>
        <TabsContent value="learning" className="mt-4"><NotConnectedPanel /></TabsContent>
        <TabsContent value="policies" className="mt-4"><NotConnectedPanel /></TabsContent>
      </Tabs>
    </AppShell>
  );
}