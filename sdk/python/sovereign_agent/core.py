import os
import json
import hashlib
import requests
import logging
from typing import Dict, Any, Optional, Tuple
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ed25519
from cryptography.exceptions import InvalidSignature

# Sovereign Protocol: Official Python SDK (Alpha)
# Standard: NIST 2026 High-Authority Agentic Trust
# Pillars 1, 2, 3 - Integrated Client Interface

class SovereignAgent:
    """
    SovereignAgent - The official client for the Sovereign AG Protocol.
    Enforces Pillar 1 (Identity), 2 (Authorization), and 3 (Audit).
    """

    TEST_MODE = os.getenv("SOVEREIGN_TEST_MODE", "False").lower() == "true"

    def __init__(self, did: Optional[str] = None, private_key_pem: Optional[str] = None):
        """
        Zero-Config Initialization.
        Automatically loads credentials from SOVEREIGN_DID and SOVEREIGN_PRIVATE_KEY.
        """
        self.did = did or os.getenv("SOVEREIGN_DID")
        self.registry_url = os.getenv("SOVEREIGN_REGISTRY_URL", "http://127.0.0.1:8000")
        
        pk_pem = private_key_pem or os.getenv("SOVEREIGN_PRIVATE_KEY")
        if not self.did or not pk_pem:
            raise EnvironmentError(
                "Sovereign Identity incomplete. Initialize with credentials or set Environment Variables."
            )
            
        try:
            self._private_key = serialization.load_pem_private_key(
                pk_pem.encode('utf-8'),
                password=None
            )
        except Exception as e:
            raise ValueError(f"Failed to load Ed25519 Private Key: {str(e)}")

    def check_activation(self) -> Tuple[bool, str]:
        """
        Pillar 1: Checks if the agent's Genesis Root is active.
        If inactive, returns a specialized Dodo Checkout prompt.
        """
        try:
            r = requests.get(f"{self.registry_url}/v1/status/{self.did}")
            if r.status_code == 200:
                data = r.json()
                if data.get("is_active"):
                    return True, "Core Identity Verified."
                
                # Active 402 Redirect logic via specialized output
                # The registry should provide the checkout_url in its status check if inactive
                checkout_url = data.get("checkout_url", "https://dodopayments.com/checkout")
                error_msg = f"[ERROR] Agent Identity Not Verified. To activate your Genesis Root, visit: {checkout_url}"
                return False, error_msg

            return False, "[ERROR] Sovereign Registry unreachable. Primary mandate check failed."
        except Exception as e:
            return False, f"[ERROR] Connection Fault: {str(e)}"

    def verify(self) -> bool:
        """
        Metered Verification API.
        Pings the Sovereign Registry to record usage and check compliance before high-risk actions.
        """
        try:
            # Note: Using /api/verify as per the new endpoint structure
            r = requests.post(f"{self.registry_url}/api/verify", json={"did": self.did})
            if r.status_code == 200:
                logging.info(f"[SOVEREIGN] Metered verification successful for {self.did}")
                return True
            
            error_data = r.json()
            logging.error(f"[DENIED] Sovereign Verification Failed: {error_data.get('message', 'Unknown Error')}")
            return False
        except Exception as e:
            logging.error(f"[ERROR] Could not connect to Sovereign Verification API: {str(e)}")
            return False

    def authorize_action(self, api_key: str, action_type: str = "action") -> bool:
        """
        Tiered Sovereign Authorization Engine.
        Tiers: MINT ($1.00), ACTION ($0.01), PULSE ($0.0001).
        Pings /api/v1/auth/verify to authorize and meter the action.
        """
        try:
            r = requests.post(
                f"{self.registry_url}/api/v1/auth/verify", 
                json={"api_key": api_key, "did": self.did, "type": action_type}
            )
            if r.status_code == 200:
                fee = r.json().get('fee_applied', 0)
                logging.info(f"[SOVEREIGN] Authority Granted. Tier: {action_type.upper()} | Fee: ${fee}")
                return True
            
            error_data = r.json()
            error_msg = error_data.get('message', 'Authorization Denied')
            logging.error(f"[BLOCK] Sovereign Authority Denied: {error_msg}")
            return False
        except Exception as e:
            logging.error(f"[ERROR] Connection Fault to Authority API: {str(e)}")
            return False

    @classmethod
    def mint(cls, agent_name: str, registry_url: str = "http://127.0.0.1:8000") -> Optional['SovereignAgent']:
        """Pillar 1: Identity Minting with Revenue Gateway Integration."""
        logging.info(f"[MINT] Initiating Sovereign Identity request for '{agent_name}'...")
        try:
            r = requests.post(f"{registry_url}/v1/mint", json={"agent_name": agent_name})
            if r.status_code == 402:
                detail = r.json().get("detail", {})
                checkout_url = detail.get("checkout_url", "https://dodopayments.com/checkout")
                print(f"\n[ERROR] Agent Identity Not Verified. To activate your Genesis Root, visit: {checkout_url}\n")
                return None
            if r.status_code == 200:
                data = r.json()
                print(f"[SUCCESS] Sovereign Identity Minted: {data['did']}")
                return cls(did=data['did'], private_key_pem=os.getenv("SOVEREIGN_PRIVATE_KEY"))
            return None
        except Exception as e:
            logging.error(f"[MINT_ERROR] Connection failed: {str(e)}")
            return None

    def sign_and_send(self, target_url: str, payload: Dict[str, Any], method: str = "POST") -> requests.Response:
        """Pillar 1/2: Ed25519 Signature + Triple Handshake."""
        # 1. Internal Activation Check
        active, msg = self.check_activation()
        if not active:
            print(msg)
            # We still send but expect 402 from registry if the SDK is used for raw requests
            
        message = json.dumps(payload, sort_keys=True)
        signature = self._private_key.sign(message.encode('utf-8')).hex()
        headers = {
            "X-Sovereign-DID": self.did,
            "X-Sovereign-Signature": signature,
            "Content-Type": "application/json"
        }
        return requests.request(method, target_url, json=payload, headers=headers)

    def verify_chain(self) -> bool:
        """Pillar 3: SHA-384 Audit Verification."""
        try:
            r = requests.get(f"{self.registry_url}/v1/audit/{self.did}")
            if r.status_code != 200: return False
            trail = r.json().get("audit_trail", [])
            current_expected_hash = "GENESIS_CHAIN_BLOCK"
            for entry in trail:
                if entry.get("previous_hash") != current_expected_hash: return False
                row_tuple = (entry['id'], entry['timestamp'], entry['did'], entry['action'], entry['outcome'], entry['signature'], entry['previous_hash'])
                row_content = "|".join([str(x) for x in row_tuple])
                current_expected_hash = hashlib.sha384(row_content.encode('utf-8')).hexdigest()
            return True
        except: return False
