import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { History } from "lucide-react";
import { BottomNav } from "./bottom-nav";

export function AppShell({
  children,
  action,
  hideHistory = false,
  title = "Аналитик",
  subtitle,
  showNav = false,
}: {
  children: ReactNode;
  action?: ReactNode;
  hideHistory?: boolean;
  title?: string;
  subtitle?: string;
  showNav?: boolean;
}) {
  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col md:border-x md:border-border">
        <header className="sticky top-0 z-20 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-1 bg-background/90 px-2 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 backdrop-blur">
          {hideHistory ? (
            <span className="size-10" />
          ) : (
            <Link
              to="/history"
              aria-label="История чатов"
              className="grid size-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              <History className="size-5" />
            </Link>
          )}
          <div className="min-w-0">
            <h1 className="truncate text-xl font-medium tracking-tight text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="truncate text-[11px] text-muted-foreground">{subtitle}</p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-2 pr-2">{action}</div>
        </header>
        {children}
        {showNav && <BottomNav />}
      </div>
    </div>
  );
}
