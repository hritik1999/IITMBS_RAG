from langchain_huggingface import HuggingFaceEndpoint
from langchain.chains import LLMChain
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
import os



def query(question):
    dotenv_path = '../.env'
    load_dotenv(dotenv_path)
    HUGGINGFACEHUB_API_TOKEN = os.getenv("HF_TOKEN")
    os.environ["HUGGINGFACEHUB_API_TOKEN"] = HUGGINGFACEHUB_API_TOKEN
    template = """Question: {question}

                Answer: Let's think step by step."""

    prompt = PromptTemplate.from_template(template)

    repo_id = "meta-llama/Meta-Llama-3-8B-Instruct"

    llm = HuggingFaceEndpoint(
        repo_id=repo_id,
        max_length=60,
        temperature=0.5,
        huggingfacehub_api_token=HUGGINGFACEHUB_API_TOKEN,
    )
    llm_chain = prompt | llm
    return llm_chain.invoke({"question": question})









