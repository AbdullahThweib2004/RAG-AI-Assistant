import React from 'react';
import { Message } from '../types';
import { SourceChips } from './SourceChips';
import { RetrievedExcerpts } from './RetrievedExcerpts';
import { User, Bot } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface MessageBubbleProps {
    message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <div
            className={cn(
                'flex w-full gap-4 py-8 px-4 md:px-8 transition-colors',
                isUser ? 'bg-transparent' : 'bg-white/[0.02] border-y border-white/5'
            )}
        >
            <div className="flex-shrink-0">
                <div
                    className={cn(
                        'w-9 h-9 rounded-xl flex items-center justify-center shadow-md',
                        isUser ? 'bg-blue-600 text-white' : 'bg-zinc-800 border border-zinc-700 text-zinc-300'
                    )}
                >
                    {isUser ? <User size={20} /> : <Bot size={20} />}
                </div>
            </div>

            <div className="flex-1 space-y-3 min-w-0">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-zinc-100">
                        {isUser ? 'You' : 'AI Assistant'}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>

                <div className="text-[15px] text-zinc-200 leading-relaxed whitespace-pre-wrap break-words">
                    {message.content}
                </div>

                {!isUser && message.sources && (
                    <SourceChips sources={message.sources} />
                )}

                {!isUser && message.chunks && (
                    <RetrievedExcerpts chunks={message.chunks} />
                )}
            </div>
        </div>
    );
};
