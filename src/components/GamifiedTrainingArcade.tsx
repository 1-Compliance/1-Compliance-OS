import React, { useState, useEffect } from 'react';
import { SENTINELS } from '../data/sentinelsData';

interface GamifiedTrainingArcadeProps {
  onOpenSentinelHub: (sentinelId?: string) => void;
  onNavigateTab: (tab: string) => void;
}

export interface TrainingQuest {
  id: string;
  title: string;
  category: 'Phishing & Email' | 'Factory & Physical' | 'Incident & Ransomware' | 'Privacy & Data';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xpReward: number;
  timeMinutes: number;
  sentinelGuide: string;
  sentinelImage: string;
  badgeUnlock: string;
  description: string;
  scenarioText: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const QUESTS: TrainingQuest[] = [
  {
    id: 'phishing_trap',
    title: 'The CEO Gift Card & Urgent Wire Trap',
    category: 'Phishing & Email',
    difficulty: 'Easy',
    xpReward: 150,
    timeMinutes: 3,
    sentinelGuide: 'Jax Mascot',
    sentinelImage: '/assets/sentinels/jax_transparent.png',
    badgeUnlock: 'Phishing Buster 🛡️',
    description: 'You receive an urgent email from your "CEO" claiming they are in a meeting and need $500 gift cards or a bank wire within 15 minutes.',
    scenarioText: `FROM: "Alex Chen (CEO)" <alex.chen-executive@gmail-corp-support.biz>
SUBJECT: URGENT: Quick favor needed for client meeting!
BODY:
"Hey! I'm trapped in an investor meeting and forgot client appreciation gift cards. Can you urgently buy 5x $100 Apple gift cards and reply with the PIN numbers on the back? Don't call me, just reply to this email ASAP. Thanks, Alex"`,
    options: [
      {
        text: 'Rush to purchase the gift cards since the CEO asked urgently.',
        isCorrect: false,
        explanation: '❌ Classic Business Email Compromise (BEC)! Notice the sender domain is "gmail-corp-support.biz", not your official company domain. Executives never ask staff to buy gift cards over email.',
      },
      {
        text: 'Forward the email to your personal Gmail to inspect it on your phone.',
        isCorrect: false,
        explanation: '❌ Forwarding suspected malicious emails to personal accounts risks spreading malware outside corporate defenses.',
      },
      {
        text: 'Report to Jax / IT Sentinel as Phishing & verify with CEO via trusted Slack/phone.',
        isCorrect: true,
        explanation: '✓ Perfect response! You spotted the spoofed domain and out-of-band verification rule. +150 XP awarded!',
      },
    ],
  },
  {
    id: 'factory_hazard',
    title: 'Factory Floor Unbadged Visitor & Unlocked CNC',
    category: 'Factory & Physical',
    difficulty: 'Medium',
    xpReward: 200,
    timeMinutes: 4,
    sentinelGuide: 'IT & Ops Sentinel',
    sentinelImage: '/assets/sentinels/it_transparent.png',
    badgeUnlock: 'Factory Safety Scout 🏭',
    description: 'During a shift change on the manufacturing floor, you notice an unfamiliar person without a visitor badge standing next to an unlocked CNC machine console with customer specs open on screen.',
    scenarioText: `LOCATION: Assembly Hall 2 / Machinery Bay
OBSERVATION:
1. Stranger in high-vis vest has NO lanyard or red visitor badge.
2. Machine terminal console is unlocked and logged in with Master Supervisor credentials.
3. Liquid coolant puddle is pooling 2 feet away near the main walkway.`,
    options: [
      {
        text: 'Ignore the visitor because they are wearing high-visibility safety clothing.',
        isCorrect: false,
        explanation: '❌ Social engineering attackers often wear safety vests or delivery uniforms to bypass physical access checks (tailgating). All visitors must wear verified badges.',
      },
      {
        text: 'Challenge visitor politely ("Can I guide you to reception?"), lock terminal (Win+L), and flag coolant spill.',
        isCorrect: true,
        explanation: '✓ Outstanding situational awareness! You secured the physical terminal, guided the visitor to security reception, and eliminated the slip hazard. +200 XP awarded!',
      },
      {
        text: 'Take a photo with your personal phone and post it on social media to ask who it is.',
        isCorrect: false,
        explanation: '❌ Violates NDAs and confidentiality rules! Customer schematics on factory screens cannot be photographed.',
      },
    ],
  },
  {
    id: 'ransomware_decider',
    title: 'The 2:00 AM Ransomware Decider (Choose Your Adventure)',
    category: 'Incident & Ransomware',
    difficulty: 'Hard',
    xpReward: 300,
    timeMinutes: 5,
    sentinelGuide: 'Risky Sentinel',
    sentinelImage: '/assets/sentinels/risky_transparent.png',
    badgeUnlock: 'Incident Commander ⚡',
    description: 'At 2:15 AM on Sunday, your internal server alert triggers: files in the accounting share are rapidly being renamed to .locked2026.',
    scenarioText: `CRITICAL ALERT: High I/O Write Storm on Accounting Storage Node
350 files renamed in 40 seconds. A ransom text file "READ_ME_RECOVER.txt" appeared on the root directory.`,
    options: [
      {
        text: 'Pay the $10,000 cryptocurrency ransom immediately before anyone wakes up.',
        isCorrect: false,
        explanation: '❌ Never pay without authorization! OFAC sanctions prohibit paying blacklisted cybercrime cartels, and 80% of victims who pay are hit again within 12 months.',
      },
      {
        text: 'Sever network connectivity (pull Ethernet / isolate VLAN), preserve memory state, and alert On-Call Lead & Risky Sentinel.',
        isCorrect: true,
        explanation: '✓ Brilliant incident containment! Disconnecting the network halts encryption spread across lateral subnets, while preserving memory logs for forensic analysis. +300 XP awarded!',
      },
      {
        text: 'Restart the server repeatedly to see if the files turn back to normal.',
        isCorrect: false,
        explanation: '❌ Rebooting destroys volatile RAM evidence, and some ransomware variants execute bootloader wipers upon restart.',
      },
    ],
  },
  {
    id: 'privacy_usb',
    title: 'The Unencrypted USB & Whiteboard PII Leak',
    category: 'Privacy & Data',
    difficulty: 'Easy',
    xpReward: 150,
    timeMinutes: 3,
    sentinelGuide: 'Privacy Sentinel',
    sentinelImage: '/assets/sentinels/privacy_transparent.png',
    badgeUnlock: 'GDPR Guardian 🔒',
    description: 'A contractor left a USB stick labeled "Customer Data Backup" on a conference room table alongside a whiteboard showing patient medical record numbers from a morning meeting.',
    scenarioText: `CONFERENCE ROOM A:
1. Whiteboard has 12 patient names, diagnoses, and Social Security numbers visible through glass wall.
2. Unbranded USB thumb drive sitting unencrypted on table.`,
    options: [
      {
        text: 'Leave it there since Conference Room A is inside company building.',
        isCorrect: false,
        explanation: '❌ Violates Clean Desk & Privacy policies (GDPR Art. 32 & HIPAA §164.312). Any cleaner, visitor, or unauthorized employee could view sensitive PII.',
      },
      {
        text: 'Take USB to IT Sentinel for encrypted quarantine, wipe the whiteboard, and log incident.',
        isCorrect: true,
        explanation: '✓ Perfect data protection adherence! You secured the physical media and protected customer privacy. +150 XP awarded!',
      },
      {
        text: 'Plug the USB drive into your personal computer to see what files are on it.',
        isCorrect: false,
        explanation: '❌ Severe security risk! Untrusted USB drives can contain BadUSB firmware or keylogger payloads.',
      },
    ],
  },
];

export const GamifiedTrainingArcade: React.FC<GamifiedTrainingArcadeProps> = ({
  onOpenSentinelHub,
  onNavigateTab,
}) => {
  // Gamification User Stats
  const [streakDays, setStreakDays] = useState<number>(6);
  const [userXP, setUserXP] = useState<number>(1450);
  const [completedQuests, setCompletedQuests] = useState<string[]>(['phishing_trap']);
  const [activeQuest, setActiveQuest] = useState<TrainingQuest | null>(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);

  // Interactive Video Player State
  const [selectedVideo, setSelectedVideo] = useState<{
    id: string;
    title: string;
    duration: string;
    instructor: string;
    dept: string;
    checkpoints: number[];
  }>({
    id: 'vid-1',
    title: 'Interactive Phishing & Social Engineering Defense (2026 Edition)',
    duration: '05:30',
    instructor: 'Jax & HR Sentinel',
    dept: 'Company-Wide',
    checkpoints: [45, 120, 240],
  });

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSeconds, setPlaybackSeconds] = useState<number>(38);
  const [checkpointTriggered, setCheckpointTriggered] = useState<boolean>(false);

