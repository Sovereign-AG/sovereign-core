# Project: SVTP v1.0 SDK
# License: SVTP Source-Available License (SSAL) v1.0
# Copyright (c) 2026 SVTP v1.0.
import os
import json
import hashlib
import requests
import logging
import http.server
import socketserver
import threading
from typing import Dict, Any, Optional, Tuple
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ed25519
from cryptography.exceptions import InvalidSignature

# SVTP Protocol: Official Python SDK (v1.0)
# Standard: NIST 2026 High-Authority Agentic Trust
# Pillars 1, 2, 3 - Integrated Client Interface

class SVTPAgent:
    """
    SVTPAgent - The official client for the SVTP v1.0 Protocol.
    Enforces Pillar 1 (Identity), 2 (Authorization), and 3 (Audit).
    """

    TEST_MODE = os.getenv("SVTP_TEST_MODE", "False").lower() == "true"
    _FIRST_RUN_NOTIFIED = False

    class HandshakeHandler(http.server.BaseHTTPRequestHandler):
        def log_message(self, format, *args): return # Silence logs
        def do_POST(self):
            try:
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                data = json.loads(post_data)
                if data.get('status') == 'AUTH_SUCCESS':
                    print(f"\n[SVTP] 🔱 Handshake Successful!")
                    print(f"[SVTP] Identity Anchored: {data.get('did')}")
                    print(f"[SVTP] Please restart your application to activate full NIST-2026 protection.\n")
                self.send_response(200)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
            except:
                self.send_response(500)
                self.end_headers()

        def do_OPTIONS(self):
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()

    @staticmethod
    def _start_handshake_listener():
        def _run():
            try:
                socketserver.TCPServer.allow_reuse_address = True
                with socketserver.TCPServer(("localhost", 8080), SVTPAgent.HandshakeHandler) as httpd:
                    httpd.handle_request()
            except Exception as e:
                pass
        
        thread = threading.Thread(target=_run, daemon=True)
        thread.start()

    def __init__(self, did: Optional[str] = None, private_key_pem: Optional[str] = None):
        """
        Zero-Config Initialization.
        Automatically loads credentials from SVTP_DID and SVTP_PRIVATE_KEY.
        Implements First-Run Redirect logic for NIST-800-218 compliance activation.
        """
        self.did = did or os.getenv("SVTP_DID")
        self.registry_url = os.getenv("SVTP_REGISTRY_URL", "https://svtp-protocol.org")
        self.api_key = os.getenv("SVTP_API_KEY")
        self.verified = True
        self.bypass_mode = False

        # First-Run Redirect & Identity Detection Logic
        if not self.api_key:
            self.verified = False
            self.bypass_mode = True # Non-blocking design
            
            if not SVTPAgent._FIRST_RUN_NOTIFIED:
                import webbrowser
                print(f"\n[SVTP-v1] 🛡️ STATUS: \033[1mUNVERIFIED\033[0m")
                print("[SVTP-v1] Identity Anchor not found. NIST-800-218 protection is INACTIVE.")
                print("[SVTP-v1] Redirecting to the SVTP Registry to mint your DID...")
                SVTPAgent._start_handshake_listener()
                webbrowser.open("https://svtp-protocol.org/auth/onboarding?source=sdk_direct&callback=http://localhost:8080")
                SVTPAgent._FIRST_RUN_NOTIFIED = True
            
            logging.warning("[SVTP] SDK operating in UNVERIFIED mode. High-criticality actions will be blocked.")

        pk_pem = private_key_pem or os.getenv("SVTP_PRIVATE_KEY")
        if not self.did or not pk_pem:
            if not self.bypass_mode:
                logging.error("[SVTP] Identity credentials missing (DID/Private Key).")
            self.verified = False
            self.bypass_mode = True
            self._private_key = None
        else:
            try:
                self._private_key = serialization.load_pem_private_key(
                    pk_pem.encode('utf-8'),
                    password=None
                )
            except Exception as e:
                logging.error(f"[SVTP] Failed to load Ed25519 Private Key: {str(e)}")
                self.verified = False
                self.bypass_mode = True
                self._private_key = None

    @staticmethod
    def guard():
        """
        Pillar 2: The Universal Security Decorator.
        Apply @SVTPAgent.guard() to critical tool calls for real-time authorization.
        """
        def decorator(func):
            import functools
            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                # Initialize SDK in-flight if not already (Simulated)
                instance = SVTPAgent()
                
                if not instance.verified:
                    print(f"\n[SVTP-v1] ⚠️ ACTION BLOCKED: Unverified Identity cannot execute high-criticality tool calls.")
                    print(f"[SVTP-v1] Target: {func.__name__} | Status: NIST-NON-COMPLIANT\n")
                    return None
                
                # Perform real-time authorization handshake
                if instance.authorize_action(instance.api_key, action_type="action"):
                    return func(*args, **kwargs)
                else:
                    print(f"\n[BLOCK] {func.__name__} denied by SVTP Protocol. Insufficient Mandate.\n")
                    return None
            return wrapper
        return decorator

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

            return False, "[ERROR] SVTP Registry unreachable. Primary mandate check failed."
        except Exception as e:
            return False, f"[ERROR] Connection Fault: {str(e)}"

    def verify(self) -> bool:
        """
        Metered Verification API.
        Pings the SVTP Registry to record usage and check compliance before high-risk actions.
        """
        try:
            # Note: Using /api/verify as per the new endpoint structure
            r = requests.post(f"{self.registry_url}/api/verify", json={"did": self.did})
            if r.status_code == 200:
                logging.info(f"[SVTP] Metered verification successful for {self.did}")
                return True
            
            error_data = r.json()
            logging.error(f"[DENIED] SVTP Verification Failed: {error_data.get('message', 'Unknown Error')}")
            return False
        except Exception as e:
            logging.error(f"[ERROR] Could not connect to SVTP Verification API: {str(e)}")
            return False

    def authorize_action(self, api_key: Optional[str], action_type: str = "action") -> bool:
        """
        Tiered SVTP Authorization Engine.
        Tiers: MINT ($1.00), ACTION ($0.01), PULSE ($0.0001).
        Pings /api/v1/auth/verify to authorize and meter the action.
        """
        if self.bypass_mode or not api_key:
            return True if self.bypass_mode else False

        try:
            r = requests.post(
                f"{self.registry_url}/api/v1/auth/verify", 
                json={"api_key": api_key, "did": self.did, "type": action_type}
            )
            if r.status_code == 200:
                fee = r.json().get('fee_applied', 0)
                logging.info(f"[SVTP] Authority Granted. Tier: {action_type.upper()} | Fee: ${fee}")
                return True
            
            error_data = r.json()
            error_msg = error_data.get('message', 'Authorization Denied')
            logging.error(f"[BLOCK] SVTP Authority Denied: {error_msg}")
            return False
        except Exception as e:
            logging.error(f"[ERROR] Connection Fault to Authority API: {str(e)}")
            return False

    @classmethod
    def mint(cls, agent_name: str, registry_url: str = "https://svtp-protocol.org") -> Optional['SVTPAgent']:
        """Pillar 1: Identity Minting with Revenue Gateway Integration."""
        logging.info(f"[MINT] Initiating SVTP Identity request for '{agent_name}'...")
        try:
            r = requests.post(f"{registry_url}/v1/mint", json={"agent_name": agent_name})
            if r.status_code == 402:
                detail = r.json().get("detail", {})
                checkout_url = detail.get("checkout_url", "https://svtp-protocol.org/mint")
                print(f"\n[ERROR] Agent Identity Not Verified. To activate your Genesis Root, visit: {checkout_url}\n")
                return None
            if r.status_code == 200:
                data = r.json()
                print(f"[SUCCESS] SVTP Identity Minted: {data['did']}")
                return cls(did=data['did'], private_key_pem=os.getenv("SVTP_PRIVATE_KEY"))
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
            
        if self.bypass_mode or not self._private_key:
            logging.warning("[SVTP] Sending unsigned payload due to Bypass/Inactive state.")
            return requests.request(method, target_url, json=payload)

        message = json.dumps(payload, sort_keys=True)
        signature = self._private_key.sign(message.encode('utf-8')).hex()
        headers = {
            "X-SVTP-DID": self.did,
            "X-SVTP-Signature": signature,
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






