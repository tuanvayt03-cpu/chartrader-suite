import { AppShell } from "./app-shell";
import { PageHeader } from "./page-header";
import { Card } from "./ui/card";
import { useI18n } from "@/lib/i18n";

export function ComingSoonPage({ title, subtitle }: { title: string; subtitle?: string }) {
  const { t } = useI18n();
  return (
    <AppShell>
      <PageHeader title={title} subtitle={subtitle ?? t("common.needsAdapter")} />
      <Card className="p-8 text-center text-sm text-muted-foreground">
        {t("common.requiresBackend")}
      </Card>
    </AppShell>
  );
}