import {Tool, ToolCall} from "./types.js";

export default class LayerAPI {
    private readonly apiKey: string;
    private readonly baseUrl: string;

    constructor(apiKey: string, environment: string = "production") {
        this.apiKey = apiKey;
        if (environment === "development") {
            this.baseUrl = 'http://localhost';
        } else if (environment === "staging") {
            this.baseUrl = 'https://api.staging.buildwithlayer.com';
        } else {
            this.baseUrl = "https://api.buildwithlayer.com";
        }
    }

    public async getAllTools(): Promise<Tool[]> {
        const res = await fetch(`${this.baseUrl}/mcp/tools`, {
            method: 'GET',
            headers: new Headers({
                "Accept": "application/json",
                "Layer-Api-Key": this.apiKey,
            }),
        });
        if (res.status !== 200) {
            throw new Error(res.statusText);
        }
        const json = await res.json();
        const tools = json as Tool[];
    
        return tools;
    }
    

    public async callTool(toolCall: ToolCall, bearer: string) {
        // Parse the arguments and add bearer auth if not present
        const args = JSON.parse(toolCall.arguments);
        if (!args.auth && bearer) {
            args.auth = { bearer };
        }
        
        const callWithAuth = {
            ...toolCall,
            arguments: JSON.stringify(args)
        };
    
        return fetch(`${this.baseUrl}/mcp/tools/call`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Layer-Api-Key": this.apiKey,
            }),
            body: JSON.stringify(callWithAuth),
        })
            .then(res => {
                if (res.status < 200 || res.status > 299) {
                    return {
                        content: [
                            {
                                type: "text",
                                text: res.text(),
                            },
                        ],
                        isError: true,
                    };
                }
                return res.json();
            })
            .then(json => {
                return {
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(json),
                        },
                    ],
                    isError: false,
                };
            });
    }
}