import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Kpi } from "@/lib/dashboard-data";

export function KpiCard({ kpi }: { kpi: Kpi }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      className="flex min-h-[7rem] flex-col rounded-3xl bg-surface-muted p-3.5 text-left transition-colors hover:bg-surface-strong"
    >
      <span className="flex items-start justify-between gap-2">
        <span className="text-[11px] uppercase leading-tight tracking-wide text-muted-foreground">
          {kpi.label}
        </span>
        <ChevronDown
          className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </span>
      <span className="mt-auto block font-mono text-[28px] font-medium leading-none tracking-tight text-foreground">
        {kpi.value}
      </span>
      <span className="mt-1 block text-[12px] text-muted-foreground">{kpi.unit}</span>
      <span className="mt-1.5 block text-[12px] font-medium text-brand">{kpi.note}</span>

      {open && (
        <span className="mt-3 block space-y-2 border-t border-border pt-2.5">
          {kpi.details.map((d) => (
            <span key={d.label} className="block">
              <span className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[11px] text-muted-foreground">
                  {d.label}
                </span>
                <span className="font-mono text-[12px] text-foreground">{d.value}</span>
              </span>
              <span className="mt-1 block h-1 rounded-full bg-background">
                <span
                  className="block h-1 rounded-full bg-brand"
                  style={{ width: `${d.percent}%` }}
                />
              </span>
            </span>
          ))}
        </span>
      )}
    </button>
  );
}
