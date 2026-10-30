import React, { useState } from 'react';
import { VendorItem } from '../types/compliance';
import { SENTINELS } from '../data/sentinelsData';

interface ThirdPartyVendorPortalProps {
  vendors: VendorItem[];
  onAddVendor: (v: VendorItem) => void;
  onUpdateVendor: (v: VendorItem) => void;
  onOpenSentinelHub?: (sentinelId: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export const ThirdPartyVendorPortal: React.FC<ThirdPartyVendorPortalProps> = ({
  vendors,
  onAddVendor,
  onUpdateVendor,
  onOpenSentinelHub,
  onNavigateTab,
}) => {
  const riskySentinel = SENTINELS.find((s) => s.id === 'risky') || SENTINELS[3];
  const jaxSentinel = SENTINELS[0];

  // Perspective Mode: Enterprise Client Command Center vs Simulated Vendor Guest Portal
  const [viewMode, setViewMode] = useState<'client' | 'vendor_guest'>('client');
  const [selectedVendorForGuest, setSelectedVendorForGuest] = useState<VendorItem>(
    vendors.find((v) => v.vettingStatus === 'in_review') || vendors[0]
  );

  // Invite Vendor Modal State
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteVendorName, setInviteVendorName] = useState('');
  const [inviteCategory, setInviteCategory] = useState('SaaS / Cloud Infrastructure');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteDataShared, setInviteDataShared] = useState('Customer telemetry, API logs, non-sensitive payloads');
  const [inviteDept, setInviteDept] = useState('IT & DevOps');
  const [generatedInviteLink, setGeneratedInviteLink] = useState<string | null>(null);

  // Filter & Search in Client View
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'in_review' | 'action_required'>('all');
  const [activeClientTab, setActiveClientTab] = useState<'pipeline' | 'passport_directory' | 'faq'>('pipeline');

  // Vendor Guest Portal Interactive Submission State
  const [vendorStep, setVendorStep] = useState<number>(1);
  const [vendorFormData, setVendorFormData] = useState({
    companyName: selectedVendorForGuest?.name || 'Apex Logistics & Telematics',
    contactName: 'Elena Rostova',
    contactEmail: selectedVendorForGuest?.vendorContactEmail || 'compliance@apextelematics.io',
    soc2Status: selectedVendorForGuest?.soc2Status || 'Pending Review',
    isoStatus: selectedVendorForGuest?.isoStatus || 'In Progress',
    insuranceCoverage: selectedVendorForGuest?.cyberInsuranceLimit || '$3,000,000',
    dpaAgreed: selectedVendorForGuest?.dpaSigned || false,
    // 6 quick audit questions
    qEncryptionRest: true,
    qTlsTransit: true,
    qMfaEnforced: true,
    qPenTestRecent: false,
    qBackupsDaily: true,
    qBreachSla72h: true,
  });

  const [submittedScore, setSubmittedScore] = useState<number | null>(selectedVendorForGuest?.vettingScore || null);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Calculate live score in vendor guest portal
  const calculateVendorScore = () => {
    let score = 30; // base score for completing profile
    if (vendorFormData.soc2Status.includes('Compliant')) score += 25;
    else if (vendorFormData.soc2Status.includes('Self') || vendorFormData.soc2Status.includes('Pending')) score += 12;

    if (vendorFormData.isoStatus.includes('Certified')) score += 15;
    else if (vendorFormData.isoStatus.includes('Progress')) score += 8;

    if (vendorFormData.dpaAgreed) score += 10;
    if (vendorFormData.qEncryptionRest) score += 5;
    if (vendorFormData.qTlsTransit) score += 4;
    if (vendorFormData.qMfaEnforced) score += 5;
    if (vendorFormData.qPenTestRecent) score += 4;
    if (vendorFormData.qBreachSla72h) score += 2;

    return Math.min(100, score);
  };

