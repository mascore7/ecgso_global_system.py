from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from backend.ecgso_global_system import ECGSO_GlobalSystem, OfflineCommunityNode, MASTER_SECRET_KEY

app = FastAPI(
    title="ECGSO.COM - EVOLVERA CORE GLOBAL SYSTEM",
    version="1.0.0",
    description="Sovereign AI Engine with 100% Offline & Online Sync Capabilities."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

global_system = ECGSO_GlobalSystem(MASTER_SECRET_KEY)

class QueryPayload(BaseModel):
    community_id: str
    question: str

@app.get("/")
def read_root():
    return {
        "system": "ECGSO.COM - EVOLVERA CORE GLOBAL SYSTEM ONLINE.COM + OFFLINE COMMUNITIES LIVE",
        "status": "ONLINE",
        "engine": "Meta AI Llama 3.2 + Sovereignty AI"
    }

@app.post("/api/v1/offline-query")
def execute_offline_query(payload: QueryPayload):
    node = OfflineCommunityNode(payload.community_id, MASTER_SECRET_KEY)
    response = node.ask_offline(payload.question)
    return {
        "status": "SUCCESS",
        "community_id": payload.community_id,
        "response": response
    }
