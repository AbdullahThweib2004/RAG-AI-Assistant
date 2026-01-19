import React, { useState } from 'react';
import { RetrievedChunk } from '../types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface RetrievedExcerptsProps {
    chunks: RetrievedChunk[];
}

export const RetrievedExcerpts: React.FC<RetrievedExcerptsProps> = ({ chunks }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!chunks || chunks.length === 0) return null;

    return (
        <div className="mt-6 border-t border-zinc-800/50 pt-3">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-500 hover:text-zinc-300 transition-colors uppercase tracking-wider pl-0.5"
            >
                {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {isOpen ? 'Hide' : 'Show'} retrieved excerpts
            </button>

            {isOpen && (
                <div className="mt-3 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
                    {chunks.map((chunk, index) => (
                        <div key={index} className="bg-zinc-900 border border-zinc-800 p-3 rounded-xl shadow-sm">
                            <p className="text-[10px] font-black text-zinc-500 mb-2 uppercase tracking-widest">{chunk.source_file}</p>
                            <p className="text-[12px] text-zinc-400 italic leading-relaxed">
                                "{chunk.snippet}"
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
