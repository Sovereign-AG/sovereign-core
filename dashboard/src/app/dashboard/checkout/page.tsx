"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ShieldCheck, Activity, 
  Lock, ArrowUpRight, CheckCircle2, AlertCircle,
  Building2, Globe, Check, Info, Wallet, Receipt, CreditCard as CardIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- HIGH-FIDELITY COLORED LOGOS (OFFICIAL SVGS) ---

const GPayLogo = () => (
  <svg width="45" height="18" viewBox="0 0 61 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M29.622 5.076h-5.023v17.26h2.247v-6.702h2.776c3.224 0 5.867-2.428 5.867-5.279s-2.643-5.279-5.867-5.279zm0 8.271H26.84V7.062h2.782c1.884 0 3.393 1.341 3.393 2.924 0 1.583-1.509 2.924-3.393 2.924h.001zm13.111 1.705c-1.684 0-3.041 1.258-3.528 2.531l-2.18-.89c.895-2.221 3.037-3.834 5.708-3.834 3.42 0 5.882 2.453 5.882 5.67v5.18h-2.244v-1.656c-.733 1.135-1.954 1.944-3.551 1.944-2.484 0-4.303-1.848-4.303-3.968 0-2.121 1.819-3.834 4.303-3.834 1.487 0 2.766.726 3.434 1.623v-.733c0-2.112-1.536-3.733-3.521-3.733zm.24 6.471c1.238 0 2.29-.768 2.813-1.688-.501-1.026-1.554-1.728-2.813-1.728-1.344 0-2.316.883-2.316 1.728 0 .845 1.011 1.688 2.316 1.688zm12.922-7.753l-3.344 7.824h-2.433l1.171-2.684-3.906-7.98h2.518l1.961 4.704.148.406 1.834-4.71h2.051v.44z" fill="white"/>
    <path d="M9.261 10.354v2.221h5.45c-.218 1.229-1.442 3.595-5.45 3.595-3.498 0-6.353-2.902-6.353-6.47s2.855-6.47 6.353-6.47c1.993 0 3.325.828 4.088 1.564l1.761-1.693C13.987 1.956 11.839.878 9.261.878 4.145.878 0 5.023 0 10.139s4.145 9.261 9.261 9.261c5.342 0 8.892-3.757 8.892-9.044 0-.608-.068-1.068-.148-1.528H9.261v1.526z" fill="#4285F4"/>
    <path d="M0 10.139c0 1.246.244 2.434.68 3.523l5.882-4.545V7.051L.68 1.834C.244 2.923 0 4.111 0 5.358v4.781z" fill="#EA4335"/>
    <path d="M14.711 16.17c-1.353.947-3.111 1.517-5.45 1.517-3.498 0-6.353-2.902-6.353-6.47 0-.332.025-.658.074-.977L.68 13.662C2.128 17.518 5.617 20.278 9.261 20.278c2.511 0 4.621-.839 6.136-2.28l-1.686-1.828z" fill="#34A853"/>
    <path d="M18.153 10.139c0-.608-.068-1.068-.148-1.528h-8.744v2.221h5.45c-.071.399-.211.785-.411 1.139l1.686 1.828c1.36-1.047 2.167-2.585 2.167-3.66z" fill="#FBBC05"/>
  </svg>
);

const ApplePayLogo = () => (
  <svg width="45" height="18" viewBox="0 0 54 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M47.784 4.757c-1.742 0-3.218 1.476-3.218 3.218V17.7h3.218V7.975c0-.737.603-1.34 1.34-1.34s1.34.603 1.34 1.34V17.7h3.218V7.975c0-1.742-1.476-3.218-3.218-3.218h-2.68zm-16.362 10.452V17.7h3.218V12.004c0-2.813 2.278-5.091 5.091-5.091 2.813 0 5.091 2.278 5.091 5.091V17.7h3.218V12.004c0-4.556-3.753-8.309-8.309-8.309-2.278 0-4.288.938-5.762 2.412-.67-1.474-2.144-2.412-3.886-2.412h-1.34v13.951h3.218V15.209h-1.34zm-16.496-8.309c-3.216 0-5.892 2.676-5.892 5.892s2.676 5.892 5.892 5.892c1.072 0 2.011-.268 2.949-.67v2.68c-.938.402-1.877.67-2.949.67-4.69 0-8.572-3.882-8.572-8.572 0-4.69 3.882-8.572 8.572-8.572 1.072 0 2.011.268 2.949.67V7.302c-.938-.402-1.877-.854-2.949-.854zm-12.722-6.1c-1.206 0-2.144.938-2.144 2.144v16.08c0 1.206.938 2.144 2.144 2.144h18.76c1.206 0 2.144-.938 2.144-2.144V2.793c0-1.206-.938-2.144-2.144-2.144h-18.76z" fill="white"/>
  </svg>
);

