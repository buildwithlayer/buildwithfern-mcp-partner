# Layer MCP Demo

> An MCP server that uses a demo [Layer](https://buildwithlayer.com) account.

## Prerequisites

This requires you to have a valid MCP client that supports tools, as well as a demo Layer account.

## Getting Started

To use this demo server, you must first note your Layer API key. Then, you can launch the server with the following
command:

```shell
# Replace LAYER_API_KEY_HERE with your API key
npx @buildwithlayer/layer-mcp-demo LAYER_API_KEY_HERE
```

You can also add it directly to an MCP client. Here is an example of how to add it to cursor:

- Go to Cursor Settings > Features > MCP
- Click the `+ Add New MCP Server` button
- Name it whatever you like (`layer-mcp-demo` for example)
- Set the `Type` to `command`
- Set the `Command` to `npx @buildwithlayer/layer-mcp-demo LAYER_API_KEY_HERE`, replacing `LAYER_API_KEY_HERE` with your
  API key