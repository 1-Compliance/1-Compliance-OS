import React, { useState } from 'react';
import { PolicyDocument, EvidenceItem } from '../types/compliance';
import { askComplianceAI } from '../services/api';
import { SentinelSpotlightBanner } from './SentinelSpotlightBanner';
import { SENTINELS } from '../data/sentinelsData';

interface PolicyEngineViewProps {
  policies: PolicyDocument[];
  evidence: EvidenceItem[];
  onUpdatePolicy: (updated: PolicyDocument) => void;
  onAddEvidence: (newEvidence: EvidenceItem) => void;
  onOpenSentinelHub?: (sentinelId: string) => void;
}

export const PolicyEngineView: React.FC<PolicyEngineViewProps> = ({
  policies,
  evidence,
  onUpdatePolicy,
  onAddEvidence,
  onOpenSentinelHub,
}) => {
  const hrSentinel = SENTINELS.find((s) => s.id === 'hr') || SENTINELS[4];
  const [activeSubTab, setActiveSubTab] = useState<'policies' | 'evidence'>('policies');
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyDocument>(policies[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(selectedPolicy.content);
  const [companyName, setCompanyName] = useState('1-Compliance Organization');
  const [techStack, setTechStack] = useState('GitHub, AWS, Cloudflare, Google Workspace, Supabase');
  const [tailoring, setTailoring] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  const handleSelectPolicy = (p: PolicyDocument) => {
    setSelectedPolicy(p);
    setEditedContent(p.content);
    setIsEditing(false);
  };

  const handleSavePolicy = () => {
    const updated: PolicyDocument = {
      ...selectedPolicy,
      content: editedContent,
      lastReviewed: new Date().toISOString().split('T')[0],
      status: 'approved',
    };
    onUpdatePolicy(updated);
    setSelectedPolicy(updated);
    setIsEditing(false);

    // Also automatically log evidence that policy was reviewed and sealed!
    onAddEvidence({
      id: `evi-pol-${Date.now()}`,
      controlId: 'ctrl-10',
      controlTitle: 'Formal Information Security Policy & Annual Approval',
      title: `${selectedPolicy.title} Executive Approval`,
      source: '1-Compliance Policy Engine',
      freeRunner: 'Internal Governance Ledger',
      status: 'verified',
      timestamp: new Date().toLocaleString(),
      details: `Policy ${selectedPolicy.title} (v${selectedPolicy.version}) reviewed and approved for ${companyName}.`,
    });
  };

  const handleAITailor = async () => {
    setTailoring(true);
    try {
      const response = await askComplianceAI('tailor-policy', {
        policyName: selectedPolicy.title,
        companyName,
        techStack,
      });

      if (response.result) {
        setEditedContent(response.result);
        setIsEditing(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTailoring(false);
    }
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(isEditing ? editedContent : selectedPolicy.content);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* HR Sentinel Domain Spotlight */}
      <SentinelSpotlightBanner
        sentinel={hrSentinel}
        onOpenChat={onOpenSentinelHub || (() => {})}
        sectionHeadline="HR Sentinel — Governance, People Security & Access Reviews"
        sectionStatus="Policy Attestations Active"
      />

      {/* Top Header & Sub-Tab Navigation */}
      <div className="p-6 rounded-lg bg-slate-900/80 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>Governance & Evidence Repository</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-cyan-400">Automated Enterprise Policy Engine</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Security Policies & Evidence Repository
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              Auditor-vetted policy templates mapped to SOC 2, ISO 27001, and HIPAA. Tailor with AI in seconds, approve in-app, and automatically link to audit evidence lockers.
            </p>
          </div>

          {/* Sub-tab segmented toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 shrink-0">
            <button
              onClick={() => setActiveSubTab('policies')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                activeSubTab === 'policies'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Security Policies ({policies.length})
            </button>
            <button
              onClick={() => setActiveSubTab('evidence')}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
                activeSubTab === 'evidence'
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Evidence Locker ({evidence.length})
            </button>
          </div>
        </div>
      </div>

      {activeSubTab === 'policies' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Policy Catalog Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-1">
              Audit-Ready Policies
            </h2>
            {policies.map((p) => {
              const isSelected = selectedPolicy.id === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => handleSelectPolicy(p)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/80 shadow-sm'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-cyan-400">v{p.version}</span>
                    <span className="text-emerald-400 font-mono text-xs">Approved</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-1">{p.summary}</div>
                </div>
              );
            })}
          </div>

          {/* Active Policy View & Editor */}
          <div className="lg:col-span-8 p-6 rounded-lg bg-slate-900/70 border border-slate-800 space-y-5">
            {/* Policy Title and Metadata Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{selectedPolicy.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>Owner: {selectedPolicy.owner}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">Reviewed: {selectedPolicy.lastReviewed}</span>
                </div>
                <h2 className="text-xl font-bold text-white mt-1">{selectedPolicy.title}</h2>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyMarkdown}
                  className="px-3 py-1.5 text-xs text-slate-300 hover:text-white bg-slate-800 rounded transition-colors whitespace-nowrap"
                >
                  {copyFeedback ? '✓ Copied Markdown' : 'Copy Markdown'}
                </button>
                {isEditing ? (
                  <button
                    onClick={handleSavePolicy}
                    className="px-4 py-1.5 text-xs font-semibold text-slate-950 bg-emerald-400 rounded hover:bg-emerald-300 transition-colors whitespace-nowrap"
                  >
                    Save & Approve Policy
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditedContent(selectedPolicy.content);
                      setIsEditing(true);
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-cyan-400 border border-cyan-800 bg-cyan-950/60 rounded hover:bg-cyan-900/60 transition-colors whitespace-nowrap"
                  >
                    Edit Policy
                  </button>
                )}
              </div>
            </div>

            {/* AI Tailoring Control Panel */}
            <div className="p-3.5 rounded-md bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-300">
                  AI Policy Customizer (Gemini 3.8 Flash)
                </span>
                <span className="text-xs text-slate-500">Auto-tailor to your organization</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Company / Organization Name:</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Cloud & Infrastructure Stack:</label>
                  <input
                    type="text"
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    className="w-full px-3 py-1.5 rounded bg-slate-900 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={handleAITailor}
                disabled={tailoring}
                className="w-full py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded hover:bg-cyan-300 transition-colors disabled:opacity-50"
              >
                {tailoring ? 'Generating tailored policy via Gemini AI...' : 'Tailor Policy for My Company & Tech Stack'}
              </button>
            </div>

            {/* Markdown Display / Editor */}
            {isEditing ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Markdown Editor</span>
                  <span>Click "Save & Approve Policy" above when done</span>
                </div>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows={18}
                  className="w-full p-4 rounded-md bg-slate-950 border border-slate-700 text-xs font-mono text-slate-200 leading-relaxed focus:outline-none focus:border-cyan-400 resize-y"
                />
              </div>
            ) : (
              <div className="p-4 rounded-md bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 leading-relaxed max-h-[500px] overflow-y-auto whitespace-pre-wrap">
                {selectedPolicy.content}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Evidence Locker Sub-Tab */
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">Continuous Audit Evidence Locker</h2>
              <p className="text-xs text-slate-400">
                Timestamped, cryptographically verifiable proof items collected across Git, Cloud, Endpoints, and 1-Compliance Scanner.
              </p>
            </div>
            <button
              onClick={() => {
                const sampleEvidence: EvidenceItem = {
                  id: `evi-manual-${Date.now()}`,
                  controlId: 'ctrl-06',
                  controlTitle: 'Quarterly Access Review & Least Privilege Audit',
                  title: 'Manual Access Review Sign-Off (Q4)',
                  source: '1-Compliance Access Ledger',
                  freeRunner: 'Internal Review Log',
                  status: 'verified',
                  timestamp: new Date().toLocaleString(),
                  details: 'Quarterly review of 12 GitHub organization members and AWS IAM users completed. Zero unneeded accounts.',
                };
                onAddEvidence(sampleEvidence);
              }}
              className="px-3.5 py-1.5 text-xs font-semibold text-cyan-300 bg-cyan-950/60 border border-cyan-800 rounded hover:bg-cyan-900/60 transition-colors"
            >
              + Log Access Review Evidence
            </button>
          </div>

          <div className="space-y-3">
            {evidence.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-cyan-400 font-semibold">{item.controlTitle}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-400">{item.source}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400">{item.details}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center text-xs">
                  <span className="font-mono tabular-nums text-slate-400">{item.timestamp}</span>
                  <span className="font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/60">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
