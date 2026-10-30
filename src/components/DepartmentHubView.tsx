import React, { useState } from 'react';
import { SENTINELS } from '../data/sentinelsData';

interface DepartmentHubViewProps {
  onOpenSentinelHub: (sentinelId?: string) => void;
  onNavigateTab: (tab: string) => void;
}

export type DepartmentKey = 'factory_ops' | 'hr_people' | 'it_engineering' | 'sales_marketing' | 'exec_board';

interface DepartmentConfig {
  id: DepartmentKey;
  name: string;
  badge: string;
  assignedSentinel: string;
  sentinelId: string;
  avatarIcon: string;
  description: string;
  commonProblems: string[];
  forms: {
    title: string;
    description: string;
    frequency: string;
    format: string;
    contentPreview: string;
  }[];
}

const DEPARTMENTS: DepartmentConfig[] = [
  {
    id: 'factory_ops',
    name: 'Factory, Plant & Physical Operations',
    badge: 'Manufacturing & Floor',
    assignedSentinel: 'IT & Ops Sentinel',
    sentinelId: 'it',
    avatarIcon: '🏭',
    description: 'Worker-friendly physical security, equipment safety (lockout/tagout), visitor badges, and floor hazard logs without legal confusion.',
    commonProblems: [
      'Workers leave physical terminals unlocked on the factory floor',
      'Unbadged contractors or visitors walk into production zones unescorted',
      'Equipment maintenance logs are written on loose paper instead of audit-ready logs',
      'Emergency exits or safety shutoffs are blocked by warehouse pallets',
    ],
    forms: [
      {
        title: 'Factory Equipment Safety & Lockout/Tagout (LOTO) Protocol',
        description: 'Mandatory physical checklist before servicing electrical, mechanical, or hydraulic machinery.',
        frequency: 'Per Shift / Maintenance Event',
        format: 'Printable Shift Form',
        contentPreview: `1-COMPLIANCE OS: FACTORY FLOOR SAFETY & LOTO FORM
Location: Facility Unit A / Assembly Line
Inspector: [Employee Name] | Supervisor: [Manager Name]
Date: [DD/MM/YYYY] | Machine ID: [M-402 Press]

MANDATORY SAFETY CHECKS:
[ ] 1. Main power breaker switched to OFF and physical padlock attached.
[ ] 2. Residual pneumatic/hydraulic pressure bled to zero gauge.
[ ] 3. Danger/Do Not Operate tag signed and visibly displayed.
[ ] 4. All personnel cleared from machine perimeter before testing start.
[ ] 5. Supervisor verbal confirmation obtained.

Sign-off: _________________________ Date: ______________`,
      },
      {
        title: 'Facility Visitor Access & Badge Escort Register',
        description: 'Satisfies SOC 2 CC6.4 and ISO 27001 physical security controls for plant tours and vendor visits.',
        frequency: 'Daily / Per Visitor',
        format: 'Reception / Gate Register',
        contentPreview: `FACILITY VISITOR LOG & NON-DISCLOSURE CONFIRMATION
Rule: All outside visitors must wear red badges and be escorted at all times.

Visitor Name: _______________________ Company: ______________________
Host Employee: ______________________ Badge Number: # [        ]
Time In: [   :   ] | Time Out: [   :   ] | Purpose: [Maintenance / Inspection]
NDA Accepted: [X] Yes — No photography permitted on production floor.
Host Signature: ______________________`,
      },
      {
        title: 'Floor Physical Incident & Hazard Quick-Report',
        description: '60-second hazard report for spills, broken locks, or tailgating incidents.',
        frequency: 'Immediate upon discovery',
        format: 'Digital or Printable Card',
        contentPreview: `60-SECOND PHYSICAL HAZARD / INCIDENT CARD
What happened? [ ] Unlocked door  [ ] Tailgating  [ ] Liquid spill  [ ] Machine fault
Exact location: ____________________________________________________
Was anyone injured or data exposed? [ ] Yes  [ ] No
Immediate action taken: ___________________________________________
Reported to Sentinel Guard / Floor Manager at: [Time]`,
      },
    ],
  },
  {
    id: 'hr_people',
    name: 'HR & People Operations',
    badge: 'People & Onboarding',
    assignedSentinel: 'HR Sentinel',
    sentinelId: 'hr',
    avatarIcon: '👥',
    description: 'Onboarding compliance, acceptable computer use, remote work security, background check logs, and harassment training in plain English.',
    commonProblems: [
      'New hires start without signing Acceptable Use and Security guidelines',
      'Departing employees retain access to Slack, Google Workspace, or GitHub after their last day',
      'Annual mandatory security training takes hours and employees tune it out',
      'Personnel records are shared over insecure email instead of encrypted storage',
    ],
    forms: [
      {
        title: 'New Hire Security & Acceptable Computer Use Acknowledgment',
        description: 'Simple 1-page agreement signed during Day 1 onboarding covering password rules, phishing, and device safety.',
        frequency: 'Upon Hire',
        format: 'E-Sign / Onboarding PDF',
        contentPreview: `EMPLOYEE ACCEPTABLE USE & DATA PROTECTION AGREEMENT
Welcome to the team! To keep our customer data safe, please review and agree:

1. PASSWORDS & 2FA: I will use a company password manager and never share my 2FA codes.
2. DEVICES: I will keep full-disk encryption (FileVault/BitLocker) enabled and lock my screen when stepping away.
3. PHISHING: If an email looks suspicious or asks for urgent gift cards/wire transfers, I will click "Report to Jax" instead of clicking links.
4. COMPANY DATA: I will only store company data on authorized company cloud drives (no personal USB sticks).

Employee Signature: _______________________ Date: ______________`,
      },
      {
        title: 'Employee Departure / Offboarding Checklist',
        description: 'Auditor-grade proof that access was revoked within 24 hours of employee departure.',
        frequency: 'Per Resignation/Termination',
        format: 'HR Audit Checklist',
        contentPreview: `OFFBOARDING REVOCATION CHECKLIST (SOC 2 CC6.2)
Employee Name: _____________________ Last Day: ____________________
HR Lead: __________________________ IT Lead: ______________________

ACCESS REVOCATIONS (Complete within 24 Hours):
[ ] Google Workspace / Email suspended
[ ] GitHub / Cloud Consoles removed
[ ] Slack / Communication workspace revoked
[ ] Company laptop wiped and returned
[ ] Physical office / plant keys collected

Confirmed by IT Sentinel Log: [Timestamped Proof]`,
      },
    ],
  },
  {
    id: 'it_engineering',
    name: 'IT, DevOps & Engineering',
    badge: 'Engineering & Infrastructure',
    assignedSentinel: 'IT Sentinel',
    sentinelId: 'it',
    avatarIcon: '💻',
    description: 'Developer security standards that do NOT slow down deployments. Copy-paste CI/CD scripts, 2FA rules, and branch protection.',
    commonProblems: [
      'Developers accidentally commit API keys or database passwords to GitHub',
      'Pull requests are merged directly into production without peer code reviews',
      'Production database backups are never tested for restoration',
      'Dependencies have known high-severity CVE vulnerabilities',
    ],
    forms: [
      {
        title: 'Developer Production Deployment & PR Standard',
        description: '4-step checklist to ensure code commits pass SOC 2 CC8.1 and ISO 27001 change management automatically.',
        frequency: 'Per Pull Request',
        format: 'GitHub PR Template',
        contentPreview: `## Pull Request Compliance Checklist (SOC 2 CC8.1)
- [ ] At least one peer engineer has reviewed and approved this PR.
- [ ] No secrets, private keys, or passwords in diff (Verified by Gitleaks).
- [ ] Automated vulnerability scan passed (Trivy scanner: 0 Critical).
- [ ] Database migrations are backward-compatible and tested in staging.
Reviewed by: @lead-engineer`,
      },
      {
        title: 'Laptop Security Baseline (Mac & Windows)',
        description: 'Fleet osquery script to verify FileVault/BitLocker, firewall, and screen lock without expensive MDM software.',
        frequency: 'Quarterly Audit',
        format: 'Terminal Command / Script',
        contentPreview: `# Run in macOS Terminal to verify baseline compliance:
fdesetup status # Verifies FileVault 2 Encryption
sudo /usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate # Verifies Firewall
defaults read com.apple.screensaver askForPassword # Verifies Screen Lock`,
      },
    ],
  },
  {
    id: 'sales_marketing',
    name: 'Sales, Marketing & Customer Success',
    badge: 'Customer Facing',
    assignedSentinel: 'Lead Jax Sentinel',
    sentinelId: 'jax',
    avatarIcon: '📈',
    description: 'Instant answers for vendor security questionnaires, customer trust one-pagers, and GDPR privacy claims.',
    commonProblems: [
      'Sales deals stall for weeks waiting on compliance team to answer 50-question spreadsheets',
      'Reps accidentally make false promises about security or certifications to customers',
      'Marketing campaigns collect customer emails without proper GDPR/CCPA consent boxes',
    ],
    forms: [
      {
        title: 'Instant Vendor Security Questionnaire Cheat Sheet',
        description: 'Standard answers to the 10 most common customer security questions (encryption, backups, SOC 2, penetration tests).',
        frequency: 'Deal Support',
        format: 'Sales Quick Reference',
        contentPreview: `TOP 5 CUSTOMER SECURITY QUESTIONS — VERIFIED ANSWERS:
Q: Where is customer data hosted?
A: Encrypted at rest (AES-256) and in transit (TLS 1.3) on SOC 2 Type II certified cloud infrastructure.

Q: Do you enforce MFA?
A: Yes, 100% mandatory multi-factor authentication across all staff and systems.

Q: How often do you run vulnerability scans?
A: Continuously on every code build via automated Trivy & Gitleaks scanners.

Q: What is your breach notification window?
A: Within 72 hours in compliance with GDPR Art. 33 and industry standards.`,
      },
    ],
  },
  {
    id: 'exec_board',
    name: 'Executive Leadership & Board',
    badge: 'Executive Governance',
    assignedSentinel: 'Risky & Jax Sentinels',
    sentinelId: 'risky',
    avatarIcon: '⚖️',
    description: 'High-level risk heat-maps, compliance ROI, cybersecurity insurance qualifications, and annual audit status.',
    commonProblems: [
      'Executives do not know if the company is vulnerable to ransomware or lawsuits',
      'Cyber insurance premiums double due to lack of MFA and incident response proof',
      'Board meetings require 20 hours of manual slide deck preparation',
    ],
    forms: [
      {
        title: 'Quarterly Executive Compliance & Risk Briefing Memo',
        description: 'One-page board memorandum summarizing audit readiness, residual risk score, and enterprise posture.',
        frequency: 'Quarterly Board Meeting',
        format: 'Executive Memo',
        contentPreview: `EXECUTIVE MEMORANDUM: COMPLIANCE POSTURE & RESIDUAL RISK
To: Board of Directors / Chief Executive Officer
From: Autonomous Compliance Operating System & Jax Sentinel
Audit Status: 92% Ready for SOC 2 Type II / ISO 27001
Operating Posture: Enterprise Continuous Monitoring Active
Cyber Insurance Eligibility: Fully Qualified (Enforced 2FA, Offsite Backups, Incident Response Plan Active)
Top Open Action Item: Complete Q4 employee phishing training quest.`,
      },
    ],
  },
];

