export interface InputSchema {
    type: 'object';
    properties?: { [key: string]: any };
    required?: string[];
}

export interface Tool {
    name: string;
    description?: string;
    inputSchema: InputSchema;
}

export interface ToolCall {
    name: string;
    arguments: string;
}