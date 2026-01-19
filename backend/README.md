# FastAPI Backend for RAG

This is a production-quality FastAPI backend for the LangChain + Chroma RAG project.

## Project Structure
```
backend/
├── app/
│   ├── core/
│   │   ├── config.py       # Environment configuration
│   ├── services/
│   │   ├── rag.py          # LangChain + Chroma logic
│   ├── main.py             # FastAPI entry point
│   ├── schemas.py          # Pydantic models
├── .env.example            # Environment template
├── requirements.txt        # Dependencies
└── README.md               # Documentation
```

## Setup Instructions

1. **Create Virtual Environment**:
   ```powershell
   python -m venv .venv
   .\.venv\Scripts\Activate.ps1
   ```

2. **Install Dependencies**:
   ```powershell
   pip install -r requirements.txt
   ```

3. **Configure Environment**:
   Copy `.env.example` to `.env` and fill in your `OPENROUTER_API_KEY`.
   ```powershell
   copy .env.example .env
   ```

4. **Run the Server**:
   ```powershell
   uvicorn app.main:app --reload --port 8000
   ```

## API Endpoints

- **GET `/health`**: Check if the service is running.
- **POST `/chat`**: Send a message to the RAG system.
  - Request: `{ "message": "What is the capital of France?" }`
- **POST `/ingest`**: Trigger document ingestion (must be enabled in `.env`).

## Testing with Curl

### Health Check
```bash
curl http://localhost:8000/health
```

### Chat
```bash
curl -X POST http://localhost:8000/chat \
     -H "Content-Type: application/json" \
     -d '{"message": "What is the content of the documents?"}'
```
