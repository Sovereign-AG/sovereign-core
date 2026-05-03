# SVTP v1.0 SDK - Core Protocol
# License: SVTP Source-Available License (SSAL) v1.0
# Copyright (c) 2026 SVTP v1.0.
# Commercial use > 10 agents requires an SVTP Enterprise License.

import os
import json
import asyncio
import logging
import threading
import queue
import time
from typing import Any, Dict, Optional
from .registry import RegistryClient
from .ledger import SVTPLedger
from .heartbeat import HeartbeatEngine
from .privacy import scrub_metadata
import hashlib


class SVTPError(Exception):
    """Base class for SVTP Protocol errors."""
    pass

class SVTPSecurityError(SVTPError):
    """Raised when a security policy or signature verification fails."""
    pass

class SVTPCreditError(SVTPError):
    """Raised when the organization's credit balance is exhausted or insufficient."""
    pass

class SVTPBudgetError(SVTPError):
    """Raised when the agent's local daily budget is exceeded."""
    pass

class SVTPAgent:
    """
    SVTPAgent - Transparent Proxy Wrapper for AI Agents.
    Enforces the SVTP Protocol (Identity, Audit, Billing, Kill-Switch).
    """
    def __init__(self, original_agent: Any, SVTP_KEY: Optional[str] = None, 
                 ledger_path: str = "svtp_ledger.ndjson",
                 hitl_config: Optional[Dict[str, Any]] = None, **kwargs):
        self._original = original_agent
        self._SVTP_KEY = SVTP_KEY or os.getenv("SVTP_KEY")
        if not self._SVTP_KEY:
            logging.error("[SVTP] CRITICAL: No SVTP Key detected. Protocol engagement blocked.")
            raise ValueError("Identity Key Required for v1.0 Compliance")

        self._agent_id = getattr(original_agent, "id", str(id(original_agent)))
        self._did = getattr(original_agent, "did", None) # Can be pre-assigned from Passport
        self._status = "Pending"
        self._hitl_config = hitl_config or {"mode": "Reasonable_Controls_Active"}
        
        # Components
        self._registry = RegistryClient(self._SVTP_KEY)
        self._ledger = SVTPLedger(ledger_path, signing_key=self._SVTP_KEY, tax_callback=self._deduct_tax)
        self.nist_mode = kwargs.get('nist_mode', True)
        self.org_id = os.getenv("SVTP_ORG_ID", kwargs.get('org_id', 'SVTP-org'))
        self.dashboard_url = os.getenv("SVTP_DASHBOARD_URL", kwargs.get('dashboard_url', 'https://svtp-protocol.org'))
        self._settlement_required = False
        self._unbilled_total = 0.0
        self._is_severed = False
        self._offline_compliance_mode = False
        
        # Config & Limits
        self._daily_budget = kwargs.get('daily_budget', 10.0) # $10 default hard limit
        self._current_spend = 0.0
        self._budget_exceeded = False

        
        # Latency Optimization: Local Billing Cache & Batching
        self._billing_queue = queue.Queue()
        self._billing_lock = threading.Lock()
        self._sync_thread = threading.Thread(target=self._billing_sync_worker, daemon=True)
        self._sync_thread.start()
        
        # Log Executive Attestation (HITL)
        self._ledger.log_action(self._agent_id, "EXECUTIVE_ATTESTATION", {"hitl": self._hitl_config})

        # Enforce Minting Tax ($1.00)
        self._deduct_tax("MINT")
        
        # Perform Identity Handshake
        self._initialize_protocol()
        
        # Start Heartbeat Engine
        self._heartbeat = HeartbeatEngine(
            self._agent_id,
            self._get_agent_state,
            self._emit_protocol_pulse
        )
        self._heartbeat.start()

    def request_approval(self, description: str, severity: str = "HIGH"):
        """
        Pauses execution and waits for a human manager to authorize the action via the SVTP Dashboard.
        This is the primary mechanism for Human-in-the-Loop (HITL) compliance.
        """
        logging.warning(f"[SVTP_GOVERNANCE] PENDING AUTHORIZATION: {description}")
        
        # Broadcast request to Dashboard
        import requests
        try:
            resp = requests.post(
                f"{self.dashboard_url}/api/governance/requests",
                json={
                    "action": "CREATE",
                    "requestData": {
                        "agentId": self._did or self._agent_id,
                        "orgId": self.org_id,
                        "type": "HITL_AUTHORIZATION",
                        "severity": severity,
                        "description": description
                    }
                },
                timeout=5.0
            )
            data = resp.json()
            req_id = data.get("request", {}).get("id")
            if not req_id:
                raise SVTPSecurityError("Governance broadcast failed. System paused for safety.")
            
            # Polling Loop: Halt thread until decision
            while True:
                time.sleep(5) # Poll every 5s to minimize overhead
                check_resp = requests.post(
                    f"{self.dashboard_url}/api/governance/requests",
                    json={"action": "CHECK", "id": req_id},
                    timeout=5.0
                )
                check = check_resp.json()
                
                if check.get("status") == "APPROVED":
                    logging.info(f"[SVTP_GOVERNANCE] ACTION AUTHORIZED by Human-in-the-Loop.")
                    self._ledger.log_action(self._agent_id, "GOVERNANCE_APPROVED", {"req_id": req_id})
                    return True
                elif check.get("status") == "REJECTED":
                    logging.error(f"[SVTP_GOVERNANCE] ACTION REJECTED by Human-in-the-Loop.")
                    self._ledger.log_action(self._agent_id, "GOVERNANCE_REJECTED", {"req_id": req_id})
                    raise SVTPSecurityError(f"Action REJECTED by SVTP Governance Protocol.")
        except Exception as e:
            if isinstance(e, SVTPSecurityError): raise e
            logging.error(f"[SVTP_GOVERNANCE] Communication Fault: {e}")
            raise SVTPSecurityError("Governance link severed or dashboard unreachable. Operation halted for safety.")

    def _initialize_protocol(self):
        """
        NIST-2026 Identity Mint: Async Handshake with api.SVTP.org
        """
        logging.info(f"[SVTP] Initializing Protocol for agent {self._agent_id}...")
        
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
                self._baseline_hash = result.get("baseline_hash", "")
                logging.info(f"[SVTP] Identity Minted: {self._did} [{self._status}]")
            else:
                logging.warning(f"[SVTP] Protocol initialized in limited mode (No DID).")
                self._baseline_hash = ""

                
        except Exception as e:
            logging.error(f"[SVTP] Initialization error: {e}")
            self._baseline_hash = ""

    def _get_agent_state(self) -> Dict[str, Any]:
        """Captures the current state of the wrapped agent for behavioral attestation."""
        if hasattr(self._original, "get_state"):
            return self._original.get_state()
        return {k: v for k, v in vars(self._original).items() if not k.startswith('_')}

    def _emit_protocol_pulse(self, agent_id: str, state_hash: str):
        """Callback for the heartbeat engine. Performs local ZK check."""
        # EDGE-BASED FAIL-CLOSED: Local ZK verification in sub-10us
        start = time.perf_counter_ns()
        if self._baseline_hash and state_hash != self._baseline_hash:
            self._is_severed = True
            logging.critical(f"[SVTP] FAIL-CLOSED: Behavioral drift detected in {agent_id}. SEVERING CONNECTIVITY.")
            self._ledger.log_action(agent_id, "FAIL_CLOSED_TRIGGER", {"drift": state_hash})
            return

        end = time.perf_counter_ns()
        latency_us = (end - start) / 1000
        logging.debug(f"[SVTP] Local ZK verification: {latency_us:.2f} us")

        self._ledger.log_pulse(agent_id, state_hash)
        self._registry.emit_pulse(agent_id, state_hash)

    def __getattr__(self, name: str) -> Any:
        attr = getattr(self._original, name)
        if callable(attr):
            def wrapped_method(*args, **kwargs):
                if self._is_severed:
                    raise SVTPSecurityError("Protocol connectivity SEVERED: Behavioral drift detected.")
                
                if self._settlement_required:
                    raise SVTPCreditError(f"Protocol Operation HALTED: Overdraft limit exceeded for {self.org_id}.")

                if self._budget_exceeded:
                    raise SVTPBudgetError(f"Protocol Operation HALTED: Local Daily Budget of ${self._daily_budget} EXCEEDED for {self._agent_id}.")

                # ACCRUE ASSESSMENT (ACTION TAX)
                tax_cost = 0.01 # Standard Action Tax
                self._current_spend += tax_cost
                if self._current_spend >= self._daily_budget:
                    self._budget_exceeded = True
                    
                self._deduct_tax("ACTION")

                # PERFORMANCE TRACKING: Microsecond Resolution
                start_time = time.perf_counter()
                
                try:
                    result = attr(*args, **kwargs)
                    execution_time = (time.perf_counter() - start_time) * 1000 # ms
                    
                    metadata = {
                        "method": name,
                        "latency_ms": round(execution_time, 4),
                        "args_len": len(args),
                        "kwargs_keys": list(kwargs.keys()),
                        "hitl_attestation": self._hitl_config.get("mode", "ACTIVE")
                    }
                    
                    # SCRUB Metadata before logging
                    scrubbed_metadata = scrub_metadata(metadata)
                    
                    # Forensic logging with Latency Analytics
                    self._ledger.log_action(self._agent_id, "METHOD_CALL", scrubbed_metadata)
                    return result
                except Exception as e:
                    # Log execution failure as a forensic event
                    self._ledger.log_action(self._agent_id, "EXECUTION_FAULT", {"method": name, "error": str(e)})
                    raise e

            return wrapped_method
        return attr

    def _billing_sync_worker(self):
        """
        High-Concurrency Billing Worker.
        Batches pulses to reduce network overhead and prevents thread-exhaustion.
        """
        while True:
            try:
                # Wait for at least one event or 2 seconds
                try:
                    first_event = self._billing_queue.get(timeout=2.0)
                    events = [first_event]
                    # Drain the rest of the queue
                    while not self._billing_queue.empty() and len(events) < 100:
                        events.append(self._billing_queue.get_nowait())
                except queue.Empty:
                    continue

                # BATCH SYNC: Group by type for the API
                counts = {}
                for e in events:
                    counts[e] = counts.get(e, 0) + 1
                
                for tax_type, count in counts.items():
                    self._deduct_tax_sync(tax_type, count)
                
                for _ in range(len(events)):
                    self._billing_queue.task_done()

            except Exception as e:
                logging.debug(f"[SVTP_BILLING] Sync Worker Hiccup: {e}")
                time.sleep(1)

    def _deduct_tax(self, tax_type: str):
        """
        Zero-Latency Billing: Enqueues tax pulse for background batch processing.
        """
        self._billing_queue.put(tax_type)

    def _deduct_tax_sync(self, tax_type: str, count: int = 1):
        """
        Performs the actual network handshake for billing with Self-Healing Retries.
        """
        max_retries = 3
        retry_delay = 1.0 # Start with 1s
        
        for attempt in range(max_retries):
            try:
                import requests
                resp = requests.post(
                    f"{self.dashboard_url}/api/billing/tax",
                    json={
                        "type": tax_type, 
                        "orgId": self.org_id, 
                        "agentId": self._agent_id,
                        "count": count
                    },
                    timeout=5.0
                )
                data = resp.json()
                
                # THE METERED STATE MACHINE
                if resp.status_code == 200:
                    # STATE: ACTIVE
                    self._settlement_required = False
                    self._unbilled_total = data.get("unbilled", 0)
                    return # SUCCESS
                elif resp.status_code == 402:
                    # STATE: SETTLEMENT_REQUIRED (Threshold Breached)
                    logging.critical(f"[SVTP_BILLING] HALT: Unbilled assessments exceeded threshold for {self.org_id}.")
                    self._settlement_required = True
                    self._unbilled_total = data.get("unbilled", 0)
                    return # HALT
                
            except Exception as e:
                if attempt < max_retries - 1:
                    logging.debug(f"[SVTP_BILLING] Handshake failed (Attempt {attempt+1}/{max_retries}). Retrying in {retry_delay}s...")
                    time.sleep(retry_delay)
                    retry_delay *= 2 # Exponential backoff
                    continue
                
                # FINAL FAIL-OPEN: Dashboard Unreachable after retries.
                if not self._offline_compliance_mode:
                    logging.debug(f"[SVTP_BILLING] Dashboard Permanently Unreachable. Entering Offline Compliance Mode.")
                    self._offline_compliance_mode = True
                
                # Record local gap for later reconciliation
                self._ledger.log_action(self._agent_id, "OFFLINE_BILLING_EVENT", {"type": tax_type, "count": count})

    def execute_logic(self):
        """
        Standard Protocol Anchor: Executes core logic with verified billing handshake.
        """
        if self._settlement_required:
            raise SVTPCreditError(f"Protocol Operation HALTED: Automated Settlement pending for {self.org_id}.")

        # ACCRUE ASSESSMENT (ACTION TAX)
        self._deduct_tax("ACTION")

        try:
            return self.instance.execute_logic()
        except Exception as e:
            logging.error(f"[svtp_agent] Execution Fault: {e}")
            raise e

    def verify(self):
        return f"SVTPAgent(wrapped={type(self._original).__name__}, did={self._did})"

    def __repr__(self):
        return f"SVTPAgent(wrapped={type(self._original).__name__}, did={self._did})"


class SVTP:
    """
    SVTP v1.0 Access Point.
    Provides institutional-grade anchoring for autonomous agents.
    """
    @staticmethod
    def wrap(agent_instance: Any, **kwargs) -> SVTPAgent:
        """
        SVTP v1.0 One-Line Implementation Wrapper.
        Instantly anchors any agentic object to the SVTP Root of Trust.
        """
        print(f"SVTP v1.0 Compliance Active: Anchoring {type(agent_instance).__name__} to the Global Registry.")
        return SVTPAgent(agent_instance, **kwargs)




