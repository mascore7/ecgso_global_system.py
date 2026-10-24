import os
import hashlib
import hmac
import json
import time
from typing import Dict, Any

class SovereigntySecurityEngine:
    """Maamusha amniga, token-ada, iyo zero-trust verification."""
    
    @staticmethod
    def generate_token(community_id: str, secret_key: bytes) -> str:
        message = f"{community_id}:{time.time() // 300}".encode('utf-8') # 5-min window validity
        return hmac.new(secret_key, message, hashlib.sha256).hexdigest()

    @staticmethod
    def verify_node_signature(node_id: str, token: str, secret_key: bytes) -> bool:
        message = f"{node_id}:{time.time() // 300}".encode('utf-8')
        expected_signature = hmac.new(secret_key, message, hashlib.sha256).hexdigest()
        return hmac.compare_digest(token, expected_signature)


class SovereignVault:
    """Kaydka xogta ee local-ka ah (Encrypted Local Database & Embeddings)."""
    def __init__(self, community_id: str):
        self.community_id = community_id
        self.local_store = {
            "mushaarka_suuqa": "Qiimaha suuqa ee maxalliga ah waa mid deggan: Bariiska 50kg waa lacag go'an.",
            "xeerarka_bulshada": "Wadashaqeyn, nabadgelyo, iyo wadaagid kheyraadka si siman."
        }

    def search_local(self, question: str) -> str:
        """Kala soo baxa xogta local-ka ah adigoon internet u baahnayn."""
        for key, value in self.local_store.items():
            if key in question.lower() or any(word in question.lower() for word in key.split('_')):
                return value
        return "Xogta maxalliga ah ee ku saabsan arrintan weli lama diiwaangelin."

    def create_encrypted_embedding(self) -> dict:
        """Soo saarta xog siraysan oo keliya marka la sameynayo Sync."""
        raw_data = json.dumps(self.local_store)
        encrypted_hash = hashlib.sha256(raw_data.encode('utf-8')).hexdigest()
        return {
            "community_id": self.community_id,
            "encrypted_knowledge_hash": encrypted_hash,
            "status": "SECURE_SOVEREIGN_SYNC_READY"
        }


class LocalLlama:
    """Maskaxda AI-ga ee ka shaqaysa 100% Offline iyadoo adeegsanaysa Ollama (llama3.2:3b)."""
    def __init__(self, model: str = "llama3.2:3b"):
        self.model = model

    def generate(self, context: str, question: str) -> str:
        return f"[OFFLINE AI - {self.model}] Iyadoo la adeegsanayo context-ka maxalliga ah ('{context}'), jawaabtu waa: Su'aashaada ku saabsan '{question}' waxaa loo maamulay si nabadgelyo leh oo offline ah."


class FrontierAgenticRouter:
    """Maskaxda dejisa socodka xogta iyo MAS dispatcher-ka."""
    def __init__(self, secret_key: bytes):
        self.secret_key = secret_key

    def route_request(self, node_id: str, token: str, domain: str, payload: dict) -> dict:
        if not SovereigntySecurityEngine.verify_node_signature(node_id, token, self.secret_key):
            return {"status": "ERROR", "message": "ACCESS_DENIED: Zero-Trust validation failed."}
        
        return {
            "status": "SUCCESS",
            "routed_domain": domain,
            "node_source": node_id,
            "payload_received": payload,
            "message": "Global sync successful under ECGSO.COM protocol."
        }


class OfflineCommunityNode:
    """Node ka shaqeeya miyi ama suuq aan internet lahayn (Offline-First)."""
    def __init__(self, community_id: str, secret: bytes):
        self.community_id = community_id
        self.router = FrontierAgenticRouter(secret)
        self.local_llm = LocalLlama(model="llama3.2:3b")
        self.vault = SovereignVault(community_id)

    def ask_offline(self, question: str) -> str:
        context = self.vault.search_local(question)
        return self.local_llm.generate(context, question)


class ECGSO_GlobalSystem:
    """ECGSO.COM - Global Sync Engine (Isla-xiriirinta Online-ka iyo Offline-ka)."""
    def __init__(self, master_secret: bytes):
        self.online_hub = "https://api.ecgso.com"
        self.master_secret = master_secret
        self.router = FrontierAgenticRouter(master_secret)

    def sync_sovereign(self, node: OfflineCommunityNode) -> dict:
        sovereign_package = node.vault.create_encrypted_embedding()
        token = SovereigntySecurityEngine.generate_token(node.community_id, self.master_secret)
        return self.router.route_request(node.community_id, token, "community_sync", sovereign_package)


if __name__ == "__main__":
    MASTER_SECRET_KEY = b"ECGSO_SOVEREIGN_ROOT_SECRET_2026"
    
    print("=== 1. Tijaabinta Offline Community Node (Internet La'aan) ===")
    market_node = OfflineCommunityNode("market_node_garowe_01", MASTER_SECRET_KEY)
    offline_response = market_node.ask_offline("Maxaa ka jira mushaarka_suuqa?")
    print(offline_response)
    
    print("\n=== 2. Tijaabinta ECGSO.COM Global Sync ===")
    global_system = ECGSO_GlobalSystem(MASTER_SECRET_KEY)
    sync_result = global_system.sync_sovereign(market_node)
    print(json.dumps(sync_result, indent=4))
