import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormFieldWithExample } from "@/components/forms/form-field-with-example";
import { SearchableSelect } from "@/components/forms/searchable-select";
import { PARSER_PROFILES, PRIORITIES, SOURCE_GROUPS, SYMBOL_PROFILES } from "@/lib/sources-service";
import { useI18n } from "@/lib/i18n";
import type { Priority, TelegramSource } from "@/lib/types";

export function SourceForm({
  open, onOpenChange, initial, onSave,
}: {
  open: boolean; onOpenChange: (v: boolean) => void;
  initial?: TelegramSource | null;
  onSave: (s: Partial<TelegramSource>) => void;
}) {
  const { t } = useI18n();
  const [form, setForm] = useState<Partial<TelegramSource>>(() => initial ?? {
    displayName: "", link: "", commentName: "", group: SOURCE_GROUPS[0],
    parserProfile: PARSER_PROFILES[0], symbolProfile: SYMBOL_PROFILES[0], priority: "medium",
  });
  const set = <K extends keyof TelegramSource>(k: K, v: TelegramSource[K]) => setForm((f) => ({ ...f, [k]: v }));

  const opts = (arr: readonly string[]) => arr.map((v) => ({ value: v, label: v }));
  const prio = [
    { value: "high", label: t("sources.high") },
    { value: "medium", label: t("sources.medium") },
    { value: "low", label: t("sources.low") },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>{initial ? t("sources.editSource") : t("sources.addSource")}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-2 sm:grid-cols-2">
          <FormFieldWithExample label={t("sources.link")} example={t("ex.link")}>
            <Input value={form.link ?? ""} onChange={(e) => set("link", e.target.value)} />
          </FormFieldWithExample>
          <FormFieldWithExample label={t("sources.displayName")} example={t("ex.displayName")}>
            <Input value={form.displayName ?? ""} onChange={(e) => set("displayName", e.target.value)} />
          </FormFieldWithExample>
          <FormFieldWithExample label={t("sources.commentName")} example={t("ex.commentName")}>
            <Input value={form.commentName ?? ""} onChange={(e) => set("commentName", e.target.value)} />
          </FormFieldWithExample>
          <FormFieldWithExample label={t("sources.group")}>
            <SearchableSelect value={form.group ?? ""} onChange={(v) => set("group", v)} options={opts(SOURCE_GROUPS)} />
          </FormFieldWithExample>
          <FormFieldWithExample label={t("sources.parser")}>
            <SearchableSelect value={form.parserProfile ?? ""} onChange={(v) => set("parserProfile", v)} options={opts(PARSER_PROFILES)} />
          </FormFieldWithExample>
          <FormFieldWithExample label={t("sources.symbolProfile")}>
            <SearchableSelect value={form.symbolProfile ?? ""} onChange={(v) => set("symbolProfile", v)} options={opts(SYMBOL_PROFILES)} />
          </FormFieldWithExample>
          <FormFieldWithExample label={t("sources.priority")}>
            <SearchableSelect value={form.priority ?? "medium"} onChange={(v) => set("priority", v as Priority)} options={prio} />
          </FormFieldWithExample>
          <FormFieldWithExample label={t("sources.tags")} example={t("ex.tags")}>
            <Input value={(form.tags ?? []).join(", ")} onChange={(e) => set("tags", e.target.value.split(",").map((x) => x.trim()).filter(Boolean))} />
          </FormFieldWithExample>
          <div className="sm:col-span-2">
            <FormFieldWithExample label={t("sources.notes")} example={t("ex.notes")}>
              <Textarea rows={3} value={form.notes ?? ""} onChange={(e) => set("notes", e.target.value)} />
            </FormFieldWithExample>
          </div>

          {initial && (
            <div className="sm:col-span-2 rounded-lg border border-dashed border-border bg-muted/40 p-3 text-xs">
              <div className="mb-2 font-medium text-foreground">{t("sources.machineFields")}</div>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-muted-foreground">
                <dt>{t("sources.uuid")}</dt><dd className="font-mono text-foreground">{initial.id}</dd>
                <dt>{t("sources.chatId")}</dt><dd className="font-mono text-foreground">{initial.chatId}</dd>
                <dt>{t("sources.visibility")}</dt><dd className="text-foreground">{initial.visibility}</dd>
                <dt>{t("sources.membership")}</dt><dd className="text-foreground">{initial.membership}</dd>
                <dt>{t("sources.history")}</dt><dd className="text-foreground">{initial.historyAccess}</dd>
                <dt>{t("sources.realtime")}</dt><dd className="text-foreground">{initial.realtimeFollow}</dd>
                <dt>{t("sources.lastVerified")}</dt><dd className="text-foreground">{initial.lastVerified}</dd>
              </dl>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t("common.cancel")}</Button>
          <Button onClick={() => { onSave(form); onOpenChange(false); }}>{t("sources.saveSource")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
// unused priorities re-export tag; keeps tree-shakers happy
void PRIORITIES;