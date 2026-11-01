import { SentinelId } from '../types/sentinels';

export interface SentinelVoiceProfile {
  id: SentinelId;
  name: string;
  roleBadge: string;
  pitch: number;
  rate: number;
  volume: number;
  preferredVoices: string[];
  gender: 'male' | 'female';
  personality: string;
}

export const SENTINEL_VOICE_PROFILES: Record<SentinelId, SentinelVoiceProfile> = {
  jax: {
    id: 'jax',
    name: 'Jax',
    roleBadge: 'Lead Sentinel',
    pitch: 1.02,
    rate: 1.02,
    volume: 1.0,
    preferredVoices: [
      'Google US English',
      'Alex',
      'David',
      'Microsoft David',
      'Guy',
      'Matthew',
      'Fred',
      'en-US',
    ],
    gender: 'male',
    personality: 'Inspiring, authoritative, confident leader',
  },
  it: {
    id: 'it',
    name: 'IT Sentinel',
    roleBadge: 'Infrastructure & Asset Guardian',
    pitch: 0.94,
    rate: 1.10,
    volume: 1.0,
    preferredVoices: [
      'Fred',
      'Microsoft Mark',
      'Joey',
      'Google US English',
      'Aaron',
      'Alex',
      'en-US',
    ],
    gender: 'male',
    personality: 'Sharp, rapid-cadence, tactical cybersecurity engineer',
  },
  privacy: {
    id: 'privacy',
    name: 'Privacy Sentinel',
    roleBadge: 'Data Protection & Web Defense',
    pitch: 1.12,
    rate: 0.96,
    volume: 1.0,
    preferredVoices: [
      'Google UK English Female',
      'Stephanie',
      'Libby',
      'Victoria',
      'Microsoft Hazel',
      'Google UK English Male',
      'Daniel',
      'Oliver',
      'en-GB',
    ],
    gender: 'female',
    personality: 'Articulate, composed, regulatory data protection specialist',
  },
  risky: {
    id: 'risky',
    name: 'Risky Sentinel',
    roleBadge: 'Enterprise Threat & Forensics',
    pitch: 0.86,
    rate: 0.95,
    volume: 1.0,
    preferredVoices: [
      'Google UK English Male',
      'Daniel',
      'Oliver',
      'George',
      'Microsoft George',
      'Arthur',
      'en-GB',
    ],
    gender: 'male',
    personality: 'Deep, tactical threat analyst and risk strategist',
  },
  hr: {
    id: 'hr',
    name: 'HR Sentinel',
    roleBadge: 'People Governance & Culture',
    pitch: 1.18,
    rate: 1.0,
    volume: 1.0,
    preferredVoices: [
      'Samantha',
      'Google US English',
      'Microsoft Zira',
      'Jenny',
      'Victoria',
      'Karen',
      'en-US',
    ],
    gender: 'female',
    personality: 'Warm, encouraging, approachable People & Culture champion',
  },
};

let activeUtterance: SpeechSynthesisUtterance | null = null;
let voiceEnabled = true;
let customSelectedVoices: Partial<Record<SentinelId, string>> = {};

// Listeners for active speaking state and audio animation
type SpeakingListener = (speaking: boolean, sentinelId: SentinelId | null, textSnippet?: string) => void;
const speakingListeners = new Set<SpeakingListener>();

export function subscribeSpeakingState(listener: SpeakingListener): () => void {
  speakingListeners.add(listener);
  return () => speakingListeners.delete(listener);
}

function notifySpeaking(speaking: boolean, sentinelId: SentinelId | null, textSnippet?: string) {
  speakingListeners.forEach((fn) => fn(speaking, sentinelId, textSnippet));
}

function playActivationChime(sentinelId: SentinelId) {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (sentinelId === 'privacy' || sentinelId === 'risky') {
      // Crisp resonant chime
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      osc.frequency.exponentialRampToValueAtTime(987.77, ctx.currentTime + 0.12); // B5
    } else {
      // Tactical harmonic blip
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.12); // G5
    }

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.16);
  } catch (err) {
    // Audio autoplay policy
  }
}

