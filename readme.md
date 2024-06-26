# IITM BS Programme RAG

## Overview
This repository contains an application for querying information about the BS programme offered by IIT Madras (IITM). The application is designed to provide answers to common queries related to the programme using a RAG (Red, Amber, Green) status system.

## Getting Started
To run the application locally, follow these steps:

1. **Set up Environment Variables:**
   Create a `.env` file in the root directory of the project and add your Hugging Face Inference API key and API_KEY for this inference point "https://litellm-d2k7gd2v6q-el.a.run.app" as follows:
   ```
   HF_TOKEN=your_hugging_face_api_key_here
   API_TOKEN=YOUR_API_KEY
   ```

2. **Build the Docker Image:**
   ```
   docker build -t iitm-bs-rag .
   ```

3. **Run the Docker Container:**
   ```
   docker run -p 5001:5001 iitm-bs-rag
   ```

4. **Access the Application:**
   Open your web browser and go to [http://127.0.0.1:5001/](http://127.0.0.1:5001/)

## Usage
- Navigate to the provided URL in your web browser after starting the Docker container.
- Enter your queries related to the IITM BS programme in the search box.
- Enjoy!

## Dependencies
- Docker: Ensure you have Docker installed on your machine to build and run the containerized application.
