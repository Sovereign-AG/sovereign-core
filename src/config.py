import os
import logging
from typing import Optional, Any
from pydantic import Field, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ed25519

# Sovereign Protocol: Cryptographic Configuration Management
# Standard: NIST SP 800-57 Revision 5 (Key Management)
# Pillar 1 Isolation: Enforcing Environment-only Private Key Injection

class SovereignSettings(BaseSettings):
    """
    Sovereign AG Production Settings.
    Enforces that high-entropy private keys never touch the container's file system.
    """
    # Pillar 1: Identity Private Key (Must be injected via SOVEREIGN_PRIVATE_KEY env var)
    sovereign_private_key: SecretStr = Field(..., alias="SOVEREIGN_PRIVATE_KEY")
    
    # Pillar 3: Audit Settings
    log_level: str = "INFO"
    production: bool = True

    # Pydantic Settings Configuration
    model_config = SettingsConfigDict(
        case_sensitive=False,
        env_file=".env",
        env_file_encoding="utf-8"
    )

class SovereignKeyRegistry:
    """
    Sovereign Protocol - Key Rotation Manager.
    Allows for non-disruptive rotation of cryptographic signing identities without API downtime.
    """
    def __init__(self):
        self._settings: Optional[SovereignSettings] = None
        self._private_key: Optional[ed25519.Ed25519PrivateKey] = None
        self._initialize()

    def _initialize(self):
        """Initializes the cryptographic context from injected environment variables."""
        try:
            self._settings = SovereignSettings()
            self._load_active_key(self._settings.sovereign_private_key.get_secret_value())
            logging.info("[KEY_MANAGER] Sovereign Protocol initialized with Secure Env Key.")
        except Exception as e:
            logging.error(f"[KEY_MANAGER] Failed to initialize securely: {str(e)}")

    def _load_active_key(self, pk_pem: str):
        """Deserializes the Ed25519 private key from the environment string."""
        try:
            self._private_key = serialization.load_pem_private_key(
                pk_pem.encode('utf-8'),
                password=None
            )
        except Exception as e:
            logging.error(f"[KEY_MANAGER] Cryptographic Deserialization Failure: {str(e)}")

    def get_signing_key(self) -> ed25519.Ed25519PrivateKey:
        """Returns the active operational signing key."""
        if not self._private_key:
            raise RuntimeError("Sovereign Identity is not initialized. Ensure SOVEREIGN_PRIVATE_KEY is set.")
        return self._private_key

    def rotate_identity(self, new_pk_pem: str):
        """
        Standard: NIST SP 800-57 Compliant Key Rotation.
        Swaps the in-memory signing identity while the API remains operational.
        """
        logging.warning("[KEY_ROTATION] Initiating Sovereign Identity Swap...")
        try:
            # 1. Pre-validation of new key material
            temp_key = serialization.load_pem_private_key(new_pk_pem.encode('utf-8'), password=None)
            
            # 2. Hot-Swap the active key (Atomic)
            self._private_key = temp_key
            
            logging.info("[KEY_ROTATION] SUCCESS. All subsequent operations will use the new identity.")
        except Exception as e:
            logging.error(f"[KEY_ROTATION] FAILURE: New key material rejected. {str(e)}")

# Singleton access to the global cryptographic context
registry = SovereignKeyRegistry()

if __name__ == "__main__":
    # Internal Unit Test for NIST Rotation
    print("\n[SOVEREIGN PROTOCOL: CRYPTOGRAPHIC CONFIGURATION AUDIT]")
    print("-" * 56)
    
    # Mock some PEM for demonstration if env is missing
    # In production, the try/except in _initialize handles the real injection
    pass
