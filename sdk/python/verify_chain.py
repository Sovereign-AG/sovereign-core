# Project: SVTP v1.0 SDK
# License: SVTP Source-Available License (SSAL) v1.0
# Copyright (c) 2026 SVTP v1.0.
import json
import hashlib
import sys
import os

def verify_ledger(ledger_path: str):
    print(f"--- Forensic Integrity Audit: {ledger_path} ---")
    if not os.path.exists(ledger_path):
        print("ERROR: Ledger not found.")
        return

    expected_prev_hash = "0" * 64
    entry_count = 0
    corrupted_entries = 0

    with open(ledger_path, "r") as f:
        for line_num, line in enumerate(f, 1):
            line = line.strip()
            if not line: continue
            
            try:
                entry = json.loads(line)
                actual_prev_hash = entry.get("prev_hash")
                
                # 1. Verify Hash Chain Continuity
                if actual_prev_hash != expected_prev_hash:
                    print(f"CRITICAL: Hash Chain Broken at line {line_num}!")
                    print(f"  Expected: {expected_prev_hash}")
                    print(f"  Actual:   {actual_prev_hash}")
                    corrupted_entries += 1
                
                # 2. Verify Action Checksum (if present)
                if entry.get("action") == "METHOD_CALL":
                    metadata = entry.get("metadata", {})
                    checksum = metadata.get("action_checksum")
                    # Calculate expected checksum (ignoring action_checksum itself)
                    meta_copy = metadata.copy()
                    meta_copy.pop("action_checksum", None)
                    payload = json.dumps(meta_copy, sort_keys=True)
                    expected_checksum = hashlib.sha256(payload.encode()).hexdigest()
                    
                    if checksum != expected_checksum:
                         print(f"WARNING: Action Checksum mismatch at line {line_num}!")
                
                # Calculate hash for next line
                # IMPORTANT: Must match the encoding/formatting used during write
                expected_prev_hash = hashlib.sha256(line.encode()).hexdigest()
                entry_count += 1
                
            except Exception as e:
                print(f"ERROR: Malformed line {line_num}: {e}")
                corrupted_entries += 1

    print("\n--- Audit Summary ---")
    print(f"Total Entries Processed: {entry_count}")
    if corrupted_entries == 0:
        print("RESULT: INTEGRITY VERIFIED (Hash-Chain Intact).")
    else:
        print(f"RESULT: INTEGRITY COMPROMISED ({corrupted_entries} errors detected).")

if __name__ == "__main__":
    path = "svtp_ledger.ndjson"
    if len(sys.argv) > 1:
        path = sys.argv[1]
    verify_ledger(path)






