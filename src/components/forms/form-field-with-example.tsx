import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

export function FormFieldWithExample({
  id, label, example, error, children,
}: {
  id?: string; label: string; example?: string; error?: string; children: ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs font-medium">{label}</Label>
      {example && <p className="text-[11px] text-muted-foreground">{example}</p>}
      {children}
      {error && <p className="text-[11px] font-medium text-rose-600">{error}</p>}
    </div>
  );
}