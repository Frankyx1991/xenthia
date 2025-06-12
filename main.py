from fastapi import FastAPI, Request, Header
import json
import hmac
import hashlib
import subprocess
import os

app = FastAPI()

GITHUB_SECRET = os.getenv("GITHUB_SECRET", "")

def verify_signature(request_body, signature_header):
    if not GITHUB_SECRET or not signature_header:
        return False
    sha_name, signature = signature_header.split('=')
    mac = hmac.new(GITHUB_SECRET.encode(), msg=request_body, digestmod=hashlib.sha256)
    return hmac.compare_digest(mac.hexdigest(), signature)

@app.post("/webhook")
async def github_webhook(request: Request, x_hub_signature_256: str = Header(None)):
    body = await request.body()
    if not verify_signature(body, x_hub_signature_256):
        return {"status": "unauthorized"}

    payload = json.loads(body)
    if payload.get("ref") != "refs/heads/main":
        return {"status": "ignored", "reason": "not main branch"}

    repo_name = payload.get("repository", {}).get("name", "unknown")
    subprocess.run(["git", "pull"])
    return {"status": "received", "repo": repo_name}
