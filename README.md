# Webflow MCP Demo

> An MCP server that uses a demo [Layer](https://buildwithlayer.com) account.

## Prerequisites

This requires you to have a valid MCP client that supports tools, as well as a demo Layer account.

## Getting Started

To use this demo server, you must first grab a Webflow api key which you can do [here](https://help.webflow.com/hc/en-us/articles/33961356296723-Intro-to-Webflow-s-APIs) . Then, you can launch the server with the following
command:

```shell
# Replace WEBFLOW_API_KEY with your API key
npx @buildwithlayer/fern-webflow-mcp-demo@0.0.1 --bearer={WEBFLOW_API_KEY}
```

You can also add it directly to an MCP client. Here is an example of how to add it to cursor:

- Go to Cursor Settings > Features > MCP
- Click the `+ Add New MCP Server` button
- Name it whatever you like (`layer-mcp-demo` for example)
- Set the `Type` to `command`
- Set the `Command` to `npx @buildwithlayer/fern-webflow-mcp-demo@0.0.1 