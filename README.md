<div align="center">
  <img src="https://raw.githubusercontent.com/gitcoffee-os/dreamingai/main/assets/logo.svg" alt="DreamingAI Logo" width="120" stroke="white">
  <h1>DreamingAI MCP Server</h1>
  <p><b>Enterprise AI Assistant & Intelligent Collaboration Platform</b></p>
  <p>
    <a href="https://www.npmjs.com/package/dreamingai-mcp-server"><img src="https://img.shields.io/npm/v/dreamingai-mcp-server?style=flat-square" alt="npm version"></a>
    <a href="https://github.com/shivanshu814/dreamingai-mcp-server/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/dreamingai-mcp-server?style=flat-square" alt="license"></a>
    <img src="https://img.shields.io/badge/MCP-1.0.0-blue?style=flat-square" alt="MCP version">
  </p>
</div>

---

This is a [Model Context Protocol (MCP)](https://modelcontextprotocol.io) server that provides tools for interacting with the [DreamingAI](https://github.com/gitcoffee-os/dreamingai) platform. It allows AI clients (like Claude or Cursor) to manage conversations, intelligent agents, prompt templates, and plugins within your enterprise AI ecosystem.

## Features

- **Conversation Management**: Full control over chat sessions and message history.
- **Agent Lifecycle**: Create and manage AI agents with custom roles and behaviors.
- **Prompt Engineering**: CRUD support for prompt templates with variable support.
- **Multi-Model Orchestration**: List, inspect, and switch between AI models.
- **Extensible Plugins**: Management of marketplace plugins for enhanced capabilities.

## How to Use

You can easily add this MCP server to your favorite AI client. You will need your **DreamingAI API Key** and your **Base URL** (usually `https://dreamingai.exmay.com`).

### 1. In Claude Desktop

If you use Claude Desktop, follow these steps:
1. Open your Claude Desktop configuration file:
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
2. Add the following to the `mcpServers` section:

```json
{
  "mcpServers": {
    "dreamingai": {
      "command": "npx",
      "args": ["-y", "dreamingai-mcp-server"],
      "env": {
        "DREAMINGAI_API_KEY": "YOUR_ACTUAL_API_KEY_HERE",
        "DREAMINGAI_BASE_URL": "https://dreamingai.exmay.com"
      }
    }
  }
}
```

### 2. In Cursor

If you use Cursor:
1. Open **Cursor Settings** -> **Models** -> **MCP**.
2. Click **+ Add New MCP Server**.
3. Name: `DreamingAI`
4. Type: `command`
5. Command: `npx -y dreamingai-mcp-server`
6. Click **Add**.

*Note: You must have Node.js installed on your computer.*

## Configuration Details

| Variable | Description | Default |
|----------|-------------|---------|
| `DREAMINGAI_API_KEY` | **Required**. Your DreamingAI API key. | — |
| `DREAMINGAI_BASE_URL` | The URL of your DreamingAI instance. | `https://dreamingai.exmay.com` |
| `DREAMINGAI_APP_ID` | Application identifier for the client. | `dreamingai` |

## Available Tools

### Dialogue (chat)
- `list_conversations`: Retrieve all active chat sessions.
- `create_conversation`: Start a new session.
- `send_message`: Interact with the AI.
- `get_conversation_history`: Fetch past messages.
- `delete_conversation`: Delete session data.

### Agents (agents)
- `list_agents`: Search configured AI agents.
- `get_agent`: View agent details.
- `create_agent`: Define new agent personas.
- `update_agent` / `delete_agent`: Manage existing agents.

### Templates (prompts)
- `list_prompts` / `get_prompt`: Access the prompt library.
- `create_prompt`: Save new templates with variables.
- `update_prompt` / `delete_prompt`: Maintain prompt library.

### Models & Plugins
- `list_models` / `switch_model`: Manage model switching.
- `list_plugins` / `install_plugin`: Manage plugin lifecycle.
- `activate_plugin` / `deactivate_plugin`: Control plugin availability.

## Local Development

1. Clone the repository: `git clone https://github.com/shivanshu814/dreamingai-mcp-server.git`
2. Navigate to the project directory: `cd dreamingai-mcp-server`
3. Install dependencies: `npm install`
4. Build the server: `npm run build`
5. Run locally: `node dist/index.js`

## License

Apache-2.0 © [GitCoffee Team](https://github.com/gitcoffee-os).
