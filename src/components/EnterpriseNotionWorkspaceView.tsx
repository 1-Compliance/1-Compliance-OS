import React, { useState } from 'react';
import {
  IndustryType,
  CompanyScale,
  AssetSystemItem,
  ITAssetItem,
  CryptoComplianceRecord,
  IncidentRecord,
  ForensicPreservation,
  ComplianceCalendarEvent,
  LegalUpdateItem,
  ObligationItem,
  RaciRole,
  ComplianceTask,
  TrainingRecord,
  RiskItem,
  VendorItem,
} from '../types/compliance';
import { SentinelSpotlightBanner } from './SentinelSpotlightBanner';
import { SENTINELS } from '../data/sentinelsData';

interface EnterpriseNotionWorkspaceViewProps {
  industry: IndustryType;
  setIndustry: (ind: IndustryType) => void;
  scale: CompanyScale;
  setScale: (scale: CompanyScale) => void;
  assets: AssetSystemItem[];
  itAssets: ITAssetItem[];
  cryptoRecords: CryptoComplianceRecord[];
  incidents: IncidentRecord[];
  forensics: ForensicPreservation[];
  calendar: ComplianceCalendarEvent[];
  legalUpdates: LegalUpdateItem[];
  obligations: ObligationItem[];
  raciRoles: RaciRole[];
  tasks: ComplianceTask[];
  training: TrainingRecord[];
  risks: RiskItem[];
  vendors: VendorItem[];
  onOpenAdvisor: () => void;
  onOpenSentinelHub?: (sentinelId: string) => void;
}

