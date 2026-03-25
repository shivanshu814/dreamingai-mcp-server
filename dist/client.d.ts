/**
 * DreamingAI API Client
 *
 * HTTP client wrapper for communicating with the DreamingAI platform API.
 * Configured via environment variables:
 *   - DREAMINGAI_BASE_URL: API base URL (default: https://dreamingai.exmay.com)
 *   - DREAMINGAI_API_KEY: API authentication key
 *   - DREAMINGAI_APP_ID: Application ID (default: dreamingai)
 */
export interface ApiResponse<T = unknown> {
    code: number;
    message: string;
    data: T;
}
export declare class DreamingAIClient {
    private baseUrl;
    private apiKey;
    private appId;
    constructor();
    private getHeaders;
    get<T = unknown>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>>;
    post<T = unknown>(endpoint: string, body?: unknown): Promise<ApiResponse<T>>;
    put<T = unknown>(endpoint: string, body?: unknown): Promise<ApiResponse<T>>;
    delete<T = unknown>(endpoint: string): Promise<ApiResponse<T>>;
    /**
     * Stream a POST request (for chat completions).
     * Returns the raw Response for streaming.
     */
    postStream(endpoint: string, body?: unknown): Promise<Response>;
}
export declare const client: DreamingAIClient;
//# sourceMappingURL=client.d.ts.map