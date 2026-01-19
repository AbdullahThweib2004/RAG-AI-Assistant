from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.schemas import ChatRequest, ChatResponse, HealthResponse
from app.services.rag import get_rag_service
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="RAG API", version="1.0.0")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", response_model=HealthResponse)
async def health_check():
    return HealthResponse(status="ok")

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        rag = get_rag_service()
        answer, sources, retrieved_chunks = rag.answer_question(request.message)
        return ChatResponse(
            answer=answer,
            sources=sources,
            retrieved_chunks=retrieved_chunks
        )
    except Exception as e:
        logger.error(f"Error in chat endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@app.post("/ingest")
async def ingest():
    if not settings.ENABLE_INGEST_ENDPOINT:
        raise HTTPException(status_code=403, detail="Ingest endpoint is disabled.")
    
    try:
        rag = get_rag_service()
        num_docs, num_chunks = rag.ingest_documents()
        return {"status": "success", "docs_loaded": num_docs, "chunks_created": num_chunks}
    except Exception as e:
        logger.error(f"Error in ingest endpoint: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Ingestion failed: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
