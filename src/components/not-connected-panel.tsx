import { PlugZap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import type { ReactNode } from "react";

export function NotConnectedPanel({
  title,
  description,
  sections,
}: {
  title?: string;
  description?: string;
  sections?: { label: string; body: ReactNode }[];
}) {
  const { t } = useI18n();
  return (
    <Card className="p-6">
      <div className="flex items-start gap-3">
        <div className="rounded-md border border-border bg-muted/40 p-2 text-muted-foreground">
          <PlugZap className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold">{title ?? t("common.notConnected")}</div>
          <p className="mt-1 text-sm text-muted-foreground">
            {description ?? t("common.needsAdapter")}
          </p>
          {sections && sections.length > 0 ? (
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {sections.map((s) => (
                <div key={s.label} className="rounded-md border border-border bg-background p-3">
                  <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {s.label}
                  </div>
                  <div className="mt-1 text-sm">{s.body}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}