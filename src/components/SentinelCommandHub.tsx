import React, { useState, useEffect, useRef } from 'react';
import { SentinelId, SentinelMessage } from '../types/sentinels';
import { SENTINELS } from '../data/sentinelsData';
import { askComplianceAI } from '../services/api';
import {
  speakSentinel,
  stopSpeaking,
  setVoiceEnabled,
  SENTINEL_VOICE_PROFILES,
  subscribeSpeakingState,
} from '../services/sentinelVoice';
import { SentinelCharacterStage } from './SentinelCharacterStage';

interface SentinelCommandHubProps {
  currentView: string;
  activeSentinelId: SentinelId;
  setActiveSentinelId: (id: SentinelId) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onNavigateTab: (tab: string) => void;
  isLight?: boolean;
}

export const SentinelCommandHub: React.FC<SentinelCommandHubProps> = ({
  currentView,
  activeSentinelId,
  setActiveSentinelId,
  isOpen,
  setIsOpen,
  onNavigateTab,
  isLight = true,
}) => {
  const currentSentinel = SENTINELS.find((s) => s.id === activeSentinelId) || SENTINELS[0];
  const voiceProfile = SENTINEL_VOICE_PROFILES[activeSentinelId] || SENTINEL_VOICE_PROFILES.jax;

  const [messages, setMessages] = useState<Record<SentinelId, SentinelMessage[]>>({
    jax: [
      {
        id: 'msg-jax-init',
        sentinelId: 'jax',
        sender: 'sentinel',
        text: "Greetings! I'm Jax, your Chief Autonomous Compliance Mascot and Lead Sentinel. My squad and I are actively monitoring your entire compliance operating system. Ask me anything about passing SOC 2, ISO 27001, HIPAA, or GDPR!",
        timestamp: 'Just now',
      },
    ],
    it: [
      {
        id: 'msg-it-init',
        sentinelId: 'it',
        sender: 'sentinel',
        text: "IT Sentinel online! I oversee IT Asset Management, endpoint encryption, and automated CI/CD pipeline scans. What technical control can I help you automate?",
        timestamp: 'Just now',
      },
    ],
    privacy: [
      {
        id: 'msg-dp-init',
        sentinelId: 'privacy',
        sender: 'sentinel',
        text: "Privacy Sentinel on watch! I audit public endpoints, web security headers, cookie consent, and data encryption. How can I fortify your data protection today?",
        timestamp: 'Just now',
      },
    ],
    risky: [
      {
        id: 'msg-rsk-init',
        sentinelId: 'risky',
        sender: 'sentinel',
        text: "Risky Sentinel reporting. I monitor threat likelihoods, vendor sub-processors, and digital forensics. Where do you suspect risk exposure?",
        timestamp: 'Just now',
      },
    ],
    hr: [
      {
        id: 'msg-hr-init',
        sentinelId: 'hr',
        sender: 'sentinel',
        text: "HR Sentinel standing by! I keep your people perimeter secure with security awareness training, user access reviews, and policy attestations. How can I assist your team?",
        timestamp: 'Just now',
      },
    ],
  });

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeakingAudio, setIsSpeakingAudio] = useState(false);
  const [autoVoice, setAutoVoice] = useState(true);
  const [viewMode, setViewMode] = useState<'stage_and_chat' | 'chat_only'>('stage_and_chat');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Sync with global speaking synthesis state
  useEffect(() => {
    const unsub = subscribeSpeakingState((speaking, id) => {
      if (id === activeSentinelId) {
        setIsSpeakingAudio(speaking);
      } else if (!speaking) {
        setIsSpeakingAudio(false);
      }
    });
    return () => unsub();
  }, [activeSentinelId]);

  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeSentinelId, isOpen]);

  // When switching Sentinel, speak the initial or latest greeting if autoVoice is on
  const handleSelectSentinel = (id: SentinelId) => {
    setActiveSentinelId(id);
    stopSpeaking();
    setIsSpeakingAudio(false);

    if (autoVoice) {
      const msgs = messages[id] || [];
      const lastMsg = msgs.slice().reverse().find((m) => m.sender === 'sentinel');
      if (lastMsg) {
        setIsSpeakingAudio(true);
        speakSentinel(
          id,
          lastMsg.text,
          () => setIsSpeakingAudio(true),
          () => setIsSpeakingAudio(false)
        );
      }
    }
  };

  const handleSpeakText = (sentinelId: SentinelId, text: string) => {
    if (isSpeakingAudio) {
      stopSpeaking();
      setIsSpeakingAudio(false);
    } else {
      setIsSpeakingAudio(true);
      speakSentinel(
        sentinelId,
        text,
        () => setIsSpeakingAudio(true),
        () => setIsSpeakingAudio(false)
      );
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: SentinelMessage = {
      id: `user-${Date.now()}`,
      sentinelId: activeSentinelId,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => ({
      ...prev,
      [activeSentinelId]: [...(prev[activeSentinelId] || []), userMsg],
    }));

    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await askComplianceAI('sentinel-chat', {
        sentinel: activeSentinelId,
        message: text,
        currentView,
      });

      const replyText = response.result || `${currentSentinel.name} here. All controls in this category are nominal.`;

      const sentinelReply: SentinelMessage = {
        id: `sentinel-${Date.now()}`,
        sentinelId: activeSentinelId,
        sender: 'sentinel',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => ({
        ...prev,
        [activeSentinelId]: [...(prev[activeSentinelId] || []), sentinelReply],
      }));

      // Speak reply aloud!
      if (autoVoice) {
        setIsSpeakingAudio(true);
        speakSentinel(
          activeSentinelId,
          replyText,
          () => setIsSpeakingAudio(true),
          () => setIsSpeakingAudio(false)
        );
      }
    } catch (err: any) {
      console.error(err);
      const fallbackReply: SentinelMessage = {
        id: `sentinel-err-${Date.now()}`,
        sentinelId: activeSentinelId,
        sender: 'sentinel',
        text: `All systems nominal. Let me know if you would like me to audit the ${currentView} section!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => ({
        ...prev,
        [activeSentinelId]: [...(prev[activeSentinelId] || []), fallbackReply],
      }));

      if (autoVoice) {
        setIsSpeakingAudio(true);
        speakSentinel(
          activeSentinelId,
          fallbackReply.text,
          () => setIsSpeakingAudio(true),
          () => setIsSpeakingAudio(false)
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const currentChatMessages = messages[activeSentinelId] || [];

  return (
    <>
      {/* Expanded Interactive Sentinel Command Bridge */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
          <div
            className={`w-full max-w-6xl h-[92vh] max-h-[880px] rounded-3xl border-2 flex flex-col overflow-hidden shadow-2xl transition-all ${
              isLight
                ? 'bg-gradient-to-br from-white via-slate-50 to-indigo-50/40 border-indigo-200 text-slate-950 shadow-[0_25px_80px_rgba(99,102,241,0.25)]'
                : 'bg-slate-950/98 border-cyan-500/40 text-white shadow-2xl'
            }`}
          >
            {/* Command Bridge Header */}
            <div
              className={`px-5 py-3.5 border-b flex items-center justify-between shrink-0 ${
                isLight
                  ? 'bg-gradient-to-r from-indigo-50/90 via-sky-50/70 to-white border-indigo-200/80'
                  : 'bg-gradient-to-r from-slate-900 to-slate-950 border-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-2xl bg-white border-2 border-cyan-400 p-0.5 overflow-hidden shrink-0 shadow-md">
                  <img
                    src={currentSentinel.image}
                    alt={currentSentinel.name}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black text-slate-950">{currentSentinel.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-cyan-100 text-cyan-900 border border-cyan-300">
                      {currentSentinel.badge}
                    </span>
                    {/* Role Badge Indicator */}
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border shadow-xs ${
                        isLight
                          ? 'bg-blue-100 text-blue-900 border-blue-300'
                          : 'bg-blue-950/70 text-blue-300 border-blue-700/80'
                      }`}
                    >
                      <span>🛡️</span>
                      <span>{voiceProfile.roleBadge}</span>
                    </span>
                  </div>
                  <div className="text-xs text-indigo-700 font-semibold">
                    {currentSentinel.title} · {voiceProfile.personality}
                  </div>
                </div>
              </div>

              {/* Controls: Audio Toggle, View Layout Switcher, Close */}
              <div className="flex items-center gap-2.5">
                {/* Speaking waveform animation */}
                {isSpeakingAudio && (
                  <div className="hidden sm:flex items-center gap-1 px-3 py-1 bg-purple-100 rounded-xl text-purple-900 border border-purple-300 text-xs font-mono font-black animate-pulse">
                    <span>🔊 Audio Active</span>
                    <span className="inline-block w-1 h-3 bg-purple-600 animate-bounce" />
                    <span className="inline-block w-1 h-4 bg-purple-600 animate-bounce delay-75" />
                    <span className="inline-block w-1 h-2 bg-purple-600 animate-bounce delay-150" />
                  </div>
                )}

                {/* View Layout Switcher */}
                <button
                  type="button"
                  onClick={() =>
                    setViewMode(viewMode === 'stage_and_chat' ? 'chat_only' : 'stage_and_chat')
                  }
                  className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-800 border border-slate-300 hover:bg-slate-50 transition-all cursor-pointer shadow-xs"
                >
                  <span>{viewMode === 'stage_and_chat' ? '💬 Chat Only' : '🎭 Living Stage & Chat'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const nextVoice = !autoVoice;
                    setAutoVoice(nextVoice);
                    setVoiceEnabled(nextVoice);
                    if (!nextVoice) stopSpeaking();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs ${
                    autoVoice
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                  }`}
                  title="Toggle Automated Voice Speech"
                >
                  {autoVoice ? '🔊 Voice ON' : '🔇 Muted'}
                </button>

                <button
                  onClick={() => {
                    stopSpeaking();
                    setIsOpen(false);
                  }}
                  className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-base transition-colors cursor-pointer"
                  title="Close Command Hub"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Sentinel Squad Switcher Tabs */}
            <div
              className={`flex items-center gap-2 px-5 py-2.5 border-b overflow-x-auto shrink-0 ${
                isLight ? 'bg-slate-100/90 border-indigo-100' : 'bg-slate-900 border-slate-800'
              }`}
            >
              {SENTINELS.map((sentinel) => {
                const isSelected = sentinel.id === activeSentinelId;
                const profile = SENTINEL_VOICE_PROFILES[sentinel.id];
                return (
                  <button
                    key={sentinel.id}
                    onClick={() => handleSelectSentinel(sentinel.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-extrabold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md scale-102'
                        : isLight
                        ? 'bg-white text-slate-700 hover:text-slate-950 hover:bg-slate-200 border border-slate-200'
                        : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 border border-slate-700'
                    }`}
                  >
                    <img
                      src={sentinel.image}
                      alt={sentinel.name}
                      className="w-5 h-5 object-contain"
                    />
                    <span>{sentinel.name}</span>
                    <span className={`text-[10px] font-mono px-1 rounded ${isSelected ? 'bg-indigo-800 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {sentinel.badge}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Main Dual-Pane Body: Stage (Left) & Chat (Right) */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Left: The Living Character Stage (Walks, Talks, Salutes) */}
              {viewMode === 'stage_and_chat' && (
                <div className="w-full md:w-[48%] lg:w-[44%] p-3 sm:p-4 border-b md:border-b-0 md:border-r border-indigo-100 overflow-y-auto shrink-0 flex flex-col justify-between">
                  <SentinelCharacterStage
                    sentinel={currentSentinel}
                    isLight={isLight}
                    compact={false}
                    interactive={true}
                  />

                  {/* Character Quick Context Badges */}
                  <div className="mt-3 p-3 rounded-2xl bg-white border border-indigo-100 text-xs space-y-1.5 shadow-sm">
                    <div className="font-extrabold text-slate-900 flex items-center justify-between">
                      <span>Primary Defense Domain</span>
                      <span className="font-mono text-cyan-700">{currentSentinel.badge}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 leading-snug">
                      {currentSentinel.roleDescription}
                    </div>
                  </div>
                </div>
              )}

              {/* Right: Live Communications Feed & Interaction */}
              <div className="flex-1 flex flex-col overflow-hidden bg-white">
                {/* Chat Messages List */}
                <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-3.5 bg-gradient-to-b from-slate-50 via-white to-sky-50/20">
                  {currentChatMessages.map((msg) => {
                    const isSentinel = msg.sender === 'sentinel';
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isSentinel ? 'items-start' : 'items-end'}`}
                      >
                        <div
                          className={`max-w-[88%] sm:max-w-[80%] p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-md ${
                            isSentinel
                              ? 'bg-white border-2 border-indigo-100 text-slate-950 rounded-tl-sm'
                              : 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-medium rounded-tr-sm shadow-indigo-500/20'
                          }`}
                        >
                          {isSentinel && (
                            <div className="flex items-center justify-between gap-3 pb-2 mb-2 border-b border-indigo-100 text-xs font-black text-indigo-900">
                              <div className="flex items-center gap-1.5">
                                <span>{currentSentinel.name}</span>
                                <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700">
                                  {voiceProfile.roleBadge}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleSpeakText(activeSentinelId, msg.text)}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors text-xs font-extrabold cursor-pointer"
                                title="Listen to this message"
                              >
                                <span>🔊 Play Audio</span>
                              </button>
                            </div>
                          )}
                          <div className="whitespace-pre-wrap font-medium">{msg.text}</div>
                          <div
                            className={`text-[10px] font-mono mt-1.5 text-right font-bold ${
                              isSentinel ? 'text-slate-400' : 'text-cyan-100'
                            }`}
                          >
                            {msg.timestamp}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {isLoading && (
                    <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-white border-2 border-indigo-200 text-xs text-indigo-900 w-fit shadow-md">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-ping" />
                      <span className="font-bold">{currentSentinel.name} is synthesizing compliance response...</span>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                {/* Quick Prompt Suggestions */}
                <div className="p-2.5 border-t border-slate-200 flex items-center gap-2 overflow-x-auto shrink-0 bg-slate-50">
                  {currentSentinel.suggestedQuestions.slice(0, 3).map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="px-3 py-1.5 rounded-xl text-xs bg-white hover:bg-indigo-50 border border-slate-200 text-slate-800 whitespace-nowrap font-bold shadow-xs cursor-pointer transition-all active:scale-95"
                    >
                      💡 {q}
                    </button>
                  ))}
                </div>

                {/* Message Input Footer */}
                <div className="p-3.5 border-t border-slate-200 shrink-0 flex items-center gap-2 bg-white">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                    placeholder={`Consult with ${currentSentinel.name}...`}
                    className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-2xl border-2 border-slate-300 focus:outline-none focus:border-indigo-600 font-semibold bg-slate-50 text-slate-950 placeholder-slate-400"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={isLoading || !inputMessage.trim()}
                    className="px-5 py-2.5 text-xs sm:text-sm font-black text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 disabled:opacity-50 rounded-2xl transition-all shadow-md cursor-pointer active:scale-95 shrink-0"
                  >
                    Send ➔
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
