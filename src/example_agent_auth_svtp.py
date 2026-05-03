import base64
import os
import sys
from cryptography.hazmat.primitives.asymmetric import ed25519
from cryptography.hazmat.primitives import serialization

def run_agent_demonstration():
    """
    Demonstrates how an AI Agent signs a request and how the 
    SVTP v1.0 verifier confirms its identity.
    """
    print("\n[AI AGENT: SIMULATING REQUEST SIGNING]")
    print("-" * 40)

    # 1. Prepare Message/Payload
    # In a real scenario, this is your HTTP body or a canonicalization of headers
    message = "Agent Authorization: ID=svtp-agent-01, Payload={'action': 'fetch_data'}"
    print(f"[*] Payload: {message}")

    # 2. Sign the Payload (using the Private Key stored securely in /keys)
    private_key_path = os.path.join(os.path.dirname(__file__), "..", "keys", "private_key.pem")
    
    if not os.path.exists(private_key_path):
        print(f"[ERROR] Private key not found at {private_key_path}. Run 'python src/mint_svtp_identity.py' first.")
        return

    with open(private_key_path, "rb") as f:
        private_key = serialization.load_pem_private_key(f.read(), password=None)

    # Generate the digital signature
    signature = private_key.sign(message.encode('utf-8'))
    sig_b64 = base64.b64encode(signature).decode('utf-8')
    print(f"[*] Generated Signature (Base64): {sig_b64}")

    # 3. VERIFY the Payload (using the Public Registry)
    print("\n[GATEWAY: VERIFYING AGENT TRUST]")
    print("-" * 40)
    
    # Import the verification utility
    sys.path.append(os.path.dirname(__file__))
    from verify_trust import execute_verification
    
    # Verify using the local .well-known registry
    is_trusted = execute_verification(message, sig_b64)
    
    if is_trusted:
        print("[SUCCESS] Verify(Payload, Public_Key, Signature) = TRUE")
        print("[STATUS] Agent is Authenticated. Request Proceeds.")
    else:
        print("[DENIED] Verify(Payload, Public_Key, Signature) = FALSE")
        print("[STATUS] Possible Spoofing Detected. Request Dropped.")

if __name__ == "__main__":
    run_agent_demonstration()



