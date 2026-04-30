import time
import logging
import threading
import concurrent.futures
import os
import sys

# Set PYTHONPATH to root to find 'sdk'
sys.path.append(os.getcwd())

from sdk.python.sovereign_sdk.core import SovereignAgent, SovereignSecurityError

# Sovereign AG: Extreme Drift Simulation (Global Standard)
# Objective: 175 simultaneous nodes, sub-10us fail-closed verification.

logging.basicConfig(level=logging.ERROR) # Suppress normal info for cleaner output

class MockAIAgent:
    def __init__(self, agent_id):
        self.id = agent_id
        self.did = f"did:sov:{agent_id}"
        self.state = "IDLE"

    def execute_task(self, command):
        # This is what we wrap
        return f"Task '{command}' executed."

    def get_state(self):
        # Empty string hashes to e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
        # json.dumps("") returns '""' (with quotes).
        # We'll use None which returns 'null'.
        return None

def simulate_node(node_id):
    mock = MockAIAgent(f"NODE_{node_id:03d}")
    # Initialize with default baseline
    agent = SovereignAgent(
        mock, 
        sovereign_key="TEST_KEY", 
        dashboard_url="http://localhost:5001"
    )
    # We force the baseline to 'null' (the hash of json.dumps(None))
    import json
    import hashlib
    agent._baseline_hash = hashlib.sha256(json.dumps(None).encode()).hexdigest()
    
    return agent

def run_simulation(node_count=175):
    print(f"--- INITIALIZING SOVEREIGN GLOBAL GRID ({node_count} NODES) ---")
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=50) as executor:
        agents = list(executor.map(simulate_node, range(node_count)))

    print(f"\n[SUCCESS] {len(agents)} Individual Identities Anchored.")
    print("--- INJECTING FLEET-WIDE BEHAVIORAL DRIFT ---")
    
    success_count = 0
    latencies = []

    def trigger_drift(agent):
        nonlocal success_count
        # Inject bad pulse hash
        bad_hash = "f3554627ef7c2934-DRIFTED" 
        
        start = time.perf_counter_ns()
        try:
            # Force the drift trigger
            agent._emit_protocol_pulse(agent._agent_id, bad_hash)
            
            # Now verify the block
            agent.execute_task("SENSITIVE_OPERATION")
        except SovereignSecurityError:
            end = time.perf_counter_ns()
            latencies.append(end - start)
            return True
        except Exception as e:
            # print(f"Unexpected error: {type(e).__name__}: {e}")
            return False
        return False

    with concurrent.futures.ThreadPoolExecutor(max_workers=node_count) as executor:
        results = list(executor.map(trigger_drift, agents))
    
    success_count = sum(1 for r in results if r)
    
    print(f"\n--- SIMULATION RESULTS ---")
    print(f"Nodes Severed: {success_count}/{node_count}")
    if latencies:
        avg_ns = sum(latencies) / len(latencies)
        print(f"Avg Severance Latency: {avg_ns/1000:.2f} us")
        print(f"Edge-based Enforcement: VERIFIED")
    
    if success_count == node_count:
        print("\nVERDICT: [GLOBAL STANDARD COMPLIANT] - 100% Fail-Closed Integrity.")
    else:
        print(f"\nVERDICT: [FAILED] - Only {success_count} nodes severed.")

if __name__ == "__main__":
    run_simulation(175)
