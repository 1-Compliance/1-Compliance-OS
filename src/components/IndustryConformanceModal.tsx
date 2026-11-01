import React, { useState } from 'react';
import { IndustryType, CompanyScale } from '../types/compliance';

interface IndustryConformanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndustry: IndustryType;
  currentScale: CompanyScale;
  companyName: string;
  onApplyConformance: (
    industry: IndustryType,
    scale: CompanyScale,
    primaryGoal: string,
    customReqs: string[]
  ) => void;
  isSubscribed: boolean;
  onOpenSubscriptions: () => void;
}

const INDUSTRY_PROFILES: {
  id: IndustryType;
  title: string;
  badge: string;
  icon: string;
  primaryFrameworks: string[];
  keyPolicies: string[];
  description: string;
  specialScoping: string;
}[] = [
  {
    id: 'healthcare',
    title: 'Healthcare, HealthTech & Biotech',
    badge: 'HIPAA & HITECH Enforced',
    icon: '🏥',
    primaryFrameworks: ['HIPAA Privacy & Security', 'SOC 2 Type II', 'HITECH Act', 'FDA 21 CFR Part 11'],
    keyPolicies: ['Protected Health Information (PHI) Handling', 'Business Associate Agreement (BAA) Governance', 'Patient EHR Data Encryption'],
    description: 'Tailors controls for medical device software, telehealth portals, electronic health records (EHR), and patient privacy protections.',
    specialScoping: 'Scopes BAA vendor checks, emergency PHI breach notifications, and role-based clinician access limits.',
  },
  {
    id: 'fintech_crypto',
    title: 'FinTech, Banking & Digital Assets',
    badge: 'PCI DSS v4 & SOC 2',
    icon: '💳',
    primaryFrameworks: ['PCI DSS v4', 'SOC 2 Type II', 'NYDFS 500', 'MiCA Crypto Assets'],
    keyPolicies: ['Cardholder Data Environment (CDE) Policy', 'Cryptographic Key Management', 'Anti-Money Laundering (AML) & Fraud'],
    description: 'Enforces rigorous controls around transaction ledgers, payment gateways, banking APIs, and cryptographic custody keys.',
    specialScoping: 'Zero-trust network segmentation, mandatory HSM key rotation, and automated tamper-evident transaction logging.',
  },
  {
    id: 'saas',
    title: 'B2B Enterprise SaaS & Cloud Software',
    badge: 'SOC 2 & ISO 27001',
    icon: '☁️',
    primaryFrameworks: ['SOC 2 Type II (All 5 Trust Services)', 'ISO 27001:2022', 'GDPR', 'CCPA'],
    keyPolicies: ['Cloud Infrastructure Security (AWS/GCP/Azure)', 'CI/CD Secure Software Development Life Cycle (SDLC)', 'Incident Response & Breach Notice'],
    description: 'Designed to unblock 6-figure enterprise sales deals by answering and automating vendor security assessments in minutes.',
    specialScoping: 'Continuous container scanning (Trivy), secret detection (Gitleaks), and cloud posture management (Prowler).',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing & Factory Operations',
    badge: 'ISO 27001 & OSHA Safety',
    icon: '🏭',
    primaryFrameworks: ['ISO 27001 ISMS', 'ISO 9001 Quality', 'NIST CSF', 'OSHA Compliance'],
    keyPolicies: ['Factory Floor OT / Industrial Sensor Security', 'Supply Chain Vendor Risk', 'Physical Facility & Badge Access'],
    description: 'Plain-English workflows for shift supervisors, machinery operators, and plant managers alongside IT staff.',
    specialScoping: 'Air-gapped factory networks, physical safety logs, and hazardous material chain-of-custody tracking.',
  },
  {
    id: 'defense_gov',
    title: 'Defense, Aerospace & Government',
    badge: 'CMMC Level 2 & FedRAMP',
    icon: '🛡️',
    primaryFrameworks: ['CMMC Level 2', 'NIST SP 800-171', 'FedRAMP Moderate', 'ITAR Regulations'],
    keyPolicies: ['Controlled Unclassified Information (CUI) Handling', 'US-Person Personnel Screening', 'Air-Gapped Backup & Recovery'],
    description: 'Built for Department of Defense (DoD) contractors, aerospace suppliers, and federal cloud systems requiring strict clearance.',
    specialScoping: 'FIPS 140-3 validated encryption, strict US citizen administrative controls, and sovereign cloud hosting.',
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce & Retail Brands',
    badge: 'PCI DSS & Privacy',
    icon: '🛍️',
    primaryFrameworks: ['PCI DSS v4', 'FTC Safeguards Rule', 'GDPR / Cookie Consent', 'CCPA / CPRA'],
    keyPolicies: ['Payment Tokenization & Checkout Security', 'Customer Privacy & Marketing Consent', 'Third-Party Tracking Pixels & CSP'],
    description: 'Protects consumer checkout funnels, shopping cart integrity, customer payment cards, and marketing consent.',
    specialScoping: 'Content Security Policy (CSP) headers against Magecart card skimming and customer data deletion requests.',
  },
];

