import { StatusBadge } from "@/components/status-badge";
import { useI18n } from "@/lib/i18n";
import type { SourceState } from "@/lib/types";

export function SourceStatusBadge({ state }: { state: SourceState }) {
  const { t } = useI18n();
  return state === "enabled"
    ? <StatusBadge tone="success">{t("sources.enabled")}</StatusBadge>
    : <StatusBadge tone="neutral">{t("sources.disabled")}</StatusBadge>;
}