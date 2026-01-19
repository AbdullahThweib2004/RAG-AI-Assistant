import React from 'react';

interface SourceChipsProps {
    sources: string[];
}

export const SourceChips: React.FC<SourceChipsProps> = ({ sources }) => {
    if (!sources.length) return null;

    return (
        <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-[10px] font-bold text-zinc-500 w-full uppercase tracking-widest pl-0.5">Sources</span>
            {sources.map((source, index) => (
                <span
                    key={index}
                    className="px-2.5 py-1 bg-blue-900/20 text-blue-400 rounded-lg text-[11px] font-semibold border border-blue-900/30 hover:bg-blue-900/30 transition-colors"
                >
                    {source}
                </span>
            ))}
        </div>
    );
};