export const DepartmentHubView: React.FC<DepartmentHubViewProps> = ({
  onOpenSentinelHub,
  onNavigateTab,
}) => {
  const [selectedDeptKey, setSelectedDeptKey] = useState<DepartmentKey>('factory_ops');
  const [activeFormIndex, setActiveFormIndex] = useState<number>(0);
  const [copiedStatus, setCopiedStatus] = useState<string | null>(null);

  // Policy Translator States
  const [sourceRegulation, setSourceRegulation] = useState<string>(
    'SOC 2 CC6.4 / ISO 27001 A.7.4: Physical Access Control & Environmental Safeguards'
  );
  const [targetDept, setTargetDept] = useState<DepartmentKey>('factory_ops');
  const [isTranslating, setIsTranslating] = useState<boolean>(false);
  const [translatedResult, setTranslatedResult] = useState<{
    headline: string;
    departmentLanguage: string;
    floorActionRules: string[];
    printableFormTitle: string;
  } | null>({
    headline: 'Factory Floor Physical Security & Machine Safety Protocol',
    departmentLanguage:
      'To keep our facility compliant and ensure external auditors pass our physical security inspection, all factory and plant employees must follow these simple day-to-day rules without needing to read legal standards.',
    floorActionRules: [
      'Badge In Every Time: Never hold the warehouse door open for anyone not wearing an active visitor or employee badge (no tailgating).',
      'Lock Machine Screens: When stepping away from a computer or CNC terminal, press Windows+L or lock the display.',
      'Equipment Lockout/Tagout: Always apply physical safety padlocks and danger tags before maintenance.',
      'Spills & Obstructions: Keep all emergency exit paths and server room doors completely clear and latched.',
    ],
    printableFormTitle: 'Factory Floor Daily Physical Security Checksheet',
  });

  const currentDept = DEPARTMENTS.find((d) => d.id === selectedDeptKey) || DEPARTMENTS[0];

  const handleTranslatePolicy = () => {
    setIsTranslating(true);
    setTimeout(() => {
      if (targetDept === 'factory_ops') {
        setTranslatedResult({
          headline: 'Factory Floor Physical Security & Equipment Safety Protocol',
          departmentLanguage:
            'This protocol translates complex SOC 2 and ISO regulations into practical factory floor practices. No technical jargon—just clear safety and access habits.',
          floorActionRules: [
            'Badge In Every Time: Never allow unbadged individuals into the production zone.',
            'Terminal Lock: Press lock on touchscreens and dispatch computers when stepping away.',
            'Equipment Lockout/Tagout (LOTO): Tag and isolate energy sources during maintenance.',
            'Clean Floor Policy: No papers with customer order numbers left unattended on packing benches.',
          ],
          printableFormTitle: 'Factory Floor Shift Verification Form',
        });
      } else if (targetDept === 'hr_people') {
        setTranslatedResult({
          headline: 'HR Onboarding & Data Handling Plain-Language Guidelines',
          departmentLanguage:
            'How HR coordinates employee onboarding, background checks, and record confidentiality in compliance with privacy laws.',
          floorActionRules: [
            'Day-1 Sign-off: Ensure all new hires sign the 1-page Acceptable Use agreement before accessing company systems.',
            'Confidential HR Files: Store candidate resumes and SSNs in encrypted cloud folders, never in open desktop downloads.',
            '24-Hour Offboarding: Immediately notify IT Sentinel when an employee departs so accounts are closed.',
            'Phishing Reporting: Remind staff during orientation to forward suspicious emails to Jax.',
          ],
          printableFormTitle: 'HR Onboarding Compliance Checklist',
        });
      } else if (targetDept === 'it_engineering') {
        setTranslatedResult({
          headline: 'Developer & IT Safe Shipping Rules (Zero-Bureaucracy)',
          departmentLanguage:
            'Engineering standards designed to pass SOC 2 CC8.1 change management without slowing down deployments.',
          floorActionRules: [
            'No Direct Main Commits: All changes go through PRs with at least 1 peer approval.',
            'Automated Secret Check: Let Gitleaks and Trivy test your branch before merge.',
            'Endpoint Encryption: Enable FileVault (macOS) or BitLocker (Windows) on all developer laptops.',
            'Credential Hygiene: Use environment variables or secret vaults, never hardcode tokens in repo.',
          ],
          printableFormTitle: 'Engineering PR Compliance Template',
        });
      } else if (targetDept === 'sales_marketing') {
        setTranslatedResult({
          headline: 'Sales Team Security Cheat Sheet for Customer Deals',
          departmentLanguage:
            'Plain-English answers you can give prospects right now without waiting for security team approvals.',
          floorActionRules: [
            'Data Encryption: We encrypt customer data in transit (TLS 1.3) and at rest (AES-256).',
            'Audit Readiness: 1-Compliance OS maintains continuous multi-framework monitoring.',
            'Incident Notification: Guaranteed 72-hour customer breach notification clock.',
            'Vendor Assessment: Download our 1-click Auditor Security Package to send directly to buyers.',
          ],
          printableFormTitle: 'Prospect Security FAQ One-Pager',
        });
      } else {
        setTranslatedResult({
          headline: 'Executive Risk & Compliance Governance Summary',
          departmentLanguage:
            'High-level summary of organizational compliance readiness, insurance qualifications, and cost savings.',
          floorActionRules: [
            'Overall Readiness: 92% across all 7 monitored frameworks.',
            'Operational Efficiency: Continuous automated evidence collection across endpoints.',
            'Insurance Status: Qualified for premier cyber liability tier with mandatory 2FA.',
            'Next Milestone: Annual Type II auditor package review scheduled.',
          ],
          printableFormTitle: 'Executive Board Compliance Briefing',
        });
      }
      setIsTranslating(false);
    }, 600);
  };

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStatus(id);
    setTimeout(() => setCopiedStatus(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Visual Header Banner with Onboarding Visual */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 p-6 md:p-8 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="font-bold">CROSS-DEPARTMENT COMPLIANCE TRANSLATOR</span>
              <span aria-hidden="true">·</span>
              <span>All Teams · Zero Legalese</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Compliance Made Simple for Every Department in Your Company
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Compliance shouldn't be locked inside the legal department. Whether you run a factory floor, manage HR onboarding, ship code in engineering, or close sales deals—1-Compliance OS translates complex regulations into clear, everyday protocols and printable forms.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onOpenSentinelHub('jax')}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-sm"
              >
                <span>Ask Jax for Custom Department Form</span>
                <span>→</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigateTab('training')}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-cyan-300 bg-slate-900 border border-cyan-800 hover:bg-cyan-950 transition-colors"
              >
                <span>Launch Training Arcade</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  XP Quests
                </span>
              </button>
            </div>
          </div>

          {/* Department Hub 3D Visual Graphic */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border border-cyan-500/40 bg-slate-950 shadow-2xl group">
              <img
                src="/assets/images/business_onboarding_hub_1793231556676.jpg"
                alt="Cross-department compliance coordination hub"
                className="w-full h-56 sm:h-60 object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-lg bg-slate-950/90 border border-slate-800 backdrop-blur-md flex items-center justify-between text-[11px] font-mono">
                <span className="text-cyan-300">● 5 Departments Connected</span>
                <span className="text-slate-400 font-sans">Automated Translation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* DEPARTMENT SELECTOR STRIP */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {DEPARTMENTS.map((dept) => {
          const isSelected = dept.id === selectedDeptKey;
          return (
            <button
              key={dept.id}
              type="button"
              onClick={() => {
                setSelectedDeptKey(dept.id);
                setActiveFormIndex(0);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)] ring-1 ring-cyan-400'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{dept.avatarIcon}</span>
                  <span className="text-[10px] font-mono text-cyan-400">{dept.badge}</span>
                </div>
                <div className="text-xs font-bold text-white mt-2 leading-tight">
                  {dept.name}
                </div>
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-2 pt-2 border-t border-slate-800">
                Guardian: {dept.assignedSentinel}
              </div>
            </button>
          );
        })}
      </div>

      {/* SELECTED DEPARTMENT WORKBENCH */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 rounded-xl bg-slate-950 border border-slate-800">
              {currentDept.avatarIcon}
            </span>
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>{currentDept.badge}</span>
                <span>·</span>
                <span>Protected by {currentDept.assignedSentinel}</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-0.5">{currentDept.name} Hub</h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">{currentDept.description}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenSentinelHub(currentDept.sentinelId)}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-cyan-300 bg-slate-950 border border-cyan-800 hover:bg-cyan-950 transition-colors shrink-0"
          >
            Consult {currentDept.assignedSentinel} →
          </button>
        </div>

        {/* Common Friction Points & Fixes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          {/* Left: Common Pain Points this Department Faces */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
              <span>Common Daily Friction Points</span>
              <span className="text-rose-400 font-mono text-[11px]">Audit Traps</span>
            </div>
            <div className="space-y-2">
              {currentDept.commonProblems.map((prob, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-300"
                >
                  <span className="text-amber-400 font-bold shrink-0 mt-0.5">⚠️</span>
                  <span>{prob}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-lg bg-cyan-950/30 border border-cyan-800/60 text-xs text-cyan-200 mt-4">
              <strong>How 1-Compliance OS Fixes This:</strong> We eliminate manual paperwork by providing ready-made checklists, automated Slack/terminal alerts, and plain-English forms that employees can fill out in under 60 seconds.
            </div>
          </div>

          {/* Right: Ready-to-Use Forms & Protocols */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Ready-to-Use Forms & Protocols
              </span>
              <span className="text-emerald-400 font-mono text-[11px]">Printable & Digital</span>
            </div>

            {/* Form Selection Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {currentDept.forms.map((form, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveFormIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                    activeFormIndex === idx
                      ? 'bg-cyan-400 text-slate-950 shadow-sm'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {form.title.split(' ')[0]} {form.title.split(' ')[1]}
                </button>
              ))}
            </div>

            {/* Active Form Display Card */}
            {currentDept.forms[activeFormIndex] && (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      {currentDept.forms[activeFormIndex].title}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                      <span className="text-cyan-400 font-mono">
                        {currentDept.forms[activeFormIndex].format}
                      </span>
                      <span>·</span>
                      <span>{currentDept.forms[activeFormIndex].frequency}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      handleCopyText(
                        currentDept.forms[activeFormIndex].contentPreview,
                        `form-${activeFormIndex}`
                      )
                    }
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shrink-0 shadow-sm"
                  >
                    {copiedStatus === `form-${activeFormIndex}`
                      ? '✓ Copied Form!'
                      : 'Copy Form / Print'}
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentDept.forms[activeFormIndex].description}
                </p>

                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-200 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto">
                  {currentDept.forms[activeFormIndex].contentPreview}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* INTER-DEPARTMENT POLICY TRANSLATOR TOOL */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 space-y-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
            <span>AUTOMATED INTER-DEPARTMENT TRANSLATOR</span>
            <span>·</span>
            <span>Eliminate Compliance Jargon</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            Translate Any Complex Policy into Plain Department Language
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            When the compliance team creates a new rule, don't blast a 40-page PDF to the rest of the company! 
            Select the regulation, pick the department, and our AI Sentinels translate it into an actionable 1-page protocol with worker-friendly language.
          </p>
        </div>

        {/* Translation Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-6 space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Source Compliance Regulation / Policy
            </label>
            <select
              value={sourceRegulation}
              onChange={(e) => setSourceRegulation(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="SOC 2 CC6.4 / ISO 27001 A.7.4: Physical Access Control & Environmental Safeguards">
                SOC 2 CC6.4 / ISO 27001: Physical Security & Badge Access
              </option>
              <option value="SOC 2 CC6.1 / ISO 27001 A.8.5: Mandatory Multi-Factor Authentication & Access Review">
                SOC 2 CC6.1: Mandatory 2FA & Password Management
              </option>
              <option value="GDPR Article 33 / HIPAA §164.308: 72-Hour Security Incident & Breach Notification">
                GDPR Art. 33 & HIPAA: 72-Hour Incident Reporting
              </option>
              <option value="OSHA §1910.147 / ISO 45001: Hazardous Energy Control (Lockout / Tagout)">
                OSHA §1910.147: Machine Safety & Lockout/Tagout
              </option>
              <option value="SOC 2 CC8.1: Change Management & Secure Code Development Lifecycle">
                SOC 2 CC8.1: Developer Peer Reviews & Code Changes
              </option>
            </select>
          </div>

          <div className="md:col-span-4 space-y-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Target Recipient Department
            </label>
            <select
              value={targetDept}
              onChange={(e) => setTargetDept(e.target.value as DepartmentKey)}
              className="w-full px-3 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="factory_ops">Factory, Plant & Physical Operations Floor</option>
              <option value="hr_people">HR & People Operations Team</option>
              <option value="it_engineering">IT, DevOps & Engineering Team</option>
              <option value="sales_marketing">Sales, Marketing & Customer Success</option>
              <option value="exec_board">Executive Leadership & Board</option>
            </select>
          </div>

          <div className="md:col-span-2 pt-5">
            <button
              type="button"
              onClick={handleTranslatePolicy}
              disabled={isTranslating}
              className="w-full py-2.5 px-3 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-sm disabled:opacity-50"
            >
              {isTranslating ? 'Translating...' : 'Translate ✨'}
            </button>
          </div>
        </div>

        {/* Translation Output Card */}
        {translatedResult && (
          <div className="p-5 rounded-xl bg-slate-950 border border-cyan-500/40 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                  ✓ Translated into {DEPARTMENTS.find((d) => d.id === targetDept)?.name} Vocabulary
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">
                  {translatedResult.headline}
                </h3>
              </div>
              <button
                type="button"
                onClick={() =>
                  handleCopyText(
                    `${translatedResult.headline}\n\n${translatedResult.departmentLanguage}\n\nACTION RULES:\n${translatedResult.floorActionRules.join('\n')}`,
                    'translated-policy'
                  )
                }
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 bg-slate-900 border border-cyan-800 hover:bg-cyan-950 transition-colors self-start sm:self-auto"
              >
                {copiedStatus === 'translated-policy' ? '✓ Copied Protocol!' : 'Copy Translated Protocol'}
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {translatedResult.departmentLanguage}
            </p>

            <div className="space-y-2">
              <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Mandatory Action Rules (What Workers Must Do):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {translatedResult.floorActionRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-start gap-2.5 text-xs text-slate-200"
                  >
                    <span className="text-cyan-400 font-bold shrink-0 mt-0.5">#{idx + 1}</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