const VisaLogo = () => (
  <svg width="35" height="12" viewBox="0 0 35 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.604 0.238L9.404 11.438H12.204L16.404 0.238H13.604ZM28.304 0.238L25.971 7.705L25.038 3.038C24.804 1.638 23.871 0.471 22.471 0.238H18.504V0.705C19.671 0.938 20.604 1.638 20.838 3.038L22.704 11.438H25.504L29.704 0.238H28.304ZM6.371 0.238H0.304V0.705C2.638 1.288 4.504 3.038 4.971 5.371L5.904 11.438H8.704L12.904 0.238H10.104C10.104 0.238 6.838 0.238 6.371 0.238ZM34.838 0.238H32.504C31.804 0.238 31.338 0.588 31.104 1.171L27.371 11.438H30.171L30.638 10.038H34.138L34.488 11.438H37.171L34.838 0.238ZM31.338 8.171L32.504 4.905L33.088 8.171H31.338Z" fill="#1A1F71"/>
    <path d="M6.371 0.238C5.904 0.238 3.138 0.238 0.304 0.238L0 0.5C2.8 1.1 4.5 2.8 5 5.2L5.9 11.4H8.7L12.9 0.2H10.1" fill="#F7B600"/>
  </svg>
);

const MasterCardLogo = () => (
  <svg width="28" height="18" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="7.5" cy="7.5" r="7.5" fill="#EB001B"/>
    <circle cx="16.5" cy="7.5" r="7.5" fill="#F79E1B"/>
    <path d="M12 12.8C13.5 11.5 14.4 9.6 14.4 7.5C14.4 5.4 13.5 3.5 12 2.2C10.5 3.5 9.6 5.4 9.6 7.5C9.6 9.6 10.5 11.5 12 12.8Z" fill="#FF5F00"/>
  </svg>
);

const AmexLogo = () => (
  <svg width="28" height="18" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="12" fill="#007BC1"/>
    <path d="M25 75L40 25H45L60 75H53L50 65H35L32 75H25ZM37 58H48L42.5 40L37 58Z" fill="white"/>
  </svg>
);

