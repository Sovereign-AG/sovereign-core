import requests
import json
import os
import sqlite3
import time

# Sovereign AG: Mock Webhook Diagnostic
# Verifies Identity Activation via Revenue Gateway Mocking

BASE_URL = "http://127.0.0.1:8000"
DB_PATH = "data/sovereign.db"

def run_webhook_test():
    print("\n[SOVEREIGN REGISTRY: MOCK WEBHOOK DIAGNOSTIC]")
    print("-" * 50)
    
    did = "did:sov:MOCK-STARTUP-001"
    
    # 1. Ensure DB exists
    import sys
    sys.path.append(os.path.join(os.getcwd(), 'src'))
    from audit_logger import SovereignAuditor
    auditor = SovereignAuditor()
    
    # 2. Simulate Webhook Payload
    payload = {
        "type": "payment.succeeded",
        "data": {
            "metadata": {
                "did": did,
                "agent_name": "Mock Startup Bot"
            }
        }
    }
    
    print(f"[*] Posting Mock Webhook for {did} (TEST_MODE active on server)...")
    try:
        r = requests.post(f"{BASE_URL}/v1/dodo_webhook", json=payload)
        print(f"      Response: {r.status_code} - {r.json()}")
        
        # 3. Verify Database Status
        time.sleep(1) # Wait for sync
        is_active = auditor.is_identity_active(did)
        
        if is_active:
            print(f"\n[SUCCESS] Identity {did} ACTIVATED via Webhook.")
            print("SOVEREIGN REVENUE GATEWAY: VALIDATED.")
        else:
            print(f"\n[FAIL] Identity {did} still inactive.")
            
    except Exception as e:
        print(f"[ERROR] Registry Unreachable: {str(e)}")

if __name__ == "__main__":
    run_webhook_test()
