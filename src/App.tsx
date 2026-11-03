import React, { useState } from 'react';
import {
  INITIAL_FRAMEWORKS,
  INITIAL_CONTROLS,
  INITIAL_POLICIES,
  INITIAL_BLUEPRINTS,
  INITIAL_VENDORS,
  INITIAL_RISKS,
  INITIAL_EVIDENCE,
  INITIAL_ASSETS,
  INITIAL_IT_ASSETS,
  INITIAL_CRYPTO_RECORDS,
  INITIAL_INCIDENTS,
  INITIAL_FORENSICS,
  INITIAL_CALENDAR,
  INITIAL_LEGAL_UPDATES,
  INITIAL_OBLIGATIONS,
  INITIAL_RACI_ROLES,
  INITIAL_TASKS,
  INITIAL_TRAINING,
} from './data/complianceData';
import {
  Framework,
  ControlItem,
  PolicyDocument,
  EvidenceItem,
  VendorItem,
  RiskItem,
  ControlStatus,
  IndustryType,
  CompanyScale,
  CompanyBrandingConfig,
  JurisdictionRegion,
} from './types/compliance';
import { TopNavigation } from './components/TopNavigation';
import { DashboardOverview } from './components/DashboardOverview';
import { FrameworksMatrix } from './components/FrameworksMatrix';
import { WebsiteScannerView } from './components/WebsiteScannerView';
import { ZeroDollarBlueprintView } from './components/ZeroDollarBlueprintView';
import { PolicyEngineView } from './components/PolicyEngineView';
import { VendorRiskView } from './components/VendorRiskView';
import { EnterpriseNotionWorkspaceView } from './components/EnterpriseNotionWorkspaceView';
import { AuditorExportModal } from './components/AuditorExportModal';
import { AIAssistantModal } from './components/AIAssistantModal';
import { SentinelCommandHub } from './components/SentinelCommandHub';
import { SubscriptionBillingView } from './components/SubscriptionBillingView';
import { TrainingGuidebookView } from './components/TrainingGuidebookView';
import { DepartmentHubView } from './components/DepartmentHubView';
import { GamifiedTrainingArcade } from './components/GamifiedTrainingArcade';
import { BeginnerOnboardingModal } from './components/BeginnerOnboardingModal';
import { SentinelId } from './types/sentinels';
import { FloatingSentinelCompanion } from './components/FloatingSentinelCompanion';
import { ShowcasePaywallModal } from './components/ShowcasePaywallModal';
import { IndustryConformanceModal } from './components/IndustryConformanceModal';
import { EmployeeHandbookSynthesizer } from './components/EmployeeHandbookSynthesizer';
import { EmploymentAndLocalLawsView } from './components/EmploymentAndLocalLawsView';
import { EverydayEmployeePortalView } from './components/EverydayEmployeePortalView';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [frameworks, setFrameworks] = useState<Framework[]>(INITIAL_FRAMEWORKS);
  const [controls, setControls] = useState<ControlItem[]>(INITIAL_CONTROLS);
  const [policies, setPolicies] = useState<PolicyDocument[]>(INITIAL_POLICIES);
  const [blueprints] = useState(INITIAL_BLUEPRINTS);
  const [vendors, setVendors] = useState<VendorItem[]>(INITIAL_VENDORS);
  const [risks, setRisks] = useState<RiskItem[]>(INITIAL_RISKS);
  const [evidence, setEvidence] = useState<EvidenceItem[]>(INITIAL_EVIDENCE);

  const [selectedFrameworkId, setSelectedFrameworkId] = useState<string>('all');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isAdvisorOpen, setIsAdvisorOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Sentinel Command Hub State (Jax + 4 Sentinels)
  const [isSentinelHubOpen, setIsSentinelHubOpen] = useState(false);
  const [activeSentinelId, setActiveSentinelId] = useState<SentinelId>('jax');

  const handleOpenSentinelHub = (sentinelId?: string) => {
    if (
      sentinelId &&
      (sentinelId === 'jax' ||
        sentinelId === 'it' ||
        sentinelId === 'privacy' ||
        sentinelId === 'risky' ||
        sentinelId === 'hr')
    ) {
      setActiveSentinelId(sentinelId as SentinelId);
    }
    setIsSentinelHubOpen(true);
  };

  // Cross-Industry, Jurisdiction & Scale Configuration
  const [industry, setIndustry] = useState<IndustryType>('saas');
  const [jurisdiction, setJurisdiction] = useState<JurisdictionRegion>('us_federal');
  const [scale, setScale] = useState<CompanyScale>('startup_small');

  // The 28 Core Notion Topic Datasets
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [itAssets, setItAssets] = useState(INITIAL_IT_ASSETS);
  const [cryptoRecords, setCryptoRecords] = useState(INITIAL_CRYPTO_RECORDS);
  const [incidents, setIncidents] = useState(INITIAL_INCIDENTS);
  const [forensics, setForensics] = useState(INITIAL_FORENSICS);
  const [calendar, setCalendar] = useState(INITIAL_CALENDAR);
  const [legalUpdates, setLegalUpdates] = useState(INITIAL_LEGAL_UPDATES);
  const [obligations, setObligations] = useState(INITIAL_OBLIGATIONS);
  const [raciRoles, setRaciRoles] = useState(INITIAL_RACI_ROLES);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [training, setTraining] = useState(INITIAL_TRAINING);

  // Update control status and recompute framework metrics
  const handleUpdateControlStatus = (controlId: string, newStatus: ControlStatus) => {
    setControls((prev) =>
      prev.map((c) => (c.id === controlId ? { ...c, status: newStatus } : c))
    );
  };

  const handleUpdatePolicy = (updated: PolicyDocument) => {
    setPolicies((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleAddEvidence = (newEvidence: EvidenceItem) => {
    setEvidence((prev) => [newEvidence, ...prev]);

    // Update associated control status to compliant
    if (newEvidence.controlId) {
      setControls((prev) =>
        prev.map((c) =>
          c.id === newEvidence.controlId
            ? { ...c, status: 'compliant', evidenceCount: c.evidenceCount + 1 }
            : c
        )
      );
    }
  };

  const handleAddVendor = (newVendor: VendorItem) => {
    setVendors((prev) => [newVendor, ...prev]);
  };

  const handleUpdateVendor = (updated: VendorItem) => {
    setVendors((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
  };

  const handleUpdateRisk = (updatedRisk: RiskItem) => {
    setRisks((prev) => prev.map((r) => (r.id === updatedRisk.id ? updatedRisk : r)));
  };

  const [theme, setTheme] = useState<'midnight' | 'luminous'>('luminous');

  // Platform Operational Mode: Showcase (Public Visitor / Read-Only Demo) vs Subscribed (Active Enterprise)
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const [paywallModalOpen, setPaywallModalOpen] = useState<boolean>(false);
  const [gatedFeatureName, setGatedFeatureName] = useState<string>('Auditor Package Export');
  const [isConformanceModalOpen, setIsConformanceModalOpen] = useState<boolean>(false);
  const [conformanceToast, setConformanceToast] = useState<string | null>(null);

  const [branding, setBranding] = useState<CompanyBrandingConfig>({
    companyName: '1-Compliance',
    portalSubtitle: 'Enterprise Compliance Operating System',
    primaryColor: '#06b6d4',
    accentColor: '#3b82f6',
    themePreset: 'corporate_blue',
    welcomeMessage: 'Welcome to 1-Compliance Operating System',
    allowedEmailDomains: ['1-compliance.com'],
    isWhiteLabelActive: false,
    corporateDomain: 'app.1-compliance.com',
  });

  const handleTriggerPaywall = (feature: string) => {
    setGatedFeatureName(feature);
    setPaywallModalOpen(true);
  };

  const handleOpenExportBinder = () => {
    if (!isSubscribed) {
      handleTriggerPaywall('Auditor-Ready ZIP Binder & Attestation Evidence Package');
    } else {
      setIsExportOpen(true);
    }
  };

  const handleApplyIndustryConformance = (
    newIndustry: IndustryType,
    newScale: CompanyScale,
    primaryGoal: string,
    customReqs: string[],
    newJurisdiction?: JurisdictionRegion
  ) => {
    setIndustry(newIndustry);
    setScale(newScale);
    if (newJurisdiction) {
      setJurisdiction(newJurisdiction);
    }

    // Auto-select the anchor framework based on chosen industry
    let anchorFramework = 'soc2';
    let industryTagline = 'Cloud Software & B2B SaaS Compliance';
    if (newIndustry === 'law_firm') {
      anchorFramework = 'soc2';
      industryTagline = 'Law Practice, Client Privilege & Court Compliance';
    } else if (newIndustry === 'cpa_accounting') {
      anchorFramework = 'soc2';
      industryTagline = 'CPA & Tax Advisory WISP Compliance Fortress';
    } else if (newIndustry === 'healthcare') {
      anchorFramework = 'hipaa';
      industryTagline = 'Healthcare & HIPAA / PHI Compliance Fortress';
    } else if (newIndustry === 'fintech_crypto') {
      anchorFramework = 'pcidss';
      industryTagline = 'FinTech, Banking & PCI DSS v4 Compliance OS';
    } else if (newIndustry === 'manufacturing') {
      anchorFramework = 'iso27001';
      industryTagline = 'Factory Operations & ISO 27001 Safety Management';
    } else if (newIndustry === 'defense_gov') {
      anchorFramework = 'cmmc';
      industryTagline = 'CMMC Level 2 & Defense Contractor DoD Fortress';
    } else if (newIndustry === 'ecommerce') {
      anchorFramework = 'pcidss';
      industryTagline = 'E-Commerce & PCI DSS / Privacy Protection';
    }

    setSelectedFrameworkId(anchorFramework);

    // Update custom branding subtitle & welcome text dynamically
    setBranding((prev) => ({
      ...prev,
      portalSubtitle: `${prev.companyName} ${industryTagline}`,
      welcomeMessage: `Welcome to ${prev.companyName}'s ${industryTagline}`,
    }));

    const jurLabel = (newJurisdiction || jurisdiction).replace(/_/g, ' ').toUpperCase();
    setConformanceToast(
      `✓ 1-Compliance OS successfully conformed to ${newIndustry.replace(/_/g, ' ').toUpperCase()} · ${jurLabel}! Frameworks, policies & statutory rules synchronized.`
    );
    setTimeout(() => setConformanceToast(null), 5000);
  };

  const handleSelectFramework = (id: string) => {
    setSelectedFrameworkId(id);
    setActiveTab('frameworks');
  };

  const isLight = theme === 'luminous';

  return (
    <div
      className={`min-h-screen flex flex-col relative transition-colors duration-300 ${
        isLight
          ? 'bg-gradient-to-br from-indigo-100/90 via-sky-50 to-purple-100/80 text-slate-950 selection:bg-indigo-500/20 selection:text-indigo-950'
          : 'bg-gradient-to-br from-[#060a17] via-[#0d142b] to-[#070d1e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200'
      }`}
    >
      {/* Dynamic Ambient Radiant Mesh Flares */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className={`absolute -top-40 right-10 w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-700 ${
            isLight ? 'bg-cyan-400/25' : 'bg-cyan-500/10'
          }`}
        />
        <div
          className={`absolute top-1/3 -left-40 w-[600px] h-[600px] rounded-full blur-[160px] transition-all duration-700 ${
            isLight ? 'bg-purple-400/25' : 'bg-purple-600/10'
          }`}
        />
        <div
          className={`absolute bottom-10 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] transition-all duration-700 ${
            isLight ? 'bg-indigo-400/25' : 'bg-indigo-600/10'
          }`}
        />
      </div>

      {/* 3-Zone Top Navigation Contract */}
      <TopNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExport={handleOpenExportBinder}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenSentinelHub={handleOpenSentinelHub}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'midnight' ? 'luminous' : 'midnight')}
        branding={branding}
        isSubscribed={isSubscribed}
        onToggleSubscribed={() => setIsSubscribed(!isSubscribed)}
        onOpenConformance={() => setIsConformanceModalOpen(true)}
        currentIndustry={industry}
        currentRegionName={jurisdiction.replace(/_/g, ' ').toUpperCase()}
        onSelectRole={(role) => {
          if (role === 'everyday_employee') {
            setActiveTab('employee_portal');
          } else if (role === 'legal_local') {
            setActiveTab('locallaws');
          } else {
            setActiveTab('departments');
          }
        }}
      />

      {/* Showcase Demo Mode vs Subscribed Enterprise Banner */}
      <div className="relative z-30 px-4 sm:px-6 lg:px-8 pt-3">
        <div className="max-w-[1440px] mx-auto">
          {!isSubscribed ? (
            /* Showcase Mode Banner for Public Visitors */
            <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/90 via-slate-900 to-indigo-950/90 border-2 border-cyan-500/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 text-slate-200">
                <span className="text-xl">👁️</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-cyan-300 font-mono tracking-wider uppercase">
                      Showcase Interactive Demo Mode
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-amber-400/20 text-amber-300 font-mono text-[10px] font-bold border border-amber-400/40">
                      Read-Only Example
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono text-[10px] font-bold border border-indigo-400/40">
                      {jurisdiction.replace(/_/g, ' ').toUpperCase()} · {industry.replace(/_/g, ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Exploring sample data on <strong>www.1-compliance.com</strong>. Visitors have visual access to preview all Sentinels & frameworks. Subscribe ($149 Solo, $299 Team, $999 Ent) to activate live autonomous scanning for your company.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsConformanceModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-950/80 hover:bg-indigo-900 text-cyan-300 font-bold border border-indigo-500/60 transition-colors shadow-xs"
                >
                  🏢 Preview Industry Conformance
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('subscriptions')}
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-black shadow-md hover:opacity-95 transition-all"
                >
                  💳 Unlock Full OS ($149+)
                </button>
                <button
                  type="button"
                  onClick={() => setIsSubscribed(true)}
                  className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-[11px] border border-slate-700 transition-colors"
                  title="Simulate subscribed enterprise view (for founder / testing)"
                >
                  🔓 Founder Unlock
                </button>
              </div>
            </div>
          ) : (
            /* Subscribed Enterprise Mode Banner */
            <div className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border-2 border-emerald-500/60 shadow-lg flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 text-slate-200">
                <span className="text-xl">🏢</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-emerald-300 font-mono tracking-wider uppercase">
                      Subscribed Enterprise Workspace Active
                    </span>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold border border-emerald-400/40">
                      Conformed: {industry.replace(/_/g, ' ').toUpperCase()} ({jurisdiction.replace(/_/g, ' ').toUpperCase()})
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Operating system conformed for <strong>{branding.companyName}</strong>. All 5 Autonomous Sentinels standing guard.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsConformanceModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-850 text-indigo-300 font-bold border border-indigo-700/60 transition-colors shadow-xs"
                >
                  ⚙️ Re-Conform Industry
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('subscriptions')}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-black shadow-xs hover:bg-emerald-400 transition-colors"
                >
                  💳 Manage Plan
                </button>
                <button
                  type="button"
                  onClick={() => setIsSubscribed(false)}
                  className="px-2 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 font-mono text-[11px] border border-slate-700"
                  title="Switch back to visitor showcase preview"
                >
                  👁️ Demo View
                </button>
              </div>
            </div>
          )}

          {/* Toast Notification when Industry Conformance Changes */}
          {conformanceToast && (
            <div className="mt-2 p-3 rounded-xl bg-indigo-950 text-indigo-100 border border-indigo-400 text-xs font-mono flex items-center justify-between shadow-lg animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <span>✨</span>
                <span>{conformanceToast}</span>
              </div>
              <button
                onClick={() => setConformanceToast(null)}
                className="text-indigo-300 hover:text-white"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Workspace Viewport (Desktop 1440px Baseline) */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {activeTab === 'dashboard' && (
          <DashboardOverview
            frameworks={frameworks}
            controls={controls}
            evidence={evidence}
            onSelectFramework={handleSelectFramework}
            onNavigateTab={setActiveTab}
            onOpenAdvisor={() => setIsAdvisorOpen(true)}
            onOpenSentinelHub={handleOpenSentinelHub}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
            isLight={isLight}
            branding={branding}
          />
        )}

        {activeTab === 'frameworks' && (
          <FrameworksMatrix
            frameworks={frameworks}
            controls={controls}
            selectedFrameworkId={selectedFrameworkId}
            onSelectFramework={setSelectedFrameworkId}
            onUpdateControlStatus={handleUpdateControlStatus}
            onOpenAdvisor={() => setIsAdvisorOpen(true)}
            onOpenSentinelHub={handleOpenSentinelHub}
          />
        )}

        {activeTab === 'scanner' && (
          <WebsiteScannerView
            onAddEvidence={handleAddEvidence}
            onNavigateTab={setActiveTab}
            onOpenSentinelHub={handleOpenSentinelHub}
          />
        )}

        {activeTab === 'blueprint' && (
          <ZeroDollarBlueprintView
            blueprints={blueprints}
            onOpenAdvisor={() => setIsAdvisorOpen(true)}
            onOpenSentinelHub={handleOpenSentinelHub}
          />
        )}

        {activeTab === 'enterprise' && (
          <EnterpriseNotionWorkspaceView
            industry={industry}
            setIndustry={setIndustry}
            scale={scale}
            setScale={setScale}
            assets={assets}
            itAssets={itAssets}
            cryptoRecords={cryptoRecords}
            incidents={incidents}
            forensics={forensics}
            calendar={calendar}
            legalUpdates={legalUpdates}
            obligations={obligations}
            raciRoles={raciRoles}
            tasks={tasks}
            training={training}
            risks={risks}
            vendors={vendors}
            onOpenAdvisor={() => setIsAdvisorOpen(true)}
            onOpenSentinelHub={handleOpenSentinelHub}
          />
        )}

        {activeTab === 'policies' && (
          <PolicyEngineView
            policies={policies}
            evidence={evidence}
            onUpdatePolicy={handleUpdatePolicy}
            onAddEvidence={handleAddEvidence}
            onOpenSentinelHub={handleOpenSentinelHub}
          />
        )}

        {activeTab === 'vendors' && (
          <VendorRiskView
            vendors={vendors}
            risks={risks}
            onAddVendor={handleAddVendor}
            onUpdateVendor={handleUpdateVendor}
            onUpdateRisk={handleUpdateRisk}
            onOpenSentinelHub={handleOpenSentinelHub}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'departments' && (
          <DepartmentHubView
            onOpenSentinelHub={handleOpenSentinelHub}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'handbook' && (
          <EmployeeHandbookSynthesizer
            branding={branding}
            onOpenSentinelHub={handleOpenSentinelHub}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'locallaws' && (
          <EmploymentAndLocalLawsView
            branding={branding}
            onOpenSentinelHub={handleOpenSentinelHub}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'employee_portal' && (
          <EverydayEmployeePortalView
            branding={branding}
            onOpenSentinelHub={handleOpenSentinelHub}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'training' && (
          <GamifiedTrainingArcade
            onOpenSentinelHub={handleOpenSentinelHub}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'subscriptions' && (
          <SubscriptionBillingView
            onOpenSentinelHub={handleOpenSentinelHub}
            onNavigateTab={(tab) => setActiveTab(tab)}
            branding={branding}
            onUpdateBranding={setBranding}
          />
        )}

        {activeTab === 'guidebook' && (
          <TrainingGuidebookView
            onOpenSentinelHub={handleOpenSentinelHub}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}
      </main>

      {/* Clean Editorial Footer */}
      <footer
        className={`border-t py-6 px-6 text-xs transition-colors relative z-10 ${
          isLight ? 'border-slate-200 bg-white text-slate-500' : 'border-slate-800/80 bg-[#070b1a] text-slate-400'
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>1-Compliance OS</span>
              <span aria-hidden="true">·</span>
              <span>Autonomous Compliance Operating System</span>
              <span aria-hidden="true">·</span>
              <span>SOC 2, ISO 27001, HIPAA, GDPR, PCI DSS v4, EU AI Act</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://www.1-compliance.com/operating-system"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-500 hover:text-cyan-400 font-semibold underline underline-offset-4 decoration-cyan-500/40 hover:decoration-cyan-400 transition-colors"
              >
                1-compliance.com/operating-system
              </a>
              <span aria-hidden="true">·</span>
              <span>Jax & Sentinel Squad Stand Guard</span>
            </div>
          </div>

          {/* Legal & Regulatory Disclaimer */}
          <div className="pt-2 border-t border-slate-500/10 text-[11px] leading-relaxed text-slate-400/80">
            <span className="font-semibold text-slate-400">Legal Disclaimer:</span> 1-Compliance OS provides automated security scanning, policy synthesis, employee handbook workflows, and governance tracking for informational and audit readiness purposes. It does not provide formal legal advice, CPA attestation opinions, or attorney-client privileged counsel. Consult qualified legal counsel and accredited auditors for jurisdiction-specific statutory determinations.
          </div>
        </div>
      </footer>

      {/* Auditor Package Export Modal */}
      <AuditorExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        frameworks={frameworks}
        controls={controls}
        policies={policies}
        evidence={evidence}
        vendors={vendors}
        risks={risks}
      />

      {/* Gemini AI Compliance Advisor Modal */}
      <AIAssistantModal
        isOpen={isAdvisorOpen}
        onClose={() => setIsAdvisorOpen(false)}
      />

      {/* Autonomous Sentinel Command Hub (Jax & Category Sentinels) */}
      <SentinelCommandHub
        currentView={activeTab}
        activeSentinelId={activeSentinelId}
        setActiveSentinelId={setActiveSentinelId}
        isOpen={isSentinelHubOpen}
        setIsOpen={setIsSentinelHubOpen}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setIsSentinelHubOpen(false);
        }}
        isLight={isLight}
      />

      {/* Zero-Confusion Beginner Onboarding Wizard */}
      <BeginnerOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          setIsOnboardingOpen(false);
        }}
        onOpenSentinelHub={(sentinelId) => {
          setIsOnboardingOpen(false);
          handleOpenSentinelHub(sentinelId);
        }}
      />

      {/* Floating Animated Living Sentinel Mascot Companion */}
      <FloatingSentinelCompanion
        onOpenSentinelHub={handleOpenSentinelHub}
        currentView={activeTab}
      />

      {/* Showcase Demo Mode Gate / Paywall Modal */}
      <ShowcasePaywallModal
        isOpen={paywallModalOpen}
        onClose={() => setPaywallModalOpen(false)}
        featureName={gatedFeatureName}
        onNavigateToSubscriptions={() => {
          setActiveTab('subscriptions');
          setPaywallModalOpen(false);
        }}
        onUnlockDemo={() => setIsSubscribed(true)}
      />

      {/* Dynamic Industry Conformance Engine Modal */}
      <IndustryConformanceModal
        isOpen={isConformanceModalOpen}
        onClose={() => setIsConformanceModalOpen(false)}
        currentIndustry={industry}
        currentScale={scale}
        currentJurisdiction={jurisdiction}
        companyName={branding.companyName}
        onApplyConformance={handleApplyIndustryConformance}
        isSubscribed={isSubscribed}
        onOpenSubscriptions={() => {
          setActiveTab('subscriptions');
          setIsConformanceModalOpen(false);
        }}
      />
    </div>
  );
}
