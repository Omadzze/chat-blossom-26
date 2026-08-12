import { defineMcp } from "@lovable.dev/mcp-js";
import getDashboardKpis from "./tools/get-dashboard-kpis";
import listExportRegions from "./tools/list-export-regions";
import getRegionDigest from "./tools/get-region-digest";

export default defineMcp({
  name: "chat-companion",
  title: "Chat Companion",
  version: "0.1.0",
  instructions:
    "Read-only tools over the demo analytics data of the Аналитик mobile prototype. Use get_dashboard_kpis for portfolio KPIs, list_export_regions for export directions, and get_region_digest for the AI digest (problems, solutions, recommendations, data gaps) of one direction. All data is static demo content, not live ministry data.",
  tools: [getDashboardKpis, listExportRegions, getRegionDigest],
});
