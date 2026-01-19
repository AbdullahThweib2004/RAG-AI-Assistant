import os
from typing import List, Tuple
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage
from langchain_community.document_loaders import DirectoryLoader, UnstructuredFileLoader
from langchain_community.document_loaders.word_document import Docx2txtLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

from app.core.config import settings
from app.schemas import RetrievedChunk

class RAGService:
    def __init__(self):
        self.embeddings = OpenAIEmbeddings(
            model=settings.EMBEDDING_MODEL,
            api_key=settings.OPENROUTER_API_KEY,
            base_url=settings.OPENROUTER_BASE_URL,
        )

        self.vectordb = Chroma(
            persist_directory=settings.DB_DIR,
            collection_name=settings.COLLECTION_NAME,
            embedding_function=self.embeddings,
        )

        self.retriever = self.vectordb.as_retriever(
            search_type="mmr",
            search_kwargs={"k": 6},
        )

        self.llm = ChatOpenAI(
            model=settings.LLM_MODEL,
            api_key=settings.OPENROUTER_API_KEY,
            base_url=settings.OPENROUTER_BASE_URL,
            temperature=0,
        )

    def answer_question(self, question: str) -> Tuple[str, List[str], List[RetrievedChunk]]:
        docs = self.retriever.invoke(question)
        
        sources = sorted({d.metadata.get("source_file", d.metadata.get("source", "unknown")) for d in docs})
        
        retrieved_chunks = [
            RetrievedChunk(
                source_file=d.metadata.get("source_file", "unknown"),
                snippet=d.page_content[:300]
            ) for d in docs
        ]

        context = "\n\n".join(d.page_content for d in docs)

        msgs = [
            SystemMessage(content=(
                "First answer using ONLY the provided context.\n"
                "If the context does not explicitly contain the answer, do BOTH:\n"
                "1) Start with: 'Not found in the document.'\n"
                "2) Provide the closest relevant excerpt/idea from the provided context (paraphrase or quote short snippet), "
                "clearly labeled: 'Closest match from the documents'.\n"
                "Do not claim the document states something it doesn't.\n"
                "Then give general advice (clearly labeled: 'General advice')."
            )),
            HumanMessage(content=f"Context:\n{context}\n\nQuestion: {question}")
        ]

        ans = self.llm.invoke(msgs)
        return ans.content, list(sources), retrieved_chunks

    def ingest_documents(self):
        # 1) Load many files from folder  
        docs = []
        for pattern in ["**/*.pdf", "**/*.txt", "**/*.csv"]:
            loader = DirectoryLoader(settings.DATA_DIR, glob=pattern, loader_cls=UnstructuredFileLoader)
            docs.extend(loader.load())

        docx_loader = DirectoryLoader(settings.DATA_DIR, glob="**/*.docx", loader_cls=Docx2txtLoader)
        docs.extend(docx_loader.load())

        # 2) Normalize metadata
        for d in docs:
            src = d.metadata.get("source", "")
            d.metadata["source_file"] = os.path.basename(src)
            d.metadata["source_path"] = src
            d.metadata["file_type"] = os.path.splitext(src)[1].lower()

        # 3) Split text into small chunks
        splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
        chunks = splitter.split_documents(docs)

        # 4) Add to Chroma
        self.vectordb.add_documents(chunks)
        return len(docs), len(chunks)

# Global instance to be loaded once
rag_service = None

def get_rag_service():
    global rag_service
    if rag_service is None:
        rag_service = RAGService()
    return rag_service
