import { Bell, Eye, EyeOff, Share2, Download, RefreshCw, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LanguageSwitcher } from "./language-switcher";
import { RuntimeHealthChip } from "./runtime-health-chip";
import { usePrivacy } from "@/lib/privacy";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

export function PageHeader({
  title,
  subtitle,
  right,
  showActions = true,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  showActions?: boolean;
}) {
  const { t } = useI18n();
  const { privacy, togglePrivacy } = usePrivacy();
  const Icon: LucideIcon = privacy ? EyeOff : Eye;

  const notImplemented = () =>
    toast(t("common.requiresBackend"), { description: t("common.needsAdapter") });

  return (
    <header className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h1 className="truncate text-xl font-semibold tracking-tight sm:text-2xl">{title}</h1>
        {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <RuntimeHealthChip />
        </div>
      </div>
      {showActions && (
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {right}
          <LanguageSwitcher />
          <Button
            variant={privacy ? "default" : "outline"}
            size="icon"
            aria-label={privacy ? t("common.privacyOff") : t("common.privacyOn")}
            title={privacy ? t("common.privacyOff") : t("common.privacyOn")}
            onClick={togglePrivacy}
          >
            <Icon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" aria-label={t("common.notifications")} onClick={() => (window.location.href = "/inbox")}>
            <Bell className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" /> {t("common.export")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("common.export")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={notImplemented}>{t("common.exportCsv")}</DropdownMenuItem>
              <DropdownMenuItem onClick={notImplemented}>{t("common.exportJson")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="gap-2">
                <Share2 className="h-4 w-4" /> {t("common.share")}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("common.share")}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={notImplemented}>{privacy ? t("common.privacyOn") : t("common.privacyOff")}</DropdownMenuItem>
              <DropdownMenuItem onClick={notImplemented}>{t("common.export")}</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </header>
  );
}

export function RefreshButton({ onClick }: { onClick?: () => void }) {
  const { t } = useI18n();
  return (
    <Button variant="outline" size="icon" aria-label={t("common.refresh")} onClick={onClick}>
      <RefreshCw className="h-4 w-4" />
    </Button>
  );
}