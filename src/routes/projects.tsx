import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import {
  ZoneChips,
  SelectRow,
  MetricTile,
  Bar,
  CollapsibleText,
  ReasonDonut,
  MeasureList,
  MarketList,
  InvestmentList,
} from "@/components/app/projects-blocks";
import {
  PROJECT_ZONES,
  REGION_OPTIONS,
  INDUSTRY_OPTIONS,
  SLICE,
  REASONS,
  MEASURES,
  BACKGROUND,
  MARKET,
  INVESTMENTS,
  INVESTMENTS_NOTE,
} from "@/lib/projects-data";
import { resetChat, sendMessage } from "@/lib/chat-store";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Проекты — ИИ-обзор простоя мощностей" },
      {
        name: "description",
        content:
          "Мобильный ИИ-обзор среза предприятий: простой мощностей, причины, проект решений, внешний фон и крупнейшие вложения.",
      },
      { property: "og:title", content: "Проекты — ИИ-обзор простоя мощностей" },
      {
        property: "og:description",
        content:
          "169 предприятий в простое: причины, меры по адресатам и крупнейшие вложения среза.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const navigate = useNavigate();
  const [zone, setZone] = useState("red");
  const [region, setRegion] = useState(REGION_OPTIONS[0]!);
  const [industry, setIndustry] = useState(INDUSTRY_OPTIONS[0]!);
  const zoneLabel = PROJECT_ZONES.find((z) => z.id === zone)?.label ?? "Все";

  function ask() {
    resetChat();
    sendMessage(
      `Разбери срез «${zoneLabel}» по простою мощностей (область: ${region}, отрасль: ${industry}). Что делать в первую очередь?`,
    );
    navigate({ to: "/chat" });
  }

  return (
    <AppShell showNav hideHistory title="Проекты" subtitle="ИИ-обзор · срез июнь 2026">
      <main className="flex-1 space-y-5 overflow-y-auto px-4 pb-6">
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

        <section>
          <h2 className="text-[19px] font-medium leading-snug tracking-tight text-foreground">
            {SLICE.title}
          </h2>
          <p className="mt-1 text-[12px] text-muted-foreground">{SLICE.subtitle}</p>
        </section>

        <section className="rounded-3xl bg-surface-muted p-4">
          <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Предприятия с остановленным производством
          </p>
          <p className="mt-2 flex items-end gap-2">
            <span className="font-mono text-[38px] leading-none text-status-red">
              {SLICE.headline.value}
            </span>
            <span className="pb-1 text-[13px] text-muted-foreground">
              {SLICE.headline.of}
            </span>
          </p>
          <Bar percent={SLICE.headline.percent} tone="red" />
          <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
            {SLICE.headline.note}
          </p>
          <p className="mt-1 text-[12px] text-muted-foreground">{SLICE.status}</p>
        </section>

        <section className="grid grid-cols-3 gap-2">
          {SLICE.tiles.map((t) => (
            <MetricTile key={t.label} {...t} />
          ))}
        </section>

        <section className="rounded-[28px] bg-brand-soft p-3">
          <h3 className="flex items-center gap-1.5 px-1 text-[12px] font-semibold uppercase tracking-wide text-brand">
            <Sparkles className="size-4" />
            Ключевой вывод
          </h3>
          <div className="mt-2.5 rounded-2xl bg-background p-3.5">
            <p className="text-[11px] font-medium text-advice-foreground">
              {SLICE.collected}
            </p>
            <CollapsibleText text={SLICE.conclusion} />
          </div>
          <button
            type="button"
            onClick={ask}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-3 text-[14px] font-medium text-brand-foreground transition-opacity hover:opacity-90"
          >
            <Sparkles className="size-4" />
            Спросить ИИ по этому срезу
          </button>
        </section>

        <section>
          <h2 className="mb-2.5 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
            Структура причин простоя
          </h2>
          <ReasonDonut items={REASONS} />
        </section>

        <section>
          <h2 className="mb-2.5 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
            Проект решений
          </h2>
          <MeasureList items={MEASURES} />
        </section>

        <section>
          <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
            Внешние экономические условия
          </h2>
          <p className="mb-2.5 text-[12px] text-muted-foreground">{BACKGROUND.note}</p>
          <div className="grid grid-cols-3 gap-2">
            {BACKGROUND.items.map((b) => (
              <div key={b.label} className="rounded-2xl bg-surface-muted p-3">
                <p className="font-mono text-[20px] leading-none text-status-green">
                  {b.value}
                </p>
                <p className="mt-1.5 text-[11px] leading-tight text-foreground">
                  {b.label}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">{b.prev}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-2.5 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
            Мировой рынок
          </h2>
          <MarketList items={MARKET} />
        </section>

        <section>
          <h2 className="mb-1 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
            Распределение вложений по предприятиям
          </h2>
          <p className="mb-2.5 text-[12px] text-muted-foreground">{INVESTMENTS_NOTE}</p>
          <InvestmentList items={INVESTMENTS} />
        </section>
      </main>
    </AppShell>
  );
}
