import json
import os
import time
from datetime import datetime

# Institutional Sovereignty Protocol - Settlement Engine v1.0.0
DB_FILE = 'sovereign_db.json'
LEDGER_FILE = 'sovereign_ledger.ndjson'

class SovereignSettlement:
    def __init__(self):
        self.units = {
            "MINT": 1_000_000,      # $1.00
            "ACTION": 10_000,      # $0.01
            "PULSE": 100           # $0.0001
        }
        self.total_units = 0
        self.mints = 0
        self.actions = 0
        self.pulses = 0
        
        print("Sovereign Settlement Engine: Initializing Tail-Stream...")
        print("Status: Waiting for real-world ledger events...", flush=True)

    def calculate_yield(self):
        # Y = (M*1M + A*10K + P*100) / 1M
        self.total_units = (self.mints * self.units["MINT"]) + \
                          (self.actions * self.units["ACTION"]) + \
                          (self.pulses * self.units["PULSE"])
        return self.total_units / 1_000_000

    def sync_db(self):
        if not os.path.exists(DB_FILE):
            db = {"registered_agents": [], "total_heartbeats": 0}
        else:
            with open(DB_FILE, 'r') as f:
                try: db = json.load(f)
                except: db = {"registered_agents": [], "total_heartbeats": 0}

        self.mints = len(db.get('registered_agents', []))
        current_yield = self.calculate_yield()
        
        db['total_yield'] = current_yield
        db['total_actions'] = self.actions
        db['total_pulses'] = self.pulses
        db['total_heartbeats'] = self.pulses # Synced heartbeat logic
        
        with open(DB_FILE, 'w') as f:
            json.dump(db, f, indent=2)
        
        print(f"[{datetime.now().strftime('%H:%M:%S')}] SETTLED: ${current_yield:,.4f} | M:{self.mints} A:{self.actions} P:{self.pulses}", flush=True)

    def process_line(self, line):
        if not line.strip(): return
        try:
            data = json.loads(line)
            rtype = data.get('Type', data.get('type', 'ACTION')).upper()
            if rtype == 'ACTION': self.actions += 1
            elif rtype == 'PULSE': self.pulses += 1
            # Note: Mints are pulled from db.json count to ensure identity-anchored math
        except Exception as e:
            print(f"Entry Fault: {e}")

    def run(self):
        # Initial Tally (Zero-Inference Start)
        if os.path.exists(LEDGER_FILE):
            with open(LEDGER_FILE, 'r') as f:
                for line in f:
                    self.process_line(line)
        
        self.sync_db()

        # Tail-Stream Listener
        with open(LEDGER_FILE, 'r') as f:
            # Move to end of file
            f.seek(0, os.SEEK_END)
            while True:
                line = f.readline()
                if not line:
                    time.sleep(0.1) # High-sensitivity polling
                    continue
                
                self.process_line(line)
                self.sync_db()

if __name__ == '__main__':
    engine = SovereignSettlement()
    try:
        engine.run()
    except KeyboardInterrupt:
        print("\nSettlement Halted.")
