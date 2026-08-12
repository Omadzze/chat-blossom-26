import { defineTool } from "@lovable.dev/mcp-js";
import { REGIONS } from "@/lib/dashboard-data";

export default defineTool({
  name: "list_export_regions",
  title: "List export directions",
  description:
    "Return the demo export directions (world plus countries) with export volume and year-over-year change.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(REGIONS, null, 2) }],
    structuredContent: { regions: REGIONS },
  }),
});
