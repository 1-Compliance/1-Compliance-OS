import React, { useState } from 'react';

interface TrainingGuidebookViewProps {
  onOpenSentinelHub: (sentinelId?: string) => void;
  onNavigateTab: (tab: string) => void;
}

interface Chapter {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  badge: string;
  readTime: string;
  summary: string;
  sections: {
    heading: string;
    content: string;
    bullets?: string[];
    callout?: {
      type: 'tip' | 'warning' | 'info' | 'sentinel';
      title: string;
      message: string;
    };
    codeSnippet?: {
      language: string;
      code: string;
    };
    checklist?: string[];
  }[];
}

const CHAPTERS: Chapter[] = [
  {
    id: 'ch1',
    number: 1,
    title: 'System Overview & Architecture',
    subtitle: 'The foundational philosophy and operating model of 1-Compliance OS',
    badge: 'Core Concept',
    readTime: '6 min read',
    summary:
      'Understand how 1-Compliance OS orchestrates multi-framework compliance (SOC 2, ISO 27001, HIPAA, GDPR, PCI DSS v4, EU AI Act) into a unified, continuous operating model rather than stressful annual audit scrambles.',
    sections: [
      {
        heading: '1.1 The Multi-Framework Unified Matrix',
        content:
          'Traditional compliance software forces companies into siloed, repetitive tasks for every framework. 1-Compliance OS utilizes a unified control matrix where a single security control (such as Full-Disk Encryption or MFA) automatically satisfies multiple audits simultaneously.',
        bullets: [
          'SOC 2 Type II: CC6.1, CC6.6, CC6.7 (Logical & Physical Access, Transmission Security)',
          'ISO 27001:2022: Annex A.5.15, A.8.1, A.8.20 (Access Control, User Endpoint Security)',
          'HIPAA Security Rule: 45 CFR § 164.312(a)(2)(iv) (Encryption and Decryption)',
          'GDPR: Article 32 (Security of Processing & Pseudonymization)',
          'PCI DSS v4.0: Requirement 3.5 & 8.3 (Protect Stored Account Data, Strong Authentication)',
        ],
        callout: {
          type: 'sentinel',
          title: 'Jax Compliance Tip',
          message:
            'When you enforce a single security control in the OS, you satisfy up to 6 major compliance frameworks at the same time, saving hundreds of engineering hours.',
        },
      },
      {
        heading: '1.2 Continuous Compliance vs. Point-in-Time Audits',
        content:
          'Audit readiness is maintained every single minute of the year through automated evidence collection and probe monitoring. Instead of screenshotting configurations days before an auditor arrives, 1-Compliance OS cryptographically timestamps system posture daily with SHA-256 evidence hashes.',
      },
    ],
  },
  {
    id: 'ch2',
    number: 2,
    title: '7-Day Fast-Track Audit Readiness Sprint',
    subtitle: 'Step-by-step roadmap to get any company 100% audit-ready in one week',
    badge: 'Quickstart',
    readTime: '8 min read',
    summary:
      'A practical, day-by-day playbook for solo founders, compliance officers, and IT teams to achieve baseline compliance readiness within 7 business days.',
    sections: [
      {
        heading: 'Day 1: Organization Setup & Scope Selection',
        content:
          'Select your target frameworks in the Controls Matrix. For modern tech and SaaS businesses, standard initial scope is SOC 2 Type II + HIPAA or ISO 27001.',
        checklist: [
          'Choose your target frameworks (SOC 2, ISO 27001, HIPAA, GDPR)',
          'Configure primary company domains in the Website Scanner',
          'Invite primary team members and allocate seats under your subscription tier',
        ],
      },
      {
        heading: 'Day 2: Policy Customization & Executive Sign-Off',
        content:
          'Open the Policy Engine tab. Customize and adopt the 12 master security policies. All 12 policies include pre-built clauses mapped to SOC 2 and ISO 27001 controls.',
        checklist: [
          'Review Information Security Policy (Master)',
          'Adopt Access Control, Password & MFA Policy',
          'Adopt Incident Response Plan & Business Continuity Policy',
          'Export and sign executive approval block',
        ],
      },
      {
        heading: 'Day 3: Endpoint Fleet & Cloud Infrastructure Hardening',
        content:
          'Deploy IT fleet verification scripts to verify laptop full-disk encryption (FileVault for macOS, BitLocker for Windows), lock screen timeouts (15 minutes or less), and endpoint antivirus/EDR.',
        codeSnippet: {
          language: 'bash',
          code: '# Verify macOS FileVault encryption posture\nfdesetup status\n# Output: FileVault is On. (Automated proof of CC6.6)',
        },
      },
      {
        heading: 'Day 4: Third-Party Vendor Risk & Vetting',
        content:
          'Add your critical suppliers (cloud hosts, payment processors, CRM, code repositories) into the Vendor Portal. Dispatch automated risk questionnaires to each vendor.',
      },
      {
        heading: 'Day 5: Production Website Scanner Run',
        content:
          'Run the 1-Compliance Website Scanner against your production endpoints (e.g., https://www.1-compliance.com) to evaluate TLS 1.3, HSTS, CSP, and X-Content-Type security headers.',
      },
      {
        heading: 'Day 6: Employee Security Awareness Training',
        content:
          'Launch the Gamified Training Arcade. Have employees complete the 4 core quests: Phishing Defense, Clean Desk & Screen Locking, Password Security, and Data Classification.',
      },
      {
        heading: 'Day 7: 1-Click Auditor Binder Export',
        content:
          'Generate your complete audit package via the "Export Binder" button. The resulting package contains your Master Control Matrix, evidence index, and cryptographic SHA-256 integrity report.',
      },
    ],
  },
  {
    id: 'ch3',
    number: 3,
    title: 'The Sentinel Squad & Voice AI Manual',
    subtitle: 'How to utilize Jax and the 4 category sentinels for voice-directed compliance',
    badge: 'AI Sentinels',
    readTime: '5 min read',
    summary:
      'Operate Jax (Chief Sentinel) and the specialized category sentinels using live audio briefings, compliance guidance, and automated voice controls.',
    sections: [
      {
        heading: '3.1 The 5 Sentinel Personas & Roles',
        content:
          'Each sentinel guards a dedicated compliance domain with specialized regulatory knowledge and operational focus:',
        bullets: [
          'Jax (Lead Sentinel, #1): Orchestrates overall company compliance, executive summaries, multi-user seats, and auditor handoffs.',
          'IT Sentinel: Fleet laptop encryption (FileVault/BitLocker), cloud security posture (CSPM), CI/CD container scans.',
          'Privacy Sentinel: GDPR, HIPAA, Website Security Scanner, cookie consent, TLS 1.3 & data encryption in transit.',
          'Risky Sentinel: Third-party vendor risk scoring, supply chain vetting, and SOC 2 CC9.2 vendor diligence.',
          'HR Sentinel: Employee background checks, annual policy sign-offs, and training quest completion.',
        ],
        callout: {
          type: 'info',
          title: 'Audio Briefings & Browser Speech',
          message:
            'You can click the audio button on any sentinel stage to hear real-time compliance briefings and control playback directly in your browser.',
        },
      },
      {
        heading: '3.2 Audio Briefings & Voice Interactions',
        content:
          'Click the "🔊 Speak" button or click directly on Jax or any Sentinel to hear live audio briefings. You can also click the quick compliance question chips to hear voice answers immediately.',
      },
    ],
  },
  {
    id: 'ch4',
    number: 4,
    title: 'Policy Engine: The 12 Master Enterprise Policies',
    subtitle: 'Customizing, distributing, and executing legally sound security policies',
    badge: 'Policy Governance',
    readTime: '7 min read',
    summary:
      'A complete guide to adopting, customizing, and maintaining the 12 master compliance policies required by SOC 2, ISO 27001, HIPAA, and GDPR.',
    sections: [
      {
        heading: '4.1 The 12 Master Policies Catalog',
        content:
          'Every auditor will request these 12 policies. 1-Compliance OS includes full enterprise drafts with customizable variables:',
        bullets: [
          'POL-01: Information Security Master Policy (ISMS Core)',
          'POL-02: Access Control, Authentication & Password Policy',
          'POL-03: Incident Response & Breach Notification Plan',
          'POL-04: Business Continuity & Disaster Recovery (BC/DR)',
          'POL-05: Data Classification, Retention & Disposal Policy',
          'POL-06: Cryptography, Key Management & Encryption Policy',
          'POL-07: Third-Party Vendor Risk & Supply Chain Management',
          'POL-08: Vulnerability Management & Secure SDLC Policy',
          'POL-09: Human Resources Security & Background Vetting',
          'POL-10: Acceptable Use & Remote Work Device Policy',
          'POL-11: Physical Security & Clean Desk / Clean Screen',
          'POL-12: AI Governance & Ethical Machine Learning (EU AI Act)',
        ],
      },
      {
        heading: '4.2 Instant Variable Customization',
        content:
          'Open the Policy Engine tab. Use the "Company Name", "Security Officer Name", and "Effective Date" fields to instantly propagate your organization details across all 12 documents simultaneously.',
      },
      {
        heading: '4.3 Annual Review & Auditor Sign-Off',
        content:
          'Auditors require proof that policies are reviewed at least once every 12 months. When you update a policy in 1-Compliance OS, the system records the review timestamp and officer name into the auditor export package.',
      },
    ],
  },
  {
    id: 'ch5',
    number: 5,
    title: 'Third-Party Vendor Risk & Vetting Portal',
    subtitle: 'Vetting external suppliers without exposing internal corporate systems',
    badge: 'Supply Chain Vetting',
    readTime: '6 min read',
    summary:
      'Manage vendor diligence, automate security questionnaire scoring, and enforce your subscription rules for third-party entities.',
    sections: [
      {
        heading: '5.1 Isolating External Suppliers',
        content:
          'External vendors should never receive direct access to your internal compliance records. 1-Compliance OS provides an isolated Third-Party Vendor Portal where suppliers submit security certifications (SOC 2 reports, ISO certificates, penetration tests) in a restricted guest view.',
      },
      {
        heading: '5.2 Vetting Rules & Billing Options',
        content:
          '1-Compliance OS supports two distinct commercial options for third-party vetting:',
        bullets: [
          'Included Guest Access: As part of your company subscription, you can invite unlimited third-party vendors to complete compliance vetting at no extra cost to the vendor.',
          'Vendor-Paid Certification: If your enterprise policy mandates that suppliers cover their own audit verification, vendors can subscribe to a Vendor Compliance Passport ($49/mo or $499/yr) to receive certified audit badges and share their verified profile across all your enterprise clients.',
        ],
      },
    ],
  },
  {
    id: 'ch6',
    number: 6,
    title: 'Subscription Tiers & Seat Scaling Calculator',
    subtitle: 'Understanding the $149, $299, and $999/mo per 100-user enterprise pricing model',
    badge: 'Pricing & Licensing',
    readTime: '5 min read',
    summary:
      'Detailed breakdown of subscription pricing, seat management, and scaling calculations for organizations from 1 to 10,000+ employees.',
    sections: [
      {
        heading: '6.1 The 3 Subscription Tiers',
        content:
          'The platform features simple, transparent pricing designed to scale seamlessly with company growth:',
        bullets: [
          'Solo / Founder Plan ($149 / month): Single user login. Full autonomous OS, all 5 sentinels, 12 policies, website scanner, auditor binder export.',
          'Team Compliance Plan ($299 / month): Up to 5 company logins with Role-Based Access Control (RBAC), cross-department task delegation, and automated webhook alerts.',
          'Enterprise Scale Plan ($999 / month for 6 to 100 logins): Comprehensive company-wide compliance across all employees and factory operations, SSO directory sync, and dedicated support.',
        ],
      },
      {
        heading: '6.2 Enterprise Scaling Formula for Groups Over 100 Users',
        content:
          'For companies with more than 100 users, billing increases by $999 per month for every additional group of 100 users:',
        codeSnippet: {
          language: 'text',
          code: '1 to 100 Users:   $999 / month\n101 to 200 Users: $999 + $999 = $1,998 / month\n201 to 300 Users: $999 + $999 + $999 = $2,997 / month\n301 to 400 Users: $3,996 / month\nFormula: Ceiling(Users / 100) * $999/month',
        },
      },
      {
        heading: '6.3 Member Seat Allocation & Invite Workflow',
        content:
          'Admins can invite employees directly via email from the "SaaS Pricing" tab. Seats are dynamically tracked against your organization limit (e.g., 42/100 seats used). If your user count exceeds your current tier, the system prompts for 1-click tier scaling.',
      },
    ],
  },
  {
    id: 'ch7',
    number: 7,
    title: 'Website Integration Guide for www.1-compliance.com',
    subtitle: 'How to embed the operating system and allow customers to subscribe directly on your website',
    badge: 'Website Integration',
    readTime: '6 min read',
    summary:
      'Step-by-step instructions to embed 1-Compliance OS onto www.1-compliance.com and configure direct online subscriptions.',
    sections: [
      {
        heading: '7.1 Recommended Integration Architecture',
        content:
          'For optimal performance, SEO, and security, the recommended architecture connects your main marketing site (www.1-compliance.com) to the operating system hosted at a secure subdomain:',
        bullets: [
          'Marketing & Sales Website: https://www.1-compliance.com (features pricing, product tour, blog, testimonials)',
          'Live Web Application: https://app.1-compliance.com or https://os.1-compliance.com (the full operating system)',
          'Embedded In-Page Portal: https://www.1-compliance.com/app (full responsive iframe embed of the OS)',
        ],
      },
      {
        heading: '7.2 DNS Subdomain Setup (CNAME Record)',
        content:
          'To point app.1-compliance.com to your cloud-hosted 1-Compliance OS instance, add a CNAME record in your domain registrar (GoDaddy, Namecheap, Cloudflare, AWS Route 53):',
        codeSnippet: {
          language: 'dns',
          code: '# DNS CNAME Record for 1-compliance.com:\nType:   CNAME\nHost:   app  (or os)\nTarget: ais-pre-bujpgws4gxgxrag4iyp337-615345061292.us-east1.run.app\nTTL:    Automatic / 3600\nSSL:    Managed Certificate (Issued Automatically)',
        },
      },
      {
        heading: '7.3 Embedding the OS Directly into www.1-compliance.com/app',
        content:
          'Copy and paste this responsive iframe embed code into your CMS (WordPress, Webflow, Squarespace, or custom React/HTML):',
        codeSnippet: {
          language: 'html',
          code: '<div style="position: relative; width: 100%; height: 100vh; overflow: hidden;">\n  <iframe\n    src="https://ais-pre-bujpgws4gxgxrag4iyp337-615345061292.us-east1.run.app"\n    title="1-Compliance OS"\n    style="width: 100%; height: 100%; border: none;"\n    allow="clipboard-write; camera; microphone; speaker"\n  ></iframe>\n</div>',
        },
      },
      {
        heading: '7.4 Direct "Start Subscription" CTA Buttons for Marketing Pages',
        content:
          'Place CTA buttons on your website header and pricing table linking directly to the subscription flow:',
        codeSnippet: {
          language: 'html',
          code: '<a href="https://app.1-compliance.com/#subscriptions" class="btn-primary">\n  Start $149/mo Subscription →\n</a>',
        },
      },
    ],
  },
  {
    id: 'ch8',
    number: 8,
    title: 'Standalone Program & IT/Tech Team Deployment Blueprint',
    subtitle: 'Containerization, self-hosting, and desktop standalone packaging for future internal engineering teams',
    badge: 'IT & DevOps',
    readTime: '7 min read',
    summary:
      'A technical blueprint for your future internal IT/Tech team to deploy 1-Compliance OS as a self-hosted private program or standalone desktop application.',
    sections: [
      {
        heading: '8.1 Current Online SaaS vs. Future Standalone Program',
        content:
          'While you are currently operating in SaaS online mode to advertise and acquire subscribers immediately, your future IT team can package the platform into a standalone enterprise program with two deployment methods:',
        bullets: [
          'Docker Container Deployment: Host inside private enterprise VPCs (AWS ECS, Google Cloud Run, Kubernetes, or on-premises servers) for banking and defense clients requiring air-gapped compliance.',
          'Standalone Desktop Application (Electron): Package the entire operating system into an offline/local executable (.exe for Windows, .dmg for macOS, .AppImage for Linux).',
        ],
      },
      {
        heading: '8.2 Production Dockerfile Blueprint',
        content:
          'Your IT team can build and run 1-Compliance OS anywhere using this production Dockerfile:',
        codeSnippet: {
          language: 'dockerfile',
          code: 'FROM node:22-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:22-alpine AS runner\nWORKDIR /app\nENV NODE_ENV=production\nENV PORT=3000\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/package*.json ./\nCOPY --from=builder /app/server.ts ./\nRUN npm ci --omit=dev\nEXPOSE 3000\nCMD ["npm", "run", "start"]',
        },
      },
      {
        heading: '8.3 Docker Compose Multi-Container Configuration',
        content:
          'Run the application with persistent PostgreSQL and Redis caching using Docker Compose:',
        codeSnippet: {
          language: 'yaml',
          code: 'version: "3.8"\nservices:\n  one-compliance-os:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      - PORT=3000\n      - NODE_ENV=production\n      - DATABASE_URL=postgresql://postgres:secret@db:5432/compliance\n    depends_on:\n      - db\n\n  db:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_DB: compliance\n      POSTGRES_PASSWORD: secret\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n\nvolumes:\n  pgdata:',
        },
      },
    ],
  },
  {
    id: 'ch9',
    number: 9,
    title: '1-Click Auditor Package & Export Verification',
    subtitle: 'Preparing clean, irrefutable evidence binders for BDO, Schellman, Coalfire, and A-LIGN auditors',
    badge: 'Audit Defense',
    readTime: '5 min read',
    summary:
      'Learn how to generate certified auditor zip packages, inspect evidence chains of custody, and conduct successful auditor walkthroughs.',
    sections: [
      {
        heading: '9.1 Generating the Certified Auditor Package',
        content:
          'Click the "Export Binder" button in the top navigation bar. Select your target framework and audit period. The system generates a structured ZIP archive containing:',
        bullets: [
          'Master Control Implementation Matrix (PDF & CSV formats)',
          'All 12 Signed Enterprise Security Policies with review timestamps',
          'Cryptographic Evidence Locker with SHA-256 integrity hashes',
          'Third-Party Vendor Risk Register and questionnaire scores',
          'Employee Training Quest Completion Roster',
          'Auditor Readme & Navigation Guide',
        ],
      },
      {
        heading: '9.2 Conducting the Live Auditor Walkthrough',
        content:
          'When your CPA auditor schedules the live walkthrough, grant them an "External Auditor" seat (view-only). Auditors can independently verify control status, inspect evidence logs, and verify that automated checks run continuously.',
      },
    ],
  },
  {
    id: 'ch10',
    number: 10,
    title: 'Troubleshooting, FAQ & Compliance Support',
    subtitle: 'Common operational scenarios, error recovery, and escalation protocols',
    badge: 'Operations & FAQ',
    readTime: '4 min read',
    summary:
      'Answers to frequently asked questions by compliance officers, department managers, and executive leadership.',
    sections: [
      {
        heading: 'Frequently Asked Questions',
        content: 'Quick answers to common questions encountered during deployment:',
        bullets: [
          'Q: Can we upgrade from Solo ($149) to Team ($299) mid-month? A: Yes. Upgrades are prorated immediately, and additional seats are unlocked instantly without interrupting active audits.',
          'Q: How do we prove laptop encryption if employees are remote? A: IT Sentinel blueprints include an automated probe snippet that logs FileVault/BitLocker status to the evidence locker daily.',
          'Q: Do our third-party vendors have access to our company documents? A: No. The Third-Party Vendor Portal is strictly isolated. Vendors only view and respond to their specific questionnaire.',
          'Q: How do we download this entire manual for our offline records? A: Click the "Export Complete Manual" button at the top of this page to export a printable markdown/PDF copy.',
        ],
      },
    ],
  },
];

