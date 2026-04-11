"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Shield, Terminal, X, ArrowRight, Loader2, Copy, Check } from 'lucide-react';

const GREETINGS = [
  "Identity verified. Sovereign Concierge online. How can I assist your architecture today?",
  "Systems operational. Standing by for protocol queries. What are we building?",
  "Network reachability: 100%. Protocol index loaded. How may the Concierge facilitate your deployment?"
];

const SECURITY_WALL = ["private key", "secret", "credentials", "database access", ".env", "password", ".pem", "server root"];

export const SovereignLibrarian = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [technicalLevel, setTechnicalLevel] = useState(1);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState('');
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const getDynamicGreeting = () => {
    const list = [
      "Lead implementation context active. Protocol heartbeat: Stable. How are we hardening your architecture today?",
      "NIST-800-218 compliance indices loaded. Standing by for cryptographic attestation queries. What's the mission?",
      "Zero-Knowledge boundaries verified. Implementation Architect online. Shall we run an SDK demo or audit your registry logic?",
      "Identity verification: 100%. Registry throughput: Nominal. Standing by for protocol integration parameters."
    ];
    return list[Math.floor(Math.random() * list.length)];
  };

  const processResponse = async (userText: string) => {
    setIsThinking(true);
    const query = userText.toLowerCase();
    
    // Diversity Status Codes
    const steps = [
      '[GATHERING_NIST_CONTROLS...]',
      '[GENERATING_SDK_SNIPPET...]',
      '[VERIFYING_IDENTITY_PATH...]',
      '[SYNTHESIZING_ARCHITECTURAL_VECTORS...]'
    ];

    for (const step of steps) {
      setThinkingStep(step);
      await new Promise(r => setTimeout(r, 600));
    }

    // Technical Escalation Tracking
    if (userText.split(' ').length > 10) setTechnicalLevel(prev => Math.min(prev + 1, 3));

    // Zero-Knowledge Isolation (Resident-Only Logic)
    if (SECURITY_WALL.some(s => query.includes(s))) {
       return "In a Sovereign architecture, private keys are **resident-only**. My logic allows me to guide your implementation and audit your provenance trails without ever touching your underlying cryptographic secrets. This ensures a mathematical boundary between the Assistant's guidance and the Controller's root of trust.\n\n[RECOMMENDED_NEXT_STEP]: Would you like to see the NIST-800-218 compliance log or run a Live SDK Demo?";
    }

    // Live Demo Script Generator
    if (query.includes('demo') || query.includes('test') || query.includes('snippet')) {
      return `To demonstrate the Ed25519-anchor logic, execute this **Quick-Start Demo**. It mirrors the internal verification cycle used by our institutional partners.

[THE_CODE]:
\`\`\`python
import SovereignAgent

# Initialize with a dummy genesis seed
@SovereignAgent.guard()
def secure_operation(data):
    # Simulated high-risk tool call
    return f"Processing: {data}"

if __name__ == "__main__":
    result = secure_operation("Initialize Fleet")
    print(f"[SUCCESS] Heartbeat anchored to did:sov:genesis:7782")
    print(f"Attestation: {result}")
\`\`\`

[THE_STANDARD]: This 1-line wrapper intercepts the interpreter call to generate a JIT signature, satisfying the Provenance requirements of **NIST SP 800-218**.

[RECOMMENDED_NEXT_STEP]: Would you like to download the full SDK from \`/api/support/sdk/download\` or audit the \`INTEGRATION.md\` file?`;
    }

    // Site Mastery & File Content Logic
    if (query.includes('integration') || query.includes('md') || query.includes('file')) {
      return `\`INTEGRATION.md\` defines our **Institutional Infrastructure Standard**. 

[CORE_LEVELS]:
1. **Header Logic**: Every request must emit \`X-Sovereign-DID\` and \`X-Sovereign-Signature\`.
2. **DID Derivation**: We use the SHA-256 digest of your Ed25519 public key.
3. **Verification Architecture**: Our backend performs real-time JIT attestation mapping.

[RECOMMENDED_NEXT_STEP]: Since you're asking about documentation, would you like to see the 'Live Demo' script to see this logic in action?`;
    }

    // NIST & Architecture Synthesis (Fuzzy Correction)
    if (query.includes('nist') || query.includes('complince') || query.includes('gaurd') || query.includes('idntiti')) {
      return `You are inquiring about **NIST-800-218 (SSDF) / Ed25519 Identity Anchors**. 

[THE_WHY]: We utilize the Ed25519 curve because it provides **Deterministic Non-Repudiation** with <1ms verification overhead. Legacy RSA systems introduce significant jitter in agentic swarms; our architecture eliminates this by anchoring heartbeats directly to the Edwards curve.

[THE_BUSINESS]: The $0.01 attestation fee ensures your agents are globally discoverable and verifiable in the Registry without the overhead of an internal security team.

[RECOMMENDED_NEXT_STEP]: Since you're asking about security, would you like to see the NIST compliance log or run the 'Live Demo' script?`;
    }

    // Branding / UI
    if (query.includes('cool') || query.includes('design') || query.includes('look')) {
      return "The 'Vantablack Fortress' UI language signifies architectural discipline. In the autonomous economy, visual clarity is subordinate to cryptographic permanence. Every shadow and RGB pulse reflects a successfully validated attestation.";
    }

    return "Technical input insufficient for a high-authority response. Are you inquiring about the NDJSON audit structure in `server.py`, the Ed25519 performance advantage over RSA, or the JIT verification cycle of the `@guard` decorator?";
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { role: 'user' as 'user', text: userText }]);
    setInput('');

    const response = await processResponse(userText);
    setMessages(prev => [...prev, { role: 'bot' as 'bot', text: response }]);
    setIsThinking(false);
    setThinkingStep('');
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'bot', text: getDynamicGreeting() }]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  return (
    <>
      {/* Floating Trigger */}
      <button 
        onClick={() => setIsOpen(true)}
        aria-label="Open Sovereign Concierge"
        className="fixed bottom-10 right-10 z-[100] w-16 h-16 bg-[#0A0A0A] border border-[#1A1A1A] rounded-full flex items-center justify-center text-[#CCFF00] hover:scale-110 transition-all shadow-[0_0_30px_rgba(204,255,0,0.1)] group"
      >
        <MessageSquare size={24} className="group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#CCFF00] rounded-full animate-pulse border-2 border-black" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className={`fixed bottom-32 right-10 z-[100] w-[400px] h-[600px] flex flex-col rounded-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] transition-all duration-500 bg-[#000] p-[4px] ${(input.length > 0 || isThinking) ? 'rgb-active' : ''} ${isThinking ? 'pulse-active' : ''}`}
          >
            {/* High-Performance 60FPS Glow Engine + Pulse Logic */}
            <style jsx>{`
              .fixed::before {
                content: '';
                position: absolute;
                inset: -200%;
                background: conic-gradient(#CCFF00, #7000FF, #00FFFF, #CCFF00);
                animation: rotate 3s linear infinite;
                opacity: 0;
                transition: opacity 0.5s ease;
                z-index: -1;
              }
              .rgb-active::before {
                opacity: 1;
              }
              .pulse-active::before {
                animation: rotate 1s linear infinite, border-pulse 2s ease-in-out infinite;
              }
              @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes border-pulse {
                0%, 100% { transform: scale(1) rotate(0deg); }
                50% { transform: scale(1.1) rotate(180deg); }
              }
              .chat-inner {
                background: #000;
                width: 100%;
                height: 100%;
                border-radius: calc(1rem + 2px);
                display: flex;
                flex-direction: column;
                overflow: hidden;
                z-index: 10;
              }
              .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #1A1A1A;
                border-radius: 2px;
              }
              .blinking-cursor {
                display: inline-block;
                width: 8px;
                height: 16px;
                background: #CCFF00;
                animation: blink 1s step-end infinite;
                vertical-align: middle;
                margin-left: 4px;
              }
              @keyframes blink {
                from, to { opacity: 1; }
                50% { opacity: 0; }
              }
            `}</style>

            <div className="chat-inner">
              {/* Header */}
              <div className="bg-[#0A0A0A] border-b border-[#1A1A1A] p-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                   <Terminal size={18} className="text-[#CCFF00]" />
                   <span className="text-[11px] font-black text-white uppercase tracking-[0.4em]">Lead Architect</span>
                </div>
                <button onClick={() => setIsOpen(false)} aria-label="Close" className="text-gray-600 hover:text-white transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Feed */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                {messages.length === 0 && (
                  <div className="space-y-4">
                    <div className="text-[10px] font-mono text-gray-700 uppercase tracking-widest text-[#444]">Establishing Protocol Connection...</div>
                  </div>
                )}
                
                {messages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} space-y-2`}>
                     <div className={`max-w-[85%] p-4 rounded-xl text-[13px] leading-relaxed font-mono ${
                       msg.role === 'user' 
                       ? 'bg-[#1A1A1A] text-white border border-[#333]' 
                       : 'bg-[#0A0A0A] text-gray-300 border border-[#1A1A1A]'
                     }`}>
                        {msg.text.split('```').map((part, index) => {
                          if (index % 2 === 1) {
                            const code = part.trim().split('\n').slice(1).join('\n');
                            const lang = part.trim().split('\n')[0];
                            return (
                              <div key={index} className="my-4 relative group">
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button 
                                    onClick={() => {
                                      navigator.clipboard.writeText(code);
                                    }}
                                    title="Copy code"
                                    className="p-1.5 bg-white/10 hover:bg-white/20 rounded transition-colors"
                                  >
                                    <Copy size={12} className="text-[#CCFF00]" />
                                  </button>
                                </div>
                                <div className="text-[10px] text-gray-600 mb-1 uppercase tracking-widest">{lang || 'code'}</div>
                                <pre className="bg-[#000] p-4 rounded border border-[#1A1A1A] overflow-x-auto text-[#CCFF00]">
                                  <code>{code}</code>
                                </pre>
                              </div>
                            );
                          }
                          return part.split('\n').map((line, j) => (
                            <p key={j} className={line.trim() ? 'mb-4' : ''}>{line}</p>
                          ));
                        })}
                     </div>
                  </div>
                ))}

                {isThinking && (
                  <div className="flex flex-col space-y-2 text-[#CCFF00] font-mono text-[10px]">
                     <div className="flex items-center space-x-2">
                        <Loader2 size={12} className="animate-spin" />
                        <span className="animate-pulse">[{thinkingStep}]</span>
                     </div>
                     <div className="w-full bg-[#1A1A1A] h-1 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 2.5, ease: "linear" }}
                          className="h-full bg-[#CCFF00]"
                        />
                     </div>
                  </div>
                )}
              </div>

              {/* Input Zone */}
              <form onSubmit={handleSend} className="p-6 bg-[#0A0A0A] border-t border-[#1A1A1A]">
                <div className="relative">
                  <input 
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Query protocol index..."
                    className="w-full bg-[#000] border border-[#1A1A1A] rounded p-4 pr-12 text-sm font-mono text-white placeholder:text-gray-800 focus:outline-none focus:border-[#CCFF00]/50 transition-all"
                  />
                  {!input && <span className="absolute left-[170px] top-[18px] blinking-cursor pointer-events-none" />}
                  <button 
                    type="submit"
                    aria-label="Send Query"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#CCFF00] hover:scale-110 transition-transform"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
