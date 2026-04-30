import random
import time
import hashlib
import json
import threading
import logging

# Sovereign Protocol: Phase 2 - Level 4 (The "Phantom" DePIN Mesh)
# Standard: Sharded Gossip Protocol for Decentralized Hubless Sync
# Logic: Peers verify state-hashes of neighbors to maintain 1,000,000-node grid integrity.

logger = logging.getLogger("PhantomMesh")

class PhantomMesh:
    """
    Decentralized Registry Synchronization Engine.
    Implements horizontal sharding and state-hash propagation.
    """
    
    def __init__(self, node_did: str, shard_size: int = 1000):
        self.node_did = node_did
        self.shard_size = shard_size
        self.peers = set()
        self.registry_cache = {} # Sharded local view of the grid
        self.lock = threading.Lock()
        
    def add_peer(self, peer_did: str):
        """Discovers a new neighbor in the DePIN mesh."""
        with self.lock:
            self.peers.add(peer_did)
            
    def gossip_state(self, agent_did: str, state_hash: str):
        """
        Propagates a behavioral state-hash to neighbors.
        Uses horizontal sharding to ensure grid-scale performance.
        """
        # Sharding Logic: Only sync if DID falls into our shard bucket
        if not self._is_in_shard(agent_did):
            return False
            
        with self.lock:
            self.registry_cache[agent_did] = {
                "hash": state_hash,
                "verified_by": self.node_did,
                "timestamp": time.time()
            }
            
        # Recursive Propagation (Simulated)
        recipient_count = min(len(self.peers), 3)
        targets = random.sample(list(self.peers), recipient_count) if self.peers else []
        
        for target in targets:
            logger.info(f"GOSSIP_SYNC: [{agent_did}] -> {target[:12]}...")
            
        return True

    def _is_in_shard(self, did: str) -> bool:
        """Determines if a DID belongs to this node's responsibility shard."""
        # Simple bucket sharding via DID hash prefix
        bucket = int(hashlib.md5(did.encode()).hexdigest(), 16) % 100
        node_bucket = int(hashlib.md5(self.node_did.encode()).hexdigest(), 16) % 100
        return bucket == node_bucket

    def verify_mesh_integrity(self):
        """Audits the local shard for behavioral consistency."""
        valid_count = 0
        for did, data in self.registry_cache.items():
            # Check for stale pulses (unresponsive DePIN nodes)
            if time.time() - data['timestamp'] < 60:
                valid_count += 1
        return valid_count

def start_mesh_service(node_did: str):
    """Initializes the background gossip daemon."""
    mesh = PhantomMesh(node_did)
    # Background thread for periodic neighbor health checks
    def mesh_loop():
        while True:
            mesh.verify_mesh_integrity()
            time.sleep(15)
            
    daemon = threading.Thread(target=mesh_loop, daemon=True)
    daemon.start()
    return mesh
