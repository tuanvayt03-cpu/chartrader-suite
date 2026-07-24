import { useEffect, useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { SidebarContent } from "./sidebar";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { readPref, writePref } from "@/lib/prefs";

export function AppShell({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const { t } = useI18n();

  useEffect(() => {
    setCollapsed(readPref<boolean>("sidebar.collapsed", false));
  }, []);
  const toggle = () => {
    setCollapsed((c) => {
      writePref("sidebar.collapsed", !c);
      return !c;
    });
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Desktop sidebar */}
      <aside
        className="hidden shrink-0 border-r border-border transition-[width] duration-200 md:block motion-reduce:transition-none"
        style={{ width: collapsed ? 72 : 268 }}
        aria-label="Primary"
      >
        <SidebarContent collapsed={collapsed} onToggle={toggle} />
      </aside>

      {/* Mobile drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="left" className="w-[288px] p-0">
          <SheetTitle className="sr-only">{t("nav.menu")}</SheetTitle>
          <SidebarContent onNavigate={() => setDrawerOpen(false)} showToggle={false} />
        </SheetContent>
      </Sheet>

      {/* Main */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="sticky top-0 z-10 flex items-center gap-2 border-b border-border bg-card/95 px-3 py-2 backdrop-blur md:hidden">
          <Button variant="ghost" size="icon" aria-label={t("nav.menu")} onClick={() => setDrawerOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="text-sm font-semibold">{t("common.appName")}</span>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 lg:px-8">{children}</div>
        </div>
      </main>
    </div>
  );
}