export const IndustryConformanceModal: React.FC<IndustryConformanceModalProps> = ({
  isOpen,
  onClose,
  currentIndustry,
  currentScale,
  companyName,
  onApplyConformance,
  isSubscribed,
  onOpenSubscriptions,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>(currentIndustry);
  const [selectedScale, setSelectedScale] = useState<CompanyScale>(currentScale);
  const [primaryGoal, setPrimaryGoal] = useState<string>('Pass SOC 2 Type II / ISO 27001 Audit with 1-Click Binder');
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([
    'Automated Evidence Collection',
    'Custom AI Policy Generator',
    'Continuous Sentinel Probes',
  ]);

  if (!isOpen) return null;

  const currentProfile = INDUSTRY_PROFILES.find((p) => p.id === selectedIndustry) || INDUSTRY_PROFILES[0];

  const handleToggleReq = (req: string) => {
    setSelectedRequirements((prev) =>
      prev.includes(req) ? prev.filter((r) => r !== req) : [...prev, req]
    );
  };

  const handleSave = () => {
    onApplyConformance(selectedIndustry, selectedScale, primaryGoal, selectedRequirements);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-3xl rounded-2xl bg-gradient-to-br from-slate-900 via-[#0b1229] to-slate-900 border-2 border-indigo-500/70 shadow-[0_0_50px_rgba(79,70,229,0.25)] overflow-hidden flex flex-col text-white">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/50 flex items-center justify-center text-xl shadow-inner">
              🏢
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                  Company Architecture Engine
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
                  Dynamic Conformance
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Conform 1-Compliance OS to Your Industry & Requirements
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

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Subscribed Notice */}
          <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/40 text-xs sm:text-sm text-indigo-200 flex items-start gap-3">
            <span className="text-xl">✨</span>
            <div className="space-y-1">
              <strong className="text-white">Conform the entire operating system to your business.</strong>
              <p className="leading-relaxed">
                When you select your industry below, 1-Compliance OS instantly filters your active frameworks, rewrites control priorities, generates industry-tailored policies, and programs Jax and the Sentinels to protect <strong>{companyName || 'your company'}</strong> according to your legal obligations.
              </p>
            </div>
          </div>

          {/* Step 1: Select Industry */}
          <div className="space-y-3">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
              1. Select Your Company's Primary Industry Sector:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {INDUSTRY_PROFILES.map((profile) => (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => setSelectedIndustry(profile.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    selectedIndustry === profile.id
                      ? 'bg-indigo-950/70 border-indigo-400 shadow-md ring-2 ring-indigo-500/40'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-lg">{profile.icon}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-indigo-300 border border-indigo-900/60 font-bold">
                        {profile.badge}
                      </span>
                    </div>
                    <div className="text-xs font-bold text-white leading-tight">
                      {profile.title}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {profile.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Industry Preview Blueprint Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{currentProfile.icon}</span>
                <span className="text-xs font-mono font-bold text-cyan-300">
                  ACTIVE PROFILE: {currentProfile.title.toUpperCase()}
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">
                Auto-Tuned Controls
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block">
                  Enforced Frameworks:
                </span>
                <div className="flex flex-wrap gap-1">
                  {currentProfile.primaryFrameworks.map((fw, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950 text-indigo-200 border border-indigo-800 font-bold"
                    >
                      {fw}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block">
                  Mandatory Scoped Policies:
                </span>
                <ul className="text-[11px] text-slate-300 space-y-0.5">
                  {currentProfile.keyPolicies.map((pol, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 truncate">
                      <span className="text-cyan-400">▪</span>
                      <span>{pol}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 font-mono pt-1 border-t border-slate-800">
              <strong className="text-cyan-300">Special Scoping Rules:</strong> {currentProfile.specialScoping}
            </div>
          </div>

          {/* Step 2: Company Scale */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
              2. Company Workforce Scale:
            </label>
            <div className="grid grid-cols-3 gap-3 text-xs">
              {[
                { id: 'startup_small', label: 'Startup / Small Team', sub: '1 - 20 employees' },
                { id: 'mid_market', label: 'Mid-Market Scaleup', sub: '21 - 100 employees' },
                { id: 'enterprise_global', label: 'Enterprise Workforce', sub: '100+ employees' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedScale(s.id as CompanyScale)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    selectedScale === s.id
                      ? 'bg-cyan-950/60 border-cyan-400 text-white font-bold shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="text-xs font-bold">{s.label}</div>
                  <div className="text-[10px] font-mono text-slate-500 mt-0.5">{s.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Primary Compliance Goal */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
              3. What is your #1 immediate compliance priority?
            </label>
            <select
              value={primaryGoal}
              onChange={(e) => setPrimaryGoal(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400 font-mono"
            >
              <option value="Pass SOC 2 Type II / ISO 27001 Audit with 1-Click Binder">
                🎯 Pass SOC 2 Type II / ISO 27001 Audit with 1-Click Binder
              </option>
              <option value="Unblock High-Value Enterprise Customer Security Questionnaire">
                🚀 Unblock High-Value Enterprise Customer Security Questionnaire
              </option>
              <option value="HIPAA Compliance & Patient Protected Health Information (PHI)">
                🏥 HIPAA Compliance & Patient Protected Health Information (PHI)
              </option>
              <option value="PCI DSS v4 Payment Card & Checkout Security">
                💳 PCI DSS v4 Payment Card & Checkout Security
              </option>
              <option value="CMMC Level 2 & Defense Contractor DoD Attestation">
                🛡️ CMMC Level 2 & Defense Contractor DoD Attestation
              </option>
              <option value="Deploy Autonomous Sentinels to Guard Infrastructure 24/7">
                🤖 Deploy Autonomous Sentinels to Guard Infrastructure 24/7
              </option>
            </select>
          </div>

          {/* Step 4: Specific Compliance Modules to Enable */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
              4. Core Modules & Automations to Activate:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                'Automated Evidence Collection',
                'Custom AI Policy Generator',
                'Continuous Sentinel Probes',
                'Vendor Risk & Trust Directory (TPCRM)',
                'Gamified Employee Training Arcade',
                'Cross-Department Plain English Hub (Factory, HR, IT)',
                '1-Click Auditor ZIP Package Binder',
                'White-Label Portal Branded for Company',
              ].map((mod) => (
                <label
                  key={mod}
                  className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-colors ${
                    selectedRequirements.includes(mod)
                      ? 'bg-indigo-950/50 border-indigo-500/70 text-indigo-200 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedRequirements.includes(mod)}
                    onChange={() => handleToggleReq(mod)}
                    className="accent-indigo-500 rounded"
                  />
                  <span>{mod}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-800 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 font-mono text-center sm:text-left">
            <span>Re-tunes controls & evidence maps in real time.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="flex-1 sm:flex-none px-6 py-2.5 text-xs font-black text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:opacity-95 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🚀</span>
              <span>Apply Industry Conformance to OS</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
