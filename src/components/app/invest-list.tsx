import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import type { InvestItem } from "@/lib/invest-data";

export function InvestList({ items }: { items: InvestItem[] }) {
  if (!items.length) {
    return (
      <p className="rounded-2xl bg-surface-muted px-3.5 py-6 text-center text-[13px] text-muted-foreground">
        По выбранным фильтрам проектов нет
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((it) => (
        <li key={it.id}>
          <Link
            to="/invest/$id"
            params={{ id: it.id }}
            className="flex w-full items-start gap-2.5 rounded-2xl bg-surface-muted px-3.5 py-3 text-left"
          >
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-medium leading-snug text-foreground">
                {it.name}
              </span>
              <span className="mt-0.5 block truncate text-[12px] text-muted-foreground">
                {it.owner}
              </span>
              <span className="mt-0.5 block truncate text-[12px] text-muted-foreground">
                {it.region} · {it.district} · {it.industry}
              </span>
              <span className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <span className="rounded-full bg-background px-2 py-0.5 font-mono text-[11px] text-foreground">
                  {it.cost} млн $
                </span>
                {it.share && (
                  <span className="rounded-full bg-background px-2 py-0.5 font-mono text-[11px] text-status-red">
                    освоение {it.share}
                  </span>
                )}
                {it.term && (
                  <span className="rounded-full bg-background px-2 py-0.5 text-[11px] text-muted-foreground">
                    {it.term}
                  </span>
                )}
              </span>
            </span>
            <ChevronRight className="mt-1 size-4 shrink-0 text-muted-foreground" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
