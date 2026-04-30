import json
import requests
import time
import os

DASHBOARD_URL = "http://localhost:3000"
ORG_ID = "sovereign-org"

def test_settlement_flow():
    print("--- Phase 1: Assessment Accrual ---")
    
    # Trigger an ACTION tax ($0.01)
    # We'll use the API directly for the test
    resp = requests.post(f"{DASHBOARD_URL}/api/billing/tax", json={"type": "ACTION", "orgId": ORG_ID})
    print(f"Action Tax Response: {resp.status_code} - {resp.json()}")
    
    # Check DB state
    db_path = r"c:\Users\Aditya\Desktop\Sovereign AG\sovereign_db.json"
    with open(db_path, "r") as f:
        db = json.load(f)
    
    org = next(o for o in db["organizations"] if o["id"] == ORG_ID)
    print(f"Unbilled Assessments: {org['unbilled_assessments']}")
    
    if org['unbilled_assessments'] > 0:
        print("PASS: Assessment accrued.")
    else:
        print("FAIL: Assessment not accrued.")
        return

    print("\n--- Phase 2: Manual Settlement ---")
    resp = requests.post(f"{DASHBOARD_URL}/api/billing/settle", json={"orgId": ORG_ID})
    print(f"Settlement Response: {resp.status_code} - {resp.json()}")
    
    with open(db_path, "r") as f:
        db = json.load(f)
    org = next(o for o in db["organizations"] if o["id"] == ORG_ID)
    
    if org['unbilled_assessments'] == 0:
        print("PASS: Settlement cleared counter.")
    else:
        print(f"FAIL: Settlement counter is {org['unbilled_assessments']}")
        return

    print("\n--- Phase 3: Threshold Breach (Simulated) ---")
    # Wait for Dashboard cache to expire (TTL 500ms)
    time.sleep(1.0)
    
    # Manually set unbilled to 999.99
    with open(db_path, "r") as f:
        db = json.load(f)
    db["organizations"][0]["unbilled_assessments"] = 999.99
    with open(db_path, "w") as f:
        json.dump(db, f, indent=2)
    
    # Wait for write sync
    time.sleep(1.0)
    
    # Trigger one more action to cross $1000
    resp = requests.post(f"{DASHBOARD_URL}/api/billing/tax", json={"type": "ACTION", "orgId": ORG_ID})
    print(f"Threshold Breach Response: {resp.status_code} - {resp.json()}")
    
    if resp.status_code == 402:
        print("PASS: Threshold breach correctly identified (402).")
    else:
        print(f"FAIL: Expected 402, got {resp.status_code}")

if __name__ == "__main__":
    test_settlement_flow()
