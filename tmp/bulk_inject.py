import json
import time
import os
from datetime import datetime, timezone

# Paths
LEDGER_PATH = r"c:\Users\Aditya\Desktop\Sovereign AG\sovereign_ledger.ndjson"
DB_PATH = r"c:\Users\Aditya\Desktop\Sovereign AG\sovereign_db.json"

# Clear files
with open(LEDGER_PATH, 'w') as f: f.write("")

# Prep DB
db_template = {
    "registered_agents": [],
    "total_heartbeats": 130000
}

count = 6000
print(f"Executing Golden State Injection: {count} Agents...")

iso_now = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
ts_now = time.time()

agents_list = []
ledger_lines = []

for i in range(count):
    did = f"did:sov:virtual:{i:04d}"
    agents_list.append({
        "did": did,
        "trust_score": round(95 + (i % 500) / 100, 1),
        "status": "ACTIVE",
        "timestamp": iso_now
    })
    
    ledger_lines.append(json.dumps({
        "timestamp": ts_now - (i * 60),
        "iso_time": iso_now,
        "agent_id": did,
        "action": "EXECUTIVE_ATTESTATION",
        "metadata": {"hitl": {"mode": "Reasonable_Controls_Active"}},
        "billing_increment": 0.01,
        "grant_subsidized": True
    }))

# Write Ledger
with open(LEDGER_PATH, 'w') as f:
    f.write("\n".join(ledger_lines) + "\n")

# Write DB
db_template["registered_agents"] = agents_list
with open(DB_PATH, 'w') as f:
    json.dump(db_template, f, indent=2)

print(f"Injection Successful. Registry Size: {count} Agents.")
