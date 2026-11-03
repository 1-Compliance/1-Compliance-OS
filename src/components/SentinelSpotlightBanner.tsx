import React, { useState } from 'react';
import { Sentinel } from '../types/sentinels';
import { speakSentinel, stopSpeaking } from '../services/sentinelVoice';

interface SentinelSpotlightBannerProps {
  sentinel: Sentinel;
  onOpenChat: (sentinelId: string) => void;
  sectionHeadline?: string;
  sectionStatus?: string;
  isLight?: boolean;
}

export const SentinelSpotlightBanner: React.FC<SentinelSpotlightBannerProps> = ({
  sentinel,
  onOpenChat,
  sectionHeadline,
  sectionStatus,
  isLight = true,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleToggleVoice = () => {
    if (isPlayingAudio) {
      stopSpeaking();
      setIsPlayingAudio(false);
    } else {
      setIsPlayingAudio(true);
      speakSentinel(
        sentinel.id,
        sentinel.greeting || `Greetings! I am ${sentinel.name}, standing guard for your compliance operating system.`,
        () => setIsPlayingAudio(true),
        () => setIsPlayingAudio(false)
      );
    }
  };

  return (
    <div
      className={`relative overflow-hidden p-5 rounded-2xl border shadow-sm transition-all ${
        isLight
          ? 'bg-gradient-to-r from-white via-sky-50/50 to-indigo-50/40 border-slate-200 text-slate-800'
          : 'bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-950 border-slate-800 text-white'
      }`}
    >
      {/* Background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Left: Sentinel Character and Introduction */}
        <div className="flex items-center gap-4">
          {/* High-fidelity Sentinel Avatar with Living Movement */}
          <div
            className="relative shrink-0 group cursor-pointer flex flex-col items-center justify-end w-16 h-22 sm:w-20 sm:h-26"
            onClick={() => onOpenChat(sentinel.id)}
            title={`Click to consult ${sentinel.name}`}
          >
            {/* Holographic floor ring */}
            <div className="absolute bottom-0 w-14 h-4 rounded-[100%] bg-cyan-400/25 blur-xs pointer-events-none group-hover:scale-125 transition-transform" />

            <div className={`relative h-20 sm:h-24 transition-transform duration-300 ${isPlayingAudio ? 'animate-sentinel-talk scale-105' : 'animate-sentinel-idle group-hover:scale-110'}`}>
              <img
                src={sentinel.image}
                alt={sentinel.name}
                className="h-full object-contain filter drop-shadow-[0_6px_16px_rgba(6,182,212,0.4)]"
                referrerPolicy="no-referrer"
              />
              {/* Chest reactor light */}
              <div className={`absolute top-[42%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full pointer-events-none transition-all ${isPlayingAudio ? 'bg-cyan-400/70 blur-xs animate-ping' : 'bg-cyan-400/20 blur-xs'}`} />
            </div>

            <span className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-extrabold text-slate-950 bg-cyan-400 shadow">
              {sentinel.badge}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="font-mono text-cyan-600 font-extrabold uppercase tracking-wider">{sentinel.title}</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span className="text-emerald-600 font-mono text-[11px] font-bold">{sectionStatus || 'Active Guardian'}</span>
            </div>
            <h3 className={`text-base sm:text-lg font-extrabold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {sectionHeadline || sentinel.fullName}
            </h3>
            <p className={`text-xs max-w-xl leading-relaxed italic ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              "{sentinel.greeting}"
            </p>
          </div>
        </div>

        {/* Right: Direct Action Buttons with Voice Button */}
        <div className="flex items-center gap-2.5 shrink-0 self-stretch sm:self-auto justify-end">
          <button
            type="button"
            onClick={handleToggleVoice}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-sm ${
              isPlayingAudio
                ? 'bg-purple-600 text-white animate-pulse'
                : isLight
                ? 'bg-purple-100 text-purple-800 hover:bg-purple-200 border border-purple-300'
                : 'bg-purple-950 text-purple-300 hover:bg-purple-900 border border-purple-800'
            }`}
            title="Hear Sentinel speak greeting"
          >
            <span>{isPlayingAudio ? '⏹ Stop Voice' : '🔊 Hear Sentinel'}</span>
          </button>

          <button
            onClick={() => onOpenChat(sentinel.id)}
            className="px-4 py-2 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm"
          >
            <span>Consult {sentinel.name} →</span>
          </button>
        </div>
      </div>
    </div>
  );
};