const SOLIcon = () => (
  <svg width="20" height="20" viewBox="0 0 397 311" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-64.6 64.6c-2.4 2.4-5.7 3.8-9.2 3.8H4.6c-5.8 0-8.7-7-4.6-11.1l64.6-64.6zM332.4 73.1c-2.4 2.4-5.7 3.8-9.2 3.8H5.8c-5.8 0-8.7-7-4.6-11.1L65.8 1.2c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-64.6 64.6zM64.6 155.5c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-64.6 64.6c-2.4 2.4-5.7 3.8-9.2 3.8H4.6c-5.8 0-8.7-7-4.6-11.1l64.6-64.6z" fill="url(#sol_gradient)"/>
    <defs>
      <linearGradient id="sol_gradient" x1="397" y1="155.5" x2="0" y2="155.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00FFA3"/>
        <stop offset="1" stopColor="#DC1FFF"/>
      </linearGradient>
    </defs>
  </svg>
);

const USDCIcon = () => (
  <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="16" fill="#2775CA"/>
    <path d="M19.3 12.8c0-1.1-.7-1.8-2.1-1.8h-2.4c-1.4 0-2.1.7-2.1 1.8v.1c0 1.1.7 1.8 2.1 1.8h2.4c1.4 0 2.1.7 2.1 1.8v.1c0 1.1-.7 1.8-2.1 1.8H15c-1.4 0-2.1-.7-2.1-1.8m4.3-3.7V22m-6.4-12.9V22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export default function EnterpriseCheckout() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'wallet' | 'crypto'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvc: '', name: '' });

  const handleActivation = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'ACTIVATE_POST_PAID', method: selectedMethod })
      });
      if (res.ok) {
        setTimeout(() => {
          setIsProcessing(false);
          setIsSuccess(true);
          setTimeout(() => router.push('/dashboard/billing'), 2000);
        }, 2500);
      } else {
        setIsProcessing(false);
        alert("Authorization failed.");
      }
    } catch (e) {
      setIsProcessing(false);
    }
  };

  const PaymentOption = ({ id, title, sub, logos }: any) => (
    <button
      onClick={() => setSelectedMethod(id)}
      className={cn(
        "w-full p-6 rounded-[2rem] border text-left transition-all flex items-center justify-between group relative overflow-hidden",
        selectedMethod === id 
          ? "border-blue-500 bg-blue-500/[0.03] ring-1 ring-blue-500/50" 
          : "border-zinc-800 bg-zinc-900/20 hover:bg-zinc-800/40"
      )}
    >
      <div className="flex items-center space-x-6 z-10">
        <div className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
          selectedMethod === id ? "border-blue-500 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)]" : "border-zinc-700 bg-zinc-950"
        )}>
          {selectedMethod === id && <Check size={12} strokeWidth={4} className="text-white" />}
        </div>
        <div>
          <p className={cn("text-sm font-black tracking-widest transition-colors", selectedMethod === id ? "text-white" : "text-zinc-500")}>{title}</p>
          <p className="text-[10px] text-zinc-600 font-bold mt-1 uppercase tracking-tight">{sub}</p>
        </div>
      </div>
      <div className="flex items-center space-x-4 z-10">
         {logos}
      </div>
      {selectedMethod === id && (
        <motion.div layoutId="active-bg" className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.05] to-transparent pointer-events-none" />
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-blue-500/30 flex flex-col">
      
      <header className="h-20 border-b border-zinc-900 bg-black/40 backdrop-blur-xl flex items-center px-10 justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-6">
           <button onClick={() => router.back()} className="p-3 hover:bg-zinc-900 rounded-2xl transition-all text-zinc-500 hover:text-white border border-transparent hover:border-zinc-800">
              <ArrowLeft size={20} />
           </button>
           <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                 <Building2 size={20} className="text-black" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xs tracking-[0.3em] text-white uppercase italic">Sovereign Forge</span>
                <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">Institutional Gateway</span>
              </div>
           </div>
        </div>
        <div className="flex items-center space-x-8 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
           <div className="flex items-center"><ShieldCheck size={14} className="mr-3 text-blue-500" /> AES-256 ENCRYPTED</div>
           <div className="w-10 h-10 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-center text-zinc-400 font-black shadow-inner">AG</div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 p-10 lg:p-24">
        
        {/* Left: Interactive Payment Selection */}
        <div className="lg:col-span-7 space-y-16">
          
          <div className="space-y-4">
            <h1 className="text-5xl font-black tracking-tighter text-white uppercase italic leading-none">Activate Registry</h1>
            <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest leading-relaxed max-w-xl">
               Authorize a proprietary settlement rail for your agent fleet. NIST-compliant audit trail active.
            </p>
          </div>

          <div className="space-y-4">
             <label className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.4em] ml-2">Secure Handshake Protocol</label>
             <div className="space-y-4">
                <PaymentOption 
                  id="card" 
                  title="CREDIT / DEBIT" 
                  sub="Visa, Mastercard, Amex Settlement"
                  logos={<div className="flex items-center space-x-4"><VisaLogo /><MasterCardLogo /><AmexLogo /></div>} 
                />
                <PaymentOption 
                  id="wallet" 
                  title="DIGITAL WALLETS" 
                  sub="Direct Apple / Google Authorization"
                  logos={<div className="flex items-center space-x-6"><ApplePayLogo /><GPayLogo /></div>} 
                />
                <PaymentOption 
                  id="crypto" 
                  title="INSTITUTIONAL BRIDGE" 
                  sub="Digital Asset Settlement (SOL / USDC)"
                  logos={<div className="flex items-center space-x-4"><SOLIcon /><USDCIcon /></div>} 
                />
             </div>
          </div>

          <AnimatePresence mode="wait">
            {selectedMethod === 'card' ? (
              <motion.div 
                key="card-interface"
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.95 }}
                className="grid grid-cols-1 gap-12"
              >
                 {/* Premium Card Surface */}
                 <div className="relative h-56 w-[26rem] mx-auto group">
                    <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-[2.5rem] border border-zinc-700/50 shadow-[0_40px_100px_rgba(0,0,0,0.5)] p-10 flex flex-col justify-between overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-40 group-hover:opacity-100 transition-all duration-700 scale-125">
                            {cardData.number.startsWith('4') ? <VisaLogo /> : <MasterCardLogo />}
                        </div>
                        <div className="w-14 h-12 bg-zinc-700/30 rounded-xl border border-zinc-600/30 shadow-inner" />
                        <div className="space-y-6">
                           <p className="text-xl font-mono tracking-[0.3em] text-white uppercase drop-shadow-md">
                              {cardData.number || '•••• •••• •••• ••••'}
                           </p>
                           <div className="flex justify-between items-end">
                              <div className="space-y-1">
                                 <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Cardholder</p>
                                 <p className="text-xs font-black text-zinc-100 uppercase tracking-[0.2em]">{cardData.name || 'INSTITUTIONAL MEMBER'}</p>
                              </div>
                              <div className="space-y-1 text-right">
                                 <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest">Expires</p>
                                 <p className="text-xs font-black text-zinc-100 font-mono tracking-widest">{cardData.expiry || 'MM / YY'}</p>
                              </div>
                           </div>
                        </div>
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/5 rounded-full blur-[80px]" />
                    </div>
                 </div>

                 {/* High-Density Form */}
                 <div className="grid grid-cols-1 gap-8 bg-zinc-950/40 p-10 rounded-[3rem] border border-zinc-900 shadow-2xl">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-zinc-700 uppercase tracking-[0.3em] ml-1">Card Identification</label>
                       <input 
                         type="text" 
                         value={cardData.name}
                         onChange={(e) => setCardData({...cardData, name: e.target.value.toUpperCase()})}
                         placeholder="NAME ON ACCOUNT" 
                         className="w-full p-5 bg-black border border-zinc-800 rounded-2xl text-sm font-black focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-white placeholder:text-zinc-900 tracking-widest uppercase" 
                       />
                    </div>
                    <div className="space-y-3">
                       <div className="relative">
                          <input 
                            type="text" 
                            maxLength={19}
                            value={cardData.number}
                            onChange={(e) => setCardData({...cardData, number: e.target.value})}
                            placeholder="CARD NUMBER" 
                            className="w-full p-5 bg-black border border-zinc-800 rounded-2xl text-sm font-mono font-bold focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-white placeholder:text-zinc-900 tracking-[0.2em]" 
                          />
                          <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-30">
                             <CardIcon size={20} />
                          </div>
                       </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                       <input 
                         type="text" 
                         maxLength={5}
                         value={cardData.expiry}
                         onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                         placeholder="MM / YY" 
                         className="w-full p-5 bg-black border border-zinc-800 rounded-2xl text-sm font-mono font-bold focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-white placeholder:text-zinc-900 text-center tracking-widest" 
                       />
                       <input 
                         type="text" 
                         maxLength={4}
                         value={cardData.cvc}
                         onChange={(e) => setCardData({...cardData, cvc: e.target.value})}
                         placeholder="CVC" 
                         className="w-full p-5 bg-black border border-zinc-800 rounded-2xl text-sm font-mono font-bold focus:ring-1 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all text-white placeholder:text-zinc-900 text-center tracking-widest" 
                       />
                    </div>
                 </div>
              </motion.div>
            ) : (
              <motion.div 
                key="redirect-notice"
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                className="p-16 bg-zinc-950/20 border border-zinc-900 border-dashed rounded-[3rem] text-center space-y-6"
              >
                 <div className="w-20 h-20 bg-blue-500/5 rounded-[2rem] flex items-center justify-center mx-auto text-blue-500/30 animate-pulse border border-blue-500/10">
                    {selectedMethod === 'wallet' ? <Wallet size={36} /> : <Globe size={36} />}
                 </div>
                 <div className="space-y-2">
                    <p className="text-xs font-black text-zinc-300 uppercase tracking-[0.2em]">External Handshake Required</p>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
                       Secure provisioner will initialize upon activation
                    </p>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={handleActivation}
            disabled={isProcessing}
            className="w-full py-6 bg-white text-black rounded-[2rem] text-xs font-black uppercase tracking-[0.5em] hover:bg-zinc-200 transition-all flex items-center justify-center shadow-[0_30px_60px_rgba(255,255,255,0.05)] disabled:opacity-50 active:scale-[0.98]"
          >
            {isProcessing ? "ENFORCING PROTOCOL..." : "CONFIRM ACTIVATION"}
          </button>

          <div className="flex items-center justify-center space-x-12 opacity-30">
             <div className="flex items-center text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500"><ShieldCheck size={14} className="mr-3" /> PCI DSS SEALED</div>
             <div className="flex items-center text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500"><Activity size={14} className="mr-3" /> REAL-TIME AUDIT</div>
          </div>

        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-5">
           <div className="bg-zinc-950/80 backdrop-blur-md rounded-[3rem] border border-zinc-900 p-12 sticky top-24 space-y-12 shadow-2xl">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-10">
                 <h3 className="font-black text-white text-[10px] tracking-[0.5em] uppercase italic">Fiscal Snapshot</h3>
                 <Receipt size={18} className="text-zinc-800" />
              </div>

              <div className="space-y-12">
                 <div className="flex justify-between items-start">
                    <div className="space-y-1">
                       <p className="text-[11px] font-black text-white uppercase tracking-widest">Genesis Program</p>
                       <p className="text-[10px] text-zinc-700 font-black uppercase italic tracking-tighter">Subsidized Provisioning</p>
                    </div>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] bg-emerald-500/5 px-4 py-2 border border-emerald-500/10 rounded-xl">ACTIVE</span>
                 </div>

                 <div className="space-y-8 pt-10 border-t border-zinc-900">
                    <label className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.4em]">Unit Assessment</label>
                    <div className="space-y-5">
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-zinc-600 font-black uppercase tracking-widest">MINT TAX</span>
                          <span className="font-mono font-bold text-white tracking-widest">$1.00 <span className="text-zinc-800 ml-2">/ NODE</span></span>
                       </div>
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-zinc-600 font-black uppercase tracking-widest">ACTION TAX</span>
                          <span className="font-mono font-bold text-white tracking-widest">$0.01 <span className="text-zinc-800 ml-2">/ OPS</span></span>
                       </div>
                       <div className="flex justify-between items-center text-xs">
                          <span className="text-zinc-600 font-black uppercase tracking-widest">HEARTBEAT TAX</span>
                          <span className="font-mono font-bold text-white tracking-widest">$0.0001 <span className="text-zinc-800 ml-2">/ PLS</span></span>
                       </div>
                    </div>
                 </div>

                 <div className="pt-10 border-t border-zinc-900 space-y-8">
                    <div className="flex justify-between items-center">
                       <span className="text-[11px] font-black text-zinc-500 uppercase tracking-[0.3em]">Setup Liability</span>
                       <span className="text-4xl font-black text-white">$0.00</span>
                    </div>
                    <div className="p-5 bg-black border border-zinc-900 rounded-[2rem] text-[10px] text-zinc-600 font-black uppercase text-center tracking-[0.2em] leading-loose">
                       SWEEP INTERVAL: 30 DAYS <br/>
                       <span className="text-zinc-800">THRESHOLD: $1,000.00 AUDIT CAP</span>
                    </div>
                 </div>
              </div>

              <div className="space-y-5 pt-6 border-t border-zinc-900/50 flex flex-col items-center">
                 <div className="flex items-center text-[10px] text-zinc-700 font-black uppercase tracking-[0.3em]">
                    <ShieldCheck size={16} className="mr-4 text-emerald-500/50" />
                    <span>NIST-800-218 PROTOCOL SEALED</span>
                 </div>
              </div>
           </div>
        </div>

      </main>

      <footer className="py-16 border-t border-zinc-900 bg-black/80 text-center">
         <p className="text-[10px] text-zinc-800 font-black uppercase tracking-[0.6em]">
            Sovereign Protocol Settlement Rails // 2026 FORGE GATEWAY
         </p>
      </footer>

      <AnimatePresence>
        {isSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-8">
             <motion.div initial={{ scale: 0.7, y: 50 }} animate={{ scale: 1, y: 0 }} className="bg-black border border-zinc-800 rounded-[4rem] p-20 max-w-xl w-full text-center shadow-[0_0_200px_rgba(59,130,246,0.2)] space-y-12">
                <div className="w-32 h-32 bg-blue-500/5 border border-blue-500/20 rounded-[2.5rem] flex items-center justify-center mx-auto text-blue-500 shadow-inner">
                   <CheckCircle2 size={64} strokeWidth={1} />
                </div>
                <div className="space-y-6">
                   <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter">Forge Activated</h2>
                   <p className="text-xs text-zinc-600 font-black uppercase tracking-[0.3em] leading-[2.5]">
                      Handshake Complete. <br/>
                      Settlement Bridge is Live.
                   </p>
                </div>
                <div className="pt-10">
                   <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-1/4 animate-[progress_4s_infinite]" />
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes progress {
          0% { width: 0%; margin-left: 0%; }
          50% { width: 30%; margin-left: 35%; }
          100% { width: 0%; margin-left: 100%; }
        }
      `}</style>
    </div>
  );
}
