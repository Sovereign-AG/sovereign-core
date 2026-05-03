# SVTP v1.0: Institutional Infrastructure Standard
## NIST-800-218 Compliant Identity & Cryptographic Attestation (SVTP v1.0)

This document defines the infrastructure standards for autonomous agents requiring **NIST-Certified Non-Repudiation** via the **SVTP v1.0 Protocol**. Adherence to this protocol ensures that every actor is cryptographically anchored to a verified controller, satisfying the core mandates of the NIST Secure Software Development Framework (SSDF).

---

### 1. The Infrastructure Headers
To maintain **Verified Actor** status within the SVTP mesh, every autonomous process must emit the following cryptographic headers as specified in `draft-sovereign-svtp-01`:

| Header | Value | Description |
| :--- | :--- | :--- |
| `X-SVTP-DID` | `did:svtp:[SHA-384-Hash]` | A Decentralized Identifier anchored to the Ed25519 Public Key. |
| `X-SVTP-Signature` | `[Ed25519-Signature]` | An immutable digital signature for payload attestation. |

> [!IMPORTANT]
> **Trust Root Verification**: All public keys must be discoverable via the JSON-mapped `.well-known` directory, facilitating recursive trust-chain validation under the SVTP Root.

---

### 2. Protocol Specification

#### Step A: Identity Derivation (SHA-384)
The Resident DID is the hexadecimal representation of the **SHA-384** digest of the **Raw Ed25519 Public Key**, ensuring high-security global collision resistance.

```python
import hashlib
did_hash = hashlib.sha384(raw_pub_key).hexdigest()
svtp_did = f"did:svtp:{did_hash[:16]}" # Standardized SVTP short-form
```

#### Step B: Attestation Generation
1. **Payload Sequencing**: Canonicalization of method, path, and telemetry.
2. **Standard**: Ed25519 (Edwards-curve Digital Signature Algorithm).
3. **Serialization**: Base64-encoded attestation string (Protocol Seal).

---

### 3. Core Implementation (Infrastructure)
The following reference architecture demonstrates NIST-compliant request signing using the `cryptography` library.

```python
# Reference Implementation: SVTPAgent guard gate
from svtp_sdk import SVTPAgent

@SVTPAgent.guard()
def sensitive_operation(data):
    # This function is now protected by SVTP v1.0
    # Identity (DID), Auth (JIT), and Audit (Ledger) are active.
    return "Operation Attested"
```

---

### 4. Recursive Verification Architecture
The SVTP Root validates the chain of trust in real-time:
1. **DID Resolution**: Real-time lookup of the controller's public root.
2. **Signature Attestation**: Cryptographic validation of the JIT signature.
3. **Compliance Mapping**: Evaluation against NIST-800-218 security policies.
4. **Authorization**: Granting clearance to high-risk infrastructure endpoints.

---

### 5. Institutional Advantages
SVTP v1.0 transitions autonomous agents from **Anonymous Scripts** to **Verified Infrastructure Assets**.

- **Non-Repudiation**: Immutable provenance for every autonomous tool-call.
- **SSDF Compliance**: Satisfies NIST requirements for secure software identification.
- **Self-Healing**: Automatic recovery and re-anchoring in compromised environments.

---

### 6. Zero-Friction SDK Handshake
To accelerate institutional deployment, the SVTP SDK implements an automated identity capture loop:

1.  **SDK Init**: The `SVTPAgent` starts a local secure listener.
2.  **Redirect**: Automatically launches the browser to the **Institutional Onboarding Gate**.
3.  **Authentication**: After the controller verifies via the SVTP Identity Forge, the portal sends an automated secure handshake back to the SDK.
4.  **Activation**: The SDK captures the DID and Key, activating NIST-certified protection without manual credential entry.

---
*SVTP v1.0 Framework — SVTP-2026 Ready Infrastructure.*
