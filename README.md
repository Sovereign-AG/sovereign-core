# 🛡️ Sovereign AG: Autonomous AI Agent Trust Registry (v1.0-GOLD)
# Standard: NIST 2026 High-Authority Handshake (NCCoE-v1.3)

Sovereign AG is the definitive decentralized identity and authorization platform for the agentic ecosystem. By implementing a **Triple Handshake** of Identity, Authorization, and Audit, it ensures non-repudiation and high-assurance trust for AI agents in zero-trust environments.

---

## ⚡ The 3-Minute Integration (Alpha Quickstart)

Initialize your agent with the **Official Sovereign Python SDK** in under 180 seconds.

### 1. Install the SDK
```bash
pip install ./sdk/python
```

### 2. Configure Your Identity (Environment Injection)
```bash
export SOVEREIGN_DID="did:sov:YOUR-AGENT-ID"
export SOVEREIGN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----...[PEM]..."
```

### 3. Integrated Triple Handshake
```python
from sovereign_agent import SovereignAgent

# Zero-Config Initialization
agent = SovereignAgent()

# Execute a Verifiable Mandatory Action
response = agent.sign_and_send(
    target_url="http://sovereign-gateway:8000/v1/handshake",
    payload={"action": {"endpoint": "/v1/trade", "value": 500}}
)

# Immutable Audit Verification
if agent.verify_chain():
    print("Sovereign Audit Trail: 100% Consistent and Chained.")
```

---

## 🏛️ Core Architecture (The Three Pillars)

1. **Pillar 1: Identity (Ed25519)**
   - High-entropy cryptographic identities for every agent.
   - Non-interactive verification via NIST-compliant `X-Sovereign-Signature` headers.

2. **Pillar 2: Authorization (ABAC)**
   - Attribute-Based Access Control (ABAC) enforced by the **Sovereign Guard** engine.
   - Mandate evaluation (Transaction limits, Endpoint scoping, Expiration).

3. **Pillar 3: Audit (SHA-384 Chained Database)**
   - Cryptographically-chained action ledger in an indexed **SQLite** registry.
   - Total non-repudiation: Each audit row is hashed and signed to prevent tampering.

---

## 🛠️ Infrastructure & Deployment

Sovereign AG is **Cloud-Native** and ready for Kubernetes (K8s) or AWS ECS:

```bash
# Provision the Zero-Trust Environment (Windows)
powershell -File setup_secure_env.ps1

# Launch the Unified Production Gateway
docker-compose up --build -d
```

---

## 📖 SDK Documentation
For detailed developer instructions, see the [Sovereign Python SDK README](./sdk/python/README.md).

**SOVEREIGN AG: ARCHITECTURE COMPLETE. REGISTRY LIVE. SDK RELEASED. THE TRUST TAX IS VOID.**