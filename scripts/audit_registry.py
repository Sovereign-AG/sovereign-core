import json

DB_FILE = r'c:\Users\Aditya\Desktop\Sovereign AG\sovereign_db.json'
DEFAULT_HASH = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" # SHA-256 of empty string as default

def audit_db():
    print(f"Auditing {DB_FILE}...")
    with open(DB_FILE, 'r') as f:
        db = json.load(f)
    
    modified = False
    missing_count = 0
    for agent in db.get('agents', []):
        if 'baseline_state_hash' not in agent:
            agent['baseline_state_hash'] = DEFAULT_HASH
            missing_count += 1
            modified = True
    
    if modified:
        print(f"Fixed {missing_count} agents missing baseline_state_hash.")
        with open(DB_FILE, 'w') as f:
            json.dump(db, f, indent=2)
        print("Database updated.")
    else:
        print("All agents have baseline_state_hash. Integrity confirmed.")

if __name__ == "__main__":
    audit_db()
