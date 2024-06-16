import numpy as np 
import pandas as pd
import fitz
from tqdm.auto import tqdm
import re
import spacy
from langchain.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceInferenceAPIEmbeddings
from langchain.schema import Document
from langchain.chains import RetrievalQA
from langchain_huggingface import HuggingFaceEndpoint
from dotenv import load_dotenv
import os

pdf_path = '../Document/IITM BS Degree Programme - Student Handbook - Latest.pdf'

dotenv_path = '../.env'
load_dotenv(dotenv_path)
HUGGINGFACEHUB_API_TOKEN = os.getenv("HF_TOKEN")
os.environ["HUGGINGFACEHUB_API_TOKEN"] = HUGGINGFACEHUB_API_TOKEN
repo_id = "meta-llama/Meta-Llama-3-8B-Instruct"

def text_formatter(text: str) -> str:
    """Performs minor formatting on text."""
    cleaned_text = re.sub(r'\\u202', '', text).replace("\n", " ").strip().replace("\t", " ").strip()
    return cleaned_text

def open_and_read_pdf(pdf_path: str) -> list[dict]:
    """
    Opens a PDF file, reads its text content page by page, and collects statistics.

    Parameters:
        pdf_path (str): The file path to the PDF document to be opened and read.

    Returns:
        list[dict]: A list of dictionaries, each containing the page number
        (adjusted), character count, word count, sentence count, token count, and the extracted text
        for each page.
    """
    doc = fitz.open(pdf_path)  # open a document
    pages_and_texts = []
    for page_number, page in tqdm(enumerate(doc)):  # iterate the document pages
        text = page.get_text()  # get plain text encoded as UTF-8
        text = text_formatter(text)
        pages_and_texts.append({"page_number": page_number - 3,
                                "page_char_count": len(text),
                                "page_word_count": len(text.split(" ")),
                                "page_sentence_count_raw": len(text.split(". ")),
                                "page_token_count": len(text) / 4,  # 1 token = ~4 chars, see: https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them
                                "text": text})
    return pages_and_texts

pages_and_texts = open_and_read_pdf(pdf_path=pdf_path)

# Load Spacy English model
nlp = spacy.load("en_core_web_sm")

# Add a sentencizer pipeline
nlp.add_pipe("sentencizer")
for item in tqdm(pages_and_texts):
    item["sentences"] = list(nlp(item["text"]).sents)
    
    # Make sure all sentences are strings
    item["sentences"] = [str(sentence) for sentence in item["sentences"]]
    
    # Count the sentences 
    item["page_sentence_count_spacy"] = len(item["sentences"])

def chunk_text_with_headings(pages_and_texts: list[dict]) -> list[dict]:
    """
    Chunk the text based on identified headings.

    Parameters:
        pages_and_texts (list[dict]): List of dictionaries containing page text.

    Returns:
        list[dict]: List of dictionaries with chunked text under each heading.
    """
    # Define headings pattern (you may need to adjust this regex based on your actual headings)
    headings_pattern = r'\d+\.\s+([^\n]+)'
    
    for item in tqdm(pages_and_texts):
        text = item["text"]
        
        # Find all headings on the page
        headings = re.findall(headings_pattern, text)
        
        if not headings:
            # If no headings found, treat the entire text as one chunk
            item["chunks"] = {"No Headings": [text]}
            continue
        
        # Initialize chunks for each heading
        chunks = {heading: [] for heading in headings}
        
        # Start with the first heading (assuming it starts from the beginning of the text)
        current_heading = headings[0]
        current_chunk = []
        
        # Iterate through text and divide into chunks based on headings
        for line in text.splitlines():
            if re.match(headings_pattern, line):
                # Save previous chunk
                if current_heading in chunks:
                    chunks[current_heading].append("\n".join(current_chunk).strip())
                
                # Move to the next heading
                current_heading = re.findall(headings_pattern, line)[0]
                current_chunk = []
            else:
                current_chunk.append(line)
        
        # Save the last chunk
        if current_heading in chunks:
            chunks[current_heading].append("\n".join(current_chunk).strip())
        
        # Store chunks back into the item
        item["chunks"] = chunks
    
    return pages_and_texts

pages_and_texts_with_chunks = chunk_text_with_headings(pages_and_texts)

dotenv_path = '../.env'
load_dotenv(dotenv_path)
HUGGINGFACEHUB_API_TOKEN = os.getenv("HF_TOKEN")
os.environ["HUGGINGFACEHUB_API_TOKEN"] = HUGGINGFACEHUB_API_TOKEN

# embeddings = HuggingFaceEmbeddings()

embeddings = HuggingFaceInferenceAPIEmbeddings(
    api_key=HUGGINGFACEHUB_API_TOKEN, model_name="sentence-transformers/all-MiniLM-l6-v2"
)

documents = []
for item in pages_and_texts_with_chunks:
    for heading, chunks in item["chunks"].items():
        for chunk in chunks:
            if chunk.strip():  # Ensure no empty chunks
                documents.append(Document(
                    page_content=chunk,
                    metadata={"page_number": item["page_number"], "heading": heading}
                ))


vectordb = Chroma.from_documents(
    documents=documents,
    embedding=embeddings,
    persist_directory='vectordb/chroma/'
)
vectordb.persist()

llm = HuggingFaceEndpoint(
        repo_id=repo_id,
        max_length=60,
        temperature=0.5,
        huggingfacehub_api_token=HUGGINGFACEHUB_API_TOKEN,
    )




vectordb = Chroma(persist_directory='vectordb/chroma/', embedding_function=embeddings)
question = 'what subjects are there for degree level?'
qa_chain = RetrievalQA.from_chain_type(
        llm,
        retriever=vectordb.as_retriever(search_type="mmr",search_kwargs={"k":3, "fetch_k":5}),
   #     chain_type='refine'
    )
result = qa_chain({"query": question})

print(result)
