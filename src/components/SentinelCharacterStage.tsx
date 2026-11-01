import React, { useState, useEffect } from 'react';
import { Sentinel, SentinelId } from '../types/sentinels';
import { SENTINELS } from '../data/sentinelsData';
import {
  speakSentinel,
  stopSpeaking,
  SENTINEL_VOICE_PROFILES,
  subscribeSpeakingState,
  resolveSentinelVoice,
  getAllSystemVoices,
  setCustomSentinelVoice,
} from '../services/sentinelVoice';

interface SentinelCharacterStageProps {
  sentinel: Sentinel;
  onSelectSentinel?: (sentinelId: SentinelId) => void;
  onOpenChat?: (sentinelId: string) => void;
  isLight?: boolean;
  compact?: boolean;
  interactive?: boolean;
  className?: string;
}

export const SentinelCharacterStage: React.FC<SentinelCharacterStageProps> = ({
  sentinel,
  onSelectSentinel,
  onOpenChat,
  isLight = true,
  compact = false,
  interactive = true,
  className = '',
}) => {
  const [behaviorMode, setBehaviorMode] = useState<'idle' | 'walk' | 'salute' | 'scan'>('idle');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [spokenText, setSpokenText] = useState<string>(sentinel.greeting);
  const [saluteActive, setSaluteActive] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);

  const voiceProfile = SENTINEL_VOICE_PROFILES[sentinel.id] || SENTINEL_VOICE_PROFILES.jax;

  // Track global speech synthesis state
  useEffect(() => {
    const unsubscribe = subscribeSpeakingState((speaking, currentId, snippet) => {
      if (currentId === sentinel.id) {
        setIsSpeaking(speaking);
        if (snippet) setSpokenText(snippet);
      } else if (!speaking) {
        setIsSpeaking(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [sentinel.id]);

  // Keep spokenText fresh if sentinel changes and not currently speaking
  useEffect(() => {
    if (!isSpeaking) {
      setSpokenText(sentinel.greeting);
    }
  }, [sentinel.id, sentinel.greeting, isSpeaking]);

  // Load available system voices for accent customization
  useEffect(() => {
    const updateVoices = () => {
      const v = getAllSystemVoices();
      setAvailableVoices(v);
      const matched = resolveSentinelVoice(sentinel.id);
      if (matched) {
        setSelectedVoiceName(matched.name);
      }
    };

    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, [sentinel.id]);

  const handleSpeak = (text?: string) => {
    const toSpeak = text || spokenText || sentinel.greeting;
    setSpokenText(toSpeak);
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakSentinel(
        sentinel.id,
        toSpeak,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  const handleSalute = () => {
    setSaluteActive(true);
    setBehaviorMode('salute');
    const saluteLine =
      sentinel.id === 'jax'
        ? 'Lead Sentinel Jax standing guard! Continuous compliance active with 100% audit readiness across your enterprise.'
        : `${sentinel.name} standing guard! ${sentinel.title} verified and reporting for duty.`;
    handleSpeak(saluteLine);
    setTimeout(() => {
      setSaluteActive(false);
      setBehaviorMode('idle');
    }, 4500);
  };

  const handleVoiceChange = (voiceName: string) => {
    setSelectedVoiceName(voiceName);
    const chosen = availableVoices.find((v) => v.name === voiceName);
    if (chosen) {
      setCustomSentinelVoice(sentinel.id, chosen.voiceURI || chosen.name);
      speakSentinel(sentinel.id, `Voice updated! ${sentinel.name} audio profile calibrated.`);
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-300 ${
        isLight
          ? 'bg-gradient-to-br from-white via-indigo-50/70 to-sky-50/80 border-indigo-200/90 shadow-xl'
          : 'bg-gradient-to-br from-slate-950 via-[#0b1329] to-[#07172e] border-cyan-500/30 shadow-2xl'
      } ${compact ? 'p-4' : 'p-6 md:p-8'} ${className}`}
    >
      {/* Decorative Cyber Flooring Grids */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex-grid" width="40" height="69.282" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
              <path
                d="M 40 0 L 20 11.547 L 0 0 L 0 23.094 L 20 34.641 L 40 23.094 Z M 0 34.641 L 20 46.188 L 0 57.735 L 0 69.282 L 20 57.735 L 40 69.282 L 40 46.188 L 20 34.641 Z"
                fill="none"
                stroke={isLight ? '#6366f1' : '#06b6d4'}
                strokeWidth="0.8"
                strokeOpacity="0.35"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex-grid)" />
        </svg>
      </div>

      {/* Atmospheric Radial Aura Behind Character */}
      <div
        className={`absolute top-1/2 right-1/4 -translate-y-1/2 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isSpeaking
            ? 'w-96 h-96 bg-cyan-400/25 scale-125'
            : isLight
            ? 'w-80 h-80 bg-indigo-300/20'
            : 'w-80 h-80 bg-cyan-500/15'
        }`}
      />

      {/* Top Bar: Sentinel Identity, Accent Badge & Quick Actions */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-indigo-200/70">
        <div className="flex items-center gap-3">
          {/* Emblem Badge */}
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-600 to-cyan-500 text-white font-black text-sm flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
            {sentinel.badge}
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className={`text-lg sm:text-xl font-black tracking-tight ${isLight ? 'text-slate-950' : 'text-white'}`}>
                {sentinel.fullName}
              </h3>

              {/* Voice & Role Profile Badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-black border shadow-xs ${
                  isLight
                    ? 'bg-blue-50 text-blue-800 border-blue-300'
                    : 'bg-blue-950/70 text-blue-300 border-blue-700/80'
                }`}
                title={`Unit: ${voiceProfile.roleBadge}`}
              >
                <span>🛡️</span>
                <span>{voiceProfile.roleBadge}</span>
              </span>
            </div>
            <p className={`text-xs font-semibold ${isLight ? 'text-indigo-900' : 'text-cyan-300'}`}>
              {sentinel.title} · {voiceProfile.personality}
            </p>
          </div>
        </div>

        {/* Action Controls: Speak aloud, Salute, Voices configuration */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSpeak()}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 shadow-sm cursor-pointer ${
              isSpeaking
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white animate-pulse'
                : isLight
                ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
                : 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 active:scale-95'
            }`}
            title="Hear Sentinel Voice aloud"
          >
            <span>{isSpeaking ? '⏹ Stop Audio' : '🔊 Play Audio Briefing'}</span>
          </button>

          <button
            type="button"
            onClick={handleSalute}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              saluteActive
                ? 'bg-amber-400 text-slate-950 border-amber-500 scale-105'
                : isLight
                ? 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100'
                : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
            }`}
            title="Trigger Sentinel Salute & Verification"
          >
            🎖️ Salute
          </button>

          <button
            type="button"
            onClick={() => setShowVoiceSettings(!showVoiceSettings)}
            className={`px-2.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              showVoiceSettings
                ? 'bg-purple-600 text-white border-purple-700'
                : isLight
                ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
            title="Configure System Voice & Audio"
          >
            ⚙️ Voices
          </button>
        </div>
      </div>

      {/* Voice Customizer Accordion Panel */}
      {showVoiceSettings && (
        <div
          className={`relative z-20 mt-3 p-3.5 rounded-2xl border text-xs space-y-2 animate-fadeIn ${
            isLight
              ? 'bg-white/95 border-indigo-200 text-slate-800 shadow-md'
              : 'bg-slate-900/95 border-slate-700 text-slate-200'
          }`}
        >
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5 text-indigo-900 font-black">
              <span>🔊</span>
              <span>Audio Unit: {voiceProfile.roleBadge}</span>
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              Pitch: {voiceProfile.pitch}x · Rate: {voiceProfile.rate}x
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <label className="font-semibold text-slate-600 shrink-0">System Voice:</label>
            <select
              value={selectedVoiceName}
              onChange={(e) => handleVoiceChange(e.target.value)}
              className={`flex-1 px-2.5 py-1.5 rounded-lg border font-mono text-xs cursor-pointer ${
                isLight ? 'bg-slate-50 border-slate-300 text-slate-900' : 'bg-slate-800 border-slate-600 text-white'
              }`}
            >
              {availableVoices.length === 0 && <option value="">Default Browser Voice</option>}
              {availableVoices.map((v) => (
                <option key={v.voiceURI || v.name} value={v.name}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => handleSpeak(`Audio profile calibrated for ${sentinel.name}. Systems nominal.`)}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 active:scale-95 shrink-0"
            >
              ▶ Audition
            </button>
          </div>
        </div>
      )}

      {/* Main 2D Character Viewport: Beautiful 2D Mascot Artwork + Live Dialogue Bubble */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 min-h-[360px] sm:min-h-[400px] my-4">
        {/* Left Column: Live Speech Dialogue & Suggested Compliance Questions */}
        <div className="flex-1 w-full max-w-xl space-y-3">
          {/* Animated Dialogue Bubble */}
          <div
            className={`p-5 rounded-2xl border transition-all duration-300 shadow-md ${
              isSpeaking
                ? isLight
                  ? 'bg-white border-cyan-400 ring-2 ring-cyan-400/30'
                  : 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-400/40 text-cyan-100'
                : isLight
                ? 'bg-white/95 border-indigo-200 text-slate-900'
                : 'bg-slate-900/90 border-slate-800 text-slate-100'
            }`}
          >
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-indigo-100">
              <div className="flex items-center gap-2 text-xs font-black text-cyan-600">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
                <span>{isSpeaking ? 'COMMUNICATING LIVE' : `${sentinel.name.toUpperCase()} BRIEFING`}</span>
              </div>

              {/* Audio Wave Visualizer Bars */}
              <div className="flex items-center gap-1 h-5">
                <span className={`w-1.5 bg-cyan-500 rounded-full transition-all ${isSpeaking ? 'h-5 animate-bounce' : 'h-2'}`} />
                <span className={`w-1.5 bg-indigo-500 rounded-full transition-all ${isSpeaking ? 'h-4 animate-pulse' : 'h-2.5'}`} />
                <span className={`w-1.5 bg-purple-500 rounded-full transition-all ${isSpeaking ? 'h-6 animate-bounce' : 'h-1.5'}`} />
                <span className={`w-1.5 bg-cyan-400 rounded-full transition-all ${isSpeaking ? 'h-4.5 animate-pulse' : 'h-3'}`} />
              </div>
            </div>

            <p className="text-sm sm:text-base font-semibold leading-relaxed text-slate-950">
              "{spokenText}"
            </p>

            <div className="flex items-center justify-between mt-3 pt-2 text-xs border-t border-slate-100 font-bold">
              <button
                type="button"
                onClick={() => handleSpeak(spokenText)}
                className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer font-extrabold"
              >
                <span>🔊 Replay Audio</span>
              </button>

              {onOpenChat && (
                <button
                  type="button"
                  onClick={() => onOpenChat(sentinel.id)}
                  className="text-cyan-700 hover:text-cyan-900 flex items-center gap-1.5 cursor-pointer font-extrabold"
                >
                  <span>💬 Deep Chat Session →</span>
                </button>
              )}
            </div>
          </div>

          {/* Suggested Interactive Voice Questions */}
          <div className="space-y-1.5">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-600">
              Ask {sentinel.name} (Click to Hear Voice Answer):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {sentinel.suggestedQuestions.slice(0, 3).map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const answers: Record<string, string> = {
                      'How do I pass our SOC 2 Type II audit with 1-Compliance OS?':
                        'To pass SOC 2 Type II, 1-Compliance OS automates daily evidence collection across all Trust Services Criteria: security, availability, and confidentiality. All 12 master security policies are mapped and signed off, and auditor exports are generated in 1-click.',
                      'How do enterprise subscriptions scale across company users and vendors?':
                        'Our enterprise pricing is simple and transparent: $149 per month for a single user, $299 for up to 5 company logins, and $999 per month for 6 to 100 users. Larger organizations scale at $999 per additional group of 100 users, and external vendors access their dedicated vetting portal seamlessly.',
                      'Give me an executive briefing for our Board on our compliance posture.':
                        'Executive briefing nominal: Current enterprise compliance readiness stands at 92%. SOC 2, ISO 27001, and HIPAA controls are actively monitored with zero critical audit blockers.',
                    };
                    const answer = answers[q] || `Regarding ${q}: All enterprise controls are actively monitored and compliant.`;
                    handleSpeak(answer);
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-indigo-50 text-slate-800 hover:text-indigo-700 border border-indigo-200/80 transition-all text-left shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <span className="text-cyan-600 font-bold">💬</span>
                  <span className="line-clamp-1">{q}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: The Authentic 2D Mascot Artwork */}
        <div className="relative flex flex-col items-center justify-end w-72 sm:w-80 shrink-0">
          {/* Concentric Cyber Rings on the Floor */}
          <div className="absolute -bottom-2 w-64 h-16 rounded-[100%] bg-gradient-to-r from-cyan-500/20 via-indigo-500/25 to-purple-500/20 blur-sm pointer-events-none" />
          <div className="absolute -bottom-4 w-52 h-14 rounded-[100%] border-2 border-cyan-400/40 pointer-events-none" />
          <div className="absolute -bottom-7 w-64 h-16 rounded-[100%] border border-indigo-400/30 pointer-events-none" />

          {/* Authentic Full-Body Mascot 2D Image */}
          <div
            onClick={() => handleSpeak()}
            className={`relative cursor-pointer transition-transform duration-300 select-none group ${
              isSpeaking
                ? 'animate-sentinel-talk scale-105'
                : behaviorMode === 'walk'
                ? 'animate-sentinel-walk'
                : 'animate-sentinel-idle'
            }`}
            title={`Click to talk with ${sentinel.name}!`}
          >
            {/* Outer Aura Ring when speaking */}
            {isSpeaking && (
              <div className="absolute inset-0 rounded-full border-4 border-cyan-400/70 animate-energy-pulse pointer-events-none" />
            )}

            {/* Pristine 2D Mascot Image (No square box, no generic procedural mech) */}
            <img
              src={sentinel.image}
              alt={sentinel.name}
              className="w-56 h-76 sm:w-64 sm:h-88 object-contain filter drop-shadow-[0_16px_36px_rgba(37,99,235,0.3)] group-hover:scale-105 transition-transform"
              referrerPolicy="no-referrer"
            />

            {/* Glowing Chest Reactor Light Pulse */}
            <div
              className={`absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full pointer-events-none transition-all duration-200 ${
                isSpeaking
                  ? 'bg-cyan-400/60 blur-md scale-150 animate-pulse'
                  : 'bg-cyan-400/20 blur-sm scale-100'
              }`}
            />

            {/* Glowing Visor Light Pulse */}
            <div
              className={`absolute top-[22%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-6 rounded-full pointer-events-none transition-all duration-150 ${
                isSpeaking
                  ? 'bg-cyan-300/70 blur-sm scale-125'
                  : 'bg-cyan-300/20 blur-xs'
              }`}
            />
          </div>

          {/* Soft Ground Contact Shadow */}
          <div className="w-36 h-6 rounded-full bg-slate-950/25 blur-xs pointer-events-none mt-2" />
        </div>
      </div>

      {/* Bottom Information & Sentinel Specialties Footer */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-indigo-200/70 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-slate-900">Sentinel Specialty:</span>
          <span className="font-mono text-indigo-700 font-bold bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-200">
            {sentinel.specialties[0]}
          </span>
          <span className="hidden sm:inline font-mono text-cyan-800 font-bold bg-cyan-50 px-2.5 py-0.5 rounded-lg border border-cyan-200">
            {sentinel.specialties[1]}
          </span>
        </div>

        <div className="flex items-center gap-2 text-slate-600 font-semibold text-[11px]">
          <span>Click Jax or any Sentinel to talk aloud</span>
          <span aria-hidden="true">·</span>
          <span>100% Audit Readiness</span>
        </div>
      </div>
    </div>
  );
};
