import React, { useState } from 'react';
import { Framework, ControlItem, EvidenceItem, CompanyBrandingConfig } from '../types/compliance';
import { ComplianceHeatMap } from './ComplianceHeatMap';
import { SENTINELS } from '../data/sentinelsData';
import { SentinelId } from '../types/sentinels';
import {
  speakSentinel,
  stopSpeaking,
  SENTINEL_VOICE_PROFILES,
} from '../services/sentinelVoice';
import { SentinelCharacterStage } from './SentinelCharacterStage';

interface DashboardOverviewProps {
  frameworks: Framework[];
  controls: ControlItem[];
  evidence: EvidenceItem[];
  onSelectFramework: (frameworkId: string) => void;
  onNavigateTab: (tab: string) => void;
  onOpenAdvisor: () => void;
  onOpenSentinelHub: (sentinelId?: string) => void;
  onOpenOnboarding?: () => void;
  isLight?: boolean;
  branding?: CompanyBrandingConfig;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  frameworks,
  controls,
  evidence,
  onSelectFramework,
  onNavigateTab,
  onOpenAdvisor,
  onOpenSentinelHub,
  onOpenOnboarding,
  isLight = true,
  branding,
}) => {
  const [stageSentinelId, setStageSentinelId] = useState<SentinelId>('jax');
  const [speakingSentinelId, setSpeakingSentinelId] = useState<string | null>(null);

  const totalControls = controls.length;
  const compliantControls = controls.filter((c) => c.status === 'compliant').length;
  const inProgressControls = controls.filter((c) => c.status === 'in_progress').length;
  const actionNeededControls = controls.filter((c) => c.status === 'action_needed').length;

  const overallReadiness = Math.round((compliantControls / totalControls) * 100);

  // SVG Circular progress radius
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallReadiness / 100) * circumference;

  const activeStageSentinel = SENTINELS.find((s) => s.id === stageSentinelId) || SENTINELS[0];

  const handleSpeakSentinel = (id: string, text: string) => {
    if (speakingSentinelId === id) {
      stopSpeaking();
      setSpeakingSentinelId(null);
    } else {
      setSpeakingSentinelId(id);
      speakSentinel(
        id as any,
        text,
        () => setSpeakingSentinelId(id),
        () => setSpeakingSentinelId(null)
      );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 0. DEPARTMENT & ROLE WORKSPACE SEGMENTATION SELECTOR                      */}
      {/* ========================================================================= */}
      <section className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-2 border-indigo-400/40 shadow-xl text-white">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3.5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span>🏢</span>
                <span>Select Workspace by Department / Role</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-400/30 font-bold">
                Role-Based Focus
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Filter the 1-Compliance OS for your specific daily role so you only see what matters to you:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {/* IT & DevOps */}
          <button
            onClick={() => onNavigateTab('departments')}
            className="p-3 rounded-2xl bg-slate-950/70 hover:bg-slate-800/90 border border-cyan-500/30 hover:border-cyan-400 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="text-xl mb-1 group-hover:scale-110 transition-transform">💻</div>
            <div>
              <div className="font-black text-xs text-white group-hover:text-cyan-300">IT & DevOps</div>
              <div className="text-[10px] text-slate-400">Fleet laptops, BitLocker, CI/CD</div>
            </div>
          </button>

          {/* HR & People */}
          <button
            onClick={() => onNavigateTab('departments')}
            className="p-3 rounded-2xl bg-slate-950/70 hover:bg-slate-800/90 border border-purple-500/30 hover:border-purple-400 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="text-xl mb-1 group-hover:scale-110 transition-transform">👥</div>
            <div>
              <div className="font-black text-xs text-white group-hover:text-purple-300">HR & People</div>
              <div className="text-[10px] text-slate-400">Harassment training, I-9, EEO</div>
            </div>
          </button>

          {/* Everyday Employee */}
          <button
            onClick={() => onNavigateTab('employee_portal')}
            className="p-3 rounded-2xl bg-emerald-950/80 hover:bg-emerald-900/90 border-2 border-emerald-400 shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer ring-2 ring-emerald-500/20"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xl group-hover:scale-110 transition-transform">💼</span>
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-400 text-slate-950 font-mono text-[9px] font-black">Focused</span>
            </div>
            <div>
              <div className="font-black text-xs text-emerald-300">Everyday Employee</div>
              <div className="text-[10px] text-slate-300">Quests, sign-offs, rights</div>
            </div>
          </button>

          {/* Legal, Multi-Jurisdiction & BOI */}
          <button
            onClick={() => onNavigateTab('locallaws')}
            className="p-3 rounded-2xl bg-slate-950/70 hover:bg-slate-800/90 border border-amber-500/30 hover:border-amber-400 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="text-xl mb-1 group-hover:scale-110 transition-transform">⚖️</div>
            <div>
              <div className="font-black text-xs text-white group-hover:text-amber-300">Multi-State & Global</div>
              <div className="text-[10px] text-slate-400">US, CA, NY, EU, UK, BOI</div>
            </div>
          </button>

          {/* Employee Handbook */}
          <button
            onClick={() => onNavigateTab('handbook')}
            className="p-3 rounded-2xl bg-slate-950/70 hover:bg-slate-800/90 border border-indigo-500/30 hover:border-indigo-400 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="text-xl mb-1 group-hover:scale-110 transition-transform">📖</div>
            <div>
              <div className="font-black text-xs text-white group-hover:text-indigo-300">Employee Manual</div>
              <div className="text-[10px] text-slate-400">Synthesizer & signatures</div>
            </div>
          </button>

          {/* Executive & Board */}
          <button
            onClick={() => onNavigateTab('enterprise')}
            className="p-3 rounded-2xl bg-slate-950/70 hover:bg-slate-800/90 border border-slate-600 hover:border-slate-400 transition-all text-left flex flex-col justify-between group cursor-pointer"
          >
            <div className="text-xl mb-1 group-hover:scale-110 transition-transform">📊</div>
            <div>
              <div className="font-black text-xs text-white group-hover:text-cyan-300">Executive & Board</div>
              <div className="text-[10px] text-slate-400">Posture score & registers</div>
            </div>
          </button>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 1. SENTINEL COMMAND STAGE (VOICE ENABLED & DISTINCT ACCENTS)               */}
      {/* ========================================================================= */}
      <section className="space-y-3">
        {/* Stage Selector Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white/95 border-2 border-indigo-200/90 shadow-md">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <h2 className="text-base sm:text-lg font-black text-slate-950 tracking-tight">
              Sentinel Command Stage
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-extrabold bg-indigo-100 text-indigo-900 border border-indigo-300">
              Voice Enabled & Autonomous
            </span>
          </div>

          {/* Quick Character Picker Buttons for Stage */}
          <div className="flex items-center gap-1.5 overflow-x-auto">
            {SENTINELS.map((s) => {
              const isSelected = s.id === stageSentinelId;
              const profile = SENTINEL_VOICE_PROFILES[s.id];
              return (
                <button
                  key={s.id}
                  onClick={() => setStageSentinelId(s.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white scale-102 shadow-indigo-500/20'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-950'
                  }`}
                >
                  <img src={s.image} alt={s.name} className="w-4 h-4 object-contain" />
                  <span>{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* The Animated Full-Body Sentinel Character Stage */}
        <SentinelCharacterStage
          sentinel={activeStageSentinel}
          onSelectSentinel={(id) => setStageSentinelId(id)}
          onOpenChat={(id) => onOpenSentinelHub(id)}
          isLight={isLight}
          compact={false}
          interactive={true}
        />
      </section>

      {/* ========================================================================= */}
      {/* 2. VIBRANT HIGH-CONTRAST READINESS BANNER & METRIC TILES                  */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-indigo-200/80 bg-white/95 p-6 sm:p-8 shadow-xl">
        {/* Vibrant Gradient Background Mesh */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-cyan-400/15 via-indigo-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-400/15 via-pink-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-indigo-100">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-cyan-100 text-cyan-950 border border-cyan-400 shadow-xs">
                ⚡ {branding?.isWhiteLabelActive ? `${branding.companyName} Internal OS` : '1-Compliance OS Autonomous Engine'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-emerald-100 text-emerald-950 border border-emerald-400 shadow-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Enterprise Continuous Compliance Active
              </span>
              {branding?.isWhiteLabelActive && branding.allowedEmailDomains.length > 0 && (
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-100 text-indigo-900 border border-indigo-300 shadow-xs">
                  Approved Domain: @{branding.allowedEmailDomains.join(', @')}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950">
              {branding?.isWhiteLabelActive
                ? branding.welcomeMessage
                : 'Autonomous Compliance Operating System'}
            </h1>

            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              Real-time multi-framework orchestration for SOC 2 Type II, ISO 27001, HIPAA, GDPR, PCI DSS v4, and EU AI Act.
              All monitored autonomously by Jax and the 4 category Sentinels with enterprise multi-seat access and third-party vendor vetting.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onOpenSentinelHub('jax')}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white font-black text-xs shadow-lg shadow-indigo-500/25 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>💬 Talk with Jax & Squad</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('subscriptions')}
                className="px-4 py-2.5 rounded-2xl bg-white hover:bg-slate-50 border-2 border-indigo-300 text-slate-900 font-extrabold text-xs shadow-sm active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>💳 SaaS Plans ($149 - $999+)</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('guidebook')}
                className="px-4 py-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-300 text-indigo-950 font-extrabold text-xs shadow-xs active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>📖 Training Manual & Guidebook</span>
              </button>

              {onOpenOnboarding && (
                <button
                  type="button"
                  onClick={onOpenOnboarding}
                  className="px-4 py-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-extrabold text-xs transition-all cursor-pointer"
                >
                  ✨ Quickstart
                </button>
              )}
            </div>
          </div>

          {/* Overall Readiness Circular SVG Meter */}
          <div className="flex items-center gap-5 p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 via-white to-cyan-50/80 border-2 border-indigo-200/90 shrink-0 shadow-md">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-slate-200"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r={radius}
                  className="stroke-indigo-600 transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-xl font-black text-slate-950 font-mono">{overallReadiness}%</span>
                <span className="text-[9px] font-mono font-bold text-indigo-800 uppercase">Readiness</span>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <div className="font-black text-slate-950">Audit Posture</div>
              <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{compliantControls} Compliant</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-800 font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>{inProgressControls} In Progress</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-800 font-bold">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>{actionNeededControls} Action Needed</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Colorful Action Hub Tiles */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-6">
          <div
            onClick={() => onNavigateTab('scanner')}
            className="p-4 rounded-2xl bg-gradient-to-br from-cyan-50/80 to-white border-2 border-cyan-300 hover:border-cyan-500 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer group shadow-sm border-l-6 border-l-cyan-500"
          >
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-2xl">🚀</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-cyan-100 text-cyan-900 border border-cyan-300">
                10-Sec Scan
              </span>
            </div>
            <div className="text-sm font-black text-slate-950 group-hover:text-cyan-700 transition-colors">
              Website Scanner
            </div>
            <div className="text-xs text-slate-700 mt-1 font-semibold">
              TLS 1.3, HSTS & Headers
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('departments')}
            className="p-4 rounded-2xl bg-gradient-to-br from-amber-50/80 to-white border-2 border-amber-300 hover:border-amber-500 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer group shadow-sm border-l-6 border-l-amber-500"
          >
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-2xl">🏭</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-amber-100 text-amber-900 border border-amber-300">
                Plain English
              </span>
            </div>
            <div className="text-sm font-black text-slate-950 group-hover:text-amber-700 transition-colors">
              Factory & Dept Hub
            </div>
            <div className="text-xs text-slate-700 mt-1 font-semibold">
              Floor Safety & HR Protocols
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('training')}
            className="p-4 rounded-2xl bg-gradient-to-br from-purple-50/80 to-white border-2 border-purple-300 hover:border-purple-500 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer group shadow-sm border-l-6 border-l-purple-500"
          >
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-2xl">🎮</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-purple-100 text-purple-900 border border-purple-300">
                XP Quests
              </span>
            </div>
            <div className="text-sm font-black text-slate-950 group-hover:text-purple-700 transition-colors">
              Training Arcade
            </div>
            <div className="text-xs text-slate-700 mt-1 font-semibold">
              Phishing, Badges & Leaderboards
            </div>
          </div>

          <div
            onClick={() => onNavigateTab('vendors')}
            className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50/80 to-white border-2 border-indigo-300 hover:border-indigo-500 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer group shadow-sm border-l-6 border-l-indigo-600"
          >
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-2xl">🌐</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-indigo-100 text-indigo-900 border border-indigo-300">
                TPCRM Hub
              </span>
            </div>
            <div className="text-sm font-black text-slate-950 group-hover:text-indigo-700 transition-colors">
              Vendor Vetting
            </div>
            <div className="text-xs text-slate-700 mt-1 font-semibold">
              Guest Questionnaires & Passport
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. AUTONOMOUS SENTINEL SQUAD (CARDS WITH DISTINCT ACCENT BADGES & AUDIO)  */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-950">Autonomous Sentinel Squad</h2>
            <span className="text-xs font-mono font-black text-indigo-950 bg-indigo-100 px-3 py-1 rounded-full border border-indigo-300">
              5 Distinct Sentinel Voices Active
            </span>
          </div>

          <button
            onClick={() => onOpenSentinelHub('jax')}
            className="text-xs font-black text-indigo-700 hover:text-indigo-950 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Open Sentinel Squad Bridge →</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SENTINELS.map((sentinel) => {
            const isSpeakingThis = speakingSentinelId === sentinel.id;
            const profile = SENTINEL_VOICE_PROFILES[sentinel.id];

            const themeColors = {
              jax: { border: 'border-cyan-300 hover:border-cyan-500', badge: 'bg-cyan-100 text-cyan-950 border-cyan-400', accent: 'border-l-6 border-l-cyan-500', title: 'text-cyan-800' },
              it: { border: 'border-teal-300 hover:border-teal-500', badge: 'bg-teal-100 text-teal-950 border-teal-400', accent: 'border-l-6 border-l-teal-500', title: 'text-teal-800' },
              privacy: { border: 'border-purple-300 hover:border-purple-500', badge: 'bg-purple-100 text-purple-950 border-purple-400', accent: 'border-l-6 border-l-purple-500', title: 'text-purple-800' },
              risky: { border: 'border-amber-300 hover:border-amber-500', badge: 'bg-amber-100 text-amber-950 border-amber-400', accent: 'border-l-6 border-l-amber-500', title: 'text-amber-800' },
              hr: { border: 'border-blue-300 hover:border-blue-500', badge: 'bg-blue-100 text-blue-950 border-blue-400', accent: 'border-l-6 border-l-blue-500', title: 'text-blue-800' },
            }[sentinel.id] || { border: 'border-slate-300 hover:border-slate-500', badge: 'bg-slate-100 text-slate-800', accent: '', title: 'text-cyan-700' };

            return (
              <div
                key={sentinel.id}
                className={`p-4 rounded-3xl bg-white/95 border-2 ${themeColors.border} ${themeColors.accent} hover:scale-[1.02] hover:shadow-xl transition-all group flex flex-col justify-between shadow-md`}
              >
                <div>
                  <div
                    onClick={() => onOpenSentinelHub(sentinel.id)}
                    className="relative w-full h-44 flex flex-col items-center justify-end mb-3 cursor-pointer group"
                  >
                    {/* Glowing holographic circular pedestal under the robot's feet */}
                    <div className="absolute bottom-1 w-32 h-8 rounded-[100%] bg-gradient-to-r from-cyan-400/20 via-indigo-500/25 to-purple-500/20 blur-xs pointer-events-none group-hover:scale-125 transition-transform" />
                    <div className="absolute bottom-0 w-28 h-6 rounded-[100%] border border-cyan-400/40 pointer-events-none animate-pulse" />
                    <div className="w-20 h-2.5 rounded-full bg-slate-900/20 blur-xs mb-0.5 pointer-events-none" />

                    {/* Robot Image Standing on the Pedestal with walking/idle life */}
                    <div className={`relative h-40 transition-all duration-300 ${isSpeakingThis ? 'animate-sentinel-talk scale-105' : 'group-hover:-translate-y-2 group-hover:scale-105 animate-sentinel-idle'}`}>
                      <img
                        src={sentinel.image}
                        alt={sentinel.name}
                        className="h-full object-contain filter drop-shadow-[0_8px_20px_rgba(6,182,212,0.35)]"
                        referrerPolicy="no-referrer"
                      />
                      {/* Chest reactor light */}
                      <div className={`absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full pointer-events-none transition-all ${isSpeakingThis ? 'bg-cyan-400/60 blur-xs animate-ping' : 'bg-cyan-400/20 blur-xs'}`} />
                    </div>

                    <span className={`absolute top-0 right-0 px-2 py-0.5 rounded-full text-[10px] font-mono font-black border ${themeColors.badge} shadow-xs`}>
                      {sentinel.badge}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-black text-slate-950 text-base">
                      {sentinel.name}
                    </span>
                    {/* Role Unit Badge */}
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        themeColors.badge
                      }`}
                    >
                      <span>🛡️</span>
                      <span>{profile?.roleBadge || 'Active Unit'}</span>
                    </span>
                  </div>

                  <div className={`text-xs font-bold ${themeColors.title} line-clamp-1`}>
                    {sentinel.title}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  {/* Speaker button to trigger speech */}
                  <button
                    type="button"
                    onClick={() => handleSpeakSentinel(sentinel.id, sentinel.greeting)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                      isSpeakingThis
                        ? 'bg-purple-600 text-white animate-pulse'
                        : 'bg-purple-50 text-purple-900 hover:bg-purple-100 border border-purple-200 active:scale-95'
                    }`}
                    title={`Hear audio briefing from ${sentinel.name}`}
                  >
                    <span>{isSpeakingThis ? '⏹ Stop' : '🔊 Hear Audio'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenSentinelHub(sentinel.id)}
                    className="text-indigo-700 font-black hover:text-indigo-950 transition-colors text-xs cursor-pointer flex items-center gap-0.5"
                  >
                    <span>Chat →</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. D3.JS RISK CONCENTRATION HEAT-MAP                                      */}
      {/* ========================================================================= */}
      <ComplianceHeatMap
        frameworks={frameworks}
        controls={controls}
        onSelectFrameworkAndCategory={(frameworkId) => {
          onSelectFramework(frameworkId);
        }}
      />

      {/* ========================================================================= */}
      {/* 5. ACTIVE FRAMEWORK METERS (VISUAL METRIC GAUGES)                         */}
      {/* ========================================================================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-950">Active Frameworks Readiness</h2>
            <span className="text-xs font-mono font-bold text-slate-600">7 Multi-Mapped Frameworks</span>
          </div>
          <button
            onClick={() => onNavigateTab('frameworks')}
            className="text-xs font-black text-indigo-700 hover:text-indigo-950 transition-colors cursor-pointer"
          >
            All Framework Controls →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {frameworks.map((fw) => {
            const pct = Math.round((fw.compliantControls / fw.totalControls) * 100);
            return (
              <div
                key={fw.id}
                onClick={() => onSelectFramework(fw.id)}
                className="p-4 rounded-3xl bg-white border-2 border-indigo-100 hover:border-cyan-400 hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer group flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-mono font-black text-indigo-700 text-xs">{fw.badge}</span>
                    <span className="font-mono font-black text-slate-950 text-xs">{pct}%</span>
                  </div>
                  <h3 className="text-xs font-black text-slate-900 group-hover:text-indigo-700 transition-colors truncate">
                    {fw.name}
                  </h3>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100">
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 h-full rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="text-[10px] font-mono text-slate-600 mt-1.5 text-right font-bold">
                    {fw.compliantControls}/{fw.totalControls} Controls
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. 28 NOTION CATEGORIES UNIVERSAL ENTERPRISE BAR                          */}
      {/* ========================================================================= */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-100/90 via-sky-50 to-cyan-100/90 border-2 border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 flex items-center justify-center font-mono font-black text-white text-lg shrink-0 shadow-md">
            28
          </div>
          <div>
            <div className="text-base font-black text-slate-950 flex items-center gap-2">
              <span>28 Enterprise Compliance Domains Active</span>
              <span className="text-[10px] font-mono font-black text-indigo-950 bg-white border border-indigo-300 px-2.5 py-0.5 rounded-full shadow-xs">
                Notion Workspace Standard
              </span>
            </div>
            <div className="text-xs text-slate-800 mt-1 font-semibold">
              ITAM, Forensics, Crypto & MiCA, Incident Response Plans, RACI Roles & TPCRM.
            </div>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('enterprise')}
          className="px-5 py-2.5 text-xs font-black text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl transition-all shadow-md whitespace-nowrap self-start sm:self-auto shrink-0 cursor-pointer active:scale-95"
        >
          Open 28-Domain Workspace →
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 7. COMPACT LIVE EVIDENCE & TELEMETRY STREAM                               */}
      {/* ========================================================================= */}
      <div className="p-6 rounded-3xl bg-white border-2 border-slate-200 shadow-md space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-base font-black text-slate-950">Live Automated Evidence Stream</h3>
          </div>
          <button
            onClick={() => onNavigateTab('policies')}
            className="text-xs font-black text-indigo-700 hover:text-indigo-950 transition-colors cursor-pointer"
          >
            Evidence Ledger ({evidence.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {evidence.slice(0, 4).map((item) => (
            <div key={item.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 shadow-xs">
              <div className="flex items-center justify-between text-xs">
                <span className="font-black text-slate-950 truncate max-w-[150px]">{item.title}</span>
                <span className="text-[10px] font-mono font-black text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                  Verified
                </span>
              </div>
              <div className="text-xs text-slate-600 font-mono truncate font-semibold">{item.source} · {item.timestamp}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
