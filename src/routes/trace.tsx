import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NotConnectedPanel } from "@/components/not-connected-panel";
import { useI18n } from "@/lib/i18n";
import { Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/trace")({
  component: TracePage,
  head: () => ({
    meta: [
      { title: "Trace — SignalOps" },
      { name: "description", content: "End-to-end read-only trace by correlation ID." },
      { property: "og:title", content: "Trace — SignalOps" },
      { property: "og:description", content: "End-to-end read-only trace by correlation ID." },
    ],
  }),
});

const STAGES = ["Telegram", "Parser", "Normalized", "Dedupe", "Risk", "Sizing", "Execution gate", "Broker result", "Position", "Final P&L"];

function TracePage() {
  const { t } = useI18n();
  const [q, setQ] = useState("");
  return (
    <AppShell>
      <PageHeader title={t("nav.trace")} subtitle="Correlation-based read-only timeline" />
      <Card className="mb-4 p-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Correlation ID / account / order" className="pl-9" />
          </div>
          <Button variant="outline">{t("common.apply")}</Button>
        </div>
      </Card>
      <Card className="p-4">
        <ol className="space-y-2">
          {STAGES.map((s, i) => (
            <li key={s} className="flex items-center gap-3 text-sm">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-xs text-muted-foreground">
                {i + 1}
              </span>
              <span className="flex-1">{s}</span>
              <span className="text-xs text-muted-foreground">{t("common.dataUnavailable")}</span>
            </li>
          ))}
        </ol>
      </Card>
      <div className="mt-4">
        <NotConnectedPanel title={t("common.detail")} description={t("common.needsAdapter")} />
      </div>
    </AppShell>
  );
}