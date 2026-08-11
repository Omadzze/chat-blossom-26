import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { History } from "lucide-react";

export function AppShell({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-background">
      <div className="mx-auto flex min-h-dvh w-full max-w-[480px] flex-col md:border-x md:border-border">
        <header className="sticky top-0 z-20 grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-1 bg-background/90 px-2 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 backdrop-blur">
          <Link
            to="/history"
            aria-label="История чатов"
            className="grid size-10 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
          >
            <History className="size-5" />
          </Link>
          <h1 className="truncate text-xl font-medium tracking-tight text-foreground">
            Аналитик
          </h1>
          <div className="flex shrink-0 items-center gap-2 pr-2">{action}</div>
        </header>
        {children}
      </div>
    </div>
  );
}
