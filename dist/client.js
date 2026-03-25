/**
 * DreamingAI API Client
 *
 * HTTP client wrapper for communicating with the DreamingAI platform API.
 * Configured via environment variables:
 *   - DREAMINGAI_BASE_URL: API base URL (default: https://dreamingai.exmay.com)
 *   - DREAMINGAI_API_KEY: API authentication key
 *   - DREAMINGAI_APP_ID: Application ID (default: dreamingai)
 */
const DEFAULT_BASE_URL = "https://dreamingai.exmay.com";
const DEFAULT_API_PATH = "/exmay/authority/api";
const DEFAULT_APP_ID = "dreamingai";
export class DreamingAIClient {
    baseUrl;
    apiKey;
    appId;
    constructor() {
        this.baseUrl =
            (process.env.DREAMINGAI_BASE_URL || DEFAULT_BASE_URL) + DEFAULT_API_PATH;
        this.apiKey = process.env.DREAMINGAI_API_KEY || "";
        this.appId = process.env.DREAMINGAI_APP_ID || DEFAULT_APP_ID;
    }
    getHeaders() {
        const headers = {
            "Content-Type": "application/json",
            "App-Id": this.appId,
        };
        if (this.apiKey) {
            headers["Authorization"] = `Bearer ${this.apiKey}`;
        }
        return headers;
    }
    async get(endpoint, params) {
        const url = new URL(`${this.baseUrl}${endpoint}`);
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                url.searchParams.append(key, value);
            });
        }
        const response = await fetch(url.toString(), {
            method: "GET",
            headers: this.getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`DreamingAI API error: ${response.status} ${response.statusText}`);
        }
        return (await response.json());
    }
    async post(endpoint, body) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "POST",
            headers: this.getHeaders(),
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!response.ok) {
            throw new Error(`DreamingAI API error: ${response.status} ${response.statusText}`);
        }
        return (await response.json());
    }
    async put(endpoint, body) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "PUT",
            headers: this.getHeaders(),
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!response.ok) {
            throw new Error(`DreamingAI API error: ${response.status} ${response.statusText}`);
        }
        return (await response.json());
    }
    async delete(endpoint) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "DELETE",
            headers: this.getHeaders(),
        });
        if (!response.ok) {
            throw new Error(`DreamingAI API error: ${response.status} ${response.statusText}`);
        }
        return (await response.json());
    }
    /**
     * Stream a POST request (for chat completions).
     * Returns the raw Response for streaming.
     */
    async postStream(endpoint, body) {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: "POST",
            headers: {
                ...this.getHeaders(),
                Accept: "text/event-stream",
            },
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!response.ok) {
            throw new Error(`DreamingAI API error: ${response.status} ${response.statusText}`);
        }
        return response;
    }
}
// Singleton client instance
export const client = new DreamingAIClient();
//# sourceMappingURL=client.js.map