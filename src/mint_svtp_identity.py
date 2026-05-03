import os
import base64
from cryptography.hazmat.primitives.asymmetric import ed25519
from cryptography.hazmat.primitives import serialization

# SVTP v1.0: Core Identity Minting Utility
# Algorithm: Ed25519 (NIST-preferred for non-repudiation)
# Standard: PKCS8 for Private Key, SubjectPublicKeyInfo for Public Key

def mint_identity(output_dir="../keys"):
    """
    Generates a new Ed25519 key pair and saves them to the specified directory.
    Uses low-level cryptography primitives for maximum trust.
    """
    print("Initializing SVTP v1.0 Identity Mint...")

    # 1. Generate Ed25519 Private Key
    private_key = ed25519.Ed25519PrivateKey.generate()

    # 2. Derive Public Key
    public_key = private_key.public_key()

    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir, mode=0o700)

    # 3. Export Private Key (PKCS8 format)
    private_pem = private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption()
    )

    # 4. Export Public Key (SubjectPublicKeyInfo format)
    public_pem = public_key.public_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.SubjectPublicKeyInfo
    )

    # 5. Define Paths
    private_path = os.path.join(output_dir, "private_key.pem")
    public_path = os.path.join(output_dir, "public_key.pem")

    # 6. Secure Write
    try:
        # Check permissions or set them if OS allows
        with open(private_path, "wb") as f:
            f.write(private_pem)
        print(f"[*] Private Key secured at: {private_path}")

        # Public key is also saved to /keys for reference (though registry will use the string)
        with open(public_path, "wb") as f:
            f.write(public_pem)
        print(f"[*] Public Key secured at: {public_path}")

        # Extract Raw Public Key for Registry
        raw_public_key = public_key.public_bytes(
            encoding=serialization.Encoding.Raw,
            format=serialization.PublicFormat.Raw
        )
        b64_public = base64.b64encode(raw_public_key).decode('utf-8')
        print(f"\n[!] Public Key (Base64) for registry: {b64_public}")

        # 7. Identity Sharding (Level 5 Compliance)
        try:
            from src.secret_sharing import shard_agent_key
            # Extract raw private bytes for sharding
            raw_private = private_key.private_bytes(
                encoding=serialization.Encoding.Raw,
                format=serialization.PrivateFormat.Raw,
                encryption_algorithm=serialization.NoEncryption()
            )
            shards = shard_agent_key(raw_private.hex(), t=3, n=5)
            
            shards_path = os.path.join(output_dir, "identity_shards.json")
            import json
            with open(shards_path, "w") as sf:
                json.dump({"did": b64_public, "shards": shards, "threshold": 3}, sf, indent=2)
            
            print(f"[*] Identity DNA Sharded across the mesh: {shards_path}")
            print(f"[*] Threshold: 3 of 5 Shards required for mathematical reconstruction.")
        except ImportError:
            print("[!] Secret Sharing module not found. Skipping sharding.")

        print("\nSVTP Identity minted successfully.")

    except Exception as e:
        print(f"[ERROR] Failed to save keys: {e}")

if __name__ == "__main__":
    # Ensure we run relative to the script's directory for consistency
    script_dir = os.path.dirname(os.path.abspath(__file__))
    keys_dir = os.path.abspath(os.path.join(script_dir, "..", "keys"))
    mint_identity(keys_dir)



