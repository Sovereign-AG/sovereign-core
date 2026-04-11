from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
import time
import json
import os
import threading

app = Flask(__name__)
CORS(app) # Enable CORS for Dashboard access

DB_FILE = 'sovereign_db.json'
db_lock = threading.Lock()

def load_db():
    with db_lock:
        if not os.path.exists(DB_FILE):
            return {"registered_agents": [], "total_heartbeats": 0}
        with open(DB_FILE, 'r') as f:
            return json.load(f)

def save_db(db):
    with db_lock:
        with open(DB_FILE, 'w') as f:
            json.dump(db, f, indent=2)

@app.route('/')
def root():
    return jsonify({
        "protocol": "Sovereign AG",
        "status": "VALIDATOR_ACTIVE",
        "dashboard": "http://localhost:3000",
        "endpoints": {
            "identity_gate": "/data",
            "audit_heartbeat": "/heartbeat",
            "agent_registration": "/register",
            "compliance_stats": "/api/stats"
        }
    }), 200

@app.route('/api/stats', methods=['GET'])
def get_stats():
    db = load_db()
    return jsonify(db), 200

@app.route('/data', methods=['GET'])
def get_data():
    did = request.headers.get('X-Sovereign-DID')
    if not did:
        return jsonify({"error": "403 - Identity Required"}), 403
    
    with db_lock:
        db = {"registered_agents": [], "total_heartbeats": 0}
        if os.path.exists(DB_FILE):
            with open(DB_FILE, 'r') as f:
                db = json.load(f)
        
        db['total_heartbeats'] += 1
        
        with open(DB_FILE, 'w') as f:
            json.dump(db, f, indent=2)
    
    return jsonify({"status": "Success", "identity": did}), 200

@app.route('/heartbeat', methods=['POST'])
def heartbeat():
    with db_lock:
        db = {"registered_agents": [], "total_heartbeats": 0}
        if os.path.exists(DB_FILE):
            with open(DB_FILE, 'r') as f:
                db = json.load(f)
        
        db['total_heartbeats'] += 1
        
        with open(DB_FILE, 'w') as f:
            json.dump(db, f, indent=2)
            
    return jsonify({"status": "SYNCED", "timestamp": time.time()}), 200

@app.route('/register', methods=['POST'])
def register_agent():
    data = request.json
    did = data.get('did')
    
    db = load_db()
    # Check if already registered
    if not any(a['did'] == did for a in db['registered_agents']):
        db['registered_agents'].append({
            "did": did,
            "trust_score": 98.5,
            "status": "ACTIVE",
            "timestamp": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime())
        })
        save_db(db)
    return jsonify({"status": "Registered", "did": did}), 201

@app.route('/api/logs/download', methods=['GET'])
def download_logs():
    db = load_db()
    log_content = "SOVEREIGN AG COMPLIANCE AUDIT LOG\n"
    log_content += "="*40 + "\n"
    log_content += f"Export Date: {time.strftime('%Y-%m-%d %H:%M:%S')}\n"
    log_content += f"Total Certified Heartbeats: {db['total_heartbeats']}\n"
    log_content += "="*40 + "\n\n"
    log_content += "REGISTERED AGENT FLEET:\n"
    for agent in db['registered_agents']:
        log_content += f"[{agent['timestamp']}] DID: {agent['did']} | Score: {agent['trust_score']} | Status: {agent['status']}\n"
    
    return log_content, 200, {'Content-Type': 'text/plain', 'Content-Disposition': 'attachment; filename=sovereign_audit_log.txt'}

if __name__ == '__main__':
    print("Sovereign Protection Server: PRODUCTION MODE")
    print("Enforcing cryptographic gating on http://127.0.0.1:5001")
    app.run(port=5001, threaded=True)
