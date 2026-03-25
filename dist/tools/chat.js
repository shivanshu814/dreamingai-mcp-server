/**
 * Chat / Conversation Tools
 *
 * MCP tools for interacting with DreamingAI's intelligent dialogue system.
 */
import { z } from "zod";
import { client } from "../client.js";
export function registerChatTools(server) {
    // ── List Conversations ──────────────────────────────────────────────
    server.tool("list_conversations", "List all chat conversations/sessions in DreamingAI", {
        page: z
            .number()
            .optional()
            .describe("Page number for pagination (default: 1)"),
        pageSize: z
            .number()
            .optional()
            .describe("Number of items per page (default: 20)"),
    }, async ({ page, pageSize }) => {
        try {
            const params = {};
            if (page)
                params.page = String(page);
            if (pageSize)
                params.pageSize = String(pageSize);
            const result = await client.get("/chat/conversations", params);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(result.data, null, 2),
                    },
                ],
            };
        }
        catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error listing conversations: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
                isError: true,
            };
        }
    });
    // ── Create Conversation ─────────────────────────────────────────────
    server.tool("create_conversation", "Create a new chat conversation/session in DreamingAI", {
        title: z
            .string()
            .optional()
            .describe("Title for the new conversation"),
        modelId: z
            .string()
            .optional()
            .describe("ID of the AI model to use for this conversation"),
        agentId: z
            .string()
            .optional()
            .describe("ID of the agent to use for this conversation"),
    }, async ({ title, modelId, agentId }) => {
        try {
            const body = {};
            if (title)
                body.title = title;
            if (modelId)
                body.modelId = modelId;
            if (agentId)
                body.agentId = agentId;
            const result = await client.post("/chat/conversations", body);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(result.data, null, 2),
                    },
                ],
            };
        }
        catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error creating conversation: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
                isError: true,
            };
        }
    });
    // ── Delete Conversation ─────────────────────────────────────────────
    server.tool("delete_conversation", "Delete a chat conversation/session from DreamingAI", {
        conversationId: z
            .string()
            .describe("ID of the conversation to delete"),
    }, async ({ conversationId }) => {
        try {
            const result = await client.delete(`/chat/conversations/${conversationId}`);
            return {
                content: [
                    {
                        type: "text",
                        text: `Conversation ${conversationId} deleted successfully.`,
                    },
                ],
            };
        }
        catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error deleting conversation: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
                isError: true,
            };
        }
    });
    // ── Get Conversation History ────────────────────────────────────────
    server.tool("get_conversation_history", "Get the message history for a specific conversation in DreamingAI", {
        conversationId: z
            .string()
            .describe("ID of the conversation to get history for"),
        page: z.number().optional().describe("Page number (default: 1)"),
        pageSize: z
            .number()
            .optional()
            .describe("Number of messages per page (default: 50)"),
    }, async ({ conversationId, page, pageSize }) => {
        try {
            const params = {};
            if (page)
                params.page = String(page);
            if (pageSize)
                params.pageSize = String(pageSize);
            const result = await client.get(`/chat/conversations/${conversationId}/messages`, params);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(result.data, null, 2),
                    },
                ],
            };
        }
        catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error getting conversation history: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
                isError: true,
            };
        }
    });
    // ── Send Message ────────────────────────────────────────────────────
    server.tool("send_message", "Send a message to a DreamingAI conversation and get an AI response", {
        conversationId: z
            .string()
            .describe("ID of the conversation to send the message to"),
        message: z.string().describe("The message content to send"),
        modelId: z
            .string()
            .optional()
            .describe("Override model for this specific message"),
    }, async ({ conversationId, message, modelId }) => {
        try {
            const body = {
                content: message,
            };
            if (modelId)
                body.modelId = modelId;
            const result = await client.post(`/chat/conversations/${conversationId}/messages`, body);
            return {
                content: [
                    {
                        type: "text",
                        text: JSON.stringify(result.data, null, 2),
                    },
                ],
            };
        }
        catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error sending message: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
                isError: true,
            };
        }
    });
}
//# sourceMappingURL=chat.js.map