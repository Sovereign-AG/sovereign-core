import json
import os
import time
from typing import Dict, Any

class SovereignLedger:
    """
    SovereignLedger - Manages the immutable NDJSON ledger.
    """
    def __init__(self, ledger_path: str = "sovereign_ledger.ndjson"):
        self.ledger_path = os.path.abspath(ledger_path)
        # Ensure directory exists
        os.makedirs(os.path.dirname(self.ledger_path), exist_ok=True)

    def log_action(self, agent_id: str, action: str, metadata: Dict[str, Any]):
        """
        Logs an action to the NDJSON ledger.
        """
        entry = {
            "timestamp": time.time(),
            "iso_time": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
            "agent_id": agent_id,
            "action": action,
            "metadata": metadata,
            "billing_increment": 0.01
        }
        
        try:
            with open(self.ledger_path, "a") as f:
                f.write(json.dumps(entry) + "\n")
        except Exception as e:
            print(f"[SOVEREIGN_LEDGER] Error writing to ledger: {e}")

    def log_pulse(self, agent_id: str, state_hash: str):
        """
        Logs a heartbeat pulse.
        """
        self.log_action(agent_id, "PULSE", {"state_hash": state_hash})
