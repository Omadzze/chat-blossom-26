import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { KPIS } from "@/lib/dashboard-data";

export default defineTool({
  name: "get_dashboard_kpis",
  title: "Get dashboard KPIs",
  description:
    "Return the demo KPI cards from the Главный screen: enterprises, investment projects, industrial zones, exporters and foreign investment.",
  inputSchema: {},
  outputSchema: { kpis: z.array(z.unknown()) },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(KPIS, null, 2) }],
    structuredContent: { kpis: KPIS },
  }),
});
