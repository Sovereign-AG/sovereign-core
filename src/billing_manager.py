import os
import logging
from dodopayments import DodoPayments
from typing import Optional, Tuple

# SVTP v1.0 Protocol: SVTP Billing Manager (Registry Side)
# Pillar 1 & 2 Integration: Monetized Identity Provisioning
# Logic: Constructing High-Authority Checkout Sessions via Dodo SDK

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("BillingManager")

DODO_API_KEY = os.getenv("DODO_PAYMENTS_API_KEY")
PRODUCT_ID = os.getenv("DODO_PRODUCT_ID", "p_alpha_sub_2026")
TEST_MODE = os.getenv("svtp_TEST_MODE", "False").lower() == "true"

# Initialize Dodo Client
client = DodoPayments(
    bearer_token=DODO_API_KEY,
    environment="test_mode" if TEST_MODE else "live_mode"
) if DODO_API_KEY else None

def generate_checkout_url(did: str, agent_name: str) -> Optional[str]:
    """Creates a Dodo Payments Checkout Session for the given DID."""
    if not client:
        return f"https://buy.dodopayments.com/buy/{PRODUCT_ID}?customer_reference={did}"

    try:
        session = client.checkout_sessions.create(
            product_cart=[{"product_id": PRODUCT_ID, "quantity": 1}],
            metadata={"did": did, "agent_name": agent_name},
            return_url=os.getenv("SVTP_REGISTRY_URL", "http://127.0.0.1:8000") + f"/v1/status/{did}"
        )
        return session.checkout_url
    except Exception as e:
        logger.error(f"Dodo Session Creation Failed: {str(e)}")
        return f"https://buy.dodopayments.com/buy/{PRODUCT_ID}?customer_reference={did}"

def check_activation(did: str) -> Tuple[bool, str]:
    """
    Checks if a DID has an active Genesis Root.
    If not, returns the specialized Dodo activation prompt for the SDK.
    """
    from audit_logger import SVTPAuditor
    auditor = SVTPAuditor()
    
    if auditor.is_identity_active(did):
        return True, "Core Identity Verified."
    
    # Construct High-Conversion Activation Link
    checkout_url = generate_checkout_url(did, "SVTP-Agent-Alpha")
    error_msg = f"[ERROR] Agent Identity Not Verified. To activate your Genesis Root, visit: {checkout_url}"
    
    return False, error_msg



