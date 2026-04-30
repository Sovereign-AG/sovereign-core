import StandardDoc from '@/components/StandardDoc';

export default function SecurityPage() {
  return (
    <StandardDoc 
      title="Security Posture"
      subtitle="Hardened infrastructure meeting NIST-2026 industrial standards."
      content={
        <div className="space-y-24">
          <section className="space-y-8">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">Governance-First Security</h2>
            <div className="h-1 w-20 bg-lime-500 mb-8" />
            <p className="text-xl leading-relaxed text-gray-300 font-medium">Sovereign AG is engineered for environments where a security breach isn't just a data leak—it's an operational failure. Our security posture is built on three immutable pillars of machine governance.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-8">
               <div className="space-y-4">
                  <div className="text-white font-black uppercase text-[10px] tracking-[0.3em]">Isolation</div>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">Keys never leave the owner's vault. We use Zero-Knowledge proofs to verify identity without exposing underlying secrets.</p>
               </div>
               <div className="space-y-4">
                  <div className="text-white font-black uppercase text-[10px] tracking-[0.3em]">Attestation</div>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">Every agent action emits a cryptographically signed heartbeat, creating an immutable audit trail of behavior.</p>
               </div>
               <div className="space-y-4">
                  <div className="text-white font-black uppercase text-[10px] tracking-[0.3em]">Revocation</div>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">Global kill-switches provide 20ms revocation latency, allowing for immediate fleet-wide intervention.</p>
               </div>
            </div>
          </section>

          <section className="space-y-12">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">01. NIST-800-218 Alignment</h2>
            <p className="text-lg text-gray-500 font-medium">The Sovereign Protocol is the first identity standard to natively satisfy the **NIST SP 800-218 (Secure Software Development Framework)** mandates specifically for autonomous agents.</p>
            <div className="bg-[#050505] border border-[#111] p-10 rounded-none space-y-8">
               <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-black border border-[#1A1A1A] rounded-none flex items-center justify-center text-xs font-black text-lime-500 shadow-inner">4.2</div>
                  <div className="space-y-1">
                     <h4 className="text-xs font-black text-white uppercase tracking-widest">Provisioning Control</h4>
                     <p className="text-xs text-gray-700">Satisfies RFI requirement for 'Reasonable Institutional Origin'.</p>
                  </div>
               </div>
               <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-black border border-[#1A1A1A] rounded-none flex items-center justify-center text-xs font-black text-lime-500 shadow-inner">3.1</div>
                  <div className="space-y-1">
                     <h4 className="text-xs font-black text-white uppercase tracking-widest">Policy Enforcement</h4>
                     <p className="text-xs text-gray-700">Automated gatekeeping for all outgoing tool-calls and requests.</p>
                  </div>
               </div>
            </div>
          </section>

          <section className="space-y-8">
             <h2 className="text-3xl font-black text-white uppercase tracking-tight">02. Resident-Only Keys</h2>
             <p className="text-lg text-gray-500 font-medium leading-relaxed">Unlike legacy cloud identity providers (IAM), Sovereign AG **never** handles your private keys. Cryptographic secrets remain resident in your infrastructure. Our 'Librarian' and 'Concierge' agents interact with proofs of identity, not the identity itself.</p>
             <div className="p-8 bg-[#050505] border-2 border-[#111] border-dashed rounded-none text-xs font-mono text-gray-700 italic leading-relaxed">
                # SECURITY_MEMORANDUM: The mathematical boundary between the Registry and the Controller is absolute. Zero-Knowledge Proofs ensure that if the Registry is compromised, no agent secrets are at risk.
             </div>
          </section>
        </div>
      }
    />
  );
}
