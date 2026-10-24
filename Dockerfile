FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
ENV ECGSO_SECRET=ECGSO_SOVEREIGN_ROOT_SECRET_2026
ENV OLLAMA_URL=http://ollama:11434
EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
