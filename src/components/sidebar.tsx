import { useMemo } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Wallet, Radio, LineChart, ListOrdered,
  Radar, ShieldCheck, Send, Sparkles, Cpu, Inbox, GitBranch,
  ChevronLeft, ChevronRight, Hexagon,
} from "lucide-react";
import { useI18n, type TKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AccountScopeSwitcher } from "./account-scope-switcher";

type Item = { to: string; icon: React.ComponentType<{ className?: string }>; label: TKey };
type Group = { title: TKey; items: Item[] };

const GROUPS: Group[] = [
  {
    title: "nav.primary",
    items: [
      { to: "/", icon: LayoutDashboard, label: "nav.dashboard" },
      { to: "/accounts", icon: Wallet, label: "nav.accounts" },
      { to: "/signals", icon: Radio, label: "nav.signals" },
      { to: "/positions", icon: LineChart, label: "nav.openPositions" },
      { to: "/orders", icon: ListOrdered, label: "nav.orderHistory" },
    ],
  },
  {
    title: "nav.operations",
    items: [
      { to: "/sources", icon: Radar, label: "nav.sources" },
      { to: "/risk", icon: ShieldCheck, label: "nav.risk" },
      { to: "/telegram", icon: Send, label: "nav.telegram" },
    ],
  },
  {
    title: "nav.intelligence",
    items: [{ to: "/hermes", icon: Sparkles, label: "nav.hermes" }],
  },
  {
    title: "nav.system",
    items: [
      { to: "/runtime", icon: Cpu, label: "nav.runtime" },
      { to: "/inbox", icon: Inbox, label: "nav.inbox" },
      { to: "/trace", icon: GitBranch, label: "nav.trace" },
    ],
  },
];

export function SidebarContent({
  collapsed = false,
  onToggle,
  onNavigate,
  showToggle = true,
}: {
  collapsed?: boolean;
  onToggle?: () => void;
  onNavigate?: () => void;
  showToggle?: boolean;
}) {
  const { t } = useI18n();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isActive = useMemo(() => (to: string) => (to === "/" ? path === "/" : path === to || path.startsWith(to + "/")), [path]);

  const renderItem = (i: Item) => {
    const active = isActive(i.to);
    const Icon = i.icon;
    const btn = (
      <Link
        key={i.to}
        to={i.to}
        onClick={onNavigate}
        className={cn(
          "group flex items-center gap-3 rounded-lg text-sm font-medium transition-colors",
          collapsed ? "h-10 w-10 justify-center" : "px-3 py-2",
          active
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
        )}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {!collapsed && <span className="truncate">{t(i.label)}</span>}
      </Link>
    );
    if (!collapsed) return btn;
    return (
      <Tooltip key={i.to} delayDuration={150}>
        <TooltipTrigger asChild>{btn}</TooltipTrigger>
        <TooltipContent side="right">{t(i.label)}</TooltipContent>
      </Tooltip>
    );
  };

  return (
    <TooltipProvider>
      <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
        {/* Brand */}
        <div className={cn("flex shrink-0 items-center border-b border-sidebar-border py-4", collapsed ? "justify-center px-2" : "justify-between px-4")}>
          {collapsed ? (
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Hexagon className="h-5 w-5" />
            </div>
          ) : (
            <div className="flex min-w-0 items-center gap-2">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Hexagon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold">{t("common.appName")}</div>
                <div className="truncate text-[11px] text-muted-foreground">{t("common.appTagline")}</div>
              </div>
            </div>
          )}
          {showToggle && onToggle && (
            <button
              type="button"
              onClick={onToggle}
              className={cn("rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground", collapsed && "absolute right-1 top-4")}
              aria-label={collapsed ? t("common.expand") : t("common.collapse")}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </button>
          )}
        </div>

        {/* Scrollable nav */}
        <nav className={cn("min-h-0 flex-1 overflow-y-auto py-4", collapsed ? "px-2" : "px-3")}>
          {GROUPS.map((g) => (
            <div key={g.title} className="mb-4">
              {!collapsed && (
                <div className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {t(g.title)}
                </div>
              )}
              <div className={cn("space-y-1", collapsed && "flex flex-col items-center")}>{g.items.map(renderItem)}</div>
            </div>
          ))}
        </nav>

        {/* Account scope */}
        <div className={cn("shrink-0 border-t border-sidebar-border", collapsed ? "flex justify-center p-2" : "p-3")}>
          <AccountScopeSwitcher compact={collapsed} />
        </div>
      </div>
    </TooltipProvider>
  );
}