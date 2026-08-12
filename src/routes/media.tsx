import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";

export const Route = createFileRoute("/media")({
  head: () => ({
    meta: [
      { title: "Медиа — Аналитик" },
      {
        name: "description",
        content:
          "Новости и публикации по инвестициям, промышленности и торговле — короткая лента для мобильного приложения.",
      },
      { property: "og:title", content: "Медиа — Аналитик" },
      {
        property: "og:description",
        content: "Короткая новостная лента по инвестициям, промышленности и торговле.",
      },
    ],
  }),
  component: MediaPage,
});

const NEWS = [
  {
    title: "Цены на нефть выросли на фоне неопределённости по сделке США и Ирана",
    source: "Reuters Business",
    time: "16 ч назад",
  },
  {
    title:
      "Приток инвестиций в развивающиеся рынки может укрепить местную валюту и снизить волатильность",
    source: "Bloomberg",
    time: "18 ч назад",
  },
  {
    title: "Мировые цены на хлопок продолжают снижаться: прогноз $1,65/кг",
    source: "World Bank CMO",
    time: "1 д назад",
  },
  {
    title: "Турция расширяет квоты на импорт текстильной пряжи",
    source: "ITMF",
    time: "2 д назад",
  },
  {
    title: "Спрос на локализованные автокомпоненты в регионе вырос на 12%",
    source: "IHS Markit",
    time: "3 д назад",
  },
];

function MediaPage() {
  return (
    <AppShell showNav hideHistory title="Медиа" subtitle="Новости и публикации">
      <main className="flex-1 overflow-y-auto px-4 pb-6">
        <ul className="space-y-2">
          {NEWS.map((n) => (
            <li key={n.title} className="rounded-3xl bg-surface-muted p-3.5">
              <p className="text-[15px] leading-snug text-foreground">{n.title}</p>
              <p className="mt-2 flex items-center gap-2 text-[12px] text-muted-foreground">
                <span className="truncate">{n.source}</span>
                <span className="size-1 shrink-0 rounded-full bg-border" />
                <span className="shrink-0">{n.time}</span>
              </p>
            </li>
          ))}
        </ul>
      </main>
    </AppShell>
  );
}
