export type SentinelId = 'jax' | 'it' | 'privacy' | 'risky' | 'hr';

export interface Sentinel {
  id: SentinelId;
  name: string;
  fullName: string;
  title: string;
  badge: string;
  image: string;
  emblem: string;
  roleDescription: string;
  specialties: string[];
  suggestedQuestions: string[];
  greeting: string;
  mappedViews: string[];
  accent?: 'american' | 'british';
  accentLabel?: string;
  accentFlag?: string;
}

export interface SentinelMessage {
  id: string;
  sentinelId: SentinelId;
  sender: 'user' | 'sentinel';
  text: string;
  timestamp: string;
}
