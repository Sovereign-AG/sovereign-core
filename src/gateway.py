import os
import json
import logging
from typing import Dict, Any

# SVTP v1.0: Central Nervous System (Gateway)
# Integration Layer: Identity (P1) + Authorization (P2) + Audit (P3)

# Support modular imports
import sys
sys.path.append(os.path.dirname(__file__))

from verify_trust import verify_trust
from policy_engine import SVTPGuard
from audit_logger import SVTPAuditor

# Configuration
KEYS_BASE_DIR = os.path.join(os.getcwd(), "keys")

# Standard NIST-aligned logging for the Gateway itself
logging.basicConfig(level=logging.INFO, format='%(levelname)s: [GATEWAY] %(message)s')
logger = logging.getLogger("SVTPGateway")

def process_agent_request(did: str, signature: str, message: str, requested_action: Dict[str, Any]) -> Dict[str, Any]:
    """
    SVTP v1.0 Handshake: The Single Point of Truth for Agentic Interaction.
    
    1. Verify Trust (Identity)
    2. Evaluate Policy (Authorization)
    3. Log Cryptographic Audit (Audit)
    """
    # Pre-calculated Gateway Response Structure
    response = {
        "did": did,
        "status": "DENIED",
        "audit_id": None,
        "piars": {
            "identity": "UNVERIFIED",
            "authorization": "DENIED",
            "audit": "PENDING"
        }
    }

    # Helper: Resolve DID to Agent ID (Assuming did:SVTP:<agent_id> format)
    agent_id = did.split(":")[-1]
    agent_keys_dir = os.path.join(KEYS_BASE_DIR, agent_id)
    public_key_path = os.path.join(agent_keys_dir, "public_key.pem")
    private_key_path = os.path.join(agent_keys_dir, "private_key.pem") # Used for P3 signature in this model

    # --- Pillar 1: Identity Verification ---
    logger.info(f"Initiating Identity Handshake for {did}...")
    is_verified = verify_trust(public_key_path, message, signature)
    
    if not is_verified:
        response["piars"]["identity"] = "VERIFICATION_FAILURE"
        return _finalize_response(response, "CRITICAL: Verification Failure. Possible spoofing.")

    response["piars"]["identity"] = "VERIFIED"

    # --- Pillar 2: Authorization Evaluation ---
    logger.info(f"Evaluating Authorization Mandate for {did}...")
    guard = SVTPGuard()
    auth_result = guard.evaluate_request(did, requested_action)
    
    if auth_result == "GRANT":
        response["status"] = "GRANTED"
        response["piars"]["authorization"] = "AUTHORIZED"
    else:
        response["status"] = "DENIED"
        response["piars"]["authorization"] = "POLICY_VIOLATION"

    # --- Pillar 3: Cryptographic Audit ---
    logger.info(f"Committing Cryptographic Audit for {did}...")
    auditor = SVTPAuditor()
    audit_success = auditor.log_action(
        did, 
        requested_action.get("endpoint", "UNKNOWN_ACTION"), 
        response["status"], 
        private_key_path
    )
    
    if audit_success:
        response["piars"]["audit"] = "COMMITTED"
    else:
        response["piars"]["audit"] = "LOGGING_ERROR"

    return _finalize_response(response, f"Request processed with status: {response['status']}")

def _finalize_response(response: Dict[str, Any], message: str) -> Dict[str, Any]:
    """Appends high-level message and returns the structured JSON."""
    response["message"] = message
    logger.info(f"Handshake complete: {message}")
    return response

if __name__ == "__main__":
    # Gateway Integration Demonstration
    print("\n[SVTP v1.0 GATEWAY: CENTRAL NERVOUS SYSTEM]")
    print("-" * 52)
    
    # 1. Mock Credentials (Simulating an Agent's incoming bundle)
    # Target Agent MUST be minted first (e.g. AGENT_TEST_001)
    did = "did:SVTP:AGENT_TEST_001"
    
    # Generate a VALID signature for this message test
    # (Normally the agent does this locally)
    from cryptography.hazmat.primitives import serialization
    from cryptography.hazmat.primitives.asymmetric import ed25519
    
    msg = "SVTP Handshake Challenge 2026"
    pk_path = f"keys/AGENT_TEST_001/private_key.pem"
    
    if os.path.exists(pk_path):
        with open(pk_path, "rb") as f:
            pk = serialization.load_pem_private_key(f.read(), password=None)
        sig_hex = pk.sign(msg.encode('utf-8')).hex()
        
        # 2. Mock Action Request
        action = {
            "endpoint": "/v1/trade",
            "value": 150.0  # Should be within limits of standard agents
        }
        
        # 3. Process the Gateway Handshake
        result = process_agent_request(did, sig_hex, msg, action)
        print("\n[GATEWAY RESPONSE]")
        print(json.dumps(result, indent=2))
    else:
        print("[!] Error: Simulated Agent Keys not found. Ensure AGENT_TEST_001 is minted.")



