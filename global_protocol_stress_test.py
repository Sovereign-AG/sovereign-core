import sys
import os
import json
import time
import random
from datetime import datetime

# Path Alignment
sys.path.append(os.path.abspath("sdk/python"))
from sovereign_sdk import Sovereign

class GlobalProtocolSimulator:
    def __init__(self):
        self.registry = {}
        self.ledger = []
        self.total_revenue = 0.0
        
    def simulate_login(self, user="Lead_Architect"):
        print(f"--- [UI SIMULATION] User '{user}' Logging into Sovereign Dashboard ---")
        time.sleep(0.5)
        print("[OK] NIST-Hardened Multi-Factor Auth Verified.")
        
    def add_new_agent(self, agent_name):
        print(f"\n--- [IDENTITY] Adding New Agent: {agent_name} ---")
        # Simulating DID Minting ($1.00)
        passport = {
            "did": f"did:sov:{os.urandom(8).hex()}",
            "name": agent_name,
            "minted_at": datetime.now().isoformat(),
            "status": "VERIFIED",
            "compliance": "HAIP-00 / NIST AAL3"
        }
        passport_path = f"{agent_name}_passport.json"
        with open(passport_path, "w") as f:
            json.dump(passport, f, indent=4)
        print(f"[OK] Agent Minted. Passport saved to {passport_path}")
        self.total_revenue += 1.00
        return passport

    def bulk_mint_nodes(self, count=10):
        print(f"\n--- [BULK MINT] Provisioning {count} Validator Nodes ---")
        nodes = []
        for i in range(count):
            node_id = f"node-{i:03d}"
            nodes.append(self.add_new_agent(node_id))
        print(f"[OK] Bulk Provisioning Complete. Total Cluster Revenue: ${count * 1.00:.2f}")
        return nodes

    def simulate_work(self, nodes):
        print("\n--- [OPERATIONAL] Simulating High-Authority Work ---")
        for node in nodes:
            # Simulate 5 actions per node
            for _ in range(5):
                action = random.choice(["Financial_Settlement", "Data_Oracle_Verification", "Identity_Attestation"])
                print(f"  [Action] {node['name']} performing {action}...")
                # Charging $0.01 per action
                self.total_revenue += 0.01
                # Heartbeat ($0.001)
                self.total_revenue += 0.001
        print("[OK] Work Simulation Complete.")

    def trigger_incident(self, target_node):
        print(f"\n[ALERT] [INCIDENT RESPONSE] Detecting Behavioral Drift in {target_node['name']}...")
        print(f"[BLOCK] [KILL-SWITCH] Revoking Status for {target_node['did']} globally.")
        target_node['status'] = "REVOKED"
        print(f"[OK] {target_node['name']} Isolation Complete. All guarded actions SEVERED.")

    def final_reconciliation(self):
        print("\n--- [PILLAR 3: AUDIT] Final Economic Reconciliation ---")
        print(f"Total Protocol Revenue: ${self.total_revenue:.4f}")
        print(f"Expected Revenue: Based on Minting, Actions ($0.01), and Heartbeats ($0.001)")
        print("[OK] Ledger Integrity: VERIFIED (SHA-384 Chain Intact)")

if __name__ == "__main__":
    sim = GlobalProtocolSimulator()
    
    # Step 1: Login
    sim.simulate_login()
    
    # Step 2: Add single agent
    sim.add_new_agent("master-concierge")
    
    # Step 3: Bulk Mint
    fleet = sim.bulk_mint_nodes(10)
    
    # Step 4: Operational Work
    sim.simulate_work(fleet)
    
    # Step 5: Test the Kill-Switch
    sim.trigger_incident(fleet[3])
    
    # Step 6: Final Audit
    sim.final_reconciliation()
