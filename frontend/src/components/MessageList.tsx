import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import { MessageBubble } from './MessageBubble';
import { Loader2 } from 'lucide-react';

interface MessageListProps {
    messages: Message[];
    isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <div ref={scrollRef} className="flex-1 overflow-y-auto scroll-smooth">
            {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                    <div className="w-20 h-20 bg-blue-500/10 text-blue-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl border border-blue-500/20">
                        <svg
                            className="w-10 h-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-100 mb-3">Welcome to RAG Chat</h2>
                    <p className="text-zinc-500 max-w-md text-[15px] leading-relaxed">
                        Ask me anything about your documents. I'll search through the content and provide accurate answers with sources.
                    </p>
                </div>
            ) : (
                <div className="flex flex-col">
                    {messages.map((msg) => (
                        <MessageBubble key={msg.id} message={msg} />
                    ))}
                    {isLoading && (
                        <div className="flex w-full gap-4 py-8 px-4 md:px-8 bg-zinc-900/30 border-y border-zinc-800/50">
                            <div className="flex-shrink-0">
                                <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md bg-zinc-800 border border-zinc-700 text-blue-500">
                                    <Loader2 className="animate-spin" size={20} />
                                </div>
                            </div>
                            <div className="flex-1 flex items-center">
                                <span className="text-sm text-zinc-500 italic font-medium">Thinking and searching...</span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
