import os
import json
import logging
import uvicorn
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any

# SVTP v1.0: High-Authority API Registry
# Standard: NIST 2026 Web Bot Auth (FastAPI Implementation)
# Pillar 1 (Identity) & Pillar 3 (Audit) Integration

# Modular Imports
import sys
sys.path.append(os.path.dirname(__file__))
from verify_trust import verify_trust
from audit_logger import LOG_FILE

app = FastAPI(title="SVTP v1.0 Protocol API", version="v1.0.0")

# --- NIST-Compliant CORS Configuration ---
# Allowing Alpha Partners for Cloud-to-Cloud interaction
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, this should be restricted to partner domains
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["X-SVTP-Audit-ID", "Content-Type", "Authorization"],
)

# --- API Models ---
class VerifyPayload(BaseModel):
    did: str
    message: str
    signature: str # Hex-encoded

# --- Endpoints ---

@app.post("/v1/verify")
async def verify_endpoint(payload: VerifyPayload):
    """
    Pillar 1: Identity Token Verification.
    Validates the agent signature against the registry's public key.
    """
    # 1. Resolve Public Key Path (Logic: keys/<agent_id>/public_key.pem)
    agent_id = payload.did.split(":")[-1]
    pk_path = os.path.join(os.getcwd(), "keys", agent_id, "public_key.pem")
    
    # Fallback to root keys if not in sub-directory
    if not os.path.exists(pk_path):
        pk_path = os.path.join(os.getcwd(), "keys", "public_key.pem")

    if not os.path.exists(pk_path):
        raise HTTPException(status_code=404, detail="SVTP DID not found in registry.")

    # 2. Cryptographic Check
    is_valid = verify_trust(pk_path, payload.message, payload.signature)
    
    if is_valid:
        return {
            "status": "VERIFIED",
            "did": payload.did,
            "message": "SVTP Identity Confirmed."
        }
    else:
        raise HTTPException(
            status_code=401, 
            detail="CRITICAL: Signature Mismatch. Potential Identity Spoofing detected."
        )

@app.get("/v1/audit/{did}")
async def get_audit_trail(did: str):
    """
    Pillar 3: Audit Registry Retrieval.
    Returns the cryptographically chained log history for a specific DID.
    """
    if not os.path.exists(LOG_FILE):
        return {"did": did, "audit_trail": []}

    try:
        audit_trail = []
        with open(LOG_FILE, "r") as f:
            for line in f:
                line = line.strip()
                if did in line:
                    parts = line.split("|")
                    if len(parts) >= 6:
                        audit_trail.append({
                            "timestamp": parts[0],
                            "did": parts[1],
                            "action": parts[2],
                            "outcome": parts[3],
                            "prev_hash": parts[4],
                            "signature": parts[5]
                        })
        return {"did": did, "audit_trail": audit_trail}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Audit Retrieval Failed: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "svtp_OPERATIONAL", "port": 8080}

if __name__ == "__main__":
    # Launching on 8080 for NIST NCCoE partnership integration
    print("[SVTP v1.0 PROTOCOL API: BOOTING ON PORT 8080]")
    uvicorn.run(app, host="0.0.0.0", port=8080)



