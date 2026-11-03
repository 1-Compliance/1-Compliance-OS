import React, { useState, useEffect } from 'react';
import { SENTINELS } from '../data/sentinelsData';
import { SentinelId } from '../types/sentinels';
import {
  speakSentinel,
  stopSpeaking,
  subscribeSpeakingState,
  SENTINEL_VOICE_PROFILES,
} from '../services/sentinelVoice';

interface FloatingSentinelCompanionProps {
  onOpenSentinelHub: (sentinelId?: string) => void;
  currentView: string;
}

export const FloatingSentinelCompanion: React.FC<FloatingSentinelCompanionProps> = ({
  onOpenSentinelHub,
  currentView,
}) => {
  const [activeSentinelId, setActiveSentinelId] = useState<SentinelId>('jax');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [bubbleText, setBubbleText] = useState<string>("Hey! I'm Jax, your Lead Sentinel. Click me for a live audio briefing!");
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSentinelPicker, setShowSentinelPicker] = useState(false);
  const [useCinematicVideo, setUseCinematicVideo] = useState<boolean>(true);

  const activeSentinel = SENTINELS.find((s) => s.id === activeSentinelId) || SENTINELS[0];
  const voiceProfile = SENTINEL_VOICE_PROFILES[activeSentinelId] || SENTINEL_VOICE_PROFILES.jax;

  // React to view changes with helpful in-character tip
  useEffect(() => {
    const matchedSentinel = SENTINELS.find((s) => s.mappedViews.includes(currentView));
    if (matchedSentinel && matchedSentinel.id !== activeSentinelId) {
      setActiveSentinelId(matchedSentinel.id);
      setBubbleText(`${matchedSentinel.name} here for ${currentView}! Click me to talk.`);
    }
  }, [currentView]);

  // Subscribe to speech synthesis events
  useEffect(() => {
    const unsub = subscribeSpeakingState((speaking, sentId, snippet) => {
      if (sentId === activeSentinelId) {
        setIsSpeaking(speaking);
        if (snippet) setBubbleText(snippet);
      } else if (!speaking) {
        setIsSpeaking(false);
      }
    });

    return () => unsub();
  }, [activeSentinelId]);

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakSentinel(
        activeSentinelId,
        activeSentinel.greeting,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  const handleSelectSentinel = (id: SentinelId) => {
    setActiveSentinelId(id);
    setShowSentinelPicker(false);
    const chosen = SENTINELS.find((s) => s.id === id);
    if (chosen) {
      setBubbleText(`Switched to ${chosen.name} · Sentinel operational.`);
      speakSentinel(id, `Greetings! ${chosen.name} standing guard.`);
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-5 right-5 z-40">
        <button
          type="button"
          onClick={() => setIsMinimized(false)}
          className="relative w-14 h-14 rounded-full bg-slate-950 p-1 shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer border-2 border-cyan-400 ring-4 ring-cyan-400/30 group"
          title={`Summon ${activeSentinel.name} Sentinel`}
        >
          <img
            src={activeSentinel.image}
            alt={activeSentinel.name}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
          />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end select-none pointer-events-auto">
      {/* Sentinel Switcher Dropdown */}
      {showSentinelPicker && (
        <div className="mb-2 p-2 rounded-2xl bg-white border-2 border-indigo-200 shadow-2xl flex items-center gap-1.5 animate-fadeIn">
          {SENTINELS.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSelectSentinel(s.id)}
              className={`w-10 h-12 rounded-xl p-1 border transition-all flex flex-col items-center justify-between cursor-pointer ${
                activeSentinelId === s.id
                  ? 'bg-indigo-600 text-white border-indigo-700 scale-105 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50'
              }`}
              title={s.name}
            >
              <img src={s.image} alt={s.name} className="h-7 object-contain" referrerPolicy="no-referrer" />
              <span className="text-[9px] font-black font-mono leading-none">{s.badge}</span>
            </button>
          ))}
        </div>
      )}

      {/* Speech Dialogue Bubble */}
      <div className="relative max-w-xs p-3.5 rounded-2xl bg-white/95 border-2 border-indigo-300 text-slate-950 shadow-2xl mb-2 backdrop-blur-md">
        <div className="flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-indigo-100">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-black text-indigo-900 tracking-tight">{activeSentinel.name}</span>
            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700">
              {voiceProfile.roleBadge}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowSentinelPicker(!showSentinelPicker)}
              className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
              title="Switch Active Sentinel"
            >
              Squad ▾
            </button>
            <button
              type="button"
              onClick={() => setIsMinimized(true)}
              className="text-slate-400 hover:text-slate-800 text-xs px-1 cursor-pointer font-bold"
              title="Minimize Companion"
            >
              ✕
            </button>
          </div>
        </div>

        <p className="text-xs font-semibold leading-relaxed text-slate-800 line-clamp-3">
          "{bubbleText}"
        </p>

        {/* Action Controls inside bubble */}
        <div className="flex items-center justify-between mt-2.5 pt-1.5 border-t border-slate-100 text-[11px] font-bold">
          <button
            type="button"
            onClick={handleToggleSpeak}
            className={`flex items-center gap-1 cursor-pointer font-black ${
              isSpeaking ? 'text-purple-600 animate-pulse' : 'text-indigo-600 hover:text-indigo-800'
            }`}
          >
            <span>{isSpeaking ? '⏹ Stop Audio' : '🔊 Play Audio Briefing'}</span>
          </button>

          <button
            type="button"
            onClick={() => onOpenSentinelHub(activeSentinelId)}
            className="text-cyan-700 hover:text-cyan-900 font-black cursor-pointer flex items-center gap-0.5"
          >
            <span>Ask Sentinel →</span>
          </button>
        </div>
      </div>

      {/* Living Mascot Avatar Presentation */}
      <div className="relative group flex flex-col items-center">
        <div
          onClick={handleToggleSpeak}
          className={`relative w-28 h-32 sm:w-32 sm:h-36 rounded-2xl bg-slate-950/95 border-2 border-cyan-400/80 shadow-[0_8px_24px_rgba(6,182,212,0.35)] overflow-hidden flex flex-col items-center justify-between p-1 backdrop-blur-md transition-all cursor-pointer group-hover:scale-105 ${
            isSpeaking ? 'ring-4 ring-cyan-400/50 shadow-cyan-500/40' : ''
          }`}
          title={`Click to talk with ${activeSentinel.name}!`}
        >
          {/* Visual Presentation: Cinematic Motion Render for Jax or crisp Mascot Artwork */}
          <div className="relative w-full h-[82%] flex items-center justify-center overflow-hidden rounded-xl bg-slate-900/60">
            {activeSentinelId === 'jax' && useCinematicVideo ? (
              <video
                src="/assets/aistudio/Jax_can_move_bd4d05e8.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover object-center filter drop-shadow-[0_4px_12px_rgba(6,182,212,0.5)]"
              />
            ) : (
              <img
                src={activeSentinel.image}
                alt={activeSentinel.name}
                className={`w-full h-full object-contain p-1 filter drop-shadow-[0_4px_12px_rgba(6,182,212,0.5)] transition-transform duration-200 ${
                  isSpeaking ? 'scale-105' : ''
                }`}
                referrerPolicy="no-referrer"
              />
            )}

            {/* Glowing active audio pulse overlay */}
            {isSpeaking && (
              <div className="absolute inset-0 bg-cyan-400/10 pointer-events-none animate-pulse" />
            )}
          </div>

          {/* Quick Voice / Render switcher footer */}
          <div className="w-full flex items-center justify-between px-1.5 py-0.5 bg-slate-900/90 rounded-lg text-[9px] font-mono border border-cyan-500/30 text-cyan-300">
            <span className="flex items-center gap-1 font-bold">
              <span>{isSpeaking ? '⏹ Speaking' : '🔊 Click to Speak'}</span>
            </span>

            {activeSentinelId === 'jax' && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setUseCinematicVideo(!useCinematicVideo);
                }}
                className="hover:text-cyan-200 text-slate-400 cursor-pointer font-bold underline text-[8px]"
                title="Toggle between cinematic motion video and 2D artwork"
              >
                {useCinematicVideo ? 'Art' : 'Motion'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
