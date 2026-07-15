import { Bell, KeyRound, Share2, ArrowDownToLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LanguageSwitcher } from "./language-switcher";
import { useI18n } from "@/lib/i18n";

export function DashboardHeader({
  title, subtitle, actions = true,
}: { title: string; subtitle?: string; actions?: boolean }) {
  const { t } = useI18n();
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 pb-5 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
      <div className="min-w-0">
        <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">{title}</h1>
        {subtitle ? <p className="mt-1 truncate text-sm text-muted-foreground">{subtitle}</p> : null}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Badge variant="secondary" className="gap-1.5 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {t("dash.systemHealthy")}
          </Badge>
          <Badge variant="secondary" className="gap-1.5 rounded-full">Latency 42ms</Badge>
          <Badge variant="secondary" className="gap-1.5 rounded-full">MT5 · linked</Badge>
        </div>
      </div>
      {actions && (
        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <Button variant="outline" size="icon" aria-label={t("dash.notifications")}>
            <Bell className="h-4 w-4" />
          </Button>
          <Button className="hidden md:inline-flex gap-2">
            <ArrowDownToLine className="h-4 w-4" />
            {t("dash.requestPayout")}
          </Button>
          <Button variant="secondary" className="hidden md:inline-flex gap-2">
            <Share2 className="h-4 w-4" />
            {t("dash.shareReport")}
          </Button>
          <Button variant="outline" size="icon" aria-label="API keys" className="hidden md:inline-flex">
            <KeyRound className="h-4 w-4" />
          </Button>
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">DS</div>
        </div>
      )}
      <div className="col-span-full sm:hidden">
        <LanguageSwitcher />
      </div>
    </header>
  );
}