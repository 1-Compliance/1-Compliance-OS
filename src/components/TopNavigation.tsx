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
  currentRegionName?: string;
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
  currentRegionName = 'US Federal & 50 States',
  onSelectRole,
}) => {
  const isLight = theme === 'luminous';
  const isWhiteLabel = branding?.isWhiteLabelActive;

  // Department Dropdown State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
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
    setIsMenuOpen(false);
  };

  const getIndustryLabel = (ind: IndustryType) => {
    const labels: Record<IndustryType, string> = {
      saas: 'SaaS / Tech',
      healthcare: 'Healthcare / HIPAA',
      fintech_crypto: 'FinTech / Banking',
      law_firm: 'Law Firms / Legal',
      cpa_accounting: 'CPA / Accounting',
      manufacturing: 'Manufacturing / Plant',
      ecommerce: 'E-Commerce / Retail',
      defense_gov: 'Defense / CMMC',
      enterprise: 'Cross-Enterprise',
    };
    return labels[ind] || ind.toUpperCase();
  };

  return (
    <header
      className={`sticky top-0 z-40 px-4 sm:px-6 py-2.5 border-b-2 backdrop-blur-md transition-colors ${
        isLight
          ? 'bg-white/95 border-indigo-200/90 text-slate-950 shadow-md'
          : 'bg-[#090e1f]/95 border-cyan-500/40 text-white shadow-xl'
      }`}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3">
        {/* Left Section: Brand & The Unified Department Menu Button */}
        <div className="flex items-center gap-3 shrink-0" ref={menuRef}>
          {/* Jax Avatar Icon Button */}
          <button
            type="button"
            onClick={() => onOpenSentinelHub('jax')}
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-slate-950 border-2 border-cyan-400 p-0.5 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-110 hover:border-cyan-300 transition-all cursor-pointer"
            title="Summon Jax (Chief Autonomous Mascot & Lead Sentinel)"
          >
            <img
              src="/assets/sentinels/jax_transparent.png"
              alt="Jax Mascot"
              className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(6,182,212,0.6)]"
              referrerPolicy="no-referrer"
            />
          </button>

          {/* Platform Title */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleSelectNav('dashboard');
            }}
            className={`text-sm sm:text-base font-black tracking-tight whitespace-nowrap shrink-0 transition-colors flex items-center gap-2 ${
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
                <span className="leading-tight">{branding.companyName}</span>
              </div>
            ) : (
              <>
                <span>1-Compliance OS™</span>
                <span className="hidden sm:inline px-1.5 py-0.2 rounded-full text-[9px] font-mono font-black bg-cyan-100 text-cyan-950 border border-cyan-400">
                  Autonomous
                </span>
              </>
            )}
          </a>

          {/* PRIMARY DEPARTMENT DROPDOWN MENU (No horizontal scrolling!) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer shadow-sm border ${
                isMenuOpen
                  ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white border-cyan-400 ring-2 ring-cyan-400/40'
                  : isLight
                  ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-950 border-indigo-200'
                  : 'bg-slate-900 hover:bg-slate-800 text-cyan-300 border-cyan-500/50'
              }`}
              title="Browse 1-Compliance OS Modules by Department"
            >
              <span className="text-sm">📋</span>
              <span className="font-bold">Menu / Departments</span>
              <span className="text-[10px] opacity-75">{isMenuOpen ? '▲' : '▼'}</span>
            </button>

            {/* Comprehensive Mega-Dropdown Categorized by Department */}
            {isMenuOpen && (
              <div className="absolute left-0 mt-2 w-[340px] sm:w-[580px] md:w-[680px] p-4 rounded-3xl bg-white border-2 border-indigo-300 shadow-2xl z-50 animate-fadeIn text-slate-900 max-h-[85vh] overflow-y-auto">
                <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🏢</span>
                    <span className="text-xs font-black uppercase tracking-wider text-slate-800 font-mono">
                      1-Compliance OS — Departments & Workspaces
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400">
                    Click any module to navigate
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Department 1: Executive & Board */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="font-black text-xs text-indigo-950 uppercase font-mono flex items-center gap-1.5 pb-1 border-b border-slate-200">
                      <span>📊</span>
                      <span>Executive & Board of Directors</span>
                    </div>

                    <button
                      onClick={() => handleSelectNav('dashboard')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                        activeTab === 'dashboard' ? 'bg-indigo-100 font-black text-indigo-950' : 'hover:bg-indigo-50'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-slate-900">Enterprise Overview & Score</div>
                        <div className="text-[10px] text-slate-500">Live posture index, audit readiness & alert ledger</div>
                      </div>
                      <span className="text-indigo-600 font-bold text-xs">➔</span>
                    </button>

                    <button
                      onClick={() => handleSelectNav('enterprise')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                        activeTab === 'enterprise' ? 'bg-indigo-100 font-black text-indigo-950' : 'hover:bg-indigo-50'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-slate-900">28 Enterprise Workspaces</div>
                        <div className="text-[10px] text-slate-500">Notion-style data registers, crypto AML & legal calendar</div>
                      </div>
                      <span className="text-indigo-600 font-bold text-xs">➔</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        onOpenExport();
                      }}
                      className="w-full text-left p-2 rounded-xl hover:bg-emerald-50 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <div>
                        <div className="font-bold text-emerald-950 flex items-center gap-1">
                          <span>📦</span>
                          <span>Export Auditor Evidence Binder</span>
                        </div>
                        <div className="text-[10px] text-slate-500">1-click attestation package with ZIP cryptographic proof</div>
                      </div>
                      <span className="text-emerald-700 font-bold text-xs">ZIP</span>
                    </button>
                  </div>

                  {/* Department 2: Legal & Corporate Governance */}
                  <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                    <div className="font-black text-xs text-amber-950 uppercase font-mono flex items-center gap-1.5 pb-1 border-b border-amber-200">
                      <span>⚖️</span>
                      <span>Legal, Corporate Governance & BOI</span>
                    </div>

                    <button
                      onClick={() => handleSelectNav('locallaws')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                        activeTab === 'locallaws' ? 'bg-amber-200/70 font-black text-amber-950' : 'hover:bg-amber-100/60'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-amber-950 flex items-center gap-1">
                          <span>🏛️</span>
                          <span>Multi-State & Global Regulatory Hub</span>
                        </div>
                        <div className="text-[10px] text-slate-600">US 50 States, EU, UK, Canada, Australia & FinCEN BOI</div>
                      </div>
                      <span className="text-amber-800 font-bold text-xs">➔</span>
                    </button>

                    <button
                      onClick={() => handleSelectNav('policies')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                        activeTab === 'policies' ? 'bg-amber-200/70 font-black text-amber-950' : 'hover:bg-amber-100/60'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-slate-900">Master Policy Engine</div>
                        <div className="text-[10px] text-slate-500">12 core security, governance, and HR policies</div>
                      </div>
                      <span className="text-amber-800 font-bold text-xs">➔</span>
                    </button>
                  </div>

                  {/* Department 3: IT, Cybersecurity & Engineering */}
                  <div className="p-3 rounded-2xl bg-cyan-50/70 border border-cyan-200 space-y-1.5">
                    <div className="font-black text-xs text-cyan-950 uppercase font-mono flex items-center gap-1.5 pb-1 border-b border-cyan-200">
                      <span>💻</span>
                      <span>Information Security & IT Engineering</span>
                    </div>

                    <button
                      onClick={() => handleSelectNav('frameworks')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                        activeTab === 'frameworks' ? 'bg-cyan-200/70 font-black text-cyan-950' : 'hover:bg-cyan-100/60'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-cyan-950">Cyber Security Frameworks Matrix</div>
                        <div className="text-[10px] text-slate-500">SOC 2 Type II, ISO 27001, HIPAA, PCI DSS v4, NIST CSF</div>
                      </div>
                      <span className="text-cyan-800 font-bold text-xs">➔</span>
                    </button>

                    <button
                      onClick={() => handleSelectNav('scanner')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                        activeTab === 'scanner' ? 'bg-cyan-200/70 font-black text-cyan-950' : 'hover:bg-cyan-100/60'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-1">
                          <span>🔍</span>
                          <span>Website Security Scanner</span>
                        </div>
                        <div className="text-[10px] text-slate-500">Live TLS 1.3, CSP headers & cookie privacy audits</div>
                      </div>
                      <span className="text-cyan-800 font-bold text-xs">➔</span>
                    </button>

                    <button
                      onClick={() => handleSelectNav('vendors')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                        activeTab === 'vendors' ? 'bg-cyan-200/70 font-black text-cyan-950' : 'hover:bg-cyan-100/60'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-slate-900">Third-Party Vendor Risk (TPCRM)</div>
                        <div className="text-[10px] text-slate-500">Supply chain vetting, DPA verification & risk tiers</div>
                      </div>
                      <span className="text-cyan-800 font-bold text-xs">➔</span>
                    </button>
                  </div>

                  {/* Department 4: HR & People Operations */}
                  <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5">
                    <div className="font-black text-xs text-emerald-950 uppercase font-mono flex items-center gap-1.5 pb-1 border-b border-emerald-200">
                      <span>👥</span>
                      <span>HR & People Operations</span>
                    </div>

                    <button
                      onClick={() => handleSelectNav('employee_portal', 'everyday_employee')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center justify-between cursor-pointer bg-emerald-100/70 ${
                        activeTab === 'employee_portal' ? 'ring-2 ring-emerald-500 font-black' : 'hover:bg-emerald-200/60'
                      }`}
                    >
                      <div>
                        <div className="font-black text-xs text-emerald-950 flex items-center gap-1">
                          <span>💼</span>
                          <span>Everyday Employee Portal</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500 text-slate-950 font-black">
                            Staff View
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-600">Training quests, handbook sign-offs & employee rights</div>
                      </div>
                      <span className="text-emerald-800 font-bold text-xs">➔</span>
                    </button>

                    <button
                      onClick={() => handleSelectNav('handbook')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                        activeTab === 'handbook' ? 'bg-emerald-200/70 font-black text-emerald-950' : 'hover:bg-emerald-100/60'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-slate-900 flex items-center gap-1">
                          <span>📖</span>
                          <span>Employee Handbook Synthesizer</span>
                        </div>
                        <div className="text-[10px] text-slate-500">Upload existing manual & enhance with statutory clauses</div>
                      </div>
                      <span className="text-emerald-800 font-bold text-xs">➔</span>
                    </button>

                    <button
                      onClick={() => handleSelectNav('training')}
                      className={`w-full text-left p-2 rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                        activeTab === 'training' ? 'bg-emerald-200/70 font-black text-emerald-950' : 'hover:bg-emerald-100/60'
                      }`}
                    >
                      <div>
                        <div className="font-bold text-slate-900">Gamified Training Quests™</div>
                        <div className="text-[10px] text-slate-500">Harassment prevention, cyber hygiene & compliance badges</div>
                      </div>
                      <span className="text-emerald-800 font-bold text-xs">➔</span>
                    </button>
                  </div>
                </div>

                {/* Additional Utilities Footer Row inside Dropdown */}
                <div className="mt-3.5 pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                  <button
                    onClick={() => handleSelectNav('guidebook')}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>📘</span>
                    <span>10-Chapter Compliance Guidebook</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenExport();
                    }}
                    className="px-3 py-1.5 rounded-xl bg-cyan-100 hover:bg-cyan-200 text-cyan-950 font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>📦</span>
                    <span>Auditor Package Export</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Section: The 3 Primary Buttons Specifically Requested by User */}
        <div className="flex items-center gap-2 shrink-0">
          {/* 1. Conform to Industry & Region Button */}
          {onOpenConformance && (
            <button
              type="button"
              onClick={onOpenConformance}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-xs cursor-pointer border whitespace-nowrap ${
                isSubscribed
                  ? 'bg-indigo-950 border-cyan-400 text-cyan-300 hover:bg-indigo-900'
                  : isLight
                  ? 'bg-indigo-50 border-indigo-300 text-indigo-950 hover:bg-indigo-100'
                  : 'bg-slate-900 border-indigo-500/60 text-indigo-200 hover:bg-slate-800'
              }`}
              title="Conform OS to your Industry (Law Firms, CPAs, SaaS, Healthcare) and Country/Region (US 50 States, EU, UK, Canada, Australia)"
            >
              <span>🏢</span>
              <span className="hidden md:inline font-mono">
                Conform: {getIndustryLabel(currentIndustry)}
              </span>
              <span className="md:hidden font-mono">Conform</span>
            </button>
          )}

          {/* 2. Subscription Button with Pricing */}
          <button
            type="button"
            onClick={() => setActiveTab('subscriptions')}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 hover:opacity-95 transition-all shadow-md cursor-pointer whitespace-nowrap"
            title="Subscription: $149 Solo, $299 Team, $999 Enterprise"
          >
            <span>💳</span>
            <span>{isSubscribed ? 'Manage Plan' : 'Subscribe ($149+)'}</span>
          </button>

          {/* 3. Demo Mode Toggle Button */}
          {onToggleSubscribed && (
            <button
              type="button"
              onClick={onToggleSubscribed}
              className={`px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-bold border transition-colors cursor-pointer whitespace-nowrap ${
                isSubscribed
                  ? 'bg-emerald-950/80 text-emerald-300 border-emerald-600/80 hover:bg-emerald-900'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
              title={
                isSubscribed
                  ? 'Currently in Subscribed Enterprise Mode (Click to test Public Demo)'
                  : 'Currently in Public Visitor Demo Mode (Click to test Subscribed)'
              }
            >
              {isSubscribed ? '🔓 Subscribed' : '🔒 Demo Mode'}
            </button>
          )}

          {/* Theme Toggle Button */}
          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              className={`p-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                isLight
                  ? 'bg-slate-100 border-slate-300 text-slate-700 hover:bg-slate-200'
                  : 'bg-slate-900 border-slate-700 text-amber-300 hover:bg-slate-800'
              }`}
              title="Toggle Theme"
            >
              {isLight ? '🌙' : '☀️'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
