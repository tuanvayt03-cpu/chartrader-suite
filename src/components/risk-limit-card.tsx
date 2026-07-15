import { Card } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import type { ReactNode } from "react";

export function RiskLimitCard({
  icon, title, subtitle, value, footerLabel, footerValue,
}: {
  icon: ReactNode; title: string; subtitle?: string; value: string;
  footerLabel: string; footerValue: string;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">{icon}</span>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium">{title}</div>
            {subtitle && <div className="truncate text-[11px] text-muted-foreground">{subtitle}</div>}
          </div>
        </div>
        <MoreHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />
      </div>
      <div className="mt-3 text-xl font-semibold tracking-tight">{value}</div>
      <div className="mt-2 flex items-center justify-between border-t border-border pt-2 text-xs">
        <span className="text-muted-foreground">{footerLabel}</span>
        <span className="font-medium text-primary">{footerValue}</span>
      </div>
    </Card>
  );
}