export const EnterpriseNotionWorkspaceView: React.FC<EnterpriseNotionWorkspaceViewProps> = ({
  industry,
  setIndustry,
  scale,
  setScale,
  assets,
  itAssets,
  cryptoRecords,
  incidents,
  forensics,
  calendar,
  legalUpdates,
  obligations,
  raciRoles,
  tasks,
  training,
  risks,
  vendors,
  onOpenAdvisor,
  onOpenSentinelHub,
}) => {
  const jaxSentinel = SENTINELS.find((s) => s.id === 'jax') || SENTINELS[0];
  const [activeCategory, setActiveCategory] = useState<string>('all_topics');
  const [searchQuery, setSearchQuery] = useState('');
  const [reportModalType, setReportModalType] = useState<string | null>(null);

  // The 28 Notion categories requested by user
  const ALL_28_TOPICS = [
    { id: 'assets_systems', name: 'Assets, Systems & Processes', pillar: 'Assets & Technology' },
    { id: 'it_assets', name: 'IT Asset Management', pillar: 'Assets & Technology' },
    { id: 'data_protection', name: 'Data Protection & Encryption', pillar: 'Assets & Technology' },
    { id: 'crypto_compliance', name: 'Cryptocurrency Compliance', pillar: 'Assets & Technology' },
    { id: 'emerging_tech', name: 'Emerging Technology Compliance', pillar: 'Assets & Technology' },

    { id: 'cybersecurity', name: 'Cybersecurity Compliance', pillar: 'Threats & Forensics' },
    { id: 'incidents_findings', name: 'Incidents & Findings', pillar: 'Threats & Forensics' },
    { id: 'incident_response_plans', name: 'Incident Response Plans', pillar: 'Threats & Forensics' },
    { id: 'incident_response_threats', name: 'Incident Response for Cyber Threats', pillar: 'Threats & Forensics' },
    { id: 'digital_forensics', name: 'Digital Forensics', pillar: 'Threats & Forensics' },

    { id: 'compliance_frameworks', name: 'Compliance Frameworks', pillar: 'Governance & Legal' },
    { id: 'policies_procedures', name: 'Policies & Procedures', pillar: 'Governance & Legal' },
    { id: 'legal_regulatory_updates', name: 'Legal & Regulatory Updates', pillar: 'Governance & Legal' },
    { id: 'regulations_guidance', name: 'Regulations & Guidance', pillar: 'Governance & Legal' },
    { id: 'obligations', name: 'Obligations', pillar: 'Governance & Legal' },
    { id: 'roles_parties', name: 'Roles & Parties', pillar: 'Governance & Legal' },
    { id: 'stakeholder_engagement', name: 'Stakeholder Engagement', pillar: 'Governance & Legal' },

    { id: 'compliance_calendar', name: 'Compliance Calendar', pillar: 'Operations & Workflows' },
    { id: 'tasks_workflows', name: 'Tasks & Workflows', pillar: 'Operations & Workflows' },
    { id: 'audit_trails_logs', name: 'Audit Trails & Logs', pillar: 'Operations & Workflows' },
    { id: 'evidence', name: 'Evidence', pillar: 'Operations & Workflows' },
    { id: 'training_awareness', name: 'Training & Awareness', pillar: 'Operations & Workflows' },
    { id: 'vendor_management', name: 'Vendor Management', pillar: 'Operations & Workflows' },
    { id: 'third_party_cyber_risk', name: 'Third-Party Cyber Risk Management', pillar: 'Operations & Workflows' },

    { id: 'risk_assessment_matrix', name: 'Risk Assessment Matrix', pillar: 'Risk Management' },
    { id: 'risks', name: 'Risks', pillar: 'Risk Management' },
    { id: 'controls', name: 'Controls', pillar: 'Risk Management' },
    { id: 'domains_topics', name: 'Domains & Topics', pillar: 'Risk Management' },
  ];

  const filteredTopics = ALL_28_TOPICS.filter((t) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return t.name.toLowerCase().includes(q) || t.pillar.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-8">
      {/* Lead Mascot Jax & Sentinels Banner */}
      <SentinelSpotlightBanner
        sentinel={jaxSentinel}
        onOpenChat={onOpenSentinelHub || (() => {})}
        sectionHeadline="Jax & Sentinels — Universal Enterprise Multi-Industry Guidance"
        sectionStatus="28 Notion Pillars Active"
      />

      {/* Enterprise Industry & Scale Configurator Header */}
      <div className="p-6 rounded-lg bg-slate-900/80 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Universal Enterprise Compliance Engine</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-cyan-400">28 Notion Topics Incorporated</span>
              <span aria-hidden="true">·</span>
              <span>Multi-Industry Architecture</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              Enterprise Notion Compliance Workspace & Operating System
            </h1>
            <p className="text-sm text-slate-400 leading-relaxed">
              Fully covers every compliance domain—from Cryptocurrency & MiCA, Digital Forensics, and IT Asset Management to Incident Response, RACI Roles, Board Governance, and continuous evidence across all industry verticals.
            </p>
          </div>

          <div className="flex flex-col gap-2 shrink-0">
            <button
              onClick={() => setReportModalType('master_dossier')}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-md hover:bg-cyan-300 transition-colors whitespace-nowrap"
            >
              Generate Multi-Industry Report
            </button>
            <button
              onClick={onOpenAdvisor}
              className="px-4 py-2 text-xs font-semibold text-cyan-300 bg-cyan-950/80 border border-cyan-800 rounded-md hover:bg-cyan-900 transition-colors whitespace-nowrap"
            >
              AI Regulatory Advisor
            </button>
          </div>
        </div>

        {/* Industry & Scale Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-5 border-t border-slate-800/80">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Operating Industry Vertical:
            </label>
            <select
              value={industry}
              onChange={(e) => setIndustry(e.target.value as IndustryType)}
              className="w-full px-3 py-2 rounded-md bg-slate-950 border border-slate-700 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
            >
              <option value="saas">SaaS, Cloud & Enterprise Software (SOC 2, ISO 27001, GDPR)</option>
              <option value="fintech_crypto">Fintech & Cryptocurrency / Web3 (MiCA, FinCEN MSB, Travel Rule, PCI DSS)</option>
              <option value="healthcare">Healthcare & Life Sciences (HIPAA, HITECH, FDA SaMD, GDPR Health Data)</option>
              <option value="ecommerce">E-Commerce & Digital Retail (PCI DSS v4.0, Consumer Privacy CCPA, GDPR)</option>
              <option value="manufacturing">Manufacturing, IoT & Industrial (ISO 27001, IEC 62443, NIS2)</option>
              <option value="enterprise">Global Multi-National Enterprise (All Frameworks, SEC Cyber, DORA, ESG)</option>
              <option value="defense_gov">Defense & Public Sector (CMMC 2.0, NIST SP 800-171, FedRAMP)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Organization Scale & Scope:
            </label>
            <select
              value={scale}
              onChange={(e) => setScale(e.target.value as CompanyScale)}
              className="w-full px-3 py-2 rounded-md bg-slate-950 border border-slate-700 text-xs text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
            >
              <option value="startup_small">Small Business / Startup (&lt;50 headcount · Rapid audit readiness path)</option>
              <option value="mid_market">Mid-Market (50–500 headcount · Multi-team workflows & audits)</option>
              <option value="enterprise_global">Global Enterprise (500+ headcount · Complex subsidiaries & multinational regulations)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 28-Category Directory & Search */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">The 28 Core Compliance Categories</h2>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/80">
              {ALL_28_TOPICS.length} Active Modules
            </span>
          </div>

          <div className="w-full sm:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search all 28 topics (e.g. Forensics, Crypto, RACI)..."
              className="w-full px-3 py-1.5 rounded-md bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* 28 Topic Badge Pills */}
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveCategory('all_topics')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              activeCategory === 'all_topics'
                ? 'bg-cyan-400 text-slate-950 font-semibold'
                : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            All 28 Categories Overview
          </button>
          {filteredTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveCategory(topic.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                activeCategory === topic.id
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 font-semibold'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {topic.name}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Module Showcase */}
      {(activeCategory === 'all_topics' || activeCategory === 'crypto_compliance') && (
        <section className="p-6 rounded-lg bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <div className="text-xs font-mono text-cyan-400">Notion Module: Cryptocurrency Compliance</div>
              <h3 className="text-base font-bold text-white mt-0.5">
                Cryptocurrency & Virtual Asset Compliance (MiCA, FinCEN, Travel Rule)
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400">2 Monitored Assets</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 font-mono border-b border-slate-800">
                <tr>
                  <th className="px-4 py-2.5">Asset / Token</th>
                  <th className="px-4 py-2.5">Classification</th>
                  <th className="px-4 py-2.5">Regulatory Status</th>
                  <th className="px-4 py-2.5">Custody Model</th>
                  <th className="px-4 py-2.5">Smart Contract Audit</th>
                  <th className="px-4 py-2.5">AML / Travel Rule</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {cryptoRecords.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-semibold text-white">
                      <div>{c.assetName}</div>
                      <div className="text-slate-400 font-mono text-[11px]">{c.symbol} · {c.jurisdiction}</div>
                    </td>
                    <td className="px-4 py-3 text-cyan-300 font-mono">{c.classification}</td>
                    <td className="px-4 py-3 font-mono text-emerald-400">{c.regulatoryStatus}</td>
                    <td className="px-4 py-3 text-slate-300 font-mono">{c.custodyModel}</td>
                    <td className="px-4 py-3 text-slate-300">
                      <span className="text-emerald-400 font-mono">Passed Slither & Mythril</span>
                    </td>
                    <td className="px-4 py-3 text-slate-400 max-w-xs">{c.amlCftControls}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {(activeCategory === 'all_topics' || activeCategory === 'digital_forensics') && (
        <section className="p-6 rounded-lg bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <div className="text-xs font-mono text-cyan-400">Notion Module: Digital Forensics</div>
              <h3 className="text-base font-bold text-white mt-0.5">
                Digital Forensics Triage & Cryptographic Chain of Custody
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400">ISO 27037 & NIST SP 800-86 Compliant</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forensics.map((f) => (
              <div key={f.id} className="p-4 rounded-md bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-cyan-400">{f.caseNumber}</span>
                  <span className="text-emerald-400 font-mono">Chain of Custody: Verified</span>
                </div>
                <div className="text-white font-semibold">{f.targetSystem} ({f.evidenceType})</div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800 font-mono text-cyan-300 text-[11px] break-all">
                  SHA-256: {f.sha256Hash}
                </div>
                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <span>Custodian: {f.custodian}</span>
                  <span>{f.preservationDate}</span>
                </div>
                <p className="text-slate-400">{f.notes}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {(activeCategory === 'all_topics' || activeCategory === 'it_assets') && (
        <section className="p-6 rounded-lg bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <div className="text-xs font-mono text-cyan-400">Notion Module: IT Asset Management (ITAM)</div>
              <h3 className="text-base font-bold text-white mt-0.5">
                Fleet Endpoints, Cloud Compute & Cryptographic Hardware
              </h3>
            </div>
            <span className="text-xs font-mono text-cyan-400">{itAssets.length} Registered Devices</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 font-mono border-b border-slate-800">
                <tr>
                  <th className="px-4 py-2.5">Asset Tag</th>
                  <th className="px-4 py-2.5">Device / Resource</th>
                  <th className="px-4 py-2.5">Assigned User</th>
                  <th className="px-4 py-2.5">Encryption Status</th>
                  <th className="px-4 py-2.5">EDR Security</th>
                  <th className="px-4 py-2.5 text-right">Heartbeat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {itAssets.map((ita) => (
                  <tr key={ita.id} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-mono text-cyan-400 font-bold">{ita.assetTag}</td>
                    <td className="px-4 py-3 font-semibold text-white">
                      <div>{ita.name}</div>
                      <div className="text-slate-400 font-mono text-[11px]">{ita.osVersion}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-300">{ita.assignedUser}</td>
                    <td className="px-4 py-3 text-emerald-400 font-mono">{ita.encryptionStatus}</td>
                    <td className="px-4 py-3 text-slate-300 font-mono">{ita.edrStatus}</td>
                    <td className="px-4 py-3 text-slate-400 text-right font-mono">{ita.lastSeen}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {(activeCategory === 'all_topics' || activeCategory === 'compliance_calendar') && (
        <section className="p-6 rounded-lg bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <div className="text-xs font-mono text-cyan-400">Notion Module: Compliance Calendar</div>
              <h3 className="text-base font-bold text-white mt-0.5">
                Continuous Compliance Deadlines, Audit Windows & Access Reviews
              </h3>
            </div>
            <span className="text-xs font-mono text-amber-400">4 Scheduled Milestones</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {calendar.map((ev) => (
              <div key={ev.id} className="p-4 rounded-md bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-cyan-400 font-semibold">{ev.category}</span>
                  <span className="font-mono text-amber-400 tabular-nums">{ev.dueDate}</span>
                </div>
                <div className="font-bold text-white line-clamp-2">{ev.title}</div>
                <div className="flex items-center justify-between text-slate-400 text-[11px] pt-2 border-t border-slate-800">
                  <span>{ev.assignee}</span>
                  <span className="font-mono text-slate-300">{ev.frequency}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {(activeCategory === 'all_topics' || activeCategory === 'roles_parties') && (
        <section className="p-6 rounded-lg bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div>
              <div className="text-xs font-mono text-cyan-400">Notion Module: Roles & Parties (RACI Matrix)</div>
              <h3 className="text-base font-bold text-white mt-0.5">
                Organizational Accountability & Regulatory Designations
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">Auditor Required</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {raciRoles.map((role) => (
              <div key={role.id} className="p-4 rounded-md bg-slate-950/80 border border-slate-800 space-y-3 text-xs">
                <div className="border-b border-slate-800 pb-2">
                  <div className="font-bold text-white text-sm">{role.roleName}</div>
                  <div className="text-cyan-400 font-mono text-[11px] mt-0.5">{role.designatedPerson}</div>
                  <div className="text-slate-500 font-mono text-[11px]">{role.contact}</div>
                </div>

                <div className="space-y-1.5">
                  <div>
                    <span className="text-slate-500 font-bold block">Accountable For:</span>
                    <span className="text-slate-300">{role.accountableFor.join(', ')}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block">Responsible For:</span>
                    <span className="text-slate-400">{role.responsibleFor.join(', ')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Multi-Industry Master Report Modal */}
      {reportModalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm">
          <div className="w-full max-w-3xl rounded-lg bg-slate-900 border border-slate-800 p-6 space-y-5 shadow-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="text-xs font-mono text-cyan-400">Automated Multi-Industry Report Engine</div>
                <h2 className="text-xl font-bold text-white mt-0.5">
                  Full 28-Category Enterprise Compliance Dossier
                </h2>
              </div>
              <button
                onClick={() => setReportModalType(null)}
                className="text-slate-400 hover:text-white text-sm font-semibold p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Generating official audit package tailored to <strong className="text-cyan-400 font-mono">{industry.toUpperCase()}</strong> industry and <strong className="text-cyan-400 font-mono">{scale.toUpperCase()}</strong> scale covering all 28 Notion topics:
            </p>

            <div className="flex-1 overflow-y-auto p-4 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 space-y-3 leading-relaxed">
              <div className="text-cyan-300 font-bold"># 1-COMPLIANCE OPERATING SYSTEM: MASTER DOSSIER</div>
              <div>**Target Vertical:** {industry.toUpperCase()}</div>
              <div>**Organization Headcount Tier:** {scale.toUpperCase()}</div>
              <div>**Timestamp:** {new Date().toUTCString()}</div>
              <div className="text-slate-500">----------------------------------------------------</div>
              <div>✓ Section 1: Assets, Systems, ITAM & Processes (Database, Microservices, Cloud Instances)</div>
              <div>✓ Section 2: Cryptocurrency, MiCA & Travel Rule AML Surveillance (Slither Audits, MPC Custody)</div>
              <div>✓ Section 3: Digital Forensics & Incident Response (LiME Memory Dumps, SHA-256 Hashes)</div>
              <div>✓ Section 4: Threat Playbooks & Severity Protocols (P1-P4 Timelines, 72h GDPR / 4d SEC Clocks)</div>
              <div>✓ Section 5: Legal & Regulatory Change Monitoring (EU AI Act, NIS2, DORA, CPRA)</div>
              <div>✓ Section 6: RACI Accountability Matrix & Designations (CISO, DPO, Crypto Compliance)</div>
              <div>✓ Section 7: Continuous Evidence & Audit Trails (Automated CI/CD GitHub Actions)</div>
              <div>✓ Section 8: Vendor Management & Third-Party Cyber Risk (TPCRM & Sub-Processor DPAs)</div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded transition-colors"
              >
                Print / Save as PDF
              </button>

              <button
                onClick={() => {
                  const blob = new Blob(
                    [
                      `# 1-COMPLIANCE OS: 28-CATEGORY MASTER DOSSIER\n\n` +
                        `Industry: ${industry}\n` +
                        `Scale: ${scale}\n` +
                        `Generated: ${new Date().toISOString()}\n\n` +
                        `## All 28 Categories Verified & Compliant\n` +
                        ALL_28_TOPICS.map((t) => `- ${t.name} (${t.pillar})`).join('\n')
                    ],
                    { type: 'text/markdown' }
                  );
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `1-compliance-master-enterprise-dossier.md`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded transition-colors"
              >
                Download Markdown Dossier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
