import logging
from typing import Any, Dict, Optional
from .core import SVTPAgent

class ProviderWrapper:
    """
    Universal Provider Wrapping Engine.
    Deep-hooks into OpenAI, Anthropic, Google Gemini, and LangChain.
    """
    
    @staticmethod
    def wrap(client: Any, **kwargs) -> Any:
        client_type = type(client).__name__.lower()
        
        # 1. OpenAI Detection
        if "openai" in client_type:
            logging.info("[SVTP] Auto-Wrapping OpenAI Architecture...")
            return ProviderWrapper._wrap_openai(client, **kwargs)
            
        # 2. Anthropic Detection (Claude)
        if "anthropic" in client_type:
            logging.info("[SVTP] Auto-Wrapping Anthropic (Claude) Architecture...")
            return ProviderWrapper._wrap_anthropic(client, **kwargs)

        # 3. Google Detection (Gemini)
        if "generativemodel" in client_type or "google" in client_type:
            logging.info("[SVTP] Auto-Wrapping Google Gemini Architecture...")
            return ProviderWrapper._wrap_google(client, **kwargs)

        # 4. Universal Proxy Fallback
        # This handles LangChain, custom agents, and obscure providers
        logging.info(f"[SVTP] Engaging Universal Proxy for: {type(client).__name__}")
        return SVTPAgent(client, **kwargs)

    @staticmethod
    def _wrap_openai(client: Any, **kwargs) -> Any:
        if hasattr(client, 'chat') and hasattr(client.chat, 'completions'):
            client.chat.completions = SVTPAgent(client.chat.completions, **kwargs)
        return client

    @staticmethod
    def _wrap_anthropic(client: Any, **kwargs) -> Any:
        if hasattr(client, 'messages'):
            client.messages = SVTPAgent(client.messages, **kwargs)
        return client

    @staticmethod
    def _wrap_google(model: Any, **kwargs) -> Any:
        # Google's SDK often uses 'generate_content' directly on the model
        return SVTPAgent(model, **kwargs)

def wrap(client: Any, **kwargs) -> Any:
    """The SVTP 'One-Line' Entry Point."""
    return ProviderWrapper.wrap(client, **kwargs)





