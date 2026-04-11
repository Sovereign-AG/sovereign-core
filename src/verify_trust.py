import os
import argparse
import sys
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ed25519
from cryptography.exceptions import InvalidSignature

# Sovereign Protocol: Pillar 1 (Identity) - Secondary Verification Component
# Standard: NIST 2026 Ed25519 Submission (RFC 8032)
# High-Assurance Non-Repudiation for Autonomous Agents

def verify_trust(public_key_path: str, message: str, hex_signature: str) -> bool:
    """
    Core verification logic for Sovereign AG identities.
    
    Args:
        public_key_path (str): Path to the PEM-encoded public key.
        message (str): The original data/challenge to verify.
        hex_signature (str): The signature encoded in Hex.
        
    Returns:
        bool: True if identity is verified, False otherwise.
    """
    try:
        # 1. Load Public Key from provided .pem file Path
        if not os.path.exists(public_key_path):
            print(f"CRITICAL: Key not found at {public_key_path}")
            return False

        with open(public_key_path, "rb") as key_file:
            public_key = serialization.load_pem_public_key(key_file.read())
            
        if not isinstance(public_key, ed25519.Ed25519PublicKey):
            raise TypeError("Sovereign Protocol: Expected Ed25519 public key material.")

        # 2. Convert Hex Signature back into bytes
        try:
            signature_bytes = bytes.fromhex(hex_signature)
        except ValueError:
            print("CRITICAL: Invalid hex-encoded signature provided.")
            return False

        # 3. Perform Cryptographic Verification
        # Validates the signature against the message and the public key
        public_key.verify(signature_bytes, message.encode('utf-8'))
        
        # 4. Compliance Logging (NIST 2026/NCCoE Compliant)
        print("SUCCESS: Sovereign Identity Verified. Agent intent is authentic.")
        return True

    except (InvalidSignature, Exception):
        # Result for any mismatch, tampering, or malformed input
        print("CRITICAL: Verification Failed. Potential Identity Spoofing detected.")
        return False

def main():
    """
    Command-line interface for the Sovereign secondary verification component.
    """
    parser = argparse.ArgumentParser(description="Sovereign AG: Pillar 1 Cryptographic Verification Engine")
    
    # Required CLI Arguments
    parser.add_argument("--public-key", required=True, help="Path to the .pem file for verification")
    parser.add_argument("--message", required=True, help="Original message/data to verify")
    parser.add_argument("--signature", required=True, help="Hex-encoded signature string")

    args = parser.parse_args()

    # Final execution pipeline
    verify_trust(args.public_key, args.message, args.signature)

if __name__ == "__main__":
    main()
