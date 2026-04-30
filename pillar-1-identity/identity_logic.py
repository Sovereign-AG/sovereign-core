import os
import json
import hashlib
from cryptography.hazmat.primitives.asymmetric import ed25519

class SovereignIdentity:
    """
    HAIP-00 Pillar I: Cryptographic Identity & Model Binding.
    Provides non-repudiable Ed25519 identity anchoring.
    """
    def __init__(self, key_path=None):
        self.key_path = key_path or "pillar-1-identity/keys/agent.key"
        self._private_key = None
        self._public_key = None
        
    def generate_keys(self):
        """Generates a new NIST-compliant Ed25519 key pair."""
        # Local-only key generation (Private keys MUST NOT be uploaded to GitHub)
        self._private_key = ed25519.Ed25519PrivateKey.generate()
        self._public_key = self._private_key.public_key()
        return self._public_key
    
    def sign_action(self, action_payload):
        """Signs an agentic action hash for non-repudiation."""
        if not self._private_key:
            raise ValueError("Identity not initialized. Private key required for signing.")
            
        message = json.dumps(action_payload, sort_keys=True).encode()
        signature = self._private_key.sign(message)
        return signature.hex()

    def get_did(self):
        """Derives the Decentralized Identifier (DID) from the public key."""
        if not self._public_key:
            return None
        pub_bytes = self._public_key.public_bytes_raw()
        return f"did:sov:{hashlib.sha256(pub_bytes).hexdigest()[:16]}"

if __name__ == "__main__":
    # Internal validation of the HAIP-00 Pillar 1 logic
    identity = SovereignIdentity()
    pub = identity.generate_keys()
    print(f"Pillar 1 DID: {identity.get_did()}")
