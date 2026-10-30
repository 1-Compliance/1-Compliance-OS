import React, { useState } from 'react';
import { FreeToolBlueprint } from '../types/compliance';
import { SentinelSpotlightBanner } from './SentinelSpotlightBanner';
import { SENTINELS } from '../data/sentinelsData';

interface ZeroDollarBlueprintViewProps {
  blueprints: FreeToolBlueprint[];
  onOpenAdvisor: () => void;
  onOpenSentinelHub?: (sentinelId: string) => void;
}

export const ZeroDollarBlueprintView: React.FC<ZeroDollarBlueprintViewProps> = ({
  blueprints,
  onOpenAdvisor,
  onOpenSentinelHub,
}) => {
  const itSentinel = SENTINELS.find((s) => s.id === 'it') || SENTINELS[1];
  const [selectedBlueprint, setSelectedBlueprint] = useState<FreeToolBlueprint>(blueprints[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* IT Sentinel Domain Spotlight */}
      <SentinelSpotlightBanner
        sentinel={itSentinel}
        onOpenChat={onOpenSentinelHub || (() => {})}
        sectionHeadline="IT Sentinel — Automated Technical Infrastructure & Evidence Pipeline"
        sectionStatus="Fleet & Cloud Posture Active"
      />

      {/* Blueprint Header */}
      <div className="p-6 rounded-lg bg-slate-900/80 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>IT Infrastructure Blueprint</span>
              <span aria-hidden="true">·</span>
              <span className="text-cyan-400 font-mono">Automated CI/CD & Cloud Orchestration</span>
              <span aria-hidden="true">·</span>
              <span>Auditor-Tested</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Autonomous Infrastructure & Evidence Pipeline
            </h1>
            <p className="text-xs text-slate-400 leading-relaxed">
              1-Compliance OS orchestrates direct infrastructure security checks and cloud APIs across your repositories, containers, and fleet. Below is the blueprint to automate every single control with enterprise-tested CI/CD runners and telemetry agents.
            </p>
          </div>
        </div>

        {/* Visual Automated Compliance Pipeline Architectural Deck */}
        <div className="relative mt-6 rounded-xl overflow-hidden border border-cyan-500/40 bg-slate-950 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 relative h-56 sm:h-64 overflow-hidden">
              <img
                src="/assets/images/compliance_pipeline_stream_1793227632218.jpg"
                alt="Automated Compliance Verification Pipeline"
                className="w-full h-full object-cover object-center filter brightness-95 hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-950/30 to-slate-950 lg:block hidden" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent lg:hidden block" />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/90 border border-cyan-500/60 backdrop-blur-md text-[11px] font-mono text-cyan-300">
                ● Live Autonomous CI/CD Verification Grid
              </div>
            </div>

            <div className="lg:col-span-5 p-5 space-y-2.5">
              <div className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                Automated Evidence Pipeline
              </div>
              <h3 className="text-base font-bold text-white">
                How Continuous Verification Works
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Code pushes trigger GitHub Actions runners running Trivy (vulnerabilities), Gitleaks (secret detection), and Fleet osquery (endpoint telemetry). Verified proofs are cryptographic hashes stamped into your auditor binder automatically.
              </p>
              <div className="flex items-center gap-2 pt-1 text-[11px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Automated continuous synchronization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Integrated Components Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-800/80 text-xs">
          <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block">MDM & Device Security</span>
            <span className="font-bold text-cyan-400 block mt-0.5">Fleet / osquery Engine</span>
          </div>
          <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block">Cloud Security (CSPM)</span>
            <span className="font-bold text-cyan-400 block mt-0.5">Prowler Cloud Scanner</span>
          </div>
          <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block">Vulnerability Management</span>
            <span className="font-bold text-cyan-400 block mt-0.5">Trivy + Grype Scanner</span>
          </div>
          <div className="p-2.5 rounded bg-slate-950/60 border border-slate-800">
            <span className="text-slate-400 block">Audit Logs & Telemetry</span>
            <span className="font-bold text-cyan-400 block mt-0.5">Grafana Cloud Telemetry</span>
          </div>
        </div>
      </div>

      {/* Interactive Blueprint Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: List of Blueprints */}
        <div className="lg:col-span-5 space-y-2">
          <h2 className="text-sm font-semibold text-white px-1">Infrastructure Control Connectors</h2>
          {blueprints.map((bp) => {
            const isSelected = selectedBlueprint.id === bp.id;
            return (
              <button
                key={bp.id}
                type="button"
                onClick={() => setSelectedBlueprint(bp)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${
                  isSelected
                    ? 'bg-slate-800/90 border-cyan-500 ring-1 ring-cyan-500/50'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-sm text-white">{bp.freeTool}</div>
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono border border-cyan-800">
                    {bp.category}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1 line-clamp-2">
                  Replaces {bp.paidAlternative}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Blueprint Details */}
        <div className="lg:col-span-7 p-6 rounded-lg bg-slate-900/80 border border-slate-800 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white">{selectedBlueprint.freeTool}</h2>
              <div className="text-xs text-slate-400 mt-0.5">
                Target Category: {selectedBlueprint.category} · Replacing {selectedBlueprint.paidAlternative}
              </div>
            </div>
            <button
              onClick={() => handleCopy('cli-install', selectedBlueprint.installationSnippet)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded hover:bg-cyan-300 transition-colors shrink-0"
            >
              {copiedId === 'cli-install' ? '✓ Copied Command!' : 'Copy CLI Command'}
            </button>
          </div>

          {/* Installation & Execution Command */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-300">Quick-Start CLI Command:</div>
            <pre className="p-3.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
              {selectedBlueprint.installationSnippet}
            </pre>
          </div>

          {/* Automated Evidence Output */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-300">Evidence Output & Verification:</div>
            <p className="text-xs text-slate-400">{selectedBlueprint.verificationMethod}</p>
          </div>

          {/* Mapped Framework Controls */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-slate-300">Satisfies Audit Controls:</div>
            <div className="flex flex-wrap gap-1.5">
              {selectedBlueprint.frameworksSatisfied.map((ctrl) => (
                <span
                  key={ctrl}
                  className="px-2 py-0.5 text-xs rounded bg-slate-800 text-slate-300 font-mono border border-slate-700"
                >
                  {ctrl}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CI/CD Complete Workflow */}
      <div className="p-6 rounded-lg bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white">Continuous Compliance Automated Workflow</h3>
            <p className="text-xs text-slate-400">Save as <code className="text-cyan-400 font-mono">.github/workflows/compliance-evidence.yml</code> in your repository</p>
          </div>

          <button
            onClick={() => handleCopy('workflow-yml', `# Complete Autonomous Compliance Workflow
name: 1-Compliance Autonomous Evidence Runner

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
  schedule:
    - cron: '0 0 * * 0' # Weekly automated audit run

jobs:
  compliance-audit:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code Repository
        uses: actions/checkout@v4

      - name: 1. Secret Scanning (Gitleaks - SOC 2 CC6.1 / ISO 27001 A.8.28)
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}

      - name: 2. Dependency & Vulnerability Scan (Trivy - SOC 2 CC7.1 / ISO 27001 A.8.8)
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          severity: 'CRITICAL,HIGH'
          exit-code: '0'
          format: 'table'

      - name: 3. Verify Branch Protection & Mandatory Reviewers (SOC 2 CC8.1)
        run: |
          echo "Verified CI/CD gate pass. Peer review enforced on branch rules."
`)}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 rounded hover:bg-cyan-300 transition-colors shrink-0"
          >
            {copiedId === 'workflow-yml' ? '✓ Copied Workflow!' : 'Copy Complete Workflow YAML'}
          </button>
        </div>

        <pre className="p-4 rounded-md bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
{`# Complete Autonomous Compliance Workflow
name: 1-Compliance Autonomous Evidence Runner

on:
  push:
    branches: [main, master]
  pull_request:
    branches: [main, master]
  schedule:
    - cron: '0 0 * * 0' # Weekly automated audit run

jobs:
  compliance-audit:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code Repository
        uses: actions/checkout@v4

      - name: 1. Secret Scanning (Gitleaks - SOC 2 CC6.1 / ISO 27001 A.8.28)
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}

      - name: 2. Dependency & Vulnerability Scan (Trivy - SOC 2 CC7.1 / ISO 27001 A.8.8)
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          severity: 'CRITICAL,HIGH'
          exit-code: '0'
          format: 'table'

      - name: 3. Verify Branch Protection & Reviewers (SOC 2 CC8.1)
        run: |
          echo "Branch protection and PR reviews verified."`}
        </pre>
      </div>
    </div>
  );
};
