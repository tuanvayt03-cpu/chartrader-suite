import { Card } from "@/components/ui/card";
import { AlertCircle, Info, ShieldAlert } from "lucide-react";
import { notifications } from "@/lib/mock-data";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const ICON = { info: Info, warning: AlertCircle, danger: ShieldAlert };

export function NotificationsPanel() {
  const { t } = useI18n();
  return (
    <Card className="flex h-full flex-col p-4">
      <div className="flex items-center justify-between gap-2">
        <div className="text-sm font-medium">{t("dash.notifications")}</div>
        <button className="text-xs text-primary hover:underline">{t("common.viewAll")}</button>
      </div>
      <div className="mt-3 hidden grid-cols-[80px_140px_1fr] gap-2 text-[11px] uppercase tracking-wider text-muted-foreground sm:grid">
        <div>{t("dash.time")}</div>
        <div>{t("dash.type")}</div>
        <div>{t("dash.message")}</div>
      </div>
      <ul className="mt-2 divide-y divide-border text-sm">
        {notifications.map((n) => {
          const Icon = ICON[n.severity];
          return (
            <li key={n.id} className="grid grid-cols-[80px_140px_1fr] items-center gap-2 py-2 max-sm:grid-cols-[1fr]">
              <div className="text-xs text-muted-foreground">{n.time}</div>
              <div className="flex items-center gap-1.5">
                <Icon className={cn("h-3.5 w-3.5 shrink-0",
                  n.severity === "danger" && "text-rose-500",
                  n.severity === "warning" && "text-amber-500",
                  n.severity === "info" && "text-primary")} />
                <span className="truncate text-xs font-medium">{n.type}</span>
              </div>
              <div className="truncate text-xs text-muted-foreground">{n.message}</div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}