import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ZoneChips,
  SelectRow,
} from "@/components/app/projects-blocks";
import { RegistryList, RegistrySearch } from "@/components/app/registry-list";
import {
  PROJECT_ZONES,
  REGION_OPTIONS,
  INDUSTRY_OPTIONS,
} from "@/lib/projects-data";
import { REGISTRY, REGISTRY_NOTE } from "@/lib/registry-data";

export const Route = createFileRoute("/projects/registry")({
  head: () => ({
    meta: [
      { title: "Реестр предприятий — Проекты" },
      {
        name: "description",
        content:
          "Реестр предприятий среза: зона, регион, отрасль, ограничение, занятость и объём вложений по каждой карточке.",
      },
      { property: "og:title", content: "Реестр предприятий — Проекты" },
      {
        property: "og:description",
        content:
          "Карточки предприятий с зоной, ограничением, занятостью и вложениями по выбранным фильтрам.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegistryPage,
});

function RegistryPage() {
  const [zone, setZone] = useState("all");
  const [region, setRegion] = useState(REGION_OPTIONS[0]!);
  const [industry, setIndustry] = useState(INDUSTRY_OPTIONS[0]!);
  const [query, setQuery] = useState("");

  const items = useMemo(
    () =>
      REGISTRY.filter((it) => {
        if (zone !== "all" && it.tone !== zone) return false;
        if (region !== REGION_OPTIONS[0] && it.region !== region) return false;
        if (industry !== INDUSTRY_OPTIONS[0] && it.industry !== industry) return false;
        if (query && !it.name.toLowerCase().includes(query.toLowerCase())) return false;
        return true;
      }),
    [zone, region, industry, query],
  );

  return (
    <main className="flex-1 space-y-4 overflow-y-auto px-4 pb-6">
      <ZoneChips zones={PROJECT_ZONES} selected={zone} onSelect={setZone} />

      <div className="grid grid-cols-2 gap-2">
        <SelectRow
          label="Область"
          value={region}
          options={REGION_OPTIONS}
          onChange={setRegion}
        />
        <SelectRow
          label="Отрасль"
          value={industry}
          options={INDUSTRY_OPTIONS}
          onChange={setIndustry}
        />
      </div>

      <RegistrySearch value={query} onChange={setQuery} />

      <section>
        <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
          Реестр предприятий
        </h2>
        <p className="mb-2.5 text-[12px] text-muted-foreground">
          {REGISTRY_NOTE} · найдено {items.length}
        </p>
        <RegistryList items={items} />
      </section>
    </main>
  );
}
