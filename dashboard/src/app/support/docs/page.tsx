import StandardDoc from '@/components/StandardDoc';

export default function DocsPage() {
  return (
    <StandardDoc 
      title="Technical Manual"
      subtitle="The operational blueprint for Sovereign-Identity integration and fleet governance."
      content={
        <div className="space-y-16">
          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">01. Protocol Architecture</h2>
            <p>Sovereign AG operates as a decentralized trust layer for the autonomous machine economy. By anchoring every agent to an Ed25519-backed DID (Decentralized Identifier), we establish a non-repudiable Chain of Trust that satisfies the stringent requirements of NIST SP 800-218.</p>
            <div className="p-8 bg-[#050505] border border-[#1A1A1A] rounded-xl font-mono text-sm">
               <div className="text-lime-500 mb-4 tracking-widest uppercase text-[10px]">Reference Flow:</div>
               Agent Request {'->'} SDK Interception {'->'} Registry Verification {'->'} Cryptographic Heartbeat {'->'} Protected Execution
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">02. SDK Implementation</h2>
            <p>The SDK acts as a high-performance transparent proxy. It requires a valid `did:sov` to be registered via the Sovereign Control Tower before it can secure tool-calls.</p>
            <pre className="p-8 bg-[#050505] border border-[#1A1A1A] rounded-xl text-xs text-blue-400">
{`# Initialize Protocol
from sovereign_sdk import SovereignAgent

@SovereignAgent.guard()
def sensitive_function(data):
    # This block is secured via JIT identity attestation
    pass`}
            </pre>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">03. Compliance Benchmarks</h2>
            <ul className="list-disc pl-6 space-y-4">
              <li><strong>NIST-800-218:</strong> Verified Identity Provenance.</li>
              <li><strong>NIST-2026:</strong> Mandatory Multi-Agent Attestation.</li>
              <li><strong>Liability Gating:</strong> Enforced through real-time reputation indexing.</li>
            </ul>
          </section>
        </div>
      }
    />
  );
}
