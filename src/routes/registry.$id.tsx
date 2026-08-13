import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  BarChart3,
  ClipboardList,
  ExternalLink,
  MessageCircle,
  TriangleAlert,
} from "lucide-react";
import { getRegistryItem } from "@/lib/registry-data";
import { resetChat, sendMessage } from "@/lib/chat-store";
import { TYPE_TONE } from "@/components/app/registry-list";

export const Route = createFileRoute("/registry/$id")({
  loader: ({ params }) => {
    const item = getRegistryItem(params.id);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.item.name ?? "Предприятие";
    return {
      meta: [
        { title: `${name} — карточка предприятия` },
        {
          name: "description",
          content:
            "Карточка предприятия постмониторинга: статусы параметров, гипотезы причин, рекомендуемые меры, ответственность и риск-класс.",
        },
        { property: "og:title", content: `${name} — карточка предприятия` },
        {
          property: "og:description",
          content: "Статусы параметров, гипотезы причин и рекомендуемые меры по предприятию.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: RegistryDetail,
});

function RegistryDetail() {
  const { item } = Route.useLoaderData();
  const navigate = useNavigate();

  const askAi = () => {
    resetChat();
    sendMessage(
      `Разбери предприятие ${item.name} (${item.region}, ${item.industry}): почему загрузка ${item.load} и что делать в первую очередь?`,
    );
    navigate({ to: "/chat" });
  };

  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col md:border-x md:border-border">
        <header className="sticky top-0 z-20 flex items-start gap-1 bg-background/90 px-2 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 backdrop-blur">
          <Link
            to="/projects/registry"
            aria-label="Назад к реестру"
            className="grid size-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <div className="min-w-0 pt-0.5">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
              РМТ · предприятие
            </p>
            <h1 className="truncate text-xl font-medium tracking-tight text-foreground">
              {item.name}
            </h1>
          </div>
        </header>

        <main className="flex-1 space-y-4 overflow-y-auto px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))]">
          <p className="text-[12px] leading-relaxed text-muted-foreground">
            {item.form} · {item.capital} · {item.region} · {item.district} · {item.industry} · СТИР{" "}
            {item.stir}
          </p>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="flex items-center gap-1 rounded-full bg-surface-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
              <span className={`size-1.5 rounded-full ${TYPE_TONE[item.type]}`} />
              {item.type}
            </span>
            <span className="rounded-full bg-surface-muted px-2.5 py-1 font-mono text-[11px] text-status-red">
              загрузка {item.load}
            </span>
            <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[11px] text-brand">
              решение {item.decision}
            </span>
          </div>

          <Section icon={<BarChart3 className="size-4" />} title="Статусы параметров">
            <dl className="space-y-2">
              {item.params.map((p) => (
                <div key={p.label} className="grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)] gap-2">
                  <dt className="text-[13px] text-muted-foreground">{p.label}</dt>
                  <dd className="text-[13px] text-foreground">
                    <span className="font-medium">{p.value}</span>{" "}
                    <span className="text-muted-foreground">{p.note}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Section>

          <Section
            icon={<TriangleAlert className="size-4 text-status-yellow" />}
            title="Гипотезы причин"
          >
            <p className="text-[13px] leading-relaxed text-foreground">
              <span className="font-medium">Внутренние: </span>
              {item.internal}
            </p>
            <p className="mt-2.5 text-[13px] leading-relaxed text-foreground">
              <span className="font-medium">Внешние </span>
              <span className="text-muted-foreground">(Всемирный банк): </span>
              {item.external}
            </p>
          </Section>

          <Section
            icon={<ClipboardList className="size-4 text-brand" />}
            title="Рекомендуемые меры"
          >
            <ol className="space-y-2.5">
              {item.measures.map((m, i) => (
                <li key={m.horizon} className="text-[13px] leading-relaxed text-foreground">
                  <span className="font-medium">
                    {i + 1}. {m.horizon}{" "}
                  </span>
                  <span className="text-brand">({m.term})</span>: {m.text}
                </li>
              ))}
            </ol>
            <div className="mt-3 space-y-1.5 border-t border-border pt-3 text-[13px]">
              <p className="text-muted-foreground">
                Ответственность:{" "}
                <span className="font-medium text-foreground">{item.responsibility}</span>
              </p>
              <p className="text-muted-foreground">
                Риск-класс:{" "}
                <span className="rounded-full bg-status-red/10 px-2 py-0.5 text-[12px] font-semibold text-status-red">
                  {item.risk}
                </span>
              </p>
            </div>
          </Section>
        </main>

        <div className="sticky bottom-0 z-20 flex items-center gap-2 border-t border-border bg-background/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur">
          <button
            type="button"
            onClick={askAi}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-4 py-3 text-[14px] font-medium text-brand-foreground"
          >
            <MessageCircle className="size-4" />
            Спросить AI
          </button>
          <a
            href="https://miittest.pages.dev/miit/enterprises/overview"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-full bg-surface-muted px-4 py-3 text-[14px] font-medium text-foreground"
          >
            Карточка в РМТ
            <ExternalLink className="size-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl bg-surface-muted px-3.5 py-3.5">
      <h2 className="mb-2.5 flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-wide text-muted-foreground">
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}
