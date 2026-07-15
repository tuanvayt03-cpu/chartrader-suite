import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Wallet, Radio, LineChart, ListOrdered, Radar,
  ShieldCheck, BarChart3, Settings, ChevronRight, ChevronsUpDown, Hexagon,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { TKey } from "@/lib/i18n";

type Item = { to: string; icon: React.ComponentType<{ className?: string }>; label: TKey };

const MENU: Item[] = [
  { to: "/", icon: LayoutDashboard, label: "nav.dashboard" },
  { to: "/accounts", icon: Wallet, label: "nav.accounts" },
  { to: "/signals", icon: Radio, label: "nav.signals" },
  { to: "/positions", icon: LineChart, label: "nav.openPositions" },
  { to: "/orders", icon: ListOrdered, label: "nav.orderHistory" },
];

const APPS: Item[] = [
  { to: "/sources", icon: Radar, label: "nav.sources" },
  { to: "/risk", icon: ShieldCheck, label: "nav.risk" },
  { to: "/analytics", icon: BarChart3, label: "nav.analytics" },
  { to: "/settings", icon: Settings, label: "nav.settings" },
];

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useI18n();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const renderItem = (i: Item) => {
    const active = path === i.to || (i.to !== "/" && path.startsWith(i.to));
    const Icon = i.icon;
    return (
      <Link
        key={i.to}
        to={i.to}
        onClick={onNavigate}
        className={cn(
          "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
          active
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        <span className="truncate">{t(i.label)}</span>
      </Link>
    );
  };

  return (
    <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
      {/* Brand */}
      <div className="flex shrink-0 items-center justify-between border-b border-sidebar-border px-4 py-4">
        <div className="flex min-w-0 items-center gap-2">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Hexagon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{t("common.appName")}</div>
            <div className="truncate text-[11px] text-muted-foreground">{t("common.appTagline")}</div>
          </div>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Scrollable nav */}
      <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
        <div className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t("nav.menu")}</div>
        <div className="space-y-1">{MENU.map(renderItem)}</div>
        <div className="mt-6 mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{t("nav.apps")}</div>
        <div className="space-y-1">{APPS.map(renderItem)}</div>

        <div className="mt-6 rounded-xl border border-sidebar-border bg-card p-3 text-xs">
          <div className="flex items-center justify-between text-muted-foreground">
            <span>{t("nav.account")}</span>
            <span className="flex items-center gap-1 text-foreground">9999042 <ChevronsUpDown className="h-3 w-3" /></span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-muted-foreground">{t("nav.status")}</span>
            <span className="inline-flex items-center gap-1 text-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {t("nav.active")}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-muted-foreground">{t("nav.program")}</span>
            <span className="text-foreground">$50,000 Evl.</span>
          </div>
        </div>
      </nav>

      {/* Footer profile */}
      <div className="shrink-0 border-t border-sidebar-border px-3 py-3">
        <div className="flex items-center gap-3 rounded-lg px-2 py-1.5">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground text-sm font-semibold">
            DS
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">Daniel Sullivan</div>
            <div className="truncate text-xs text-muted-foreground">ops@signalops.io</div>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}