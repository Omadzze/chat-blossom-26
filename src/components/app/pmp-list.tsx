import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { PmpItem } from "@/lib/pmp-data";

export function PmpList({ items }: { items: PmpItem[] }) {
  if (!items.length) {
    return (
      <p className="rounded-2xl bg-surface-muted px-3.5 py-6 text-center text-[13px] text-muted-foreground">
        По запросу проектов нет
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it.id}>
          <Link
            to="/pmp/$id"
            params={{ id: it.id }}
            className="flex w-full items-start gap-2.5 rounded-2xl bg-surface-muted px-3.5 py-3 text-left"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-medium leading-snug text-foreground">
                {it.title}
              </span>
              <span className="mt-0.5 block text-[12px] leading-snug text-muted-foreground">
                {it.name}
              </span>
              <span className="mt-0.5 block truncate text-[12px] text-muted-foreground">
                {it.region} · {it.industry} · {it.owner}
              </span>
              <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <span className="rounded-full bg-background px-2 py-0.5 font-mono text-[11px] text-foreground">
                  {it.cost} млн $
                </span>
                <span className="rounded-full bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
                  {it.term}
                </span>
                <span
                  className={`rounded-full bg-background px-2 py-0.5 font-mono text-[11px] ${
                    it.share ? "text-status-red" : "text-muted-foreground"
                  }`}
                >
                  {it.share ? `освоение ${it.share}` : "освоение —"}
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
