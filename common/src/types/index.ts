export interface ExampleType {
    id: string;
}

export interface ExplainRequest {
    text: string;
    image?: string; // Base64 encoded image or URL if applicable
    mimeType?: string;
}

export interface ExplainResponse {
    explanation: string;
    suggestions?: string[];
    error?: string;
}
