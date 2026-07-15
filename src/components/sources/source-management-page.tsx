import { useMemo, useState } from "react";
import { Plus, Upload, Download, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SourceTable } from "./source-table";
import { MobileSourceCard } from "./mobile-source-card";
import { BulkActionToolbar } from "./bulk-action-toolbar";
import { SourceForm } from "./source-form";
import { ImportSourcesDialog } from "./import-sources-dialog";
import { DisableSourceDialog } from "./disable-source-dialog";
import { DeleteSourceDialog } from "./delete-source-dialog";
import { listSources, SOURCE_GROUPS } from "@/lib/sources-service";
import { useI18n } from "@/lib/i18n";
import type { SourceState, TelegramSource } from "@/lib/types";
import { toast } from "sonner";

export function SourceManagementPage() {
  const { t } = useI18n();
  const [items, setItems] = useState<TelegramSource[]>(() => listSources());
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<string>("all");
  const [state, setState] = useState<"all" | SourceState>("all");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const [formOpen, setFormOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [editing, setEditing] = useState<TelegramSource | null>(null);

  const [disable, setDisable] = useState<{ open: boolean; ids: string[] }>({ open: false, ids: [] });
  const [del, setDel] = useState<{ open: boolean; ids: string[] }>({ open: false, ids: [] });

  const filtered = useMemo(() => items.filter((s) => {
    if (group !== "all" && s.group !== group) return false;
    if (state !== "all" && s.state !== state) return false;
    if (q) {
      const needle = q.toLowerCase();
      return s.displayName.toLowerCase().includes(needle) || s.username.toLowerCase().includes(needle) || s.group.toLowerCase().includes(needle);
    }
    return true;
  }), [items, q, group, state]);

  const toggle = (id: string) => setSelected((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleAll = (all: boolean) => setSelected(all ? new Set(filtered.map((f) => f.id)) : new Set());

  const askDisable = (ids: string[]) => setDisable({ open: true, ids });
  const askDelete = (ids: string[]) => setDel({ open: true, ids });

  const doDisable = () => {
    setItems((prev) => prev.map((s) => disable.ids.includes(s.id) ? { ...s, state: "disabled" } : s));
    toast.success(t("disable.toast"), { description: `${disable.ids.length} × ${t("sources.disabled")}` });
    setDisable({ open: false, ids: [] });
    setSelected(new Set());
  };
  const doEnable = (ids: string[]) => {
    setItems((prev) => prev.map((s) => ids.includes(s.id) ? { ...s, state: "enabled" } : s));
    toast.success(t("common.enable"));
    setSelected(new Set());
  };
  const doDelete = () => {
    setItems((prev) => prev.filter((s) => !del.ids.includes(s.id)));
    toast.success(t("delete.toast"), { description: `${del.ids.length} × ${t("common.delete")}` });
    setDel({ open: false, ids: [] });
    setSelected(new Set());
  };

  const onSave = (partial: Partial<TelegramSource>) => {
    if (editing) {
      setItems((prev) => prev.map((s) => s.id === editing.id ? { ...s, ...partial } : s));
      toast.success(t("common.save"));
    } else {
      const id = `src-${Date.now().toString(36)}`;
      const s: TelegramSource = {
        id, displayName: partial.displayName || "New Source",
        rawTitle: partial.displayName || "New Source", link: partial.link || "",
        username: (partial.link?.match(/@?([a-z0-9_]+)$/i)?.[1] ? "@" + partial.link.match(/@?([a-z0-9_]+)$/i)![1] : "@new"),
        group: partial.group || SOURCE_GROUPS[0], parserProfile: partial.parserProfile || "parser.forex.v2",
        symbolProfile: partial.symbolProfile || "symbols.majors", priority: partial.priority || "medium",
        visibility: "public", membership: "not_member",
        historyAccess: "pending", realtimeFollow: "pending", state: "enabled",
        lastVerified: new Date().toISOString(), chatId: "-1000000000000",
        commentName: partial.commentName || partial.displayName || "NEW",
        notes: partial.notes, tags: partial.tags,
      };
      setItems((prev) => [s, ...prev]);
      toast.success(t("sources.addSource"));
    }
    setEditing(null);
  };

  const openAdd = () => { setEditing(null); setFormOpen(true); };
  const openEdit = (s: TelegramSource) => { setEditing(s); setFormOpen(true); };

  return (
    <div className="space-y-4">
      <BulkActionToolbar
        count={selected.size}
        onClear={() => setSelected(new Set())}
        onEnable={() => doEnable(Array.from(selected))}
        onDisable={() => askDisable(Array.from(selected))}
        onDelete={() => askDelete(Array.from(selected))}
        onExport={() => toast.success(t("sources.exportSelected"))}
      />

      <Card className="p-3 sm:p-4">
        <div className="grid gap-2 sm:grid-cols-[1fr_auto_auto_auto_auto] sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("sources.searchPlaceholder")} className="pl-9" />
          </div>
          <Select value={group} onValueChange={setGroup}>
            <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder={t("sources.filterGroup")} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("sources.filterAll")}</SelectItem>
              {SOURCE_GROUPS.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={state} onValueChange={(v) => setState(v as never)}>
            <SelectTrigger className="w-full sm:w-[140px]"><SelectValue placeholder={t("sources.filterStatus")} /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("sources.filterAll")}</SelectItem>
              <SelectItem value="enabled">{t("sources.enabled")}</SelectItem>
              <SelectItem value="disabled">{t("sources.disabled")}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2" onClick={() => setImportOpen(true)}>
            <Upload className="h-4 w-4" />{t("sources.import")}
          </Button>
          <Button className="gap-2" onClick={openAdd}>
            <Plus className="h-4 w-4" />{t("sources.add")}
          </Button>
        </div>
        <div className="mt-2 flex flex-wrap items-center justify-end gap-2 text-xs text-muted-foreground">
          <Button variant="ghost" size="sm" className="h-7 gap-1" onClick={() => toast.success(t("sources.exportAll"))}>
            <Download className="h-3.5 w-3.5" />{t("sources.exportAll")}
          </Button>
        </div>
      </Card>

      {/* Desktop */}
      <div className="hidden lg:block">
        <SourceTable
          rows={filtered}
          selected={selected}
          onToggle={toggle}
          onToggleAll={toggleAll}
          onEdit={openEdit}
          onToggleState={(s) => s.state === "enabled" ? askDisable([s.id]) : doEnable([s.id])}
          onDelete={(s) => askDelete([s.id])}
        />
      </div>

      {/* Mobile / tablet */}
      <div className="grid gap-2 lg:hidden">
        {filtered.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-sm font-medium">{t("sources.emptyTitle")}</div>
            <p className="mt-1 text-xs text-muted-foreground">{t("sources.emptyDesc")}</p>
          </Card>
        ) : filtered.map((s) => (
          <MobileSourceCard
            key={s.id} source={s}
            selected={selected.has(s.id)}
            onToggle={() => toggle(s.id)}
            onEdit={() => openEdit(s)}
            onToggleState={() => s.state === "enabled" ? askDisable([s.id]) : doEnable([s.id])}
            onDelete={() => askDelete([s.id])}
          />
        ))}
      </div>

      <SourceForm open={formOpen} onOpenChange={setFormOpen} initial={editing} onSave={onSave} />
      <ImportSourcesDialog open={importOpen} onOpenChange={setImportOpen} />
      <DisableSourceDialog open={disable.open} onOpenChange={(v) => setDisable({ ...disable, open: v })} onConfirm={doDisable} count={disable.ids.length} />
      <DeleteSourceDialog open={del.open} onOpenChange={(v) => setDel({ ...del, open: v })} onConfirm={doDelete} count={del.ids.length} />
    </div>
  );
}