from langchain_huggingface import HuggingFaceEndpoint
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings
from langchain.chains import LLMChain
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain.vectorstores import Chroma
from langchain_openai import ChatOpenAI
from typing import List
from langchain_core.documents import Document
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
import os
from langchain.retrievers.document_compressors import LLMChainFilter
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import LLMChainExtractor


dotenv_path = '../.env'
load_dotenv(dotenv_path)
HUGGINGFACEHUB_API_TOKEN = os.getenv("HF_TOKEN")
os.environ["HUGGINGFACEHUB_API_TOKEN"] = HUGGINGFACEHUB_API_TOKEN
repo_id = "meta-llama/Meta-Llama-3-8B-Instruct"
API_KEY = os.getenv("API_TOKEN")

def format_docs(docs: List[Document]):
    return "\n\n".join(doc.page_content for doc in docs)

def QA(question):

    llm = ChatOpenAI(
    model="Meta-Llama-3-8B-Instruct",
    temperature=0,
    max_tokens=500,
    api_key=API_KEY,
    base_url="https://litellm-d2k7gd2v6q-el.a.run.app",
)
    
    system_prompt = "You are a guidance conseller for IITM's BS Programme. Given a question about the BS programme and some reference document, answer the user's question. If none of the reference document answer the question then just say sorry i dont know \n\n reference document:{context}"
    prompt = ChatPromptTemplate.from_messages(
    [
        ("system", system_prompt),
        ("human", "{input}"),
    ]
)

    embeddings = HuggingFaceInferenceAPIEmbeddings(
    api_key=HUGGINGFACEHUB_API_TOKEN, model_name="sentence-transformers/all-MiniLM-l6-v2"
)

    vectordb = Chroma(persist_directory='application/vectordb/chroma', embedding_function=embeddings)
    retriever=vectordb.as_retriever(search_type="mmr",search_kwargs={"k":3, "fetch_k":6})

    _filter = LLMChainFilter.from_llm(llm)
    compression_retriever = ContextualCompressionRetriever(
    base_compressor=_filter, base_retriever=retriever
)

    rag_chain_from_docs = (
    RunnablePassthrough.assign(context=(lambda x: format_docs(x["context"])))
    | prompt
    | llm
    | StrOutputParser()
)   
    retrieve_docs = (lambda x: x["input"]) | retriever
    chain = RunnablePassthrough.assign(context=retrieve_docs).assign(
    answer=rag_chain_from_docs
    )
    result = chain.invoke({"input":question})
    return result