  // Playback timer simulation
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackSeconds((prev) => {
          if (prev === 45 && !checkpointTriggered) {
            setIsPlaying(false);
            setCheckpointTriggered(true);
            return 45;
          }
          if (prev >= 330) {
            setIsPlaying(false);
            return 330;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, checkpointTriggered]);

  const handleStartQuest = (quest: TrainingQuest) => {
    setActiveQuest(quest);
    setSelectedOptionIndex(null);
    setIsAnswerSubmitted(false);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIndex === null || !activeQuest) return;
    setIsAnswerSubmitted(true);
    const chosen = activeQuest.options[selectedOptionIndex];
    if (chosen.isCorrect && !completedQuests.includes(activeQuest.id)) {
      setUserXP((prev) => prev + activeQuest.xpReward);
      setCompletedQuests((prev) => [...prev, activeQuest.id]);
    }
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Visual Gamification Banner with Arcade Visual */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/40 p-6 md:p-8 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-purple-400">
              <span className="font-bold">SENTINEL COMPLIANCE ACADEMY & ARCADE</span>
              <span aria-hidden="true">·</span>
              <span>Daily Quests · XP & Badges</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Compliance Training That Employees Actually Enjoy Playing
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
              Replace dull 45-minute slide presentations with 3-minute interactive micro-quests, scenario deciders, and interactive video checkpoints. Earn badges, level up your Sentinel rank, and satisfy annual SOC 2, HIPAA, and ISO 27001 auditor requirements.
            </p>

            {/* Daily Streak & Gamified Stat Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-950 border border-amber-500/80 shadow-md">
                <span className="text-base">🔥</span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {streakDays} Day Daily Streak
                </span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-950 border border-purple-500/80 shadow-md">
                <span className="text-base">✨</span>
                <span className="text-xs font-mono font-bold text-purple-300">
                  {userXP} Total XP
                </span>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-950 border border-cyan-500/80 shadow-md">
                <span className="text-base">🛡️</span>
                <span className="text-xs font-mono font-bold text-cyan-400">
                  Level 4 Sentinel Guardian
                </span>
              </div>
            </div>
          </div>

          {/* Arcade 3D Illustration Graphic */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border border-purple-500/40 bg-slate-950 shadow-2xl group">
              <img
                src="/assets/images/sentinel_training_arcade_1793231541661.jpg"
                alt="Gamified interactive cyber training arcade"
                className="w-full h-56 sm:h-60 object-cover object-center filter brightness-95 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-lg bg-slate-950/90 border border-slate-800 backdrop-blur-md flex items-center justify-between text-[11px] font-mono">
                <span className="text-purple-300">● Interactive Arcade Active</span>
                <span className="text-emerald-400">Auditor Attestation Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE VIDEO PLAYER WITH IN-VIDEO CHECKPOINTS */}
      <section className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
              <span>INTERACTIVE VIDEO LESSON</span>
              <span>·</span>
              <span>In-Video Decision Checkpoints</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-0.5">{selectedVideo.title}</h2>
            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
              <span>Instructor: {selectedVideo.instructor}</span>
              <span>·</span>
              <span>Audience: {selectedVideo.dept}</span>
              <span>·</span>
              <span>Total Length: {selectedVideo.duration}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setPlaybackSeconds(0);
              setIsPlaying(true);
              setCheckpointTriggered(false);
            }}
            className="px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors self-start sm:self-auto shrink-0 shadow-sm"
          >
            Restart Interactive Clip ↻
          </button>
        </div>

        {/* Video Canvas Simulation */}
        <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 aspect-video max-h-80 flex flex-col justify-between p-4 shadow-inner">
          {/* Animated Background Simulation */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-cyan-950/30 flex items-center justify-center">
            <div className="text-center space-y-2 p-6">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mx-auto text-2xl text-cyan-300 animate-pulse">
                {isPlaying ? '▶' : '⏸'}
              </div>
              <div className="text-sm font-bold text-white">
                {isPlaying ? 'Lesson Playing: Spotting Suspicious URL Redirects' : 'Video Paused'}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                {formatSeconds(playbackSeconds)} / {selectedVideo.duration}
              </div>
            </div>
          </div>

          {/* Interactive Checkpoint Modal Overlay if triggered at 0:45 */}
          {checkpointTriggered && (
            <div className="relative z-20 m-auto max-w-md p-5 rounded-xl bg-slate-900/95 border border-purple-500 shadow-2xl backdrop-blur-md space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-purple-400">
                <span className="font-bold">⚡ IN-VIDEO KNOWLEDGE CHECKPOINT</span>
                <span>+50 XP</span>
              </div>
              <h3 className="text-sm font-bold text-white">
                The speaker just showed a link to "paypa1-security.com". What is wrong with this URL?
              </h3>
              <div className="space-y-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    alert('❌ Incorrect: Look closely at the spelling!');
                  }}
                  className="w-full p-2.5 rounded bg-slate-950 hover:bg-slate-800 text-left text-slate-300 border border-slate-800"
                >
                  Nothing, it is the official PayPal customer portal.
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUserXP((prev) => prev + 50);
                    setCheckpointTriggered(false);
                    setIsPlaying(true);
                  }}
                  className="w-full p-2.5 rounded bg-purple-950/60 hover:bg-purple-900/80 text-left text-purple-200 border border-purple-600 font-medium"
                >
                  Typo-squatting! It uses the number "1" instead of the letter "l".
                </button>
              </div>
            </div>
          )}

          {/* Video Control Bar */}
          <div className="relative z-10 mt-auto pt-3 border-t border-slate-800/80 flex items-center gap-4 text-xs font-mono">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1 rounded bg-slate-800 text-white font-bold hover:bg-slate-700 transition-colors"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>

            {/* Scrub Progress Track with Checkpoint Dots */}
            <div className="relative flex-1 bg-slate-800 h-2 rounded-full overflow-visible">
              <div
                className="bg-cyan-400 h-full rounded-full"
                style={{ width: `${(playbackSeconds / 330) * 100}%` }}
              />
              {/* Checkpoint Markers */}
              <span
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-purple-400 border-2 border-slate-950 shadow"
                style={{ left: `${(45 / 330) * 100}%` }}
                title="Checkpoint 1 (0:45)"
              />
              <span
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-purple-400 border-2 border-slate-950 shadow"
                style={{ left: `${(120 / 330) * 100}%` }}
                title="Checkpoint 2 (2:00)"
              />
              <span
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-purple-400 border-2 border-slate-950 shadow"
                style={{ left: `${(240 / 330) * 100}%` }}
                title="Checkpoint 3 (4:00)"
              />
            </div>

            <span className="text-slate-400">{formatSeconds(playbackSeconds)} / 05:30</span>
          </div>
        </div>
      </section>

      {/* PLAYABLE MICRO-QUESTS GRID */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Interactive Scenario Quests</span>
              <span className="text-xs font-mono text-purple-400 font-normal">Play to Certify</span>
            </h2>
            <p className="text-xs text-slate-400">
              Hands-on decision challenges. Pass all 4 to earn your annual employee cybersecurity certification.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            {completedQuests.length} of {QUESTS.length} Quests Mastered
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {QUESTS.map((quest) => {
            const isCompleted = completedQuests.includes(quest.id);
            return (
              <div
                key={quest.id}
                className={`p-5 rounded-xl border transition-all flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-slate-900/60 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                    : 'bg-slate-900/70 border-slate-800 hover:border-purple-500/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-mono font-bold text-purple-400">
                      {quest.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-amber-400 font-bold">
                        +{quest.xpReward} XP
                      </span>
                      {isCompleted && (
                        <span className="text-xs font-mono text-emerald-400 font-bold">
                          ✓ Completed
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mt-1.5">{quest.title}</h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {quest.description}
                  </p>

                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
                    <span>⏱ {quest.timeMinutes} min</span>
                    <span>·</span>
                    <span>Badge: {quest.badgeUnlock}</span>
                    <span>·</span>
                    <span>Guide: {quest.sentinelGuide}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={() => handleStartQuest(quest)}
                    className={`w-full py-2 rounded-lg text-xs font-bold transition-colors shadow-sm ${
                      isCompleted
                        ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                        : 'bg-purple-600 hover:bg-purple-500 text-white'
                    }`}
                  >
                    {isCompleted ? 'Replay Quest ↻' : 'Play Quest Now →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ACTIVE QUEST MODAL SIMULATOR */}
      {activeQuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-purple-500/60 shadow-2xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-purple-950/40 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-12 rounded-lg bg-slate-950 p-1 border border-purple-400 shrink-0 flex items-center justify-center">
                  <img
                    src={activeQuest.sentinelImage}
                    alt={activeQuest.sentinelGuide}
                    className="h-8 object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="text-xs font-mono text-purple-400 font-bold uppercase">
                    QUEST IN PROGRESS · {activeQuest.category}
                  </div>
                  <h3 className="text-base font-bold text-white">{activeQuest.title}</h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveQuest(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {/* Scenario Display */}
            <div className="p-6 space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="text-xs font-bold text-purple-300 uppercase tracking-wider font-mono">
                  Incoming Scenario Simulation:
                </div>
                <div className="p-3 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {activeQuest.scenarioText}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                <div className="text-xs font-semibold text-slate-300">
                  What is your immediate response?
                </div>
                {activeQuest.options.map((opt, idx) => {
                  const isSelected = selectedOptionIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isAnswerSubmitted}
                      onClick={() => setSelectedOptionIndex(idx)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all text-xs cursor-pointer ${
                        isSelected
                          ? 'bg-purple-950/50 border-purple-400 ring-1 ring-purple-400 text-white font-medium'
                          : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="font-mono text-purple-400 font-bold">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <span>{opt.text}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Outcome */}
              {isAnswerSubmitted && selectedOptionIndex !== null && (
                <div
                  className={`p-4 rounded-xl border space-y-2 animate-in fade-in duration-200 ${
                    activeQuest.options[selectedOptionIndex].isCorrect
                      ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                      : 'bg-rose-950/40 border-rose-500 text-rose-200'
                  }`}
                >
                  <div className="text-xs font-bold font-mono">
                    {activeQuest.options[selectedOptionIndex].isCorrect
                      ? '✓ CORRECT ACTION TAKEN!'
                      : '⚠️ CRITICAL COMPLIANCE GAP DETECTED'}
                  </div>
                  <p className="text-xs leading-relaxed">
                    {activeQuest.options[selectedOptionIndex].explanation}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex justify-between items-center border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setActiveQuest(null)}
                  className="px-3.5 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Exit Simulation
                </button>

                {!isAnswerSubmitted ? (
                  <button
                    type="button"
                    disabled={selectedOptionIndex === null}
                    onClick={handleSubmitAnswer}
                    className="px-5 py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-purple-400 hover:bg-purple-300 transition-colors disabled:opacity-40 shadow-lg"
                  >
                    Lock In Answer & Submit
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveQuest(null)}
                    className="px-5 py-2.5 rounded-lg text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-lg"
                  >
                    Claim Rewards & Return to Academy
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DEPARTMENT LEADERBOARDS & UNLOCKED BADGES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Department Leaderboard */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🏆 Company Department Leaderboard</span>
            </h3>
            <span className="text-xs text-purple-400 font-mono">October 2026</span>
          </div>
          <p className="text-xs text-slate-400">
            Departments compete for the highest security completion rate. Drives company-wide compliance without nagging.
          </p>

          <div className="space-y-3 pt-1">
            {[
              { name: 'HR & People Operations', pct: 100, rank: '#1', streak: '14 days' },
              { name: 'IT & Engineering', pct: 98, rank: '#2', streak: '12 days' },
              { name: 'Factory & Physical Operations', pct: 95, rank: '#3', streak: '9 days' },
              { name: 'Sales & Customer Support', pct: 91, rank: '#4', streak: '6 days' },
              { name: 'Finance & Legal', pct: 88, rank: '#5', streak: '5 days' },
            ].map((dept, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-purple-400">{dept.rank}</span>
                  <span className="font-semibold text-white">{dept.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 font-mono text-[11px]">{dept.streak}</span>
                  <span className="font-mono font-bold text-emerald-400">{dept.pct}% Completed</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Unlocked Sentinel Badges */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>🎖️ Sentinel Achievements & Badges</span>
            </h3>
            <span className="text-xs text-cyan-400 font-mono">3 Unlocked</span>
          </div>
          <p className="text-xs text-slate-400">
            Permanent auditor-verifiable credentials proving you completed continuous security training.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            {[
              {
                title: 'Phishing Buster',
                icon: '🛡️',
                desc: 'Spotted 5 malicious domains and spoofed emails.',
                unlocked: true,
              },
              {
                title: 'Factory Safety Scout',
                icon: '🏭',
                desc: 'Mastered physical plant access and LOTO safety.',
                unlocked: true,
              },
              {
                title: 'Incident Commander',
                icon: '⚡',
                desc: 'Contained simulated 2:00 AM ransomware outbreak.',
                unlocked: false,
              },
              {
                title: 'GDPR Guardian',
                icon: '🔒',
                desc: 'Safeguarded employee and customer PII on devices.',
                unlocked: true,
              },
            ].map((badge, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg border text-left ${
                  badge.unlocked
                    ? 'bg-slate-950 border-purple-500/70 shadow-sm'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-50'
                }`}
              >
                <div className="text-2xl mb-1">{badge.icon}</div>
                <div className="text-xs font-bold text-white">{badge.title}</div>
                <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{badge.desc}</div>
                <div className="text-[10px] font-mono mt-2 font-bold text-cyan-400">
                  {badge.unlocked ? '✓ UNLOCKED' : '🔒 LOCKED'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
