import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { NUMBER_MARK } from "@/lib/mock-marker";
import { AppShell } from "@/components/app/app-shell";
import { KpiCard } from "@/components/app/kpi-card";
import { RegionStrip } from "@/components/app/region-strip";
import { DataGaps, DigestCard } from "@/components/app/digest-card";
import { KPIS, REGIONS, ZONES, getDigest } from "@/lib/dashboard-data";
import { resetChat, sendMessage } from "@/lib/chat-store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Главный экран — Аналитик" },
      {
        name: "description",
        content:
          "Мобильная сводка портфеля: предприятия, инвестпроекты, промзоны, экспортёры и ИИ-дайджест по выбранной географии.",
      },
      { property: "og:title", content: "Главный экран — Аналитик" },
      {
        property: "og:description",
        content: "Ключевые показатели портфеля и ИИ-дайджест с приоритетами и решениями.",
      },
    ],
  }),
  component: MainScreen,
});

function MainScreen() {
  const navigate = useNavigate();
  const [zone, setZone] = useState<string>("all");
  const [region, setRegion] = useState<string>("world");
  const digest = getDigest(region);
  const regionName = REGIONS.find((r) => r.id === region)?.name ?? "Мир";

  function ask() {
    resetChat();
    sendMessage(`Разбери ИИ-дайджест по срезу: ${regionName}. Что делать в первую очередь?`);
    navigate({ to: "/chat" });
  }

  return (
    <AppShell
      showNav
      hideHistory
      title="Главный экран"
      subtitle={`Мининвест · данные от 08.08, 12:21${NUMBER_MARK}`}
    >
      <main className="flex-1 space-y-5 overflow-y-auto px-4 pb-6">
        <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-1.5">
            {ZONES.map((z) => (
              <button
                key={z.id}
                type="button"
                onClick={() => setZone(z.id)}
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                  zone === z.id
                    ? "bg-brand text-brand-foreground"
                    : "bg-surface-muted text-muted-foreground"
                }`}
              >
                {z.label}
              </button>
            ))}
          </div>
        </div>

        <section>
          <h2 className="sr-only">Ключевые показатели</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {KPIS.map((kpi) => (
              <KpiCard key={kpi.id} kpi={kpi} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-2.5 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
            География экспорта
          </h2>
          <RegionStrip selected={region} onSelect={setRegion} />
        </section>

        <DigestCard digest={digest} onAsk={ask} />
        <DataGaps items={digest.gaps} />
      </main>
    </AppShell>
  );
}
