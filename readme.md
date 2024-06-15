
# IITM BS Programme RAG

## Overview
This repository contains an application for querying information about the BS programme offered by IIT Madras (IITM). The application is designed to provide answers to common queries related to the programme using a RAG (Red, Amber, Green) status system.

## Getting Started
To run the application locally, follow these steps:

1. **Build the Docker Image:**
   ```
   docker build -t iitm-bs-rag .
   ```

2. **Run the Docker Container:**
   ```
   docker run -p 5001:5001 iitm-bs-rag
   ```

3. **Access the Application:**
   Open your web browser and go to [http://127.0.0.1:5001/](http://127.0.0.1:5001/)

## Usage
- Navigate to the provided URL in your web browser after starting the Docker container.
- Enter your queries related to the IITM BS programme in the search box.

## Dependencies
- Docker: Ensure you have Docker installed on your machine to build and run the containerized application.