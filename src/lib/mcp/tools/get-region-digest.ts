import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { REGIONS, getDigest } from "@/lib/dashboard-data";

export default defineTool({
  name: "get_region_digest",
  title: "Get AI digest for a region",
  description:
    "Return the demo ИИ-Дайджест for one export direction: headline, prioritised problems with suggested solutions, AI recommendations and data gaps.",
  inputSchema: {
    region_id: z
      .string()
      .describe(
        "Region id from list_export_regions, e.g. world, ru, cn, kz, tr, ae, kr.",
      ),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ region_id }) => {
    const region = REGIONS.find((r) => r.id === region_id);
    if (!region) {
      throw new ToolError(
        `Unknown region_id "${region_id}". Known ids: ${REGIONS.map((r) => r.id).join(", ")}.`,
      );
    }
    const digest = getDigest(region.id);
    const payload = { region, digest };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
