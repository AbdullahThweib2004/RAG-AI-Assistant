import React from 'react';
import { MessageList } from './MessageList';
import { Composer } from './Composer';
import { useChat } from '../hooks/useChat';
import { Trash2, AlertCircle } from 'lucide-react';

export const ChatWindow: React.FC = () => {
    const { messages, isLoading, error, sendMessage, clearChat } = useChat();

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] md:h-[calc(100vh-2rem)] w-full max-w-5xl bg-zinc-900/40 backdrop-blur-xl rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden m-4 transition-all duration-500">
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02] backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/20">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-zinc-100 leading-tight">RAG AI Assistant</h1>
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            <p className="text-xs text-green-500/80 font-medium">Online & Ready</p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={clearChat}
                    disabled={messages.length === 0}
                    className="p-2 text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                    title="Clear Conversation"
                >
                    <Trash2 size={20} />
                </button>
            </div>

            {/* Error Bar */}
            {error && (
                <div className="px-6 py-3 bg-red-900/20 border-b border-red-900/30 flex items-center gap-3 text-red-400 animate-in fade-in slide-in-from-top-4 duration-300">
                    <AlertCircle size={18} />
                    <span className="text-sm font-medium">{error}</span>
                </div>
            )}

            {/* Chat Area */}
            <MessageList messages={messages} isLoading={isLoading} />

            {/* Input Area */}
            <Composer onSend={sendMessage} isLoading={isLoading} />
        </div>
    );
};
