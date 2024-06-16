from langchain_huggingface import HuggingFaceEndpoint
from langchain_huggingface.embeddings import HuggingFaceEmbeddings
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings
from langchain.chains import LLMChain
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
from langchain.chains import RetrievalQA
from langchain.vectorstores import Chroma
import os

dotenv_path = '../.env'
load_dotenv(dotenv_path)
HUGGINGFACEHUB_API_TOKEN = os.getenv("HF_TOKEN")
os.environ["HUGGINGFACEHUB_API_TOKEN"] = HUGGINGFACEHUB_API_TOKEN
repo_id = "meta-llama/Meta-Llama-3-8B-Instruct"

def query(question):

    template = """Question: {question}

                Answer: Let's think step by step."""

    prompt = PromptTemplate.from_template(template)

    llm = HuggingFaceEndpoint(
        repo_id=repo_id,
        max_length=60,
        temperature=0.5,
        huggingfacehub_api_token=HUGGINGFACEHUB_API_TOKEN,
    )
    llm_chain = prompt | llm
    return llm_chain.invoke({"question": question})

def QA(question):

    llm = HuggingFaceEndpoint(
        repo_id=repo_id,
        max_length=60,
        temperature=0.5,
        huggingfacehub_api_token=HUGGINGFACEHUB_API_TOKEN,
    )
    
    embeddings = HuggingFaceInferenceAPIEmbeddings(
    api_key=HUGGINGFACEHUB_API_TOKEN, model_name="sentence-transformers/all-MiniLM-l6-v2"
)

    vectordb = Chroma(persist_directory='application/vectordb/chroma/', embedding_function=embeddings)
    retriever = vectordb.as_retriever()

    # docs = retriever.get_relevant_documents(question)
    # if not docs:
    #     return {"error": "No documents found for the query."}
    # else:
    #     print(f"Retrieved {len(docs)} documents")

    qa_chain = RetrievalQA.from_chain_type(
        llm,
        retriever=vectordb.as_retriever(),
   #     chain_type='refine'
    )
    result = qa_chain({"query": question})

    return result['result']








