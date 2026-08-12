import { TrendingDown, TrendingUp } from "lucide-react";
import { REGIONS } from "@/lib/dashboard-data";

export function RegionStrip({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-2 pb-1">
        {REGIONS.map((r) => {
          const active = r.id === selected;
          const up = r.delta >= 0;
          return (
            <button
              key={r.id}
              type="button"
              onClick={() => onSelect(r.id)}
              className={`min-w-[7.5rem] shrink-0 rounded-2xl border p-3 text-left transition-colors ${
                active
                  ? "border-brand bg-brand-soft"
                  : "border-border bg-surface-muted hover:bg-surface-strong"
              }`}
            >
              <span className="block truncate text-[13px] font-medium text-foreground">
                {r.name}
              </span>
              <span className="mt-1.5 block font-mono text-[15px] text-foreground">
                {r.export}
              </span>
              <span
                className={`mt-1 flex items-center gap-1 text-[12px] ${
                  up ? "text-status-green" : "text-status-red"
                }`}
              >
                {up ? (
                  <TrendingUp className="size-3.5" />
                ) : (
                  <TrendingDown className="size-3.5" />
                )}
                {up ? "+" : ""}
                {r.delta.toFixed(1)}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
