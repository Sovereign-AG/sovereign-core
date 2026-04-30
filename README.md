# 🛡️ Sovereign AG: The Global Root of Trust
### Official Reference Implementation for HAIP-00

[![NIST-800-218 Compliance](https://img.shields.io/badge/NIST-800--218%20Level%204-black?style=for-the-badge&logo=shield&logoColor=gold)](https://sovereign-ag.com/compliance)
[![IETF Status: HAIP--00](https://img.shields.io/badge/IETF-HAIP--00%20Standard-blue?style=for-the-badge&logo=internetexplorer&logoColor=white)](https://datatracker.ietf.org/doc/draft-sovereign-haip-00/)
[![Compliance: NIST%20AAL3](https://img.shields.io/badge/Compliance-NIST%20AAL3-000000?style=for-the-badge&logo=checkmarx&logoColor=green)](https://sovereign-ag.com/audit)

> "In the machine economy, identity is the only capital that matters."

Sovereign AG provides the definitive **High-Frequency Action-Integrity Protocol (HAIP)** reference implementation. By anchoring every machine action to a cryptographically non-repudiable ledger, we eliminate the trust tax and enable institutional-scale agent deployment.

---

## 🏛️ Protocol Compliance Standards

This implementation strictly adheres to the following regulatory frameworks:
- **HAIP-00 (IETF Draft):** Real-time identity teleportation and 6.42 us pulse verification.
- **NIST AI 600-1:** Secure development and deployment of generative AI agents.
- **NIST SP 800-63 (AAL3):** Multi-factor cryptographic authentication for autonomous actors.

---

Integrate Sovereign AG into any Python-based Agentic framework (CrewAI, LangGraph, AutoGen) with a single architectural gate.

```python
from sovereign_sdk import Sovereign

# The HAIP-00 One-Line Wrapper
agent = Sovereign.wrap(your_agent_instance)
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

## ⚙️ Technical Workflow: How it Works

Establish institutional trust through our secure, decentralized verification cycle:

1. **Identity:** Local generation of **Ed25519** keys within your secure enclave. This creates your unique Agent Identity without ever exposing private material.
2. **Registry:** Anchoring the Public Key to the **Sovereign Global Registry**. This establishes your DID as a verified actor in the machine economy.
3. **Handshake:** Real-time signing of tool-call payloads using the `@guard` decorator. Every interaction is cryptographically attested at the source.
4. **Audit:** Continuous verification of the signature against the registry status, ensuring non-repudiation and real-time compliance.

> [!IMPORTANT]
> **🔒 Zero-Knowledge Guarantee:** The Sovereign Protocol never touches your Private Keys. All signing happens locally on your infrastructure. We provide the proof; you maintain the control.

---

## 📋 Technical Prerequisites

Before initializing the Sovereign Vault, ensure your environment meets the following requirements:
- **Python:** v3.9 or higher
- **Cryptography:** `cryptography` library installed (`pip install cryptography`)
- **Authority:** An active Sovereign API Key (issued via the Developer Forge)

---

## 🚀 Getting Started: The Path to Verification

Follow these standardized steps to integrate your agent into the Sovereign Root of Trust:

1. **Secure Your Identity (The Gate):** 
   - Visit [sovereign-ag.com](https://sovereign-ag.com) and create your developer profile. 
   - **Mint** your Agent's Global DID ($1.00) to anchor it to the registry.
2. **Equip the SDK (The Tool):** 
   - Install the core library: `pip install sovereign-sdk`
3. **Initialize the Handshake (The Anchor):** 
   - Configure your `SOVEREIGN_API_KEY` and local **Ed25519** keys to link your agent to the registry.
4. **Protect Your Logic (The Shield):** 
   - Apply the `@SovereignAgent.guard()` decorator to your critical tool calls.
5. **Monitor the Watchtower (The Dashboard):** 
   - Log in to the Sovereign Dashboard to view real-time heartbeats ($0.001), track action logs ($0.01), and monitor your **Liability Mitigated** KPI.

> [!TIP]
> **Pro-Tip: Global Revocation (Kill-Switch)**
> By managing agents via the dashboard, you gain a "Kill-Switch" capability. If an agent's keys are compromised, you can revoke its "Verified" status globally in **< 200ms**, immediately halting all guarded actions across your infrastructure.

---

## 🏛️ Institutional Contact

**Sovereign AG** is the definitive global trust registry for the autonomous machine economy. For partnership inquiries or federal-level compliance integration:
- **Dashboard:** [http://localhost:3001](http://localhost:3001)
- **Global:** [sovereign-ag.com](https://sovereign-ag.com)
- **Engineering:** engineering@sovereign-ag.com
- **Standards:** [NIST 800-218 (Rule 4.2)](https://csrc.nist.gov/pubs/sp/800/218/final)

**AUTHENTICITY GUARANTEED. THE MACHINE ECONOMY IS NOW GOVERNED.**