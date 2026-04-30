import json
import os
import time
import logging

# Sovereign Protocol: Real-Time Metered Billing Engine
# Logic: Automatically deducts Action/Pulse/Mint fees from Org balances.

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("BillingEngine")

DB_PATH = "sovereign_db.json"
LEDGER_PATH = "sovereign_ledger.ndjson"
STATE_FILE = ".billing_state.json"

PRICING = {
    "MINT": 1.00,
    "ACTION": 0.01,
    "PULSE": 0.0001
}

def load_db():
    try:
        with open(DB_PATH, "r") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Failed to load DB: {e}")
        return None

def save_db(db):
    try:
        with open(DB_PATH, "w") as f:
            json.dump(db, f, indent=2)
    except Exception as e:
        logger.error(f"Failed to save DB: {e}")

def load_state():
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, "r") as f:
                return json.load(f)
        except:
            pass
    return {"last_line": 0}

def save_state(state):
    try:
        with open(STATE_FILE, "w") as f:
            json.dump(state, f)
    except:
        pass

def run_billing_cycle():
    state = load_state()
    db = load_db()
    
    if not db:
        return

    if not os.path.exists(LEDGER_PATH):
        return

    total_deduction = 0.0
    
    with open(LEDGER_PATH, "r") as f:
        lines = f.readlines()
        
    start_line = int(state.get("last_line", 0))
    new_lines = lines[start_line:]
    
    if not new_lines:
        return

    logger.info(f"Processing {len(new_lines)} new ledger entries...")

    for line in new_lines:
        try:
            entry = json.loads(line)
            event_type = str(entry.get("Type", entry.get("type", "ACTION"))).upper()
            cost = float(PRICING.get(event_type, 0.01))
            total_deduction += cost
        except:
            continue

    if total_deduction <= 0:
        state["last_line"] = len(lines)
        save_state(state)
        return

    # Apply to Master Org
    for org in db.get("organizations", []):
        if str(org.get("id")) == "sovereign-org":
            old_balance = float(org.get("balance", 500.00))
            org["balance"] = float(max(0, old_balance - total_deduction))
            logger.info(f"Deducted ${total_deduction:.4f}. New Balance: ${org['balance']:.4f}")

    save_db(db)
    state["last_line"] = len(lines)
    save_state(state)

if __name__ == "__main__":
    logger.info("Sovereign Billing Engine ACTIVE.")
    while True:
        try:
            run_billing_cycle()
        except Exception as e:
            logger.error(f"Cycle Error: {e}")
        time.sleep(5) # Real-time check every 5 seconds
