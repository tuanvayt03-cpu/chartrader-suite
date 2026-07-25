import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NotConnectedPanel } from "@/components/not-connected-panel";
import { Search, RefreshCw } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";

export const Route = createFileRoute("/signals")({
  component: SignalsPage,
  head: () => ({
    meta: [
      { title: "Signals — SignalOps" },
      { name: "description", content: "Inbound trading signals, parsed and routed." },
      { property: "og:title", content: "Signals — SignalOps" },
      { property: "og:description", content: "Inbound trading signals, parsed and routed." },
    ],
  }),
});

function SignalsPage() {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  return (
    <AppShell>
      <PageHeader title={t("nav.signals")} subtitle={t("common.dataUnavailable")} />
      <Card className="mb-4 p-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("common.search")} className="pl-9" />
          </div>
          <Badge variant="secondary">{t("common.filters")}: 0</Badge>
          <Button variant="outline" size="icon" aria-label={t("common.refresh")}>
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </Card>
      <NotConnectedPanel
        title={t("nav.signals")}
        sections={[
          { label: t("common.overview"), body: t("common.needsAdapter") },
          { label: t("common.status"), body: <Badge variant="outline">{t("common.notConnected")}</Badge> },
        ]}
      />
    </AppShell>
  );
}