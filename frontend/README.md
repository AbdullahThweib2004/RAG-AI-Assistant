# RAG Chat Frontend

A modern React + Vite frontend for the LangChain + Chroma RAG project.

## Features
- 🚀 **Real-time Chat**: Interaction with the RAG backend.
- 📚 **Source Visibility**: See exactly which documents were used to generate answers.
- 🔍 **Snippet Inspection**: Expandable excerpts to see relevant context.
- 💾 **Persistence**: Conversation history is saved in your browser.
- 🎨 **Modern Design**: Clean, responsive UI built with TailwindCSS.

## Setup Instructions

1. **Install Dependencies**:
   ```powershell
   cd frontend
   npm install
   ```

2. **Configure Environment**:
   The frontend defaults to `http://127.0.0.1:8000`. To change this, create a `.env` file:
   ```env
   VITE_API_BASE_URL=http://your-backend-url:8000
   ```

3. **Run the Development Server**:
   ```powershell
   npm run dev
   ```

## Requirements
- Node.js (v18 or higher)
- TailwindCSS (handled via postcss)
- **Active Backend**: Ensure the FastAPI backend is running on port 8000.

## Troubleshooting

- **CORS Errors**: If you get CORS errors, ensure the backend's `ALLOWED_ORIGINS` includes either `*` or `http://localhost:3000` (the default Vite port in this setup).
- **Network Errors**: Double check the `VITE_API_BASE_URL` if your backend is not on localhost.
