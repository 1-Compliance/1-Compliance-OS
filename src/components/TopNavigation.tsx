import React, { useState, useRef, useEffect } from 'react';
import { CompanyBrandingConfig, IndustryType } from '../types/compliance';

interface TopNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenExport: () => void;
  onOpenAdvisor: () => void;
  onOpenSentinelHub: (sentinelId?: string) => void;
  onOpenOnboarding: () => void;
  theme?: 'midnight' | 'luminous';
  onToggleTheme?: () => void;
  branding?: CompanyBrandingConfig;
  isSubscribed?: boolean;
  onToggleSubscribed?: () => void;
  onOpenConformance?: () => void;
  currentIndustry?: IndustryType;
  onSelectRole?: (role: string) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeTab,
  setActiveTab,
  onOpenExport,
  onOpenAdvisor,
  onOpenSentinelHub,
  onOpenOnboarding,
  theme = 'luminous',
  onToggleTheme,
  branding,
  isSubscribed = false,
  onToggleSubscribed,
  onOpenConformance,
  currentIndustry = 'saas',
  onSelectRole,
}) => {
  const isLight = theme === 'luminous';
  const isWhiteLabel = branding?.isWhiteLabelActive;

  // Dropdown States
  const [openDropdown, setOpenDropdown] = useState<'departments' | 'compliance' | 'tools' | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleSelectNav = (tab: string, role?: string) => {
    setActiveTab(tab);
    if (role && onSelectRole) {
      onSelectRole(role);
    }
    setOpenDropdown(null);
  };

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-40 flex items-center justify-between gap-4 px-5 py-3 border-b-2 backdrop-blur-md transition-colors ${
        isLight
          ? 'bg-white/95 border-indigo-200/90 text-slate-950 shadow-md'
          : 'bg-[#090e1f]/95 border-cyan-500/40 text-white shadow-xl'
      }`}
    >
      {/* Zone 1: Brand Element with Jax Mascot */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={() => onOpenSentinelHub('jax')}
          className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-950 border-2 border-cyan-400 p-0.5 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-110 hover:border-cyan-300 transition-all cursor-pointer"
          title="Consult Jax (Chief Mascot & Lead Sentinel)"
        >
          <img
            src="/assets/sentinels/jax_transparent.png"
            alt="Jax Mascot"
            className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(6,182,212,0.6)]"
            referrerPolicy="no-referrer"
          />
        </button>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleSelectNav('dashboard');
          }}
          className={`text-base sm:text-lg font-black tracking-tight whitespace-nowrap shrink-0 transition-colors flex items-center gap-2 ${
            isLight ? 'text-slate-950 hover:text-indigo-600' : 'text-white hover:text-cyan-400'
          }`}
        >
          {isWhiteLabel && branding ? (
            <div className="flex items-center gap-2">
              <span
                className="w-6 h-6 rounded-lg text-white font-black text-xs flex items-center justify-center shadow-xs"
                style={{ backgroundColor: branding.primaryColor }}
              >
                {branding.companyName.charAt(0)}
              </span>
              <div className="flex flex-col text-left">
                <span className="leading-tight">{branding.companyName}</span>
                <span className="text-[10px] font-mono text-cyan-600 font-extrabold hidden sm:inline leading-none">
                  Internal Compliance Platform
                </span>
              </div>
            </div>
          ) : (
            <>
              <span>1-Compliance OS</span>
              <span className="hidden md:inline px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-cyan-100 text-cyan-950 border border-cyan-400 shadow-xs">
                Autonomous
              </span>
            </>
          )}
        </a>
      </div>

      {/* Zone 2: Professional Drop-Down Menus (Replaces horizontal scrolling) */}
      <nav className="hidden lg:flex items-center gap-2 text-xs font-bold">
        {/* Direct Link: Overview */}
        <button
          onClick={() => handleSelectNav('dashboard')}
          className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'dashboard'
              ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-black shadow-md'
              : isLight
              ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span>📊 Overview</span>
        </button>

        {/* Dropdown 1: Departments & Roles */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'departments' ? null : 'departments')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'departments' || activeTab === 'employee_portal' || openDropdown === 'departments'
                ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                : isLight
                ? 'text-slate-700 hover:text-amber-700 hover:bg-amber-50'
                : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800'
            }`}
          >
            <span>🏢 Departments & Roles</span>
            <span className="text-[10px]">{openDropdown === 'departments' ? '▲' : '▼'}</span>
          </button>

          {openDropdown === 'departments' && (
            <div className="absolute left-0 mt-2 w-72 p-2 rounded-2xl bg-white border-2 border-indigo-200 shadow-2xl z-50 animate-fadeIn text-slate-900 space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-extrabold border-b border-slate-100">
                Select Workspace by Department / Role
              </div>

              <button
                onClick={() => handleSelectNav('departments', 'it_engineering')}
                className="w-full text-left p-2.5 rounded-xl hover:bg-cyan-50 transition-colors flex items-start gap-2.5 cursor-pointer"
              >
                <span className="text-base">💻</span>
                <div>
                  <div className="font-bold text-xs text-slate-950 flex items-center gap-1.5">
                    <span>IT & DevOps Specialist</span>
                    <span className="text-[9px] font-mono px-1 rounded bg-cyan-100 text-cyan-950 font-black">ITAM</span>
                  </div>
                  <div className="text-[11px] text-slate-500">Fleet laptops, BitLocker/FileVault, CSPM, CI/CD gates</div>
                </div>
              </button>

              <button
                onClick={() => handleSelectNav('departments', 'hr_people')}
                className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50 transition-colors flex items-start gap-2.5 cursor-pointer"
              >
                <span className="text-base">👥</span>
                <div>
                  <div className="font-bold text-xs text-slate-950 flex items-center gap-1.5">
                    <span>HR & People Operations</span>
                    <span className="text-[9px] font-mono px-1 rounded bg-purple-100 text-purple-950 font-black">People</span>
                  </div>
                  <div className="text-[11px] text-slate-500">I-9 records, annual harassment training, sick leave, EEO</div>
                </div>
              </button>

              <button
                onClick={() => handleSelectNav('employee_portal', 'everyday_employee')}
                className="w-full text-left p-2.5 rounded-xl hover:bg-emerald-50 bg-emerald-50/60 border border-emerald-200/60 transition-colors flex items-start gap-2.5 cursor-pointer"
              >
                <span className="text-base">💼</span>
                <div>
                  <div className="font-bold text-xs text-emerald-950 flex items-center gap-1.5">
                    <span>Everyday Employee Portal</span>
                    <span className="text-[9px] font-mono px-1.5 rounded-full bg-emerald-500 text-slate-950 font-black">Focused</span>
                  </div>
                  <div className="text-[11px] text-slate-600">My training quests, policy sign-offs, and company handbook</div>
                </div>
              </button>

              <button
                onClick={() => handleSelectNav('locallaws', 'legal_local')}
                className="w-full text-left p-2.5 rounded-xl hover:bg-indigo-50 transition-colors flex items-start gap-2.5 cursor-pointer"
              >
                <span className="text-base">⚖️</span>
                <div>
                  <div className="font-bold text-xs text-slate-950 flex items-center gap-1.5">
                    <span>Legal, Multi-State & Global Laws</span>
                    <span className="text-[9px] font-mono px-1 rounded bg-indigo-100 text-indigo-950 font-black">50 States/Intl</span>
                  </div>
                  <div className="text-[11px] text-slate-500">US Fed, CA, NY, IL, TX, EU, UK, Canada, Australia, FinCEN BOI</div>
                </div>
              </button>

              <button
                onClick={() => handleSelectNav('departments', 'factory_ops')}
                className="w-full text-left p-2.5 rounded-xl hover:bg-amber-50 transition-colors flex items-start gap-2.5 cursor-pointer"
              >
                <span className="text-base">🏭</span>
                <div>
                  <div className="font-bold text-xs text-slate-950 flex items-center gap-1.5">
                    <span>Operations & Facilities</span>
                    <span className="text-[9px] font-mono px-1 rounded bg-amber-100 text-amber-950 font-black">OSHA</span>
                  </div>
                  <div className="text-[11px] text-slate-500">Physical safety, LOTO protocols, visitor badges, floor logs</div>
                </div>
              </button>

              <button
                onClick={() => handleSelectNav('departments', 'exec_board')}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 transition-colors flex items-start gap-2.5 cursor-pointer"
              >
                <span className="text-base">📊</span>
                <div>
                  <div className="font-bold text-xs text-slate-950">Executive & Board of Directors</div>
                  <div className="text-[11px] text-slate-500">Company posture score, risk ledger, investor reporting</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Dropdown 2: Compliance Frameworks & Local Laws */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'compliance' ? null : 'compliance')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'frameworks' || activeTab === 'locallaws' || activeTab === 'policies' || activeTab === 'enterprise' || openDropdown === 'compliance'
                ? 'bg-indigo-600 text-white font-black shadow-sm'
                : isLight
                ? 'text-slate-700 hover:text-indigo-600 hover:bg-indigo-50'
                : 'text-slate-300 hover:text-indigo-300 hover:bg-slate-800'
            }`}
          >
            <span>🛡️ Compliance & Laws</span>
            <span className="text-[10px]">{openDropdown === 'compliance' ? '▲' : '▼'}</span>
          </button>

          {openDropdown === 'compliance' && (
            <div className="absolute left-0 mt-2 w-80 p-2 rounded-2xl bg-white border-2 border-indigo-200 shadow-2xl z-50 animate-fadeIn text-slate-900 space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-extrabold border-b border-slate-100">
                Regulatory Standards & Mandates
              </div>

              <button
                onClick={() => handleSelectNav('frameworks')}
                className="w-full text-left p-2.5 rounded-xl hover:bg-indigo-50 transition-colors flex items-start gap-2.5 cursor-pointer"
              >
                <span className="text-base">🌐</span>
                <div>
                  <div className="font-bold text-xs text-slate-950 flex items-center gap-1.5">
                    <span>Cyber Security Frameworks</span>
                    <span className="text-[9px] font-mono px-1 rounded bg-indigo-100 text-indigo-950 font-black">SOC 2 / ISO</span>
                  </div>
                  <div className="text-[11px] text-slate-500">SOC 2 Type II, ISO 27001, HIPAA, GDPR, PCI DSS v4, NIST CSF</div>
                </div>
              </button>

              <button
                onClick={() => handleSelectNav('locallaws')}
                className="w-full text-left p-2.5 rounded-xl hover:bg-amber-50 bg-amber-50/50 border border-amber-200/60 transition-colors flex items-start gap-2.5 cursor-pointer"
              >
                <span className="text-base">🏛️</span>
                <div>
                  <div className="font-bold text-xs text-amber-950 flex items-center gap-1.5">
                    <span>Multi-Jurisdiction & State Laws Hub</span>
                    <span className="text-[9px] font-mono px-1.5 rounded-full bg-amber-400 text-slate-950 font-black">Global/50 States</span>
                  </div>
                  <div className="text-[11px] text-slate-600">US Fed, CA, NY, IL, TX, CO, WA, EU GDPR, UK, Canada, Australia</div>
                </div>
              </button>

              <button
                onClick={() => handleSelectNav('policies')}
                className="w-full text-left p-2.5 rounded-xl hover:bg-cyan-50 transition-colors flex items-start gap-2.5 cursor-pointer"
              >
                <span className="text-base">📜</span>
                <div>
                  <div className="font-bold text-xs text-slate-950">Master Policy Engine</div>
                  <div className="text-[11px] text-slate-500">12 core security & operational policies with auditor evidence</div>
                </div>
              </button>

              <button
                onClick={() => handleSelectNav('enterprise')}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 transition-colors flex items-start gap-2.5 cursor-pointer"
              >
                <span className="text-base">🏢</span>
                <div>
                  <div className="font-bold text-xs text-slate-950">28 Enterprise Topic Workspaces</div>
                  <div className="text-[11px] text-slate-500">Notion-style data registers, crypto AML, forensics, legal calendar</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Dropdown 3: Tools & Portals */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setOpenDropdown(openDropdown === 'tools' ? null : 'tools')}
            className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'handbook' || activeTab === 'scanner' || activeTab === 'training' || activeTab === 'vendors' || activeTab === 'guidebook' || openDropdown === 'tools'
                ? 'bg-cyan-500 text-slate-950 font-black shadow-sm'
                : isLight
                ? 'text-slate-700 hover:text-cyan-700 hover:bg-cyan-50'
                : 'text-slate-300 hover:text-cyan-300 hover:bg-slate-800'
            }`}
          >
            <span>🧰 Tools & Manuals</span>
            <span className="text-[10px]">{openDropdown === 'tools' ? '▲' : '▼'}</span>
          </button>

          {openDropdown === 'tools' && (
            <div className="absolute left-0 mt-2 w-80 p-2 rounded-2xl bg-white border-2 border-indigo-200 shadow-2xl z-50 animate-fadeIn text-slate-900 space-y-1">
              <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-extrabold border-b border-slate-100">
                Operational Utilities & Portals
              </div>

              <button
                onClick={() => handleSelectNav('handbook')}
                className="w-full text-left p-2.5 rounded-xl hover:bg-indigo-50 bg-indigo-50/50 border border-indigo-200/60 transition-colors flex items-start gap-2.5 cursor-pointer"
              >
                <span className="text-base">📖</span>
                <div>
                  <div className="font-bold text-xs text-indigo-950 flex items-center gap-1.5">
                    <span>Employee Handbook Synthesizer</span>
                    <span className="text-[9px] font-mono px-1.5 rounded-full bg-indigo-600 text-white font-black">Upload/AI</span>
                  </div>
                  <div className="text-[11px] text-slate-600">Synthesizes company manual with mandatory statutory labor clauses</div>
                </div>
              </button>

              <button
                onClick={() => handleSelectNav('scanner')}
                className="w-full text-left p-2.5 rounded-xl hover:bg-cyan-50 transition-colors flex items-start gap-2.5 cursor-pointer"
              >
                <span className="text-base">🔍</span>
                <div>
                  <div className="font-bold text-xs text-slate-950">Website Security Scanner</div>
                  <div className="text-[11px] text-slate-500">Live HTTP headers, TLS 1.3, CSP, and cookie privacy audit</div>
                </div>
              </button>

              <button
                onClick={() => handleSelectNav('training')}
                className="w-full text-left p-2.5 rounded-xl hover:bg-purple-50 transition-colors flex items-start gap-2.5 cursor-pointer"
              >
                <span className="text-base">🕹️</span>
                <div>
                  <div className="font-bold text-xs text-slate-950">Gamified Training Arcade</div>
                  <div className="text-[11px] text-slate-500">Interactive staff quests for security awareness & anti-harassment</div>
                </div>
              </button>

              <button
                onClick={() => handleSelectNav('vendors')}
                className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50 transition-colors flex items-start gap-2.5 cursor-pointer"
              >
                <span className="text-base">🤝</span>
                <div>
                  <div className="font-bold text-xs text-slate-950">Third-Party Vendor Portal (TPCRM)</div>
                  <div className="text-[11px] text-slate-500">Supply chain vetting, DPA verification, and vendor risk matrix</div>
                </div>
              </button>

              <button
                onClick={() => handleSelectNav('guidebook')}
                className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 transition-colors flex items-start gap-2.5 cursor-pointer"
              >
                <span className="text-base">📘</span>
                <div>
                  <div className="font-bold text-xs text-slate-950">10-Chapter Training Guidebook</div>
                  <div className="text-[11px] text-slate-500">Complete operating manual for compliance officers & auditors</div>
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Direct Link: Subscriptions & Billing */}
        <button
          onClick={() => handleSelectNav('subscriptions')}
          className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'subscriptions'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
              : isLight
              ? 'text-emerald-800 hover:bg-emerald-50 font-bold'
              : 'text-emerald-300 hover:bg-slate-800 font-bold'
          }`}
        >
          <span>💳 Subscriptions</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-900 border border-emerald-500/40 font-bold">
            $149 - $999+
          </span>
        </button>
      </nav>

      {/* Zone 3: Primary Actions & Sentinels Hub */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Industry Conformance Button */}
        {onOpenConformance && (
          <button
            type="button"
            onClick={onOpenConformance}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer border ${
              isSubscribed
                ? 'bg-indigo-950/80 border-indigo-400 text-cyan-300 hover:bg-indigo-900/60'
                : 'bg-slate-900 border-indigo-500/50 text-indigo-300 hover:bg-slate-800'
            }`}
            title="Conform OS to Healthcare, FinTech, SaaS, Manufacturing, or Defense"
          >
            <span>🏢</span>
            <span className="hidden sm:inline font-mono">
              {isSubscribed ? `Conformed: ${currentIndustry.toUpperCase()}` : 'Conform to Industry'}
            </span>
            <span className="sm:hidden font-mono">Industry</span>
          </button>
        )}

        {/* Subscription Status Pill */}
        {!isSubscribed ? (
          <button
            type="button"
            onClick={() => setActiveTab('subscriptions')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 hover:opacity-95 transition-all shadow-md cursor-pointer whitespace-nowrap animate-pulse"
            title="Previewing in Showcase Mode · Click to activate company subscription"
          >
            <span>👁️</span>
            <span>Showcase ($149+)</span>
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/80">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Subscribed Organization</span>
          </div>
        )}

        {/* Admin/Founder Quick Mode Toggle for Testing */}
        {onToggleSubscribed && (
          <button
            type="button"
            onClick={onToggleSubscribed}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900/80 border border-slate-800 hover:bg-slate-850 text-[11px] font-mono transition-colors cursor-pointer"
            title={isSubscribed ? "Switch to Public Visitor Showcase Mode" : "Switch to Subscribed Company Mode (Founder Test)"}
          >
            {isSubscribed ? '🔓 Subscribed' : '🔒 Demo Mode'}
          </button>
        )}

        {/* Theme Toggle Button */}
        {onToggleTheme && (
          <button
            type="button"
            onClick={onToggleTheme}
            className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-black transition-all shadow-xs cursor-pointer ${
              isLight
                ? 'bg-indigo-50 border border-indigo-300 text-indigo-900 hover:bg-indigo-100'
                : 'bg-slate-900 text-amber-300 border border-amber-500/40 hover:bg-slate-800'
            }`}
            title="Switch between Cyber Aurora and Vibrant Luminous theme"
          >
            <span>{isLight ? '🌙' : '☀️'}</span>
          </button>
        )}

        <button
          onClick={() => onOpenSentinelHub('jax')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/80 rounded-lg hover:bg-cyan-900/60 hover:text-white transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">Sentinels</span>
          <span className="sm:hidden">Hub</span>
        </button>

        <button
          onClick={onOpenExport}
          className="hidden md:inline-flex px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
        >
          Export Binder
        </button>
      </div>
    </header>
  );
};