export const TrainingGuidebookView: React.FC<TrainingGuidebookViewProps> = ({
  onOpenSentinelHub,
  onNavigateTab,
}) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ch1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedSnippetIndex, setCopiedSnippetIndex] = useState<string | null>(null);

  const currentChapter = CHAPTERS.find((c) => c.id === selectedChapterId) || CHAPTERS[0];

  // Search filter across chapters and sections
  const filteredChapters = CHAPTERS.filter((ch) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const inTitle = ch.title.toLowerCase().includes(q) || ch.subtitle.toLowerCase().includes(q);
    const inSections = ch.sections.some(
      (s) => s.heading.toLowerCase().includes(q) || s.content.toLowerCase().includes(q)
    );
    return inTitle || inSections;
  });

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSnippetIndex(id);
    setTimeout(() => setCopiedSnippetIndex(null), 2500);
  };

  const handleDownloadFullManual = () => {
    let fullText = `# 1-Compliance OS — Official Enterprise Training Manual & How-To Guidebook\n`;
    fullText += `Website: https://www.1-compliance.com | Generated: ${new Date().toLocaleDateString()}\n\n`;
    fullText += `Autonomous multi-framework operating system for SOC 2 Type II, ISO 27001, HIPAA, GDPR, PCI DSS v4, and EU AI Act.\n\n`;
    fullText += `---\n\n`;

    CHAPTERS.forEach((ch) => {
      fullText += `## Chapter ${ch.number}: ${ch.title}\n`;
      fullText += `*${ch.subtitle}* (${ch.readTime})\n\n`;
      fullText += `${ch.summary}\n\n`;

      ch.sections.forEach((sec) => {
        fullText += `### ${sec.heading}\n\n${sec.content}\n\n`;
        if (sec.bullets) {
          sec.bullets.forEach((b) => (fullText += `- ${b}\n`));
          fullText += `\n`;
        }
        if (sec.checklist) {
          fullText += `**Operational Checklist:**\n`;
          sec.checklist.forEach((item) => (fullText += `- [ ] ${item}\n`));
          fullText += `\n`;
        }
        if (sec.codeSnippet) {
          fullText += `\`\`\`${sec.codeSnippet.language}\n${sec.codeSnippet.code}\n\`\`\`\n\n`;
        }
      });
      fullText += `---\n\n`;
    });

    const blob = new Blob([fullText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `1-Compliance-OS-Official-Training-Manual-${new Date().toISOString().slice(0, 10)}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-indigo-200/90 bg-white/95 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-400/15 via-cyan-400/10 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-indigo-100 text-indigo-950 border border-indigo-300 shadow-xs">
                📖 Official Documentation & Handbook
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-cyan-100 text-cyan-950 border border-cyan-300 shadow-xs">
                10 Comprehensive Chapters
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-emerald-100 text-emerald-950 border border-emerald-300 shadow-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                Audit-Ready Standard Operating Procedures
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-950 tracking-tight">
              1-Compliance OS Training Manual & Guidebook
            </h1>
            <p className="text-sm sm:text-base font-medium text-slate-700 leading-relaxed">
              The complete operational guidebook for compliance officers, enterprise IT teams, and department managers.
              Learn how to run 1-Compliance OS, automate audits, integrate with <strong className="text-indigo-900 font-extrabold">www.1-compliance.com</strong>, manage <strong className="text-indigo-900 font-extrabold">$149 - $999+</strong> subscriptions, and deploy standalone IT programs.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap sm:flex-col gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleDownloadFullManual}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>📥 Export Full Manual (.MD)</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenSentinelHub('jax')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-indigo-50 border border-indigo-300 text-indigo-950 font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <img src="/assets/sentinels/jax_transparent.png" alt="Jax" className="w-5 h-5 object-contain" />
              <span>Ask Jax About Manual</span>
            </button>
          </div>
        </div>

        {/* Live Search & Filter Bar */}
        <div className="relative z-10 mt-6 pt-5 border-t border-indigo-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-96">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chapters, policies, scripts, SOC 2..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-indigo-200 bg-white text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span>Jump to:</span>
            <button
              type="button"
              onClick={() => setSelectedChapterId('ch7')}
              className="px-2.5 py-1 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 cursor-pointer font-bold"
            >
              🌐 Website Integration
            </button>
            <button
              type="button"
              onClick={() => setSelectedChapterId('ch6')}
              className="px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border border-emerald-200 cursor-pointer font-bold"
            >
              💳 $149 - $999+ Tiers
            </button>
            <button
              type="button"
              onClick={() => setSelectedChapterId('ch8')}
              className="px-2.5 py-1 rounded-lg bg-cyan-50 hover:bg-cyan-100 text-cyan-950 border border-cyan-200 cursor-pointer font-bold"
            >
              🐳 IT Standalone Setup
            </button>
          </div>
        </div>
      </div>

      {/* Main Dual-Column Reader View: Chapter Index (Left) & Active Content (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Chapters Navigation Index (Col 4) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-3 rounded-2xl bg-white/95 border border-indigo-200 shadow-sm">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-indigo-100 px-1">
              <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                Table of Contents ({filteredChapters.length} Chapters)
              </span>
              <span className="text-[11px] font-mono text-indigo-600 font-bold">Standard v2.4</span>
            </div>

            <div className="space-y-1.5 max-h-[720px] overflow-y-auto pr-1">
              {filteredChapters.map((ch) => {
                const isSelected = ch.id === selectedChapterId;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setSelectedChapterId(ch.id)}
                    className={`w-full p-3 rounded-xl text-left transition-all cursor-pointer flex flex-col gap-1 border ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white border-transparent shadow-md scale-[1.01]'
                        : 'bg-white hover:bg-indigo-50/70 border-slate-200/80 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-md ${
                          isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-indigo-900'
                        }`}
                      >
                        Chapter {ch.number}
                      </span>
                      <span className={`text-[10px] font-semibold ${isSelected ? 'text-cyan-100' : 'text-slate-500'}`}>
                        {ch.readTime}
                      </span>
                    </div>

                    <h4 className="text-xs font-black tracking-tight line-clamp-1">{ch.title}</h4>
                    <p
                      className={`text-[11px] line-clamp-1 ${
                        isSelected ? 'text-indigo-100 font-medium' : 'text-slate-500 font-normal'
                      }`}
                    >
                      {ch.subtitle}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Context Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white space-y-3 shadow-md">
            <div className="flex items-center gap-2">
              <img src="/assets/sentinels/jax_transparent.png" alt="Jax" className="w-8 h-8 object-contain" />
              <div>
                <h5 className="text-xs font-black">Need Custom Compliance Procedures?</h5>
                <p className="text-[10px] text-indigo-300">Jax & Sentinels are standing by</p>
              </div>
            </div>
            <p className="text-xs text-indigo-200 leading-snug">
              Every procedure in this manual can be customized to match your company's specific cloud stack, identity provider, or HR systems.
            </p>
            <button
              type="button"
              onClick={() => onOpenSentinelHub('jax')}
              className="w-full py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black transition-colors"
            >
              Open Sentinel Chat →
            </button>
          </div>
        </div>

        {/* Right Column: Chapter Detail Content (Col 8) */}
        <div className="lg:col-span-8 space-y-5">
          <article className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-indigo-200/90 shadow-md space-y-6">
            {/* Chapter Header */}
            <header className="pb-5 border-b border-indigo-100 space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-indigo-100 text-indigo-900 border border-indigo-300">
                  Chapter {currentChapter.number} · {currentChapter.badge}
                </span>
                <span className="text-xs font-semibold text-slate-500">⏱️ {currentChapter.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                {currentChapter.title}
              </h2>
              <p className="text-sm font-semibold text-indigo-900">{currentChapter.subtitle}</p>

              {/* Summary Box */}
              <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs text-slate-800 leading-relaxed font-medium">
                <strong>Executive Summary:</strong> {currentChapter.summary}
              </div>
            </header>

            {/* Chapter Body Sections */}
            <div className="space-y-8">
              {currentChapter.sections.map((sec, sIdx) => (
                <section key={sIdx} className="space-y-3">
                  <h3 className="text-lg font-black text-slate-950 flex items-center gap-2">
                    <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-indigo-600 to-cyan-500" />
                    <span>{sec.heading}</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">{sec.content}</p>

                  {/* Bullet points */}
                  {sec.bullets && (
                    <ul className="space-y-1.5 pl-2">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2">
                          <span className="text-cyan-600 font-bold mt-0.5">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Operational Checklist */}
                  {sec.checklist && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-indigo-200 space-y-2">
                      <span className="text-xs font-black uppercase text-indigo-950 flex items-center gap-1.5">
                        <span>✅</span>
                        <span>Action Checklist:</span>
                      </span>
                      <div className="space-y-1.5">
                        {sec.checklist.map((item, cIdx) => (
                          <div key={cIdx} className="flex items-center gap-2 text-xs font-medium text-slate-800">
                            <input
                              type="checkbox"
                              id={`chk-${sIdx}-${cIdx}`}
                              className="w-4 h-4 rounded-md text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor={`chk-${sIdx}-${cIdx}`} className="cursor-pointer">
                              {item}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Callout box */}
                  {sec.callout && (
                    <div
                      className={`p-4 rounded-2xl border flex items-start gap-3 ${
                        sec.callout.type === 'sentinel'
                          ? 'bg-cyan-50 border-cyan-300 text-cyan-950'
                          : sec.callout.type === 'tip'
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                          : 'bg-indigo-50 border-indigo-300 text-indigo-950'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-white/80 p-1 shrink-0 flex items-center justify-center shadow-xs">
                        {sec.callout.type === 'sentinel' ? (
                          <img
                            src="/assets/sentinels/jax_transparent.png"
                            alt="Jax"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          '💡'
                        )}
                      </div>
                      <div className="space-y-0.5 text-xs">
                        <strong className="font-black">{sec.callout.title}</strong>
                        <p className="font-medium leading-relaxed">{sec.callout.message}</p>
                      </div>
                    </div>
                  )}

                  {/* Copyable Code Snippet */}
                  {sec.codeSnippet && (
                    <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 font-mono text-xs shadow-md">
                      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                        <span className="text-[11px] text-cyan-400 font-bold uppercase">
                          {sec.codeSnippet.language}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyCode(sec.codeSnippet!.code, `code-${sIdx}`)}
                          className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-bold cursor-pointer transition-colors"
                        >
                          {copiedSnippetIndex === `code-${sIdx}` ? '✓ Copied!' : '📋 Copy Snippet'}
                        </button>
                      </div>
                      <pre className="p-4 overflow-x-auto leading-relaxed text-slate-200">
                        <code>{sec.codeSnippet.code}</code>
                      </pre>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Chapter Footer Navigation */}
            <footer className="pt-6 border-t border-indigo-100 flex items-center justify-between gap-4">
              {currentChapter.number > 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    const prev = CHAPTERS.find((c) => c.number === currentChapter.number - 1);
                    if (prev) setSelectedChapterId(prev.id);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer"
                >
                  ← Chapter {currentChapter.number - 1}
                </button>
              ) : (
                <div />
              )}

              {currentChapter.number < CHAPTERS.length ? (
                <button
                  type="button"
                  onClick={() => {
                    const next = CHAPTERS.find((c) => c.number === currentChapter.number + 1);
                    if (next) setSelectedChapterId(next.id);
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  Chapter {currentChapter.number + 1} →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleDownloadFullManual}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  📥 Download Complete Manual
                </button>
              )}
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
};
