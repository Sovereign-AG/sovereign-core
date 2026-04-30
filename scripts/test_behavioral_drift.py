import requests
import json
import hashlib
import time

BASE_URL = "http://localhost:3001/api/agent"

def test_drift():
    print("--- SOVEREIGN BEHAVIORAL DRIFT TEST ---")
    
    # 1. Get an active agent did from the registry
    try:
        res = requests.get(f"{BASE_URL}/list")
        agents = res.json().get('agents', [])
        if not agents:
            print("Error: No agents found in registry.")
            return
        
        target = agents[0]
        did = target['did']
        baseline = target.get('baseline_state_hash', 'APPROVED_HASH_60_DEGREE_ARCH')
        
        print(f"Targeting Agent: {target['alias']} ({did})")
        print(f"Expected Baseline: {baseline}")

        # 2. Send a valid heartbeat (matching hash)
        print("\n[STEP 1] Sending Aligned Heartbeat...")
        headers = {
            "X-Sovereign-State-Hash": baseline,
            "Content-Type": "application/json"
        }
        hb_payload = {
            "did": did,
            "type": "HEARTBEAT",
            "telemetry": {"status": "OK"}
        }
        res_ok = requests.post(f"{BASE_URL}/heartbeat", json=hb_payload, headers=headers)
        print(f"Response: {res_ok.status_code} - {res_ok.text}")

        # 3. Send a drifted heartbeat (mismatched hash)
        print("\n[STEP 2] Sending Drifted Heartbeat (Simulating Compromise)...")
        fake_hash = hashlib.sha256(b"malicious_process_state").hexdigest()
        headers_fail = {
            "X-Sovereign-State-Hash": fake_hash,
            "Content-Type": "application/json"
        }
        res_fail = requests.post(f"{BASE_URL}/heartbeat", json=hb_payload, headers=headers_fail)
        print(f"Response: {res_fail.status_code} - {res_fail.text}")
        
        if res_fail.status_code == 402:
            print("\n[SUCCESS] 402 Fail-Closed logic triggered successfully.")
        else:
            print(f"\n[FAILURE] Expected 402, got {res_fail.status_code}")

    except Exception as e:
        print(f"Test Execution Fault: {e}")

if __name__ == "__main__":
    test_drift()
