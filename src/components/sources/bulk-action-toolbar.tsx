import { Button } from "@/components/ui/button";
import { Download, PowerOff, Power, Trash2, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function BulkActionToolbar({
  count, onClear, onEnable, onDisable, onDelete, onExport,
}: {
  count: number; onClear: () => void; onEnable: () => void;
  onDisable: () => void; onDelete: () => void; onExport: () => void;
}) {
  const { t } = useI18n();
  if (count === 0) return null;
  return (
    <div className="sticky top-0 z-10 flex flex-wrap items-center gap-2 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-xs">
      <span className="font-medium">{count} {t("common.selected")}</span>
      <div className="ml-auto flex flex-wrap items-center gap-1">
        <Button variant="ghost" size="sm" className="h-7 gap-1" onClick={onEnable}><Power className="h-3.5 w-3.5" />{t("sources.enableSelected")}</Button>
        <Button variant="ghost" size="sm" className="h-7 gap-1" onClick={onDisable}><PowerOff className="h-3.5 w-3.5" />{t("sources.disableSelected")}</Button>
        <Button variant="ghost" size="sm" className="h-7 gap-1" onClick={onExport}><Download className="h-3.5 w-3.5" />{t("sources.exportSelected")}</Button>
        <Button variant="ghost" size="sm" className="h-7 gap-1 text-rose-600 hover:bg-rose-50 hover:text-rose-700" onClick={onDelete}><Trash2 className="h-3.5 w-3.5" />{t("sources.deleteSelected")}</Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClear}><X className="h-3.5 w-3.5" /></Button>
      </div>
    </div>
  );
}