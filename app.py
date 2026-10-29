import os, time
from fastapi import FastAPI, HTTPException, Header
from pydantic import BaseModel
from typing import Optional
from ecgso_global_system import SovereigntySecurityEngine, OfflineCommunityNode, ECGSO_GlobalSystem

SECRET = os.environ["ECGSO_SECRET"].encode()
engine = SovereigntySecurityEngine(SECRET)
g_system = ECGSO_GlobalSystem(SECRET)

app = FastAPI(title="ECGSO.COM API", description="Real Meta AI Llama 3.2 Stack - Offline + Online Sovereign AI", version="1.0.0")

class AskReq(BaseModel):
    community_id: str
    question: str

@app.get("/")
def root():
    return {"system":"ECGSO.COM","status":"LIVE","meta_ai":"Llama 3.2 via Meta Llama Stack + Ollama","security":"Zero-Trust FIXED int(time)","offline":"100% SovereignVault"}

@app.get("/health")
def health():
    return {"ok":True,"ts":int(time.time())}

@app.post("/ask")
def ask(req: AskReq, x_token: Optional[str] = Header(None)):
    if not x_token:
        raise HTTPException(401, "Missing token")
    if not engine.verify(req.community_id, x_token):
        raise HTTPException(403, "Invalid token")
    node = OfflineCommunityNode(req.community_id, SECRET)
    return {"answer": node.ask(req.question), "community": req.community_id, "model":"meta-llama/Llama-3.2-3B - REAL OPEN SOURCE"}
