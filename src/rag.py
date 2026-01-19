import os
from dotenv import load_dotenv
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

DB_DIR = "db"
OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

COLLECTION = "dataai"  


def main():
    load_dotenv()

    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-small",
        api_key=os.getenv("OPENROUTER_API_KEY"),
        base_url=OPENROUTER_BASE_URL,
    )

    vectordb = Chroma(
        persist_directory=DB_DIR,
        collection_name=COLLECTION,
        embedding_function=embeddings,
    )  # نفس persist_directory + collection_name لتحميل نفس الـ DB 



    # تأكيد أن الـ DB مش فاضية
    data = vectordb.get()
    print(f"DB count: {len(data['ids'])}")  # فحص وجود docs 





    # Retriever باستخدام MMR
    retriever = vectordb.as_retriever(
        search_type="mmr",
        search_kwargs={"k": 15},
    )  # retriever.invoke(query) يرجّع Documents 





    llm = ChatOpenAI(
        model="openai/gpt-oss-20b",
        api_key=os.getenv("OPENROUTER_API_KEY"),
        base_url=OPENROUTER_BASE_URL,
        temperature=0,
    )

    while True:
        q = input("\nASK (type exit): ").strip()
        if q.lower() == "exit":
            break

        docs = retriever.invoke(q)
        print(f"Retrieved: {len(docs)}")




        # اطبع أسماء الملفات اللي جاب منها chunks (بدون تكرار)
        sources = sorted({d.metadata.get("source_file", d.metadata.get("source", "unknown")) for d in docs})
        print("Sources:", ", ".join(sources) if sources else "None")  # metadata موجودة في Document 

        context = "\n\n".join(d.page_content for d in docs)

        msgs = [
              SystemMessage(content=
            "First answer using ONLY the provided context.\n"
            "\n"
            "If the context explicitly contains the answer:\n"
            "- Provide the answer directly from the context.\n"
            "- Label it: 'From the documents'.\n"
            "\n"
            "If the context contains relevant information that can answer the question (even if it requires combining or synthesizing information from multiple parts):\n"
            "- Synthesize the answer from the available information.\n"
            "- Label it: 'Based on the documents'.\n"
            "- Cite the specific parts used.\n"
            "\n"
            "If the question is related to the document's topic but specific details are missing:\n"
            "- Provide the closest relevant information from the context.\n"
            "- Label it: 'Closest match from the documents'.\n"
            "- Then provide general advice labeled: 'General advice'.\n"
            "\n"
            "If the question is completely unrelated to the document's content:\n"
            "- Start with: 'Not found in the document.'\n"
            "- Then provide general advice labeled: 'General advice'.\n"
            "\n"
            "Do not claim the document states something it doesn't.\n"
            "You may synthesize and compare information from different sections when the source material is present."
         ),
            HumanMessage(content=f"Context:\n{context}\n\nQuestion: {q}")
        ]

        ans = llm.invoke(msgs)
        print("\n" + ans.content)


if __name__ == "__main__":
    main()
