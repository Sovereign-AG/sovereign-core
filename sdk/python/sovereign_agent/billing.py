import os
from typing import Optional

# Sovereign Protocol: Dodo Payments Integration (Alpha)
# Standard: Automated Monetization of Agentic Identities
# Logic: Constructing High-Conversion Checkout Gateways

DODO_BASE_URL = "https://buy.dodopayments.com"

def get_dodo_checkout_url(product_id: str, agent_did: str, test_mode: bool = False) -> str:
    """
    Constructs a Dodo Payments Checkout URL for Sovereign Identity Minting.
    Embeds the Agent DID as the customer reference for post-payment activation.
    """
    if test_mode:
        # High-Authority Mock URL for UI Validation
        return f"https://test.dodopayments.com/checkout/mock_buy?product={product_id}&ref={agent_did}"
    
    # Production Production Dodo Link
    # Note: registry uses the 'external_id' or 'customer_reference' to map the payment to the DID
    return f"{DODO_BASE_URL}/buy/{product_id}?customer_reference={agent_did}&quantity=1"
