import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { TotalBalanceSlide } from "./total-balance-slide";
import { RevenueOverTimeSlide } from "./revenue-over-time-slide";
import { PaginationDots } from "./pagination-dots";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function AnalyticsCarousel() {
  const { t } = useI18n();
  const [i, setI] = useState(0);
  const startX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const slides = [
    { key: "balance", label: t("dash.totalBalance"), node: <TotalBalanceSlide /> },
    { key: "revenue", label: t("dash.revenueOverTime"), node: <RevenueOverTimeSlide /> },
  ];

  const go = useCallback((n: number) => setI((n + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [go, i]);

  return (
    <Card
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={slides[i].label}
      className="flex min-h-[420px] flex-col overflow-hidden p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-5"
      onTouchStart={(e) => { startX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (startX.current == null) return;
        const dx = e.changedTouches[0].clientX - startX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? i + 1 : i - 1);
        startX.current = null;
      }}
    >
      <div className="relative min-h-0 flex-1">
        {slides.map((s, idx) => (
          <div
            key={s.key}
            aria-hidden={idx !== i}
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              idx === i ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            {s.node}
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <PaginationDots count={slides.length} active={i} onSelect={go} labels={slides.map((s) => s.label)} />
      </div>
    </Card>
  );
}