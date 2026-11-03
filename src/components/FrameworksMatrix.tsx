import React, { useState } from 'react';
import { Framework, ControlItem, ControlStatus } from '../types/compliance';
import { SentinelSpotlightBanner } from './SentinelSpotlightBanner';
import { SENTINELS } from '../data/sentinelsData';

interface FrameworksMatrixProps {
  frameworks: Framework[];
  controls: ControlItem[];
  selectedFrameworkId: string;
  onSelectFramework: (id: string) => void;
  onUpdateControlStatus: (controlId: string, status: ControlStatus) => void;
  onOpenAdvisor: () => void;
  onOpenSentinelHub?: (sentinelId: string) => void;
}

export const FrameworksMatrix: React.FC<FrameworksMatrixProps> = ({
  frameworks,
  controls,
  selectedFrameworkId,
  onSelectFramework,
  onUpdateControlStatus,
  onOpenAdvisor,
  onOpenSentinelHub,
}) => {
  const jaxSentinel = SENTINELS.find((s) => s.id === 'jax') || SENTINELS[0];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedControlId, setExpandedControlId] = useState<string | null>(null);

  const categories = [
    'all',
    'Access & Identity',
    'Infrastructure & Cloud',
    'Application Security',
    'Data Protection',
    'Governance & People',
    'AI Governance',
  ];

  const currentFramework = frameworks.find((f) => f.id === selectedFrameworkId);

  // Filter controls
  const filteredControls = controls.filter((ctrl) => {
    // Framework match
    const matchesFw =
      selectedFrameworkId === 'all' ||
      ctrl.frameworks.some((f) => {
        if (selectedFrameworkId === 'soc2') return f.toLowerCase().includes('soc 2') || f.includes('CC');
        if (selectedFrameworkId === 'iso27001') return f.toLowerCase().includes('iso 27001') || f.includes('A.');
        if (selectedFrameworkId === 'hipaa') return f.toLowerCase().includes('hipaa');
        if (selectedFrameworkId === 'gdpr') return f.toLowerCase().includes('gdpr');
        if (selectedFrameworkId === 'pcidss') return f.toLowerCase().includes('pci');
        if (selectedFrameworkId === 'nistcsf') return f.toLowerCase().includes('nist');
        if (selectedFrameworkId === 'eu_ai_act') return f.toLowerCase().includes('ai act') || f.includes('AI');
        return true;
      });

    // Category match
    const matchesCat = selectedCategory === 'all' || ctrl.category === selectedCategory;

    // Search query match
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      ctrl.title.toLowerCase().includes(q) ||
      ctrl.code.toLowerCase().includes(q) ||
      ctrl.description.toLowerCase().includes(q) ||
      ctrl.freeTool.toLowerCase().includes(q) ||
      ctrl.frameworks.some((f) => f.toLowerCase().includes(q));

    return matchesFw && matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Jax Mascot Lead Sentinel Spotlight */}
      <SentinelSpotlightBanner
        sentinel={jaxSentinel}
        onOpenChat={onOpenSentinelHub || (() => {})}
        sectionHeadline="Jax — Lead Cross-Framework Control Orchestrator"
        sectionStatus="Continuous Cross-Mapping Active"
      />

      {/* Framework Header & Selector */}
      <div className="p-6 rounded-lg bg-slate-900/80 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <span>Frameworks & Controls Engine</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-cyan-400">Cross-Mapped Controls</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              {currentFramework ? currentFramework.name : 'All Monitored Controls'}
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl">
              {currentFramework
                ? currentFramework.description
                : 'Unified control matrix mapped across SOC 2, ISO 27001:2022, HIPAA, GDPR, PCI DSS v4.0, NIST CSF 2.0, and EU AI Act.'}
            </p>
          </div>

          <button
            onClick={onOpenAdvisor}
            className="px-4 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-md hover:bg-cyan-300 transition-colors shrink-0"
          >
            AI Control Gap Analysis
          </button>
        </div>

        {/* Framework Tabs (Segmented Button Controls) */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-slate-800/80">
          <button
            onClick={() => onSelectFramework('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              selectedFrameworkId === 'all'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Frameworks ({controls.length})
          </button>
          {frameworks.map((fw) => (
            <button
              key={fw.id}
              onClick={() => onSelectFramework(fw.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                selectedFrameworkId === fw.id
                  ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {fw.badge}
            </button>
          ))}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search controls by code, title, framework (e.g. CC6.1, MFA, Prowler, encryption)..."
            className="w-full px-4 py-2 rounded-md bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1.5 text-xs rounded transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-800 text-white font-medium'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Controls List */}
      <div className="space-y-3">
        {filteredControls.length === 0 ? (
          <div className="p-8 text-center rounded-lg bg-slate-900/40 border border-slate-800 text-slate-400 text-xs">
            No controls matched your search or category filters.
          </div>
        ) : (
          filteredControls.map((ctrl) => {
            const isExpanded = expandedControlId === ctrl.id;
            return (
              <div
                key={ctrl.id}
                className="rounded-lg bg-slate-900/60 border border-slate-800 overflow-hidden transition-colors"
              >
                {/* Control Header Row */}
                <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-cyan-400">{ctrl.code}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-slate-400">{ctrl.category}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="font-mono text-xs text-slate-400">{ctrl.frameworks.slice(0, 3).join(', ')}</span>
                    </div>

                    <h3 className="text-sm font-semibold text-white">
                      {ctrl.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                      {ctrl.description}
                    </p>
                  </div>

                  {/* Actions & Status Controls */}
                  <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
                    {/* Status Selector */}
                    <select
                      value={ctrl.status}
                      aria-label={`Status for control ${ctrl.code}`}
                      onChange={(e) => onUpdateControlStatus(ctrl.id, e.target.value as ControlStatus)}
                      className={`text-xs font-mono font-medium rounded px-2.5 py-1 bg-slate-950 border focus:outline-none ${
                        ctrl.status === 'compliant'
                          ? 'text-emerald-400 border-emerald-800/80'
                          : ctrl.status === 'in_progress'
                          ? 'text-amber-400 border-amber-800/80'
                          : 'text-rose-400 border-rose-800/80'
                      }`}
                    >
                      <option value="compliant">Compliant</option>
                      <option value="in_progress">In Progress</option>
                      <option value="action_needed">Action Needed</option>
                      <option value="not_applicable">N/A</option>
                    </select>

                    <button
                      onClick={() => setExpandedControlId(isExpanded ? null : ctrl.id)}
                      className="px-3 py-1 text-xs text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded transition-colors whitespace-nowrap"
                    >
                      {isExpanded ? 'Hide Details' : 'View Fix & Evidence'}
                    </button>
                  </div>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="p-4 border-t border-slate-800/80 bg-slate-950/70 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Left: Free Tool & Automated Verification */}
                      <div className="space-y-1.5">
                        <div className="text-xs text-slate-400 font-medium">Free Tool Alternative:</div>
                        <div className="text-xs text-cyan-300 font-mono p-2 rounded bg-slate-900 border border-slate-800">
                          {ctrl.freeTool}
                        </div>
                        <div className="text-xs text-slate-400 mt-2">Automated Check Mechanism:</div>
                        <div className="text-xs text-slate-300 p-2 rounded bg-slate-900 border border-slate-800 font-mono">
                          {ctrl.automatedCheck}
                        </div>
                      </div>

                      {/* Right: Cross-Framework Mapping */}
                      <div className="space-y-1.5">
                        <div className="text-xs text-slate-400 font-medium">Satisfies Cross-Framework Clauses:</div>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800 flex flex-wrap gap-1.5">
                          {ctrl.frameworks.map((f, i) => (
                            <span key={i} className="text-xs font-mono text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                              {f}
                            </span>
                          ))}
                        </div>
                        <div className="text-xs text-slate-400 mt-2">Last Automated Probe:</div>
                        <div className="text-xs text-slate-400 font-mono">
                          {ctrl.lastChecked} · <span className="text-emerald-400">{ctrl.evidenceCount} verified artifacts</span>
                        </div>
                      </div>
                    </div>

                    {ctrl.remediationSnippet && (
                      <div className="mt-2 space-y-1">
                        <div className="text-xs font-semibold text-white">Automated Remediation / CLI Implementation:</div>
                        <pre className="p-3 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 overflow-x-auto leading-relaxed">
                          {ctrl.remediationSnippet}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
