# Project: SVTP v1.0 SDK
# License: SVTP Source-Available License (SSAL) v1.0
# Copyright (c) 2026 Sovereign AG.
import sys
import os
import webbrowser
import requests
import logging

# SVTP Protocol: Official CLI Tool (v1.0)
# Standard: Decentralized Identity & Auth Lifecycle Management

def main():
    """
    SVTP v1.0 CLI - Entry point for High-Authority Agentic Controls.
    Usage: SVTP <command> [args]
    """
    if len(sys.argv) < 2:
        print("\nSVTP Protocol CLI (v1.0)")
        print("------------------------------")
        print("Usage: SVTP [checkout | verify | status]\n")
        return

    command = sys.argv[1].lower()
    registry_url = os.getenv("SVTP_REGISTRY_URL", "http://127.0.0.1:8000")
    did = os.getenv("SVTP_DID")

    if command == "checkout":
        """
        Pillar 1: Revenue Gateway Checkout.
        Opens the specialized Dodo activation portal in the default browser.
        """
        if not did:
            print("[ERROR] SVTP_DID environment variable not set. Identity initialization required.")
            return

        print(f"[*] Retrieving SVTP Activation Portal for: {did}...")
        try:
            # Query the status endpoint to get the latest checkout URL
            r = requests.get(f"{registry_url}/v1/status/{did}")
            
            if r.status_code == 200:
                data = r.json()
                if data.get("is_active"):
                    print(f"[!] Identity {did} is already ACTIVE. Ready for Triple Handshake.")
                    return

                checkout_url = data.get("checkout_url")
                if checkout_url:
                    print(f"[!] Opening Genesis Root Activation: {checkout_url}")
                    # Standard Cross-Platform Browser Launch
                    webbrowser.open(checkout_url)
                else:
                    print("[ERROR] Internal logic failure: Checkout URL missing from Registry.")
            else:
                print(f"[ERROR] SVTP Registry returned {r.status_code}: {r.text}")
        except Exception as e:
            print(f"[ERROR] Failed to reach Registry at {registry_url}: {str(e)}")

    elif command == "status":
        """Checks the current mandate state of the agent identity."""
        if not did:
            print("[ERROR] Identity not established.")
            return
        
        try:
            r = requests.get(f"{registry_url}/v1/status/{did}")
            if r.status_code == 200:
                data = r.json()
                status = "ACTIVE" if data.get("is_active") else "LOCKED (Payment Required)"
                print(f"Identity: {did}")
                print(f"Status:   {status}")
            else:
                print(f"[ERROR] Failed to fetch status.")
        except Exception as e:
            print(f"[ERROR] Connection error: {e}")

    else:
        print(f"[ERROR] Unknown command: '{command}'. Available: checkout, status.")

if __name__ == "__main__":
    main()





