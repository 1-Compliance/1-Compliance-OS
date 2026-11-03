import React, { useState } from 'react';
import { VendorItem, RiskItem } from '../types/compliance';
import { SentinelSpotlightBanner } from './SentinelSpotlightBanner';
import { SENTINELS } from '../data/sentinelsData';
import { ThirdPartyVendorPortal } from './ThirdPartyVendorPortal';

interface VendorRiskViewProps {
  vendors: VendorItem[];
  risks: RiskItem[];
  onAddVendor: (v: VendorItem) => void;
  onUpdateVendor?: (v: VendorItem) => void;
  onUpdateRisk: (r: RiskItem) => void;
  onOpenSentinelHub?: (sentinelId: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const VendorRiskView: React.FC<VendorRiskViewProps> = ({
  vendors,
  risks,
  onAddVendor,
  onUpdateVendor,
  onUpdateRisk,
  onOpenSentinelHub,
  onNavigateTab,
}) => {
  const riskySentinel = SENTINELS.find((s) => s.id === 'risky') || SENTINELS[3];
  const [activeTab, setActiveTab] = useState<'vendors' | 'risks'>('vendors');

  return (
    <div className="space-y-6">
      {/* Risky Sentinel Domain Spotlight */}
      <SentinelSpotlightBanner
        sentinel={riskySentinel}
        onOpenChat={onOpenSentinelHub || (() => {})}
        sectionHeadline="Risky Sentinel — Threat Modeling, Forensics & Third-Party Risk"
        sectionStatus="5×5 Matrix Guard"
      />

      {/* Header with Subtabs */}
      <div className="p-6 rounded-lg bg-slate-900/80 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>Third-Party Governance & Risk Ledger</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-cyan-400">SOC 2 CC9.2 & ISO 27001 A.5.19</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Vendor Risk Management & Threat Modeling Matrix
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Vet third-party suppliers via dedicated guest vetting portals or the $49/mo Verified Vendor Passport network, 
              and maintain an auditor-ready 5x5 Risk Register with mitigating safeguards.
            </p>
          </div>

          <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-lg border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveTab('vendors')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                activeTab === 'vendors'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Vendor Portal & Vetting ({vendors.length})
            </button>
            <button
              onClick={() => setActiveTab('risks')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                activeTab === 'risks'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              5×5 Risk Register ({risks.length})
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'vendors' ? (
        <ThirdPartyVendorPortal
          vendors={vendors}
          onAddVendor={onAddVendor}
          onUpdateVendor={onUpdateVendor || (() => {})}
          onOpenSentinelHub={onOpenSentinelHub}
          onNavigateTab={onNavigateTab}
        />
      ) : (
        /* Risk Register Subtab */
        <div className="space-y-6">
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-white">Enterprise Threat Matrix & Risk Register</h2>
              <p className="text-xs text-slate-400">Likelihood × Impact matrix (1-25) with documented treatment plans required by ISO 27001 Clause 6.1.2.</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-emerald-400">Low (1-6)</span>
              <span>·</span>
              <span className="text-amber-400">Medium (7-14)</span>
              <span>·</span>
              <span className="text-rose-400">High (15-25)</span>
            </div>
          </div>

          <div className="space-y-3">
            {risks.map((r) => (
              <div
                key={r.id}
                className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400 font-medium">{r.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-slate-400">Inherent Score: {r.score}/25</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-cyan-400">Treatment: {r.treatment}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">{r.title}</h3>
                  <div className="p-2.5 rounded bg-slate-950/80 border border-slate-800 text-xs text-slate-300">
                    <span className="text-slate-400 font-medium">Mitigating Safeguard: </span>
                    {r.mitigatingControl}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1 shrink-0 text-right">
                  <div className="text-xs text-slate-400">Residual Risk:</div>
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/60">
                    {r.residualRisk}
                  </span>
                  <div className="text-xs text-slate-400 font-mono mt-1">Status: {r.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
