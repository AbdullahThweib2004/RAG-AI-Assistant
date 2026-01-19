from pydantic import BaseModel, Field, validator
from typing import List, Optional

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000, description="The user's question.")

class RetrievedChunk(BaseModel):
    source_file: str
    snippet: str

class ChatResponse(BaseModel):
    answer: str
    sources: List[str]
    retrieved_chunks: Optional[List[RetrievedChunk]] = None

class HealthResponse(BaseModel):
    status: str = "ok"
