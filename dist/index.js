#!/usr/bin/env node
/**
 * DreamingAI MCP Server
 *
 * An MCP (Model Context Protocol) server that exposes the DreamingAI
 * enterprise AI assistant platform as tools for AI clients.
 *
 * Environment Variables:
 *   DREAMINGAI_BASE_URL  - DreamingAI API base URL (default: https://dreamingai.exmay.com)
 *   DREAMINGAI_API_KEY   - API authentication key
 *   DREAMINGAI_APP_ID    - Application ID (default: dreamingai)
 *
 * @see https://github.com/gitcoffee-os/dreamingai
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerChatTools } from "./tools/chat.js";
import { registerAgentTools } from "./tools/agents.js";
import { registerPromptTools } from "./tools/prompts.js";
import { registerModelTools } from "./tools/models.js";
import { registerPluginTools } from "./tools/plugins.js";
async function main() {
    const server = new McpServer({
        name: "dreamingai",
        version: "1.0.0",
        description: "MCP server for DreamingAI — Enterprise AI Assistant & Intelligent Collaboration Platform. " +
            "Manage conversations, agents, prompts, AI models, and plugins.",
    });
    // Register all tool groups
    registerChatTools(server);
    registerAgentTools(server);
    registerPromptTools(server);
    registerModelTools(server);
    registerPluginTools(server);
    // Start the server with stdio transport
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("DreamingAI MCP Server started successfully");
}
main().catch((error) => {
    console.error("Fatal error starting DreamingAI MCP Server:", error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map