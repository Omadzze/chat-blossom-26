import { createFileRoute } from "@tanstack/react-router";
import { TrendingDown, TrendingUp } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { REGIONS } from "@/lib/dashboard-data";

export const Route = createFileRoute("/export")({
  head: () => ({
    meta: [
      { title: "Экспорт — Аналитик" },
      {
        name: "description",
        content:
          "Экспортёры и направления поставок: объёмы, динамика по странам и зоны риска в мобильном виде.",
      },
      { property: "og:title", content: "Экспорт — Аналитик" },
      {
        property: "og:description",
        content: "Объёмы, динамика по странам и зоны риска экспортёров.",
      },
    ],
  }),
  component: ExportPage,
});

function ExportPage() {
  return (
    <AppShell showNav hideHistory title="Экспорт" subtitle="5 794 экспортёра">
      <main className="flex-1 space-y-5 overflow-y-auto px-4 pb-6">
        <div className="rounded-3xl bg-brand-soft p-4">
          <p className="text-[11px] uppercase tracking-wide text-brand">
            Экспорт всего
          </p>
          <p className="mt-2 font-mono text-[34px] leading-none text-foreground">
            $8,39 млрд
          </p>
          <p className="mt-2 flex items-center gap-1 text-[13px] text-status-red">
            <TrendingDown className="size-4" /> −4,1% к прошлому году
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-3xl bg-surface-muted p-3.5">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Держат темп
            </p>
            <p className="mt-2 font-mono text-[26px] leading-none text-foreground">
              1 758
            </p>
          </div>
          <div className="rounded-3xl bg-surface-muted p-3.5">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Красная зона
            </p>
            <p className="mt-2 font-mono text-[26px] leading-none text-status-red">
              1 204
            </p>
          </div>
        </div>

        <section>
          <h2 className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
            Направления
          </h2>
          <ul className="space-y-2">
            {REGIONS.filter((r) => r.id !== "world").map((r) => {
              const up = r.delta >= 0;
              return (
                <li
                  key={r.id}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-surface-muted p-3.5"
                >
                  <span className="min-w-0 truncate text-[15px] text-foreground">
                    {r.name}
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    <span className="font-mono text-[14px] text-foreground">
                      {r.export}
                    </span>
                    <span
                      className={`flex items-center gap-1 text-[13px] ${up ? "text-status-green" : "text-status-red"}`}
                    >
                      {up ? (
                        <TrendingUp className="size-3.5" />
                      ) : (
                        <TrendingDown className="size-3.5" />
                      )}
                      {up ? "+" : ""}
                      {r.delta.toFixed(1)}%
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </AppShell>
  );
}
