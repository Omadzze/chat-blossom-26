import { useState } from "react";
import { ChevronRight, Search } from "lucide-react";
import type { RegistryItem } from "@/lib/registry-data";

const TONE: Record<string, string> = {
  red: "bg-status-red",
  yellow: "bg-status-yellow",
  blue: "bg-status-blue",
  green: "bg-status-green",
  grey: "bg-status-grey",
};

export function RegistrySearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center gap-2 rounded-full bg-surface-muted px-3.5 py-2.5">
      <Search className="size-4 shrink-0 text-muted-foreground" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Поиск по названию предприятия"
        className="min-w-0 flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted-foreground"
      />
    </label>
  );
}

export function RegistryList({ items }: { items: RegistryItem[] }) {
  const [open, setOpen] = useState<string | null>(null);

  if (!items.length) {
    return (
      <p className="rounded-2xl bg-surface-muted px-3.5 py-6 text-center text-[13px] text-muted-foreground">
        По выбранным фильтрам предприятий нет
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((it) => {
        const isOpen = open === it.id;
        return (
          <li key={it.id} className="rounded-2xl bg-surface-muted">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : it.id)}
              className="flex w-full items-start gap-2.5 px-3.5 py-3 text-left"
            >
              <span className={`mt-1.5 size-2 shrink-0 rounded-full ${TONE[it.tone]}`} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-medium text-foreground">
                  {it.name}
                </span>
                <span className="mt-0.5 block truncate text-[12px] text-muted-foreground">
                  {it.region} · {it.industry}
                </span>
                <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <span className="rounded-full bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {it.status}
                  </span>
                  <span className="rounded-full bg-background px-2 py-0.5 font-mono text-[11px] text-foreground">
                    {it.invested}
                  </span>
                </span>
              </span>
              <ChevronRight
                className={`mt-1 size-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-90" : ""}`}
              />
            </button>
            {isOpen && (
              <dl className="space-y-1.5 border-t border-border px-3.5 py-3 text-[13px]">
                <Row label="Зона" value={it.zone} />
                <Row label="Ограничение" value={it.reason} />
                <Row label="Занятость" value={it.jobs} />
                <Row label="Выпуск за период" value={it.output} />
                <Row label="Ответственные" value={it.owner} />
                <p className="pt-0.5 text-[11px] text-muted-foreground">{it.updated}</p>
              </dl>
            )}
          </li>
        );
      })}
    </ul>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] gap-2">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="leading-relaxed text-foreground">{value}</dd>
    </div>
  );
}
