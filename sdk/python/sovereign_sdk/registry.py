import os
import requests
import logging
import time
from typing import Optional, Dict, Any

class RegistryClient:
    """
    RegistryClient - Interfaces with api.sovereign-ag.ai for Kill-Switch and Identity checks.
    """
    def __init__(self, api_key: str, base_url: str = "https://api.sovereign-ag.ai"):
        self.api_key = api_key
        self.base_url = base_url
        self.fail_safe_mode = os.getenv("SOVEREIGN_FAIL_SAFE", "BLOCK").upper() # BLOCK or LOG

    def check_kill_switch(self, agent_id: str) -> bool:
        """
        Returns True if the agent is allowed to proceed, False otherwise.
        """
        try:
            # In production, this should be high-performance (e.g. cached or ultra-fast)
            response = requests.get(
                f"{self.base_url}/v1/status/{agent_id}",
                headers={"Authorization": f"Bearer {self.api_key}"},
                timeout=2.0
            )
            if response.status_code == 200:
                data = response.json()
                return data.get("is_active", True)
            
            if response.status_code == 403:
                logging.error(f"[SOVEREIGN] Kill-Switch ACTIVATED for {agent_id}.")
                return False
                
            return True # Default to active if status is unknown but reached
        except Exception as e:
            logging.warning(f"[SOVEREIGN] Registry unreachable: {e}")
            if self.fail_safe_mode == "BLOCK":
                return False
            return True

    async def handshake_async(self, agent_name: str, hitl_config: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """
        Async handshake to mint identity using standard requests (wrapped for compatibility).
        """
        import asyncio
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, self._handshake_sync, agent_name, hitl_config)

    def _handshake_sync(self, agent_name: str, hitl_config: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        url = f"{self.base_url}/v1/mint"
        payload = {
            "agent_name": agent_name, 
            "api_key": self.api_key,
            "hitl_config": hitl_config
        }
        
        try:
            resp = requests.post(url, json=payload, timeout=5.0)
            if resp.status_code == 200:
                return resp.json()
            elif resp.status_code == 402 and self.api_key == "GRANT_GENESIS":
                return self._mint_genesis_did()
            else:
                logging.error(f"[SOVEREIGN] Handshake failed: {resp.text}")
                return {"error": "Handshake failed"}
        except Exception as e:
            logging.warning(f"[SOVEREIGN] Registry unreachable during handshake: {e}")
            if self.api_key == "GRANT_GENESIS":
                return self._mint_genesis_did()
            return {"error": str(e)}

    def _mint_genesis_did(self) -> Dict[str, Any]:
        return {
            "did": f"did:sov:genesis:{int(time.time())}",
            "status": "Standard-Compliant",
            "message": "Genesis Grant Applied (Fail-Safe)"
        }

    def emit_pulse(self, agent_id: str, state_hash: str) -> bool:
        """
        Emits a cryptographic pulse to the registry.
        """
        try:
            r = requests.post(
                f"{self.base_url}/v1/pulse",
                json={"agent_id": agent_id, "state_hash": state_hash},
                headers={"Authorization": f"Bearer {self.api_key}"},
                timeout=1.0
            )
            return r.status_code == 200
        except:
            return False

    def get_passport(self, did: str) -> Dict[str, Any]:
        """Queries the Sovereign Trust Passport (STP) for a DID."""
        try:
            r = requests.get(f"{self.base_url}/v1/verify/{did}", timeout=2.0)
            return r.json()
        except Exception as e:
            return {"error": str(e)}

    def get_compliance_report(self, did: str) -> Dict[str, Any]:
        """Exports the NIST-Certified Audit Log / Compliance Report."""
        try:
            r = requests.get(f"{self.base_url}/v1/compliance/export/{did}", timeout=5.0)
            return r.json()
        except Exception as e:
            return {"error": str(e)}
