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

  // Cross-Industry & Scale Configuration
  const [industry, setIndustry] = useState<IndustryType>('saas');
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

  const [branding, setBranding] = useState<CompanyBrandingConfig>({
    companyName: 'Acme Corporation',
    portalSubtitle: 'Enterprise Compliance Operating System',
    primaryColor: '#1d4ed8',
    accentColor: '#06b6d4',
    themePreset: 'corporate_blue',
    welcomeMessage: "Welcome to Acme Corp's Internal Compliance Operating System",
    allowedEmailDomains: ['acmecorp.com'],
    isWhiteLabelActive: true,
    corporateDomain: 'compliance.acmecorp.com',
  });

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
        onOpenExport={() => setIsExportOpen(true)}
        onOpenAdvisor={() => setIsAdvisorOpen(true)}
        onOpenSentinelHub={handleOpenSentinelHub}
        onOpenOnboarding={() => setIsOnboardingOpen(true)}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'midnight' ? 'luminous' : 'midnight')}
        branding={branding}
      />

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
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={`font-semibold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>1-Compliance OS</span>
            <span aria-hidden="true">·</span>
            <span>Autonomous Compliance Operating System</span>
            <span aria-hidden="true">·</span>
            <span>SOC 2, ISO 27001, HIPAA, GDPR, PCI DSS v4, EU AI Act</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.1-compliance.com/scanner"
              target="_blank"
              rel="noreferrer"
              className="text-cyan-500 hover:text-cyan-400 font-semibold"
            >
              1-compliance.com/scanner
            </a>
            <span>·</span>
            <span>Jax & Sentinel Squad Stand Guard</span>
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
    </div>
  );
}
