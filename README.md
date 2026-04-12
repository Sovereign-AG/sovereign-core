# 🛡️ Sovereign AG: The Global Root of Trust

[![NIST-800-218 Compliance](https://img.shields.io/badge/NIST-800--218%20Level%204-black?style=for-the-badge&logo=shield&logoColor=gold)](https://sovereign-ag.com/compliance)
[![Audit Status: HARDENED](https://img.shields.io/badge/Audit-Certified%20Hardened-000000?style=for-the-badge&logo=checkmarx&logoColor=green)](https://sovereign-ag.com/audit)
[![License: MIT](https://img.shields.io/badge/License-MIT-gray?style=for-the-badge)](LICENSE)

> "In the machine economy, identity is the only capital that matters."

Sovereign AG provides the definitive **Decentralized Identity (DID)** and **Trust Infrastructure** for the autonomous agent era. By anchoring every machine action to a cryptographically non-repudiable ledger, we eliminate the trust tax and enable institutional-scale agent deployment with absolute accountability.

---

## ⚡ The One-Line Security Wrapper

Integrate Sovereign AG into any Python-based Agentic framework (CrewAI, LangGraph, AutoGen) with a single architectural gate.

```python
from sovereign_sdk import SovereignAgent

@SovereignAgent.guard()
def secure_transaction(agent_id, payload):
    # This action is now NIST-800-218 compliant and audit-anchored.
    return execute_high_risk_logic(payload)
```

---

## 💎 The Sovereign Triple-Tier Economics (v0.1.0)

Trust is quantified. Sovereign AG implements a granular, triple-tier revenue model to ensure the sustainability of the global reputation ledger and NIST-certified audit trails.

1. **Identity Minting ($1.00):** One-time cryptographic DID anchoring. The entry point for institutional trust.
2. **Action Tax ($0.01):** Per high-criticality agentic interaction. Known as the **"Visa for Machines,"** this ensures every authoritative act is insured and attested.
3. **Heartbeat Sync ($0.001):** Per passive attestation. Ensures real-time NIST-800-218 compliance and "Liability Clock" updates.

By decoupling passive health ($0.001) from active authority ($0.01), Sovereign AG provides the most granular and cost-effective security layer for high-density agent fleets.

### 🧮 Revenue Formula
$$\text{Protocol Revenue} = \sum \text{Minting} + \sum (\text{Actions} \times \$0.01) + \sum (\text{Syncs} \times \$0.001)$$

---

## 🏗️ Core Architecture (The Three Pillars)

### 1. Pillar 1: Identity (Ed25519)
Every agent is issued an **Ed25519-anchored identity** (did:sov) that persists across deployments. 
- **Non-interactivity:** Verification via NIST-compliant `X-Sovereign-Signature` headers.
- **Persistence:** No more ephemeral API keys; only permanent institutional trust.

### 2. Pillar 2: Authorization (ABAC)
Enforce fine-grained **Attribute-Based Access Control** enforced by the **Sovereign Guard** engine.
- **Granularity:** Define exactly which tools an agent can touch, when, and for how much.
- **Mandates:** Real-time evaluation of transaction limits, endpoint scoping, and expiration.

### 3. Pillar 3: Audit (SHA-384 Chained Database)
Every action creates a cryptographically-linked pulse in the Sovereign Registry.
- **Non-repudiation:** Each audit row is hashed and signed to prevent tampering using a **SHA-384 Chained Database**.
- **Compliance:** The audit trail is immutable, tamper-evident, and ready for regulatory scrutiny (NIST-800-218).

---

## 🛡️ Agent Verification Protocol

Establish institutional trust in three standardized steps:

1. **Identity Minting:** The agent generates an Ed25519 keypair. The public key is anchored to the Sovereign Registry via the `/v1/mint` endpoint, creating a permanent `did:sov` identity.
2. **Cryptographic Attestation:** Every high-risk tool call or transaction must include the `X-Sovereign-DID` and `X-Sovereign-Signature` headers, proving the action originated from the verified controller.
3. **Triple Handshake Verification:** The Sovereign Gateway intercepts the request to perform a real-time validation:
   - **Identity Check:** Confirming the DID is active and the signature is authentic.
   - **Policy Guard:** Evaluating the action against Attribute-Based Access Control (ABAC) rules.
   - **Audit Commit:** Anchoring the result into the SHA-384 cryptographic chain for permanent non-repudiation.

---

## 🛠️ Rapid Onboarding

```bash
# Initialize the Sovereign Vault
powershell -File setup_secure_env.ps1

# Provision the Production Gateway
docker-compose up --build -d
```

---

## 🏛️ Institutional Contact

**Sovereign AG** is a division of **AG Pixel Studio**. For partnership inquiries or federal-level compliance integration:
- **Global:** [sovereign-ag.com](https://sovereign-ag.com)
- **Engineering:** engineering@sovereign-ag.com
- **Standards:** [NIST 800-218 (Rule 4.2)](https://csrc.nist.gov/pubs/sp/800/218/final)

**AUTHENTICITY GUARANTEED. THE MACHINE ECONOMY IS NOW GOVERNED.**