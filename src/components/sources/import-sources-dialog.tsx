import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FormFieldWithExample } from "@/components/forms/form-field-with-example";
import { StatusBadge, type StatusTone } from "@/components/status-badge";
import { previewImport } from "@/lib/sources-service";
import { useI18n } from "@/lib/i18n";
import type { ImportRow } from "@/lib/types";
import { toast } from "sonner";

const TONES: Record<ImportRow["category"], StatusTone> = {
  new: "success", existing: "info", conflict: "warning",
  invalid: "danger", noParser: "warning", noSymbol: "warning",
};

export function ImportSourcesDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const { t } = useI18n();
  const [step, setStep] = useState<0 | 1 | 2>(0); // paste / preview / done
  const [text, setText] = useState("https://t.me/examplechannel\n@publicusername\n@goldvipexample\n@noparserdemo\n@conflictdemo\nnotalink");
  const rows = useMemo<ImportRow[]>(() => (step >= 1 ? previewImport(text) : []), [text, step]);
  const applicable = rows.filter((r) => r.category === "new").length;

  const label: Record<ImportRow["category"], string> = {
    new: t("import.category.new"), existing: t("import.category.existing"),
    conflict: t("import.category.conflict"), invalid: t("import.category.invalid"),
    noParser: t("import.category.noParser"), noSymbol: t("import.category.noSymbol"),
  };

  const reset = () => { setStep(0); onOpenChange(false); };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) reset(); else onOpenChange(v); }}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-[720px]">
        <DialogHeader>
          <DialogTitle>{t("import.title")}</DialogTitle>
        </DialogHeader>
        <ol className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground">
          {[t("import.step.paste"), t("import.step.preview"), t("import.step.apply")].map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <span className={`grid h-5 w-5 place-items-center rounded-full text-[10px] ${step >= i ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{i + 1}</span>
              <span className={step >= i ? "text-foreground" : ""}>{s}</span>
              {i < 2 && <span className="mx-1 h-px w-6 bg-border" />}
            </li>
          ))}
        </ol>

        {step === 0 && (
          <div className="mt-3 space-y-3">
            <FormFieldWithExample label={t("import.pasteLabel")} example={t("import.pasteHelp")}>
              <Textarea rows={8} value={text} onChange={(e) => setText(e.target.value)} />
            </FormFieldWithExample>
            <div>
              <Button variant="outline" size="sm" onClick={() => document.getElementById("import-file")?.click()}>
                {t("import.chooseFile")}
              </Button>
              <input id="import-file" type="file" accept=".txt,.csv" className="hidden"
                onChange={async (e) => {
                  const f = e.target.files?.[0]; if (!f) return;
                  setText(await f.text());
                }} />
            </div>
          </div>
        )}

        {step >= 1 && (
          <div className="mt-3 max-h-[360px] overflow-y-auto rounded-lg border border-border">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-muted/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr><th className="px-3 py-2 text-left font-medium">Input</th><th className="px-3 py-2 text-left font-medium">Result</th></tr>
              </thead>
              <tbody className="divide-y divide-border">
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td className="px-3 py-2 font-mono text-[11px]">{r.input}</td>
                    <td className="px-3 py-2"><StatusBadge tone={TONES[r.category]}>{label[r.category]}</StatusBadge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <DialogFooter className="mt-2 gap-2">
          <Button variant="outline" onClick={reset}>{t("common.cancel")}</Button>
          {step === 0 && <Button onClick={() => setStep(1)} disabled={!text.trim()}>{t("import.preview")}</Button>}
          {step === 1 && (
            <Button
              onClick={() => { toast.success(t("import.doneToast"), { description: `${applicable} × ${t("import.category.new")}` }); reset(); }}
              disabled={applicable === 0}
            >{t("import.apply")} ({applicable})</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}