import sys
import os
import time
import requests
import json
import uuid
import hashlib
from concurrent.futures import ThreadPoolExecutor

# Add SDK to path
sys.path.append(os.path.join(os.getcwd(), 'sdk', 'python'))
from sovereign_sdk import SovereignAgent

BASE_URL = "http://localhost:3001"
API_KEY = "sov_test_123"

def stage_1_auth_audit(count=1000):
    print(f"--- [NUCLEAR] Stage 1: Identity Flow Audit ({count} users) ---")
    success_count = 0
    start_time = time.time()
    
    def signup(i):
        nonlocal success_count
        email = f"user-{uuid.uuid4().hex[:10]}@stress-test.ai"
        payload = {
            "agent_name": f"Handshake-Node-{i}",
            "apiKey": API_KEY,
            "did": f"did:sov:user_{hashlib.sha256(email.encode()).hexdigest()[:16]}"
        }
        for _ in range(3):
            try:
                resp = requests.post(f"{BASE_URL}/api/v1/auth/mint", json=payload, timeout=30.0)
                if resp.status_code == 200:
                    success_count += 1
                    return
            except:
                time.sleep(0.5)

    with ThreadPoolExecutor(max_workers=5) as executor:
        for i in range(count):
            executor.submit(signup, i)
    
    print(f"Success Rate: {success_count}/{count}")
    print(f"Elapsed: {time.time() - start_time:.2f}s")

if __name__ == "__main__":
    stage_1_auth_audit(1000)
