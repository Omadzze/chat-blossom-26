import { useState } from "react";
import { ChevronRight } from "lucide-react";
import type { Reason, Measure, Investment, MarketNote } from "@/lib/projects-data";

const TONE: Record<string, string> = {
  red: "bg-status-red",
  yellow: "bg-status-yellow",
  blue: "bg-status-blue",
  green: "bg-status-green",
  grey: "bg-status-grey",
};

export function ZoneChips({
  zones,
  selected,
  onSelect,
}: {
  zones: { id: string; label: string; count: string; tone: string }[];
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-1.5">
        {zones.map((z) => {
          const active = selected === z.id;
          return (
            <button
              key={z.id}
              type="button"
              onClick={() => onSelect(z.id)}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-[13px] font-medium transition-colors ${
                active
                  ? "bg-brand text-brand-foreground"
                  : "bg-surface-muted text-muted-foreground"
              }`}
            >
              <span className={`size-1.5 rounded-full ${TONE[z.tone]}`} />
              {z.label}
              <span
                className={`font-mono text-[12px] ${active ? "opacity-80" : "text-foreground/70"}`}
              >
                {z.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function SelectRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-surface-muted">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 px-3.5 py-3 text-left"
      >
        <span className="min-w-0 truncate text-[13px] text-muted-foreground">
          {label}: <span className="text-foreground">{value}</span>
        </span>
        <ChevronRight
          className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`}
        />
      </button>
      {open && (
        <ul className="border-t border-border px-1.5 py-1.5">
          {options.map((o) => (
            <li key={o}>
              <button
                type="button"
                onClick={() => {
                  onChange(o);
                  setOpen(false);
                }}
                className={`w-full rounded-xl px-2.5 py-2.5 text-left text-[13px] ${
                  o === value ? "bg-brand-soft text-brand" : "text-foreground"
                }`}
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Bar({ percent, tone = "brand" }: { percent: number; tone?: string }) {
  return (
    <span className="mt-2 block h-1.5 w-full overflow-hidden rounded-full bg-surface-strong">
      <span
        className={`block h-full rounded-full ${tone === "brand" ? "bg-brand" : TONE[tone]}`}
        style={{ width: `${Math.max(2, Math.min(100, percent))}%` }}
      />
    </span>
  );
}

export function MetricTile({
  label,
  value,
  of,
  percent,
  note,
}: {
  label: string;
  value: string;
  of: string;
  percent: number;
  note: string;
}) {
  return (
    <div className="rounded-2xl bg-surface-muted p-3">
      <p className="text-[11px] uppercase leading-tight tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-mono text-[20px] leading-none text-foreground">{value}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">{of}</p>
      <Bar percent={percent} />
      <p className="mt-1.5 text-[11px] leading-tight text-muted-foreground">{note}</p>
    </div>
  );
}

export function CollapsibleText({
  text,
  label = "Подробнее",
}: {
  text: string;
  label?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <p
        className={`mt-1.5 text-[14px] leading-relaxed text-foreground ${open ? "" : "line-clamp-3"}`}
      >
        {text}
      </p>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mt-2 flex items-center gap-1 text-[13px] font-medium text-brand"
      >
        <ChevronRight
          className={`size-4 transition-transform ${open ? "rotate-90" : ""}`}
        />
        {open ? "Свернуть" : label}
      </button>
    </>
  );
}

const SLICE_COLORS = [
  "var(--status-red)",
  "var(--status-grey)",
  "var(--status-green)",
  "var(--status-blue)",
  "var(--status-yellow)",
  "var(--brand)",
  "var(--surface-strong)",
];

function fmt(n: number) {
  return String(n).replace(".", ",");
}

export function ReasonDonut({ items }: { items: Reason[] }) {
  const [active, setActive] = useState(0);

  const top = items.slice(0, 6);
  const rest = items.slice(6);
  const restPercent =
    Math.round(rest.reduce((s, r) => s + r.percent, 0) * 10) / 10;
  const segments = [
    ...top.map((r) => ({ name: r.name, percent: r.percent, reason: r as Reason | null })),
    ...(rest.length
      ? [{ name: "Прочие причины", percent: restPercent, reason: null }]
      : []),
  ];

  const R = 42;
  const C = 2 * Math.PI * R;
  let offset = 0;
  const selected = segments[active];

  return (
    <div className="rounded-3xl bg-surface-muted p-4">
      <div className="relative mx-auto size-[184px]">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90">
          {segments.map((s, i) => {
            const len = (s.percent / 100) * C;
            const dash = `${Math.max(0, len - 1.5)} ${C - Math.max(0, len - 1.5)}`;
            const el = (
              <circle
                key={s.name}
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke={SLICE_COLORS[i % SLICE_COLORS.length]}
                strokeWidth={i === active ? 15 : 11}
                strokeDasharray={dash}
                strokeDashoffset={-offset}
                onClick={() => setActive(i)}
                className="cursor-pointer transition-[stroke-width]"
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="pointer-events-none absolute inset-0 grid place-items-center px-6 text-center">
          <div>
            <p className="font-mono text-[26px] leading-none text-foreground">
              {fmt(selected?.percent ?? 0)}%
            </p>
            <p className="mt-1.5 text-[11px] leading-tight text-muted-foreground">
              {selected?.name}
            </p>
          </div>
        </div>
      </div>

      <ul className="mt-4 space-y-1">
        {segments.map((s, i) => (
          <li key={s.name}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className={`grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2.5 rounded-xl px-2 py-2 text-left transition-colors ${
                i === active ? "bg-background" : ""
              }`}
            >
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: SLICE_COLORS[i % SLICE_COLORS.length] }}
              />
              <span className="min-w-0 truncate text-[14px] text-foreground">
                {s.name}
              </span>
              <span className="shrink-0 font-mono text-[13px] text-muted-foreground">
                {s.reason ? s.reason.count.replace(" из 169", "") : `${rest.length} причин`} ·{" "}
                {fmt(s.percent)}%
              </span>
            </button>
            {i === active && s.reason && (
              <div className="mb-1 ml-[22px] space-y-1 border-l-2 border-border pl-3">
                <p className="text-[13px] text-muted-foreground">
                  Предприятий: <span className="text-foreground">{s.reason.count}</span>
                </p>
                <p className="text-[13px] text-muted-foreground">
                  Объём вложений:{" "}
                  <span className="font-mono text-foreground">{s.reason.invested}</span>
                </p>
                <p className="text-[13px] leading-relaxed text-muted-foreground">
                  Ответственные: {s.reason.owner}
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}


export function MeasureList({ items }: { items: Measure[] }) {
  return (
    <ol className="space-y-2.5">
      {items.map((m, i) => (
        <li key={m.title} className="rounded-3xl bg-advice p-3.5">
          <div className="grid grid-cols-[auto_minmax(0,1fr)] gap-2.5">
            <span className="grid size-6 shrink-0 place-items-center rounded-lg bg-background font-mono text-[12px] text-advice-foreground">
              {i + 1}
            </span>
            <div className="min-w-0">
              <h4 className="text-[15px] font-medium leading-snug text-foreground">
                {m.title}
              </h4>
              <CollapsibleText text={m.text} />
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-background px-2 py-1 text-[11px] font-medium text-muted-foreground">
                  {m.owner}
                </span>
                <span className="rounded-full bg-background px-2 py-1 text-[11px] font-medium text-advice-foreground">
                  {m.coverage}
                </span>
                <span className="rounded-full bg-background px-2 py-1 font-mono text-[11px] text-foreground">
                  {m.amount}
                </span>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function MarketList({ items }: { items: MarketNote[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <ul className="space-y-2">
      {items.map((m) => {
        const isOpen = open === m.industry;
        return (
          <li key={m.industry} className="rounded-2xl bg-surface-muted p-3.5">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : m.industry)}
              className="flex w-full items-center justify-between gap-2 text-left"
            >
              <span className="min-w-0 truncate text-[15px] text-foreground">
                {m.industry}
              </span>
              <ChevronRight
                className={`size-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-90" : ""}`}
              />
            </button>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
              {m.headline}
            </p>
            {isOpen && (
              <>
                <p className="mt-2 text-[13px] leading-relaxed text-foreground">
                  {m.detail}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {m.sources.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-background px-2 py-1 text-[11px] font-medium text-muted-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </>
            )}
          </li>
        );
      })}
    </ul>
  );
}

export function InvestmentList({ items }: { items: Investment[] }) {
  const [all, setAll] = useState(false);
  const shown = all ? items : items.slice(0, 8);
  return (
    <>
      <ul className="space-y-2.5">
        {shown.map((it) => (
          <li key={it.name} className="rounded-2xl bg-surface-muted p-3.5">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2">
              <div className="min-w-0">
                <p className="truncate text-[14px] font-medium text-foreground">
                  {it.name}
                </p>
                <p className="truncate text-[12px] text-muted-foreground">{it.region}</p>
              </div>
              <p className="shrink-0 font-mono text-[13px] text-foreground">{it.value}</p>
            </div>
            <Bar percent={it.percent} />
          </li>
        ))}
      </ul>
      {items.length > 8 && (
        <button
          type="button"
          onClick={() => setAll((a) => !a)}
          className="mt-2 w-full rounded-full bg-surface-muted py-2.5 text-[13px] font-medium text-brand"
        >
          {all ? "Свернуть" : `Показать все ${items.length}`}
        </button>
      )}
    </>
  );
}
