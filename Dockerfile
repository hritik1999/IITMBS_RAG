FROM python:3.12.4-slim

WORKDIR /app

RUN apt-get update && \
    apt-get install -y build-essential python3-dev && \
    apt-get clean

# Upgrade pip and setuptools
RUN pip install --upgrade pip setuptools wheel


COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY .env ../.env
COPY . .

CMD ["python", "main.py"]