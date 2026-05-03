# SVTP v1.0 SDK - Registry Client
# License: SVTP Source-Available License (SSAL) v1.0
# Copyright (c) 2026 SVTP v1.0.
# Commercial use > 10 agents requires an SVTP Enterprise License.

import os
import requests
import logging
import time
import threading
from typing import Optional, Dict, Any

class RegistryClient:
    """
    RegistryClient - Interfaces with api.SVTP.org for Kill-Switch and Identity checks.
    """
    def __init__(self, SVTP_KEY: str, base_url: str = "http://127.0.0.1:5001"):
        self.SVTP_KEY = SVTP_KEY
        self.base_url = base_url
        self.fail_safe_mode = "BLOCK" # v1.0 strict enforcement
        self._is_blocked = False # Zero-Latency local cache
        self._lock = threading.Lock()

    def check_kill_switch(self, agent_id: str) -> bool:
        """
        Returns True if the agent is allowed to proceed, False otherwise.
        """
        try:
            response = requests.get(
                f"{self.base_url}/v1/status/{agent_id}",
                headers={
                    "Authorization": f"Bearer {self.SVTP_KEY}",
                    "X-SVTP-Key": self.SVTP_KEY
                },
                timeout=2.0
            )
            if response.status_code == 200:
                data = response.json()
                return data.get("is_active", True)
            
            if response.status_code == 403:
                logging.error(f"[SVTP] Kill-Switch ACTIVATED or Unauthorized for {agent_id}.")
                return False
                
            return True # Default to active if status is unknown but reached
        except Exception as e:
            logging.warning(f"[SVTP] Registry unreachable or invalid key: {e}")
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
        url = f"{self.base_url}/register" # Linked to server.py register endpoint for v1.0
        payload = {
            "did": agent_name, # In v1.0, agent_name IS the DID from the Passport
            "SVTP_KEY": self.SVTP_KEY,
            "hitl_config": hitl_config
        }
        
        try:
            resp = requests.post(
                url, 
                json=payload, 
                headers={"X-SVTP-Key": self.SVTP_KEY}, 
                timeout=5.0
            )
            if resp.status_code == 201 or resp.status_code == 200:
                return resp.json()
            else:
                logging.error(f"[SVTP] Handshake failed: {resp.text}")
                return {"error": "Handshake failed - Unregistered or Invalid Key"}
        except Exception as e:
            logging.warning(f"[SVTP] Registry unreachable during handshake: {e}")
            return {"error": str(e)}

    def _mint_genesis_did(self) -> Dict[str, Any]:
        return {
            "did": f"did:svtp:genesis:{int(time.time())}",
            "status": "Standard-Compliant",
            "message": "Genesis Grant Applied (Fail-Safe)"
        }

    def emit_pulse(self, agent_id: str, state_hash: str) -> bool:
        """
        Emits a cryptographic pulse to the registry.
        """
        try:
            r = requests.post(
                f"{self.base_url}/heartbeat",
                json={"agent_id": agent_id, "state_hash": state_hash},
                headers={
                    "X-SVTP-DID": agent_id,
                    "X-SVTP-Key": self.SVTP_KEY,
                    "Authorization": f"Bearer {self.SVTP_KEY}"
                },
                timeout=1.0
            )
            resp = r.status_code == 200
            with self._lock:
                if r.status_code == 403:
                    self._is_blocked = True
                elif r.status_code == 200:
                    self._is_blocked = False
            return resp
        except:
            return False

    def get_passport(self, did: str) -> Dict[str, Any]:
        """Queries the SVTP Trust Passport (STP) for a DID."""
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




