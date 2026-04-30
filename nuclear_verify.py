import json
import os
import requests
import time

BASE_URL = "http://localhost:3001"
# THE CORRECT PATHS
DB_PATH = r"c:\Users\Aditya\Desktop\Sovereign AG\dashboard\sovereign_db.json"
LEDGER_PATH = r"c:\Users\Aditya\Desktop\Sovereign AG\dashboard\sovereign_ledger.ndjson"

def verify_nuclear():
    print("\n--- NUCLEAR AUDIT FINAL VERIFICATION ---")
    
    # 1. Check Ledger for TRIAL_GENESIS and 1000 agents
    mint_count = 0
    trial_genesis_count = 0
    test_dids = []
    
    with open(LEDGER_PATH, 'r') as f:
        for line in f:
            try:
                data = json.loads(line)
                if data.get('event_type') == 'MINT':
                    mint_count += 1
                    if data.get('status') == 'TRIAL_GENESIS':
                        trial_genesis_count += 1
                    test_dids.append(data['agent_did'])
            except: pass
            
    print(f"Total Agents Registered: {mint_count}")
    print(f"Trial Genesis Status Verified: {trial_genesis_count}/1000")

    # 2. Blockage Check
    print("\n--- Post-1000 Blockage Check ---")
    payload = { "agent_name": "Infiltrator-1001", "apiKey": "sov_test_123" }
    resp = requests.post(f"{BASE_URL}/api/v1/auth/mint", json=payload, timeout=10.0)
    print(f"Agent 1001 Response: {resp.status_code}")
    if resp.status_code == 402:
        print("Blockage Successful.")

    # 3. Logic & Revenue Check ($0.00 fee)
    print("\n--- Logic & Revenue Check ($0.00 fee for Genesis) ---")
    if test_dids:
        target_did = test_dids[0]
        payload = { "apiKey": "sov_test_123", "did": target_did, "eventType": "STRESS_TEST_ACTION" }
        requests.post(f"{BASE_URL}/api/v1/auth/verify", json=payload, timeout=5.0)
        
        # Check last ledger entry
        time.sleep(1)
        with open(LEDGER_PATH, 'r') as f:
            lines = f.readlines()
            last = json.loads(lines[-1])
            print(f"Last Action Log: Event={last.get('event_type')}, Fee={last.get('fee')}, Org={last.get('org_id')}")

    # 4. TTV Metric
    print("\n--- Time-to-Verify (TTV) Metric ---")
    latencies = []
    for _ in range(20):
        start = time.time()
        requests.post(f"{BASE_URL}/api/v1/auth/verify", json=payload, timeout=5.0)
        latencies.append(time.time() - start)
    avg_ttv = (sum(latencies) / len(latencies)) * 1000
    print(f"Avg TTV: {avg_ttv:.2f}ms")

if __name__ == "__main__":
    verify_nuclear()
