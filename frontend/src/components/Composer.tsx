import React, { useState, useRef, useEffect } from 'react';
import { Send, CornerDownLeft } from 'lucide-react';

interface ComposerProps {
    onSend: (message: string) => void;
    isLoading: boolean;
}

export const Composer: React.FC<ComposerProps> = ({ onSend, isLoading }) => {
    const [text, setText] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleSend = () => {
        if (text.trim() && !isLoading) {
            onSend(text.trim());
            setText('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [text]);

    return (
        <div className="p-4 md:p-6 border-t border-white/5 bg-white/[0.01]">
            <div className="max-w-4xl mx-auto relative group">
                <textarea
                    ref={textareaRef}
                    rows={1}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask a question about your documents..."
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-4 pr-12 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:border-transparent transition-all resize-none max-h-48 overflow-y-auto"
                    disabled={isLoading}
                />
                <button
                    onClick={handleSend}
                    disabled={!text.trim() || isLoading}
                    className="absolute right-2 bottom-3 p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 transition-all shadow-lg active:scale-95"
                >
                    {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <Send size={18} />
                    )}
                </button>
                <div className="hidden md:flex items-center gap-1 mt-2 text-[10px] text-zinc-500 px-1 opacity-0 group-focus-within:opacity-100 transition-opacity">
                    <CornerDownLeft size={10} />
                    <span>Press Enter to send, Shift + Enter for new line</span>
                </div>
            </div>
        </div>
    );
};
