import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutGrid, Factory, Ship, Sparkles, Newspaper } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const TABS: { to: string; label: string; icon: LucideIcon; match: string[] }[] = [
  { to: "/", label: "Главный", icon: LayoutGrid, match: ["/"] },
  { to: "/projects", label: "Проекты", icon: Factory, match: ["/projects"] },
  { to: "/export", label: "Экспорт", icon: Ship, match: ["/export"] },
  { to: "/ai", label: "AI", icon: Sparkles, match: ["/ai", "/chat", "/history"] },
  { to: "/media", label: "Медиа", icon: Newspaper, match: ["/media"] },
];

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="sticky bottom-0 z-20 border-t border-border bg-background/95 px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur">
      <ul className="grid grid-cols-5">
        {TABS.map(({ to, label, icon: Icon, match }) => {
          const active = match.some(
            (m) => pathname === m || (m !== "/" && pathname.startsWith(`${m}/`)),
          );
          return (
            <li key={to}>
              <Link
                to={to}
                className={`flex flex-col items-center gap-1 rounded-2xl px-1 py-1.5 transition-colors ${
                  active
                    ? "bg-brand-soft text-brand"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="size-5 shrink-0" />
                <span className="max-w-full truncate text-[11px] font-medium">
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
