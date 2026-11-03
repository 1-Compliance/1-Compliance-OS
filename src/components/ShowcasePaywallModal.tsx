import React from 'react';

interface ShowcasePaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName?: string;
  onNavigateToSubscriptions: () => void;
  onUnlockDemo: () => void;
}

export const ShowcasePaywallModal: React.FC<ShowcasePaywallModalProps> = ({
  isOpen,
  onClose,
  featureName = 'Live Audit Execution',
  onNavigateToSubscriptions,
  onUnlockDemo,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-2xl bg-gradient-to-br from-slate-900 via-[#0a1024] to-slate-900 border-2 border-cyan-500/70 shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col text-white">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-xl shadow-inner">
              🔒
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                  Showcase Demo Mode
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  Read-Only Example
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Subscription Required to Unlock: {featureName}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong className="text-white">You are previewing a sample compliance environment on www.1-compliance.com.</strong> Public visitors have visual access to explore our 5 Autonomous Sentinels and compliance architecture, but live scanning, automated policy authoring, auditor exports, and custom team workspaces are strictly reserved for verified subscribers.
          </div>

          {/* Value Prop Checklist */}
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              What unlocks upon company subscription:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Industry Auto-Conformance:</strong> Conforms specifically to Healthcare (HIPAA), FinTech (PCI DSS), SaaS, or Defense (CMMC).</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Live Continuous Sentinels:</strong> Jax, IT, Privacy, HR, and Risky Sentinels actively guard your company.</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>1-Click CPA Auditor ZIP Package:</strong> Export tamper-proof SHA-256 evidence binders ready for AICPA/ISO auditors.</span>
              </div>
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
                <span className="text-emerald-400 font-bold shrink-0">✓</span>
                <span><strong>Company-Wide User Pool:</strong> All approved employees join via corporate email whitelist (@yourcompany.com).</span>
              </div>
            </div>
          </div>

          {/* Quick Subscription Tier Selector */}
          <div className="space-y-3">
            <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              Choose your company subscription tier:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              {/* Solo */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between hover:border-cyan-500/60 transition-colors">
                <div>
                  <div className="font-bold text-white text-sm">Solo / Founder</div>
                  <div className="text-slate-400 text-[11px] mt-0.5">1 Dedicated Login</div>
                  <div className="text-2xl font-black font-mono text-cyan-400 my-2">$149<span className="text-xs text-slate-400 font-normal">/mo</span></div>
                  <p className="text-[11px] text-slate-400">Complete autonomous OS for solo founders and CISOs.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToSubscriptions();
                  }}
                  className="mt-3 w-full py-2 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-white font-bold transition-all text-xs"
                >
                  Subscribe $149/mo
                </button>
              </div>

              {/* Team */}
              <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/50 flex flex-col justify-between hover:border-indigo-400 transition-colors">
                <div>
                  <div className="font-bold text-white text-sm">Team Compliance</div>
                  <div className="text-indigo-300 text-[11px] mt-0.5">Up to 5 Logins</div>
                  <div className="text-2xl font-black font-mono text-indigo-400 my-2">$299<span className="text-xs text-slate-400 font-normal">/mo</span></div>
                  <p className="text-[11px] text-slate-400">Cross-department hub for growing startups and managers.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToSubscriptions();
                  }}
                  className="mt-3 w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all text-xs shadow-md"
                >
                  Subscribe $299/mo
                </button>
              </div>

              {/* Enterprise */}
              <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/60 to-slate-950 border-2 border-cyan-400 flex flex-col justify-between relative shadow-lg">
                <div className="absolute -top-2.5 right-3 px-2 py-0.5 rounded text-[9px] font-mono font-black bg-cyan-400 text-slate-950">
                  POPULAR
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Enterprise Scale</div>
                  <div className="text-cyan-300 text-[11px] mt-0.5">6 to 100 Users</div>
                  <div className="text-2xl font-black font-mono text-white my-2">$999<span className="text-xs text-slate-400 font-normal">/mo</span></div>
                  <p className="text-[11px] text-slate-300">Entire company access across Factory, HR, IT, and Finance.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigateToSubscriptions();
                  }}
                  className="mt-3 w-full py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black transition-all text-xs shadow-md"
                >
                  Subscribe $999/mo
                </button>
              </div>
            </div>
          </div>

          {/* Admin / Founder Quick-Unlock Testing Option */}
          <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-400 text-center sm:text-left">
              Already a subscribed enterprise or testing your deployment?
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onUnlockDemo();
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 font-mono text-xs border border-cyan-800/60 transition-colors"
                title="Toggle active organization subscription state for demonstration"
              >
                🔓 Switch to Active Company Mode
              </button>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onNavigateToSubscriptions();
                }}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs hover:opacity-95 transition-all shadow-sm"
              >
                View Square Portal →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
