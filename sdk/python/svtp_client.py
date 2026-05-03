# Project: SVTP v1.0 SDK
# License: SVTP Source-Available License (SSAL) v1.0
# Copyright (c) 2026 SVTP v1.0.
try:
    from .svtp_agent.core import SVTPAgent
except ImportError:
    from svtp_agent.core import SVTPAgent

# Convenience export for the SVTP Python SDK
# Follows the SVTP-Client naming standard
SVTPClient = SVTPAgent





