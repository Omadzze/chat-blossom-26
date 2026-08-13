import { Link, useRouterState } from "@tanstack/react-router";

export function SegmentedTabs({
  items,
}: {
  items: { to: string; label: string }[];
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="sticky top-[64px] z-10 bg-background/90 px-4 pb-3 backdrop-blur">
      <div
        className="grid gap-1 rounded-full bg-surface-muted p-1"
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        {items.map((it) => {
          const active = pathname === it.to;
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`rounded-full px-3 py-2 text-center text-[13px] font-medium transition-colors ${
                active
                  ? "bg-background text-brand shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              {it.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
