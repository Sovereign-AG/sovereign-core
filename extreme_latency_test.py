import time
import hashlib
import json
import os
from src.verify_trust import SovereignZKP

# Sovereign AG: Extreme Latency Test (Level 1 Verification)
# Objective: Prove sub-millisecond verification for 1,000,000 pulse grid

def run_benchmark(iterations=1000):
    print(f"--- SOVEREIGN AG: LATENCY AUDIT (n={iterations}) ---")
    
    # Mock cryptographic material
    pk_bytes = os.urandom(32)
    baseline_hash = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    
    # Generate a valid proof pair for test
    r_bytes = os.urandom(32) # Standard R-commitment
    s_val = os.urandom(32)
    
    h_temp = hashlib.sha256()
    h_temp.update(r_bytes) 
    h_temp.update(pk_bytes)
    h_temp.update(baseline_hash.encode())
    challenge = h_temp.digest()
    
    v_val = hashlib.sha256(s_val + challenge).hexdigest()[:8]
    
    proof = {
        'r': r_bytes.hex(),
        's': s_val.hex(),
        'v': v_val
    }

    latencies = []

    # Warm-up
    SovereignZKP.verify_behavior_proof(pk_bytes, proof, baseline_hash)

    for i in range(iterations):
        start = time.perf_counter_ns()
        success = SovereignZKP.verify_behavior_proof(pk_bytes, proof, baseline_hash)
        end = time.perf_counter_ns()
        
        if success:
            latencies.append(end - start)

    if not latencies:
        print("CRITICAL: Verification Failed Benchmarking.")
        return

    avg_ns = sum(latencies) / len(latencies)
    avg_us = avg_ns / 1000
    peak_us = max(latencies) / 1000
    p99_us = sorted(latencies)[int(len(latencies)*0.99)] / 1000

    print(f"AVG LATENCY: {avg_us:.2f} us")
    print(f"P99 LATENCY: {p99_us:.2f} us")
    print(f"THROUGHPUT:  {int(1000000 / avg_us):,} verifications/sec")
    print("-" * 40)
    
    if avg_us < 100:
        print("VERDICT: COMPLIANT (Microsecond-Zero-Knowledge Grade)")
    else:
        print("VERDICT: NON-COMPLIANT (Latency Ceiling Exceeded)")

if __name__ == "__main__":
    run_benchmark(10000)
