import React from 'react';
import { CompanyBrandingConfig } from '../types/compliance';

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
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeTab,
  setActiveTab,
  onOpenExport,
  onOpenAdvisor,
  onOpenSentinelHub,
  onOpenOnboarding,
  theme = 'midnight',
  onToggleTheme,
  branding,
}) => {
  const isLight = theme === 'luminous';
  const isWhiteLabel = branding?.isWhiteLabelActive;

  return (
    <header
      className={`sticky top-0 z-40 flex items-center justify-between gap-4 px-5 py-3 border-b-2 backdrop-blur-md transition-colors ${
        isLight
          ? 'bg-white/95 border-indigo-200/90 text-slate-950 shadow-md'
          : 'bg-[#090e1f]/95 border-cyan-500/40 text-white shadow-xl'
      }`}
    >
      {/* Zone 1: Brand Element with Jax Mascot + Optional Company White-Label Customization */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={() => onOpenSentinelHub('jax')}
          className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-950 border-2 border-cyan-400 p-0.5 shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:scale-110 hover:border-cyan-300 transition-all cursor-pointer"
          title="Consult Jax (Chief Mascot & Sentinel)"
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
            setActiveTab('dashboard');
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

      {/* Zone 2: Colorful navigation pills */}
      <nav className="hidden lg:flex items-center gap-1.5 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeTab === 'dashboard'
              ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-black shadow-md'
              : isLight
              ? 'text-slate-800 hover:text-slate-950 hover:bg-indigo-50/80 font-bold'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80 font-bold'
          }`}
        >
          <span>Overview</span>
        </button>

        <button
          onClick={() => setActiveTab('departments')}
          className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeTab === 'departments'
              ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
              : isLight
              ? 'text-slate-600 hover:text-amber-600 hover:bg-amber-50'
              : 'text-slate-300 hover:text-amber-300 hover:bg-slate-800/60'
          }`}
        >
          <span>Factory & Depts</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
            Plain English
          </span>
        </button>

        <button
          onClick={() => setActiveTab('training')}
          className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeTab === 'training'
              ? 'bg-purple-500 text-white font-bold shadow-sm'
              : isLight
              ? 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
              : 'text-slate-300 hover:text-purple-300 hover:bg-slate-800/60'
          }`}
        >
          <span>Training Arcade</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
            Quests
          </span>
        </button>

        <button
          onClick={() => setActiveTab('vendors')}
          className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeTab === 'vendors'
              ? 'bg-indigo-500 text-white font-bold shadow-sm'
              : isLight
              ? 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
              : 'text-slate-300 hover:text-indigo-300 hover:bg-slate-800/60'
          }`}
        >
          <span>Vendor Portal</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold">
            TPCRM
          </span>
        </button>

        <button
          onClick={() => setActiveTab('scanner')}
          className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'scanner'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
              : isLight
              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          Website Scanner
        </button>

        <button
          onClick={() => setActiveTab('frameworks')}
          className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'frameworks'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
              : isLight
              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          Controls
        </button>

        <button
          onClick={() => setActiveTab('enterprise')}
          className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 ${
            activeTab === 'enterprise'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
              : isLight
              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          28 Topics
        </button>

        <button
          onClick={() => setActiveTab('subscriptions')}
          className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeTab === 'subscriptions'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-sm'
              : isLight
              ? 'text-emerald-700 hover:bg-emerald-50 font-bold'
              : 'text-emerald-400 hover:bg-slate-800/60 font-bold'
          }`}
        >
          <span>💳 Subscriptions</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-800 border border-emerald-500/40 font-bold">
            $149 - $999+
          </span>
        </button>

        <button
          onClick={() => setActiveTab('guidebook')}
          className={`px-3 py-1.5 rounded-lg transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
            activeTab === 'guidebook'
              ? 'bg-indigo-600 text-white font-black shadow-sm'
              : isLight
              ? 'text-indigo-800 hover:text-indigo-950 hover:bg-indigo-50 font-bold'
              : 'text-indigo-300 hover:text-white hover:bg-slate-800/60 font-bold'
          }`}
        >
          <span>📖 Training Manual</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-700 border border-indigo-400/40 font-bold">
            10 Chapters
          </span>
        </button>
      </nav>

      {/* Zone 3: Primary action buttons & Theme Switcher */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Exciting Theme Toggle Button */}
        {onToggleTheme && (
          <button
            type="button"
            onClick={onToggleTheme}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-xs cursor-pointer ${
              isLight
                ? 'bg-indigo-50 border border-indigo-300 text-indigo-900 hover:bg-indigo-100'
                : 'bg-slate-900 text-amber-300 border border-amber-500/40 hover:bg-slate-800'
            }`}
            title="Switch between Cyber Aurora and Vibrant Luminous theme"
          >
            <span>{isLight ? '🌙 Cyber Aurora' : '☀️ Vibrant Luminous'}</span>
          </button>
        )}

        <button
          type="button"
          onClick={onOpenOnboarding}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 rounded-lg transition-all whitespace-nowrap shrink-0 shadow-sm"
          title="New to compliance? Start here"
        >
          <span>✨ Start Here</span>
        </button>

        <button
          onClick={() => onOpenSentinelHub('jax')}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/80 rounded-lg hover:bg-cyan-900/60 hover:text-white transition-colors whitespace-nowrap shrink-0 shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="hidden sm:inline">Sentinels Hub</span>
          <span className="sm:hidden">Hub</span>
        </button>

        <button
          onClick={onOpenExport}
          className="hidden md:inline-flex px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0 shadow-sm"
        >
          Export Binder
        </button>
      </div>
    </header>
  );
};
