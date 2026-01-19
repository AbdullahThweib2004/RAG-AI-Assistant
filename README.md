# 🤖 RAG AI Assistant

Chat with your documents using AI-powered Retrieval-Augmented Generation!

## 📁 Project Structure
```
RAG/
├── data/                           # Document storage
│   ├── AI OverViews Search Playbook.pdf
│   ├── AI Search Cheat Sheet.pdf
│   ├── File_3_GEO_AIO_Checklist.docx
│   ├── File_4_Mini_Case_Studies.pdf
│  
├── db/                             # ChromaDB vector storage
├── src/
│   ├── rag.py                      # Main RAG application
│   ├── ingest.py                   # Document ingestion
│   └── config.py                   # Configuration
├── .env                            # API keys (not uploaded)
├── requirements.txt
└── README.md
```

## ✨ Features
- 📄 **Multi-document support** - Upload and query multiple PDFs
- 🧠 **Smart synthesis** - Combines information across documents
- 📊 **Comparison mode** - Compare concepts even without tables
- 🎯 **Source citations** - Know exactly where answers come from
- 💬 **Context-aware** - Understands related vs unrelated queries

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- OpenRouter API key ([Get one here](https://openrouter.ai/))

### Installation
1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/rag-ai-assistant.git
cd rag-ai-assistant
```

2. Create virtual environment:
```bash
python -m venv rag_env
rag_env\Scripts\activate  # Windows
# or
source rag_env/bin/activate  # Mac/Linux
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Set up environment variables:
```bash
# Create .env file
echo OPENROUTER_API_KEY=your_key_here > .env
```

5. Run the application:
```bash
python src/rag.py
```

## 🛠️ Tech Stack
- **LangChain** - Framework for LLM applications
- **ChromaDB** - Vector database for embeddings
- **OpenAI Embeddings** - Text embedding model
- **OpenRouter** - LLM API gateway
- **Python-dotenv** - Environment management

## 📖 Usage Examples

### Basic Query
```
User: What is SEO?
AI: [From the documents] SEO (Search Engine Optimization) focuses on...
```

### Comparison Query
```
User: Compare SEO, GEO, and AIO
AI: [Based on the documents] Here's a comparison synthesized from the available information...
```

### Unrelated Query
```
User: What's the weather?
AI: [Not found in the document] This topic is not covered in the uploaded documents.
```

## 🎯 Sample Documents Included
- AI Overviews Search Playbook
- AI Search Cheat Sheet
- GEO/AIO Checklist
- Mini Case Studies
- Formula 1 Guide

## 🤝 Contributing
Feel free to fork, open issues, or submit PRs!

## 📝 License
MIT License

## 👨‍💻 Author
[Abdallah Thuieb]
- GitHub: [AbdullahThweib2004](https://github.com/AbdullahThweib2004)

---
⭐ If you find this helpful, give it a star!