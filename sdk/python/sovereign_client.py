# Project: Sovereign AG SDK
# License: Sovereign Source-Available License (SSAL) v1.0
# Copyright (c) 2026 Sovereign AG.
try:
    from .sovereign_agent.core import SovereignAgent
except ImportError:
    from sovereign_agent.core import SovereignAgent

# Convenience export for the Sovereign Python SDK
# Follows the Sovereign-Client naming standard
SovereignClient = SovereignAgent

