import React, { useState } from 'react';
import { IndustryType, CompanyScale, JurisdictionRegion } from '../types/compliance';

interface IndustryConformanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentIndustry: IndustryType;
  currentScale: CompanyScale;
  currentJurisdiction?: JurisdictionRegion;
  companyName: string;
  onApplyConformance: (
    industry: IndustryType,
    scale: CompanyScale,
    primaryGoal: string,
    customReqs: string[],
    jurisdiction: JurisdictionRegion
  ) => void;
  isSubscribed: boolean;
  onOpenSubscriptions: () => void;
}

const JURISDICTION_PROFILES: {
  id: JurisdictionRegion;
  flag: string;
  name: string;
  region: string;
  keyActs: string[];
  statutoryObligations: string;
}[] = [
  {
    id: 'us_federal',
    flag: '🇺🇸',
    name: 'United States (Federal & 50 States Baseline)',
    region: 'North America / Federal',
    keyActs: ['FinCEN BOI (CTA)', 'FTC Safeguards Rule', 'EEOC / OSHA Labor', 'SEC Cyber Incident Rules'],
    statutoryObligations: 'Mandatory Corporate Transparency Act beneficial ownership filing, 4-day SEC breach disclosure for public entities, OSHA workplace safety logs.',
  },
  {
    id: 'us_ca',
    flag: '🇺🇸',
    name: 'United States — California',
    region: 'North America / State',
    keyActs: ['CCPA / CPRA Privacy', 'Cal/OSHA SB 553 Violence Plan', 'AB 685 Workplace Notice', 'Pay Transparency Act'],
    statutoryObligations: 'Mandatory SB 553 written Workplace Violence Prevention Plan, CPRA opt-out mechanisms, consumer deletion portals, and annual pay data filings.',
  },
  {
    id: 'us_ny',
    flag: '🇺🇸',
    name: 'United States — New York',
    region: 'North America / State',
    keyActs: ['NYDFS Part 500 (Cyber)', 'NY SHIELD Act', 'NY HERO Act Health', 'NYC Local Law 144 AI Hiring'],
    statutoryObligations: 'Annual NYDFS CISO compliance attestation, independent AI bias audits for candidate screening algorithms, 72-hour regulatory breach notices.',
  },
  {
    id: 'us_il',
    flag: '🇺🇸',
    name: 'United States — Illinois',
    region: 'North America / State',
    keyActs: ['Illinois BIPA (Biometric)', 'AI Video Interview Act', 'Paid Leave for All Workers Act'],
    statutoryObligations: 'Written consent & retention schedules before collecting employee/customer biometrics, AI interview explanation disclosures, mandatory paid leave.',
  },
  {
    id: 'us_tx',
    flag: '🇺🇸',
    name: 'United States — Texas',
    region: 'North America / State',
    keyActs: ['Texas Data Privacy & Security Act (TDPSA)', 'Texas Identity Theft Enforcement', 'Texas Labor Code'],
    statutoryObligations: 'Comprehensive consumer data rights, universal opt-out recognition, mandatory data protection assessments for targeted advertising.',
  },
  {
    id: 'eu',
    flag: '🇪🇺',
    name: 'European Union (EU / EEA)',
    region: 'Europe',
    keyActs: ['EU GDPR (Arts 1-99)', 'NIS2 Directive (Infrastructure)', 'DORA (Finance Resilience)', 'EU AI Act (CE Conformity)'],
    statutoryObligations: '72-hour DPA breach notifications, Data Protection Impact Assessments (DPIAs), cross-border Standard Contractual Clauses (SCCs), AI risk-tier classification.',
  },
  {
    id: 'uk',
    flag: '🇬🇧',
    name: 'United Kingdom (UK)',
    region: 'Europe / UK',
    keyActs: ['UK GDPR', 'Data Protection Act 2018', 'Cyber Essentials Plus', 'Companies House PSC'],
    statutoryObligations: 'ICO registration and incident notification, UK International Data Transfer Agreements (IDTAs), People with Significant Control (PSC) filing.',
  },
  {
    id: 'canada',
    flag: '🇨🇦',
    name: 'Canada (Federal & Provinces)',
    region: 'North America',
    keyActs: ['PIPEDA Federal', 'Quebec Law 25', 'Bill C-27 / CPPA', 'Canada Labour Code'],
    statutoryObligations: 'Mandatory privacy officer appointment, privacy impact assessments, default opt-in consent for sensitive data, Office of the Privacy Commissioner breach logging.',
  },
  {
    id: 'australia',
    flag: '🇦🇺',
    name: 'Australia & New Zealand',
    region: 'Asia-Pacific',
    keyActs: ['Australia Privacy Act 1988 (APPs)', 'APRA CPS 234', 'ACSC Essential Eight', 'Privacy Amendment 2022'],
    statutoryObligations: 'Notifiable Data Breaches (NDB) scheme, APRA financial prudential information security controls, Essential Eight technical mitigation audits.',
  },
  {
    id: 'apac',
    flag: '🇸🇬',
    name: 'Singapore & APAC Hub',
    region: 'Asia-Pacific',
    keyActs: ['Singapore PDPA 2020', 'MAS Notice 655 (Cyber Hygiene)', 'Japan APPI (Act on Personal Info)'],
    statutoryObligations: 'Mandatory Data Protection Officer (DPO) registration, 3-day PDPC breach notification, MAS financial technology risk management compliance.',
  },
  {
    id: 'brazil_lgpd',
    flag: '🇧🇷',
    name: 'Brazil & Latin America',
    region: 'Latin America',
    keyActs: ['Brazil LGPD (Law 13.709)', 'ANPD Directives', 'Mexico LFPDPE'],
    statutoryObligations: 'Encarregado (DPO) appointment, legitimate interest assessments, ANPD security incident reporting protocols, international transfer compliance.',
  },
  {
    id: 'switzerland_fadp',
    flag: '🇨🇭',
    name: 'Switzerland',
    region: 'Europe / Non-EU',
    keyActs: ['Swiss revFADP (Federal Act on Data Protection)', 'FDPIC Regulations', 'Swiss Code of Obligations'],
    statutoryObligations: 'FDPIC rapid breach disclosure, records of processing activities (ROPA), governance of high-risk profiling and automated decision-making.',
  },
  {
    id: 'global',
    flag: '🌐',
    name: 'Global Cross-Border Multinational Baseline',
    region: 'Global / Multi-Jurisdictional',
    keyActs: ['Universal Baseline (GDPR + US + APAC)', 'Standard Contractual Clauses (SCCs)', 'Binding Corporate Rules (BCRs)'],
    statutoryObligations: 'Multi-jurisdiction risk registers, international vendor transfer gateways, global corporate governance attestation packages.',
  },
];

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
    id: 'law_firm',
    title: 'Law Firms, Legal Practices & In-House Counsel',
    badge: 'ABA Model Rules & Privilege',
    icon: '⚖️',
    primaryFrameworks: ['ABA Formal Op. 477R / 483', 'SOC 2 Type II (Client Mandate)', 'State Bar Trust Rules (IOLTA)', 'FinCEN Beneficial Ownership'],
    keyPolicies: ['Attorney-Client Privilege Data Segregation', 'Litigation Hold & Document Preservation', 'Ethical Walls & Conflict Check Security', 'Lawyer Email Encryption & DPA'],
    description: 'Built specifically for law practices to protect client secrets, attorney work product, court filings, IOLTA escrow accounts, and satisfy rigorous corporate client vendor audits.',
    specialScoping: 'Enforces matter-level access segregation, automated ethical wall enforcement between adverse parties, and defensible litigation hold audit trails.',
  },
  {
    id: 'cpa_accounting',
    title: 'CPA, Accounting & Tax Advisory Firms',
    badge: 'IRS Pub 4557 & FTC Safeguards',
    icon: '📑',
    primaryFrameworks: ['IRS Publication 4557 (Safeguards)', 'FTC Safeguards Rule', 'AICPA SOC for Service Orgs', 'GLBA Financial Privacy'],
    keyPolicies: ['Written Information Security Plan (WISP)', 'IRS Section 7216 Tax Disclosure Policy', 'Client Tax Return Data Encryption', 'Seasonal Preparer Access Scoping'],
    description: 'Built for CPAs and accounting firms to protect client tax returns, SSNs/EINs, bookkeeping ledgers, and maintain a 100% compliant IRS Written Information Security Plan (WISP).',
    specialScoping: 'Pre-formatted IRS WISP binder, strict tax software multi-factor authentication checks, and IRS § 7216 third-party disclosure authorizations.',
  },
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
    primaryFrameworks: ['PCI DSS v4', 'SOC 2 Type II', 'NYDFS Part 500', 'MiCA Crypto Assets'],
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
    keyPolicies: ['Cloud Infrastructure Security (AWS/GCP/Azure)', 'CI/CD Secure SDLC Protocol', 'Incident Response & Breach Notice'],
    description: 'Designed to unblock 6-figure enterprise sales deals by answering and automating vendor security assessments in minutes.',
    specialScoping: 'Continuous container scanning (Trivy), secret detection (Gitleaks), and cloud posture management (Prowler).',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing & Factory Operations',
    badge: 'ISO 27001 & OSHA Safety',
    icon: '🏭',
    primaryFrameworks: ['ISO 27001 ISMS', 'ISO 9001 Quality', 'NIST CSF', 'OSHA Compliance'],
    keyPolicies: ['Factory Floor OT / Sensor Security', 'Supply Chain Vendor Risk', 'Physical Facility & Badge Access'],
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
  currentJurisdiction = 'us_federal',
  companyName,
  onApplyConformance,
  isSubscribed,
  onOpenSubscriptions,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryType>(currentIndustry);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState<JurisdictionRegion>(currentJurisdiction);
  const [selectedScale, setSelectedScale] = useState<CompanyScale>(currentScale);
  const [primaryGoal, setPrimaryGoal] = useState<string>('Pass SOC 2 / ISO 27001 / Regulatory Audits with 1-Click Binder');
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([
    'Automated Evidence Collection',
    'Custom AI Policy Generator',
    'Continuous Sentinel Probes',
    'FinCEN / Corporate Filing Deadlines',
    'Local Statutory Employment Laws',
  ]);

  if (!isOpen) return null;

  const currentProfile = INDUSTRY_PROFILES.find((p) => p.id === selectedIndustry) || INDUSTRY_PROFILES[0];
  const currentJurisdictionProfile = JURISDICTION_PROFILES.find((j) => j.id === selectedJurisdiction) || JURISDICTION_PROFILES[0];

  const handleToggleReq = (req: string) => {
    setSelectedRequirements((prev) =>
      prev.includes(req) ? prev.filter((r) => r !== req) : [...prev, req]
    );
  };

  const handleSave = () => {
    onApplyConformance(selectedIndustry, selectedScale, primaryGoal, selectedRequirements, selectedJurisdiction);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl rounded-3xl bg-slate-900 border-2 border-indigo-500/70 shadow-2xl overflow-hidden flex flex-col text-white">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/50 flex items-center justify-center text-xl shadow-inner">
              🏢
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                  Universal Conformance Engine
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
                  Global & Multi-Industry
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white">
                Conform 1-Compliance OS to Your Industry & Jurisdiction
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[75vh]">
          {/* Welcome Banner */}
          <div className="p-4 rounded-2xl bg-indigo-950/50 border border-indigo-500/40 text-xs text-indigo-200 flex items-start gap-3">
            <span className="text-xl">🌐</span>
            <div className="space-y-1">
              <strong className="text-white text-sm">
                Conform the entire operating system to any business worldwide.
              </strong>
              <p className="leading-relaxed">
                Whether you are a <strong>Law Firm</strong> protecting client privilege, a <strong>CPA Firm</strong> complying with IRS Pub 4557 & FTC Safeguards, or an enterprise operating in the <strong>US (all 50 states), EU, UK, Canada, Australia, or Singapore</strong>, 1-Compliance OS instantly aligns all frameworks, policy handbooks, risk ledgers, and sentinel monitors to your exact legal parameters.
              </p>
            </div>
          </div>

          {/* STEP 1: SELECT JURISDICTION / COUNTRY */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                <span>1. Select Country, Region & Governing Jurisdiction:</span>
              </label>
              <span className="text-[11px] font-mono text-cyan-400 font-bold">
                {currentJurisdictionProfile.flag} {currentJurisdictionProfile.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-52 overflow-y-auto p-1 bg-slate-950/60 rounded-2xl border border-slate-800">
              {JURISDICTION_PROFILES.map((jur) => {
                const isSelected = selectedJurisdiction === jur.id;
                return (
                  <button
                    key={jur.id}
                    type="button"
                    onClick={() => setSelectedJurisdiction(jur.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-indigo-950 border-cyan-400 ring-2 ring-cyan-400/30 text-white shadow-sm'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{jur.flag}</span>
                      <div className="font-bold text-xs truncate leading-tight">{jur.name}</div>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 mt-1 truncate">
                      {jur.keyActs.slice(0, 2).join(' · ')}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-indigo-500/30 text-xs space-y-1">
              <span className="text-[10px] font-mono uppercase text-cyan-300 font-bold block">
                Jurisdiction Statutory Rules & Filings Enforced:
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {currentJurisdictionProfile.statutoryObligations}
              </p>
            </div>
          </div>

          {/* STEP 2: SELECT INDUSTRY SECTOR */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                2. Select Your Company's Primary Industry Sector:
              </label>
              <span className="text-[11px] font-mono text-cyan-400 font-bold">
                {currentProfile.icon} {currentProfile.title}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {INDUSTRY_PROFILES.map((profile) => (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => setSelectedIndustry(profile.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    selectedIndustry === profile.id
                      ? 'bg-indigo-950 border-indigo-400 shadow-md ring-2 ring-indigo-500/40 text-white'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-1 mb-1.5">
                      <span className="text-xl">{profile.icon}</span>
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

          {/* ACTIVE PROFILE PREVIEW BLUEPRINT */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/40 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{currentProfile.icon}</span>
                <span className="text-xs font-mono font-black text-cyan-300">
                  CONFORMED BLUEPRINT: {currentProfile.title.toUpperCase()}
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold">
                ✓ Auto-Tuned For {currentJurisdictionProfile.name}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
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

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-mono text-[10px] uppercase font-bold block">
                  Mandatory Policies:
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

          {/* STEP 3: WORKFORCE SCALE */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
              3. Company Workforce Scale:
            </label>
            <div className="grid grid-cols-3 gap-3 text-xs">
              {[
                { id: 'startup_small', label: 'Boutique / Small Firm', sub: '1 - 20 employees' },
                { id: 'mid_market', label: 'Mid-Market Practice', sub: '21 - 100 employees' },
                { id: 'enterprise_global', label: 'Multi-Office / Enterprise', sub: '100+ employees' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedScale(s.id as CompanyScale)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
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

          {/* STEP 4: CUSTOM REQUIREMENTS */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider block">
              4. Active Conformance Modules:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {[
                'Automated Evidence Collection',
                'Custom AI Policy Generator',
                'Continuous Sentinel Probes',
                'FinCEN / Corporate Filing Deadlines',
                'Local Statutory Employment Laws',
                'Employee Handbook Synthesizer',
                'Everyday Employee Quests & Sign-Offs',
                'Third-Party Vendor Risk Matrix (TPCRM)',
              ].map((req, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleToggleReq(req)}
                  className={`p-2.5 rounded-xl border text-left transition-colors cursor-pointer flex items-center justify-between ${
                    selectedRequirements.includes(req)
                      ? 'bg-emerald-950/50 border-emerald-400 text-emerald-200'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="font-semibold">{req}</span>
                  <span className="font-mono text-xs">{selectedRequirements.includes(req) ? '✓' : '+'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-slate-800 bg-slate-950/90 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Conforming to: <strong className="text-white">{currentJurisdictionProfile.name}</strong> · <strong className="text-cyan-300">{currentProfile.title}</strong>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 hover:opacity-95 shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>⚡ Apply Conformance Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
