import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/app/app-shell";
import { SegmentedTabs } from "@/components/app/segmented-tabs";

export const Route = createFileRoute("/projects")({
  component: ProjectsLayout,
});

function ProjectsLayout() {
  return (
    <AppShell showNav hideHistory title="Проекты" subtitle="Срез: июнь 2026">
      <SegmentedTabs
        items={[
          { to: "/projects", label: "ИИ-обзор" },
          { to: "/projects/registry", label: "Реестр" },
        ]}
      />
      <Outlet />
    </AppShell>
  );
}
