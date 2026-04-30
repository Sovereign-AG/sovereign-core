import sqlite3
import hashlib
import os
import logging
import json
from datetime import datetime
from typing import List, Dict, Any, Optional
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ed25519
from cryptography.exceptions import InvalidSignature

# Sovereign Protocol: Pillar 3 (Database Audit Registry)
# Standard: SQLite-backed High-Frequency Audit Trail
# Pillar 3 Compliance: Cryptographic Chaining (SHA-384)

DB_PATH = os.path.join(os.getcwd(), "data", "sovereign.db")

class SovereignAuditor:
    """
    Sovereign Protocol - Pillar 3 (Audit Database).
    Optimized for high-frequency AI agent requests with indexed search.
    Now includes 'Identity Registry' for subscription status.
    """
    def __init__(self, db_path: str = DB_PATH):
        self.db_path = db_path
        self._ensure_db_initialized()

    def _ensure_db_initialized(self):
        """Initializes the SQLite database and audit_trail table with indexing."""
        os.makedirs(os.path.dirname(self.db_path), exist_ok=True)
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # 1. Audit Trail table (Chained Transactions)
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS audit_trail (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT NOT NULL,
                did TEXT NOT NULL,
                action TEXT NOT NULL,
                outcome TEXT NOT NULL,
                signature TEXT NOT NULL,
                previous_hash TEXT NOT NULL
            )
        ''')
        
        # 2. Identity Registry (Subscription Status)
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS identities (
                did TEXT PRIMARY KEY,
                is_active BOOLEAN DEFAULT 0,
                minted_at TEXT NOT NULL,
                hitl_config TEXT
            )
        ''')
        
        # 3. Reputation Ledger (Sovereign Trust Passport)
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS reputation (
                did TEXT PRIMARY KEY,
                score REAL DEFAULT 50.0,
                consistency_ratio REAL DEFAULT 1.0,
                total_actions INTEGER DEFAULT 0,
                successful_pulses INTEGER DEFAULT 0,
                compliance_status TEXT DEFAULT 'NIST-2026-PENDING',
                last_updated TEXT
            )
        ''')
        
        # High-performance indexing
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_did ON audit_trail (did)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_reputation_did ON reputation (did)')
        
        conn.commit()
        conn.close()

    def update_reputation(self, did: str, is_success: bool, action_type: str = "ACTION"):
        """
        Implements weighted scoring algorithm based on 'Action Consistency'.
        Success: +0.1 for Pulse, +0.5 for Action.
        Failure: -5.0 for unauthorized, -1.0 for missed pulse.
        """
        weight = 0.0
        if action_type == "PULSE":
            weight = 0.1 if is_success else -1.0
        else: # ACTION
            weight = 0.5 if is_success else -5.0
            
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            
            # Ensure entry exists
            cursor.execute('INSERT OR IGNORE INTO reputation (did, last_updated) VALUES (?, ?)', 
                          (did, datetime.now().isoformat()))
            
            cursor.execute('''
                UPDATE reputation 
                SET score = score + ?,
                    total_actions = total_actions + 1,
                    successful_pulses = successful_pulses + ?,
                    last_updated = ?
                WHERE did = ?
            ''', (weight, 1 if action_type == "PULSE" and is_success else 0, datetime.now().isoformat(), did))
            
            conn.commit()
            conn.close()
        except Exception as e:
            print(f"Reputation Update Failed: {e}")

    def get_trust_passport(self, did: str) -> Dict[str, Any]:
        """Returns the Sovereign Trust Passport (STP) for a DID."""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('SELECT score, total_actions, compliance_status FROM reputation WHERE did = ?', (did,))
        row = cursor.fetchone()
        
        cursor.execute('SELECT is_active, hitl_config FROM identities WHERE did = ?', (did,))
        id_row = cursor.fetchone()
        conn.close()
        
        if not row:
            return {"error": "DID not registered in Reputation Ledger."}
            
        score = row[0]
        tier = "Bronze"
        if score > 1000: tier = "Sovereign"
        elif score > 500: tier = "Gold"
        elif score > 100: tier = "Silver"
        
        # Mocking bonding levels based on score
        bonding = f"${min(10.0, score/100):.1f}M"
        
        return {
            "did": did,
            "reputation_tier": tier,
            "trust_score": round(score, 2),
            "nist_compliance": row[2],
            "liability_bonding": bonding,
            "is_governed": bool(id_row[0]) if id_row else False,
            "human_in_loop": json.loads(id_row[1]) if id_row and id_row[1] else "NONE",
            "insurance_discount_token": hashlib.sha256(f"{did}{score}".encode()).hexdigest()[:16].upper()
        }

    def set_hitl_config(self, did: str, config: Dict[str, Any]):
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute('UPDATE identities SET hitl_config = ? WHERE did = ?', (json.dumps(config), did))
            conn.commit()
            conn.close()
        except: pass

    def set_identity_active(self, did: str, is_active: bool = True):
        """Updates the subscription status for a DID in the Registry."""
        try:
            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO identities (did, is_active, minted_at)
                VALUES (?, ?, ?)
                ON CONFLICT(did) DO UPDATE SET is_active = excluded.is_active
            ''', (did, is_active, datetime.now().isoformat()))
            conn.commit()
            conn.close()
            return True
        except Exception as e:
            print(f"FAILED to update registry status for {did}: {str(e)}")
            return False

    def is_identity_active(self, did: str) -> bool:
        """Checks if the identity has an active subscription."""
        # Note: In TEST_MODE, we can bypass this or keep it strict.
        # We'll keep it strict to test the webhook.
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('SELECT is_active FROM identities WHERE did = ?', (did,))
        row = cursor.fetchone()
        conn.close()
        return bool(row[0]) if row else False

    def log_action(self, did: str, action: str, outcome: str, private_key_path: str):
        """Signs and appends an audit entry to the SQLite-backed cryptographic chain."""
        try:
            with open(private_key_path, "rb") as f:
                private_key = serialization.load_pem_private_key(f.read(), password=None)

            prev_hash = self._get_last_row_hash()
            timestamp = datetime.now().isoformat()
            payload = f"{timestamp}|{did}|{action}|{outcome}|{prev_hash}"
            signature = private_key.sign(payload.encode('utf-8'))
            sig_hex = signature.hex()

            conn = sqlite3.connect(self.db_path)
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO audit_trail (timestamp, did, action, outcome, signature, previous_hash)
                VALUES (?, ?, ?, ?, ?, ?)
            ''', (timestamp, did, action, outcome, sig_hex, prev_hash))
            conn.commit()
            conn.close()
            return True
        except Exception as e:
            print(f"CRITICAL: Database Audit Failed: {str(e)}")
            return False

    def _get_last_row_hash(self) -> str:
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM audit_trail ORDER BY id DESC LIMIT 1')
        row = cursor.fetchone()
        conn.close()
        if not row: return "GENESIS_CHAIN_BLOCK"
        row_content = "|".join([str(x) for x in row])
        return hashlib.sha384(row_content.encode('utf-8')).hexdigest()

    def integrity_check_retrieve(self, did: str) -> List[Dict[str, Any]]:
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM audit_trail WHERE did = ? ORDER BY id ASC', (did,))
        rows = cursor.fetchall()
        conn.close()
        return [{"id": r[0], "timestamp": r[1], "did": r[2], "action": r[3], "outcome": r[4], "signature": r[5], "previous_hash": r[6]} for r in rows]
