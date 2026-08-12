import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Проекты — Аналитик" },
      {
        name: "description",
        content:
          "Инвестпроекты и проекты постмониторинга: освоение, сроки сдачи и проблемные позиции в мобильном виде.",
      },
      { property: "og:title", content: "Проекты — Аналитик" },
      {
        property: "og:description",
        content: "Освоение, сроки сдачи и проблемные проекты портфеля.",
      },
    ],
  }),
  component: ProjectsPage,
});

const SUMMARY = [
  { label: "Всего проектов", value: "1 817" },
  { label: "Без освоения", value: "29" },
  { label: "Срок сдачи 2026", value: "21" },
  { label: "Красная зона", value: "66" },
];

const ITEMS = [
  { title: "Проект 501 · Текстильный комплекс", note: "отставание 47 дней", tone: "red" },
  { title: "Проект 214 · Фармзавод", note: "нет финансового закрытия", tone: "red" },
  { title: "Проект 388 · Электротехника", note: "освоение 42%", tone: "yellow" },
  { title: "Проект 129 · Пищевой кластер", note: "в графике", tone: "green" },
  { title: "Проект 902 · Автокомпоненты", note: "в графике", tone: "green" },
];

const TONE: Record<string, string> = {
  red: "bg-status-red",
  yellow: "bg-status-yellow",
  green: "bg-status-green",
};

function ProjectsPage() {
  return (
    <AppShell showNav hideHistory title="Проекты" subtitle="Постмониторинг и ПМИ">
      <main className="flex-1 space-y-5 overflow-y-auto px-4 pb-6">
        <div className="grid grid-cols-2 gap-3">
          {SUMMARY.map((s) => (
            <div key={s.label} className="rounded-3xl bg-surface-muted p-3.5">
              <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
                {s.label}
              </p>
              <p className="mt-2 font-mono text-[26px] leading-none text-foreground">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <section>
          <h2 className="mb-2 text-[13px] font-semibold uppercase tracking-wide text-muted-foreground">
            Требуют внимания
          </h2>
          <ul className="space-y-2">
            {ITEMS.map((i) => (
              <li
                key={i.title}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-2xl bg-surface-muted p-3.5"
              >
                <span className={`size-2 shrink-0 rounded-full ${TONE[i.tone]}`} />
                <span className="min-w-0">
                  <span className="block truncate text-[15px] text-foreground">
                    {i.title}
                  </span>
                  <span className="block truncate text-[13px] text-muted-foreground">
                    {i.note}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </AppShell>
  );
}
