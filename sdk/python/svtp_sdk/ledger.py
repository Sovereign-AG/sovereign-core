# SVTP v1.0 SDK - Forensic Ledger
# License: SVTP Source-Available License (SSAL) v1.0
# Copyright (c) 2026 SVTP v1.0.
# Commercial use > 10 agents requires an SVTP Enterprise License.

import json
import os
import time
import threading
import queue
import hashlib
import hmac
import copy
from typing import Dict, Any, Optional

class SVTPLedger:
    """
    SVTPLedger - Manages the immutable NDJSON ledger with Forensic Hash-Chaining.
    Every entry is cryptographically linked to the predecessor.
    """
    def __init__(self, ledger_path: str = "svtp_ledger.ndjson", 
                 signing_key: Optional[str] = None,
                 tax_callback=None):
        self.ledger_path = os.path.abspath(ledger_path)
        self._signing_key = (signing_key or "SVTP_GENESIS_SECRET").encode()
        self._tax_callback = tax_callback
        os.makedirs(os.path.dirname(self.ledger_path), exist_ok=True)
        
        self._last_line_hash = self._initialize_hash_chain()
        self._lock = threading.Lock()
        
        # Async Queue for performance
        self._queue = queue.Queue()
        self._stop_event = threading.Event()
        self._thread = threading.Thread(target=self._worker, daemon=True)
        self._thread.start()

    def _initialize_hash_chain(self) -> str:
        """Reads the last line of the existing ledger to seed the hash chain."""
        if not os.path.exists(self.ledger_path) or os.path.getsize(self.ledger_path) == 0:
            return "0" * 64 # Genesis seed
            
        try:
            with open(self.ledger_path, "rb") as f:
                f.seek(0, os.SEEK_END)
                pos = f.tell()
                if pos == 0: return "0" * 64
                
                # Seek back to find the last newline
                chunk_size = 1024
                while pos > 0:
                    delta = min(pos, chunk_size)
                    pos = pos - delta # Explicit subtraction for linter
                    f.seek(pos)
                    chunk = f.read(delta)
                    last_newline = chunk.rfind(b"\n")
                    if last_newline != -1:
                        # Found a newline, the content after it is the last line
                        last_line = chunk[last_newline+1:].strip()
                        if last_line:
                            return hashlib.sha256(last_line).hexdigest()
                        # If the newline was at the end of the chunk, continue searching previous chunks
                        continue
                
                # If we are here, we might have a single line file
                f.seek(0)
                last_line = f.read().strip()
                return hashlib.sha256(last_line).hexdigest() if last_line else "0" * 64
        except Exception as e:
            print(f"[svtp_ledger] Hash-Chain Seed Error: {e}")
            return "0" * 64

    def _worker(self):
        last_sync = time.time()
        entries_since_sync = 0
        
        while not self._stop_event.is_set():
            try:
                entry = self._queue.get(timeout=1.0)
                
                with self._lock:
                    # Offload action checksum to background to maintain zero-latency
                    if entry.get("action") == "METHOD_CALL":
                        metadata = entry.get("metadata", {})
                        if "action_checksum" not in metadata:
                            metadata["action_checksum"] = self._generate_action_checksum(metadata)
                    
                    entry["prev_hash"] = self._last_line_hash
                    
                    # Cryptographic Integrity Signature (HMAC-SHA256)
                    line_to_sign = json.dumps(entry, sort_keys=True)
                    signature = hmac.new(self._signing_key, line_to_sign.encode(), hashlib.sha256).hexdigest()
                    entry["signature"] = signature
                    
                    line = json.dumps(entry, sort_keys=True)
                    
                    # Atomic append with buffered sync for 1M+ pulse throughput
                    with open(self.ledger_path, "a") as f:
                        f.write(line + "\n")
                        entries_since_sync += 1
                        
                        # Batch Sync: Periodic flush to disk for performance
                        now = time.time()
                        if now - last_sync > 0.5 or entries_since_sync >= 100:
                            f.flush()
                            os.fsync(f.fileno())
                            last_sync = now
                            entries_since_sync = 0
                    
                    self._last_line_hash = hashlib.sha256(line.encode()).hexdigest()
                    
                    # Deduct Protocol Tax after successful log
                    if self._tax_callback:
                        tax_type = "PULSE" if entry.get("action") == "PULSE" else "ACTION"
                        self._tax_callback(tax_type)
                
                self._queue.task_done()
            except queue.Empty:
                continue
            except Exception as e:
                print(f"[svtp_ledger_WORKER] Error: {e}")

    def _generate_action_checksum(self, metadata: Dict[str, Any]) -> str:
        """Generates a non-repudiable checksum for actions."""
        payload = json.dumps(metadata, sort_keys=True)
        return hashlib.sha256(payload.encode()).hexdigest()

    def log_action(self, agent_id: str, action: str, metadata: Dict[str, Any]):
        """
        Enqueues an action for Forensic Audit (Non-blocking).
        """
        entry = {
            "timestamp": time.time(),
            "iso_time": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
            "agent_id": agent_id,
            "action": action,
            "metadata": copy.deepcopy(metadata),
            "billing_increment": 0.01
        }
        self._queue.put(entry)

    def log_pulse(self, agent_id: str, state_hash: str):
        self.log_action(agent_id, "PULSE", {"state_hash": state_hash})

    def stop(self):
        """Clean shutdown - wait for queue to drain."""
        self._queue.join()
        self._stop_event.set()




