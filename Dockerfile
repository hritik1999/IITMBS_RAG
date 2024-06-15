FROM python:3.12.4-slim

WORKDIR /app


COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "main.py"]