export function isVoiceSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

export function setVoiceEnabled(enabled: boolean) {
  voiceEnabled = enabled;
  if (!enabled) {
    stopSpeaking();
  }
}

export function getVoiceEnabled(): boolean {
  return voiceEnabled;
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    activeUtterance = null;
    notifySpeaking(false, null);
  }
}

// Find the best matching browser SpeechSynthesisVoice for a sentinel profile
export function resolveSentinelVoice(sentinelId: SentinelId): SpeechSynthesisVoice | null {
  if (!isVoiceSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const profile = SENTINEL_VOICE_PROFILES[sentinelId];
  if (!profile) return voices[0] || null;

  // 1. Check if user selected a custom voice for this sentinel
  const customUri = customSelectedVoices[sentinelId];
  if (customUri) {
    const customVoice = voices.find((v) => v.voiceURI === customUri || v.name === customUri);
    if (customVoice) return customVoice;
  }

  // 2. Try to match specific preferred names in the available pool
  for (const preferredName of profile.preferredVoices) {
    const match = voices.find((v) =>
      v.name.toLowerCase().includes(preferredName.toLowerCase())
    );
    if (match) return match;
  }

  // 3. Fallback matching gender
  if (profile.gender === 'female') {
    const femaleMatch = voices.find((v) =>
      /female|woman|samantha|zira|victoria|karen|stephanie|hazel/i.test(v.name)
    );
    if (femaleMatch) return femaleMatch;
  } else {
    const maleMatch = voices.find((v) =>
      /male|man|alex|david|guy|daniel|george|oliver|mark|fred/i.test(v.name)
    );
    if (maleMatch) return maleMatch;
  }

  // 4. Any English voice in browser
  const englishVoices = voices.filter((v) => (v.lang || '').toLowerCase().startsWith('en'));
  if (englishVoices.length > 0) {
    const indexMap: Record<SentinelId, number> = {
      jax: 0,
      it: 1 % englishVoices.length,
      privacy: 2 % englishVoices.length,
      risky: 3 % englishVoices.length,
      hr: 4 % englishVoices.length,
    };
    return englishVoices[indexMap[sentinelId]] || englishVoices[0];
  }

  return voices[0] || null;
}

export function setCustomSentinelVoice(sentinelId: SentinelId, voiceURI: string) {
  customSelectedVoices[sentinelId] = voiceURI;
}

export function getAllSystemVoices(): SpeechSynthesisVoice[] {
  if (!isVoiceSupported()) return [];
  return window.speechSynthesis.getVoices();
}

export function speakSentinel(
  sentinelId: SentinelId,
  text: string,
  onStart?: () => void,
  onEnd?: () => void
) {
  if (!voiceEnabled || !isVoiceSupported()) {
    return;
  }

  stopSpeaking();

  const profile = SENTINEL_VOICE_PROFILES[sentinelId] || SENTINEL_VOICE_PROFILES.jax;
  playActivationChime(sentinelId);

  // Clean formatted text for natural speech flow
  const cleanText = text
    .replace(/[*_#`~]/g, '')
    .replace(/https?:\/\/\S+/g, 'link')
    .replace(/[$]\d+([,.]\d+)?/g, (m) => `${m.replace('$', '')} dollars`)
    .slice(0, 480);

  const utterance = new SpeechSynthesisUtterance(cleanText);

  utterance.pitch = profile.pitch;
  utterance.rate = profile.rate;
  utterance.volume = profile.volume;

  const matchedVoice = resolveSentinelVoice(sentinelId);
  if (matchedVoice) {
    utterance.voice = matchedVoice;
    utterance.lang = matchedVoice.lang;
  }

  utterance.onstart = () => {
    notifySpeaking(true, sentinelId, cleanText.slice(0, 80));
    if (onStart) onStart();
  };

  utterance.onend = () => {
    activeUtterance = null;
    notifySpeaking(false, null);
    if (onEnd) onEnd();
  };

  utterance.onerror = () => {
    activeUtterance = null;
    notifySpeaking(false, null);
    if (onEnd) onEnd();
  };

  activeUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}
