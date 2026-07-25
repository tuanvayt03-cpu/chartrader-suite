import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/lib/i18n";
import { readPref, writePref } from "@/lib/prefs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/telegram")({
  component: TelegramPage,
  head: () => ({
    meta: [
      { title: "Telegram — SignalOps" },
      { name: "description", content: "Telegram MTProto session state and credentials." },
      { property: "og:title", content: "Telegram — SignalOps" },
      { property: "og:description", content: "Telegram MTProto session state and credentials." },
    ],
  }),
});

function TelegramPage() {
  const { t } = useI18n();
  const [apiId, setApiId] = useState("");
  const [apiHash, setApiHash] = useState("");
  useEffect(() => {
    setApiId(readPref<string>("tg.apiId", ""));
    const has = readPref<boolean>("tg.hashSet", false);
    setApiHash(has ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : "");
  }, []);
  const save = () => {
    writePref("tg.apiId", apiId);
    if (apiHash && !apiHash.startsWith("\u2022")) writePref("tg.hashSet", true);
    toast.success(t("common.saved"));
  };

  return (
    <AppShell>
      <PageHeader title={t("nav.telegram")} subtitle={t("common.notConnected")} />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Session</div>
            <Badge variant="outline">{t("common.notConnected")}</Badge>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Send code, OTP, then 2FA. Requires backend adapter.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => toast(t("common.needsAdapter"))}>Send code</Button>
            <Button variant="outline" onClick={() => toast(t("common.needsAdapter"))}>Read-only test</Button>
            <Button variant="ghost" onClick={() => toast(t("common.needsAdapter"))}>Revoke</Button>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-semibold">Credentials</div>
          <p className="mt-1 text-xs text-muted-foreground">Stored locally; never re-echoed after save.</p>
          <div className="mt-3 space-y-3">
            <div>
              <Label htmlFor="tg-api-id">API ID</Label>
              <Input id="tg-api-id" value={apiId} onChange={(e) => setApiId(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="tg-api-hash">API Hash</Label>
              <Input id="tg-api-hash" type="password" value={apiHash} onChange={(e) => setApiHash(e.target.value)} />
            </div>
            <Button onClick={save}>{t("common.save")}</Button>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}