import json
import os
import logging
from datetime import datetime
from typing import Dict, Any, Union

# Sovereign Protocol: Pillar 2 (Authorization)
# Official NIST 2026 Submission - High-Frequency ABAC Logic
# Optimization: Cache-friendly stateless evaluation

DEFAULT_POLICY_PATH = os.path.join(os.getcwd(), "data", "policies.json")

# Configure High-Assurance Audit Logging (Pillar 3 Readiness)
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')
logger = logging.getLogger("SovereignGuard")

class SovereignGuard:
    """
    Sovereign Protocol - Pillar 2 (Authorization Engine).
    Implements High-Assurance ABAC for AI Agents using DIDs.
    """
    def __init__(self, policy_path: str = DEFAULT_POLICY_PATH):
        self.policy_path = policy_path
        self._policies = self._load_policies()

    def _load_policies(self) -> Dict[str, Any]:
        """Loads the authoritative policy registry (Stateless)"""
        try:
            if not os.path.exists(self.policy_path):
                logger.error(f"Registry not found at {self.policy_path}")
                return {}
            with open(self.policy_path, "r") as f:
                return json.load(f)
        except Exception as e:
            logger.error(f"Failed to load registry: {str(e)}")
            return {}

    def evaluate_request(self, did: str, action_metadata: Dict[str, Any]) -> str:
        """
        Evaluates a request against the DID mandate.
        Returns 'GRANT' or 'DENY'. Triggers 'Green Shield Block' on violation.
        """
        # 1. Resolve DID Mandate
        mandate = self._policies.get(did)
        if not mandate:
            return self._trigger_block(did, "Unknown DID")

        # 2. Attribute-Based Access Control (ABAC) Pipeline
        
        # A: Check Expiration Mandate
        expiration_str = mandate.get("expiration_date", "2000-01-01")
        try:
            expiration = datetime.strptime(expiration_str, "%Y-%m-%d")
            if datetime.now() > expiration:
                return self._trigger_block(did, f"Mandate Expired ({expiration_str})")
        except ValueError:
            return self._trigger_block(did, "Invalid Mandate date format")

        # B: Check API Endpoint Authorization
        action_endpoint = action_metadata.get("endpoint")
        allowed_endpoints = mandate.get("allowed_api_endpoints", [])
        if action_endpoint not in allowed_endpoints:
            return self._trigger_block(did, f"Unauthorized Endpoint: {action_endpoint}")

        # C: Check Transaction Cap
        requested_value = action_metadata.get("value", 0.0)
        max_value = mandate.get("max_transaction_value", 0.0)
        if requested_value > max_value:
            return self._trigger_block(did, f"Value Breach: {requested_value} exceeds {max_value}")

        # 3. Request Authorized
        logger.info(f"Pillar 2 [GRANT]: Mandate for {did} confirmed for {action_endpoint}.")
        return "GRANT"

    def _trigger_block(self, did: str, reason: str) -> str:
        """Triggers the 'Green Shield Block' protocol for policy violations."""
        print(f"\n[!] Pillar 2 (Authorization) Triggered: Green Shield Block")
        print(f"[!] Reason: {reason} for DID: {did}")
        print(f"[!] Evaluation: DENY\n")
        logger.warning(f"ACTION BLOCKED: {did} violated mandate ({reason})")
        return "DENY"

if __name__ == "__main__":
    # Pillar 2: Demonstration & Performance Audit
    guard = SovereignGuard()
    
    print("\n[SOVEREIGN GUARD: PILLAR 2 (AUTHORIZATION) AUDIT]")
    print("-" * 48)
    
    # Mock Action Request
    valid_request = {"endpoint": "/v1/trade", "value": 2500.0}
    invalid_request = {"endpoint": "/v1/trade", "value": 15000.0}
    
    did = "did:sov:agent-001"
    
    print(f"[*] Processing Authorized Request for {did}...")
    guard.evaluate_request(did, valid_request)
    
    print(f"[*] Processing Volatile Request for {did}...")
    guard.evaluate_request(did, invalid_request)
