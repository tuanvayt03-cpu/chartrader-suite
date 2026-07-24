import { createFileRoute } from "@tanstack/react-router";
import { ComingSoonPage } from "@/components/coming-soon";
import { useI18n } from "@/lib/i18n";
export const Route = createFileRoute("/runtime")({ component: () => { const { t } = useI18n(); return <ComingSoonPage title={t("nav.runtime")} />; } });