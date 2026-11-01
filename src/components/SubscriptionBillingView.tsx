import React, { useState } from 'react';
import { SENTINELS } from '../data/sentinelsData';
import { CompanyBrandingConfig } from '../types/compliance';

interface SubscriptionBillingViewProps {
  onOpenSentinelHub: (sentinelId?: string) => void;
  onNavigateTab: (tab: string) => void;
  branding?: CompanyBrandingConfig;
  onUpdateBranding?: (branding: CompanyBrandingConfig) => void;
}

export interface PricingPlan {
  id: 'solo' | 'team' | 'enterprise_scale' | 'vendor_passport';
  name: string;
  badge: string;
  tagline: string;
  monthlyPrice: number;
  annualMonthlyPrice: number;
  userLimit: string;
  highlighted?: boolean;
  features: string[];
  omittedFeatures?: string[];
  sentinelsIncluded: string[];
  idealFor: string;
  stripePriceIdMonthly: string;
  stripePriceIdAnnual: string;
}

export interface EnterpriseMember {
  id: string;
  name: string;
  email: string;
  department: 'Factory & Operations' | 'HR & People' | 'IT & DevOps' | 'Finance & Legal' | 'Executive';
  role: 'Admin' | 'Compliance Officer' | 'Department Manager' | 'Staff / Operator' | 'External Auditor';
  status: 'Active' | 'Invited' | 'Suspended';
  lastActive: string;
}

const INITIAL_ENTERPRISE_MEMBERS: EnterpriseMember[] = [
  {
    id: 'usr-01',
    name: 'Sarah Chen',
    email: 'sarah.chen@1-compliance.com',
    department: 'IT & DevOps',
    role: 'Admin',
    status: 'Active',
    lastActive: '10 mins ago',
  },
  {
    id: 'usr-02',
    name: 'Marcus Vance',
    email: 'marcus.v@1-compliance.com',
    department: 'Factory & Operations',
    role: 'Department Manager',
    status: 'Active',
    lastActive: '1 hour ago',
  },
  {
    id: 'usr-03',
    name: 'Jessica Reynolds',
    email: 'jessica.r@1-compliance.com',
    department: 'HR & People',
    role: 'Compliance Officer',
    status: 'Active',
    lastActive: '3 hours ago',
  },
  {
    id: 'usr-04',
    name: 'David Zhao',
    email: 'david.z@1-compliance.com',
    department: 'Finance & Legal',
    role: 'Staff / Operator',
    status: 'Active',
    lastActive: 'Yesterday',
  },
  {
    id: 'usr-05',
    name: 'Robert Miller (BDO / Schellman CPA)',
    email: 'rmiller@auditfirm.com',
    department: 'Executive',
    role: 'External Auditor',
    status: 'Active',
    lastActive: '2 days ago',
  },
];

const PLANS: PricingPlan[] = [
  {
    id: 'solo',
    name: 'Solo / Founder Plan',
    badge: '1 User · Single Login',
    tagline: 'Complete autonomous compliance operating system for solo founders, independent consultants, and single operators.',
    monthlyPrice: 149,
    annualMonthlyPrice: 124, // $1,490/yr (2 months free)
    userLimit: '1 Company User (1 Login)',
    idealFor: 'Solo founders, technical leads, single compliance officers',
    stripePriceIdMonthly: 'price_solo_monthly_149',
    stripePriceIdAnnual: 'price_solo_annual_124',
    sentinelsIncluded: ['Jax (Chief Sentinel) + All 4 Domain Sentinels'],
    features: [
      '1 Dedicated Workspace Administrator Seat',
      'All 5 Autonomous Sentinels (Jax, IT, Privacy, Risky, HR)',
      'Production Website Security Scanner (TLS, HSTS, CSP, Headers)',
      '12 Master Policies with Instant AI Customizer',
      'SOC 2 Type II, ISO 27001, HIPAA, GDPR, PCI DSS v4 Readiness',
      'Continuous Automated Infrastructure Blueprints (Trivy, Prowler, Gitleaks)',
      '1-Click Auditor-Ready ZIP Binder & Evidence Package Export',
      'Unlimited Included Guest Vendor Vetting Portals for Third-Party Suppliers',
    ],
    omittedFeatures: [
      'Multi-user team logins & role delegation',
      'Department-specific access scoping (Factory, HR, IT)',
      'Company-wide gamified training leaderboards',
      'Enterprise SSO & directory sync',
    ],
  },
  {
    id: 'team',
    name: 'Team Compliance Plan',
    badge: 'Up to 5 Logins',
    tagline: 'Collaborative compliance governance for startups and growing teams with cross-department roles.',
    monthlyPrice: 299,
    annualMonthlyPrice: 249, // $2,990/yr (2 months free)
    userLimit: 'Up to 5 Company Users (5 Logins)',
    idealFor: 'Startups with 2 to 5 team members needing collaborative workflows',
    stripePriceIdMonthly: 'price_team_monthly_299',
    stripePriceIdAnnual: 'price_team_annual_249',
    sentinelsIncluded: ['All 5 Sentinels with Shared Team Memory'],
    features: [
      'Up to 5 Dedicated Company Logins with Role-Based Access (RBAC)',
      'Everything in Solo / Founder Plan',
      'Cross-Department Hub (Factory Floor, HR, IT, Finance) with Plain-English views',
      'Role-based task delegation (Admin, Compliance Officer, Reviewer)',
      'Automated background continuous evidence collection probes',
      'Real-time Slack, Discord, and email webhook alerts',
      'Evidence tamper-proof SHA-256 cryptographic chain of custody',
      'Unlimited Free Guest Vendor Vetting Links with Auto-Scoring',
    ],
    omittedFeatures: [
      '6+ company logins across larger enterprise workforce',
      'SAML 2.0 / Okta / Azure AD Enterprise SSO integration',
      'Multi-department training quests with custom leaderboard',
    ],
  },
  {
    id: 'enterprise_scale',
    name: 'Enterprise Scale Plan',
    badge: '6 to 100 Users · Most Popular',
    tagline: 'Comprehensive company-wide compliance access across all departments, employees, and factory operations.',
    monthlyPrice: 999,
    annualMonthlyPrice: 832, // $9,990/yr (2 months free)
    userLimit: '6 to 100 Company Users (All Employees)',
    highlighted: true,
    idealFor: 'Mid-Market & Scaleups (6 to 100 employees across all departments)',
    stripePriceIdMonthly: 'price_ent_monthly_999',
    stripePriceIdAnnual: 'price_ent_annual_832',
    sentinelsIncluded: ['All 5 Sentinels + Custom Policy Agents + Dedicated Audit Concierge'],
    features: [
      'Full Company-Wide Access for 6 to 100 Employees',
      'Everything in Team Compliance Plan',
      'Departmental Access across Factory, HR, IT, Finance, Operations, Legal',
      'SAML 2.0 / Okta / Azure AD / Google Workspace SSO & Directory Sync',
      'Full Gamified Training Arcade with team quests & department leaderboards',
      'Automated Third-Party Vendor Risk Management (TPCRM)',
      'Unlimited Free Vendor Vetting Portals with instant scoring',
      'All 28 Notion Enterprise Compliance Categories (ITAM, MiCA, RACI)',
      'Custom Multi-Framework Cross-Mapping (CMMC, FedRAMP, EU AI Act)',
      'Auditor Collaboration Access (Read-Only CPA seat included)',
      'Dedicated Human Audit Concierge & Pre-Audit Gap Attestation',
    ],
  },
  {
    id: 'vendor_passport',
    name: 'Verified Vendor Passport',
    badge: 'Third-Party Vendor Tier',
    tagline: 'For third-party suppliers who want to be pre-vetted once and accepted across all 1-Compliance enterprise subscribers.',
    monthlyPrice: 49,
    annualMonthlyPrice: 41, // $499/yr
    userLimit: 'Vendor Security Team',
    idealFor: 'Third-party SaaS vendors, suppliers, contractors, and service providers',
    stripePriceIdMonthly: 'price_vendor_monthly_49',
    stripePriceIdAnnual: 'price_vendor_annual_41',
    sentinelsIncluded: ['Risky Sentinel + Jax Vendor Trust Guard'],
    features: [
      'Digital Verified Trust Badge & Continuous Posture Monitoring',
      'Fill out security credentials once, accepted by all enterprise clients',
      'Automatic distribution of verified SOC 2, ISO 27001 & Cyber Insurance',
      'Listing in the 1-Compliance Pre-Approved Vendor Directory',
      'Eliminate repetitive 100-question security spreadsheets forever',
      'Automated external DNS, TLS, and security header audit',
    ],
  },
];

