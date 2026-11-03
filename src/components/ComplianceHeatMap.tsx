import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import { Framework, ControlItem } from '../types/compliance';

interface ComplianceHeatMapProps {
  frameworks: Framework[];
  controls: ControlItem[];
  onSelectFrameworkAndCategory: (frameworkId: string, category?: string) => void;
}

interface CellData {
  frameworkId: string;
  frameworkName: string;
  frameworkBadge: string;
  category: string;
  totalControls: number;
  compliantCount: number;
  inProgressCount: number;
  actionNeededCount: number;
  riskScore: number; // 0 (nominal/safe) to 100 (critical risk)
  complianceRate: number; // 0% to 100%
  controlCodes: string[];
}

export const ComplianceHeatMap: React.FC<ComplianceHeatMapProps> = ({
  frameworks,
  controls,
  onSelectFrameworkAndCategory,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [activeMetric, setActiveMetric] = useState<'risk' | 'compliance'>('risk');
  const [hoveredCell, setHoveredCell] = useState<CellData | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);

  const categories = useMemo(
    () => [
      'Access & Identity',
      'Infrastructure & Cloud',
      'Application Security',
      'Data Protection',
      'Governance & People',
      'AI Governance',
    ],
    []
  );

  // Compute 2D matrix data
  const matrixData: CellData[] = useMemo(() => {
    const data: CellData[] = [];

    frameworks.forEach((fw) => {
      categories.forEach((cat) => {
        // Find matching controls
        const matching = controls.filter((ctrl) => {
          const matchesCat = ctrl.category === cat;
          const matchesFw = ctrl.frameworks.some((f) => {
            if (fw.id === 'soc2') return f.toLowerCase().includes('soc 2') || f.includes('CC') || f.includes('A1.');
            if (fw.id === 'iso27001') return f.toLowerCase().includes('iso 27001') || f.includes('A.');
            if (fw.id === 'hipaa') return f.toLowerCase().includes('hipaa');
            if (fw.id === 'gdpr') return f.toLowerCase().includes('gdpr');
            if (fw.id === 'pcidss') return f.toLowerCase().includes('pci');
            if (fw.id === 'nistcsf') return f.toLowerCase().includes('nist');
            if (fw.id === 'eu_ai_act') return f.toLowerCase().includes('ai act') || f.includes('AI');
            return false;
          });
          return matchesCat && matchesFw;
        });

        const total = matching.length;
        const compliant = matching.filter((c) => c.status === 'compliant').length;
        const inProgress = matching.filter((c) => c.status === 'in_progress').length;
        const actionNeeded = matching.filter((c) => c.status === 'action_needed').length;

        let riskScore = 15; // default nominal
        let complianceRate = 100;

        if (total > 0) {
          complianceRate = Math.round((compliant / total) * 100);
          // Risk score calculation: action needed weighs heavy (80-100), in progress moderate (40-60)
          const riskRaw = (actionNeeded * 100 + inProgress * 45) / total;
          riskScore = Math.min(100, Math.max(10, Math.round(riskRaw)));
        } else {
          // No controls mapped to this specific category for this framework
          complianceRate = 100;
          riskScore = 8;
        }

        data.push({
          frameworkId: fw.id,
          frameworkName: fw.name,
          frameworkBadge: fw.badge,
          category: cat,
          totalControls: total,
          compliantCount: compliant,
          inProgressCount: inProgress,
          actionNeededCount: actionNeeded,
          riskScore,
          complianceRate,
          controlCodes: matching.map((c) => c.code),
        });
      });
    });

    return data;
  }, [frameworks, controls, categories]);

  // Overall analytics
  const highestRiskCell = useMemo(() => {
    return [...matrixData].sort((a, b) => b.riskScore - a.riskScore)[0];
  }, [matrixData]);

  const avgRiskScore = useMemo(() => {
    const active = matrixData.filter((d) => d.totalControls > 0);
    if (!active.length) return 0;
    return Math.round(active.reduce((acc, d) => acc + d.riskScore, 0) / active.length);
  }, [matrixData]);

  // Render D3 Heatmap
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const containerWidth = containerRef.current.clientWidth || 900;
    const margin = { top: 40, right: 20, bottom: 20, left: 140 };
    const width = containerWidth - margin.left - margin.right;
    const height = frameworks.length * 48; // compact row height per saas dashboard guidelines

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    svg
      .attr('width', containerWidth)
      .attr('height', height + margin.top + margin.bottom)
      .attr('viewBox', `0 0 ${containerWidth} ${height + margin.top + margin.bottom}`);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X Scale (Categories)
    const xScale = d3
      .scaleBand<string>()
      .domain(categories)
      .range([0, width])
      .padding(0.08);

    // Y Scale (Frameworks)
    const yScale = d3
      .scaleBand<string>()
      .domain(frameworks.map((f) => f.badge))
      .range([0, height])
      .padding(0.1);

    // Color Scales
    // Risk Concentration Scale: Low Risk (slate-emerald) -> Moderate Risk (amber) -> High Risk (rose)
    const riskColorScale = d3
      .scaleLinear<string>()
      .domain([0, 25, 60, 100])
      .range(['#064e3b', '#0f766e', '#d97706', '#e11d48']);

    // Compliance Rate Scale: 0% (rose) -> 70% (amber) -> 100% (emerald/cyan)
    const complianceColorScale = d3
      .scaleLinear<string>()
      .domain([0, 60, 85, 100])
      .range(['#881337', '#d97706', '#0284c7', '#059669']);

    // X Axis Header labels
    g.selectAll('.x-axis-label')
      .data(categories)
      .enter()
      .append('text')
      .attr('class', 'x-axis-label')
      .attr('x', (d) => (xScale(d) || 0) + xScale.bandwidth() / 2)
      .attr('y', -14)
      .attr('text-anchor', 'middle')
      .attr('fill', '#334155')
      .attr('font-size', '11px')
      .attr('font-weight', '700')
      .text((d) => {
        // Shorten long labels on small widths
        if (width < 600) {
          if (d === 'Infrastructure & Cloud') return 'Cloud';
          if (d === 'Application Security') return 'AppSec';
          if (d === 'Governance & People') return 'Gov';
          if (d === 'Access & Identity') return 'Identity';
        }
        return d;
      });

    // Y Axis Framework labels
    g.selectAll('.y-axis-label')
      .data(frameworks)
      .enter()
      .append('text')
      .attr('class', 'y-axis-label')
      .attr('x', -14)
      .attr('y', (d) => (yScale(d.badge) || 0) + yScale.bandwidth() / 2 + 4)
      .attr('text-anchor', 'end')
      .attr('fill', '#0f172a')
      .attr('font-size', '12px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('font-weight', '700')
      .text((d) => d.badge);

    // Heatmap Cells
    const cellGroups = g
      .selectAll('.cell-group')
      .data(matrixData)
      .enter()
      .append('g')
      .attr('class', 'cell-group')
      .attr('cursor', 'pointer')
      .on('mouseenter', function (event, d) {
        d3.select(this)
          .select('rect')
          .attr('stroke', '#38bdf8')
          .attr('stroke-width', 2);

        const rect = (this as SVGGElement).getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect();

        if (containerRect) {
          setTooltipPos({
            x: rect.left - containerRect.left + rect.width / 2,
            y: rect.top - containerRect.top - 8,
          });
        }
        setHoveredCell(d);
      })
      .on('mouseleave', function () {
        d3.select(this)
          .select('rect')
          .attr('stroke', '#1e293b')
          .attr('stroke-width', 1);

        setHoveredCell(null);
        setTooltipPos(null);
      })
      .on('click', (_event, d) => {
        onSelectFrameworkAndCategory(d.frameworkId, d.category);
      });

    // Cell Rectangles
    cellGroups
      .append('rect')
      .attr('x', (d) => xScale(d.category) || 0)
      .attr('y', (d) => yScale(d.frameworkBadge) || 0)
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .attr('rx', 4)
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 1)
      .attr('fill', (d) => {
        if (d.totalControls === 0) return '#0f172a'; // slate-900 neutral
        return activeMetric === 'risk'
          ? riskColorScale(d.riskScore)
          : complianceColorScale(d.complianceRate);
      })
      .attr('opacity', 0.9);

    // Cell Text Labels (tabular values)
    cellGroups
      .append('text')
      .attr('x', (d) => (xScale(d.category) || 0) + xScale.bandwidth() / 2)
      .attr('y', (d) => (yScale(d.frameworkBadge) || 0) + yScale.bandwidth() / 2 + 4)
      .attr('text-anchor', 'middle')
      .attr('fill', '#ffffff')
      .attr('font-size', '11px')
      .attr('font-family', 'JetBrains Mono, monospace')
      .attr('font-variant-numeric', 'tabular-nums')
      .attr('font-weight', '600')
      .attr('pointer-events', 'none')
      .text((d) => {
        if (d.totalControls === 0) return '—';
        if (activeMetric === 'risk') {
          return `${d.riskScore}%`;
        }
        return `${d.complianceRate}%`;
      });
  }, [frameworks, categories, matrixData, activeMetric, onSelectFrameworkAndCategory]);

  return (
    <section className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-5 text-slate-800">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <span>D3.js Visualization Engine</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-cyan-700 font-bold">Cross-Framework Risk Density</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Vector Canvas</span>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
            Compliance Risk Concentration Heat-Map
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-2xl font-medium">
            Visual matrix mapping vulnerability & compliance risk concentration across all 7 standards and security categories. Click any cell to jump directly to corresponding controls.
          </p>
        </div>

        {/* Metric Selector & Legend */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
          {/* Segmented Metric Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveMetric('risk')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                activeMetric === 'risk'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Risk Concentration
            </button>
            <button
              onClick={() => setActiveMetric('compliance')}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap ${
                activeMetric === 'compliance'
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Compliance Rate
            </button>
          </div>
        </div>
      </div>

      {/* KPI Quick Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
        <div>
          <span className="text-slate-500 block font-medium">System Average Risk Index:</span>
          <span className="font-mono font-extrabold text-cyan-700 text-sm tabular-nums mt-0.5 block">
            {avgRiskScore}% (Controlled / Nominal)
          </span>
        </div>
        <div>
          <span className="text-slate-500 block font-medium">Highest Concentration Area:</span>
          <span className="font-mono font-extrabold text-amber-700 text-sm mt-0.5 block truncate">
            {highestRiskCell ? `${highestRiskCell.category} (${highestRiskCell.frameworkBadge})` : 'None'}
          </span>
        </div>
        <div>
          <span className="text-slate-500 block font-medium">Interactive Capability:</span>
          <span className="text-slate-700 font-medium text-xs mt-0.5 block">
            Click any heat cell to filter unified control matrix
          </span>
        </div>
      </div>

      {/* D3 Heatmap Container */}
      <div ref={containerRef} className="relative overflow-x-auto w-full pt-2">
        <svg ref={svgRef} className="w-full min-w-[700px] select-none block" />

        {/* Floating Custom Tooltip */}
        {hoveredCell && tooltipPos && (
          <div
            className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-full mb-2 w-64 p-3 rounded-md bg-slate-950/95 border border-slate-700 text-xs shadow-xl backdrop-blur-md transition-all"
            style={{ left: tooltipPos.x, top: tooltipPos.y }}
          >
            <div className="flex items-center justify-between text-slate-400 border-b border-slate-800 pb-1.5 mb-2">
              <span className="font-mono font-bold text-cyan-400">{hoveredCell.frameworkBadge}</span>
              <span className="text-slate-400">{hoveredCell.category}</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Risk Concentration:</span>
                <span className={`font-mono font-bold ${
                  hoveredCell.riskScore > 65
                    ? 'text-rose-400'
                    : hoveredCell.riskScore > 35
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}>
                  {hoveredCell.riskScore}% ({hoveredCell.riskScore > 65 ? 'Elevated' : hoveredCell.riskScore > 35 ? 'Moderate' : 'Low'})
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-400">Compliance Rate:</span>
                <span className="font-mono text-emerald-400 font-semibold">{hoveredCell.complianceRate}%</span>
              </div>

              <div className="flex items-center justify-between text-slate-400">
                <span>Active Controls:</span>
                <span className="font-mono tabular-nums text-white">
                  {hoveredCell.compliantCount} compliant · {hoveredCell.actionNeededCount} action needed
                </span>
              </div>

              {hoveredCell.controlCodes.length > 0 && (
                <div className="pt-1.5 text-slate-400">
                  <span className="text-slate-500">Controls: </span>
                  <span className="font-mono text-cyan-300">{hoveredCell.controlCodes.join(', ')}</span>
                </div>
              )}
            </div>

            <div className="mt-2 pt-2 border-t border-slate-800 text-[10px] text-cyan-400 font-semibold text-center">
              Click to view {hoveredCell.frameworkBadge} controls →
            </div>
          </div>
        )}
      </div>

      {/* Heatmap Legend */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span>Legend ({activeMetric === 'risk' ? 'Risk Concentration' : 'Compliance Rate'}):</span>
          <div className="flex items-center gap-1">
            <span className="w-3.5 h-3.5 rounded-sm bg-[#064e3b] inline-block border border-slate-800" />
            <span className="font-mono text-[11px] text-slate-300">0-25% (Safe)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3.5 h-3.5 rounded-sm bg-[#0f766e] inline-block border border-slate-800" />
            <span className="font-mono text-[11px] text-slate-300">26-50% (Nominal)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3.5 h-3.5 rounded-sm bg-[#d97706] inline-block border border-slate-800" />
            <span className="font-mono text-[11px] text-slate-300">51-75% (Moderate)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3.5 h-3.5 rounded-sm bg-[#e11d48] inline-block border border-slate-800" />
            <span className="font-mono text-[11px] text-slate-300">76-100% (High Risk)</span>
          </div>
        </div>

        <div className="text-slate-500 font-mono text-[11px]">
          7 Frameworks × 6 Technical Domains · 42 Continuous Vector Nodes
        </div>
      </div>
    </section>
  );
};
