import { Link } from "@tanstack/react-router";
import { ChevronRight, Search } from "lucide-react";
import type { RegistryItem } from "@/lib/registry-data";

const TONE: Record<string, string> = {
  red: "bg-status-red",
  yellow: "bg-status-yellow",
  blue: "bg-status-blue",
  green: "bg-status-green",
  grey: "bg-status-grey",
};

export const TYPE_TONE: Record<string, string> = {
  "Сырьё": "bg-status-red",
  "Финансы": "bg-status-blue",
  "Инвестор": "bg-status-green",
  "Сбыт": "bg-status-blue",
  "Отчётность": "bg-status-yellow",
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
        placeholder="Название, СТИР"
        className="min-w-0 flex-1 bg-transparent text-[14px] text-foreground outline-none placeholder:text-muted-foreground"
      />
    </label>
  );
}

export function RegistryList({ items }: { items: RegistryItem[] }) {
  if (!items.length) {
    return (
      <p className="rounded-2xl bg-surface-muted px-3.5 py-6 text-center text-[13px] text-muted-foreground">
        По выбранным фильтрам предприятий нет
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it.id}>
          <Link
            to="/registry/$id"
            params={{ id: it.id }}
            className="flex w-full items-start gap-2.5 rounded-2xl bg-surface-muted px-3.5 py-3 text-left"
          >
            <span className={`mt-1.5 size-2 shrink-0 rounded-full ${TONE[it.tone]}`} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[14px] font-medium text-foreground">
                {it.name} <span className="text-muted-foreground">{it.form}</span>
              </span>
              <span className="mt-0.5 block truncate text-[12px] text-muted-foreground">
                {it.region} · {it.industry}
              </span>
              <span className="mt-1 block line-clamp-2 text-[12px] leading-snug text-foreground/80">
                {it.problem}
              </span>
              <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <span className="flex items-center gap-1 rounded-full bg-background px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  <span className={`size-1.5 rounded-full ${TYPE_TONE[it.type]}`} />
                  {it.type}
                </span>
                <span className="rounded-full bg-background px-2 py-0.5 font-mono text-[11px] text-status-red">
                  загрузка {it.load}
                </span>
                <span className="rounded-full bg-background px-2 py-0.5 text-[11px] text-brand">
                  {it.decision}
                </span>
              </span>
            </span>
            <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