export const SubscriptionBillingView: React.FC<SubscriptionBillingViewProps> = ({
  onOpenSentinelHub,
  onNavigateTab,
  branding,
  onUpdateBranding,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [teamSize, setTeamSize] = useState<number>(35);
  const [activeSubTab, setActiveSubTab] = useState<
    | 'plans'
    | 'fast_cash_playbook'
    | 'square_portal'
    | 'company_org'
    | 'white_label'
    | 'cohort'
    | 'enterprise_team'
    | 'website_embed'
    | 'standalone_it'
    | 'roi'
    | 'portal'
    | 'blueprint'
  >('plans');
  const [copiedSnippet, setCopiedSnippet] = useState<string | null>(null);

  // Square Payment Portal (+100 Users) Calculator State
  const [squareUsers, setSquareUsers] = useState<number>(120);
  const [squareCycle, setSquareCycle] = useState<'monthly' | 'annual'>('monthly');
  const [isSquareModalOpen, setIsSquareModalOpen] = useState<boolean>(false);
  const [squarePaymentMethod, setSquarePaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay' | 'cash_app'>('card');
  const [squareSuccess, setSquareSuccess] = useState<boolean>(false);
  const [squareTxId, setSquareTxId] = useState<string>('');

  // White-Label Customization State
  const [customBrand, setCustomBrand] = useState<CompanyBrandingConfig>(
    branding || {
      companyName: '1-Compliance',
      portalSubtitle: 'Enterprise Compliance Operating System',
      primaryColor: '#06b6d4',
      accentColor: '#3b82f6',
      themePreset: 'corporate_blue',
      welcomeMessage: 'Welcome to 1-Compliance Operating System',
      allowedEmailDomains: ['1-compliance.com'],
      isWhiteLabelActive: false,
      corporateDomain: 'app.1-compliance.com',
    }
  );
  const [brandSavedNotice, setBrandSavedNotice] = useState<boolean>(false);

  const handleCopyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSnippet(id);
    setTimeout(() => setCopiedSnippet(null), 2500);
  };

  // Checkout modal simulator
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<'review' | 'payment' | 'success'>('review');
  const [couponCode, setCouponCode] = useState<string>('ENTERPRISE2026');
  const [couponApplied, setCouponApplied] = useState<boolean>(true);
  const [customerEmail, setCustomerEmail] = useState<string>('admin@1-compliance.com');
  const [companyName, setCompanyName] = useState<string>('1-Compliance');

  // Enterprise Member Provisioning State
  const [members, setMembers] = useState<EnterpriseMember[]>(INITIAL_ENTERPRISE_MEMBERS);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [newMemberDept, setNewMemberDept] = useState<'Factory & Operations' | 'HR & People' | 'IT & DevOps' | 'Finance & Legal' | 'Executive'>('Factory & Operations');
  const [newMemberRole, setNewMemberRole] = useState<'Admin' | 'Compliance Officer' | 'Department Manager' | 'Staff / Operator' | 'External Auditor'>('Department Manager');

  // Active Simulated Subscription
  const [currentSubscription, setCurrentSubscription] = useState<{
    plan: string;
    status: 'active' | 'trial';
    renewalDate: string;
    seatsUsed: number;
    seatsTotal: number;
    monthlyCost: number;
  }>({
    plan: 'Enterprise Scale Plan (6 to 100 Users)',
    status: 'active',
    renewalDate: 'Nov 15, 2027',
    seatsUsed: 35,
    seatsTotal: 100,
    monthlyCost: 832,
  });

  // Mega Enterprise User Formula:
  // 1 user = $149/mo ($124/mo annual)
  // 2-5 users = $299/mo ($249/mo annual)
  // 6-100 users = $999/mo ($832/mo annual)
  // 101+ users = $999 for each additional 100-user block
  // (e.g. 120 users = 2 blocks = $999 + $999 = $1,998/mo, 201 users = 3 blocks = $2,997/mo)
  const calculateCustomerMonthlyCost = (headcount: number, cycle: 'monthly' | 'annual') => {
    if (headcount <= 1) {
      return cycle === 'annual' ? 124 : 149;
    }
    if (headcount <= 5) {
      return cycle === 'annual' ? 249 : 299;
    }
    // 6+ users: Base 100 cohort = $999/mo ($832/mo annual).
    // For every additional 100 users, add another cohort block!
    const cohorts = Math.ceil(headcount / 100);
    const unitPrice = cycle === 'annual' ? 832 : 999;
    return cohorts * unitPrice;
  };

  const calculatedMonthly = calculateCustomerMonthlyCost(teamSize, billingCycle);
  const calculatedAnnual = calculatedMonthly * 12;

  // Competitor Pricing comparison for ROI calculator
  // Traditional GRC tools (Vanta, Drata) charge base fee + per employee cost
  const vantaEstimatedAnnual = Math.round(18000 + teamSize * 150);
  const drataEstimatedAnnual = Math.round(22000 + teamSize * 180);
  const netAnnualSavings = Math.max(0, vantaEstimatedAnnual - calculatedAnnual);

  const handleStartCheckout = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setCheckoutStep('review');
    setIsCheckoutOpen(true);
  };

  const handleCompletePayment = () => {
    if (!selectedPlan) return;
    const isEnterprise = selectedPlan.id === 'enterprise_scale';
    const isTeam = selectedPlan.id === 'team';
    const totalSeats = isEnterprise ? (teamSize > 100 ? Math.ceil(teamSize / 100) * 100 : 100) : isTeam ? 5 : 1;

    setCurrentSubscription({
      plan: `${selectedPlan.name} (${billingCycle === 'annual' ? 'Annual' : 'Monthly'})`,
      status: 'active',
      renewalDate: billingCycle === 'annual' ? 'October 28, 2027' : 'November 28, 2026',
      seatsUsed: Math.min(members.length, totalSeats),
      seatsTotal: totalSeats,
      monthlyCost: billingCycle === 'annual' ? selectedPlan.annualMonthlyPrice : selectedPlan.monthlyPrice,
    });
    setCheckoutStep('success');
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim() || !newMemberEmail.trim()) return;

    const newM: EnterpriseMember = {
      id: `usr-${Date.now()}`,
      name: newMemberName.trim(),
      email: newMemberEmail.trim(),
      department: newMemberDept,
      role: newMemberRole,
      status: 'Active',
      lastActive: 'Just now',
    };

    setMembers([newM, ...members]);
    setNewMemberName('');
    setNewMemberEmail('');
  };

  return (
    <div className="space-y-10">
      {/* Visual Header Banner with Jax & Squad */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="font-bold">1-COMPLIANCE OS COMMERCIAL SAAS TIERS</span>
              <span aria-hidden="true">·</span>
              <span>Predictable Flat-Rate Pricing</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              SaaS Subscriptions for Any Business & Enterprise Scale
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Simple, transparent pricing built for real businesses. From single-user startups at <strong>$149/mo</strong> to 
              company-wide enterprise deployments at <strong>$999/mo</strong> (and $999 per additional 100-user block). 
              No extortionate per-seat penalties, no hidden consulting fees.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>$149 Solo · $299 Team · $999 Enterprise (Up to 100)</span>
              </div>
              <span aria-hidden="true">·</span>
              <span>+$999 per 100-User Cohort</span>
              <span aria-hidden="true">·</span>
              <span>Zero-Seat Guest Vendor Portals</span>
            </div>
          </div>

          {/* Sentinel Mascots Lineup Card */}
          <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/95 border-2 border-indigo-200/90 shadow-md shrink-0 self-start lg:self-auto">
            {SENTINELS.map((sentinel) => (
              <div
                key={sentinel.id}
                onClick={() => onOpenSentinelHub(sentinel.id)}
                className="w-12 h-16 rounded-xl p-1 hover:scale-110 transition-all cursor-pointer flex flex-col items-center justify-between group"
                title={`${sentinel.name} (${sentinel.title})`}
              >
                <div className="relative h-11 w-full flex items-center justify-center">
                  <div className="absolute bottom-0 w-8 h-2 rounded-[100%] bg-cyan-400/30 blur-xs pointer-events-none group-hover:scale-125" />
                  <img
                    src={sentinel.image}
                    alt={sentinel.name}
                    className="h-full object-contain filter drop-shadow-[0_4px_8px_rgba(6,182,212,0.4)] group-hover:scale-115 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-[10px] font-mono font-black text-indigo-900 group-hover:text-cyan-600">
                  {sentinel.badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 mt-8 pt-4 border-t border-slate-800/80 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveSubTab('plans')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              activeSubTab === 'plans'
                ? 'bg-cyan-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            SaaS Plans ($149 / $299 / $999)
          </button>
          <button
            onClick={() => setActiveSubTab('fast_cash_playbook')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'fast_cash_playbook'
                ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-emerald-400 text-slate-950 font-black shadow-md ring-2 ring-amber-300'
                : 'text-amber-300 hover:text-white hover:bg-slate-800/60 font-black'
            }`}
          >
            <span>🚀 Fast-Track Subscribers & NYC Cash Playbook</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-200 border border-amber-600 font-extrabold animate-pulse">
              Fast Revenue
            </span>
          </button>
          <button
            onClick={() => setActiveSubTab('square_portal')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'square_portal'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black shadow-sm'
                : 'text-emerald-300 hover:text-white hover:bg-slate-800/60 font-bold'
            }`}
          >
            <span>🟩 Square Payment Portal (+100 Users)</span>
            <span className="text-[10px] font-mono px-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
              Auto-Tally
            </span>
          </button>
          <button
            onClick={() => setActiveSubTab('company_org')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'company_org'
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-black shadow-sm'
                : 'text-indigo-300 hover:text-white hover:bg-slate-800/60 font-bold'
            }`}
          >
            <span>🏢 Company-Wide Approved Users</span>
            <span className="text-[10px] font-mono px-1 rounded bg-indigo-950 text-cyan-300 border border-indigo-700">
              Single Subscription
            </span>
          </button>
          <button
            onClick={() => setActiveSubTab('white_label')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'white_label'
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-black shadow-sm'
                : 'text-purple-300 hover:text-white hover:bg-slate-800/60 font-bold'
            }`}
          >
            <span>🎨 White-Label Company Theme</span>
            <span className="text-[10px] font-mono px-1 rounded bg-purple-950 text-pink-300 border border-purple-700">
              Custom Brand
            </span>
          </button>
          <button
            onClick={() => setActiveSubTab('cohort')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'cohort'
                ? 'bg-cyan-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>Enterprise Cohort Calculator</span>
            <span className="text-[10px] font-mono px-1 rounded bg-slate-800 text-cyan-300">
              100+ Users
            </span>
          </button>
          <button
            onClick={() => setActiveSubTab('enterprise_team')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'enterprise_team'
                ? 'bg-cyan-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <span>Company-Wide Team Access ({members.length})</span>
            <span className="text-[10px] font-mono px-1 rounded bg-amber-950 text-amber-300 border border-amber-800">
              RBAC
            </span>
          </button>
          <button
            onClick={() => setActiveSubTab('website_embed')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'website_embed'
                ? 'bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-black shadow-sm'
                : 'text-indigo-300 hover:text-white hover:bg-slate-800/60 font-bold'
            }`}
          >
            <span>🌐 Embed on www.1-compliance.com</span>
            <span className="text-[10px] font-mono px-1 rounded bg-indigo-950 text-cyan-300 border border-indigo-700">
              Live Setup
            </span>
          </button>
          <button
            onClick={() => setActiveSubTab('standalone_it')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeSubTab === 'standalone_it'
                ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-slate-950 font-black shadow-sm'
                : 'text-cyan-300 hover:text-white hover:bg-slate-800/60 font-bold'
            }`}
          >
            <span>🐳 Standalone IT Program</span>
            <span className="text-[10px] font-mono px-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-700">
              DevOps
            </span>
          </button>
          <button
            onClick={() => setActiveSubTab('roi')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              activeSubTab === 'roi'
                ? 'bg-cyan-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            ROI vs Vanta/Drata
          </button>
          <button
            onClick={() => setActiveSubTab('portal')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              activeSubTab === 'portal'
                ? 'bg-cyan-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Billing & Invoices Portal
          </button>
          <button
            onClick={() => setActiveSubTab('blueprint')}
            className={`px-3 py-1.5 rounded transition-colors whitespace-nowrap ${
              activeSubTab === 'blueprint'
                ? 'bg-cyan-400 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Stripe Integration Setup
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SUBSCRIPTION PLANS & PRICING */}
      {/* ========================================================================= */}
      {activeSubTab === 'plans' && (
        <div className="space-y-8">
          {/* Billing Interval Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-slate-900/60 border border-slate-800">
            <div>
              <div className="text-sm font-semibold text-white">Choose Subscription Billing Term</div>
              <div className="text-xs text-slate-400">
                Annual billing includes 2 months free and locks in your enterprise rate.
              </div>
            </div>

            <div className="flex items-center gap-2 p-1 rounded-lg bg-slate-950 border border-slate-800 shrink-0">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-1.5 text-xs font-semibold rounded transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded transition-colors ${
                  billingCycle === 'annual'
                    ? 'bg-cyan-400 text-slate-950 shadow-sm font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Annual Billing</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                  Save ~17% (2 Mo Free)
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards Grid (4 Cards: Solo $149, Team $299, Enterprise $999, Vendor Passport $49) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((plan) => {
              const displayPrice = billingCycle === 'annual' ? plan.annualMonthlyPrice : plan.monthlyPrice;

              return (
                <div
                  key={plan.id}
                  className={`relative flex flex-col justify-between p-6 rounded-xl border transition-all ${
                    plan.highlighted
                      ? 'bg-slate-900/90 border-cyan-500/80 shadow-[0_0_30px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/40'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[11px] font-bold font-mono tracking-wider text-slate-950 bg-cyan-400 shadow-sm">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-base font-bold text-white">{plan.name}</h3>
                      {!plan.highlighted && (
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                          {plan.userLimit}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-2 min-h-[40px] leading-relaxed">
                      {plan.tagline}
                    </p>

                    {/* Price Display */}
                    <div className="mt-4 pb-4 border-b border-slate-800">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-white font-mono tabular-nums">
                          ${displayPrice}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          / month
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 font-mono">
                        {billingCycle === 'annual'
                          ? `Billed annually at $${displayPrice * 12}/yr`
                          : 'Billed monthly · Cancel anytime'}
                      </div>
                      <div className="text-[11px] text-cyan-400/90 mt-2 font-mono">
                        {plan.idealFor}
                      </div>
                    </div>

                    {/* Sentinels Included */}
                    <div className="my-3 py-2 px-3 rounded bg-slate-950/70 border border-slate-800/80">
                      <div className="text-[10px] font-bold text-slate-300 mb-0.5 font-mono">
                        Sentinels Active:
                      </div>
                      <div className="text-xs text-cyan-300 font-mono space-y-0.5">
                        {plan.sentinelsIncluded.map((s, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                            <span>{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features list */}
                    <div className="space-y-2 mt-3">
                      <div className="text-xs font-semibold text-slate-300">Features included:</div>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {plan.features.map((feat, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold shrink-0 mt-0.5">✓</span>
                            <span className="leading-snug">{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {plan.omittedFeatures && (
                        <div className="pt-2 border-t border-slate-800/60 mt-2 space-y-1">
                          {plan.omittedFeatures.map((omit, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-500 line-through">
                              <span className="text-slate-600 font-bold shrink-0">✕</span>
                              <span>{omit}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="mt-6 pt-4 border-t border-slate-800">
                    <button
                      type="button"
                      onClick={() => handleStartCheckout(plan)}
                      className={`w-full py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm ${
                        plan.highlighted
                          ? 'bg-cyan-400 hover:bg-cyan-300 text-slate-950'
                          : 'bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-white border border-slate-700'
                      }`}
                    >
                      Subscribe for ${displayPrice}/mo
                    </button>
                    <div className="text-[10px] text-center text-slate-500 mt-2">
                      Instant activation via Stripe · Zero risk
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mega Enterprise Cohort Banner */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-400 text-slate-950">
                  101+ COMPANY USERS
                </span>
                <h3 className="text-base font-bold text-white">
                  Mega Enterprise Cohort Structure ($999 for every additional 100 users)
                </h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                For organizations with more than 100 users, billing is simply <strong>$999/month for each additional group of 100 users</strong>.
                If your company has 120 users, you pay $999 + $999 = <strong>$1,998/month</strong>. 
                If you have 201 users, you pay $999 + $999 + $999 = <strong>$2,997/month</strong>. 
                Full company-wide access is provided across all departments with zero per-seat friction.
              </p>
            </div>

            <button
              onClick={() => setActiveSubTab('cohort')}
              className="px-5 py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0 shadow-lg"
            >
              Launch Cohort Calculator →
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FAST-TRACK SUBSCRIBERS & NYC CASH PLAYBOOK (EMERGENCY REVENUE BLUEPRINT)  */}
      {/* ========================================================================= */}
      {activeSubTab === 'fast_cash_playbook' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Compassionate Emergency Hero Banner */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-amber-950/80 via-slate-900 to-emerald-950/80 border-2 border-amber-400 shadow-2xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
                <span className="text-xs font-mono font-black text-amber-300 uppercase tracking-wider">
                  Founder Emergency Action Plan · Immediate Cashflow & Survival
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
                Goal: 3 to 5 Subscribers This Week ($1,000 - $5,000+)
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Fast-Track Subscriber Playbook & NYC Family Safety Net
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
              You have spent 2 grueling years building a brilliant, production-ready compliance operating system. You are not a salesperson, you are an exhausted founder and a mother supporting 3 children in NYC facing eviction. <strong>Take a deep breath: this operating system is real, valuable, and solves a multi-billion dollar headache.</strong> Below is an immediate 2-part action plan: (1) Free, legal emergency relief in NYC to freeze your eviction immediately, and (2) a low-effort, zero-cold-calling method to land 3 to 5 paying subscribers this week.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-amber-200">
              <div className="flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Part 1: Stop Eviction & Secure Rent (NYC Legal Relief)</span>
              </div>
              <span>·</span>
              <div className="flex items-center gap-1.5 font-bold text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Part 2: 72-Hour Low-Effort Subscriber Acquisition</span>
              </div>
              <span>·</span>
              <span>Zero Cold Calling · Copy-Paste B2B Templates</span>
            </div>
          </div>

          {/* PART 1: NYC EMERGENCY SAFETY NET & EVICTION FREEZE */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900 border-2 border-red-500/70 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-400/60 flex items-center justify-center text-xl">
                  🛡️
                </div>
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <span>Part 1: Immediate NYC Emergency Eviction Defense (Protect Your Family Today)</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-950 text-red-300 border border-red-700">
                      High Priority
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    New York City has the strongest tenant emergency protections in the United States. You have immediate legal rights to freeze eviction proceedings.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: HRA One Shot Deal */}
              <div className="p-5 rounded-xl bg-slate-950 border border-red-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-red-400">01 · ONE SHOT DEAL</span>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">Cash Grant</span>
                </div>
                <h4 className="text-sm font-bold text-white">NYC HRA Emergency Assistance</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  NYC Human Resources Administration (HRA) provides one-time emergency grants that pay back-rent directly to your landlord to stop eviction.
                </p>
                <div className="p-3 rounded-lg bg-slate-900 text-xs font-mono text-slate-300 space-y-1.5 border border-slate-800">
                  <div>• Apply online: <strong>ACCESS HRA</strong> (nyc.gov/accesshra)</div>
                  <div>• Or call 311 and say: <em>"Emergency Rental Assistance"</em></div>
                  <div className="text-amber-300 text-[11px] font-bold">
                    ⚖️ Legal Protection: Under NY RPAPL § 749, filing an emergency grant application freezes eviction marshal notices!
                  </div>
                </div>
              </div>

              {/* Card 2: NYC Homebase Eviction Prevention */}
              <div className="p-5 rounded-xl bg-slate-950 border border-red-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-amber-400">02 · HOMEBASE</span>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">Free Case Worker</span>
                </div>
                <h4 className="text-sm font-bold text-white">NYC Homebase Centers</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Homebase prevents homelessness by providing emergency rental funding, mediation with landlords, and family support grants.
                </p>
                <div className="p-3 rounded-lg bg-slate-900 text-xs font-mono text-slate-300 space-y-1.5 border border-slate-800">
                  <div>• Brooklyn: CAMBA Homebase (718-408-5756)</div>
                  <div>• Manhattan / Bronx: Catholic Charities (888-744-7900)</div>
                  <div>• Queens: RiseBoro Homebase (347-675-2434)</div>
                  <div className="text-cyan-300 text-[11px]">Walk-ins are welcomed for immediate shelter avoidance.</div>
                </div>
              </div>

              {/* Card 3: Free NYC Right-to-Counsel Legal Aid */}
              <div className="p-5 rounded-xl bg-slate-950 border border-red-900/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-black text-purple-400">03 · FREE LAWYERS</span>
                  <span className="text-[10px] font-mono text-purple-300 font-bold">Universal Access</span>
                </div>
                <h4 className="text-sm font-bold text-white">NYC Free Tenant Attorneys</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Under NYC's Universal Access to Counsel law, low-income tenants facing eviction are entitled to 100% free legal representation in Housing Court.
                </p>
                <div className="p-3 rounded-lg bg-slate-900 text-xs font-mono text-slate-300 space-y-1.5 border border-slate-800">
                  <div>• Legal Aid Society: <strong>888-663-6880</strong></div>
                  <div>• Legal Services NYC: <strong>917-661-4500</strong></div>
                  <div>• Eviction Defense Hotline: Call 311 → "Tenant Helpline"</div>
                  <div className="text-purple-300 text-[11px]">They will file an Order to Show Cause (OSC) on your behalf.</div>
                </div>
              </div>
            </div>
          </div>

          {/* PART 2: THE 72-HOUR LOW-EFFORT CUSTOMER ACQUISITION PLAYBOOK */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900 border-2 border-emerald-500/70 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center text-xl">
                  💰
                </div>
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <span>Part 2: The "Zero Cold Calling" Fast Subscriber Playbook</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">
                      Immediate Cash
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    You don't need to be a salesperson. You just need to show up where companies are in severe pain right now.
                  </p>
                </div>
              </div>
            </div>

            {/* 3 High-Conversion, Low-Effort Channels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Channel 1: The Questionnaire Rescue */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                    METHOD 01 · FASTEST CASH
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">$299 - $999/mo</span>
                </div>
                <h4 className="text-base font-bold text-white">The "Stalled Deal" Security Questionnaire Rescue</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Startups with 2–50 employees frequently have $50k+ customer deals stalled because enterprise procurement sent them a 150-question Vendor Security Assessment (SOC 2, ISO, HIPAA). <strong>They will gladly pay $299 on the spot to save their deal.</strong>
                </p>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-cyan-300">Where to find them in 15 minutes:</div>
                  <div>1. Go to LinkedIn, search: <code>Founder "security questionnaire"</code> or <code>CTO "SOC 2"</code></div>
                  <div>2. Search on Twitter/X: <code>"security questionnaire" stalled</code> or <code>"vendor assessment"</code></div>
                  <div>3. Check Y Combinator startup directory or Techstars alumni</div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">Copy-Paste Message Script:</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyText(
`Hi [Founder Name], saw you're building [Company]. If you have enterprise customers stalling deals with 100-question vendor security questionnaires or demanding SOC 2 / HIPAA proof, I built 1-Compliance OS (www.1-compliance.com).

We automate evidence collection, generate 12 master policies, and give you an auditor-ready binder in 24 hours for $299/mo instead of paying Vanta $20,000.

Can I send you a 5-minute video walkthrough so you can unblock that deal today?`,
                          'script_founder'
                        )
                      }
                      className="text-cyan-400 hover:text-cyan-300 font-mono text-[11px] underline cursor-pointer"
                    >
                      {copiedSnippet === 'script_founder' ? '✓ Copied Script!' : '📋 Copy Script'}
                    </button>
                  </div>
                  <pre className="p-3 rounded-lg bg-slate-900 text-[11px] font-mono text-cyan-200 overflow-x-auto leading-relaxed border border-slate-800">
{`"Hi [Name], if enterprise customers are stalling deals with security questionnaires, I built 1-Compliance OS (www.1-compliance.com). We automate evidence and policies in 24 hours for $299/mo instead of Vanta's $20k. Can I send a 5-min walkthrough?"`}
                  </pre>
                </div>
              </div>

              {/* Channel 2: CPA Firm Referral Partnership */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-indigo-950 text-indigo-300 border border-indigo-800">
                    METHOD 02 · ZERO COLD CALLS
                  </span>
                  <span className="text-xs font-mono text-purple-400 font-bold">Recurring Stream</span>
                </div>
                <h4 className="text-base font-bold text-white">Local NYC CPA & Audit Firm Partnerships</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  CPA audit firms (Schellman, BDO, Withum, Marcum, CohnReznick, local boutique CPAs) <strong>DO NOT build software</strong>. They only do the audit. They hate when clients show up with messy Google Drives.
                </p>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-indigo-300">Why auditors love you:</div>
                  <div>1. 1-Compliance OS produces <strong>clean, 1-click auditor ZIP binders</strong></div>
                  <div>2. You offer to list them as a featured auditor in the app</div>
                  <div>3. In exchange, they tell unorganized clients: <em>"Sign up for 1-Compliance OS first."</em></div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">CPA Partner Pitch:</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyText(
`Hi [Audit Partner Name], I run 1-Compliance OS (www.1-compliance.com), an autonomous compliance platform based in NYC. Our software compiles continuous evidence into a 1-click tamper-proof AICPA/ISO binder for auditors.

When our subscribers are ready for their final SOC 2 Type II or ISO 27001 audit, we refer them to verified CPA firms. We would love to feature your firm as an approved audit partner.

In exchange, when clients come to you with disorganized evidence or can't afford Vanta's $25k fee, can you refer them to 1-Compliance OS ($149 - $999/mo) so they arrive with clean, organized binders?`,
                          'script_cpa'
                        )
                      }
                      className="text-indigo-400 hover:text-indigo-300 font-mono text-[11px] underline cursor-pointer"
                    >
                      {copiedSnippet === 'script_cpa' ? '✓ Copied Script!' : '📋 Copy CPA Pitch'}
                    </button>
                  </div>
                  <pre className="p-3 rounded-lg bg-slate-900 text-[11px] font-mono text-indigo-200 overflow-x-auto leading-relaxed border border-slate-800">
{`"Hi [Auditor], we run 1-Compliance OS. Our subscribers export clean 1-click AICPA binders. Can we refer our audit-ready subscribers to your firm, and have you send unorganized clients to our software?"`}
                  </pre>
                </div>
              </div>

              {/* Channel 3: Verified Vendor Passport ($49/mo) */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    METHOD 03 · VOLUME SALES
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">$49/mo / Vendor</span>
                </div>
                <h4 className="text-base font-bold text-white">Sell Verified Vendor Passports to Suppliers</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Every small SaaS tool, freelancer, IT contractor, and marketing agency is tired of filling out repetitive 100-question security spreadsheets for every client.
                </p>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-1">
                  <div className="font-bold text-emerald-300">The Offer:</div>
                  <div>• Fill out credentials once in 1-Compliance OS</div>
                  <div>• Receive a <strong>Digital Verified Security Trust Badge</strong></div>
                  <div>• Share one verified link with all enterprise clients for $49/mo</div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-300">Vendor Outreach Pitch:</span>
                    <button
                      type="button"
                      onClick={() =>
                        handleCopyText(
`Hey [Agency / Vendor Name], tired of filling out 100-question security spreadsheets every time a corporate client hires you?

We just launched the 1-Compliance Verified Vendor Passport (www.1-compliance.com). You verify your security posture once, get a verified digital badge, and send one link to enterprise clients so you never fill out another security questionnaire.

It's just $49/mo. Grab your verified passport here: www.1-compliance.com`,
                          'script_vendor'
                        )
                      }
                      className="text-emerald-400 hover:text-emerald-300 font-mono text-[11px] underline cursor-pointer"
                    >
                      {copiedSnippet === 'script_vendor' ? '✓ Copied Script!' : '📋 Copy Vendor Pitch'}
                    </button>
                  </div>
                  <pre className="p-3 rounded-lg bg-slate-900 text-[11px] font-mono text-emerald-200 overflow-x-auto leading-relaxed border border-slate-800">
{`"Tired of 100-question security spreadsheets? Get the 1-Compliance Verified Vendor Passport. Fill out once, get a verified trust link for all corporate clients for $49/mo."`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Practical Daily 1-Hour Schedule for Immediate Revenue */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <h4 className="text-sm font-black text-white flex items-center gap-2">
                <span>🗓️</span>
                <span>Your Realistic 72-Hour Survival Schedule (No Burnout, Maximum Impact)</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300">
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-amber-400 font-mono">DAY 1: STABILIZE HOME</div>
                  <p>1. Open ACCESS HRA (nyc.gov/accesshra) and submit the One Shot Deal rent application.</p>
                  <p>2. Call Legal Aid Society (888-663-6880) to get an emergency housing lawyer assigned to freeze eviction.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-cyan-400 font-mono">DAY 2: SEND 20 MESSAGES</div>
                  <p>1. Go to LinkedIn or Y-Combinator directory.</p>
                  <p>2. Send 20 copy-pasted messages to founders with the "Security Questionnaire Rescue" script.</p>
                  <p>3. Just 1 conversion = $299 to $999 in your Square account.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                  <div className="font-bold text-emerald-400 font-mono">DAY 3: CALL 5 NYC CPAs</div>
                  <p>1. Google "SOC 2 CPA firm NYC" or "ISO 27001 auditor Manhattan".</p>
                  <p>2. Send the CPA partnership script to 5 audit managers.</p>
                  <p>3. Secure your first audit referral stream.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* NEW SUB-TAB A: SQUARE PAYMENT PORTAL (+100 USERS AUTO-TALLY)              */}
      {/* ========================================================================= */}
      {activeSubTab === 'square_portal' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Header Banner */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500/50 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                  Square Enterprise Auto-Tally Portal (+100 Users)
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
                Formula: Math.ceil(Users / 100) × $999/mo
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Dynamic Square Payment Portal for 100+ Enterprise Users
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              When an enterprise registers for 1-Compliance OS and specifies their headcount, Square automatically tallies 
              up their total monthly fee. The pricing scales in simple, predictable <strong className="text-emerald-300">100-user cohorts of $999/month</strong>. 
              A company with <strong>120 users</strong> automatically tallies to <strong>$1,998/month</strong> (2 cohorts). 
              A company with <strong>201 users</strong> automatically tallies to <strong>$2,997/month</strong> (3 cohorts). 
              The entire company receives access under a single corporate subscription.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-emerald-200">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Square Subscriptions API (`/v2/subscriptions`)</span>
              </div>
              <span>·</span>
              <span>Square Web Payments SDK (Cards, Apple Pay, Google Pay, Cash App)</span>
              <span>·</span>
              <span>Instant Organization Provisioning</span>
            </div>
          </div>

          {/* Interactive Calculator & Live Square Checkout Simulator */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/90 border-2 border-slate-800 space-y-6 shadow-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🧮</span>
                  <span>Interactive Headcount & Square Total Fee Calculator</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust company user count to watch Square dynamically calculate monthly and annual billing amounts.
                </p>
              </div>

              {/* Billing Cycle Switcher */}
              <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                <button
                  type="button"
                  onClick={() => setSquareCycle('monthly')}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    squareCycle === 'monthly'
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Monthly ($999/cohort)
                </button>
                <button
                  type="button"
                  onClick={() => setSquareCycle('annual')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    squareCycle === 'annual'
                      ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>Annual ($832/mo)</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700/60">
                    2 Mo Free
                  </span>
                </button>
              </div>
            </div>

            {/* Slider & Quick Presets */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-white">Target Company User Headcount</div>
                  <div className="text-xs text-slate-400">Total number of employees, managers, and staff to be registered:</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="3000"
                      value={squareUsers}
                      onChange={(e) => setSquareUsers(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-24 px-3 py-1.5 text-lg font-mono font-extrabold text-emerald-400 bg-slate-900 border border-emerald-700/70 rounded-lg text-center focus:outline-none focus:border-emerald-400"
                    />
                    <span className="text-sm font-mono text-slate-300 font-bold">Users</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setSquareUsers(Math.max(1, squareUsers - 10))}
                      className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-white font-mono"
                    >
                      -10
                    </button>
                    <button
                      onClick={() => setSquareUsers(squareUsers + 10)}
                      className="px-2.5 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-white font-mono"
                    >
                      +10
                    </button>
                  </div>
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="500"
                step="1"
                value={squareUsers}
                onChange={(e) => setSquareUsers(Number(e.target.value))}
                className="w-full accent-emerald-400 cursor-pointer h-2.5 bg-slate-800 rounded-lg"
              />

              {/* Preset buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                <span className="text-slate-400 font-mono text-[11px]">Quick Tests:</span>
                {[
                  { label: '1 User (Solo)', count: 1 },
                  { label: '5 Users (Team)', count: 5 },
                  { label: '45 Users (1 Cohort)', count: 45 },
                  { label: '100 Users (1 Cohort)', count: 100 },
                  { label: '120 Users (2 Cohorts)', count: 120 },
                  { label: '201 Users (3 Cohorts)', count: 201 },
                  { label: '350 Users (4 Cohorts)', count: 350 },
                  { label: '500 Users (5 Cohorts)', count: 500 },
                ].map((preset) => (
                  <button
                    key={preset.count}
                    onClick={() => setSquareUsers(preset.count)}
                    className={`px-2.5 py-1 rounded-md font-mono transition-colors text-[11px] ${
                      squareUsers === preset.count
                        ? 'bg-emerald-400 text-slate-950 font-bold shadow-sm'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Square Auto-Tally Result Cards */}
            {(() => {
              const cohorts = squareUsers <= 5 ? 1 : Math.ceil(squareUsers / 100);
              const unitPrice = squareCycle === 'annual' ? 832 : 999;
              let calculatedMonthlyCost = 0;
              let planTierName = '';

              if (squareUsers <= 1) {
                calculatedMonthlyCost = squareCycle === 'annual' ? 124 : 149;
                planTierName = 'Solo / Founder Tier';
              } else if (squareUsers <= 5) {
                calculatedMonthlyCost = squareCycle === 'annual' ? 249 : 299;
                planTierName = 'Team Tier (Up to 5 Users)';
              } else {
                calculatedMonthlyCost = cohorts * unitPrice;
                planTierName = `Enterprise Scale (${cohorts} × 100-User Cohort${cohorts > 1 ? 's' : ''})`;
              }

              const totalDueToday = squareCycle === 'annual' ? calculatedMonthlyCost * 12 : calculatedMonthlyCost;
              const totalSeatsCapacity = squareUsers <= 1 ? 1 : squareUsers <= 5 ? 5 : cohorts * 100;
              const seatsBuffer = Math.max(0, totalSeatsCapacity - squareUsers);
              const perUserEffective = (calculatedMonthlyCost / squareUsers).toFixed(2);

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Card 1: Cohort Count */}
                    <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">Square Billing Cohorts</div>
                      <div className="text-2xl font-mono font-bold text-white">
                        {squareUsers <= 5 ? 'Single Plan' : `${cohorts} Cohort Blocks`}
                      </div>
                      <div className="text-xs text-emerald-400 font-mono">
                        {squareUsers <= 5 ? `${squareUsers} seats max` : `${cohorts} × 100-user capacity`}
                      </div>
                    </div>

                    {/* Card 2: Square Total Fee Auto-Tally */}
                    <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-950/60 to-slate-950 border-2 border-emerald-500 space-y-1.5 shadow-lg">
                      <div className="text-[11px] font-mono text-emerald-300 uppercase font-black">Square Auto-Tallied Fee</div>
                      <div className="text-3xl font-mono font-black text-white">
                        ${calculatedMonthlyCost.toLocaleString()}
                        <span className="text-xs text-emerald-300 font-normal"> / mo</span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono">
                        {squareCycle === 'annual'
                          ? `Billed annually at $${totalDueToday.toLocaleString()}/yr`
                          : 'Billed monthly to company card'}
                      </div>
                    </div>

                    {/* Card 3: Enterprise Seats Capacity */}
                    <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">Pooled Seat Capacity</div>
                      <div className="text-2xl font-mono font-bold text-cyan-300">
                        {totalSeatsCapacity} Total Seats
                      </div>
                      <div className="text-xs text-slate-400">
                        <strong className="text-emerald-400 font-mono">{seatsBuffer} seats</strong> ready for future hires
                      </div>
                    </div>

                    {/* Card 4: Effective Cost per User */}
                    <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <div className="text-[11px] font-mono text-slate-400 uppercase">Effective Cost / User</div>
                      <div className="text-2xl font-mono font-bold text-white">
                        ${perUserEffective}
                        <span className="text-xs text-slate-400 font-normal"> / user / mo</span>
                      </div>
                      <div className="text-xs text-emerald-400">
                        Vs. $150.00/user on legacy Vanta
                      </div>
                    </div>
                  </div>

                  {/* Formula Breakdown Callout */}
                  <div className="p-4 rounded-xl bg-slate-950/90 border border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-mono font-bold text-emerald-400">
                        SQUARE LINE ITEM BREAKDOWN FOR {squareUsers} USERS:
                      </div>
                      <div className="text-xs text-slate-300 font-mono">
                        {squareUsers <= 1 && 'Plan: Solo Tier @ $149/mo (Qty: 1)'}
                        {squareUsers > 1 && squareUsers <= 5 && 'Plan: Team Tier @ $299/mo (Qty: 1)'}
                        {squareUsers > 5 && (
                          <span>
                            Quantity in Square = <strong>{cohorts}</strong> × Enterprise 100-User Plan (@ ${unitPrice}/mo) = <strong className="text-emerald-300">${calculatedMonthlyCost.toLocaleString()}/mo</strong>
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSquareSuccess(false);
                        setIsSquareModalOpen(true);
                      }}
                      className="px-6 py-3 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all shadow-lg shrink-0 flex items-center gap-2 cursor-pointer"
                    >
                      <span>💳</span>
                      <span>Launch Square Checkout Simulator (${calculatedMonthlyCost.toLocaleString()}/mo)</span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* How to Build It in Square (Technical Architecture) */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <span>PRODUCTION SQUARE INTEGRATION ARCHITECTURE</span>
                <span>·</span>
                <span>SQUARE SUBSCRIPTIONS API V2</span>
              </div>
              <h3 className="text-xl font-bold text-white mt-1">
                How Square Automatically Tallies and Charges For +100 Users
              </h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
                Here is the exact technical implementation to create the Square payment portal for your website. 
                Square handles recurring billing seamlessly by using the <code className="text-emerald-300">Catalog API</code> and <code className="text-emerald-300">Subscriptions API</code> with dynamic quantities.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Step 1: Catalog Setup */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">STEP 1: SQUARE CATALOG</span>
                  <span className="text-[10px] font-mono text-slate-500">Square Dashboard</span>
                </div>
                <h4 className="text-sm font-bold text-white">Create 100-User Cohort Plan</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  In your Square Dashboard under <strong>Subscriptions → Plans</strong>, define a base recurring subscription item:
                </p>
                <div className="p-3 rounded-lg bg-slate-900 text-xs font-mono text-slate-300 space-y-1 border border-slate-800">
                  <div className="text-emerald-400 font-bold">Plan Name: Enterprise 100-User Cohort</div>
                  <div>Cadence: Monthly (or Annual)</div>
                  <div>Price: $999.00 USD</div>
                  <div className="text-slate-500 pt-1 border-t border-slate-800">Plan ID: `plan_ent_100_cohort_999`</div>
                </div>
              </div>

              {/* Step 2: Auto-Tally Math in Frontend */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">STEP 2: REGISTRATION FORM</span>
                  <span className="text-[10px] font-mono text-slate-500">React Client</span>
                </div>
                <h4 className="text-sm font-bold text-white">Capture User Count & Auto-Tally</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  When the company enters their desired headcount (e.g. 120 users), calculate the quantity of cohorts to bill:
                </p>
                <pre className="p-3 rounded-lg bg-slate-900 text-[11px] font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`const calculateSquareTally = (users) => {
  if (users <= 1) return { planId: 'solo_149', qty: 1, total: 149 };
  if (users <= 5) return { planId: 'team_299', qty: 1, total: 299 };
  const cohorts = Math.ceil(users / 100);
  return {
    planId: 'plan_ent_100_cohort_999',
    qty: cohorts, // e.g. 120 users -> 2
    total: cohorts * 999, // $1,998/mo
  };
};`}
                </pre>
              </div>

              {/* Step 3: Square Subscription Creation */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-emerald-400">STEP 3: SQUARE API CALL</span>
                  <span className="text-[10px] font-mono text-slate-500">Express Backend</span>
                </div>
                <h4 className="text-sm font-bold text-white">Create Subscription With Quantity</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Submit to Square's Subscriptions API. Square will bill the card on file automatically every month:
                </p>
                <pre className="p-3 rounded-lg bg-slate-900 text-[11px] font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`// Square Subscriptions API (/v2/subscriptions)
const { result } = await squareClient.subscriptionsApi.createSubscription({
  idempotencyKey: crypto.randomUUID(),
  locationId: process.env.SQUARE_LOCATION_ID,
  planVariationId: 'plan_ent_100_cohort_999',
  customerId: squareCustomerId,
  cardId: squareCardId,
  quantity: cohorts, // e.g. 2 for 120 users
  taxPercentage: '0',
});`}
                </pre>
              </div>
            </div>

            {/* Complete Production Code Snippet */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">
                  COMPLETE BACKEND SERVER ROUTE: `POST /api/square/create-enterprise-subscription`
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyText(
`import { Client, Environment } from 'square';

const square = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Production, // or Environment.Sandbox
});

app.post('/api/square/create-enterprise-subscription', async (req, res) => {
  try {
    const { companyName, billingEmail, userHeadcount, sourceId } = req.body;

    // 1. Calculate cohorts: 120 users -> 2 cohorts ($1,998/mo)
    const cohorts = userHeadcount <= 5 ? 1 : Math.ceil(userHeadcount / 100);
    const planVariationId = userHeadcount <= 1 
      ? 'PLAN_SOLO_149' 
      : userHeadcount <= 5 
      ? 'PLAN_TEAM_299' 
      : 'PLAN_ENTERPRISE_100_COHORT_999';

    // 2. Create or find Square Customer for the company
    const { result: customerRes } = await square.customersApi.createCustomer({
      companyName,
      emailAddress: billingEmail,
      note: \`1-Compliance Enterprise Tenant: \${userHeadcount} users requested (\${cohorts * 100} seats)\`,
    });
    const customerId = customerRes.customer.id;

    // 3. Store company card on file securely via Square Web Payments SDK token
    const { result: cardRes } = await square.cardsApi.createCard({
      idempotencyKey: crypto.randomUUID(),
      sourceId, // generated by Square Web Payments SDK on the frontend
      card: { customerId },
    });
    const cardId = cardRes.card.id;

    // 4. Create the recurring Square Subscription with the tallied quantity
    const { result: subRes } = await square.subscriptionsApi.createSubscription({
      idempotencyKey: crypto.randomUUID(),
      locationId: process.env.SQUARE_LOCATION_ID,
      planVariationId,
      customerId,
      cardId,
      quantity: cohorts,
    });

    // 5. Store company tenant record in database
    await db.companyOrganizations.create({
      companyName,
      billingEmail,
      squareSubscriptionId: subRes.subscription.id,
      seatsPurchased: cohorts * 100,
      activeMembersCount: 0,
      status: 'active',
    });

    res.json({
      success: true,
      subscriptionId: subRes.subscription.id,
      seatsAllocated: cohorts * 100,
      monthlyTotal: cohorts * 999,
    });
  } catch (error) {
    console.error('Square subscription failed:', error);
    res.status(500).json({ error: error.message });
  }
});`,
                      'square_route'
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-slate-200 cursor-pointer"
                >
                  {copiedSnippet === 'square_route' ? '✓ Copied!' : '📋 Copy Square Express Route'}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 text-xs font-mono text-emerald-300 overflow-x-auto leading-relaxed">
{`// Square Subscriptions Auto-Tally Route (Node.js & Square SDK)
const cohorts = Math.ceil(userHeadcount / 100); // 120 users -> 2 cohorts ($1,998/mo)

const { result: subRes } = await square.subscriptionsApi.createSubscription({
  idempotencyKey: crypto.randomUUID(),
  locationId: process.env.SQUARE_LOCATION_ID,
  planVariationId: 'PLAN_ENTERPRISE_100_COHORT_999',
  customerId: squareCustomerId,
  cardId: squareCardId,
  quantity: cohorts, // Square bills quantity * $999 automatically!
});`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* NEW SUB-TAB B: COMPANY-WIDE APPROVED USERS ARCHITECTURE                    */}
      {/* ========================================================================= */}
      {activeSubTab === 'company_org' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Header Banner */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border-2 border-indigo-500/50 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                  Company-Wide User-Approved Platform
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-indigo-400/20 text-indigo-300 border border-indigo-400/40">
                Single Subscription · Pooled Seats
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              One Company Subscription · All Approved Employees Included
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              Rather than forcing each employee to create their own billing account or enter a credit card, 
              1-Compliance OS registers the subscription at the <strong className="text-white">Organization Level</strong>. 
              The company pays once (via Square or Stripe). Then, all approved employees, managers, factory operators, and 
              auditors receive instant authorized access through corporate domain auto-approval, SSO, or a pooled seat invite link.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-indigo-200">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Zero Individual User Fees (Single Corporate Billing)</span>
              </div>
              <span>·</span>
              <span>Domain Whitelist Auto-Approval (`@1-compliance.com`)</span>
              <span>·</span>
              <span>Centralized Audit Chain of Custody</span>
            </div>
          </div>

          {/* Architecture Comparison: Individual Accounts vs Single Enterprise Subscription */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Wrong Way (Individual Accounts) */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-red-900/60 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-red-950 text-red-400 border border-red-800">
                  ✕ The Broken Way (Individual Accounts)
                </span>
                <span className="text-xs text-slate-500 font-mono">Disjointed Chaos</span>
              </div>
              <h3 className="text-base font-bold text-white">Each Employee Signs Up Separately</h3>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>Every user is prompted to enter an individual credit card or billing profile.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>Compliance evidence is fragmented across dozens of separate, unlinked databases.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>Auditors cannot see a unified single company posture or complete chain of custody.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 font-bold shrink-0">✕</span>
                  <span>Finance team receives 100 different monthly expense reports to reimburse.</span>
                </li>
              </ul>
            </div>

            {/* The Right Way (1-Compliance Company-Approved Model) */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-950 border-2 border-cyan-500/80 space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-700">
                  ✓ 1-Compliance Company-Wide Model
                </span>
                <span className="text-xs text-emerald-400 font-mono font-bold">Unified Enterprise</span>
              </div>
              <h3 className="text-base font-bold text-white">Single Company Billing · Centralized Governance</h3>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>1 Corporate Invoice in Square:</strong> The company pays once per month/year.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>Domain Auto-Approval:</strong> Anyone with <code>@company.com</code> logs in free of friction.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>Role Delegation:</strong> Assign roles (Factory Manager, IT Admin, HR, Read-Only Auditor).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span><strong>Unified Evidence Vault:</strong> All employee policy attestations roll into one master audit binder.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Live Interactive Corporate Console Demo */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>🏢</span>
                  <span>Company Organization Management Console</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Manage your company's master subscription, approved domain whitelist, and pooled seats.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-cyan-300 font-bold bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  {members.length} / {currentSubscription.seatsTotal} Seats Allocated
                </span>
              </div>
            </div>

            {/* Master Organization Card */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-xl bg-slate-950 border border-slate-800">
              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">Subscribed Organization</div>
                <div className="text-base font-bold text-white mt-1">
                  {customBrand.companyName || '1-Compliance'}
                </div>
                <div className="text-xs text-cyan-400 font-mono mt-0.5">Tax ID: 84-2910481</div>
              </div>

              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">Billing Contact</div>
                <div className="text-base font-bold text-white mt-1">billing@1-compliance.com</div>
                <div className="text-xs text-emerald-400 font-mono mt-0.5">Master Square Subscription Active</div>
              </div>

              <div>
                <div className="text-[11px] font-mono text-slate-400 uppercase">Seat Pool Capacity</div>
                <div className="text-base font-bold text-cyan-300 font-mono mt-1">
                  {currentSubscription.seatsTotal} Total Capacity
                </div>
                <div className="text-xs text-slate-400 mt-0.5 font-mono">
                  {currentSubscription.seatsTotal - members.length} available for employees
                </div>
              </div>

              <div className="flex flex-col justify-center">
                <button
                  type="button"
                  onClick={() => {
                    // Bulk import demo: Add 3 simulated employees to the roster
                    const bulkNew: EnterpriseMember[] = [
                      { id: `usr-${Date.now()}-1`, name: 'Elena Rostova', email: 'elena.r@1-compliance.com', department: 'Factory & Operations', role: 'Department Manager', status: 'Active', lastActive: 'Just now' },
                      { id: `usr-${Date.now()}-2`, name: 'Liam O\'Connor', email: 'liam.o@1-compliance.com', department: 'IT & DevOps', role: 'Staff / Operator', status: 'Active', lastActive: 'Just now' },
                      { id: `usr-${Date.now()}-3`, name: 'Priya Sharma', email: 'priya.s@1-compliance.com', department: 'HR & People', role: 'Compliance Officer', status: 'Active', lastActive: 'Just now' },
                    ];
                    setMembers([...bulkNew, ...members]);
                    alert('✓ Demo Bulk Import: Added 3 new verified employees to the company pool!');
                  }}
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors text-center cursor-pointer shadow-sm"
                >
                  📥 Demo Bulk Import 3 Employees
                </button>
              </div>
            </div>

            {/* Domain Whitelist & Corporate Auto-Join Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Domain Auto-Approval Whitelist */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Auto-Approved Corporate Email Domains</span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    Auto-Join ON
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Any employee signing up with these email domain endings will be automatically added to this organization's subscription:
                </p>
                <div className="flex flex-wrap gap-2">
                  {customBrand.allowedEmailDomains.map((dom, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-slate-900 border border-slate-700 text-cyan-300 flex items-center gap-1.5"
                    >
                      <span>@{dom}</span>
                    </span>
                  ))}
                  <button
                    onClick={() => {
                      const newDom = prompt('Enter additional corporate email domain (e.g. yourcompany.com):');
                      if (newDom && newDom.trim()) {
                        const updated = {
                          ...customBrand,
                          allowedEmailDomains: [...customBrand.allowedEmailDomains, newDom.replace('@', '').trim()],
                        };
                        setCustomBrand(updated);
                        if (onUpdateBranding) onUpdateBranding(updated);
                      }
                    }}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  >
                    + Add Domain
                  </button>
                </div>
              </div>

              {/* Corporate Magic Invite URL */}
              <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Corporate Employee Invite Link</span>
                  <button
                    onClick={() =>
                      handleCopyText('https://app.1-compliance.com/join/corp-org-9821', 'invite_link')
                    }
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                  >
                    {copiedSnippet === 'invite_link' ? '✓ Copied URL!' : '📋 Copy Invite URL'}
                  </button>
                </div>
                <p className="text-xs text-slate-400">
                  Share this secure corporate link in your company Slack or intranet. Employees click once to join the approved pool:
                </p>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-300 truncate">
                  https://app.1-compliance.com/join/corp-org-9821
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* NEW SUB-TAB C: WHITE-LABEL COMPANY THEME & BRANDING CUSTOMIZER             */}
      {/* ========================================================================= */}
      {activeSubTab === 'white_label' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Header Banner */}
          <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-950 via-slate-900 to-pink-950 border-2 border-purple-500/50 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-pink-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-pink-300 uppercase tracking-wider">
                  Company Custom Theme & White-Label Design Engine
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-purple-400/20 text-purple-300 border border-purple-400/40">
                100% Brand Customization
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Transform 1-Compliance OS Into Your Company's Internal Program
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              Make the platform look and feel like an internal software system built specifically by and for your company. 
              Subscribers can customize the <strong className="text-white">company logo</strong>, <strong className="text-white">brand colors</strong>, 
              <strong className="text-white">custom welcome banner</strong>, and host it under their own corporate subdomain 
              (e.g., <code className="text-pink-300">compliance.yourcompany.com</code>).
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-purple-200">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-pink-400" />
                <span>Custom Primary & Accent Brand Colors</span>
              </div>
              <span>·</span>
              <span>Company Logo & Internal Portal Header</span>
              <span>·</span>
              <span>Subdomain CNAME Whitelabeling</span>
            </div>
          </div>

          {/* Theme Saved Toast Notice */}
          {brandSavedNotice && (
            <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs font-mono flex items-center justify-between animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <span className="text-base">✓</span>
                <span>
                  <strong>Success:</strong> White-label branding applied to the entire platform! Look at the top navigation and headers above.
                </span>
              </div>
              <button
                onClick={() => setBrandSavedNotice(false)}
                className="text-emerald-400 hover:text-white"
              >
                ✕
              </button>
            </div>
          )}

          {/* White-Label Customization Studio */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Form Controls */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>🎨</span>
                <span>Brand Identity & Color Settings</span>
              </h3>

              {/* Preset Palette Chooser */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 block">
                  Quick Brand Color Presets:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'corporate_blue', name: 'Corporate Blue', primary: '#1d4ed8', accent: '#06b6d4' },
                    { id: 'healthtech_emerald', name: 'HealthTech Emerald', primary: '#059669', accent: '#10b981' },
                    { id: 'defense_amber', name: 'Defense Aerospace Amber', primary: '#d97706', accent: '#fbbf24' },
                    { id: 'fintech_purple', name: 'FinTech Deep Violet', primary: '#7c3aed', accent: '#c084fc' },
                    { id: 'cyber_crimson', name: 'Cyber Crimson', primary: '#e11d48', accent: '#f43f5e' },
                    { id: 'slate_minimal', name: 'Modern Minimal Slate', primary: '#475569', accent: '#38bdf8' },
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => {
                        setCustomBrand({
                          ...customBrand,
                          themePreset: preset.id as any,
                          primaryColor: preset.primary,
                          accentColor: preset.accent,
                        });
                      }}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        customBrand.primaryColor === preset.primary
                          ? 'border-white bg-slate-800 shadow-md ring-1 ring-white/30'
                          : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{ backgroundColor: preset.primary }}
                        />
                        <span
                          className="w-3 h-3 rounded-full border border-white/20"
                          style={{ backgroundColor: preset.accent }}
                        />
                      </div>
                      <div className="text-xs font-semibold text-white">{preset.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Hex Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Primary Color (Hex):</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customBrand.primaryColor}
                      onChange={(e) =>
                        setCustomBrand({ ...customBrand, primaryColor: e.target.value })
                      }
                      className="w-9 h-9 rounded cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={customBrand.primaryColor}
                      onChange={(e) =>
                        setCustomBrand({ ...customBrand, primaryColor: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs font-mono rounded bg-slate-950 border border-slate-700 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">Accent Highlight (Hex):</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={customBrand.accentColor}
                      onChange={(e) =>
                        setCustomBrand({ ...customBrand, accentColor: e.target.value })
                      }
                      className="w-9 h-9 rounded cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={customBrand.accentColor}
                      onChange={(e) =>
                        setCustomBrand({ ...customBrand, accentColor: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs font-mono rounded bg-slate-950 border border-slate-700 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Text Fields */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Company Name:
                  </label>
                  <input
                    type="text"
                    value={customBrand.companyName}
                    onChange={(e) =>
                      setCustomBrand({ ...customBrand, companyName: e.target.value })
                    }
                    placeholder="e.g. 1-Compliance or Your Organization Name"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Internal Portal Header / Subtitle:
                  </label>
                  <input
                    type="text"
                    value={customBrand.portalSubtitle}
                    onChange={(e) =>
                      setCustomBrand({ ...customBrand, portalSubtitle: e.target.value })
                    }
                    placeholder="e.g. Enterprise Compliance Operating System"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Internal Welcome Banner Text:
                  </label>
                  <input
                    type="text"
                    value={customBrand.welcomeMessage}
                    onChange={(e) =>
                      setCustomBrand({ ...customBrand, welcomeMessage: e.target.value })
                    }
                    placeholder="e.g. Welcome to 1-Compliance Operating System"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-slate-300 block mb-1">
                    Corporate Subdomain (CNAME):
                  </label>
                  <input
                    type="text"
                    value={customBrand.corporateDomain || ''}
                    onChange={(e) =>
                      setCustomBrand({ ...customBrand, corporateDomain: e.target.value })
                    }
                    placeholder="e.g. app.1-compliance.com"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Apply Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    if (onUpdateBranding) {
                      onUpdateBranding({
                        ...customBrand,
                        isWhiteLabelActive: true,
                      });
                    }
                    setBrandSavedNotice(true);
                  }}
                  className="w-full py-3 rounded-xl text-xs font-black text-white transition-all shadow-lg cursor-pointer"
                  style={{
                    backgroundColor: customBrand.primaryColor,
                    borderColor: customBrand.accentColor,
                  }}
                >
                  🚀 Apply White-Label Theme to Entire Platform
                </button>
                <div className="text-[11px] text-center text-slate-400 mt-2">
                  Immediately alters the navigation bar, headers, and welcome screens across the whole OS.
                </div>
              </div>
            </div>

            {/* Right Column: Live Mockup Preview */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Live In-App Employee Preview
                </span>
                <span
                  className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold text-white shadow-xs"
                  style={{ backgroundColor: customBrand.primaryColor }}
                >
                  White-Label Active
                </span>
              </div>

              {/* Mock Nav Bar */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-xs shadow-md"
                    style={{ backgroundColor: customBrand.primaryColor }}
                  >
                    {customBrand.companyName.charAt(0) || 'C'}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{customBrand.companyName}</div>
                    <div className="text-[10px] text-slate-400">{customBrand.portalSubtitle}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span
                    className="px-2 py-0.5 rounded text-white font-bold"
                    style={{ backgroundColor: customBrand.accentColor }}
                  >
                    Enterprise Internal
                  </span>
                </div>
              </div>

              {/* Mock Dashboard Hero Banner */}
              <div
                className="p-5 rounded-xl border text-white space-y-3 relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${customBrand.primaryColor}22 0%, #090d16 100%)`,
                  borderColor: customBrand.primaryColor,
                }}
              >
                <div className="flex items-center gap-2 text-[11px] font-mono">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: customBrand.accentColor }}
                  />
                  <span style={{ color: customBrand.accentColor }} className="font-bold">
                    INTERNAL COMPLIANCE PLATFORM
                  </span>
                </div>

                <h4 className="text-base font-bold text-white">
                  {customBrand.welcomeMessage}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Autonomous Sentinel network active. All employee evidence chains, policies, 
                  and audit binders are scoped to {customBrand.companyName}.
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-sm"
                    style={{ backgroundColor: customBrand.primaryColor }}
                  >
                    Start Security Quest
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-900 border border-slate-700"
                  >
                    Employee Handbook
                  </button>
                </div>
              </div>

              {/* Technical White-Label Architecture */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
                <div className="font-mono font-bold text-cyan-300">
                  How White-Label Customization Works Technologically:
                </div>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  1. <strong>Custom Domain CNAME:</strong> Customer creates a DNS record pointing <code>compliance.client.com</code> to <code>app.1-compliance.com</code>.<br />
                  2. <strong>Tenant Brand Resolution:</strong> When an employee opens the URL, the server matches the hostname and injects the company's color scheme and logos into the DOM.<br />
                  3. <strong>Zero Mention of Other Companies:</strong> To their staff, it appears as their own proprietary in-house compliance system.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: ENTERPRISE COHORT CALCULATOR (101+ USERS) */}
      {/* ========================================================================= */}
      {activeSubTab === 'cohort' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>SCALABLE ENTERPRISE FORMULA</span>
                <span>·</span>
                <span>MATH.CEIL(HEADCOUNT / 100) × $999</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                Interactive Enterprise Cohort & User Headcount Calculator
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Test any company size below. Watch how the 1-Compliance cohort structure gives your entire company predictable budgeting, while saving tens of thousands compared to legacy per-seat pricing.
              </p>
            </div>

            {/* Interactive Headcount Slider */}
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-white">Company User Headcount</div>
                  <div className="text-xs text-slate-400">Total approved employees, managers, and staff across all departments:</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-3xl font-mono font-extrabold text-cyan-400">
                    {teamSize} Users
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setTeamSize(Math.max(1, teamSize - 10))}
                      className="px-2 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-white font-mono"
                    >
                      -10
                    </button>
                    <button
                      onClick={() => setTeamSize(teamSize + 10)}
                      className="px-2 py-1 text-xs rounded bg-slate-800 hover:bg-slate-700 text-white font-mono"
                    >
                      +10
                    </button>
                  </div>
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="500"
                step="1"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2.5 bg-slate-800 rounded-lg"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>1 (Solo $149)</span>
                <span>5 (Team $299)</span>
                <span>100 (100 Block $999)</span>
                <span>200 (2 Blocks $1,998)</span>
                <span>300 (3 Blocks $2,997)</span>
                <span>500 (5 Blocks $4,995)</span>
              </div>
            </div>

            {/* Calculated Breakdown Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div className="text-xs font-mono text-slate-400 uppercase">Applicable Plan Tier</div>
                <div className="text-lg font-bold text-white">
                  {teamSize <= 1
                    ? 'Solo / Founder Plan'
                    : teamSize <= 5
                    ? 'Team Compliance Plan'
                    : teamSize <= 100
                    ? 'Enterprise Scale Plan (1st Cohort)'
                    : `Mega Enterprise (${Math.ceil(teamSize / 100)} Cohort Blocks)`}
                </div>
                <div className="text-xs text-cyan-400 font-mono">
                  {teamSize <= 5 ? `${teamSize} Included Logins` : `${Math.ceil(teamSize / 100) * 100} Seat Pool Capacity`}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-950/80 border border-cyan-500/80 space-y-2">
                <div className="text-xs font-mono text-cyan-400 uppercase font-bold">1-Compliance Monthly Cost</div>
                <div className="text-3xl font-mono font-extrabold text-white">
                  ${calculatedMonthly.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal"> / month</span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  {billingCycle === 'annual'
                    ? `Billed annually at $${calculatedAnnual.toLocaleString()}/yr`
                    : `Monthly rate: $${calculateCustomerMonthlyCost(teamSize, 'monthly').toLocaleString()}/mo`}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-slate-950/80 border border-emerald-950 space-y-2">
                <div className="text-xs font-mono text-emerald-400 uppercase font-bold">Formula Applied</div>
                <div className="text-base font-mono font-bold text-emerald-300">
                  {teamSize <= 1
                    ? '$149 / month flat'
                    : teamSize <= 5
                    ? '$299 / month flat'
                    : teamSize <= 100
                    ? '$999 / month flat'
                    : `${Math.ceil(teamSize / 100)} × $999 = $${(Math.ceil(teamSize / 100) * 999).toLocaleString()}/mo`}
                </div>
                <div className="text-xs text-slate-400">
                  {teamSize > 100 && (
                    <span>
                      {Math.ceil(teamSize / 100)} blocks of 100 users (covers up to {Math.ceil(teamSize / 100) * 100} seats).
                    </span>
                  )}
                  {teamSize <= 100 && <span>Fixed flat rate with company-wide access.</span>}
                </div>
              </div>
            </div>

            {/* Real World Concrete Examples Table */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-sm font-bold text-white">Concrete Enterprise Pricing Examples</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Team Headcount</th>
                      <th className="p-3">Pricing Cohorts</th>
                      <th className="p-3">Monthly Cost</th>
                      <th className="p-3">Annual (2 Mo Free)</th>
                      <th className="p-3">Legacy Tool Cost (Vanta)</th>
                      <th className="p-3 text-right">Your Net Annual Savings</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 font-bold text-white">1 User (Solo)</td>
                      <td className="p-3 text-slate-400">1 Login Tier</td>
                      <td className="p-3 font-bold text-cyan-300">$149 / mo</td>
                      <td className="p-3 text-emerald-400">$1,490 / yr</td>
                      <td className="p-3 text-red-400">$18,150 / yr</td>
                      <td className="p-3 text-right font-bold text-emerald-400">$16,660 / yr</td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 font-bold text-white">5 Users (Team)</td>
                      <td className="p-3 text-slate-400">Up to 5 Logins</td>
                      <td className="p-3 font-bold text-cyan-300">$299 / mo</td>
                      <td className="p-3 text-emerald-400">$2,990 / yr</td>
                      <td className="p-3 text-red-400">$18,750 / yr</td>
                      <td className="p-3 text-right font-bold text-emerald-400">$15,760 / yr</td>
                    </tr>
                    <tr className="hover:bg-slate-900/50 bg-cyan-950/20">
                      <td className="p-3 font-bold text-white">45 Users (Growth)</td>
                      <td className="p-3 text-cyan-400 font-bold">1st 100 Cohort</td>
                      <td className="p-3 font-bold text-cyan-300">$999 / mo</td>
                      <td className="p-3 text-emerald-400">$9,990 / yr</td>
                      <td className="p-3 text-red-400">$24,750 / yr</td>
                      <td className="p-3 text-right font-bold text-emerald-400">$14,760 / yr</td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 font-bold text-white">120 Users (Mega Ent)</td>
                      <td className="p-3 text-purple-300">2 Cohorts (1-100 + 101-200)</td>
                      <td className="p-3 font-bold text-cyan-300">$1,998 / mo ($999 + $999)</td>
                      <td className="p-3 text-emerald-400">$19,980 / yr</td>
                      <td className="p-3 text-red-400">$36,000 / yr</td>
                      <td className="p-3 text-right font-bold text-emerald-400">$16,020 / yr</td>
                    </tr>
                    <tr className="hover:bg-slate-900/50">
                      <td className="p-3 font-bold text-white">201 Users (Mega Ent)</td>
                      <td className="p-3 text-purple-300">3 Cohorts (3 × $999)</td>
                      <td className="p-3 font-bold text-cyan-300">$2,997 / mo</td>
                      <td className="p-3 text-emerald-400">$29,970 / yr</td>
                      <td className="p-3 text-red-400">$48,150 / yr</td>
                      <td className="p-3 text-right font-bold text-emerald-400">$18,180 / yr</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ENTERPRISE COMPANY-WIDE TEAM & MEMBER MANAGEMENT */}
      {/* ========================================================================= */}
      {activeSubTab === 'enterprise_team' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <span>COMPANY-WIDE ENTERPRISE ACCESS</span>
                  <span>·</span>
                  <span>DEPARTMENT SCOPING & RBAC</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">
                  Enterprise Member Directory & Department Roles
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                  When your company subscribes to the Enterprise plan, all approved members, managers, and staff across all departments have full authorized access to 1-Compliance OS.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-cyan-400 font-bold bg-slate-950 px-3 py-1.5 rounded border border-slate-800">
                  {members.length} / 100 Active Seats
                </span>
              </div>
            </div>

            {/* Add New Member Form */}
            <form onSubmit={handleAddMember} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Provision New Company User
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Full Name:</label>
                  <input
                    type="text"
                    required
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    placeholder="e.g. Alex Henderson"
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Company Email:</label>
                  <input
                    type="email"
                    required
                    value={newMemberEmail}
                    onChange={(e) => setNewMemberEmail(e.target.value)}
                    placeholder="e.g. alex@yourcompany.com"
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Department Scope:</label>
                  <select
                    value={newMemberDept}
                    onChange={(e) => setNewMemberDept(e.target.value as any)}
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Factory & Operations">Factory & Operations</option>
                    <option value="HR & People">HR & People</option>
                    <option value="IT & DevOps">IT & DevOps</option>
                    <option value="Finance & Legal">Finance & Legal</option>
                    <option value="Executive">Executive & Board</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Role & Permissions:</label>
                  <select
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value as any)}
                    className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Department Manager">Department Manager</option>
                    <option value="Compliance Officer">Compliance Officer</option>
                    <option value="Staff / Operator">Staff / Operator</option>
                    <option value="Admin">Organization Admin</option>
                    <option value="External Auditor">External Auditor (Read-Only)</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors"
                >
                  + Add Member to Enterprise Pool
                </button>
              </div>
            </form>

            {/* Member Directory Table */}
            <div className="rounded-xl bg-slate-950 border border-slate-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 font-mono border-b border-slate-800">
                    <tr>
                      <th className="p-3.5">User</th>
                      <th className="p-3.5">Department</th>
                      <th className="p-3.5">Role</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Last Active</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {members.map((member) => (
                      <tr key={member.id} className="hover:bg-slate-900/40 transition-colors">
                        <td className="p-3.5 font-medium text-white">
                          <div>{member.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{member.email}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="font-mono text-cyan-300">{member.department}</span>
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                            member.role === 'Admin'
                              ? 'bg-purple-950 text-purple-300 border border-purple-800'
                              : member.role === 'External Auditor'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-slate-800 text-slate-200'
                          }`}>
                            {member.role}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="text-emerald-400 font-mono flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span>{member.status}</span>
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-400 font-mono">{member.lastActive}</td>
                        <td className="p-3.5 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              alert(`Sent magic passwordless login link to ${member.email}`);
                            }}
                            className="text-cyan-400 hover:text-cyan-300 underline font-mono text-[11px]"
                          >
                            Resend Access Link
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: INTERACTIVE CUSTOMER ROI CALCULATOR */}
      {/* ========================================================================= */}
      {activeSubTab === 'roi' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">GRC Cost Comparison & Capital Savings Calculator</h2>
              <p className="text-xs text-slate-400 mt-1">
                Show prospective buyers exactly how much cash they save by replacing bloated legacy GRC platforms (Vanta, Drata) with 1-Compliance OS.
              </p>
            </div>

            {/* Slider for team size */}
            <div className="p-5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-semibold text-white">Target Company Headcount</div>
                  <div className="text-xs text-slate-400">Drag to see how legacy per-seat pricing inflates costs:</div>
                </div>
                <div className="text-2xl font-mono font-bold text-cyan-400">
                  {teamSize} Employees
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="250"
                step="5"
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-500">
                <span>1 (Solo)</span>
                <span>50 (Growth)</span>
                <span>100 (Scaleup)</span>
                <span>250+ (Enterprise)</span>
              </div>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Vanta Card */}
              <div className="p-4 rounded-lg bg-slate-950/60 border border-red-950/60 space-y-2">
                <div className="text-xs font-mono text-red-400">Legacy GRC Vendor #1</div>
                <div className="text-base font-bold text-white">Vanta Estimated Cost</div>
                <div className="text-3xl font-mono font-bold text-red-400">
                  ${vantaEstimatedAnnual.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal"> / yr</span>
                </div>
                <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-800">
                  <div>· Base platform: ~$18,000/yr</div>
                  <div>· Per-seat license fee: ~$150/emp</div>
                  <div>· Mandatory annual vendor lock-in</div>
                </div>
              </div>

              {/* Drata Card */}
              <div className="p-4 rounded-lg bg-slate-950/60 border border-amber-950/60 space-y-2">
                <div className="text-xs font-mono text-amber-400">Legacy GRC Vendor #2</div>
                <div className="text-base font-bold text-white">Drata Estimated Cost</div>
                <div className="text-3xl font-mono font-bold text-amber-400">
                  ${drataEstimatedAnnual.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal"> / yr</span>
                </div>
                <div className="text-xs text-slate-400 space-y-1 pt-2 border-t border-slate-800">
                  <div>· Base platform: ~$22,000/yr</div>
                  <div>· Per-seat fee: ~$180/emp</div>
                  <div>· Add-ons for HIPAA & GDPR</div>
                </div>
              </div>

              {/* 1-Compliance OS Card */}
              <div className="p-4 rounded-lg bg-cyan-950/30 border border-cyan-500/80 space-y-2 relative shadow-lg">
                <div className="text-xs font-mono text-cyan-400 font-bold">1-Compliance Operating System</div>
                <div className="text-base font-bold text-white">Your Customer Cost</div>
                <div className="text-3xl font-mono font-bold text-emerald-400">
                  ${calculatedAnnual.toLocaleString()}
                  <span className="text-xs text-slate-400 font-normal"> / yr</span>
                </div>
                <div className="text-xs text-slate-300 space-y-1 pt-2 border-t border-cyan-900/60">
                  <div>· Simple flat cohorts ($149 / $299 / $999)</div>
                  <div>· All 28 Notion categories & 5 Sentinels</div>
                  <div>· Unlimited Free Guest Vendor Vetting</div>
                </div>
              </div>
            </div>

            {/* Total Savings Highlight Banner */}
            <div className="p-6 rounded-lg bg-gradient-to-r from-emerald-950/60 via-slate-900 to-cyan-950/60 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  Net Annual Capital Saved By Customer
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
                  ${netAnnualSavings.toLocaleString()} <span className="text-sm font-normal text-emerald-300">saved every single year</span>
                </div>
                <div className="text-xs text-slate-400">
                  Saved capital can fund additional product R&D, manufacturing equipment, or security headcount.
                </div>
              </div>

              <button
                onClick={() => handleStartCheckout(PLANS[2])}
                className="px-5 py-3 rounded-lg text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shrink-0 shadow-lg"
              >
                Subscribe Enterprise at ${PLANS[2].annualMonthlyPrice}/mo →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: BILLING & INVOICES PORTAL */}
      {/* ========================================================================= */}
      {activeSubTab === 'portal' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">Customer Self-Service Billing Portal</h2>
                <p className="text-xs text-slate-400 mt-1">
                  How subscribed companies manage their active subscription, update credit cards, and download tax receipts.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase">
                  Active Enterprise Subscription
                </span>
              </div>
            </div>

            {/* Subscription Detail Card */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 rounded-lg bg-slate-950/80 border border-slate-800">
              <div>
                <div className="text-xs text-slate-400">Current Plan</div>
                <div className="text-base font-bold text-white mt-1">{currentSubscription.plan}</div>
                <div className="text-xs text-cyan-400 mt-1 font-mono">All 5 Sentinels Active</div>
              </div>

              <div>
                <div className="text-xs text-slate-400">Renewal Date</div>
                <div className="text-base font-bold text-white font-mono mt-1">
                  {currentSubscription.renewalDate}
                </div>
                <div className="text-xs text-slate-400 mt-1">Auto-renews via Stripe</div>
              </div>

              <div>
                <div className="text-xs text-slate-400">Seat Utilization</div>
                <div className="text-base font-bold text-white font-mono mt-1">
                  {members.length} / {currentSubscription.seatsTotal} Seats
                </div>
                <div className="text-xs text-slate-400 mt-1">{currentSubscription.seatsTotal - members.length} seats remaining</div>
              </div>

              <div className="flex flex-col justify-center">
                <button
                  type="button"
                  onClick={() => {
                    alert('In production, this redirects to the Stripe Customer Portal (billing.stripe.com) where customers update corporate cards, tax IDs, or manage seats.');
                  }}
                  className="px-3 py-2 text-xs font-semibold text-cyan-300 bg-slate-900 border border-cyan-800 rounded hover:bg-cyan-950 transition-colors text-center"
                >
                  Open Stripe Customer Portal ↗
                </button>
              </div>
            </div>

            {/* Invoices List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-sm font-bold text-white">Billing History & Tax Receipts</div>
                <span className="text-xs text-slate-500 font-mono">Synced from Stripe</span>
              </div>

              <div className="space-y-2">
                {[
                  {
                    id: 'INV-2026-901',
                    date: 'Oct 28, 2026',
                    description: '1-Compliance OS - Enterprise Scale Plan (Annual, 100 Seats)',
                    amount: '$9,990.00',
                    status: 'Paid',
                  },
                  {
                    id: 'INV-2025-412',
                    date: 'Oct 28, 2025',
                    description: '1-Compliance OS - Enterprise Scale Plan (Annual)',
                    amount: '$9,990.00',
                    status: 'Paid',
                  },
                ].map((inv) => (
                  <div
                    key={inv.id}
                    className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-cyan-400 font-bold">{inv.id}</span>
                      <span className="text-slate-400">{inv.date}</span>
                      <span className="text-white font-medium">{inv.description}</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-mono font-bold text-white">{inv.amount}</span>
                      <span className="font-mono text-emerald-400">{inv.status}</span>
                      <button
                        type="button"
                        onClick={() => alert(`Downloading official PDF receipt for ${inv.id}...`)}
                        className="text-cyan-400 hover:text-cyan-300 underline"
                      >
                        PDF Receipt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: TECHNICAL SAAS LAUNCH GUIDE (STRIPE BLUEPRINT) */}
      {/* ========================================================================= */}
      {activeSubTab === 'blueprint' && (
        <div className="space-y-6">
          <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>FOUNDER BLUEPRINT</span>
                <span>·</span>
                <span>COMMERCIAL REVENUE EXECUTION</span>
              </div>
              <h2 className="text-xl font-bold text-white mt-1">
                How to Connect Real Stripe Subscriptions & Launch Your SaaS
              </h2>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Configure your Stripe account to start collecting recurring monthly and annual subscriptions ($149/mo Single User, $299/mo Small Company, $999/mo Enterprise).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Step 1: Stripe Setup */}
              <div className="p-5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-cyan-400 font-bold">STEP 01</div>
                  <span className="text-[11px] text-emerald-400 font-mono">100% Free Setup</span>
                </div>
                <h3 className="text-sm font-bold text-white">Create Stripe Products & Prices</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Go to <a href="https://dashboard.stripe.com" target="_blank" rel="noreferrer" className="text-cyan-400 underline">stripe.com</a> and add these 4 recurring products:
                </p>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
                  <div>1. Solo Plan: $149/mo (or $124/mo annual)</div>
                  <div>2. Team Plan: $299/mo (or $249/mo annual)</div>
                  <div>3. Enterprise Scale: $999/mo (or $832/mo annual)</div>
                  <div>4. Vendor Passport: $49/mo (or $41/mo annual)</div>
                </div>
              </div>

              {/* Step 2: Checkout Session API */}
              <div className="p-5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono text-cyan-400 font-bold">STEP 02</div>
                  <span className="text-[11px] text-cyan-400 font-mono">Express Route</span>
                </div>
                <h3 className="text-sm font-bold text-white">Mount Checkout Session Route</h3>
                <pre className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto">
{`app.post('/api/create-checkout', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [{ price: req.body.priceId, quantity: req.body.cohortBlocks || 1 }],
    success_url: \`\${process.env.APP_URL}?session_id={CHECKOUT_SESSION_ID}\`,
    cancel_url: \`\${process.env.APP_URL}/pricing\`,
    customer_email: req.body.email,
  });
  res.json({ url: session.url });
});`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: WEBSITE INTEGRATION & EMBED FOR WWW.1-COMPLIANCE.COM               */}
      {/* ========================================================================= */}
      {activeSubTab === 'website_embed' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 border-2 border-indigo-500/40 text-white shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                  Company Website Integration Hub
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-cyan-400/20 text-cyan-300 border border-cyan-400/40">
                Target: www.1-compliance.com
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Incorporate 1-Compliance OS Directly Onto www.1-compliance.com
            </h2>
            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed max-w-3xl font-medium">
              Enable companies visiting <strong className="text-white">www.1-compliance.com</strong> to start subscriptions ($149, $299, $999/mo) directly from your website. You can embed the full operating system onto your domain, set up a branded app subdomain, or drop live subscription checkout cards into your marketing pages.
            </p>
          </div>

          {/* ========================================================================= */}
          {/* GITHUB REPOSITORY INTEGRATION & WEBSITE SHARING CARD                      */}
          {/* ========================================================================= */}
          <div className="p-6 md:p-8 rounded-2xl bg-slate-950 text-white border-2 border-indigo-400/80 shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
                  🐙
                </div>
                <div>
                  <h3 className="text-lg font-black text-white flex items-center gap-2">
                    <span>How to Add 1-Compliance OS to GitHub & Connect to www.1-compliance.com</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                      Step-by-Step
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Host your source code on GitHub, automate deployments to your website, and display GitHub verification badges to prospective buyers.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-3 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold">
                  ✓ Git Initialized on `main` branch
                </span>
              </div>
            </div>

            {/* 3 Step Pipeline: AI Studio -> GitHub -> www.1-compliance.com */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Step 1 */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-cyan-400">STEP 1: CREATE REPOSITORY</span>
                  <span className="text-[10px] font-mono text-slate-500">github.com</span>
                </div>
                <h4 className="text-sm font-bold text-white">Create Repo on GitHub</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Go to <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-cyan-400 underline font-bold">github.com/new</a> and create a new repository:
                </p>
                <div className="p-2.5 rounded bg-slate-950 text-xs font-mono text-cyan-300 space-y-0.5 border border-slate-800">
                  <div>Repository Name: <strong>1-compliance-os</strong></div>
                  <div>Visibility: <strong>Public</strong> or <strong>Private</strong></div>
                  <div className="text-slate-500 text-[10px]">Do not initialize with README (already created)</div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-emerald-400">STEP 2: PUSH CODE</span>
                  <span className="text-[10px] font-mono text-slate-500">Terminal / Git CLI</span>
                </div>
                <h4 className="text-sm font-bold text-white">Push Code to GitHub</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Run these commands in your project terminal to link your local code to your GitHub repo:
                </p>
                <div className="p-2.5 rounded bg-slate-950 text-xs font-mono text-emerald-300 space-y-1 border border-slate-800">
                  <div className="text-slate-400 text-[10px]"># Replace with your username:</div>
                  <div className="truncate">git remote add origin https://github.com/&lt;username&gt;/1-compliance-os.git</div>
                  <div>git push -u origin main</div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-purple-400">STEP 3: DEPLOY & SHARE</span>
                  <span className="text-[10px] font-mono text-slate-500">Vercel / Cloudflare</span>
                </div>
                <h4 className="text-sm font-bold text-white">Auto-Deploy to Website</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Connect the GitHub repo to Vercel or Cloudflare Pages. Every time you push, it updates <strong className="text-white">www.1-compliance.com</strong> automatically.
                </p>
                <div className="p-2.5 rounded bg-slate-950 text-xs font-mono text-purple-300 border border-slate-800">
                  <div>Production URL: <strong>www.1-compliance.com</strong></div>
                  <div>App Portal: <strong>app.1-compliance.com</strong></div>
                </div>
              </div>
            </div>

            {/* Quick Copy Command Block */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400">
                  TERMINAL COMMANDS TO PUSH CODE TO GITHUB:
                </span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyText(
`# 1. Check existing commits
git status

# 2. Add your GitHub remote repository (replace YOUR_USERNAME with your GitHub handle):
git remote add origin https://github.com/YOUR_USERNAME/1-compliance-os.git

# 3. Push to GitHub main branch:
git push -u origin main`,
                      'git_push'
                    )
                  }
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono font-bold text-slate-200 cursor-pointer shadow-xs"
                >
                  {copiedSnippet === 'git_push' ? '✓ Commands Copied!' : '📋 Copy Git Push Commands'}
                </button>
              </div>

              <pre className="p-3.5 rounded-lg bg-slate-950 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed border border-slate-800">
{`# 1. Add your GitHub remote repository (replace with your GitHub username):
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/1-compliance-os.git

# 2. Push all code, Sentinels, policies, and pricing modules to GitHub:
git push -u origin main`}
              </pre>
            </div>

            {/* Ready-to-Paste HTML Snippets to Share GitHub on www.1-compliance.com */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <span>🔗</span>
                <span>Snippets to Share the GitHub Repository on www.1-compliance.com</span>
              </h4>
              <p className="text-xs text-slate-400">
                Prospective buyers and enterprise compliance auditors love seeing the open architecture. Paste any of these widgets onto your marketing website:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Website Header / Navbar GitHub Button */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">A. Navbar GitHub Badge Button</span>
                    <button
                      onClick={() =>
                        handleCopyText(
`<a href="https://github.com/YOUR_USERNAME/1-compliance-os" target="_blank" rel="noopener noreferrer" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;background:#24292e;color:#ffffff;border-radius:6px;font-size:12px;font-weight:bold;text-decoration:none;">
  <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
  <span>View on GitHub</span>
</a>`,
                          'github_nav_btn'
                        )
                      }
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                    >
                      {copiedSnippet === 'github_nav_btn' ? '✓ Copied!' : '📋 Copy HTML'}
                    </button>
                  </div>
                  <pre className="p-2.5 rounded bg-slate-950 text-[11px] font-mono text-slate-300 overflow-x-auto truncate">
{`<a href="https://github.com/YOUR_USERNAME/1-compliance-os" target="_blank">View on GitHub</a>`}
                  </pre>
                </div>

                {/* Markdown Shield Badges for Website or README */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">B. Markdown Shields Badge</span>
                    <button
                      onClick={() =>
                        handleCopyText(
`[![GitHub](https://img.shields.io/badge/GitHub-1--compliance--os-181717?logo=github&logoColor=white)](https://github.com/YOUR_USERNAME/1-compliance-os)`,
                          'github_shield'
                        )
                      }
                      className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline cursor-pointer"
                    >
                      {copiedSnippet === 'github_shield' ? '✓ Copied!' : '📋 Copy Shield'}
                    </button>
                  </div>
                  <pre className="p-2.5 rounded bg-slate-950 text-[11px] font-mono text-emerald-300 overflow-x-auto truncate">
{`[![GitHub](https://img.shields.io/badge/GitHub-1--compliance--os-181717?logo=github)](...)`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white border-2 border-indigo-200 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-indigo-100 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider">
                  🌐 Live Simulator: How It Appears on www.1-compliance.com
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-900 border border-emerald-300">
                  Interactive Preview
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Live URL: <code className="font-mono text-indigo-600 font-bold">https://www.1-compliance.com/app</code>
              </span>
            </div>

            {/* Mock Browser Frame */}
            <div className="rounded-2xl border-2 border-slate-300 bg-slate-100 shadow-inner overflow-hidden">
              {/* Browser chrome bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-200 border-b border-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="flex-1 max-w-md mx-auto px-3 py-1 rounded-lg bg-white border border-slate-300 text-xs font-mono text-slate-700 flex items-center justify-between shadow-xs">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="text-emerald-600 font-bold">🔒</span>
                    <span>https://www.1-compliance.com/app</span>
                  </span>
                  <span className="text-[10px] text-slate-400">SSL 256-bit</span>
                </div>
              </div>

              {/* Simulated Website Navigation Bar */}
              <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-cyan-500 text-white font-black text-xs flex items-center justify-center">
                    1C
                  </div>
                  <span className="font-black text-slate-950 text-sm">1-Compliance.com</span>
                </div>

                <div className="hidden sm:flex items-center gap-4 text-xs font-bold text-slate-600">
                  <span className="text-indigo-600">Operating System</span>
                  <span>Frameworks</span>
                  <span>Pricing ($149 - $999+)</span>
                  <span>Training Manual</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleStartCheckout(PLANS[0])}
                    className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-black text-xs shadow-xs hover:opacity-95 cursor-pointer"
                  >
                    Start Subscription →
                  </button>
                </div>
              </div>

              {/* Simulated Embedded OS Container */}
              <div className="p-6 bg-gradient-to-br from-indigo-50 to-sky-50 text-slate-900 space-y-4">
                <div className="p-4 rounded-xl bg-white border border-indigo-200 shadow-sm flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <img src="/assets/sentinels/jax_transparent.png" alt="Jax" className="w-10 h-10 object-contain" />
                    <div>
                      <h4 className="text-sm font-black text-slate-950">1-Compliance OS Embedded View</h4>
                      <p className="text-xs text-slate-600">Active Tenant Session · Continuous Audit Readiness 92%</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onNavigateTab('dashboard')}
                      className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-900 border border-indigo-200 text-xs font-bold hover:bg-indigo-100 cursor-pointer"
                    >
                      Open Full Workspace
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStartCheckout(PLANS[2])}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 cursor-pointer shadow-xs"
                    >
                      Subscribe Enterprise ($999/mo)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Copyable Integration Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Method A: Subdomain CNAME */}
            <div className="p-5 rounded-2xl bg-white border-2 border-indigo-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-indigo-600 uppercase px-2 py-0.5 rounded bg-indigo-50 border border-indigo-200">
                  METHOD 01 · RECOMMENDED
                </span>
                <span className="text-xs text-emerald-600 font-bold">Fastest Setup</span>
              </div>

              <h3 className="text-base font-black text-slate-950">
                Point Subdomain (app.1-compliance.com)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add this DNS CNAME record in your domain host (GoDaddy, Namecheap, Cloudflare, AWS Route 53) to host the full OS on your custom domain:
              </p>

              <div className="p-3 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs space-y-1">
                <div className="text-slate-400"># DNS CNAME Record:</div>
                <div className="text-cyan-300">Type:   CNAME</div>
                <div className="text-cyan-300">Host:   app  (or os)</div>
                <div className="text-amber-300 truncate">Target: ais-pre-bujpgws4gxgxrag4iyp337-615345061292.us-east1.run.app</div>
                <div className="text-slate-400">TTL:    Automatic (3600s)</div>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleCopyText(
                    'CNAME app ais-pre-bujpgws4gxgxrag4iyp337-615345061292.us-east1.run.app',
                    'cname'
                  )
                }
                className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black transition-colors cursor-pointer shadow-xs"
              >
                {copiedSnippet === 'cname' ? '✓ CNAME Copied to Clipboard!' : '📋 Copy DNS CNAME Record'}
              </button>
            </div>

            {/* Method B: In-Page iFrame Embed */}
            <div className="p-5 rounded-2xl bg-white border-2 border-indigo-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-cyan-600 uppercase px-2 py-0.5 rounded bg-cyan-50 border border-cyan-200">
                  METHOD 02 · IN-PAGE EMBED
                </span>
                <span className="text-xs text-slate-500 font-mono">WordPress / Webflow</span>
              </div>

              <h3 className="text-base font-black text-slate-950">
                Embed Inside www.1-compliance.com/app
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Paste this HTML snippet into any CMS page on <strong className="text-indigo-950">www.1-compliance.com/app</strong> to embed the full responsive operating system:
              </p>

              <div className="p-3 rounded-xl bg-slate-950 text-slate-100 font-mono text-[11px] leading-relaxed overflow-x-auto">
{`<div style="width:100%; height:100vh; overflow:hidden;">
  <iframe
    src="https://ais-pre-bujpgws4gxgxrag4iyp337-615345061292.us-east1.run.app"
    title="1-Compliance OS"
    style="width:100%; height:100%; border:none;"
    allow="clipboard-write; camera; microphone; speaker"
  ></iframe>
</div>`}
              </div>

              <button
                type="button"
                onClick={() =>
                  handleCopyText(
                    `<div style="width:100%; height:100vh; overflow:hidden;"><iframe src="https://ais-pre-bujpgws4gxgxrag4iyp337-615345061292.us-east1.run.app" title="1-Compliance OS" style="width:100%; height:100%; border:none;" allow="clipboard-write; camera; microphone; speaker"></iframe></div>`,
                    'iframe'
                  )
                }
                className="w-full py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white text-xs font-black transition-colors cursor-pointer shadow-xs"
              >
                {copiedSnippet === 'iframe' ? '✓ Embed Code Copied!' : '📋 Copy iFrame Embed Code'}
              </button>
            </div>

            {/* Method C: Direct "Start Subscription" Pricing Cards */}
            <div className="p-5 rounded-2xl bg-white border-2 border-indigo-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-emerald-600 uppercase px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                  METHOD 03 · PRICING TABLE
                </span>
                <span className="text-xs text-emerald-600 font-bold">$149 / $299 / $999</span>
              </div>

              <h3 className="text-base font-black text-slate-950">
                Direct Subscription Links for www.1-compliance.com/pricing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Add these direct checkout links to your website pricing buttons so buyers are immediately directed to purchase:
              </p>

              <div className="p-3 rounded-xl bg-slate-950 text-slate-100 font-mono text-[11px] space-y-1.5">
                <div>&lt;!-- Solo $149/mo --&gt;</div>
                <div className="text-emerald-300">&lt;a href="https://app.1-compliance.com/#subscribe-solo"&gt;Start Solo ($149/mo)&lt;/a&gt;</div>
                <div>&lt;!-- Team $299/mo --&gt;</div>
                <div className="text-cyan-300">&lt;a href="https://app.1-compliance.com/#subscribe-team"&gt;Start Team ($299/mo)&lt;/a&gt;</div>
                <div>&lt;!-- Enterprise $999/mo --&gt;</div>
                <div className="text-indigo-300">&lt;a href="https://app.1-compliance.com/#subscribe-enterprise"&gt;Start Enterprise ($999/mo)&lt;/a&gt;</div>
              </div>

              <button
                type="button"
                onClick={() =>
                  handleCopyText(
                    `<a href="https://app.1-compliance.com/#subscriptions" class="btn-primary">Start 1-Compliance Subscription ($149 - $999/mo)</a>`,
                    'pricing_btn'
                  )
                }
                className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-colors cursor-pointer shadow-xs"
              >
                {copiedSnippet === 'pricing_btn' ? '✓ Buttons Copied!' : '📋 Copy Website Pricing Links'}
              </button>
            </div>

            {/* Method D: Website Header CTA */}
            <div className="p-5 rounded-2xl bg-white border-2 border-indigo-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-purple-600 uppercase px-2 py-0.5 rounded bg-purple-50 border border-purple-200">
                  METHOD 04 · NAVBAR CTA
                </span>
                <span className="text-xs text-slate-500 font-mono">Header Button</span>
              </div>

              <h3 className="text-base font-black text-slate-950">
                Navbar "Launch 1-Compliance OS" CTA
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Drop this button into the top right navigation bar of <strong className="text-indigo-950">www.1-compliance.com</strong>:
              </p>

              <div className="p-3 rounded-xl bg-slate-950 text-slate-100 font-mono text-[11px] leading-relaxed overflow-x-auto">
{`<a href="https://app.1-compliance.com" style="background:#4f46e5;color:#fff;padding:8px 16px;border-radius:10px;font-weight:bold;text-decoration:none;">
  🚀 Launch 1-Compliance OS
</a>`}
              </div>

              <button
                type="button"
                onClick={() =>
                  handleCopyText(
                    `<a href="https://app.1-compliance.com" style="background:#4f46e5;color:#fff;padding:8px 16px;border-radius:10px;font-weight:bold;text-decoration:none;">🚀 Launch 1-Compliance OS</a>`,
                    'nav_btn'
                  )
                }
                className="w-full py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black transition-colors cursor-pointer shadow-xs"
              >
                {copiedSnippet === 'nav_btn' ? '✓ Navbar Button Copied!' : '📋 Copy Navbar Button HTML'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: STANDALONE IT & TECH TEAM PROGRAM BLUEPRINT                        */}
      {/* ========================================================================= */}
      {activeSubTab === 'standalone_it' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 border-2 border-cyan-500/40 text-white shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider">
                  Internal IT & Tech Team Deployment Roadmap
                </span>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
                Self-Hosted & Desktop Packaging
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              Standalone Enterprise Program Blueprint for Future IT Teams
            </h2>
            <p className="text-xs sm:text-sm text-cyan-200 leading-relaxed max-w-3xl font-medium">
              You are currently hosting online so you can advertise on <strong className="text-white">www.1-compliance.com</strong> and monetize immediately. When you hire your internal IT and tech engineering team, they can use this exact blueprint to package 1-Compliance OS into a standalone on-premises container or offline desktop program.
            </p>
          </div>

          {/* 3-Phase Commercial & Engineering Roadmap */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-white border-2 border-emerald-300 shadow-sm space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-emerald-100 text-emerald-900">
                PHASE 01 · ACTIVE TODAY
              </span>
              <h3 className="text-sm font-black text-slate-950">Online SaaS Subscription Mode</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero internal IT team required. Hosted in Google Cloud. Ready to market on <strong>www.1-compliance.com</strong> with automated card billing ($149, $299, $999/mo).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-indigo-200 shadow-sm space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-indigo-100 text-indigo-900">
                PHASE 02 · FUTURE IT TEAM
              </span>
              <h3 className="text-sm font-black text-slate-950">Private VPC & On-Premises Docker</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your future tech team deploys containerized instances inside clients' AWS, Azure, or on-premises servers for strict healthcare and defense compliance.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white border-2 border-cyan-200 shadow-sm space-y-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-black bg-cyan-100 text-cyan-900">
                PHASE 03 · STANDALONE DESKTOP
              </span>
              <h3 className="text-sm font-black text-slate-950">Offline Desktop Program (.exe / .dmg)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Packaged with Electron/Tauri as a standalone desktop executable installed on compliance officers' laptops with local SQLite database storage.
              </p>
            </div>
          </div>

          {/* Technical Docker & IT Artifacts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Dockerfile Artifact */}
            <div className="p-5 rounded-2xl bg-slate-950 text-slate-100 border border-slate-800 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400">ARTIFACT 01: Dockerfile</span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyText(
`FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server.ts ./
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["npm", "run", "start"]`,
                      'dockerfile'
                    )
                  }
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-200 cursor-pointer"
                >
                  {copiedSnippet === 'dockerfile' ? '✓ Copied!' : '📋 Copy Dockerfile'}
                </button>
              </div>

              <pre className="p-3 rounded-xl bg-slate-900 text-[11px] font-mono text-cyan-300 leading-relaxed overflow-x-auto">
{`FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server.ts ./
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["npm", "run", "start"]`}
              </pre>
            </div>

            {/* Docker Compose Multi-Container Stack */}
            <div className="p-5 rounded-2xl bg-slate-950 text-slate-100 border border-slate-800 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">ARTIFACT 02: docker-compose.yml</span>
                <button
                  type="button"
                  onClick={() =>
                    handleCopyText(
`version: "3.8"
services:
  one-compliance-os:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:secret@db:5432/compliance
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: compliance
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`,
                      'compose'
                    )
                  }
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-bold text-slate-200 cursor-pointer"
                >
                  {copiedSnippet === 'compose' ? '✓ Copied!' : '📋 Copy Compose Stack'}
                </button>
              </div>

              <pre className="p-3 rounded-xl bg-slate-900 text-[11px] font-mono text-emerald-300 leading-relaxed overflow-x-auto">
{`version: "3.8"
services:
  one-compliance-os:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:secret@db:5432/compliance
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: compliance
      POSTGRES_PASSWORD: secret
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:`}
              </pre>
            </div>
          </div>

          {/* Internal IT & Tech Team Checklist */}
          <div className="p-5 rounded-2xl bg-white border-2 border-indigo-200 shadow-sm space-y-3">
            <h3 className="text-sm font-black text-slate-950 flex items-center gap-2">
              <span>🛠️</span>
              <span>Internal IT & Tech Team Onboarding Checklist</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong>1. Production Database:</strong>
                <p>Deploy persistent PostgreSQL database with daily automated snapshots to store tenant member records and evidence chains of custody.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong>2. SSL / TLS Certificate:</strong>
                <p>Automate Let's Encrypt or Cloudflare TLS 1.3 certificates for <code>app.1-compliance.com</code> and customer custom domains.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong>3. Stripe Webhook Listener:</strong>
                <p>Verify Stripe webhook signature (<code>invoice.payment_succeeded</code>) to automatically provision organization seats upon customer payment.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <strong>4. Desktop App Packaging:</strong>
                <p>Run <code>npx electron-builder</code> to produce signable Windows (.exe) and macOS (.dmg) binaries for air-gapped enterprise contracts.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CHECKOUT SIMULATION MODAL */}
      {/* ========================================================================= */}
      {isCheckoutOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                <h3 className="text-sm font-bold text-white">
                  {checkoutStep === 'success'
                    ? 'Subscription Confirmed'
                    : `Subscribe to ${selectedPlan.name}`}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCheckoutOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              {checkoutStep === 'review' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Selected Tier:</span>
                      <span className="font-bold text-white">{selectedPlan.name}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Billing Cycle:</span>
                      <span className="font-mono text-cyan-400 uppercase">{billingCycle}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">User Scope:</span>
                      <span className="font-mono text-slate-300">{selectedPlan.userLimit}</span>
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex justify-between text-sm font-bold">
                      <span className="text-white">Due Today:</span>
                      <span className="text-emerald-400 font-mono">
                        ${billingCycle === 'annual' ? selectedPlan.annualMonthlyPrice * 12 : selectedPlan.monthlyPrice}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Company Name</label>
                      <input
                        type="text"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Billing Contact Email</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('payment')}
                      className="px-5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                    >
                      Continue to Payment Details →
                    </button>
                  </div>
                </div>
              )}

              {checkoutStep === 'payment' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Total Charged:</span>
                      <span className="font-mono font-bold text-white">
                        ${billingCycle === 'annual' ? selectedPlan.annualMonthlyPrice * 12 : selectedPlan.monthlyPrice}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400">
                      Payment processed securely via Stripe. 256-bit SSL encrypted.
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Card Number</label>
                      <input
                        type="text"
                        readOnly
                        value="•••• •••• •••• 4242"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-slate-300 font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">Expires</label>
                        <input
                          type="text"
                          readOnly
                          value="12 / 28"
                          className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-slate-300 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">CVC</label>
                        <input
                          type="text"
                          readOnly
                          value="•••"
                          className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-700 text-slate-300 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3">
                    <button
                      type="button"
                      onClick={() => setCheckoutStep('review')}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleCompletePayment}
                      className="px-6 py-2.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-lg"
                    >
                      Authorize & Activate Subscription
                    </button>
                  </div>
                </div>
              )}

              {checkoutStep === 'success' && (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center mx-auto text-2xl font-bold text-emerald-400">
                    ✓
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">Subscription Activated!</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      Welcome to 1-Compliance OS. Jax and the Sentinels are standing guard.
                    </p>
                  </div>
                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setIsCheckoutOpen(false)}
                      className="px-6 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                    >
                      Return to Workspace
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* ========================================================================= */}
      {/* SQUARE CHECKOUT SIMULATOR MODAL                                           */}
      {/* ========================================================================= */}
      {isSquareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl bg-slate-900 border-2 border-emerald-500/70 shadow-2xl overflow-hidden flex flex-col">
            {/* Square Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-lg font-black text-emerald-400">
                  ■
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Square Enterprise Checkout</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700">
                      Auto-Tally
                    </span>
                  </h3>
                  <div className="text-[11px] text-slate-400">
                    Unified Corporate Subscription · Single Company Billing
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsSquareModalOpen(false)}
                className="text-slate-400 hover:text-white text-base cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {!squareSuccess ? (
                <div className="space-y-4">
                  {/* Order Summary with Auto-Tally Math */}
                  {(() => {
                    const cohorts = squareUsers <= 5 ? 1 : Math.ceil(squareUsers / 100);
                    const unitPrice = squareCycle === 'annual' ? 832 : 999;
                    let monthlyCost = 0;
                    if (squareUsers <= 1) {
                      monthlyCost = squareCycle === 'annual' ? 124 : 149;
                    } else if (squareUsers <= 5) {
                      monthlyCost = squareCycle === 'annual' ? 249 : 299;
                    } else {
                      monthlyCost = cohorts * unitPrice;
                    }
                    const totalDue = squareCycle === 'annual' ? monthlyCost * 12 : monthlyCost;

                    return (
                      <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/60 space-y-2.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Company Name:</span>
                          <span className="font-bold text-white font-mono">{customBrand.companyName || '1-Compliance'}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Approved Headcount:</span>
                          <span className="font-bold text-emerald-300 font-mono">{squareUsers} Users</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Square Line Item Quantity:</span>
                          <span className="font-mono text-cyan-300 font-bold">
                            {squareUsers <= 5 ? '1 Tier' : `${cohorts} × 100-User Cohort Plan`}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Billing Term:</span>
                          <span className="font-mono text-white uppercase">{squareCycle}</span>
                        </div>
                        <div className="pt-2.5 border-t border-slate-800 flex items-center justify-between">
                          <div>
                            <div className="text-xs text-slate-400">Total Billed by Square:</div>
                            <div className="text-[10px] text-emerald-400 font-mono">
                              ${monthlyCost.toLocaleString()}/month recurring
                            </div>
                          </div>
                          <div className="text-2xl font-mono font-black text-emerald-400">
                            ${totalDue.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Payment Method Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-300 block">
                      Select Payment Method (Square Web Payments SDK):
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'card', label: '💳 Card' },
                        { id: 'apple_pay', label: '🍎 Apple Pay' },
                        { id: 'google_pay', label: '🌐 GPay' },
                        { id: 'cash_app', label: '💵 Cash App' },
                      ].map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setSquarePaymentMethod(method.id as any)}
                          className={`py-2 px-1 text-xs font-medium rounded-lg border transition-colors cursor-pointer text-center ${
                            squarePaymentMethod === method.id
                              ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          {method.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Simulated Card Fields */}
                  <div className="space-y-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Square Encrypted Tokenization Field</span>
                      <span className="text-emerald-400 font-mono">🔒 256-bit PCI DSS v4</span>
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Corporate Card Number</label>
                      <input
                        type="text"
                        readOnly
                        value="•••• •••• •••• 5821"
                        className="w-full px-3 py-2 text-xs rounded bg-slate-900 border border-slate-700 text-slate-200 font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Expires</label>
                        <input
                          type="text"
                          readOnly
                          value="10 / 29"
                          className="w-full px-3 py-2 text-xs rounded bg-slate-900 border border-slate-700 text-slate-200 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-slate-400 mb-1">Security Code (CVV)</label>
                        <input
                          type="text"
                          readOnly
                          value="•••"
                          className="w-full px-3 py-2 text-xs rounded bg-slate-900 border border-slate-700 text-slate-200 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setIsSquareModalOpen(false)}
                      className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const cohorts = squareUsers <= 5 ? 1 : Math.ceil(squareUsers / 100);
                        const unitPrice = squareCycle === 'annual' ? 832 : 999;
                        const monthly = squareUsers <= 1 ? 149 : squareUsers <= 5 ? 299 : cohorts * unitPrice;
                        const seatsTotal = squareUsers <= 1 ? 1 : squareUsers <= 5 ? 5 : cohorts * 100;

                        setSquareTxId(`sq_sub_${Date.now()}_ent`);
                        setSquareSuccess(true);
                        setCurrentSubscription({
                          plan: `Square Enterprise Scale (${cohorts} × 100-User Cohort${cohorts > 1 ? 's' : ''})`,
                          status: 'active',
                          renewalDate: 'Nov 29, 2027',
                          seatsUsed: Math.min(members.length, seatsTotal),
                          seatsTotal,
                          monthlyCost: monthly,
                        });
                      }}
                      className="px-6 py-2.5 text-xs font-black text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 rounded-xl transition-all shadow-lg cursor-pointer"
                    >
                      Authorize via Square →
                    </button>
                  </div>
                </div>
              ) : (
                /* Success View */
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center mx-auto text-3xl font-black text-emerald-300">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white">Square Subscription Activated!</h4>
                    <p className="text-xs text-slate-300">
                      Company Organization <strong className="text-white">{customBrand.companyName}</strong> has been registered.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-left space-y-1.5 text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Square Subscription ID:</span>
                      <span className="text-emerald-400 font-bold">{squareTxId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Pooled Capacity:</span>
                      <span className="text-cyan-300 font-bold">{currentSubscription.seatsTotal} Approved Seats</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Auto-Approval Whitelist:</span>
                      <span className="text-white">@{customBrand.allowedEmailDomains.join(', @')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Billing Mode:</span>
                      <span className="text-emerald-400 font-bold">1 Unified Corporate Account</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setIsSquareModalOpen(false)}
                      className="w-full py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors cursor-pointer"
                    >
                      Open Corporate Workspace
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

