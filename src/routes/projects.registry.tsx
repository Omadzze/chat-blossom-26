import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SelectRow } from "@/components/app/projects-blocks";
import { RegistryList, RegistrySearch } from "@/components/app/registry-list";
import {
  REGISTRY,
  REGISTRY_INDUSTRIES,
  REGISTRY_NOTE,
  REGISTRY_REGIONS,
  REGISTRY_STATES,
} from "@/lib/registry-data";

export const Route = createFileRoute("/projects/registry")({
  head: () => ({
    meta: [
      { title: "Реестр предприятий — Проекты" },
      {
        name: "description",
        content:
          "Реестр предприятий постмониторинга: проблема, тип ограничения, загрузка и статус решения по каждому предприятию.",
      },
      { property: "og:title", content: "Реестр предприятий — Проекты" },
      {
        property: "og:description",
        content: "Предприятия постмониторинга с типом ограничения, загрузкой и статусом решения.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegistryPage,
});

function RegistryPage() {
  const [state, setState] = useState("idle");
  const [region, setRegion] = useState(REGISTRY_REGIONS[0]!);
  const [industry, setIndustry] = useState(REGISTRY_INDUSTRIES[0]!);
  const [query, setQuery] = useState("");

  const items = useMemo(
    () =>
      REGISTRY.filter((it) => {
        const load = parseFloat(it.load) || 0;
        if (state === "idle" && load > 20) return false;
        if (state === "stopped" && load > 0) return false;
        if (state === "problem" && it.tone === "green") return false;
        if (region !== REGISTRY_REGIONS[0] && it.region !== region) return false;
        if (industry !== REGISTRY_INDUSTRIES[0] && it.industry !== industry) return false;
        if (query) {
          const q = query.toLowerCase();
          if (!it.name.toLowerCase().includes(q) && !it.stir.includes(q)) return false;
        }
        return true;
      }),
    [state, region, industry, query],
  );

  return (
    <main className="flex-1 space-y-3 overflow-y-auto px-4 pb-6">
      <RegistrySearch value={query} onChange={setQuery} />

      <div className="grid grid-cols-2 gap-2">
        <SelectRow
          label="Область"
          value={region}
          options={REGISTRY_REGIONS}
          onChange={setRegion}
        />
        <SelectRow
          label="Отрасль"
          value={industry}
          options={REGISTRY_INDUSTRIES}
          onChange={setIndustry}
        />
      </div>

      <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex gap-1.5">
          {REGISTRY_STATES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setState(s.id)}
              className={`shrink-0 rounded-full px-3 py-2 text-[13px] font-medium transition-colors ${
                state === s.id
                  ? "bg-brand text-brand-foreground"
                  : "bg-surface-muted text-muted-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <section>
        <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
          Требуют решения
        </h2>
        <p className="mb-2.5 text-[12px] text-muted-foreground">
          {REGISTRY_NOTE} · найдено {items.length}
        </p>
        <RegistryList items={items} />
      </section>
    </main>
  );
}
