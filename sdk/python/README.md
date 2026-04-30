# 🛡️ Sovereign SDK: Transparent Proxy Wrapper (v1.0.0)
# Standard: NIST 2026 High-Authority Agentic Trust

The `sovereign-sdk` provides a **1-Line Integration** for any class-based AI agent (CrewAI, LangGraph, AutoGen, etc.). It acts as a high-performance transparent proxy, enforcing global governance, auditability, and behavioral attestation without modifying your agent's core logic.

---

## 🏗️ Installation (Quickstart)

Install the SDK directly into your agentic workspace:

```bash
# Install the Sovereign SDK
pip install ./sdk/python
```

---

## ⚡ 1-Line Protocol Activation

To activate the entire Sovereign protocol, simply wrap your existing agent object with the `Sovereign.wrap` method.

```python
from sovereign_sdk import Sovereign
from my_agent_library import OriginalAgent

# 1. Initialize your original agent as usual
base_agent = OriginalAgent(...)

# 2. Wrap it in the Sovereign Proxy (The HAIP-00 Standard)
agent = Sovereign.wrap(base_agent, sovereign_key="GRANT_GENESIS")

# 3. Use the agent normally - All methods are now proxied, signed, and logged
agent.run("Analyze the market for BTC-USD")
```

---

## 💎 Features & Pillars

### 1. The Wrapper Core (Transparent Proxy)
The SDK uses a dynamic proxy (`__getattr__`) to intercept every method call. 
- **Kill-Switch**: Every action is pre-verified against the Remote Sovereign Registry.
- **Audit Ledger**: Action metadata is logged to an immutable NDJSON ledger.
- **Shadow Billing**: Every intercepted action increments a standard $0.01 fee.

### 2. NIST-2026 Identity Mint
On initialization, the SDK performs an **Async Handshake**.
- Uses `GRANT_GENESIS` for frictionless entry.
- Mints a **Verifiable DID** (`did:sov:xxxx`) upon success.
- Marks agents as 'Standard-Compliant'.

### 3. The Heartbeat Engine (Behavioral Attestation)
A background pulse engine emits a cryptographic hash of the agent's state every 10 seconds.
- Ensures the agent has not deviated from its intended logic.
- Each pulse is logged as a $0.01 transaction in the Shadow Ledger.

---

## 🔍 Fail-Safe Governance

If the Sovereign Registry is unreachable, the SDK triggers a configurable **Fail-Safe** mechanism:
- `BLOCK` (Default): Denies high-risk actions until connectivity is restored.
- `LOG`: Records actions locally in the ledger for deferred synchronization.

```python
import os
os.environ["SOVEREIGN_FAIL_SAFE"] = "LOG" # Change to 'BLOCK' for maximum security
```

---

## 🏛️ Deployment (NIST SP 800-57 Compliant)

This SDK follows the latest NIST recommendations for cryptographic key management. **SOVEREIGN PROTOCOL: THE UNIVERSAL STANDARD FOR AGENTIC ACCOUNTABILITY.**
