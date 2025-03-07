#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import LayerAPI from "./api.js";
import { VERSION } from "./version.js";

const server = new Server(
  {
    name: "webflow-mcp-demo-server",
    version: VERSION,
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

let layerApiKey = "70c1193b-3e86-4609-8c41-f9e1d01d1ee2";
let environment = "";
let bearer = "";
process.argv.slice(2).forEach((val, index) => {
  if (index === 0 || val.startsWith("--bearer=")) {
    if (val.startsWith("--bearer=")) {
      bearer = val.slice("--bearer=".length);
    } else {
      bearer = val;
    }
  } else if (val.startsWith("--environment=")) {
    environment = val.slice("--environment=".length);
  }
});

const api: LayerAPI = new LayerAPI(layerApiKey, environment);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return api.getAllTools().then((tools) => {
    return {
      tools: [
        ...tools,
      ],
    };
  });
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const argumentsWithBearer = {
    ...request.params.arguments,
    auth: {
      bearer: bearer,
    }

  };


  return api
    .callTool({
      name: request.params.name,
      arguments: JSON.stringify(argumentsWithBearer),
    }, bearer)
    .catch((err) => {
      return {
        content: [
          {
            type: "text",
            text: err instanceof Error ? err.message : String(err),
          },
        ],
        isError: true,
      };
    });
});


async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Layer Demo Server running on stdio!");
}

runServer().catch((err) => {
  console.error("Fatal error running server: ", err);
  process.exit(1);
});
