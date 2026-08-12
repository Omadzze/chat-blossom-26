import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BarChart3, TriangleAlert, Search, FileText } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { Composer } from "@/components/app/composer";
import { resetChat, sendMessage } from "@/lib/chat-store";

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "AI-помощник — Аналитик" },
      {
        name: "description",
        content:
          "Спросите о портфеле, проекте или отклонении: агент читает PMI и PMT, считает по словарю метрик и называет источник каждой цифры.",
      },
      { property: "og:title", content: "AI-помощник — Аналитик" },
      {
        property: "og:description",
        content:
          "Ответы по проектам, предприятиям и региональным срезам со ссылкой на источник данных.",
      },
    ],
  }),
  component: WelcomePage,
});

const SUGGESTIONS: { title: string; icon: LucideIcon }[] = [
  { title: "Сводка по портфелю с графиками", icon: BarChart3 },
  { title: "Разобрать проблемные проекты", icon: TriangleAlert },
  { title: "Найти повторяющиеся проблемы региона", icon: Search },
  { title: "Почему проект 501 отстаёт", icon: FileText },
];

function WelcomePage() {
  const navigate = useNavigate();

  function start(text: string) {
    resetChat();
    sendMessage(text);
    navigate({ to: "/chat" });
  }

  return (
    <AppShell showNav>
      <main className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-center overflow-y-auto px-4 py-8">
          <h2 className="bg-gradient-greeting bg-clip-text text-4xl font-normal tracking-tight text-transparent sm:text-5xl">
            Здравствуйте
          </h2>
          <p className="mt-4 max-w-prose text-[17px] leading-[1.6] text-foreground">
            Спросите о портфеле, проекте или отклонении. Агент читает PMI и PMT,
            считает по словарю метрик и называет источник каждой цифры.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {SUGGESTIONS.map(({ title, icon: Icon }) => (
              <button
                key={title}
                type="button"
                onClick={() => start(title)}
                className="flex min-h-[5.5rem] flex-col justify-between rounded-2xl bg-surface-muted p-3 text-left transition-colors hover:bg-surface-strong"
              >
                <span className="text-[13px] leading-snug text-foreground">
                  {title}
                </span>
                <span className="mt-2 grid size-7 shrink-0 place-items-center self-end rounded-full bg-background text-muted-foreground">
                  <Icon className="size-3.5" />
                </span>
              </button>
            ))}
          </div>
        </div>

        <Composer onSend={start} />
      </main>
    </AppShell>
  );
}
