import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  BarChart3,
  CircleHelp,
  ClipboardList,
  Clock,
  ExternalLink,
  MessageCircle,
  Target,
  TriangleAlert,
} from "lucide-react";
import { getPmpItem } from "@/lib/pmp-data";
import { resetChat, sendMessage } from "@/lib/chat-store";

export const Route = createFileRoute("/pmp/$id")({
  loader: ({ params }) => {
    const item = getPmpItem(params.id);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.item.title ?? "Проект постмониторинга";
    return {
      meta: [
        { title: `${name} — карточка проекта` },
        {
          name: "description",
          content:
            "Карточка проекта постмониторинга: статусы параметров, обещания ПМИ, гипотезы причин и рекомендуемые меры.",
        },
        { property: "og:title", content: `${name} — карточка проекта` },
        {
          property: "og:description",
          content:
            "Статусы параметров, обещания ПМИ, гипотезы причин и рекомендуемые меры по проекту постмониторинга.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: PmpDetail,
});

function PmpDetail() {
  const { item } = Route.useLoaderData();
  const navigate = useNavigate();

  const askAi = () => {
    resetChat();
    sendMessage(
      `Разбери проект «${item.title}» (${item.region}, ${item.industry}, стоимость ${item.cost} млн $, освоение ${item.share ?? "не заведено"}): что не сходится и что делать в первую очередь?`,
    );
    navigate({ to: "/chat" });
  };

  const meta = [item.region, item.industry, item.executor, `СТИР ${item.stir}`].join(" · ");

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
              ПМИ · постмониторинг
            </p>
            <h1 className="text-[17px] font-medium leading-snug tracking-tight text-foreground">
              {item.title}
            </h1>
          </div>
        </header>

        <main className="flex-1 space-y-4 overflow-y-auto px-4 pb-[calc(5.5rem+env(safe-area-inset-bottom))]">
          <p className="text-[12px] leading-relaxed text-muted-foreground">{item.name}</p>
          <p className="text-[12px] leading-relaxed text-muted-foreground">{meta}</p>

          <div className="grid grid-cols-3 gap-2">
            <Head value={item.term} note={item.years} />
            <Head value={`${item.cost}`} note="стоимость, млн $" />
            <Head value={item.share ?? "—"} note="освоение" />
          </div>

          <p
            className={`flex items-start gap-2 rounded-2xl px-3.5 py-3 text-[13px] font-medium text-foreground ${
              item.state === "works" ? "bg-status-green/10" : "bg-status-yellow/10"
            }`}
          >
            <TriangleAlert
              className={`mt-0.5 size-4 shrink-0 ${
                item.state === "works" ? "text-status-green" : "text-status-yellow"
              }`}
            />
            {item.headline}
          </p>

          <Section icon={<BarChart3 className="size-4" />} title="Статусы параметров">
            <dl className="space-y-2">
              {item.params.map((p) => (
                <div key={p.label} className="grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)] gap-2">
                  <dt className="text-[13px] text-muted-foreground">{p.label}</dt>
                  <dd
                    className={`text-[13px] font-medium ${
                      p.accent === "green"
                        ? "text-status-green"
                        : p.accent === "red"
                          ? "text-status-red"
                          : "text-foreground"
                    }`}
                  >
                    {p.value}
                  </dd>
                </div>
              ))}
            </dl>
            {item.missing && (
              <p className="mt-2.5 text-[12px] leading-relaxed text-muted-foreground">
                Не заведено в источнике: {item.missing}
              </p>
            )}
          </Section>

          <Section icon={<Target className="size-4 text-brand" />} title="Обещания по проекту">
            <dl className="space-y-2">
              {item.promised.map((p) => (
                <div key={p.label} className="grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)] gap-2">
                  <dt className="text-[13px] text-muted-foreground">{p.label}</dt>
                  <dd className="text-[13px] font-medium text-foreground">{p.value}</dd>
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
                  <span className="text-brand">({m.term})</span>: {m.text}{" "}
                  <span className="text-muted-foreground">— {m.owner}</span>
                </li>
              ))}
            </ol>
            <p className="mt-3 flex items-center gap-1.5 border-t border-border pt-3 text-[12px] text-muted-foreground">
              <Clock className="size-3.5" />
              {item.updated}
            </p>
          </Section>

          <Section
            icon={<CircleHelp className="size-4 text-muted-foreground" />}
            title="Чего не хватило для оценки"
          >
            <ul className="space-y-2">
              {item.gaps.map((g) => (
                <li key={g} className="text-[13px] leading-relaxed text-muted-foreground">
                  {g}
                </li>
              ))}
            </ul>
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

function Head({ value, note }: { value: string; note: string }) {
  return (
    <div className="rounded-2xl bg-surface-muted p-3">
      <p className="font-mono text-[18px] leading-none text-foreground">{value}</p>
      <p className="mt-1.5 text-[11px] leading-tight text-muted-foreground">{note}</p>
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
