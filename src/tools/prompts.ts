/**
 * Prompt Management Tools
 *
 * MCP tools for managing prompt templates in DreamingAI.
 * Supports CRUD operations, versioning, categories, and tags.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { client } from "../client.js";

export function registerPromptTools(server: McpServer): void {
  // ── List Prompts ────────────────────────────────────────────────────
  server.tool(
    "list_prompts",
    "List all prompt templates in DreamingAI",
    {
      page: z.number().optional().describe("Page number (default: 1)"),
      pageSize: z.number().optional().describe("Items per page (default: 20)"),
      category: z.string().optional().describe("Filter by category"),
      tag: z.string().optional().describe("Filter by tag"),
      keyword: z.string().optional().describe("Search keyword"),
    },
    async ({ page, pageSize, category, tag, keyword }) => {
      try {
        const params: Record<string, string> = {};
        if (page) params.page = String(page);
        if (pageSize) params.pageSize = String(pageSize);
        if (category) params.category = category;
        if (tag) params.tag = tag;
        if (keyword) params.keyword = keyword;

        const result = await client.get("/prompts", params);
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
              text: `Error listing prompts: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ── Get Prompt ──────────────────────────────────────────────────────
  server.tool(
    "get_prompt",
    "Get details of a specific prompt template in DreamingAI",
    {
      promptId: z.string().describe("ID of the prompt to retrieve"),
    },
    async ({ promptId }) => {
      try {
        const result = await client.get(`/prompts/${promptId}`);
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
              text: `Error getting prompt: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ── Create Prompt ───────────────────────────────────────────────────
  server.tool(
    "create_prompt",
    "Create a new prompt template in DreamingAI",
    {
      title: z.string().describe("Title of the prompt template"),
      content: z.string().describe("The prompt template content"),
      description: z
        .string()
        .optional()
        .describe("Description of what the prompt does"),
      category: z.string().optional().describe("Category for the prompt"),
      tags: z
        .array(z.string())
        .optional()
        .describe("Tags for categorization"),
      variables: z
        .array(
          z.object({
            name: z.string().describe("Variable name"),
            description: z.string().optional().describe("Variable description"),
            defaultValue: z
              .string()
              .optional()
              .describe("Default value for the variable"),
          })
        )
        .optional()
        .describe("Template variables that can be filled in"),
    },
    async ({ title, content, description, category, tags, variables }) => {
      try {
        const body: Record<string, unknown> = { title, content };
        if (description) body.description = description;
        if (category) body.category = category;
        if (tags) body.tags = tags;
        if (variables) body.variables = variables;

        const result = await client.post("/prompts", body);
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
              text: `Error creating prompt: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ── Update Prompt ───────────────────────────────────────────────────
  server.tool(
    "update_prompt",
    "Update an existing prompt template in DreamingAI",
    {
      promptId: z.string().describe("ID of the prompt to update"),
      title: z.string().optional().describe("Updated title"),
      content: z.string().optional().describe("Updated prompt content"),
      description: z.string().optional().describe("Updated description"),
      category: z.string().optional().describe("Updated category"),
      tags: z.array(z.string()).optional().describe("Updated tags"),
    },
    async ({ promptId, title, content, description, category, tags }) => {
      try {
        const body: Record<string, unknown> = {};
        if (title) body.title = title;
        if (content) body.content = content;
        if (description) body.description = description;
        if (category) body.category = category;
        if (tags) body.tags = tags;

        const result = await client.put(`/prompts/${promptId}`, body);
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
              text: `Error updating prompt: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );

  // ── Delete Prompt ───────────────────────────────────────────────────
  server.tool(
    "delete_prompt",
    "Delete a prompt template from DreamingAI",
    {
      promptId: z.string().describe("ID of the prompt to delete"),
    },
    async ({ promptId }) => {
      try {
        await client.delete(`/prompts/${promptId}`);
        return {
          content: [
            {
              type: "text" as const,
              text: `Prompt ${promptId} deleted successfully.`,
            },
          ],
        };
      } catch (error) {
        return {
          content: [
            {
              type: "text" as const,
              text: `Error deleting prompt: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        };
      }
    }
  );
}
