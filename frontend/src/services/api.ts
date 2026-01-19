import { ChatResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

export async function sendChatMessage(message: string): Promise<ChatResponse> {
    const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
    });

    if (!response.ok) {
        let errorDetail = 'Failed to send message';
        try {
            const errorData = await response.json();
            errorDetail = errorData.detail || `Error ${response.status}: ${response.statusText}`;
        } catch {
            errorDetail = `Error ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorDetail);
    }

    return response.json();
}

export async function checkHealth(): Promise<boolean> {
    try {
        const response = await fetch(`${API_BASE_URL}/health`);
        return response.ok;
    } catch {
        return false;
    }
}
