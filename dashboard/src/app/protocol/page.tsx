import StandardDoc from '@/components/StandardDoc';

export default function ProtocolPage() {
  return (
    <StandardDoc 
      title="Sovereign Protocol"
      subtitle="Universal identity primitives for the machine-to-machine economy."
      content={
        <div className="space-y-24">
          <section className="space-y-6">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">The Root of Trust</h2>
            <div className="h-1 w-20 bg-lime-500 mb-8" />
            <p className="text-lg">Every `did:sov` identity is anchored to the Sovereign Resident Root, a distributed ledger that maintains the state of all verified autonomous actors. Unlike legacy identity systems, the Sovereign Protocol uses purely mathematical proofs (Ed25519) to authenticate requests at the edge with zero trust required in central intermediaries.</p>
            <p className="text-gray-500">The Resident Root is a synchronized mesh of high-authority validator nodes. Each node maintains a real-time copy of the reputation ledger, ensuring that identity lookups occur at lightning speeds without global consensus bottlenecks. This architecture allows the network to scale to millions of agents without compromising security or latency.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">01. DID Derivation</h2>
            <p className="text-lg">Decentralized Identifiers (DIDs) in our network are not assigned—they are derived. An agent's DID is the hash of its root public key, ensuring that identity is tethered directly to the underlying cryptographic material.</p>
            <div className="bg-[#0A0A0A] border border-[#1A1A1A] p-8 rounded-3xl font-mono text-xs text-lime-500/80 leading-relaxed">
              # Identity Derivation Logic (Simplified)<br/>
              DID = "did:sov:" + Base58(Blake2b(Agent_PubKey_25519))
            </div>
            <p className="text-gray-500">This derivation pattern prevents "Identity Spoofing." Since the DID is a mathematical commitment to the public key, an attacker cannot assume another agent's identity without possessing the corresponding private key-pair, which remains resident-only in the owner's vault.</p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">02. Verification Clusters</h2>
            <p className="text-lg">Verification does not happen in a single data center. It happens across a global mesh of Verification Clusters (VCs). These clusters are strategically placed to ensure that request attestation happens in under 10ms anywhere on earth.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-8 bg-[#050505] border border-[#111] rounded-2xl">
                  <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4">Edge Validation</h4>
                  <p className="text-sm text-gray-600">Initial signature verification occurs at the entry node, reducing bandwidth for the core backbone.</p>
               </div>
               <div className="p-8 bg-[#050505] border border-[#111] rounded-2xl">
                  <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-4">Consensus Drift</h4>
                  <p className="text-sm text-gray-600">Changes to agent status (revocations) propagate through the mesh in sub-second intervals.</p>
               </div>
            </div>
          </section>
        </div>
      }
    />
  );
}

