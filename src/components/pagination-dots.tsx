import { cn } from "@/lib/utils";

export function PaginationDots({
  count, active, onSelect, labels,
}: { count: number; active: number; onSelect: (i: number) => void; labels?: string[] }) {
  return (
    <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Analytics slides">
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          role="tab"
          aria-selected={i === active}
          aria-label={labels?.[i] ?? `Slide ${i + 1}`}
          onClick={() => onSelect(i)}
          className={cn(
            "h-2 rounded-full transition-all",
            i === active ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/40",
          )}
        />
      ))}
    </div>
  );
}