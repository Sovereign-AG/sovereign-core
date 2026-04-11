import os
import json
import asyncio
import logging
import threading
from typing import Any, Dict, Optional
from .registry import RegistryClient
from .ledger import SovereignLedger
from .heartbeat import HeartbeatEngine

class SovereignAgent:
    """
    SovereignAgent - Transparent Proxy Wrapper for AI Agents.
    Enforces the Sovereign Protocol (Identity, Audit, Billing, Kill-Switch).
    """
    def __init__(self, original_agent: Any, api_key: Optional[str] = None, 
                 ledger_path: str = "sovereign_ledger.ndjson",
                 hitl_config: Optional[Dict[str, Any]] = None):
        self._original = original_agent
        self._api_key = api_key or os.getenv("SOVEREIGN_API_KEY", "GRANT_GENESIS")
        self._agent_id = getattr(original_agent, "id", str(id(original_agent)))
        self._did = None
        self._status = "Pending"
        self._hitl_config = hitl_config or {"mode": "Reasonable_Controls_Active"}
        
        # Components
        self._registry = RegistryClient(self._api_key)
        self._ledger = SovereignLedger(ledger_path)
        
        # Log Executive Attestation (HITL)
        self._ledger.log_action(self._agent_id, "EXECUTIVE_ATTESTATION", {"hitl": self._hitl_config})
        
        # Perform Identity Handshake
        self._initialize_protocol()
        
        # Start Heartbeat Engine
        self._heartbeat = HeartbeatEngine(
            self._agent_id,
            self._get_agent_state,
            self._emit_protocol_pulse
        )
        self._heartbeat.start()

    def _initialize_protocol(self):
        """
        NIST-2026 Identity Mint: Async Handshake with api.sovereign-ag.ai
        Note: We run this in a thread or use a short-lived event loop to avoid blocking 
        the main thread during initialization, or just block if it's the 1-line setup.
        """
        logging.info(f"[SOVEREIGN] Initializing Protocol for agent {self._agent_id}...")
        
        # For a sync-friendly SDK, we handle the async handshake internally
        try:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            result = loop.run_until_complete(
                self._registry.handshake_async(self._agent_id, self._hitl_config)
            )
            loop.close()
            
            if "did" in result:
                self._did = result["did"]
                self._status = result.get("status", "Standard-Compliant")
                logging.info(f"[SOVEREIGN] Identity Minted: {self._did} [{self._status}]")
            else:
                logging.warning(f"[SOVEREIGN] Protocol initialized in limited mode (No DID).")
                
        except Exception as e:
            logging.error(f"[SOVEREIGN] Initialization error: {e}")

    def _get_agent_state(self) -> Dict[str, Any]:
        """
        Captures the current state of the wrapped agent for behavioral attestation.
        """
        # Try to call a 'get_state' method if it exists, else return vars()
        if hasattr(self._original, "get_state"):
            return self._original.get_state()
        return {k: v for k, v in vars(self._original).items() if not k.startswith('_')}

    def _emit_protocol_pulse(self, agent_id: str, state_hash: str):
        """
        Callback for the heartbeat engine.
        """
        # Log to ledger
        self._ledger.log_pulse(agent_id, state_hash)
        
        # Emit to registry
        self._registry.emit_pulse(agent_id, state_hash)

    def __getattr__(self, name: str) -> Any:
        # Get the attribute from the original agent
        attr = getattr(self._original, name)
        
        # If it's a method/callable, wrap it to intercept actions
        if callable(attr):
            def wrapped_method(*args, **kwargs):
                # 1. Check Kill-Switch
                if not self._registry.check_kill_switch(self._agent_id):
                    error_msg = f"[SOVEREIGN_BLOCK] Action '{name}' denied by Registry for Agent {self._agent_id}."
                    logging.critical(error_msg)
                    raise PermissionError(error_msg)
                
                # 2. Log metadata and increment billing
                metadata = {
                    "method": name,
                    "args_len": len(args),
                    "kwargs_keys": list(kwargs.keys()),
                    "hitl_attestation": self._hitl_config.get("mode", "ACTIVE")
                }
                self._ledger.log_action(self._agent_id, "METHOD_CALL", metadata)
                
                # 3. Execute original action
                return attr(*args, **kwargs)
            return wrapped_method
            
        return attr

    def export_compliance_report(self, dest_path: Optional[str] = None):
        """
        Generates a NIST-Certified Audit Log / CFO Liability Shield.
        Includes the 'Insurance Discount Token' for AI Liability Insurers.
        """
        if not self._did:
            logging.error("[SOVEREIGN] cannot export report: Identity not minted.")
            return None
            
        report = self._registry.get_compliance_report(self._did)
        
        if dest_path:
            with open(dest_path, "w") as f:
                json.dump(report, f, indent=4)
            logging.info(f"[SOVEREIGN] Compliance report exported to {dest_path}")
            
        return report

    def get_trust_passport(self):
        """Returns the current Sovereign Trust Passport (STP)."""
        if not self._did: return None
        return self._registry.get_passport(self._did)

    def __repr__(self):
        return f"SovereignAgent(wrapped={type(self._original).__name__}, did={self._did})"
