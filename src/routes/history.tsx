import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { X, Settings } from "lucide-react";
import { AppShell } from "@/components/app/app-shell";
import { HISTORY_ITEMS, resetChat } from "@/lib/chat-store";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "История чатов — Аналитик" },
      {
        name: "description",
        content:
          "Список недавних диалогов с аналитическим помощником: портфель, проекты, регионы и отклонения.",
      },
      { property: "og:title", content: "История чатов — Аналитик" },
      {
        property: "og:description",
        content: "Недавние диалоги по портфелю, проектам и отклонениям.",
      },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const navigate = useNavigate();

  return (
    <AppShell
      hideHistory
      action={
        <button
          type="button"
          aria-label="Закрыть"
          onClick={() => navigate({ to: "/" })}
          className="grid size-10 shrink-0 place-items-center rounded-full bg-surface-muted text-foreground transition-colors hover:bg-surface-strong"
        >
          <X className="size-5" />
        </button>
      }
    >
      <div className="flex flex-1 flex-col">
        <div className="flex-1 overflow-y-auto px-2 pb-4">
          <p className="px-3 py-3 text-sm text-muted-foreground">Недавние</p>
          <ul>
            {HISTORY_ITEMS.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => {
                    resetChat();
                    navigate({ to: "/chat" });
                  }}
                  className="block w-full truncate rounded-2xl px-3 py-3.5 text-left text-[15px] text-foreground transition-colors hover:bg-surface-muted"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="sticky bottom-0 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 border-t border-border bg-background px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <div className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-avatar text-lg font-medium text-primary-foreground">
            М
          </div>
          <div className="min-w-0">
            <p className="truncate text-[15px] font-medium text-foreground">
              Мелиев Омабдек
            </p>
            <p className="text-sm text-muted-foreground">Pro</p>
          </div>
          <button
            type="button"
            aria-label="Настройки"
            className="grid size-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-muted"
          >
            <Settings className="size-5" />
          </button>
        </div>
      </div>
    </AppShell>
  );
}
