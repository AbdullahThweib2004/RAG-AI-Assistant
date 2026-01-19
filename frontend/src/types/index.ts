export interface RetrievedChunk {
    source_file: str;
    snippet: str;
}

export interface ChatResponse {
    answer: string;
    sources: string[];
    retrieved_chunks?: RetrievedChunk[];
}

export interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    sources?: string[];
    chunks?: RetrievedChunk[];
    timestamp: number;
}
