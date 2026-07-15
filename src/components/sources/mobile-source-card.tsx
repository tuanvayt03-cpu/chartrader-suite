import { useState } from "react";
import { ChevronDown, MoreVertical } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { SourceStatusBadge } from "./source-status-badge";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { TelegramSource } from "@/lib/types";

export function MobileSourceCard({
  source: s, selected, onToggle, onEdit, onToggleState, onDelete,
}: {
  source: TelegramSource; selected: boolean; onToggle: () => void;
  onEdit: () => void; onToggleState: () => void; onDelete: () => void;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="flex items-start gap-2">
        <Checkbox checked={selected} onCheckedChange={onToggle} className="mt-1" />
        <button className="flex-1 min-w-0 text-left" onClick={() => setOpen(!open)}>
          <div className="flex items-center justify-between gap-2">
            <div className="truncate text-sm font-semibold">{s.displayName}</div>
            <SourceStatusBadge state={s.state} />
          </div>
          <div className="mt-0.5 truncate text-[11px] text-muted-foreground">{s.username} · {s.group}</div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
            <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
            {open ? t("order.showLess") : t("order.showMore")}
          </div>
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-7 w-7"><MoreVertical className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={onEdit}>{t("common.edit")}</DropdownMenuItem>
            <DropdownMenuItem onSelect={onToggleState}>{s.state === "enabled" ? t("common.disable") : t("common.enable")}</DropdownMenuItem>
            <DropdownMenuItem onSelect={onDelete} className="text-rose-600">{t("common.delete")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {open && (
        <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 border-t border-border pt-3 text-[11px]">
          <dt className="text-muted-foreground">{t("sources.parser")}</dt><dd className="truncate font-mono">{s.parserProfile}</dd>
          <dt className="text-muted-foreground">{t("sources.symbolProfile")}</dt><dd className="truncate font-mono">{s.symbolProfile}</dd>
          <dt className="text-muted-foreground">{t("sources.priority")}</dt><dd>{t(("sources." + s.priority) as never)}</dd>
          <dt className="text-muted-foreground">{t("sources.membership")}</dt><dd>{s.membership === "member" ? t("sources.member") : t("sources.notMember")}</dd>
          <dt className="text-muted-foreground">{t("sources.history")}</dt><dd>{s.historyAccess}</dd>
          <dt className="text-muted-foreground">{t("sources.realtime")}</dt><dd>{s.realtimeFollow}</dd>
          <dt className="text-muted-foreground">{t("sources.chatId")}</dt><dd className="truncate font-mono">{s.chatId}</dd>
        </dl>
      )}
    </div>
  );
}