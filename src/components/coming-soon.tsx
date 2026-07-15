// Reusable placeholder for nav items that don't have full pages in this prototype.
import { AppShell } from "@/components/app-shell";
import { DashboardHeader } from "@/components/dashboard-header";
import { Card } from "@/components/ui/card";

export function ComingSoonPage({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <AppShell>
      <DashboardHeader title={title} subtitle={subtitle} />
      <Card className="p-10 text-center">
        <div className="mx-auto max-w-md">
          <div className="text-sm font-medium">Coming soon</div>
          <p className="mt-2 text-xs text-muted-foreground">
            This section is part of the prototype scaffold. The dashboard and Telegram Sources pages contain the fully implemented flows.
          </p>
        </div>
      </Card>
    </AppShell>
  );
}