/**
 * Plugin Management Tools
 *
 * MCP tools for managing plugins in DreamingAI.
 * Supports listing, installing, activating, deactivating, and uninstalling plugins.
 */
import { z } from "zod";
import { client } from "../client.js";
export function registerPluginTools(server) {
    // ── List Plugins ────────────────────────────────────────────────────
    server.tool("list_plugins", "List all available plugins in DreamingAI marketplace", {
        status: z
            .enum(["all", "installed", "active", "inactive"])
            .optional()
            .describe("Filter by plugin status (default: all)"),
        category: z.string().optional().describe("Filter by category"),
        keyword: z.string().optional().describe("Search keyword"),
    }, async ({ status, category, keyword }) => {
        try {
            const params = {};
            if (status)
                params.status = status;
            if (category)
                params.category = category;
            if (keyword)
                params.keyword = keyword;
            const result = await client.get("/plugins", params);
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
                        text: `Error listing plugins: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
                isError: true,
            };
        }
    });
    // ── Install Plugin ──────────────────────────────────────────────────
    server.tool("install_plugin", "Install a plugin from the DreamingAI marketplace", {
        pluginId: z.string().describe("ID of the plugin to install"),
    }, async ({ pluginId }) => {
        try {
            const result = await client.post(`/plugins/${pluginId}/install`);
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
                        text: `Error installing plugin: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
                isError: true,
            };
        }
    });
    // ── Activate Plugin ─────────────────────────────────────────────────
    server.tool("activate_plugin", "Activate an installed plugin in DreamingAI", {
        pluginId: z.string().describe("ID of the plugin to activate"),
    }, async ({ pluginId }) => {
        try {
            const result = await client.post(`/plugins/${pluginId}/activate`);
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
                        text: `Error activating plugin: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
                isError: true,
            };
        }
    });
    // ── Deactivate Plugin ───────────────────────────────────────────────
    server.tool("deactivate_plugin", "Deactivate an active plugin in DreamingAI", {
        pluginId: z.string().describe("ID of the plugin to deactivate"),
    }, async ({ pluginId }) => {
        try {
            const result = await client.post(`/plugins/${pluginId}/deactivate`);
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
                        text: `Error deactivating plugin: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
                isError: true,
            };
        }
    });
    // ── Uninstall Plugin ────────────────────────────────────────────────
    server.tool("uninstall_plugin", "Uninstall a plugin from DreamingAI", {
        pluginId: z.string().describe("ID of the plugin to uninstall"),
    }, async ({ pluginId }) => {
        try {
            await client.delete(`/plugins/${pluginId}`);
            return {
                content: [
                    {
                        type: "text",
                        text: `Plugin ${pluginId} uninstalled successfully.`,
                    },
                ],
            };
        }
        catch (error) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Error uninstalling plugin: ${error instanceof Error ? error.message : String(error)}`,
                    },
                ],
                isError: true,
            };
        }
    });
}
//# sourceMappingURL=plugins.js.map