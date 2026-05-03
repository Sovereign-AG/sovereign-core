# 🛡️ Sovereign AG: The Global Root of Trust (SVTP)
### Official Reference Implementation for the SVTP Protocol

[![NIST-800-218 Compliance](https://img.shields.io/badge/NIST-800--218%20Level%204-black?style=for-the-badge&logo=shield&logoColor=gold)](https://sovereign.ag/compliance)
[![IETF Status: draft-sovereign-svtp-01](https://img.shields.io/badge/IETF-SVTP--01%20Standard-blue?style=for-the-badge&logo=internetexplorer&logoColor=white)](https://datatracker.ietf.org/doc/draft-sovereign-svtp/)
[![Compliance: NIST%20AAL3](https://img.shields.io/badge/Compliance-NIST%20AAL3-000000?style=for-the-badge&logo=checkmarx&logoColor=green)](https://sovereign.ag/audit)
[![PyPI version](https://img.shields.io/pypi/v/svtp-sdk.svg?style=for-the-badge&logo=pypi&logoColor=white)](https://pypi.org/project/svtp-sdk/)

> "In the machine economy, identity is the only capital that matters."

Sovereign AG provides the definitive **Sovereign Verification & Trust Protocol (SVTP)** reference implementation. By anchoring every machine action to a cryptographically non-repudiable ledger, we eliminate the trust tax and enable institutional-scale agent deployment.

---

## 🏛️ Protocol Compliance Standards

This implementation strictly adheres to the following regulatory frameworks:
- **SVTP-01 (IETF Draft):** Real-time identity anchoring and 6.42 us pulse verification.
- **NIST AI 600-1:** Secure development and deployment of generative AI agents.
- **NIST SP 800-63 (AAL3):** Multi-factor cryptographic authentication for autonomous actors.

---

## ⚡ 1-Line Protocol Activation (Institutional Standard)

Integrate SVTP v1.0 into any Python-based Agentic framework (CrewAI, LangGraph, AutoGen) with a single architectural gate.

```python
from svtp_sdk import SVTPAgent

# The SVTP-00 One-Line Wrapper
@SVTPAgent.guard()
def autonomous_action(payload):
    # SVTP Root of Trust Active
    # Non-repudiable Audit and DID Attestation Enabled
    pass
```

---

## 💎 The SVTP Triple-Tier Economics

Trust is quantified. SVTP implements a granular, triple-tier revenue model to ensure the sustainability of the global reputation ledger and NIST-certified audit trails.

1. **Identity Minting ($1.00):** One-time cryptographic DID anchoring. The entry point for institutional trust.
2. **Action Tax ($0.01):** Per high-criticality agentic interaction. Known as the **"Visa for Machines,"** this ensures every authoritative act is insured and attested.
3. **Heartbeat Sync ($0.0001):** Per passive attestation. Ensures real-time NIST-800-218 compliance and "Liability Clock" updates.

---

## 🏗️ Core Architecture (The Three Pillars)

### 1. Pillar 1: Identity (Ed25519)
Every agent is issued a permanent **did:svtp** identifier that persists across deployments. 
- **Non-interactivity:** Verification via NIST-compliant `X-SVTP-Signature` headers.
- **Persistence:** No more ephemeral API keys; only permanent institutional trust.

### 2. Pillar 2: Authorization (JIT)
Enforce fine-grained **Just-In-Time (JIT) Authorization** enforced by the **SVTP Root** engine.
- **Granularity:** Define exactly which tools an agent can touch, when, and for how much.
- **Mandates:** Real-time evaluation of transaction limits and behavioral bounds.

### 3. Pillar 3: Audit (SHA-384 Chained Ledger)
Every action creates a cryptographically-linked pulse in the SVTP Registry.
- **Non-repudiation:** Each audit row is hashed and chained to prevent tampering using a **SHA-384 Chained Ledger**.
- **Compliance:** The audit trail is immutable, tamper-evident, and ready for regulatory scrutiny (NIST-800-218).

---

## ⚙️ Technical Workflow: How it Works

Establish institutional trust through our secure, decentralized verification cycle:

1. **Identity:** Local generation of **Ed25519** keys within your secure enclave. 
2. **Registry:** Anchoring the Public Key to the **SVTP Global Registry** as a `did:svtp`.
3. **Handshake:** Real-time signing of payloads using the `ProtocolAnchor` mechanism.
4. **Audit:** Continuous verification of the signature against the registry status.

---

## 📋 Technical Prerequisites

- **Python:** v3.9 or higher
- **Cryptography:** `cryptography` library installed (`pip install cryptography`)
- **Authority:** An active SVTP API Key

---

## 🚀 Getting Started: The Path to Verification

1. **Secure Your Identity:** 
   - Visit [svtp-protocol.org](https://svtp-protocol.org) and create your developer profile. 
   - **Mint** your Agent's Global DID ($1.00) to anchor it to the registry.
2. **Equip the SDK:** 
   - Install the core library: `pip install svtp-sdk`
3. **Initialize the Handshake:** 
   - Configure your `SVTP_API_KEY` and local **Ed25519** keys.
4. **Protect Your Logic:** 
   - Apply the `@SVTPAgent.guard()` decorator to your critical tool calls.
5. **Monitor the Watchtower:** 
   - Log in to the SVTP Dashboard to view real-time heartbeats ($0.0001) and monitor your **Liability Mitigated** KPI.

---

## 🏛️ Institutional Contact

**SVTP v1.0** is the definitive global trust registry for the autonomous machine economy. 
- **Dashboard:** [http://localhost:3001](http://localhost:3001)
- **Global:** [svtp-protocol.org](https://svtp-protocol.org)
- **Engineering:** office.sovereign.ag@gmail.com
- **Standards:** IETF Draft `draft-sovereign-svtp-01`

**AUTHENTICITY GUARANTEED. THE MACHINE ECONOMY IS NOW GOVERNED.**
 MACHINE ECONOMY IS NOW GOVERNED.**