import { useState } from "react";
import { ChevronRight, Sparkles } from "lucide-react";
import { DIGEST_TABS, type Priority, type RegionDigest } from "@/lib/dashboard-data";

function PriorityCard({ item }: { item: Priority }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="rounded-3xl border border-border bg-background p-3.5">
      <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-status-red">
        <span className="size-1.5 rounded-full bg-status-red" />
        Приоритет {item.priority}
      </p>
      <h4 className="mt-2 text-[15px] font-medium text-foreground">{item.title}</h4>
      <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">
        {item.problem}
      </p>

      <div className="mt-3 rounded-2xl bg-advice p-3">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-advice-foreground">
          <Sparkles className="size-3.5" />
          Рекомендация ИИ
        </p>
        <p className="mt-1.5 text-[14px] leading-relaxed text-foreground">
          {item.solution}
        </p>
        <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-advice-foreground">
          Эффект: {item.effect}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {item.sources.map((s) => (
          <span
            key={s}
            className="rounded-full bg-surface-muted px-2 py-1 text-[11px] font-medium text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-3 flex items-center gap-1 text-[13px] font-medium text-brand"
      >
        <ChevronRight
          className={`size-4 transition-transform ${open ? "rotate-90" : ""}`}
        />
        Подробнее
      </button>
      {open && (
        <p className="mt-2 border-l-2 border-border pl-3 text-[13px] leading-relaxed text-muted-foreground">
          {item.more}
        </p>
      )}
    </article>
  );
}

export function DigestCard({
  digest,
  onAsk,
}: {
  digest: RegionDigest;
  onAsk: () => void;
}) {
  const [tab, setTab] = useState<string>("problems");

  return (
    <section className="rounded-[28px] bg-brand-soft p-3">
      <h3 className="flex items-center gap-1.5 px-1 text-[12px] font-semibold uppercase tracking-wide text-brand">
        <Sparkles className="size-4" />
        ИИ-Дайджест
      </h3>

      <div className="-mx-3 mt-2.5 overflow-x-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-1.5">
          {DIGEST_TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-medium transition-colors ${
                tab === t.id
                  ? "bg-brand text-brand-foreground"
                  : "bg-background text-muted-foreground"
              }`}
            >
              {t.label}
              <span className="rounded-full bg-surface-muted px-1.5 text-[11px] text-muted-foreground">
                {t.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-3 rounded-2xl bg-background p-3.5 text-[14px] font-medium leading-relaxed text-foreground">
        {digest.headline}
      </p>

      {tab === "problems" ? (
        <div className="mt-2.5 space-y-2.5">
          {digest.priorities.map((p) => (
            <PriorityCard key={p.priority} item={p} />
          ))}
        </div>
      ) : (
        <ul className="mt-2.5 space-y-2">
          {digest.recommendations.slice(0, 3).map((r, i) => (
            <li
              key={i}
              className="rounded-2xl bg-background p-3 text-[14px] leading-relaxed text-foreground"
            >
              {r}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3">
        <p className="px-1 text-[12px] font-semibold uppercase tracking-wide text-brand">
          Рекомендации ИИ
        </p>
        <ol className="mt-2 space-y-2">
          {digest.recommendations.map((r, i) => (
            <li
              key={i}
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-2.5 rounded-2xl bg-background p-3"
            >
              <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-brand-soft font-mono text-[12px] text-brand">
                {i + 1}
              </span>
              <span className="text-[14px] leading-relaxed text-foreground">{r}</span>
            </li>
          ))}
        </ol>
      </div>

      <button
        type="button"
        onClick={onAsk}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-3 text-[14px] font-medium text-brand-foreground transition-opacity hover:opacity-90"
      >
        <Sparkles className="size-4" />
        Спросить ИИ по этому срезу
      </button>
    </section>
  );
}

export function DataGaps({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="rounded-3xl bg-surface-muted p-3.5">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <span className="text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
          Дыры данных · {items.length}
        </span>
        <ChevronRight
          className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`}
        />
      </button>
      {open && (
        <ul className="mt-2.5 space-y-2">
          {items.map((g, i) => (
            <li key={i} className="text-[13px] leading-relaxed text-muted-foreground">
              • {g}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
