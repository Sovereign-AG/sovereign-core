# Project: SVTP v1.0 SDK
# License: SVTP Source-Available License (SSAL) v1.0
# Copyright (c) 2026 SVTP v1.0.
import threading
import time
import hashlib
import json
import logging
from typing import Any, Callable, Optional

class HeartbeatEngine:
    """
    HeartbeatEngine - Emits a pulse every 10 seconds.
    """
    def __init__(self, agent_id: str, get_state_func: Callable[[], Any], on_pulse: Callable[[str, str], None]):
        self.agent_id = agent_id
        self.get_state_func = get_state_func
        self.on_pulse = on_pulse
        self.running = False
        self._thread: Optional[threading.Thread] = None

    def _calculate_state_hash(self) -> str:
        try:
            state = self.get_state_func()
            # Attempt to serialize state to JSON for hashing
            # If not serializable, we take a string representation
            try:
                state_str = json.dumps(state, sort_keys=True, default=str)
            except:
                state_str = str(state)
            return hashlib.sha256(state_str.encode()).hexdigest()
        except Exception as e:
            logging.error(f"[SVTP_HEARTBEAT] Error hashing state: {e}")
            return "unknown_state_hash"

    def _run(self):
        while self.running:
            state_hash = self._calculate_state_hash()
            self.on_pulse(self.agent_id, state_hash)
            time.sleep(0.1) # SVTP-00: 100ms Self-Healing Pulse

    def start(self):
        if not self.running:
            self.running = True
            self._thread = threading.Thread(target=self._run, daemon=True)
            self._thread.start()
            logging.info(f"[SVTP] Heartbeat Engine started for {self.agent_id}")

    def stop(self):
        self.running = False
        if self._thread:
            self._thread.join(timeout=1)