  const handleGenerateInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteVendorName.trim() || !inviteEmail.trim()) return;

    const token = `vtok_${Math.random().toString(36).substring(2, 9)}`;
    const newV: VendorItem = {
      id: `vnd-${Date.now()}`,
      name: inviteVendorName.trim(),
      category: inviteCategory,
      riskTier: 'Medium',
      dataShared: inviteDataShared,
      soc2Status: 'Pending Review',
      isoStatus: 'In Progress',
      dpaSigned: false,
      freeVerifyUrl: `https://www.google.com/search?q=${encodeURIComponent(inviteVendorName + ' trust center')}`,
      notes: `Invited by ${inviteDept} for automated 1-Compliance guest vetting.`,
      vettingStatus: 'invite_sent',
      vettingScore: 45,
      inviteToken: token,
      vendorContactEmail: inviteEmail.trim(),
      departmentSponsor: inviteDept,
      cyberInsuranceLimit: '$2,000,000',
      lastVettedDate: 'Just Now',
      hasVendorPassport: false,
    };

    onAddVendor(newV);
    setGeneratedInviteLink(`https://app.1-compliance.com/portal/v/${token}?client=YourEnterprise`);
  };

  const handleVendorGuestSubmit = () => {
    const calculated = calculateVendorScore();
    setSubmittedScore(calculated);
    setSubmittedSuccess(true);

    const updated: VendorItem = {
      ...selectedVendorForGuest,
      soc2Status: vendorFormData.soc2Status as any,
      isoStatus: vendorFormData.isoStatus as any,
      dpaSigned: vendorFormData.dpaAgreed,
      vettingScore: calculated,
      vettingStatus: calculated >= 80 ? 'approved' : calculated >= 60 ? 'in_review' : 'action_required',
      cyberInsuranceLimit: vendorFormData.insuranceCoverage,
      lastVettedDate: 'Today (Automated Vetting Completed)',
      notes: `Vetted via 1-Compliance Vendor Portal. Automated Score: ${calculated}/100.`,
    };

    onUpdateVendor(updated);
    setSelectedVendorForGuest(updated);
  };

  const filteredVendors = vendors.filter((v) => {
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.departmentSponsor && v.departmentSponsor.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (filterStatus === 'all') return true;
    return v.vettingStatus === filterStatus;
  });

  return (
    <div className="space-y-8">
      {/* Visual Perspective Switcher Header */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 p-6 md:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span className="font-bold">THIRD-PARTY CYBER RISK MANAGEMENT (TPCRM)</span>
              <span aria-hidden="true">·</span>
              <span>SOC 2 CC9.2 & ISO 27001 A.5.19</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              Third-Party Vendor Portal & Automated Vetting Hub
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Ensure your enterprise never gets compromised by risky third-party vendors or sub-processors. 
              Send secure single-purpose guest questionnaires with zero extra seat costs, or tap into the pre-certified 
              <strong> 1-Compliance Verified Vendor Passport</strong> network.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Included Guest Portal for Third-Party Vendors</span>
              </div>
              <span aria-hidden="true">·</span>
              <span>Zero Access to Internal Client Data</span>
              <span aria-hidden="true">·</span>
              <span>Optional $49/mo Vendor Passport</span>
            </div>
          </div>

          {/* Perspective View Switcher Toggle */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/90 shrink-0 self-start lg:self-auto space-y-3">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
              Interactive Perspective View
            </div>
            <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-lg border border-slate-800">
              <button
                type="button"
                onClick={() => setViewMode('client')}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  viewMode === 'client'
                    ? 'bg-cyan-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🏢 Client Command View</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode('vendor_guest');
                  setVendorStep(1);
                  setSubmittedSuccess(false);
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  viewMode === 'vendor_guest'
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🌐 Vendor Guest Portal</span>
                <span className="text-[10px] px-1 rounded bg-indigo-950 text-indigo-200 border border-indigo-700/60 font-mono">
                  Live Sim
                </span>
              </button>
            </div>
            <div className="text-[11px] text-slate-400">
              {viewMode === 'client'
                ? 'Managing your company’s vendor risk pipeline & invitations.'
                : 'Simulating what an invited vendor sees when completing vetting.'}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: CLIENT COMMAND CENTER VIEW */}
      {/* ========================================================================= */}
      {viewMode === 'client' && (
        <div className="space-y-6">
          {/* Subtabs for Client View */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveClientTab('pipeline')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeClientTab === 'pipeline'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Vendor Roster & Vetting Pipeline ({vendors.length})
              </button>
              <button
                onClick={() => setActiveClientTab('passport_directory')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                  activeClientTab === 'passport_directory'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Verified Vendor Passport Network</span>
                <span className="text-[10px] font-mono px-1 rounded bg-purple-950 text-purple-300 border border-purple-800">
                  $49/mo Tier
                </span>
              </button>
              <button
                onClick={() => setActiveClientTab('faq')}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeClientTab === 'faq'
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Vendor Access & Vetting Architecture
              </button>
            </div>

            {/* Primary Action Button: Invite Vendor */}
            <button
              onClick={() => {
                setGeneratedInviteLink(null);
                setIsInviteModalOpen(true);
              }}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors shadow-sm"
            >
              <span>+ Invite Vendor for Free Vetting</span>
            </button>
          </div>

          {/* TAB 1: PIPELINE & ROSTER */}
          {activeClientTab === 'pipeline' && (
            <div className="space-y-6">
              {/* Stat Counters Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-xs text-slate-400 font-mono">TOTAL MONITORED VENDORS</div>
                  <div className="text-2xl font-bold text-white mt-1 font-mono">{vendors.length}</div>
                  <div className="text-[11px] text-cyan-400 mt-1">Across 5 departments</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-emerald-950/80">
                  <div className="text-xs text-emerald-400 font-mono">VETTED & APPROVED</div>
                  <div className="text-2xl font-bold text-emerald-400 mt-1 font-mono">
                    {vendors.filter((v) => v.vettingStatus === 'approved' || (v.vettingScore || 0) >= 85).length}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Passports & SOC 2 certified</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-amber-950/80">
                  <div className="text-xs text-amber-400 font-mono">IN REVIEW / PENDING</div>
                  <div className="text-2xl font-bold text-amber-400 mt-1 font-mono">
                    {vendors.filter((v) => v.vettingStatus === 'in_review' || v.vettingStatus === 'invite_sent').length}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Awaiting questionnaire or BAA</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-red-950/80">
                  <div className="text-xs text-red-400 font-mono">CRITICAL RISK / REJECTED</div>
                  <div className="text-2xl font-bold text-red-400 mt-1 font-mono">
                    {vendors.filter((v) => v.vettingStatus === 'action_required' || v.riskTier === 'Critical' && !v.dpaSigned).length}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Action required by sponsor</div>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                <div className="w-full sm:w-80">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search vendor name, category, or department..."
                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                  <span className="text-xs text-slate-400 shrink-0">Filter:</span>
                  {(['all', 'approved', 'in_review', 'action_required'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-2.5 py-1 text-xs rounded transition-colors uppercase font-mono text-[11px] ${
                        filterStatus === status
                          ? 'bg-slate-800 text-cyan-300 font-bold border border-slate-700'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {status.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Vendor Cards List */}
              <div className="space-y-3">
                {filteredVendors.map((vendor) => {
                  const score = vendor.vettingScore || (vendor.soc2Status.includes('Compliant') ? 95 : 65);
                  const isApproved = vendor.vettingStatus === 'approved' || score >= 85;

                  return (
                    <div
                      key={vendor.id}
                      className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-base font-bold text-white">{vendor.name}</span>
                            
                            {vendor.hasVendorPassport && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-950/90 text-purple-300 border border-purple-700/80 flex items-center gap-1 shadow-sm">
                                <span>⚡ 1-Compliance Verified Passport</span>
                              </span>
                            )}

                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              isApproved
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : vendor.vettingStatus === 'in_review'
                                ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                : 'bg-red-950 text-red-300 border border-red-800'
                            }`}>
                              {isApproved ? 'Vetted & Approved' : vendor.vettingStatus === 'in_review' ? 'In Review (Pending)' : 'Action Required'}
                            </span>

                            <span className="text-xs text-slate-400 font-mono">
                              Tier: {vendor.riskTier} Risk
                            </span>
                          </div>

                          <div className="text-xs text-slate-400 flex items-center gap-3 flex-wrap">
                            <span>Category: <strong className="text-slate-300">{vendor.category}</strong></span>
                            <span>·</span>
                            <span>Internal Sponsor: <strong className="text-cyan-400">{vendor.departmentSponsor || 'IT & DevOps'}</strong></span>
                            <span>·</span>
                            <span>Contact: <strong className="text-slate-300">{vendor.vendorContactEmail || 'security@vendor.com'}</strong></span>
                          </div>
                        </div>

                        {/* Vetting Score Pill & Test Button */}
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <div className="text-[10px] text-slate-400 font-mono">VETTING SCORE</div>
                            <div className={`text-xl font-mono font-extrabold ${
                              score >= 85 ? 'text-emerald-400' : score >= 70 ? 'text-amber-400' : 'text-red-400'
                            }`}>
                              {score}/100
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedVendorForGuest(vendor);
                              setViewMode('vendor_guest');
                              setVendorStep(1);
                              setSubmittedSuccess(false);
                            }}
                            className="px-3 py-1.5 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors whitespace-nowrap"
                            title="Open Vendor Guest Portal as this vendor"
                          >
                            Open Guest Portal ↗
                          </button>
                        </div>
                      </div>

                      {/* Technical Credentials Row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80 text-xs">
                        <div className="p-2 rounded bg-slate-950/60 border border-slate-800/60">
                          <span className="text-slate-500 block text-[10px] font-mono">SOC 2 REPORT</span>
                          <span className={`font-medium ${vendor.soc2Status.includes('Compliant') ? 'text-emerald-400' : 'text-amber-300'}`}>
                            {vendor.soc2Status}
                          </span>
                        </div>
                        <div className="p-2 rounded bg-slate-950/60 border border-slate-800/60">
                          <span className="text-slate-500 block text-[10px] font-mono">ISO 27001</span>
                          <span className={`font-medium ${vendor.isoStatus.includes('Certified') ? 'text-emerald-400' : 'text-slate-300'}`}>
                            {vendor.isoStatus}
                          </span>
                        </div>
                        <div className="p-2 rounded bg-slate-950/60 border border-slate-800/60">
                          <span className="text-slate-500 block text-[10px] font-mono">CYBER INSURANCE</span>
                          <span className="font-mono text-cyan-300 font-semibold">
                            {vendor.cyberInsuranceLimit || '$2,000,000'} Coverage
                          </span>
                        </div>
                        <div className="p-2 rounded bg-slate-950/60 border border-slate-800/60">
                          <span className="text-slate-500 block text-[10px] font-mono">DATA PROCESSING AGREEMENT</span>
                          <span className={`font-medium ${vendor.dpaSigned ? 'text-emerald-400' : 'text-red-400'}`}>
                            {vendor.dpaSigned ? '✓ Signed & Enforced' : '✕ Missing Signature'}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs text-slate-400 bg-slate-950/40 p-2.5 rounded border border-slate-800/60 flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <strong className="text-slate-300">Data Shared:</strong> {vendor.dataShared}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          Last Audit Probe: {vendor.lastVettedDate || 'Oct 2026'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: VERIFIED VENDOR PASSPORT NETWORK */}
          {activeClientTab === 'passport_directory' && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 border border-purple-500/40 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-500 text-slate-950">
                    NEW FEATURE
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    The 1-Compliance Verified Vendor Passport ($49/month Network)
                  </h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  Third-party vendors hate answering 50 different 100-question spreadsheets every year for each of their clients. 
                  With the <strong>Verified Vendor Passport</strong>, third-party companies pay $49/month ($499/year) to be continuously vetted by 1-Compliance OS. 
                  Once certified, their digital trust badge and audited posture are instantly accepted by all enterprise companies subscribing to 1-Compliance OS.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-purple-900/60">
                    <div className="font-bold text-white mb-1">For Subscribed Enterprises:</div>
                    <p className="text-slate-400">Instant 1-click vendor onboarding with verified SOC 2/ISO credentials and guaranteed cyber insurance.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-purple-900/60">
                    <div className="font-bold text-white mb-1">For Third-Party Vendors:</div>
                    <p className="text-slate-400">Pay once ($49/mo) and bypass months of repetitive compliance questionnaire toil with prospective enterprise clients.</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950/70 border border-purple-900/60">
                    <div className="font-bold text-white mb-1">For Your Platform Revenue:</div>
                    <p className="text-slate-400">Creates an entirely separate B2B recurring revenue stream from thousands of vendors across the globe.</p>
                  </div>
                </div>
              </div>

              {/* Passport Pre-Approved Directory */}
              <div className="space-y-3">
                <div className="text-sm font-bold text-white">Pre-Approved Passport Directory</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      name: 'Cloudflare Edge Services',
                      category: 'WAF & DNS Infrastructure',
                      score: 99,
                      insurance: '$15M Cyber Policy',
                      cert: 'SOC 2 Type II, ISO 27001, FedRAMP High',
                      passportStatus: 'Active Passport Tier',
                    },
                    {
                      name: 'Amazon Web Services (AWS)',
                      category: 'Hyperscale Cloud Platform',
                      score: 99,
                      insurance: '$25M Cyber Policy',
                      cert: 'SOC 1/2/3, ISO 27001/17/18, PCI-DSS L1',
                      passportStatus: 'Active Passport Tier',
                    },
                    {
                      name: 'Stripe Global Payments',
                      category: 'Payment Infrastructure',
                      score: 98,
                      insurance: '$20M Cyber Policy',
                      cert: 'PCI-DSS Service Provider L1, SOC 2 Type II',
                      passportStatus: 'Active Passport Tier',
                    },
                    {
                      name: 'GitHub Enterprise Cloud',
                      category: 'Source Code & CI/CD',
                      score: 97,
                      insurance: '$20M Cyber Policy',
                      cert: 'SOC 2 Type II, ISO 27001, FedRAMP Moderate',
                      passportStatus: 'Active Passport Tier',
                    },
                  ].map((p, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white text-sm">{p.name}</div>
                          <div className="text-xs text-slate-400">{p.category}</div>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-800">
                          {p.passportStatus}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 space-y-1">
                        <div><strong>Certifications:</strong> {p.cert}</div>
                        <div><strong>Verified Insurance:</strong> {p.insurance}</div>
                      </div>
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-emerald-400 font-mono font-bold">Vetting Score: {p.score}/100</span>
                        <span className="text-[11px] text-cyan-400 font-mono">1-Click Pre-Approved ✓</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FAQ & VENDOR ACCESS ARCHITECTURE */}
          {activeClientTab === 'faq' && (
            <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 space-y-6">
              <h3 className="text-lg font-bold text-white">How 1-Compliance Solves the Third-Party Vendor Dilemma</h3>
              
              <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-white text-sm">
                    1. Why should the subscribed enterprise NOT pay for vendor seats?
                  </div>
                  <p>
                    A mid-market company with 50 employees might rely on 60 third-party vendors (SaaS tools, payroll, outsourced factory logistics, legal, IT contractors). 
                    If the compliance software charged per user or per vendor seat, the client would face massive unexpected bills. 
                    1-Compliance OS solves this by providing <strong>unlimited guest vetting links at zero additional seat fee</strong> for the subscribed customer.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-white text-sm">
                    2. Does the vendor see the enterprise client's internal compliance data?
                  </div>
                  <p className="text-emerald-400 font-semibold">
                    Absolute zero internal access. 
                  </p>
                  <p>
                    The guest link grants access exclusively to a sandboxed, one-way submission portal where the vendor provides their company information, 
                    attests to security controls, uploads their SOC 2/ISO reports, and executes the Data Processing Agreement. 
                    They cannot view other vendors, internal policies, employee directories, or risk matrices.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-white text-sm">
                    3. How do we monetize third-party vendors without burdening our customers?
                  </div>
                  <p>
                    Through the <strong>1-Compliance Verified Vendor Passport ($49/month or $499/year)</strong>. 
                    While standard guest links are free for one-time questionnaire submission to a specific client, vendors can choose to upgrade to a Passport. 
                    With a Passport, 1-Compliance continuously monitors the vendor’s public attack surface, validates their renewals, 
                    and publishes their verified trust profile to hundreds of enterprise buyers on the platform.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: SIMULATED THIRD-PARTY VENDOR GUEST PORTAL */}
      {/* ========================================================================= */}
      {viewMode === 'vendor_guest' && (
        <div className="space-y-6">
          {/* Guest Portal Top Banner */}
          <div className="p-5 rounded-xl bg-indigo-950/30 border border-indigo-500/40 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-900 border border-cyan-400 p-0.5 shrink-0">
                <img
                  src={jaxSentinel.image}
                  alt="Jax Sentinel"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <div className="text-xs font-mono text-cyan-400 font-bold uppercase">
                  GUEST VENDOR VETTING ENVIRONMENT · TOKEN: {selectedVendorForGuest.inviteToken || 'vtok_demo881'}
                </div>
                <h2 className="text-base font-bold text-white">
                  Welcome, {selectedVendorForGuest.name}
                </h2>
                <div className="text-xs text-slate-400">
                  You were invited by your enterprise client to complete the 1-Compliance Security & Risk Attestation.
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('client')}
                className="px-3.5 py-1.5 text-xs font-semibold rounded bg-slate-800 hover:bg-slate-700 text-white transition-colors"
              >
                ← Return to Client Command View
              </button>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="grid grid-cols-4 gap-2 text-xs font-medium">
            {[
              { num: 1, label: '1. Vendor Profile' },
              { num: 2, label: '2. Certifications & Legal' },
              { num: 3, label: '3. Technical Security Audit' },
              { num: 4, label: '4. Vetting Scorecard' },
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => setVendorStep(s.num)}
                className={`py-2 px-3 rounded-lg text-center transition-all ${
                  vendorStep === s.num
                    ? 'bg-indigo-600 text-white font-bold shadow-md'
                    : vendorStep > s.num
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* STEP 1: VENDOR PROFILE */}
          {vendorStep === 1 && (
            <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Step 1: Organization & Primary Security Contact</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Provide your company details and designated Data Protection Officer (DPO) or Security Lead.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Legal Company Name</label>
                  <input
                    type="text"
                    value={vendorFormData.companyName}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, companyName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Security Contact Name</label>
                  <input
                    type="text"
                    value={vendorFormData.contactName}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, contactName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Security Contact Email</label>
                  <input
                    type="email"
                    value={vendorFormData.contactEmail}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, contactEmail: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Cyber Liability Insurance Policy</label>
                  <select
                    value={vendorFormData.insuranceCoverage}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, insuranceCoverage: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="$1,000,000">$1,000,000 Policy Coverage</option>
                    <option value="$2,000,000">$2,000,000 Policy Coverage</option>
                    <option value="$3,000,000">$3,000,000 Policy Coverage</option>
                    <option value="$5,000,000">$5,000,000 Policy Coverage</option>
                    <option value="$10,000,000+">$10,000,000+ Enterprise Policy</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setVendorStep(2)}
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-lg transition-colors"
                >
                  Continue to Step 2: Certifications →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: CERTIFICATIONS & LEGAL */}
          {vendorStep === 2 && (
            <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Step 2: Security Certifications & Data Protection Agreement</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Upload or attest to your third-party independent audit reports and execute our mutual DPA.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                  <label className="text-xs font-semibold text-white block">SOC 2 Report Status</label>
                  <select
                    value={vendorFormData.soc2Status}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, soc2Status: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Compliant (SOC 2 Type II)">SOC 2 Type II Certified (Independent CPA Auditor report available)</option>
                    <option value="SOC 3 Public">SOC 3 Public Attestation</option>
                    <option value="Self-Attested">Self-Attested Security Framework</option>
                    <option value="Pending Review">Currently In-Audit / Scheduled within 90 days</option>
                  </select>
                </div>

                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                  <label className="text-xs font-semibold text-white block">ISO/IEC 27001 Certification Status</label>
                  <select
                    value={vendorFormData.isoStatus}
                    onChange={(e) => setVendorFormData({ ...vendorFormData, isoStatus: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="ISO 27001 Certified">ISO/IEC 27001:2022 Certified</option>
                    <option value="In Progress">Implementation In Progress</option>
                    <option value="Not Certified">Not Certified</option>
                  </select>
                </div>

                <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="dpa-checkbox"
                      checked={vendorFormData.dpaAgreed}
                      onChange={(e) => setVendorFormData({ ...vendorFormData, dpaAgreed: e.target.checked })}
                      className="mt-1 accent-indigo-500 w-4 h-4 cursor-pointer"
                    />
                    <div>
                      <label htmlFor="dpa-checkbox" className="text-xs font-bold text-white cursor-pointer">
                        Execute Mutual Data Processing Agreement (DPA) & Standard Contractual Clauses (SCCs)
                      </label>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        By checking this box, you contractually agree that customer data will be processed solely in accordance with explicit client instructions, with AES-256 encryption, and subject to 72-hour breach notification SLA.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setVendorStep(1)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setVendorStep(3)}
                  className="px-5 py-2 text-xs font-bold text-slate-950 bg-indigo-400 hover:bg-indigo-300 rounded-lg transition-colors"
                >
                  Continue to Step 3: Security Controls →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: TECHNICAL SECURITY AUDIT QUESTIONS */}
          {vendorStep === 3 && (
            <div className="p-6 rounded-xl bg-slate-900/70 border border-slate-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Step 3: Rapid 6-Point Technical Audit</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Answer these standard security questions. 1-Compliance automatically grades your risk score.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    key: 'qEncryptionRest',
                    title: 'Is all client data encrypted at rest using AES-256 or equivalent?',
                    desc: 'Database instances, disk volumes, object storage, and backup snapshots.',
                  },
                  {
                    key: 'qTlsTransit',
                    title: 'Is all data in transit enforced via TLS 1.2 or TLS 1.3 with HSTS?',
                    desc: 'No unencrypted HTTP endpoints or deprecated cipher suites allowed.',
                  },
                  {
                    key: 'qMfaEnforced',
                    title: 'Is Multi-Factor Authentication (MFA) strictly enforced for all employee logins?',
                    desc: 'Including Google Workspace, AWS, GitHub, VPNs, and corporate identity providers.',
                  },
                  {
                    key: 'qPenTestRecent',
                    title: 'Have you undergone an independent penetration test in the past 12 months?',
                    desc: 'Conducted by a qualified third-party cyber firm with remediated high/critical findings.',
                  },
                  {
                    key: 'qBackupsDaily',
                    title: 'Are production database backups conducted daily and tested annually?',
                    desc: 'Immutable backups stored across an isolated region or account.',
                  },
                  {
                    key: 'qBreachSla72h',
                    title: 'Do you commit to notifying our client within 72 hours of a confirmed security incident?',
                    desc: 'In compliance with GDPR Article 33 and modern enterprise vendor risk contracts.',
                  },
                ].map((q) => (
                  <div
                    key={q.key}
                    className="p-3.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-4"
                  >
                    <div>
                      <div className="text-xs font-semibold text-white">{q.title}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{q.desc}</div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => setVendorFormData({ ...vendorFormData, [q.key]: true })}
                        className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
                          (vendorFormData as any)[q.key] === true
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        YES
                      </button>
                      <button
                        type="button"
                        onClick={() => setVendorFormData({ ...vendorFormData, [q.key]: false })}
                        className={`px-3 py-1 text-xs font-bold rounded transition-colors ${
                          (vendorFormData as any)[q.key] === false
                            ? 'bg-red-500 text-white'
                            : 'bg-slate-900 text-slate-400 hover:text-white'
                        }`}
                      >
                        NO
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setVendorStep(2)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleVendorGuestSubmit();
                    setVendorStep(4);
                  }}
                  className="px-6 py-2.5 text-xs font-extrabold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-lg"
                >
                  Submit Vetting Assessment & Generate Scorecard →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SCORECARD & PASSPORT UPSELL */}
          {vendorStep === 4 && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-slate-900/80 border border-slate-800 space-y-6 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center mx-auto text-2xl font-bold text-emerald-400">
                  ✓
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-extrabold text-white">Vetting Assessment Completed!</h3>
                  <p className="text-xs text-slate-400">
                    Your assessment results have been cryptographically recorded and shared with your enterprise client.
                  </p>
                </div>

                <div className="inline-block p-6 rounded-xl bg-slate-950 border border-slate-800 min-w-[280px]">
                  <div className="text-xs font-mono text-slate-400">YOUR COMPLIANCE VETTING SCORE</div>
                  <div className="text-5xl font-mono font-extrabold text-emerald-400 my-2">
                    {submittedScore || calculateVendorScore()}/100
                  </div>
                  <div className="text-xs font-mono font-bold text-cyan-300">
                    TIER 1 APPROVED VENDOR STATUS
                  </div>
                </div>

                {/* Upsell to Verified Vendor Passport */}
                <div className="p-6 rounded-xl bg-gradient-to-r from-purple-950/60 via-slate-900 to-indigo-950/60 border border-purple-500/60 text-left space-y-4 max-w-2xl mx-auto">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-400 text-slate-950">
                      TIRED OF SECURITY QUESTIONNAIRES?
                    </span>
                    <h4 className="text-sm font-bold text-white">Upgrade to 1-Compliance Verified Vendor Passport</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Instead of having your engineering team spend weeks answering repetitive compliance questionnaires for every enterprise deal, 
                    subscribe to the <strong>Verified Vendor Passport ($49/month or $499/year)</strong>. 
                    Your pre-vetted badge and SOC 2/ISO package will be immediately accepted by all 1-Compliance OS corporate subscribers!
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <div className="text-xs font-mono text-purple-300">
                      $49/month · Billed annually at $499 · Instant network trust
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        if (onNavigateTab) onNavigateTab('subscriptions');
                      }}
                      className="px-4 py-2 text-xs font-bold text-slate-950 bg-purple-400 hover:bg-purple-300 rounded transition-colors whitespace-nowrap shadow-md"
                    >
                      Subscribe to Vendor Passport ($49/mo) →
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setViewMode('client')}
                    className="px-5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 rounded-lg transition-colors"
                  >
                    Return to Enterprise Client Command Center
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: INVITE VENDOR FOR GUEST VETTING */}
      {/* ========================================================================= */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Invite Vendor for Secure Vetting</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Included in your enterprise subscription. The vendor receives a restricted single-purpose compliance audit portal.
                </p>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="text-slate-400 hover:text-white text-lg leading-none"
              >
                ✕
              </button>
            </div>

            {!generatedInviteLink ? (
              <form onSubmit={handleGenerateInvite} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Third-Party Vendor Name</label>
                  <input
                    type="text"
                    required
                    value={inviteVendorName}
                    onChange={(e) => setInviteVendorName(e.target.value)}
                    placeholder="e.g. Datadog, Slack, Fastly, Custom Contractor"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-300">Vendor Category</label>
                    <select
                      value={inviteCategory}
                      onChange={(e) => setInviteCategory(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="SaaS / Cloud Infrastructure">SaaS / Cloud Infrastructure</option>
                      <option value="Supply Chain & IoT Telematics">Supply Chain & IoT Telematics</option>
                      <option value="Factory Equipment & Robotics">Factory Equipment & Robotics</option>
                      <option value="Contractor & HR Services">Contractor & HR Services</option>
                      <option value="Payment & Financial Services">Payment & Financial Services</option>
                      <option value="Legal & Advisory">Legal & Advisory</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-300">Internal Sponsor Dept</label>
                    <select
                      value={inviteDept}
                      onChange={(e) => setInviteDept(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="IT & DevOps">IT & DevOps</option>
                      <option value="Factory & Operations">Factory & Operations</option>
                      <option value="HR & People">HR & People</option>
                      <option value="Finance & Billing">Finance & Billing</option>
                      <option value="Legal & CCO">Legal & CCO</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Vendor Security Contact Email</label>
                  <input
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="e.g. security@vendor.com or legal@vendor.com"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">What company data will they access?</label>
                  <input
                    type="text"
                    value={inviteDataShared}
                    onChange={(e) => setInviteDataShared(e.target.value)}
                    placeholder="e.g. Customer emails, application logs, or zero PII"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsInviteModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                  >
                    Generate Secure Vetting Link
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-emerald-950/60 border border-emerald-500/60 space-y-2">
                  <div className="text-xs font-mono text-emerald-400 font-bold">
                    ✓ SECURE GUEST INVITATION CREATED
                  </div>
                  <p className="text-xs text-slate-300">
                    Send this single-use link to <strong>{inviteVendorName}</strong> ({inviteEmail}). 
                    They can complete their SOC 2/ISO 27001 evidence upload and risk questionnaire without accessing any of your internal company data.
                  </p>
                </div>

                <div className="p-3 rounded bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 break-all select-all">
                  {generatedInviteLink}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(generatedInviteLink);
                      alert('Copied invite link to clipboard!');
                    }}
                    className="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors"
                  >
                    Copy Link to Clipboard
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsInviteModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
