import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { NotConnectedPanel } from "@/components/not-connected-panel";
import { useAccountScope } from "@/lib/account-scope";
import { usePrivacy } from "@/lib/privacy";
import { useI18n } from "@/lib/i18n";
import { Plus, Pin, Archive } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/accounts")({
  component: AccountsPage,
  head: () => ({
    meta: [
      { title: "Accounts — SignalOps" },
      { name: "description", content: "Manage MT5 accounts, aliases and lifecycle." },
      { property: "og:title", content: "Accounts — SignalOps" },
      { property: "og:description", content: "Manage MT5 accounts, aliases and lifecycle." },
    ],
  }),
});

function AccountsPage() {
  const { t } = useI18n();
  const { accounts } = useAccountScope();
  const { mask } = usePrivacy();
  const active = accounts.filter((a) => a.state !== "archived");
  const archived = accounts.filter((a) => a.state === "archived");

  return (
    <AppShell>
      <PageHeader
        title={t("nav.accounts")}
        subtitle={t("common.manageAccounts")}
        right={
          <Button className="gap-2" onClick={() => toast(t("common.requiresBackend"), { description: t("common.needsAdapter") })}>
            <Plus className="h-4 w-4" /> {t("nav.accounts")}
          </Button>
        }
      />
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">{t("common.active")} ({active.length})</TabsTrigger>
          <TabsTrigger value="archived">{t("common.archived")} ({archived.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          {active.length === 0 ? (
            <NotConnectedPanel />
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {active.map((a) => (
                <Card key={a.id} className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{a.alias}</div>
                      <div className="mt-0.5 truncate text-xs text-muted-foreground">
                        {mask(a.login, "login")} · {a.broker}
                      </div>
                    </div>
                    <Badge variant="secondary">{a.currency}</Badge>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Button size="sm" variant="ghost" className="gap-1" onClick={() => toast(t("common.pin"))}>
                      <Pin className="h-3.5 w-3.5" /> {t("common.pin")}
                    </Button>
                    <Button size="sm" variant="ghost" className="gap-1" onClick={() => toast(t("common.needsAdapter"))}>
                      <Archive className="h-3.5 w-3.5" /> {t("common.archive")}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="archived" className="mt-4">
          {archived.length === 0 ? <NotConnectedPanel title={t("common.archived")} /> : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {archived.map((a) => (
                <Card key={a.id} className="p-4 opacity-70">
                  <div className="text-sm font-semibold">{a.alias}</div>
                  <div className="text-xs text-muted-foreground">{mask(a.login, "login")}</div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}