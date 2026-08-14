import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ClipboardCheck, Factory, Landmark } from "lucide-react";
import { SelectRow } from "@/components/app/projects-blocks";
import { RegistryList, RegistrySearch } from "@/components/app/registry-list";
import { InvestList } from "@/components/app/invest-list";
import { REGISTRY, REGISTRY_NOTE } from "@/lib/registry-data";
import {
  INVEST,
  INVEST_INDUSTRIES,
  INVEST_NOTE,
  INVEST_REGIONS,
  INVEST_STATES,
  INVEST_SUMMARY,
} from "@/lib/invest-data";

export const Route = createFileRoute("/projects/registry")({
  head: () => ({
    meta: [
      { title: "Реестр предприятий и инвестпроектов — Проекты" },
      {
        name: "description",
        content:
          "Реестр: предприятия постмониторинга, инвестпроекты PMI и проекты постмониторинга с проблемой, стоимостью, освоением и статусом решения.",
      },
      { property: "og:title", content: "Реестр предприятий и инвестпроектов — Проекты" },
      {
        property: "og:description",
        content:
          "Предприятия постмониторинга и инвестпроекты PMI с ограничением, освоением и статусом решения.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegistryPage,
});

const SECTIONS = [
  { id: "post", label: "Предприятия", icon: Factory },
  { id: "invest", label: "Инвестпроекты", icon: Landmark },
  { id: "pmp", label: "Проекты", icon: ClipboardCheck },
];

function RegistryPage() {
  const [section, setSection] = useState("post");

  return (
    <main className="flex-1 space-y-3 overflow-y-auto px-4 pb-6">
      <div className="grid grid-cols-3 gap-1 rounded-full bg-surface-muted p-1">
        {SECTIONS.map((s) => {
          const active = section === s.id;
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setSection(s.id)}
              className={`flex items-center justify-center gap-1.5 rounded-full px-2 py-2.5 text-[13px] font-medium transition-colors ${
                active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              <Icon className="size-4" />
              {s.label}
            </button>
          );
        })}
      </div>

      {section === "post" && <EnterprisesSection />}
      {section === "invest" && <InvestSection />}
      {section === "pmp" && (
        <p className="rounded-2xl bg-surface-muted px-3.5 py-6 text-center text-[13px] text-muted-foreground">
          Проекты постмониторинга подключим следующим шагом
        </p>
      )}
    </main>
  );
}

function EnterprisesSection() {
  const [query, setQuery] = useState("");

  const items = useMemo(
    () =>
      REGISTRY.filter((it) => {
        if (query) {
          const q = query.toLowerCase();
          if (!it.name.toLowerCase().includes(q) && !it.stir.includes(q)) return false;
        }
        return true;
      }),
    [query],
  );

  return (
    <>
      <RegistrySearch value={query} onChange={setQuery} />

      <section>
        <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
          Требуют решения
        </h2>
        <p className="mb-2.5 text-[12px] text-muted-foreground">
          {REGISTRY_NOTE} · найдено {items.length}
        </p>
        <RegistryList items={items} />
      </section>
    </>
  );
}

function InvestSection() {
  const [state, setState] = useState("all");
  const [region, setRegion] = useState(INVEST_REGIONS[0]!);
  const [industry, setIndustry] = useState(INVEST_INDUSTRIES[0]!);
  const [query, setQuery] = useState("");

  const items = useMemo(
    () =>
      INVEST.filter((it) => {
        const share = it.share ? parseFloat(it.share.replace(",", ".")) : null;
        if (state === "low" && !(share !== null && share < 30)) return false;
        if (state === "none" && (share === null ? false : share > 0)) return false;
        if (state === "error" && it.missing === undefined) return false;
        if (region !== INVEST_REGIONS[0] && it.region !== region) return false;
        if (industry !== INVEST_INDUSTRIES[0] && it.industry !== industry) return false;
        if (query) {
          const q = query.toLowerCase();
          if (!it.name.toLowerCase().includes(q) && !it.owner.toLowerCase().includes(q))
            return false;
        }
        return true;
      }),
    [state, region, industry, query],
  );

  return (
    <>
      <RegistrySearch value={query} onChange={setQuery} />

      <div className="grid grid-cols-2 gap-2">
        <SelectRow label="Область" value={region} options={INVEST_REGIONS} onChange={setRegion} />
        <SelectRow
          label="Отрасль"
          value={industry}
          options={INVEST_INDUSTRIES}
          onChange={setIndustry}
        />
      </div>

      <StateChips items={INVEST_STATES} value={state} onChange={setState} />

      <section>
        <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
          Проекты PMI
        </h2>
        <p className="mb-1 text-[12px] text-muted-foreground">
          {INVEST_NOTE} · найдено {items.length}
        </p>
        <p className="mb-2.5 text-[12px] leading-relaxed text-muted-foreground">{INVEST_SUMMARY}</p>
        <InvestList items={items} />
      </section>
    </>
  );
}

function StateChips({
  items,
  value,
  onChange,
}: {
  items: { id: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex gap-1.5">
        {items.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onChange(s.id)}
            className={`shrink-0 rounded-full px-3 py-2 text-[13px] font-medium transition-colors ${
              value === s.id
                ? "bg-brand text-brand-foreground"
                : "bg-surface-muted text-muted-foreground"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
