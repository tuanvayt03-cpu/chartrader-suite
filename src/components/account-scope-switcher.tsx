import { useMemo, useState } from "react";
import { Check, ChevronsUpDown, Pin, PinOff, Search, WifiOff, Archive as ArchiveIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAccountScope, type AccountRecord } from "@/lib/account-scope";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function StateBadge({ a }: { a: AccountRecord }) {
  const { t } = useI18n();
  if (a.state === "archived") return <Badge variant="secondary" className="gap-1 text-[10px]"><ArchiveIcon className="h-3 w-3" />{t("accounts.state.archived")}</Badge>;
  if (a.state === "connected") return <Badge className="gap-1 bg-emerald-100 text-emerald-700 text-[10px] hover:bg-emerald-100"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{t("accounts.state.connected")}</Badge>;
  return <Badge variant="secondary" className="gap-1 text-[10px]"><WifiOff className="h-3 w-3" />{t("accounts.state.offline")}</Badge>;
}

export function AccountScopeSwitcher({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();
  const { scope, setScope, pinnedId, setPinned, accounts, activeAccounts, currentLabel, currentSubLabel } = useAccountScope();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [showArchived, setShowArchived] = useState(false);

  const rows = useMemo(() => {
    const pool = showArchived ? accounts : activeAccounts;
    if (!q) return pool;
    const needle = q.toLowerCase();
    return pool.filter((a) => a.alias.toLowerCase().includes(needle) || a.login.includes(needle) || a.broker.toLowerCase().includes(needle));
  }, [accounts, activeAccounts, q, showArchived]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={compact ? "icon" : "default"}
          className={cn(
            "gap-2",
            compact ? "h-10 w-10" : "h-auto w-full justify-between rounded-xl px-3 py-2 text-left",
          )}
          aria-label={t("common.viewingScope")}
        >
          {compact ? (
            <Users className="h-4 w-4" />
          ) : (
            <>
              <div className="min-w-0">
                <div className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{t("common.viewingScope")}</div>
                <div className="truncate text-sm font-medium">{scope === "all" ? t("common.allAccounts") : currentLabel}</div>
                <div className="truncate text-[11px] text-muted-foreground">{currentSubLabel}</div>
              </div>
              <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[320px] p-0">
        <div className="border-b p-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("common.search")} className="h-8 pl-8 text-xs" />
          </div>
        </div>
        <div className="max-h-[320px] overflow-y-auto p-1">
          <button
            type="button"
            onClick={() => { setScope("all"); setOpen(false); }}
            className={cn(
              "flex w-full items-center gap-2 rounded-md px-2 py-2 text-left text-sm hover:bg-accent",
              scope === "all" && "bg-accent",
            )}
          >
            <Users className="h-4 w-4 text-muted-foreground" />
            <div className="min-w-0 flex-1">
              <div className="font-medium">{t("common.allAccounts")}</div>
              <div className="text-[11px] text-muted-foreground">{activeAccounts.length} · 0 {t("common.active").toLowerCase()}</div>
            </div>
            {scope === "all" && <Check className="h-4 w-4 text-primary" />}
          </button>
          {rows.map((a) => (
            <div key={a.id} className={cn("flex items-start gap-2 rounded-md px-2 py-2 hover:bg-accent", scope === a.id && "bg-accent")}>
              <button
                type="button"
                onClick={() => { setScope(a.id); setOpen(false); }}
                className="flex min-w-0 flex-1 items-start gap-2 text-left"
              >
                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <span className="truncate">{a.alias}</span>
                    {pinnedId === a.id && <Pin className="h-3 w-3 text-primary" />}
                  </div>
                  <div className="truncate text-[11px] text-muted-foreground">{a.login} · {a.broker} · {a.currency}</div>
                  <div className="mt-1"><StateBadge a={a} /></div>
                </div>
                {scope === a.id && <Check className="h-4 w-4 text-primary" />}
              </button>
              <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" title={pinnedId === a.id ? t("common.unpin") : t("common.pin")} onClick={() => setPinned(pinnedId === a.id ? null : a.id)}>
                {pinnedId === a.id ? <PinOff className="h-3 w-3" /> : <Pin className="h-3 w-3" />}
              </Button>
            </div>
          ))}
          {rows.length === 0 && (
            <div className="px-3 py-6 text-center text-xs text-muted-foreground">{t("common.noResults")}</div>
          )}
        </div>
        <div className="flex items-center justify-between border-t p-2 text-xs">
          <label className="flex items-center gap-1.5 text-muted-foreground">
            <input type="checkbox" checked={showArchived} onChange={(e) => setShowArchived(e.target.checked)} className="h-3 w-3" />
            {t("common.archived")}
          </label>
          <a href="/accounts" className="text-primary hover:underline">{t("common.manageAccounts")}</a>
        </div>
      </PopoverContent>
    </Popover>
  );
}