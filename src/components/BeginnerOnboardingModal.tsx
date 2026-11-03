import React, { useState } from 'react';
import { SENTINELS } from '../data/sentinelsData';

interface BeginnerOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
  onOpenSentinelHub: (sentinelId?: string) => void;
}

export const BeginnerOnboardingModal: React.FC<BeginnerOnboardingModalProps> = ({
  isOpen,
  onClose,
  onNavigateTab,
  onOpenSentinelHub,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [businessType, setBusinessType] = useState<string>('small_business');
  const [primaryGoal, setPrimaryGoal] = useState<string>('customer_questionnaire');
  const [teamSize, setTeamSize] = useState<string>('1_10');

  if (!isOpen) return null;

  const handleFinish = (targetTab: string) => {
    onClose();
    onNavigateTab(targetTab);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col">
        {/* Header with Jax Mascot */}
        <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-cyan-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-14 rounded-lg bg-slate-950 p-1 border border-cyan-400 shadow-md shrink-0 flex items-center justify-center">
              <img
                src="/assets/sentinels/jax_transparent.png"
                alt="Jax Chief Mascot"
                className="h-11 object-contain filter drop-shadow-[0_2px_8px_rgba(6,182,212,0.5)]"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span className="font-bold">ZERO-CONFUSION LAUNCHPAD</span>
                <span aria-hidden="true">·</span>
                <span>Guided by Jax</span>
              </div>
              <h2 className="text-lg font-bold text-white">
                New to Compliance? Let's Find Your Exact Starting Point
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-sm transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1">
          <div
            className="bg-cyan-400 h-full transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* STEP 1: What is your business? */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Question 1 of 2</span>
                <h3 className="text-base font-bold text-white mt-1">
                  What type of business are you operating?
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  We strip away irrelevant regulations so you only see what actually matters for your company.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'small_business',
                    title: 'Small Business / Local / Solo Shop',
                    desc: 'Retail, professional services, agencies, or independent businesses.',
                    icon: '🏪',
                  },
                  {
                    id: 'saas_startup',
                    title: 'Software, Tech & SaaS Startup',
                    desc: 'Cloud apps, developers, platforms storing customer or company data.',
                    icon: '💻',
                  },
                  {
                    id: 'factory_manufacturing',
                    title: 'Factory, Plant & Manufacturing',
                    desc: 'Physical operations, warehouse logistics, equipment & floor workers.',
                    icon: '🏭',
                  },
                  {
                    id: 'healthcare',
                    title: 'Healthcare, Clinic or Wellness',
                    desc: 'Medical practices, patient data, HIPAA or health record obligations.',
                    icon: '🩺',
                  },
                  {
                    id: 'fintech_crypto',
                    title: 'Fintech, Crypto or Payments',
                    desc: 'Handling money, digital assets, PCI-DSS cardholder data, or banking.',
                    icon: '💳',
                  },
                  {
                    id: 'enterprise_multidept',
                    title: 'Mid-Market or Multi-Department',
                    desc: 'Multiple teams (HR, IT, Ops, Legal) needing shared protocols.',
                    icon: '🏢',
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBusinessType(item.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      businessType === item.id
                        ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-white">{item.title}</div>
                      <div className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                <span className="text-xs text-slate-500 font-mono">No compliance background needed</span>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Next Question</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Primary Goal */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Question 2 of 2</span>
                <h3 className="text-base font-bold text-white mt-1">
                  What is your most urgent compliance challenge right now?
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pick the problem keeping you up at night, and we will solve it first.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    id: 'customer_questionnaire',
                    title: 'A customer or partner sent us a security questionnaire',
                    desc: 'We need to answer 30+ vendor questions quickly to win or keep a client.',
                    tag: 'Most Common',
                  },
                  {
                    id: 'audit_certification',
                    title: 'We need to pass an official audit (SOC 2, ISO 27001, HIPAA, OSHA)',
                    desc: 'We have to prepare our policies and technical evidence for an auditor.',
                    tag: 'Enterprise Need',
                  },
                  {
                    id: 'department_protocols',
                    title: 'Our team needs simple forms & protocols (HR, IT, Factory Floor)',
                    desc: 'We need clear procedures that employees will actually follow without complaints.',
                    tag: 'Team Operations',
                  },
                  {
                    id: 'employee_training',
                    title: 'We need to train employees on phishing, safety & privacy',
                    desc: 'Our staff needs interactive, fun training that satisfies insurance or audits.',
                    tag: 'Training Hub',
                  },
                  {
                    id: 'just_starting',
                    title: 'We have zero clue where to start and want a baseline scan',
                    desc: 'Audit our public website and show us our basic risks in plain English.',
                    tag: 'Beginner Friendly',
                  },
                ].map((goal) => (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => setPrimaryGoal(goal.id)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      primaryGoal === goal.id
                        ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{goal.title}</span>
                        <span className="text-[10px] font-mono text-cyan-400 border border-cyan-800 px-1.5 py-0.2 rounded">
                          {goal.tag}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">{goal.desc}</div>
                    </div>
                    <span className="text-cyan-400 font-bold shrink-0">
                      {primaryGoal === goal.id ? '●' : '○'}
                    </span>
                  </button>
                ))}
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Generate My Personalized Action Plan</span>
                  <span>✨</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Personalized Action Plan */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/50">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                  <span>✓ PLAN GENERATED IN 0.3 SECONDS</span>
                  <span>·</span>
                  <span>ENTERPRISE FAST-TRACK ROADMAP</span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">
                  Your 15-Minute Personalized Action Plan
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  Jax has selected your ideal starting modules. You do NOT need to learn complex laws—just follow these 3 visual steps:
                </p>
              </div>

              {/* 3 Step Action Cards */}
              <div className="space-y-2.5">
                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                    1
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-white">
                        {primaryGoal === 'employee_training'
                          ? 'Launch Sentinel Training Arcade'
                          : primaryGoal === 'department_protocols'
                          ? 'Open Department Protocol Hub'
                          : 'Audit Public Website & Security Headers'}
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400">Takes 2 min</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {primaryGoal === 'employee_training'
                        ? 'Assign the 5-minute interactive Phishing Trap quest to your team.'
                        : primaryGoal === 'department_protocols'
                        ? 'Generate worker-friendly forms and protocols for HR, IT, and Factory Floor managers.'
                        : 'Run our free scanner on your website to verify HTTPS, TLS 1.3, and cookie banners.'}
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                    2
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-white">
                        Adopt Pre-Approved Master Policies
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400">Takes 3 min</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Use our one-click policy generator to draft your Information Security & Acceptable Use Policy customized for your business.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-cyan-400 text-slate-950 font-bold font-mono text-xs flex items-center justify-center shrink-0">
                    3
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-white">
                        Chat with Jax Whenever You Are Stuck
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">Always Free</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Jax and the Sentinels answer any compliance or safety question in plain, everyday language with no legal jargon.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (primaryGoal === 'employee_training') {
                      handleFinish('training');
                    } else if (primaryGoal === 'department_protocols') {
                      handleFinish('departments');
                    } else if (primaryGoal === 'just_starting') {
                      handleFinish('scanner');
                    } else {
                      handleFinish('dashboard');
                    }
                  }}
                  className="flex-1 py-2.5 px-4 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors text-center shadow-lg"
                >
                  Start Guided Step 1 Now →
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenSentinelHub('jax');
                  }}
                  className="py-2.5 px-4 rounded-lg text-xs font-semibold text-cyan-300 bg-slate-950 border border-cyan-800 hover:bg-cyan-950 transition-colors"
                >
                  Ask Jax A Direct Question
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
