from flask import Flask, request, jsonify
from flask_cors import CORS
import time
import json
import os
import threading
from src.escrow_manager import ForensicAuditor
from src.p2p_mesh import start_mesh_service

app = Flask(__name__)
CORS(app) # Enable CORS for Dashboard access

DB_FILE = 'sovereign_db.json'
LEDGER_FILE = 'sovereign_ledger.ndjson'
db_lock = threading.Lock()
auditor = ForensicAuditor()
mesh = start_mesh_service("VALIDATOR_NODE_01")

BASELINE_HASH = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"

def load_db():
    default_db = {
        "agents": [], 
        "total_heartbeats": 0, 
        "organizations": [{"id": "sovereign-org", "unbilled_assessments": 0, "settlement_threshold": 1000}]
    }
    with db_lock:
        if not os.path.exists(DB_FILE):
            return default_db
        try:
            with open(DB_FILE, 'r') as f:
                data = json.load(f)
                if not isinstance(data, dict):
                    return default_db
                
                db = {
                    "agents": data.get("agents", []),
                    "total_heartbeats": data.get("total_heartbeats", 0),
                    "organizations": data.get("organizations", default_db["organizations"])
                }
                
                # Force types to prevent indexing into int or iteration over int
                if not isinstance(db["agents"], list):
                    db["agents"] = []
                if not isinstance(db["total_heartbeats"], (int, float)):
                    db["total_heartbeats"] = 0
                if not isinstance(db["organizations"], list):
                    db["organizations"] = default_db["organizations"]
                    
                return db
        except Exception:
            return default_db

def save_db(db):
    with db_lock:
        with open(DB_FILE, 'w') as f:
            json.dump(db, f, indent=2)

@app.route('/api/stats', methods=['GET'])
def get_stats():
    db = load_db()
    
    # Calculate revenue and metrics to match Dashboard expectation
    agents = db.get("agents", [])
    mints = len(agents) if isinstance(agents, list) else 0
    actions = 0
    pulses = 0
    
    if os.path.exists(LEDGER_FILE):
        with open(LEDGER_FILE, 'r') as f:
            for line in f:
                try:
                    entry = json.loads(line)
                    if not isinstance(entry, dict): continue
                    etype = (entry.get('Type') or entry.get('type') or 'ACTION').upper()
                    if etype == 'ACTION': 
                        actions += 1
                    elif etype == 'PULSE': 
                        pulses += 1
                except Exception: 
                    pass

    total_yield = float(mints * 1.0 + actions * 0.01 + pulses * 0.0001)
    orgs = db.get("organizations", [])
    org = orgs[0] if orgs and isinstance(orgs, list) and isinstance(orgs[0], dict) else {"unbilled_assessments": 0, "settlement_threshold": 1000}
    
    return jsonify({
        "success": True,
        "totalActiveAgents": mints,
        "totalVerifications": actions + pulses,
        "usageLedgerCount": actions + pulses,
        "totalRevenue": total_yield,
        "realizedRevenue": total_yield * 0.95,
        "liabilityMitigated": actions * 12.5,
        "avgTrustScore": 98.5,
        "avgFairnessScore": 99.4,
        "unbilledAssessments": org.get('unbilled_assessments', 0),
        "settlementThreshold": org.get('settlement_threshold', 1000),
        "protocolMode": "INSTITUTIONAL"
    }), 200

@app.route('/api/revenue', methods=['GET'])
def get_revenue():
    revenue_file = 'sovereign_revenue.json'
    if not os.path.exists(revenue_file):
        return jsonify({
            "total_revenue": 0.0, 
            "breakdown": {"mint": 0, "pulse": 0, "action": 0},
            "vaults": {"Infrastructure": 0, "Reserve": 0, "Treasury": 0}
        }), 200
    with open(revenue_file, 'r') as f:
        data = json.load(f)
    return jsonify(data), 200

@app.route('/register', methods=['POST'])
def register():
    db = load_db()
    data = request.json
    if not data: return jsonify({"error": "No data"}), 400
    did = data.get('did')
    if not did: return jsonify({"error": "No DID"}), 400
    
    agents = db.get("agents", [])
    if not isinstance(agents, list):
        agents = []
        db["agents"] = agents
        
    if not any(isinstance(a, dict) and a.get('did') == did for a in agents):
        agents.append({
            "did": did, "alias": did[:8], "trust_score": 98.5, "status": "ACTIVE", "timestamp": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
        })
        auditor.track_revenue(event_type="mint", count=1)
        save_db(db)
    return jsonify({"success": True, "did": did}), 201

@app.route('/heartbeat', methods=['POST'])
def heartbeat():
    did = request.headers.get('X-Sovereign-DID')
    state_hash = request.headers.get('X-Sovereign-State-Hash')
    
    # Type-402 Behavioral Drift Check
    if state_hash and state_hash != BASELINE_HASH:
        # Trigger Forensic Severance
        auditor.log_forensic_severance(did)
        
        # Update State to FAIL_CLOSED
        db = load_db()
        agents = db.get("agents", [])
        if isinstance(agents, list):
            for agent in agents:
                if isinstance(agent, dict) and agent.get("did") == did:
                    agent["status"] = "FAIL_CLOSED"
                    agent["alias"] = f"FAIL-CLOSED-{did[:4]}"
                    break
        save_db(db)
        
        return jsonify({"status": "FAIL_CLOSED", "reason": "Behavioral Drift Detected"}), 402

    # Record pulse into ledger
    pulse_entry = {"type": "PULSE", "did": did, "timestamp": time.time()}
    with open(LEDGER_FILE, 'a') as f:
        f.write(json.dumps(pulse_entry) + "\n")
    
    auditor.track_revenue(event_type="pulse", count=1)
    return jsonify({"status": "SYNCED"}), 200

@app.route('/api/quickstart', methods=['GET'])
def get_quickstart():
    with open('sovereign_quickstart.py', 'r') as f:
        return f.read(), 200, {'Content-Type': 'text/plain'}

if __name__ == '__main__':
    app.run(port=5001, threaded=True)
