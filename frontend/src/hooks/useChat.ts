import { useState, useEffect, useCallback } from 'react';
import { Message } from '../types';
import { sendChatMessage } from '../services/api';

const STORAGE_KEY = 'rag_chat_history';

export function useChat() {
    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    }, [messages]);

    const sendMessage = useCallback(async (content: string) => {
        if (!content.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content,
            timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
        setError(null);

        try {
            const response = await sendChatMessage(content);
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: response.answer,
                sources: response.sources,
                chunks: response.retrieved_chunks,
                timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const clearChat = useCallback(() => {
        setMessages([]);
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    return {
        messages,
        isLoading,
        error,
        sendMessage,
        clearChat,
    };
}
