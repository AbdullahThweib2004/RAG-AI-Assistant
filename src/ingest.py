import os
from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import DirectoryLoader, UnstructuredFileLoader
from langchain_community.document_loaders.word_document import Docx2txtLoader

DB_DIR = "db"
COLLECTION = "dataai"
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

DATA_DIR = "data"

def main():
    load_dotenv()

    # 1) Load many files from folder  
    docs = []

    for pattern in ["**/*.pdf", "**/*.txt", "**/*.csv"]:
        loader = DirectoryLoader(DATA_DIR, glob=pattern, loader_cls=UnstructuredFileLoader, show_progress=True)
        docs.extend(loader.load())


# this is for .docx files specifically but not good write this line in for loop because maby sive this file 3 times ممكن يسبب بطئ بالتشغيييل
        docx_loader = DirectoryLoader(DATA_DIR, glob="**/*.docx", loader_cls=Docx2txtLoader, show_progress=True)
        docs.extend(docx_loader.load())



    # 2) Normalize metadata (source_file) d = document 
    for d in docs:
        src = d.metadata.get("source", "")
        d.metadata["source_file"] = os.path.basename(src)
        d.metadata["source_path"] = src
        d.metadata["file_type"] = os.path.splitext(src)[1].lower()

    # 3) Split text into small chunks
    splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
    chunks = splitter.split_documents(docs)

    # 4)  Embeddings using an OpenRouter
    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-small",
        api_key=os.getenv("OPENROUTER_API_KEY"),
        base_url=OPENROUTER_BASE_URL,
    )

    # 5) Store in Chroma and save the document embeddings
    vectordb = Chroma(
        persist_directory=DB_DIR,
        collection_name=COLLECTION,
        embedding_function=embeddings,
    )

    vectordb.add_documents(chunks)

    print(f"✅ Ingest done. Docs={len(docs)} Chunks={len(chunks)} Stored={len(vectordb.get()['ids'])}")

if __name__ == "__main__":
    main()
