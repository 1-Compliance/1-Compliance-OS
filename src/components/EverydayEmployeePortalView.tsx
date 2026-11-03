import React, { useState } from 'react';
import { CompanyBrandingConfig } from '../types/compliance';

interface EverydayEmployeePortalViewProps {
  branding?: CompanyBrandingConfig;
  onOpenSentinelHub?: (sentinelId?: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const EverydayEmployeePortalView: React.FC<EverydayEmployeePortalViewProps> = ({
  branding,
  onOpenSentinelHub,
  onNavigateTab,
}) => {
  const companyName = branding?.companyName || '1-Compliance';
  const companyDomain = branding?.corporateDomain || '1-compliance.com';

  // Employee Identity (Mock / Demo state)
  const [employeeName, setEmployeeName] = useState('Alex Morgan');
  const [employeeTitle, setEmployeeTitle] = useState('Senior Associate');
  const [employeeEmail, setEmployeeEmail] = useState(`alex.m@${companyDomain}`);

  // Policy Sign-off state
  const [hasAcknowledgedHandbook, setHasAcknowledgedHandbook] = useState(false);
  const [signTimestamp, setSignTimestamp] = useState<string | null>(null);

  // Training Quest status
  const [trainings, setTrainings] = useState([
    {
      id: 't-01',
      title: 'Annual Sexual Harassment Prevention Training (NYS/NYC Mandate)',
      duration: '45 mins',
      dueDate: 'Dec 15, 2026',
      completed: true,
      badge: '🛡️ Harassment Prevention Verified',
      category: 'Legal Mandatory',
    },
    {
      id: 't-02',
      title: 'Phishing Defense & Credential Safety Simulation',
      duration: '15 mins',
      dueDate: 'Nov 30, 2026',
      completed: true,
      badge: '🎣 Phish Master',
      category: 'Cyber Security',
    },
    {
      id: 't-03',
      title: 'Workplace Data Privacy & Clean Desk Standard',
      duration: '20 mins',
      dueDate: 'Nov 20, 2026',
      completed: false,
      badge: '🔒 Privacy Guardian',
      category: 'Data Protection',
    },
    {
      id: 't-04',
      title: 'NYS Notice of Electronic Monitoring Acknowledgement (CRL § 52-c)',
      duration: '5 mins',
      dueDate: 'Immediate',
      completed: hasAcknowledgedHandbook,
      badge: '📜 Statutory Notice Received',
      category: 'Statutory Notice',
    },
  ]);

  const completedCount = trainings.filter((t) => t.completed).length;
  const progressPercent = Math.round((completedCount / trainings.length) * 100);

  const handleSignHandbook = () => {
    const now = new Date().toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
    setHasAcknowledgedHandbook(true);
    setSignTimestamp(now);
    setTrainings((prev) =>
      prev.map((t) => (t.id === 't-04' ? { ...t, completed: true } : t))
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Welcome Banner (Clean, Focused, Friendly) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500/50 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-emerald-500/10 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold">
              <span>💼 Everyday Employee Workplace Portal</span>
              <span>•</span>
              <span>Zero Jargon Zone</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Welcome back, {employeeName}!
            </h1>
            <p className="text-slate-300 text-sm max-w-2xl">
              This simplified portal is customized for your daily employee obligations at{' '}
              <strong className="text-white font-bold">{companyName}</strong>. You don’t need to worry about complex server configs or auditor audits—just review your required annual trainings, company handbook, and statutory workplace rights.
            </p>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-2xl border border-emerald-500/30 shrink-0 text-center min-w-[200px]">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">
              Your Annual Compliance
            </div>
            <div className="text-3xl font-black text-emerald-400">
              {progressPercent}%
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-400 mt-2">
              {completedCount} of {trainings.length} completed
            </div>
          </div>
        </div>
      </div>

      {/* 3 Main Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Employee Manual & Handbook */}
        <div className="p-6 rounded-3xl bg-white border-2 border-indigo-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 border border-indigo-300 text-indigo-700 flex items-center justify-center text-2xl mb-4 shadow-xs">
              📖
            </div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-black text-slate-950">Company Employee Manual</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-100 text-indigo-800">
                10 Chapters
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Read <strong className="text-slate-900">{companyName}’s</strong> customized employee handbook. Covers PTO, sick leave (NYC ESSTA), remote work protocols, anti-discrimination, and at-will employment terms.
            </p>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5 mb-4">
              <div className="flex items-center justify-between text-slate-700 font-bold">
                <span>Status:</span>
                {hasAcknowledgedHandbook ? (
                  <span className="text-emerald-600 font-black flex items-center gap-1">
                    ✓ Signed & On File
                  </span>
                ) : (
                  <span className="text-amber-600 font-black flex items-center gap-1">
                    ⏳ Signature Due
                  </span>
                )}
              </div>
              {signTimestamp && (
                <div className="text-[11px] text-slate-500 font-mono">
                  Signed: {signTimestamp}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => onNavigateTab && onNavigateTab('handbook')}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Open Employee Handbook Reader</span>
              <span>→</span>
            </button>
            {!hasAcknowledgedHandbook && (
              <button
                onClick={handleSignHandbook}
                className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold text-xs transition-colors cursor-pointer"
              >
                ✍️ Quick Sign-Off Acknowledgement
              </button>
            )}
          </div>
        </div>

        {/* Card 2: Mandatory Annual Training Quests */}
        <div className="p-6 rounded-3xl bg-white border-2 border-indigo-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-300 text-amber-700 flex items-center justify-center text-2xl mb-4 shadow-xs">
              🎮
            </div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-black text-slate-950">Training Arcade & Quests</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-800">
                Interactive
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Complete mandatory annual compliance courses in a gamified, bite-sized format. Earn certified completion badges for anti-harassment and phishing security.
            </p>

            <div className="space-y-2 mb-4">
              {trainings.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                >
                  <div className="truncate mr-2">
                    <div className="font-bold text-slate-900 truncate">{item.title}</div>
                    <div className="text-[10px] text-slate-500">{item.duration} · Due: {item.dueDate}</div>
                  </div>
                  {item.completed ? (
                    <span className="shrink-0 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                      Done
                    </span>
                  ) : (
                    <span className="shrink-0 px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-mono font-bold text-[10px]">
                      Pending
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => onNavigateTab && onNavigateTab('training')}
            className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Enter Gamified Training Arcade</span>
            <span>🕹️</span>
          </button>
        </div>

        {/* Card 3: Workplace Rights & Statutory Notices */}
        <div className="p-6 rounded-3xl bg-white border-2 border-indigo-200/90 shadow-md hover:shadow-xl transition-all flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-cyan-100 border border-cyan-300 text-cyan-700 flex items-center justify-center text-2xl mb-4 shadow-xs">
              ⚖️
            </div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-black text-slate-950">Workplace Rights & Notices</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-100 text-cyan-800">
                Multi-State / Global
              </span>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Review your statutory worker protections, mandatory state leave policies (CA, NY, IL, TX), whistleblower protections, and required statutory notices.
            </p>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2 mb-4">
              <div className="flex items-center gap-2 text-slate-800 font-bold">
                <span>🌴</span>
                <span>California & New York Paid Sick Leave</span>
              </div>
              <div className="text-[11px] text-slate-500">
                40 to 56 hours paid safe/sick leave per calendar year. Retaliation strictly prohibited.
              </div>
              <div className="flex items-center gap-2 text-slate-800 font-bold pt-1 border-t border-slate-200">
                <span>🌽</span>
                <span>Illinois PLAWA Paid Leave For Any Reason</span>
              </div>
              <div className="text-[11px] text-slate-500">
                40 hours paid leave per year usable for any purpose without doctor notes.
              </div>
              <div className="flex items-center gap-2 text-slate-800 font-bold pt-1 border-t border-slate-200">
                <span>📡</span>
                <span>Employee Electronic Monitoring Notice</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Transparent disclosure of employer email, network, and equipment monitoring (NYS CRL § 52-c / Ontario ESA).
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab && onNavigateTab('locallaws')}
            className="w-full py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View All Statutory Laws & Rights</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Jax Sentinel Mascot Message */}
      <div className="p-5 rounded-2xl bg-indigo-50/80 border-2 border-indigo-200 flex flex-col sm:flex-row items-center gap-4">
        <img
          src="/assets/sentinels/jax_transparent.png"
          alt="Jax"
          className="w-14 h-14 object-contain filter drop-shadow shrink-0"
        />
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="font-black text-slate-950 text-sm">Jax — Lead Sentinel</span>
            <span className="px-2 py-0.5 rounded-full bg-cyan-200 text-cyan-900 text-[10px] font-mono font-black">
              Helpful Guide
            </span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            "Welcome! If you ever need to review what our company expects or have questions about safe reporting, our handbook and ethics guidelines are always here. When you complete your courses, I automatically record your certificate in our audit binder so no one has to chase you down with emails!"
          </p>
        </div>
      </div>
    </div>
  );
};
