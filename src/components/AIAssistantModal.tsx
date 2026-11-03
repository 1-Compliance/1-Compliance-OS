import React, { useState } from 'react';
import { askComplianceAI } from '../services/api';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose }) => {
  const [activeMode, setActiveMode] = useState<'gap' | 'custom' | 'blueprint'>('gap');
  const [companyName, setCompanyName] = useState('1-Compliance Organization');
  const [techStack, setTechStack] = useState('GitHub, AWS, Cloudflare, Google Workspace, PostgreSQL, Docker');
  const [customQuestion, setCustomQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleRunAnalysis = async () => {
    setLoading(true);
    setAiResponse(null);
    try {
      if (activeMode === 'gap') {
        const res = await askComplianceAI('gap-analysis', {
          companyName,
          techStack: techStack.split(',').map((s) => s.trim()),
          frameworks: ['SOC 2 Type II', 'ISO 27001:2022', 'HIPAA', 'GDPR'],
        });
        setAiResponse(res.result);
      } else if (activeMode === 'blueprint') {
        const res = await askComplianceAI('zero-dollar-blueprint', {
          targetFramework: 'SOC 2 Type II & ISO 27001:2022',
        });
        setAiResponse(res.result);
      } else {
        const res = await askComplianceAI('custom-query', {
          question: customQuestion,
          companyName,
          techStack,
        });
        setAiResponse(res.result);
      }
    } catch (err: any) {
      console.error(err);
      setAiResponse('Unable to reach AI advisor. Ensure your server is running and check your internet connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-3xl rounded-lg bg-slate-900 border border-slate-800 p-6 space-y-6 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 shrink-0">
          <div>
            <div className="text-xs font-mono text-cyan-400">Powered by Gemini 3.8 Flash (Server-Side)</div>
            <h2 className="text-xl font-bold text-white mt-0.5">Autonomous Compliance Advisor</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-sm font-semibold p-1"
          >
            ✕
          </button>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 p-1 bg-slate-950 rounded-lg border border-slate-800 shrink-0">
          <button
            onClick={() => {
              setActiveMode('gap');
              setAiResponse(null);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
              activeMode === 'gap'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Audit Gap Analysis
          </button>
          <button
            onClick={() => {
              setActiveMode('blueprint');
              setAiResponse(null);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
              activeMode === 'blueprint'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Infrastructure Automation Blueprint
          </button>
          <button
            onClick={() => {
              setActiveMode('custom');
              setAiResponse(null);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors whitespace-nowrap ${
              activeMode === 'custom'
                ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ask Compliance Question
          </button>
        </div>

        {/* Input Parameters */}
        <div className="space-y-3 shrink-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Company / Team Name:</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Your Tech Stack & Tools:</label>
              <input
                type="text"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
                className="w-full px-3 py-1.5 rounded bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {activeMode === 'custom' && (
            <div>
              <label className="text-slate-400 block text-xs mb-1">Your Compliance Question:</label>
              <textarea
                value={customQuestion}
                onChange={(e) => setCustomQuestion(e.target.value)}
                placeholder="e.g. How do I satisfy SOC 2 CC6.6 web encryption for free on Vercel and Cloudflare?"
                rows={2}
                className="w-full px-3 py-2 rounded bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>
          )}

          <button
            onClick={handleRunAnalysis}
            disabled={loading}
            className="w-full py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded hover:bg-cyan-300 transition-colors disabled:opacity-50"
          >
            {loading ? 'Consulting Gemini Compliance Engine...' : 'Run Autonomous Advisor'}
          </button>
        </div>

        {/* Response Box */}
        <div className="flex-1 overflow-y-auto min-h-[220px] rounded-md bg-slate-950 border border-slate-800 p-4 text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">
          {loading ? (
            <div className="flex items-center justify-center h-full text-slate-400">
              Analyzing controls, infrastructure connectors, and auditor-accepted evidence...
            </div>
          ) : aiResponse ? (
            aiResponse
          ) : (
            <div className="text-slate-500 text-center py-10">
              Click "Run Autonomous Advisor" above to generate custom compliance architecture advice.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
