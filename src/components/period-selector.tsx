import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n, type TKey } from "@/lib/i18n";

export type Period = "7d" | "30d" | "90d" | "ytd";

const OPTIONS: { value: Period; label: TKey }[] = [
  { value: "7d", label: "period.last7d" },
  { value: "30d", label: "period.last30d" },
  { value: "90d", label: "period.last90d" },
  { value: "ytd", label: "period.ytd" },
];

export function PeriodSelector({ value, onChange }: { value: Period; onChange: (v: Period) => void }) {
  const { t } = useI18n();
  return (
    <Select value={value} onValueChange={(v) => onChange(v as Period)}>
      <SelectTrigger className="h-8 w-[150px] text-xs">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map((o) => (
          <SelectItem key={o.value} value={o.value} className="text-xs">{t(o.label)}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}