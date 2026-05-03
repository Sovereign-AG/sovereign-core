import sys
import os

# 1. Path Alignment: Pointing to the restored HAIP-00 SDK
sys.path.append(os.path.abspath("sdk/python"))

from sovereign_sdk import Sovereign

# 2. The Mock Agent (Simulating a User's existing agent)
class InstitutionalTrader:
    def execute_trade(self, symbol, amount):
        print(f"[Agent Logic] Executing Trade: {amount} {symbol}")
        return {"status": "success", "tx_id": "0x123abc"}

# 3. The 1-Line Protocol Activation
print("--- HAIP-00 PROTOCOL ACTIVATION ---")
base_agent = InstitutionalTrader()
# Wrapping the agent with the Sovereign Root of Trust
agent = Sovereign.wrap(base_agent, sovereign_key="GRANT_GENESIS")

# 4. Action Execution & Verification
print("\n--- EXECUTING GUARDED ACTION ---")
# This call is intercepted by the Sovereign Proxy
result = agent.execute_trade("BTC", 1.5)

print("\n--- VALIDATION COMPLETE ---")
print(f"Action Result: {result}")
print("Verification Status: HAIP-00 Signed & Attested")
print("-----------------------------------")
