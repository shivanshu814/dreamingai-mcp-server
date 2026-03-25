/**
 * Agent Management Tools
 *
 * MCP tools for managing AI agents in DreamingAI.
 * Supports creating, editing, and managing multiple agents with
 * custom roles, behaviors, and collaboration capabilities.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { client } from "../client.js";

export function registerAgentTools(server: McpServer): void {
  // ── List Agents ─────────────────────────────────────────────────────
  server.tool(
    "list_agents",
    "List all available AI agents in DreamingAI",
    {
      page: z.number().optional().describe("Page number (default: 1)"),
      pageSize: z
        .number()
        .optional()
        .describe("Items per page (default: 20)"),
      keyword: z
        .string()
        .optional()
        .describe("Search keyword to filter agents"),
    },
    async ({ page, pageSize, keyword }) => {
      try {
        const params: Record<string, string> = {};
        if (page) params.page = String(page);
        if (pageSize) params.pageSize = String(pageSize);
        if (keyword) params.keyword = keyword;

        const result = await client.get("/agents", params);
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
              text: `Error listing agents: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ── Get Agent ───────────────────────────────────────────────────────
  server.tool(
    "get_agent",
    "Get details of a specific AI agent in DreamingAI",
    {
      agentId: z.string().describe("ID of the agent to retrieve"),
    },
    async ({ agentId }) => {
      try {
        const result = await client.get(`/agents/${agentId}`);
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
              text: `Error getting agent: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ── Create Agent ────────────────────────────────────────────────────
  server.tool(
    "create_agent",
    "Create a new AI agent in DreamingAI with custom role and behavior",
    {
      name: z.string().describe("Name of the agent"),
      description: z
        .string()
        .optional()
        .describe("Description of the agent's purpose"),
      systemPrompt: z
        .string()
        .optional()
        .describe("System prompt defining the agent's behavior and role"),
      modelId: z
        .string()
        .optional()
        .describe("Default model for this agent"),
      temperature: z
        .number()
        .optional()
        .describe("Temperature setting (0.0-2.0)"),
      maxTokens: z
        .number()
        .optional()
        .describe("Maximum tokens for responses"),
      capabilities: z
        .array(z.string())
        .optional()
        .describe(
          "List of capabilities to enable (e.g., 'web_search', 'code_execution')"
        ),
    },
    async ({
      name,
      description,
      systemPrompt,
      modelId,
      temperature,
      maxTokens,
      capabilities,
    }) => {
      try {
        const body: Record<string, unknown> = { name };
        if (description) body.description = description;
        if (systemPrompt) body.systemPrompt = systemPrompt;
        if (modelId) body.modelId = modelId;
        if (temperature !== undefined) body.temperature = temperature;
        if (maxTokens !== undefined) body.maxTokens = maxTokens;
        if (capabilities) body.capabilities = capabilities;

        const result = await client.post("/agents", body);
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
              text: `Error creating agent: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ── Update Agent ────────────────────────────────────────────────────
  server.tool(
    "update_agent",
    "Update an existing AI agent's configuration in DreamingAI",
    {
      agentId: z.string().describe("ID of the agent to update"),
      name: z.string().optional().describe("Updated name"),
      description: z.string().optional().describe("Updated description"),
      systemPrompt: z.string().optional().describe("Updated system prompt"),
      modelId: z.string().optional().describe("Updated default model"),
      temperature: z.number().optional().describe("Updated temperature"),
      maxTokens: z.number().optional().describe("Updated max tokens"),
      capabilities: z
        .array(z.string())
        .optional()
        .describe("Updated capabilities list"),
    },
    async ({
      agentId,
      name,
      description,
      systemPrompt,
      modelId,
      temperature,
      maxTokens,
      capabilities,
    }) => {
      try {
        const body: Record<string, unknown> = {};
        if (name) body.name = name;
        if (description) body.description = description;
        if (systemPrompt) body.systemPrompt = systemPrompt;
        if (modelId) body.modelId = modelId;
        if (temperature !== undefined) body.temperature = temperature;
        if (maxTokens !== undefined) body.maxTokens = maxTokens;
        if (capabilities) body.capabilities = capabilities;

        const result = await client.put(`/agents/${agentId}`, body);
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
              text: `Error updating agent: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ── Delete Agent ────────────────────────────────────────────────────
  server.tool(
    "delete_agent",
    "Delete an AI agent from DreamingAI",
    {
      agentId: z.string().describe("ID of the agent to delete"),
    },
    async ({ agentId }) => {
      try {
        await client.delete(`/agents/${agentId}`);
        return {
          content: [
            {
              type: "text" as const,
              text: `Agent ${agentId} deleted successfully.`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error deleting agent: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
