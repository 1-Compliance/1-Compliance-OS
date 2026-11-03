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
    // Pitch MUST stay close to 1.0 to preserve natural human vocal cord resonances
    // without mechanical DSP distortion or metallic robot buzzing.
    pitch: 1.0,
    rate: 0.96,
    volume: 1.0,
    preferredVoices: [
      // Top-tier Neural & Natural Human Male Voices
      'Microsoft Guy Online (Natural)',
      'Microsoft Ryan Online (Natural)',
      'Microsoft Christopher Online (Natural)',
      'Microsoft Andrew Online (Natural)',
      'Microsoft Eric Online (Natural)',
      'Google UK English Male',
      'Google US English Male',
      'Daniel (Enhanced)',
      'Oliver (Enhanced)',
      'Evan (Enhanced)',
      'Nathan (Enhanced)',
      'Daniel',
      'Oliver',
      'Arthur',
      'George',
      'Microsoft Mark',
      'Microsoft David',
      'Alex',
    ],
    gender: 'male',
    personality: 'Inspiring, authoritative, confident leader',
  },
  it: {
    id: 'it',
    name: 'IT Sentinel',
    roleBadge: 'Infrastructure & Asset Guardian',
    pitch: 1.02,
    rate: 1.02,
    volume: 1.0,
    preferredVoices: [
      'Microsoft Ryan Online (Natural)',
      'Microsoft Christopher Online (Natural)',
      'Google UK English Male',
      'Google US English Male',
      'Daniel (Enhanced)',
      'Microsoft Mark',
      'Aaron',
      'Alex',
    ],
    gender: 'male',
    personality: 'Sharp, rapid-cadence, tactical cybersecurity engineer',
  },
  privacy: {
    id: 'privacy',
    name: 'Privacy Sentinel',
    roleBadge: 'Data Protection & Web Defense',
    pitch: 1.0,
    rate: 0.96,
    volume: 1.0,
    preferredVoices: [
      'Microsoft Jenny Online (Natural)',
      'Microsoft Aria Online (Natural)',
      'Microsoft Sonia Online (Natural)',
      'Google UK English Female',
      'Stephanie (Enhanced)',
      'Samantha (Enhanced)',
      'Victoria',
      'Google UK English Male',
      'Daniel (Enhanced)',
    ],
    gender: 'female',
    personality: 'Articulate, composed, regulatory data protection specialist',
  },
  risky: {
    id: 'risky',
    name: 'Risky Sentinel',
    roleBadge: 'Enterprise Threat & Forensics',
    pitch: 0.98,
    rate: 0.94,
    volume: 1.0,
    preferredVoices: [
      'Microsoft Guy Online (Natural)',
      'Microsoft Andrew Online (Natural)',
      'Google UK English Male',
      'Oliver (Enhanced)',
      'Daniel (Enhanced)',
      'George',
      'Arthur',
      'Microsoft George',
    ],
    gender: 'male',
    personality: 'Deep, tactical threat analyst and risk strategist',
  },
  hr: {
    id: 'hr',
    name: 'HR Sentinel',
    roleBadge: 'People Governance & Culture',
    pitch: 1.02,
    rate: 0.98,
    volume: 1.0,
    preferredVoices: [
      'Microsoft Jenny Online (Natural)',
      'Microsoft Aria Online (Natural)',
      'Samantha (Enhanced)',
      'Google US English',
      'Google UK English Female',
      'Jenny',
      'Samantha',
      'Victoria',
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

// Gentle acoustic audio activation cue
function playActivationChime(sentinelId: SentinelId) {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (sentinelId === 'privacy' || sentinelId === 'risky') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880.0, ctx.currentTime + 0.12); // A5
    } else {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.12); // G5
    }

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.14);
  } catch {
    // Autoplay policy fallback
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

// Voice classification regexes
const NATURAL_NEURAL_REGEX = /natural|neural|online|enhanced|premium|studio|wavenet/i;
const FEMALE_VOICE_REGEX = /female|woman|samantha|zira|victoria|karen|stephanie|hazel|susan|catherine|jenny|aria|ana|helena|sophia|monica|amelia|fiona|moira|veena|tessa/i;
const MALE_VOICE_REGEX = /male|man|alex|david|guy|daniel|george|oliver|mark|aaron|arthur|tom|rishi|christopher|ryan|eric|andrew|evan|nathan/i;

// Natural human pronunciation mapper for technical and compliance terminology
export function humanizeComplianceSpeech(rawText: string): string {
  let text = rawText
    .replace(/[*_#`~]/g, '')
    .replace(/https?:\/\/\S+/g, 'link')
    .replace(/[$](\d+(?:,\d+)?)/g, '$1 dollars')
    // Compliance abbreviations humanization
    .replace(/\bSOC 2\b/gi, 'Sock two')
    .replace(/\bPCI DSS\b/gi, 'P-C-I D-S-S')
    .replace(/\bHIPAA\b/gi, 'Hip-uh')
    .replace(/\bFinCEN\b/gi, 'Fin-cen')
    .replace(/\bBOI\b/g, 'B-O-I')
    .replace(/\bGDPR\b/gi, 'G-D-P-R')
    .replace(/\bCCPA\b/gi, 'C-C-P-A')
    .replace(/\bCPRA\b/gi, 'C-P-R-A')
    .replace(/\bNIST CSF\b/gi, 'Nist C-S-F')
    .replace(/\bNIST\b/gi, 'Nist')
    .replace(/\bISO 27001\b/gi, 'I-S-O twenty-seven-thousand-one')
    .replace(/\b1-Compliance OS™?\b/gi, 'One Compliance O-S')
    .replace(/\b1-Compliance\b/gi, 'One Compliance')
    .replace(/\bOS\b/g, 'O-S')
    .replace(/\bCPA\b/g, 'C-P-A')
    .replace(/\bLLC\b/g, 'L-L-C')
    .replace(/\bAI\b/g, 'A-I')
    .replace(/\bTLS\b/g, 'T-L-S')
    .replace(/\bCSP\b/g, 'C-S-P')
    .replace(/\bTPCRM\b/g, 'Third Party Vendor Risk')
    // Punctuation pacing: Ensure natural breathing cadence
    .replace(/\.\s+/g, '. ')
    .replace(/;\s+/g, ', ')
    .replace(/—/g, ', ')
    .trim();

  return text.slice(0, 480);
}

// Find the highest fidelity natural human SpeechSynthesisVoice
export function resolveSentinelVoice(sentinelId: SentinelId): SpeechSynthesisVoice | null {
  if (!isVoiceSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const profile = SENTINEL_VOICE_PROFILES[sentinelId];
  if (!profile) return voices[0] || null;

  // 1. User manual override
  const customUri = customSelectedVoices[sentinelId];
  if (customUri) {
    const customVoice = voices.find((v) => v.voiceURI === customUri || v.name === customUri);
    if (customVoice) return customVoice;
  }

  // 2. High-Priority Natural / Neural voices matching preferred list
  for (const preferredName of profile.preferredVoices) {
    const naturalMatch = voices.find((v) => {
      const nameLower = v.name.toLowerCase();
      const prefLower = preferredName.toLowerCase();
      const matches = nameLower.includes(prefLower);
      if (!matches) return false;

      // Gender safety check
      if (profile.gender === 'male' && FEMALE_VOICE_REGEX.test(v.name)) {
        return false;
      }
      return true;
    });
    if (naturalMatch) return naturalMatch;
  }

  // 3. Fallback: Search for any Natural / Neural / Enhanced voice matching gender
  if (profile.gender === 'male') {
    // Neural male voice in English
    const neuralMale = voices.find((v) => {
      const isEnglish = (v.lang || '').toLowerCase().startsWith('en');
      const isNatural = NATURAL_NEURAL_REGEX.test(v.name);
      const isMale = MALE_VOICE_REGEX.test(v.name) && !FEMALE_VOICE_REGEX.test(v.name);
      return isEnglish && isNatural && isMale;
    });
    if (neuralMale) return neuralMale;

    // Any Natural/Neural English voice that is not female
    const nonFemaleNeural = voices.find((v) => {
      const isEnglish = (v.lang || '').toLowerCase().startsWith('en');
      const isNatural = NATURAL_NEURAL_REGEX.test(v.name);
      const notFemale = !FEMALE_VOICE_REGEX.test(v.name);
      return isEnglish && isNatural && notFemale;
    });
    if (nonFemaleNeural) return nonFemaleNeural;

    // Standard male English voice
    const standardMale = voices.find((v) => {
      const isEnglish = (v.lang || '').toLowerCase().startsWith('en');
      const isMale = MALE_VOICE_REGEX.test(v.name) && !FEMALE_VOICE_REGEX.test(v.name);
      return isEnglish && isMale;
    });
    if (standardMale) return standardMale;

    // Any English voice that does NOT match female names
    const nonFemale = voices.find((v) => {
      const isEnglish = (v.lang || '').toLowerCase().startsWith('en');
      return isEnglish && !FEMALE_VOICE_REGEX.test(v.name);
    });
    if (nonFemale) return nonFemale;
  } else {
    // Female profile
    const neuralFemale = voices.find((v) => {
      const isEnglish = (v.lang || '').toLowerCase().startsWith('en');
      const isNatural = NATURAL_NEURAL_REGEX.test(v.name);
      const isFemale = FEMALE_VOICE_REGEX.test(v.name);
      return isEnglish && isNatural && isFemale;
    });
    if (neuralFemale) return neuralFemale;

    const standardFemale = voices.find((v) => {
      const isEnglish = (v.lang || '').toLowerCase().startsWith('en');
      return isEnglish && FEMALE_VOICE_REGEX.test(v.name);
    });
    if (standardFemale) return standardFemale;
  }

  // 4. Default English voice
  const defaultEnglish = voices.find((v) => (v.lang || '').toLowerCase().startsWith('en'));
  return defaultEnglish || voices[0] || null;
}

export function setCustomSentinelVoice(sentinelId: SentinelId, voiceURI: string) {
  customSelectedVoices[sentinelId] = voiceURI;
}

// Return voices sorted with High-Definition Natural / Neural voices first
export function getAllSystemVoices(): SpeechSynthesisVoice[] {
  if (!isVoiceSupported()) return [];
  const voices = window.speechSynthesis.getVoices();
  return [...voices].sort((a, b) => {
    const aNatural = NATURAL_NEURAL_REGEX.test(a.name) ? 1 : 0;
    const bNatural = NATURAL_NEURAL_REGEX.test(b.name) ? 1 : 0;
    if (aNatural !== bNatural) return bNatural - aNatural;
    const aEng = (a.lang || '').toLowerCase().startsWith('en') ? 1 : 0;
    const bEng = (b.lang || '').toLowerCase().startsWith('en') ? 1 : 0;
    return bEng - aEng;
  });
}

export function isNaturalVoice(voice: SpeechSynthesisVoice): boolean {
  return NATURAL_NEURAL_REGEX.test(voice.name);
}

export function speakSentinel(
  sentinelId: SentinelId,
  rawText: string,
  onStart?: () => void,
  onEnd?: () => void
) {
  if (!voiceEnabled || !isVoiceSupported()) {
    return;
  }

  stopSpeaking();

  const profile = SENTINEL_VOICE_PROFILES[sentinelId] || SENTINEL_VOICE_PROFILES.jax;
  playActivationChime(sentinelId);

  const cleanText = humanizeComplianceSpeech(rawText);
  const utterance = new SpeechSynthesisUtterance(cleanText);

  // Natural human acoustic settings
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
