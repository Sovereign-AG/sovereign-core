try:
    from .sovereign_agent.core import SovereignAgent
except ImportError:
    from sovereign_agent.core import SovereignAgent

# Convenience export for the Sovereign Python SDK
# Follows the Sovereign-Client naming standard
SovereignClient = SovereignAgent
