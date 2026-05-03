import re
import json
from typing import Any, Dict, Union

class PrivacyShield:
    """
    SVTP Privacy Shield.
    Locally scrubs PII (Personally Identifiable Information) before metadata egress.
    """
    
    # regex patterns for common PII
    PATTERNS = {
        "email": r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+',
        "credit_card": r'\b(?:\d[ -]*?){13,16}\b',
        "api_key": r'(?:key|token|auth|secret|pass|pwd|password|sk-)[:=]\s*["\']?([a-zA-Z0-9_\-\.]{16,})["\']?',
        "ipv4": r'\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b'
    }

    @staticmethod
    def scrub(data: Union[Dict, str, Any]) -> Any:
        """Recursively scrubs data of PII patterns."""
        if isinstance(data, dict):
            return {k: PrivacyShield.scrub(v) for k, v in data.items()}
        elif isinstance(data, list):
            return [PrivacyShield.scrub(v) for v in data]
        elif isinstance(data, str):
            scrubbed = data
            for label, pattern in PrivacyShield.PATTERNS.items():
                scrubbed = re.sub(pattern, f"[REDACTED_{label.upper()}]", scrubbed)
            return scrubbed
        return data

def scrub_metadata(metadata: Dict[str, Any]) -> Dict[str, Any]:
    """Public access point for metadata scrubbing."""
    return PrivacyShield.scrub(metadata)





