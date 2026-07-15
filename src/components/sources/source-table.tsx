import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Pencil, PowerOff, Power, Trash2 } from "lucide-react";
import { SourceStatusBadge } from "./source-status-badge";
import { StatusBadge } from "@/components/status-badge";
import { useI18n } from "@/lib/i18n";
import type { TelegramSource } from "@/lib/types";

export function SourceTable({
  rows, selected, onToggle, onToggleAll, onEdit, onToggleState, onDelete,
}: {
  rows: TelegramSource[]; selected: Set<string>;
  onToggle: (id: string) => void; onToggleAll: (all: boolean) => void;
  onEdit: (s: TelegramSource) => void;
  onToggleState: (s: TelegramSource) => void;
  onDelete: (s: TelegramSource) => void;
}) {
  const { t, formatDate } = useI18n();
  const allChecked = rows.length > 0 && rows.every((r) => selected.has(r.id));
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="w-full min-w-[1100px] text-sm">
        <thead className="border-b border-border text-left text-[11px] uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="w-10 px-3 py-3">
              <Checkbox checked={allChecked} onCheckedChange={(v) => onToggleAll(Boolean(v))} />
            </th>
            <th className="px-3 py-3 font-medium">{t("sources.displayName")}</th>
            <th className="px-3 py-3 font-medium">{t("sources.group")}</th>
            <th className="px-3 py-3 font-medium">{t("sources.parser")}</th>
            <th className="px-3 py-3 font-medium">{t("sources.symbolProfile")}</th>
            <th className="px-3 py-3 font-medium">{t("sources.priority")}</th>
            <th className="px-3 py-3 font-medium">{t("sources.membership")}</th>
            <th className="px-3 py-3 font-medium">{t("sources.state")}</th>
            <th className="px-3 py-3 font-medium">{t("sources.lastVerified")}</th>
            <th className="px-3 py-3 font-medium text-right">{t("common.actions")}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((s) => (
            <tr key={s.id} className="text-xs">
              <td className="px-3 py-3"><Checkbox checked={selected.has(s.id)} onCheckedChange={() => onToggle(s.id)} /></td>
              <td className="px-3 py-3">
                <div className="font-medium text-foreground">{s.displayName}</div>
                <div className="text-[11px] text-muted-foreground">{s.username} · {s.rawTitle}</div>
              </td>
              <td className="px-3 py-3">{s.group}</td>
              <td className="px-3 py-3 font-mono text-[11px]">{s.parserProfile}</td>
              <td className="px-3 py-3 font-mono text-[11px]">{s.symbolProfile}</td>
              <td className="px-3 py-3">
                <StatusBadge tone={s.priority === "high" ? "danger" : s.priority === "medium" ? "warning" : "neutral"} dot={false}>
                  {t(("sources." + s.priority) as never)}
                </StatusBadge>
              </td>
              <td className="px-3 py-3">{s.membership === "member" ? t("sources.member") : t("sources.notMember")}</td>
              <td className="px-3 py-3"><SourceStatusBadge state={s.state} /></td>
              <td className="px-3 py-3 text-muted-foreground">{formatDate(s.lastVerified)}</td>
              <td className="px-3 py-3">
                <div className="flex justify-end gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(s)} aria-label={t("common.edit")}><Pencil className="h-3.5 w-3.5" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onToggleState(s)} aria-label={s.state === "enabled" ? t("common.disable") : t("common.enable")}>
                    {s.state === "enabled" ? <PowerOff className="h-3.5 w-3.5" /> : <Power className="h-3.5 w-3.5" />}
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-rose-600 hover:bg-rose-50 hover:text-rose-700" onClick={() => onDelete(s)} aria-label={t("common.delete")}><Trash2 className="h-3.5 w-3.5" /></Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}