"""ECGSO Global System: security engine and offline community node."""

import hashlib
import hmac
import json
import os
import time
import urllib.request

TOKEN_WINDOW = 300  # seconds


class SovereigntySecurityEngine:
    def __init__(self, secret: bytes):
        self._secret = secret

    def issue(self, community_id: str, now: int | None = None) -> str:
        t = int(time.time()) if now is None else now
        msg = f"{community_id}:{t // TOKEN_WINDOW}".encode()
        return hmac.new(self._secret, msg, hashlib.sha256).hexdigest()

    def verify(self, community_id: str, token: str) -> bool:
        now = int(time.time())
        for shift in (0, -TOKEN_WINDOW):
            expected = self.issue(community_id, now + shift)
            if hmac.compare_digest(expected.encode(), token.encode()):
                return True
        return False


class OfflineCommunityNode:
    def __init__(self, community_id: str, secret: bytes, model: str = "llama3.2:3b"):
        self.community_id = community_id
        self._secret = secret
        self.model = model
        self.host = os.environ.get("OLLAMA_HOST", "http://localhost:11434")

    def ask(self, question: str) -> str:
        body = json.dumps({"model": self.model, "prompt": question, "stream": False}).encode()
        req = urllib.request.Request(
            f"{self.host}/api/generate",
            data=body,
            headers={"Content-Type": "application/json"},
        )
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.loads(r.read())["response"]
        except OSError:
            return "Model unavailable: start Ollama and run `ollama pull llama3.2:3b`."


class ECGSO_GlobalSystem:
    def __init__(self, secret: bytes):
        self.engine = SovereigntySecurityEngine(secret)
        self._secret = secret
