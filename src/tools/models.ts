/**
 * Model / Platform Management Tools
 *
 * MCP tools for managing AI model platforms and versions in DreamingAI.
 * Supports listing, querying, and switching between different AI models.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { client } from "../client.js";

export function registerModelTools(server: McpServer): void {
  // ── List Models ─────────────────────────────────────────────────────
  server.tool(
    "list_models",
    "List all available AI models and platforms in DreamingAI",
    {
      platform: z
        .string()
        .optional()
        .describe("Filter by platform (e.g., 'openai', 'anthropic')"),
    },
    async ({ platform }) => {
      try {
        const params: Record<string, string> = {};
        if (platform) params.platform = platform;

        const result = await client.get("/models", params);
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(result.data, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error listing models: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ── Get Model ───────────────────────────────────────────────────────
  server.tool(
    "get_model",
    "Get details and capabilities of a specific AI model in DreamingAI",
    {
      modelId: z.string().describe("ID of the model to retrieve"),
    },
    async ({ modelId }) => {
      try {
        const result = await client.get(`/models/${modelId}`);
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(result.data, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error getting model: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ── Switch Model ────────────────────────────────────────────────────
  server.tool(
    "switch_model",
    "Switch the active AI model for conversations in DreamingAI",
    {
      modelId: z.string().describe("ID of the model to switch to"),
      conversationId: z
        .string()
        .optional()
        .describe(
          "Conversation ID to switch model for (if not set, changes default)"
        ),
    },
    async ({ modelId, conversationId }) => {
      try {
        const body: Record<string, unknown> = { modelId };
        if (conversationId) body.conversationId = conversationId;

        const result = await client.post("/models/switch", body);
        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(result.data, null, 2),
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error switching model: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
