import {
  Framework,
  ControlItem,
  PolicyDocument,
  EvidenceItem,
  VendorItem,
  RiskItem,
  FreeToolBlueprint,
  AssetSystemItem,
  ITAssetItem,
  CryptoComplianceRecord,
  IncidentRecord,
  ForensicPreservation,
  ComplianceCalendarEvent,
  LegalUpdateItem,
  ObligationItem,
  RaciRole,
  ComplianceTask,
  TrainingRecord,
} from '../types/compliance';

export const INITIAL_FRAMEWORKS: Framework[] = [
  {
    id: 'soc2',
    name: 'SOC 2 Type II',
    fullName: 'AICPA Trust Services Criteria (TSC 2017)',
    description: 'Security, Availability, Confidentiality, and Processing Integrity for SaaS and enterprise platforms.',
    totalControls: 32,
    compliantControls: 26,
    standardVersion: 'TSC 2017 with 2022 Points of Focus',
    badge: 'SOC 2',
  },
  {
    id: 'iso27001',
    name: 'ISO/IEC 27001',
    fullName: 'Information Security Management System (ISMS)',
    description: 'International standard specifying requirements for establishing, implementing, and maintaining an ISMS.',
    totalControls: 35,
    compliantControls: 28,
    standardVersion: 'ISO/IEC 27001:2022 (Annex A)',
    badge: 'ISO 27001',
  },
  {
    id: 'gdpr',
    name: 'GDPR / UK GDPR',
    fullName: 'General Data Protection Regulation',
    description: 'EU & UK regulatory privacy framework for processing personal data, consent, and user data rights.',
    totalControls: 24,
    compliantControls: 21,
    standardVersion: 'Regulation (EU) 2016/679',
    badge: 'GDPR',
  },
  {
    id: 'hipaa',
    name: 'HIPAA Security',
    fullName: 'Health Insurance Portability & Accountability Act',
    description: 'Administrative, physical, and technical safeguards for protected health information (ePHI).',
    totalControls: 22,
    compliantControls: 18,
    standardVersion: '45 CFR Part 160 & Part 164 Subparts A & C',
    badge: 'HIPAA',
  },
  {
    id: 'pcidss',
    name: 'PCI DSS v4.0',
    fullName: 'Payment Card Industry Data Security Standard',
    description: 'Technical and operational requirements designed to protect cardholder account data.',
    totalControls: 20,
    compliantControls: 16,
    standardVersion: 'v4.0.1 (Mandatory 2025/2026)',
    badge: 'PCI DSS',
  },
  {
    id: 'nistcsf',
    name: 'NIST CSF 2.0',
    fullName: 'NIST Cybersecurity Framework 2.0',
    description: 'Govern, Identify, Protect, Detect, Respond, and Recover core cybersecurity functions.',
    totalControls: 28,
    compliantControls: 23,
    standardVersion: 'NIST CSF 2.0 (2024)',
    badge: 'NIST CSF',
  },
  {
    id: 'eu_ai_act',
    name: 'EU AI Act',
    fullName: 'European Union Artificial Intelligence Regulation',
    description: 'Autonomous governance, risk management, human oversight, and data provenance for AI systems.',
    totalControls: 18,
    compliantControls: 14,
    standardVersion: 'Regulation (EU) 2024/1689',
    badge: 'EU AI Act',
  },
  {
    id: 'mica_crypto',
    name: 'MiCA / FinCEN Crypto',
    fullName: 'Markets in Crypto-Assets & FinCEN MSB Framework',
    description: 'AML/CFT compliance, Travel Rule, custody segregation, whitepaper disclosures, and smart contract security.',
    totalControls: 19,
    compliantControls: 15,
    standardVersion: 'EU Regulation 2023/1114 & 31 CFR Chapter X',
    badge: 'Crypto MiCA',
  },
  {
    id: 'cmmc',
    name: 'CMMC 2.0 / NIST 800-171',
    fullName: 'Cybersecurity Maturity Model Certification',
    description: 'Protection of Controlled Unclassified Information (CUI) and defense supply chain compliance.',
    totalControls: 26,
    compliantControls: 20,
    standardVersion: 'CMMC Level 2 (Advanced)',
    badge: 'CMMC / Gov',
  },
];

export const INITIAL_CONTROLS: ControlItem[] = [
  {
    id: 'ctrl-01',
    code: 'IAM-01',
    title: 'Mandatory Multi-Factor Authentication (MFA)',
    category: 'Access & Identity',
    description: 'Enforce MFA/2FA for all administrative accounts, email, code repositories, and production cloud infrastructure.',
    frameworks: ['SOC 2 CC6.1', 'ISO 27001 A.8.5', 'HIPAA §164.312(d)', 'PCI DSS 8.4', 'NIST CSF PR.AC-7'],
    status: 'compliant',
    evidenceCount: 14,
    freeTool: 'Google Workspace Basic / GitHub Org 2FA Policy',
    freeToolCategory: 'Identity & Access',
    automatedCheck: 'GitHub API organization 2FA verification query',
    remediationSnippet: 'GitHub: Settings > Organizations > Authentication security > Require two-factor authentication for all members.',
    lastChecked: 'Today, automated via GitHub API',
  },
  {
    id: 'ctrl-02',
    code: 'NET-01',
    title: 'Web Transport Security (TLS 1.3 & HSTS)',
    category: 'Infrastructure & Cloud',
    description: 'All public endpoints and APIs must strictly enforce HTTPS, modern cipher suites, and 1-year HSTS preloading.',
    frameworks: ['SOC 2 CC6.6', 'ISO 27001 A.8.20', 'PCI DSS 4.1', 'HIPAA §164.312(e)(1)'],
    status: 'compliant',
    evidenceCount: 8,
    freeTool: 'Cloudflare Free Tier / Let\'s Encrypt + 1-Compliance Scanner',
    freeToolCategory: 'Transport Security',
    automatedCheck: 'Live SSL/TLS cipher & HSTS header audit via 1-Compliance Scanner',
    remediationSnippet: 'Cloudflare: SSL/TLS > Edge Certificates > Always Use HTTPS [ON] & Minimum TLS Version [1.2/1.3] & HSTS [Enable 12 Months].',
    lastChecked: 'Today, continuous probe',
  },
  {
    id: 'ctrl-03',
    code: 'APP-01',
    title: 'Automated Dependency & Static Vulnerability Scanning',
    category: 'Application Security',
    description: 'Continuous scanning of source code, dependencies, and container images for known CVEs and insecure patterns.',
    frameworks: ['SOC 2 CC7.1', 'ISO 27001 A.8.8', 'PCI DSS 6.3.3', 'NIST CSF PR.PS-02'],
    status: 'compliant',
    evidenceCount: 22,
    freeTool: 'Trivy + Grype (Open Source) via GitHub Actions',
    freeToolCategory: 'Vulnerability Management',
    automatedCheck: 'GitHub Actions workflow .github/workflows/security-scan.yml on every PR',
    remediationSnippet: 'name: Security Audit\non: [push, pull_request]\njobs:\n  trivy:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: aquasecurity/trivy-action@master\n        with:\n          scan-type: fs\n          severity: CRITICAL,HIGH',
    lastChecked: 'Yesterday, CI/CD run #142',
  },
  {
    id: 'ctrl-04',
    code: 'APP-02',
    title: 'Automated Secret Leak Detection',
    category: 'Application Security',
    description: 'Prevent API keys, private certificates, database credentials, and secrets from entering version control.',
    frameworks: ['SOC 2 CC6.1', 'ISO 27001 A.8.28', 'PCI DSS 6.5.1', 'NIST CSF PR.DS-05'],
    status: 'compliant',
    evidenceCount: 19,
    freeTool: 'Gitleaks (Open Source) + GitHub Push Protection (Free)',
    freeToolCategory: 'Secret Scanning',
    automatedCheck: 'Gitleaks CLI in pre-commit hook and GitHub Actions',
    remediationSnippet: 'brew install gitleaks || curl -sSfL https://github.com/gitleaks/gitleaks/releases/latest/download/gitleaks_linux_x64.tar.gz | tar -xz\ngitleaks detect --source . --verbose',
    lastChecked: 'Today, CI/CD push verify',
  },
  {
    id: 'ctrl-05',
    code: 'SEC-01',
    title: 'Content-Security-Policy & Clickjacking Headers',
    category: 'Infrastructure & Cloud',
    description: 'Mitigate XSS, malicious frames, and clickjacking attacks using strict CSP, X-Frame-Options, and nosniff directives.',
    frameworks: ['SOC 2 CC6.1', 'ISO 27001 A.8.26', 'PCI DSS 6.4.3'],
    status: 'compliant',
    evidenceCount: 6,
    freeTool: '1-Compliance Scanner + Cloudflare Transform Rules',
    freeToolCategory: 'Web App Security',
    automatedCheck: '1-Compliance Scanner header probe against production domain',
    remediationSnippet: 'Cloudflare Rules > Transform Rules > Modify Response Header:\nSet Content-Security-Policy: default-src \'self\'; script-src \'self\'; object-src \'none\';\nSet X-Frame-Options: DENY\nSet X-Content-Type-Options: nosniff',
    lastChecked: 'Today, 1-Compliance Scanner run',
  },
  {
    id: 'ctrl-06',
    code: 'IAM-02',
    title: 'Quarterly Access Review & Least Privilege Audit',
    category: 'Access & Identity',
    description: 'Documented periodic verification of user privileges across GitHub, AWS, Google Workspace, and production databases.',
    frameworks: ['SOC 2 CC6.2', 'CC6.3', 'ISO 27001 A.5.18', 'HIPAA §164.308(a)(4)', 'PCI DSS 7.2'],
    status: 'in_progress',
    evidenceCount: 4,
    freeTool: '1-Compliance OS Access Ledger + Google Sheets / GitHub Audit Logs',
    freeToolCategory: 'Access Governance',
    automatedCheck: 'Quarterly cron reminder + exportable access audit ledger',
    remediationSnippet: 'gh api orgs/YOUR_ORG/members --paginate | jq \'.[] | {login: .login, role: .role}\' > access-review-q4.json',
    lastChecked: '14 days ago',
  },
  {
    id: 'ctrl-07',
    code: 'DAT-01',
    title: 'Data Encryption at Rest (AES-256)',
    category: 'Data Protection',
    description: 'All production databases, object storage, backups, and virtual disks must be encrypted with AES-256.',
    frameworks: ['SOC 2 CC6.6', 'ISO 27001 A.8.24', 'HIPAA §164.312(a)(2)(iv)', 'PCI DSS 3.4', 'GDPR Art. 32'],
    status: 'compliant',
    evidenceCount: 11,
    freeTool: 'Cloud Provider Native KMS (AWS KMS default free tier / GCP KMS / Supabase)',
    freeToolCategory: 'Cryptography',
    automatedCheck: 'Cloud provider configuration audit screenshot & API evidence',
    remediationSnippet: 'AWS CLI: aws rds describe-db-instances --query "DBInstances[*].[DBInstanceIdentifier, StorageEncrypted, KmsKeyId]"',
    lastChecked: '3 days ago',
  },
  {
    id: 'ctrl-08',
    code: 'PRV-01',
    title: 'Public Privacy Notice & Cookie Consent Compliance',
    category: 'Data Protection',
    description: 'Clear notice of data processing activities, user rights, contact email, and cookie consent mechanism.',
    frameworks: ['GDPR Art. 12/13/14', 'ePrivacy Directive', 'CCPA/CPRA', 'SOC 2 P1.1'],
    status: 'compliant',
    evidenceCount: 5,
    freeTool: 'Klaro! Open Source / Osano Free Tier + 1-Compliance Policy Template',
    freeToolCategory: 'Privacy & Consent',
    automatedCheck: '1-Compliance Scanner DOM & cookie tracking probe',
    remediationSnippet: 'Embed Klaro open source consent manager or link compliant Privacy Policy in header/footer.',
    lastChecked: 'Today, 1-Compliance Scanner check',
  },
  {
    id: 'ctrl-09',
    code: 'END-01',
    title: 'Workstation Disk Encryption & Screen Timeout',
    category: 'IT Asset Management',
    description: 'All employee laptops must enforce full-disk encryption (FileVault / BitLocker) and 15-minute lock screen timers.',
    frameworks: ['SOC 2 CC6.6', 'ISO 27001 A.8.1', 'HIPAA §164.312(a)(2)(iii)', 'NIST CSF PR.AC-04'],
    status: 'in_progress',
    evidenceCount: 7,
    freeTool: 'Fleet / osquery (Open Source) or Native macOS Configuration Profiles (.mobileconfig)',
    freeToolCategory: 'Free MDM / Endpoint',
    automatedCheck: 'osquery SQL check: SELECT fde_status FROM disk_encryption;',
    remediationSnippet: 'macOS: System Settings > Privacy & Security > FileVault [Turn On].\nFree osquery query:\nSELECT * FROM disk_encryption WHERE enabled != 1;',
    lastChecked: '5 days ago',
  },
  {
    id: 'ctrl-10',
    code: 'CRY-01',
    title: 'Cryptographic Asset Custody & Smart Contract Audit',
    category: 'Cryptocurrency & Digital Assets',
    description: 'Formal segregation of custodial vs non-custodial crypto funds, multi-signature threshold approval (Gnosis Safe), and automated smart contract bytecode analysis.',
    frameworks: ['MiCA Art. 14, 20', 'FinCEN MSB Rules', 'NIST SP 800-57', 'ISO 27001 A.8.24'],
    status: 'compliant',
    evidenceCount: 9,
    freeTool: 'Slither OSS (Crytic) + Mythril + Safe Multi-Sig',
    freeToolCategory: 'Crypto Security',
    automatedCheck: 'Slither static analyzer in CI: slither contracts/ --solc-remaps @openzeppelin=node_modules/@openzeppelin',
    remediationSnippet: 'pip3 install slither-analyzer\nslither . --print human-summary',
    lastChecked: '3 days ago',
  },
  {
    id: 'ctrl-11',
    code: 'FOR-01',
    title: 'Digital Forensics Triage & Immutable Chain of Custody',
    category: 'Digital Forensics & Incident Response',
    description: 'Standard Operating Procedures for capturing volatile memory, disk images, and API logs with cryptographic SHA-256 tamper-evident integrity hashes.',
    frameworks: ['ISO/IEC 27037:2012', 'NIST SP 800-86', 'SOC 2 CC7.3'],
    status: 'compliant',
    evidenceCount: 6,
    freeTool: 'LiME (Linux Memory Extractor) + dc3dd / sha256sum',
    freeToolCategory: 'Digital Forensics',
    automatedCheck: 'dc3dd / hash verification: sha256sum memory_dump.raw > hash.txt',
    remediationSnippet: 'sudo dc3dd if=/dev/nvme0n1 of=/evidence/image.raw hash=sha256 log=/evidence/chain.log',
    lastChecked: '1 week ago',
  },
  {
    id: 'ctrl-12',
    code: 'BCP-01',
    title: 'Automated Database Backups & Annual Restore Testing',
    category: 'Infrastructure & Cloud',
    description: 'Point-in-time database backups stored across isolated regions with annual documented test restoration.',
    frameworks: ['SOC 2 A1.2', 'ISO 27001 A.8.14', 'HIPAA §164.308(a)(7)(ii)(A)', 'PCI DSS 9.5'],
    status: 'action_needed',
    evidenceCount: 2,
    freeTool: 'AWS Automated Backup Free Tier / Supabase Automated Daily Backups',
    freeToolCategory: 'Disaster Recovery',
    automatedCheck: 'Backup status API probe & drill logbook',
    remediationSnippet: 'Conduct a 20-minute sandbox restoration drill and upload screenshot to 1-Compliance Evidence Locker.',
    lastChecked: '2 months ago',
  },
  {
    id: 'ctrl-13',
    code: 'AI-01',
    title: 'AI Model Risk Classification & Governance Register',
    category: 'AI Governance',
    description: 'Documented inventory of AI systems, risk tier classification under EU AI Act, and training data provenance.',
    frameworks: ['EU AI Act Art. 9, 10, 11', 'NIST AI RMF 1.0', 'ISO 42001'],
    status: 'compliant',
    evidenceCount: 4,
    freeTool: '1-Compliance AI Model Registry + System Prompts Version Control',
    freeToolCategory: 'AI Governance',
    automatedCheck: 'AI system risk register validation',
    remediationSnippet: 'Classify models used (e.g. Gemini 3.8 Flash) as Minimal / Limited Risk with transparency notices.',
    lastChecked: '1 week ago',
  },
  {
    id: 'ctrl-14',
    code: 'VND-01',
    title: 'Critical Vendor Security & Sub-Processor Reviews',
    category: 'Governance & People',
    description: 'Annual review of SOC 2/ISO certifications and Data Processing Addendums (DPAs) for all 3rd-party services.',
    frameworks: ['SOC 2 CC9.2', 'ISO 27001 A.5.19', 'GDPR Art. 28', 'HIPAA §164.308(b)(1)'],
    status: 'compliant',
    evidenceCount: 12,
    freeTool: '1-Compliance Vendor Risk Ledger + Public Trust Center Repositories',
    freeToolCategory: 'Vendor Management',
    automatedCheck: 'Vendor DPA and certification tracking table',
    remediationSnippet: 'Execute free standard online DPAs for AWS, Cloudflare, GitHub, and Stripe.',
    lastChecked: '2 weeks ago',
  },
];

export const INITIAL_POLICIES: PolicyDocument[] = [
  {
    id: 'pol-01',
    title: 'Information Security Policy',
    category: 'Core Governance',
    version: '2.1',
    status: 'approved',
    lastReviewed: '2026-09-15',
    owner: 'Chief Security Officer',
    frameworks: ['SOC 2 CC2.1, CC5.1', 'ISO 27001 A.5.1', 'HIPAA §164.308'],
    summary: 'Master governance policy establishing information security principles, responsibilities, risk management, and baseline requirements.',
    content: `# Information Security Policy (Master Governance)

**Status:** Approved | **Version:** 2.1 | **Review Cycle:** Annual  
**Frameworks:** SOC 2 Type II, ISO/IEC 27001:2022, HIPAA Security Rule, GDPR Art. 32

### 1. Purpose & Objective
This Information Security Policy establishes the security governance framework to safeguard all technical assets, customer data, and computing infrastructure against compromise, unauthorized disclosure, and disruption.

### 2. Guiding Security Principles
1. **Confidentiality:** Information is accessible only to authorized personnel with a legitimate business need.
2. **Integrity:** Systems and data are safeguarded against unauthorized modification, tampering, or destruction.
3. **Availability:** Critical services and data repositories remain resilient and accessible for authorized operations.

### 3. Key Baseline Controls
- **Identity & Access:** Multi-Factor Authentication (MFA) is strictly mandatory for all access to production environments, corporate email, and code repositories.
- **Cryptography:** Data in transit must use TLS 1.2+ (TLS 1.3 preferred). Data at rest must use AES-256 encryption.
- **Vulnerability Management:** High and Critical vulnerabilities identified by automated scanners must be remediated within 14 and 7 calendar days respectively.
- **Personnel Training:** All employees and contractors must complete basic cybersecurity awareness training upon hire and annually thereafter.

### 4. Exceptions & Enforcement
Any exception to this policy requires formal written justification approved by the Security Officer. Violations are subject to disciplinary measures up to and including termination.`,
  },
  {
    id: 'pol-02',
    title: 'Access Control & Password Policy',
    category: 'Identity & Access',
    version: '2.0',
    status: 'approved',
    lastReviewed: '2026-08-20',
    owner: 'Head of Engineering',
    frameworks: ['SOC 2 CC6.1, CC6.2, CC6.3', 'ISO 27001 A.5.15, A.8.5', 'PCI DSS 8.3'],
    summary: 'Specifies least-privilege access rules, role-based access control (RBAC), multi-factor authentication, and password complexity standards.',
    content: `# Access Control & Password Policy

**Status:** Approved | **Version:** 2.0 | **Review Cycle:** Annual  
**Frameworks:** SOC 2 CC6.1 - CC6.3, ISO 27001 A.8.5, PCI DSS Req 8

### 1. Principle of Least Privilege
Access to corporate data, servers, and code repositories is granted based strictly on the principle of least privilege. Users receive only the minimum permissions necessary to perform their assigned role.

### 2. Multi-Factor Authentication (MFA)
- MFA is mandatory on all services that support it, including Google Workspace, GitHub, Cloud Infrastructure (AWS/GCP), and production databases.
- Hardware security keys (FIDO2/WebAuthn) or time-based one-time password (TOTP) authenticator apps are required. SMS-based 2FA is prohibited where TOTP is available.

### 3. Password Complexity Baselines
- Minimum password length: 14 characters.
- Use of a company-approved password manager (e.g. Bitwarden Free or 1Password) is strongly mandated.
- Passwords must not be reused across corporate and personal services.

### 4. Periodic Access Reviews
A documented access review of all administrative roles and cloud production access must occur on a quarterly basis. Deprovisioned accounts must be deactivated within 24 hours of employee departure.`,
  },
  {
    id: 'pol-03',
    title: 'Incident Response & Breach Notification Plan',
    category: 'Risk & Operations',
    version: '1.9',
    status: 'approved',
    lastReviewed: '2026-10-01',
    owner: 'Security Committee',
    frameworks: ['SOC 2 CC7.3, CC7.4', 'ISO 27001 A.5.24 - A.5.28', 'GDPR Art. 33', 'HIPAA §164.308(a)(6)'],
    summary: 'Step-by-step procedures for identifying, triaging, containing, remediating, and reporting security incidents and data breaches within statutory deadlines.',
    content: `# Incident Response & Breach Notification Plan

**Status:** Approved | **Version:** 1.9 | **Review Cycle:** Annual  
**Frameworks:** SOC 2 CC7.3, ISO 27001 A.5.24, GDPR Art. 33 (72h reporting), SEC Form 8-K (4 days)

### 1. Incident Severity Classification
- **P1 - Critical:** Confirmed unauthorized access to customer production data, active ransomware, or complete system compromise.
- **P2 - High:** Partial service disruption, elevated risk compromise with no confirmed data exfiltration.
- **P3 - Medium:** Localized malware on a single endpoint, suspicious login blocked by MFA.
- **P4 - Low:** Minor policy violation, false-positive security alert.

### 2. Response Phases
1. **Detection & Triage:** Incident logged in 1-Compliance incident ledger; Security Lead assigns triage team.
2. **Containment:** Revoke affected credentials, isolate network segments, take forensic disk snapshots.
3. **Eradication & Recovery:** Remove malicious artifacts, patch root vulnerability, restore from verified clean backups.
4. **Post-Incident Analysis:** Conduct Root Cause Analysis (RCA) within 72 hours; document preventive controls.

### 3. Mandatory Regulatory Notifications
- **GDPR:** Where personal data breach presents a risk to individuals, notify relevant supervisory authority within 72 hours.
- **SEC Cyber Rule:** Material cybersecurity incidents disclosed on Form 8-K within four business days.
- **Customer Notification:** Affected business customers notified in accordance with contractual SLAs (typically within 48-72 hours).`,
  },
  {
    id: 'pol-04',
    title: 'Secure Software Development Lifecycle (SDLC) Policy',
    category: 'Application Security',
    version: '2.2',
    status: 'approved',
    lastReviewed: '2026-09-01',
    owner: 'Lead Architect',
    frameworks: ['SOC 2 CC8.1', 'ISO 27001 A.8.25 - A.8.31', 'PCI DSS 6.3'],
    summary: 'Engineering standards for branch protection, peer reviews, automated CI/CD security testing, vulnerability patching, and separation of environments.',
    content: `# Secure Software Development Lifecycle (SDLC) Policy

**Status:** Approved | **Version:** 2.2 | **Review Cycle:** Annual  
**Frameworks:** SOC 2 CC8.1, ISO 27001 A.8.25, PCI DSS Req 6

### 1. Code Repository Safeguards
- Direct pushes to \`main\` / \`production\` branches are cryptographically prevented via GitHub branch protection rules.
- Every pull request requires at least 1 peer approval from an authorized engineer.
- All commits in production releases should be signed with verified developer keys.

### 2. Automated CI/CD Testing Gate
Prior to merge and deployment, automated GitHub Actions pipelines must execute:
1. Automated unit and integration test suites.
2. Dependency vulnerability scanning (Trivy / Dependabot).
3. Secret scanning (Gitleaks) to prevent credential commits.

### 3. Environment Separation
Development, staging, and production environments are strictly isolated. Production database credentials and encryption keys are never present in development environments. Synthetic or anonymized data is used for testing.`,
  },
  {
    id: 'pol-05',
    title: 'Cryptocurrency & Digital Asset Compliance Policy',
    category: 'Cryptocurrency & Fintech',
    version: '1.4',
    status: 'approved',
    lastReviewed: '2026-10-15',
    owner: 'Chief Compliance Officer (Crypto)',
    frameworks: ['EU MiCA Reg 2023/1114', 'FinCEN MSB', 'FATF Travel Rule'],
    summary: 'Anti-Money Laundering (AML), Counter-Terrorist Financing (CFT), Travel Rule compliance, smart contract security audits, and multi-signature custodial controls.',
    content: `# Cryptocurrency & Digital Asset Compliance Policy

**Status:** Approved | **Version:** 1.4 | **Review Cycle:** Annual  
**Frameworks:** EU MiCA (Markets in Crypto-Assets), FinCEN MSB Guidelines, FATF Recommendation 16 (Travel Rule)

### 1. Anti-Money Laundering (AML) & Sanctions Screening
All counterparty blockchain addresses and crypto transactions must be continuously checked against OFAC, EU, and international sanctions lists using open or automated blockchain analytics before transaction settlement.

### 2. FATF Travel Rule Compliance
For virtual asset transfers exceeding the statutory threshold ($1,000 USD / €1,000 EUR), originator and beneficiary identifying data must be securely communicated to the beneficiary Virtual Asset Service Provider (VASP).

### 3. Smart Contract Audit & Formal Verification
All smart contracts deployed to public mainnets must undergo formal automated static analysis (using Slither and Mythril) and third-party peer code audit. Contracts handling user liquidity must feature multi-signature administration delays (Timelocks).

### 4. Segregation of Custodial Funds
Customer digital assets must never be commingled with operating treasury funds. Cold storage multi-sig wallets must require at least 3-of-5 signers across distributed physical hardware security modules.`,
  },
  {
    id: 'pol-06',
    title: 'EU AI Act & Artificial Intelligence Governance Policy',
    category: 'AI Governance',
    version: '1.2',
    status: 'approved',
    lastReviewed: '2026-10-10',
    owner: 'AI Safety & Compliance Officer',
    frameworks: ['EU AI Act Reg (EU) 2024/1689', 'NIST AI RMF 1.0', 'ISO 42001'],
    summary: 'Framework for classifying internal and customer-facing AI systems under the EU AI Act, ensuring algorithmic transparency, human-in-the-loop oversight, and preventing training data leakage.',
    content: `# EU AI Act & Artificial Intelligence Governance Policy

**Status:** Approved | **Version:** 1.2 | **Review Cycle:** Annual  
**Frameworks:** EU AI Act (2024/1689), NIST AI RMF 1.0

### 1. AI System Classification
All AI systems developed or deployed by the organization must be categorized under the EU AI Act risk tiers:
- **Prohibited AI Systems (Art. 5):** Under no circumstances will the company build social scoring, cognitive manipulation, or biometric mass surveillance tools.
- **High-Risk AI Systems (Annex III):** Critical infrastructure or employment evaluation systems requiring full conformity assessments and CE marking.
- **Limited / Specific Transparency Risk (Art. 50):** Systems like conversational bots or AI scanners where users must be explicitly informed they are interacting with AI.
- **Minimal Risk:** General software features with minimal societal risk.

### 2. Data Governance & Privacy
Customer confidential data or protected health information (PHI) must never be used to train foundational public models without explicit contractual consent. All API calls to LLMs must use zero-data-retention enterprise endpoints.

### 3. Human-in-the-Loop & Auditability
Autonomous compliance recommendations must remain reviewable and editable by human compliance officers. Critical remediation actions require human authorization before execution.`,
  },
];

export const INITIAL_BLUEPRINTS: FreeToolBlueprint[] = [
  {
    id: 'bp-01',
    category: 'Vulnerability & Container Scanning',
    paidAlternative: 'Snyk / Veracode',
    paidCostAnnual: '$12,000 - $35,000 / year',
    freeTool: 'Aquasecurity Trivy + Grype (Open Source)',
    license: 'Apache 2.0 (100% Free Open Source)',
    description: 'Comprehensive, hyper-fast scanner for container images, file systems, Git repositories, and dependency lockfiles. Outperforms most commercial tools.',
    setupMinutes: 5,
    installationSnippet: `# Install locally
curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin

# Run complete repo filesystem audit
trivy fs --severity HIGH,CRITICAL .

# Or add to GitHub Actions (continuous automated CI/CD runner)
- uses: aquasecurity/trivy-action@master
  with:
    scan-type: 'fs'
    severity: 'CRITICAL,HIGH'`,
    verificationMethod: 'Auditors look for automated pipeline scans with zero unmitigated High/Critical CVEs. Export HTML/JSON report directly from GitHub Actions.',
    frameworksSatisfied: ['SOC 2 CC7.1', 'ISO 27001 A.8.8', 'PCI DSS 6.3.3'],
  },
  {
    id: 'bp-02',
    category: 'Cloud Security Posture Management (CSPM)',
    paidAlternative: 'Wiz / Palo Alto Prisma Cloud / Orca',
    paidCostAnnual: '$20,000 - $60,000 / year',
    freeTool: 'Prowler Open Source (AWS, GCP, Azure)',
    license: 'Apache 2.0 (100% Free Open Source)',
    description: 'Industry-standard open-source security tool for AWS, GCP, and Azure. Evaluates your infrastructure against CIS benchmarks, SOC 2, ISO 27001, and HIPAA in minutes.',
    setupMinutes: 10,
    installationSnippet: `# Run in free AWS CloudShell (no server required)
pip install prowler

# Execute SOC 2 compliance check across your AWS account
prowler aws --compliance soc2_aws_2020 -M html,json,csv

# Check specific CIS Level 1 benchmarks
prowler aws --compliance cis_1.5_aws`,
    verificationMethod: 'Download the generated HTML executive summary report and upload to 1-Compliance OS Evidence Locker. Provides undeniable auditor-grade proof.',
    frameworksSatisfied: ['SOC 2 CC7.1, CC6.6', 'ISO 27001 A.8.15', 'HIPAA §164.312'],
  },
  {
    id: 'bp-03',
    category: 'Mobile Device Management (MDM)',
    paidAlternative: 'Jamf Pro / Kandji / Fleetsmith',
    paidCostAnnual: '$4,000 - $15,000 / year',
    freeTool: 'Fleet / osquery (Open Source) OR Apple Configurator .mobileconfig',
    license: 'MIT / Free Apple Native',
    description: 'For small teams (<25 employees), you do not need Jamf or Kandji. You can enforce FileVault, screen lock timers, and updates via free signed Apple Configuration Profiles or open-source osquery.',
    setupMinutes: 15,
    installationSnippet: `# Check FileVault and firewall on macOS using free osquery
osqueryi "SELECT fde_status FROM disk_encryption;"
osqueryi "SELECT global_state FROM alf;"

# Or generate a free .mobileconfig profile:
# Use free Apple Configurator 2 (Mac App Store) to create a profile enforcing:
# 1. FileVault required
# 2. Inactivity screen lock 15 minutes
# 3. Minimum password length 14 chars`,
    verificationMethod: 'Export osquery fleet query results or export configuration profile installation screenshots signed by each team member.',
    frameworksSatisfied: ['SOC 2 CC6.6', 'ISO 27001 A.8.1', 'HIPAA §164.312(a)(2)(iii)'],
  },
  {
    id: 'bp-04',
    category: 'Secret Detection & Code Leak Prevention',
    paidAlternative: 'GitGuardian Enterprise',
    paidCostAnnual: '$6,000 - $18,000 / year',
    freeTool: 'Gitleaks (Open Source) + GitHub Push Protection',
    license: 'MIT (100% Free)',
    description: 'Blazing fast, lightweight secret scanner written in Go. Detects hardcoded secrets, passwords, API tokens, and private keys in Git commits before they reach remotes.',
    setupMinutes: 5,
    installationSnippet: `# Run in pre-commit hook or terminal
brew install gitleaks
gitleaks detect --source . --verbose

# GitHub Actions free automated check
- name: Gitleaks Secret Audit
  uses: gitleaks/gitleaks-action@v2
  env:
    GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}`,
    verificationMethod: 'Automated CI/CD pass badge + GitHub secret scanning alerts zero-count screenshot.',
    frameworksSatisfied: ['SOC 2 CC6.1', 'ISO 27001 A.8.28', 'PCI DSS 6.5.1'],
  },
  {
    id: 'bp-05',
    category: 'Web Security, WAF & Header Hardening',
    paidAlternative: 'Akamai / Imperva / Cloudflare Enterprise',
    paidCostAnnual: '$15,000 - $50,000 / year',
    freeTool: 'Cloudflare Free Plan + 1-Compliance Scanner',
    license: 'Free Forever Plan',
    description: 'Cloudflare\'s free tier provides DDoS protection, free automated TLS 1.3 certificates, Transform Rules to inject HSTS/CSP security headers, and edge caching.',
    setupMinutes: 10,
    installationSnippet: `# In Cloudflare Dashboard for your domain:
1. Rules > Transform Rules > Modify Response Header
2. Header: Strict-Transport-Security = max-age=31536000; includeSubDomains; preload
3. Header: X-Frame-Options = DENY
4. Header: X-Content-Type-Options = nosniff
5. Header: Referrer-Policy = strict-origin-when-cross-origin
6. Run 1-Compliance Scanner to verify 100% compliance!`,
    verificationMethod: 'Live scan result from 1-Compliance Scanner showing A+ ratings across all 8 security header checks.',
    frameworksSatisfied: ['SOC 2 CC6.6', 'ISO 27001 A.8.20, A.8.26', 'PCI DSS 4.1'],
  },
  {
    id: 'bp-06',
    category: 'Smart Contract & Crypto Auditing',
    paidAlternative: 'CertiK / Trail of Bits ($30,000 - $100,000)',
    paidCostAnnual: '$30,000 - $100,000 / audit',
    freeTool: 'Crytic Slither + Mythril OSS + OpenZeppelin Contracts',
    license: 'AGPLv3 / Apache 2.0 (Free Open Source)',
    description: 'Open-source static analysis framework for Solidity smart contracts. Flags re-entrancy, uninitialized state variables, reentrancy guards, and access control bugs in seconds.',
    setupMinutes: 10,
    installationSnippet: `# Install Slither and Mythril
pip3 install slither-analyzer mythril

# Run Slither static audit on smart contracts
slither .

# Run Mythril symbolic execution
myth analyze contracts/Token.sol --execution-timeout 60`,
    verificationMethod: 'Export Slither Markdown audit findings report to 1-Compliance Crypto Ledger.',
    frameworksSatisfied: ['MiCA Art. 14', 'NIST SP 800-57', 'ISO 27001 A.8.28'],
  },
];

export const INITIAL_VENDORS: VendorItem[] = [
  {
    id: 'vnd-01',
    name: 'Amazon Web Services (AWS)',
    category: 'Cloud Infrastructure',
    riskTier: 'Critical',
    dataShared: 'Customer production databases, application hosting, backups',
    soc2Status: 'Compliant (SOC 2 Type II)',
    isoStatus: 'ISO 27001 Certified',
    dpaSigned: true,
    freeVerifyUrl: 'https://aws.amazon.com/compliance/soc-faqs/',
    notes: 'SOC 1/2/3 reports available for free in AWS Artifact console.',
    vettingStatus: 'approved',
    vettingScore: 99,
    hasVendorPassport: true,
    cyberInsuranceLimit: '$25,000,000',
    departmentSponsor: 'IT & DevOps',
    lastVettedDate: 'Oct 12, 2026',
    vendorContactEmail: 'aws-compliance@amazon.com',
    inviteToken: 'vtok_aws_sec881',
  },
  {
    id: 'vnd-02',
    name: 'Cloudflare',
    category: 'CDN & WAF & DNS',
    riskTier: 'Critical',
    dataShared: 'Web traffic in transit, SSL termination, edge caching',
    soc2Status: 'Compliant (SOC 2 Type II)',
    isoStatus: 'ISO 27001 Certified',
    dpaSigned: true,
    freeVerifyUrl: 'https://www.cloudflare.com/trust-hub/compliance-resources/',
    notes: 'SOC 2 Type II, ISO 27001, and PCI DSS Level 1 certified.',
    vettingStatus: 'approved',
    vettingScore: 97,
    hasVendorPassport: true,
    cyberInsuranceLimit: '$15,000,000',
    departmentSponsor: 'IT & DevOps',
    lastVettedDate: 'Sep 29, 2026',
    vendorContactEmail: 'security-review@cloudflare.com',
    inviteToken: 'vtok_cf_edge904',
  },
  {
    id: 'vnd-03',
    name: 'GitHub (Microsoft)',
    category: 'Version Control & CI/CD',
    riskTier: 'High',
    dataShared: 'Application source code, CI/CD pipelines, build secrets',
    soc2Status: 'Compliant (SOC 2 Type II)',
    isoStatus: 'ISO 27001 Certified',
    dpaSigned: true,
    freeVerifyUrl: 'https://github.com/security/compliance',
    notes: 'SOC 1 and SOC 2 Type II reports available via Microsoft Service Trust Portal.',
    vettingStatus: 'approved',
    vettingScore: 96,
    hasVendorPassport: true,
    cyberInsuranceLimit: '$20,000,000',
    departmentSponsor: 'IT & DevOps',
    lastVettedDate: 'Oct 04, 2026',
    vendorContactEmail: 'trust@github.com',
    inviteToken: 'vtok_gh_code441',
  },
  {
    id: 'vnd-04',
    name: 'Google Workspace',
    category: 'Productivity & Identity',
    riskTier: 'High',
    dataShared: 'Corporate emails, user accounts, business documents',
    soc2Status: 'Compliant (SOC 2 Type II)',
    isoStatus: 'ISO 27001 Certified',
    dpaSigned: true,
    freeVerifyUrl: 'https://cloud.google.com/security/compliance',
    notes: 'DPA executed electronically in Google Workspace Admin Console.',
    vettingStatus: 'approved',
    vettingScore: 98,
    hasVendorPassport: true,
    cyberInsuranceLimit: '$25,000,000',
    departmentSponsor: 'Operations & Legal',
    lastVettedDate: 'Aug 19, 2026',
    vendorContactEmail: 'workspace-dpo@google.com',
    inviteToken: 'vtok_gw_corp512',
  },
  {
    id: 'vnd-05',
    name: 'Stripe',
    category: 'Payment Processing',
    riskTier: 'Critical',
    dataShared: 'Customer billing tokens, transaction records',
    soc2Status: 'Compliant (SOC 2 Type II)',
    isoStatus: 'ISO 27001 Certified',
    dpaSigned: true,
    freeVerifyUrl: 'https://stripe.com/docs/security/stripe',
    notes: 'PCI DSS Level 1 Service Provider. No raw card numbers touch our servers.',
    vettingStatus: 'approved',
    vettingScore: 99,
    hasVendorPassport: true,
    cyberInsuranceLimit: '$20,000,000',
    departmentSponsor: 'Finance & Billing',
    lastVettedDate: 'Oct 20, 2026',
    vendorContactEmail: 'risk@stripe.com',
    inviteToken: 'vtok_stp_pay311',
  },
  {
    id: 'vnd-06',
    name: 'Apex Manufacturing Logistics & Telematics',
    category: 'Supply Chain & IoT Telematics',
    riskTier: 'High',
    dataShared: 'Factory equipment telemetry, sensor streams, pallet dispatch',
    soc2Status: 'Pending Review',
    isoStatus: 'In Progress',
    dpaSigned: false,
    freeVerifyUrl: 'https://example.com/apex-logistics/security',
    notes: 'Awaiting updated SOC 2 Type II renewal audit. Cyber insurance verified at $3M.',
    vettingStatus: 'in_review',
    vettingScore: 78,
    hasVendorPassport: false,
    cyberInsuranceLimit: '$3,000,000',
    departmentSponsor: 'Factory & Supply Chain',
    lastVettedDate: 'Oct 27, 2026',
    vendorContactEmail: 'compliance@apextelematics.io',
    inviteToken: 'vtok_apex_fac719',
  },
  {
    id: 'vnd-07',
    name: 'Contoso Contingent Staffing Solutions',
    category: 'Contractor & HR Services',
    riskTier: 'Medium',
    dataShared: 'Contractor resumes, background checks, timesheet records',
    soc2Status: 'Self-Attested',
    isoStatus: 'Not Certified',
    dpaSigned: false,
    freeVerifyUrl: 'https://example.com/contoso-staffing/trust',
    notes: 'DPA unsigned. Missing third-party penetration test summary.',
    vettingStatus: 'action_required',
    vettingScore: 61,
    hasVendorPassport: false,
    cyberInsuranceLimit: '$1,000,000',
    departmentSponsor: 'HR & People',
    lastVettedDate: 'Oct 25, 2026',
    vendorContactEmail: 'security@contosostaffing.com',
    inviteToken: 'vtok_contoso_hr203',
  },
];

export const INITIAL_RISKS: RiskItem[] = [
  {
    id: 'rsk-01',
    title: 'Unauthorized Access to Production Database',
    category: 'Data Security',
    likelihood: 2,
    impact: 5,
    score: 10,
    inherentRisk: 'High',
    treatment: 'Mitigate',
    mitigatingControl: 'IAM-01 (MFA required) + DAT-01 (Encrypted DB in private VPC with no public IP)',
    residualRisk: 'Low',
    status: 'Mitigated',
  },
  {
    id: 'rsk-02',
    title: 'Secret / API Key Leak via Public Code Repository',
    category: 'Application Security',
    likelihood: 3,
    impact: 4,
    score: 12,
    inherentRisk: 'High',
    treatment: 'Mitigate',
    mitigatingControl: 'APP-02 (Automated Gitleaks CI/CD check & GitHub Push Protection)',
    residualRisk: 'Low',
    status: 'Mitigated',
  },
  {
    id: 'rsk-03',
    title: 'Ransomware or Endpoint Compromise of Remote Laptop',
    category: 'Endpoint Security',
    likelihood: 2,
    impact: 4,
    score: 8,
    inherentRisk: 'Medium',
    treatment: 'Mitigate',
    mitigatingControl: 'END-01 (Mandatory FileVault full disk encryption + screen timeout lock)',
    residualRisk: 'Low',
    status: 'Mitigated',
  },
  {
    id: 'rsk-04',
    title: 'Smart Contract Re-Entrancy or Flash Loan Exploit',
    category: 'Cryptocurrency & DeFi',
    likelihood: 2,
    impact: 5,
    score: 10,
    inherentRisk: 'High',
    treatment: 'Mitigate',
    mitigatingControl: 'CRY-01 (Slither static audit gate in CI + Multi-sig Safe administration)',
    residualRisk: 'Low',
    status: 'Mitigated',
  },
  {
    id: 'rsk-05',
    title: 'Critical Vendor Outage or Compromise (AWS/Cloudflare)',
    category: 'Third-Party Risk',
    likelihood: 2,
    impact: 4,
    score: 8,
    inherentRisk: 'Medium',
    treatment: 'Mitigate',
    mitigatingControl: 'BCP-01 (Automated multi-region backups + redundant DNS architecture)',
    residualRisk: 'Low',
    status: 'Active',
  },
  {
    id: 'rsk-06',
    title: 'Regulatory Non-Compliance (GDPR / Privacy Fine / MiCA)',
    category: 'Regulatory',
    likelihood: 2,
    impact: 3,
    score: 6,
    inherentRisk: 'Medium',
    treatment: 'Mitigate',
    mitigatingControl: 'PRV-01 (Comprehensive Privacy Policy + 1-Compliance Scanner verified cookie consent)',
    residualRisk: 'Low',
    status: 'Mitigated',
  },
];

export const INITIAL_EVIDENCE: EvidenceItem[] = [
  {
    id: 'evi-01',
    controlId: 'ctrl-01',
    controlTitle: 'Mandatory Multi-Factor Authentication (MFA)',
    title: 'GitHub Organization 2FA Requirement Verification',
    source: 'GitHub API (Automated)',
    freeRunner: 'GitHub API query',
    status: 'verified',
    timestamp: '2026-10-28 09:30 UTC',
    details: 'Verified that two_factor_requirement_enabled == true on organization members.',
  },
  {
    id: 'evi-02',
    controlId: 'ctrl-02',
    controlTitle: 'Web Transport Security (TLS 1.3 & HSTS)',
    title: '1-Compliance Scanner Endpoint Security Audit',
    source: '1-Compliance Scanner (Live Probe)',
    freeRunner: 'HTTP Header & TLS Prober',
    status: 'verified',
    timestamp: '2026-10-28 11:15 UTC',
    details: 'HTTPS active, TLS 1.3 negotiated, Strict-Transport-Security: max-age=31536000; includeSubDomains verified.',
  },
  {
    id: 'evi-03',
    controlId: 'ctrl-03',
    controlTitle: 'Automated Dependency & Static Vulnerability Scanning',
    title: 'CI/CD Dependency Vulnerability Scan (Trivy)',
    source: 'GitHub Actions (#284)',
    freeRunner: 'Aquasecurity Trivy Free Runner',
    status: 'verified',
    timestamp: '2026-10-27 18:45 UTC',
    details: 'Trivy scanned 342 dependencies. 0 Critical CVEs, 0 High CVEs detected in production branch.',
  },
  {
    id: 'evi-04',
    controlId: 'ctrl-04',
    controlTitle: 'Automated Secret Leak Detection',
    title: 'Gitleaks Commit History & Push Audit',
    source: 'GitHub Actions / Gitleaks',
    freeRunner: 'Gitleaks Open Source',
    status: 'verified',
    timestamp: '2026-10-28 08:20 UTC',
    details: 'Scan completed across all branches. 0 leaked secrets or tokens detected.',
  },
  {
    id: 'evi-05',
    controlId: 'ctrl-10',
    controlTitle: 'Cryptographic Asset Custody & Smart Contract Audit',
    title: 'Slither CI Automated Smart Contract Audit Pass',
    source: 'GitHub Actions / Slither OSS',
    freeRunner: 'Slither 0.10.x Analyzer',
    status: 'verified',
    timestamp: '2026-10-28 10:00 UTC',
    details: 'Zero critical vulnerabilities or re-entrancy risks detected across Solidity contracts.',
  },
  {
    id: 'evi-06',
    controlId: 'ctrl-11',
    controlTitle: 'Digital Forensics Triage & Immutable Chain of Custody',
    title: 'Production Incident Snapshot SHA-256 Hash Record',
    source: 'dc3dd Forensic Engine',
    freeRunner: 'Forensic Triage Suite',
    status: 'verified',
    timestamp: '2026-10-26 14:20 UTC',
    details: 'Memory snapshot cryptographically signed with SHA-256 hash e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855.',
  },
];

// -----------------------------------------------------------------------------
// Datasets for the 28 Core Notion Topics
// -----------------------------------------------------------------------------

export const INITIAL_ASSETS: AssetSystemItem[] = [
  {
    id: 'ast-01',
    name: 'Production PostgreSQL Cluster (Aurora/RDS)',
    type: 'Database',
    criticality: 'Tier 1 - Mission Critical',
    owner: 'Lead Database Engineer',
    dataClassification: 'Restricted (PII/Card/Health)',
    location: 'AWS us-east-1 (Private VPC)',
    backupCadence: 'Continuous PITR + Daily Cross-Region Snapshots',
    lastAudited: '2026-10-20',
  },
  {
    id: 'ast-02',
    name: 'Core Application API Gateway & Microservices',
    type: 'API Gateway',
    criticality: 'Tier 1 - Mission Critical',
    owner: 'Backend Platform Lead',
    dataClassification: 'Confidential',
    location: 'Cloudflare Workers + AWS ECS',
    backupCadence: 'GitOps Declarative Re-Deploy',
    lastAudited: '2026-10-24',
  },
  {
    id: 'ast-03',
    name: 'Treasury & Settlement Smart Contracts',
    type: 'Smart Contract',
    criticality: 'Tier 1 - Mission Critical',
    owner: 'Web3 & Crypto Architect',
    dataClassification: 'Restricted (PII/Card/Health)',
    location: 'Ethereum Mainnet / Arbitrum',
    backupCadence: 'Immutable Blockchain Ledger',
    lastAudited: '2026-10-18',
  },
  {
    id: 'ast-04',
    name: 'Customer Billing & Tokenization Engine',
    type: 'Cloud Service',
    criticality: 'Tier 2 - Business Operational',
    owner: 'Finance & Payments Lead',
    dataClassification: 'Restricted (PII/Card/Health)',
    location: 'Stripe API / Supabase Vault',
    backupCadence: 'Daily Automated Sync',
    lastAudited: '2026-10-12',
  },
];

export const INITIAL_IT_ASSETS: ITAssetItem[] = [
  {
    id: 'ita-01',
    assetTag: 'AST-MAC-0142',
    name: 'MacBook Pro 16" (M3 Max)',
    category: 'Workstation',
    assignedUser: 'alex.chen@company.com (Lead Architect)',
    osVersion: 'macOS 15.0 Sequoia',
    encryptionStatus: 'Encrypted (FileVault / BitLocker)',
    edrStatus: 'Active (Defender/ClamAV/Wazuh)',
    lastSeen: '10 minutes ago',
  },
  {
    id: 'ita-02',
    assetTag: 'AST-MAC-0189',
    name: 'MacBook Air 15" (M3)',
    category: 'Workstation',
    assignedUser: 'sarah.miller@company.com (Product Manager)',
    osVersion: 'macOS 15.0 Sequoia',
    encryptionStatus: 'Encrypted (FileVault / BitLocker)',
    edrStatus: 'Active (Defender/ClamAV/Wazuh)',
    lastSeen: '1 hour ago',
  },
  {
    id: 'ita-03',
    assetTag: 'AST-HSM-001',
    name: 'AWS CloudHSM Dedicated Cluster',
    category: 'Hardware Security Module (HSM)',
    assignedUser: 'KMS Root Administrator',
    osVersion: 'FIPS 140-2 Level 3 Firmware',
    encryptionStatus: 'Cloud KMS Managed',
    edrStatus: 'Active (Defender/ClamAV/Wazuh)',
    lastSeen: 'Realtime heartbeat',
  },
  {
    id: 'ita-04',
    assetTag: 'AST-VM-PROD-01',
    name: 'Production Worker Node Cluster (t4g.xlarge)',
    category: 'Cloud VM',
    assignedUser: 'Infrastructure CI/CD',
    osVersion: 'Ubuntu 24.04 LTS (CIS Hardened)',
    encryptionStatus: 'Encrypted (FileVault / BitLocker)',
    edrStatus: 'Active (Defender/ClamAV/Wazuh)',
    lastSeen: 'Realtime heartbeat',
  },
];

export const INITIAL_CRYPTO_RECORDS: CryptoComplianceRecord[] = [
  {
    id: 'cry-01',
    assetName: 'USD Compliance Liquidity Token',
    symbol: 'USDC-L',
    classification: 'Stablecoin',
    regulatoryStatus: 'MiCA Compliant',
    amlCftControls: 'Real-time Chainalysis / TRM sanctions screening on deposits > $1,000',
    smartContractAuditStatus: 'Audited (Slither / Mythril / OpenZeppelin)',
    custodyModel: 'Multi-Sig (Safe)',
    jurisdiction: 'EU (MiCA Title III) & US FinCEN MSB',
  },
  {
    id: 'cry-02',
    assetName: '1-Compliance Governance & Staking Token',
    symbol: 'ONE-C',
    classification: 'Governance',
    regulatoryStatus: 'Travel Rule Active',
    amlCftControls: 'IVMS 101 automated Travel Rule protocol messaging via OpenVASP',
    smartContractAuditStatus: 'Formal Verification',
    custodyModel: 'Institutional MPC',
    jurisdiction: 'Switzerland (FINMA) / Global',
  },
];

export const INITIAL_INCIDENTS: IncidentRecord[] = [
  {
    id: 'inc-01',
    incidentNumber: 'INC-2026-08',
    title: 'Suspicious MFA Push Fatigue Attack on Staff Account',
    threatType: 'Phishing / Credential Theft',
    severity: 'P3 - Medium',
    status: 'Resolved & Closed',
    reportedAt: '2026-10-14 03:12 UTC',
    leadInvestigator: 'SecOps Triage Lead',
    slaBreach: false,
    notifiedAuthorities: 'Internal Security Committee Only',
    rootCause: 'Employee reported repeated push notifications; user session revoked, hardware FIDO2 key enforced.',
  },
  {
    id: 'inc-02',
    incidentNumber: 'INC-2026-05',
    title: 'DDoS Amplification Spike on Public Scanner Gateway',
    threatType: 'DDoS',
    severity: 'P2 - High',
    status: 'Resolved & Closed',
    reportedAt: '2026-09-28 17:40 UTC',
    leadInvestigator: 'Cloudflare Edge Incident Commander',
    slaBreach: false,
    notifiedAuthorities: 'N/A (Mitigated by Cloudflare Under Attack Mode)',
    rootCause: '42 Gbps UDP flood absorbed by Cloudflare Edge rules. Zero downtime on core database.',
  },
];

export const INITIAL_FORENSICS: ForensicPreservation[] = [
  {
    id: 'for-01',
    caseNumber: 'CASE-2026-004',
    targetSystem: 'Prod Web Gateway (IP: 198.51.100.42)',
    evidenceType: 'Memory Dump',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    custodian: 'Lead Forensics Investigator',
    preservationDate: '2026-10-15 08:30 UTC',
    chainOfCustodyVerified: true,
    notes: 'Volatile RAM dumped via LiME; stored in encrypted S3 bucket with Object Lock (WORM compliance).',
  },
  {
    id: 'for-02',
    caseNumber: 'CASE-2026-002',
    targetSystem: 'Dev Workstation (AST-MAC-0142)',
    evidenceType: 'Disk Image (RAW/E01)',
    sha256Hash: 'ca978112ca1bbdcafac231b39a23dc4da786081448e106b247fed1fe0b8990c',
    custodian: 'Security Operations Officer',
    preservationDate: '2026-09-10 11:00 UTC',
    chainOfCustodyVerified: true,
    notes: 'Bit-by-bit physical image acquired using dc3dd with dual SHA-256 validation.',
  },
];

export const INITIAL_CALENDAR: ComplianceCalendarEvent[] = [
  {
    id: 'cal-01',
    title: 'Q4 2026 User Access Review & Privilege Deprovisioning',
    category: 'Access Review',
    dueDate: '2026-11-15',
    frequency: 'Quarterly',
    assignee: 'Head of Engineering',
    status: 'In Progress',
    frameworks: ['SOC 2 CC6.2', 'ISO 27001 A.5.18'],
  },
  {
    id: 'cal-02',
    title: 'Annual Third-Party Network & Web Penetration Test',
    category: 'Pen-Test',
    dueDate: '2026-12-01',
    frequency: 'Annual',
    assignee: 'Chief Information Security Officer',
    status: 'Upcoming',
    frameworks: ['SOC 2 CC7.1', 'ISO 27001 A.8.8', 'PCI DSS 11.3'],
  },
  {
    id: 'cal-03',
    title: 'AICPA SOC 2 Type II Final Auditor Observation Window',
    category: 'Audit',
    dueDate: '2026-12-15',
    frequency: 'Annual',
    assignee: 'Lead Compliance Officer',
    status: 'Upcoming',
    frameworks: ['SOC 2 Type II'],
  },
  {
    id: 'cal-04',
    title: 'Annual Information Security Policy Review & Sign-Off',
    category: 'Policy Review',
    dueDate: '2026-11-30',
    frequency: 'Annual',
    assignee: 'Security Committee',
    status: 'Upcoming',
    frameworks: ['ISO 27001 A.5.1', 'HIPAA §164.308'],
  },
];

export const INITIAL_LEGAL_UPDATES: LegalUpdateItem[] = [
  {
    id: 'leg-01',
    jurisdiction: 'European Union (GDPR / NIS2 / DORA / AI Act)',
    regulation: 'EU AI Act (Regulation 2024/1689)',
    summary: 'Full enforcement for high-risk AI models, data governance audits, and mandatory transparency for chatbots and automated scanners.',
    impactLevel: 'Critical',
    effectiveDate: '2026-08-02',
    actionRequired: 'Register AI model system cards and conduct algorithmic transparency assessments.',
    status: 'Addressed',
  },
  {
    id: 'leg-02',
    jurisdiction: 'United States (SEC / FTC / FinCEN)',
    regulation: 'SEC Cybersecurity Disclosure Rule (Form 8-K)',
    summary: 'Public companies and material suppliers must disclose material cybersecurity breaches within four business days of determination.',
    impactLevel: 'Critical',
    effectiveDate: 'Active',
    actionRequired: 'Integrated 4-day SLA clock into 1-Compliance incident response playbook.',
    status: 'Addressed',
  },
  {
    id: 'leg-03',
    jurisdiction: 'European Union (GDPR / NIS2 / DORA / AI Act)',
    regulation: 'EU DORA (Digital Operational Resilience Act)',
    summary: 'Mandatory ICT risk management frameworks, resilience testing, and third-party ICT service provider oversight for financial entities.',
    impactLevel: 'High',
    effectiveDate: '2025/2026 Enforcement',
    actionRequired: 'Execute standardized DORA contractual clauses with cloud sub-processors.',
    status: 'In Progress',
  },
];

export const INITIAL_OBLIGATIONS: ObligationItem[] = [
  {
    id: 'ob-01',
    party: 'Enterprise Bank Customer (Fortune 500 Financial)',
    type: 'Customer Security Exhibit',
    commitment: 'Annual SOC 2 Type II report delivery, encrypted backups, 24-hour breach notification SLA.',
    penaltyClause: 'Contractual liquidated damages and termination rights upon uncurable breach.',
    renewalDate: '2027-01-15',
    status: 'Fulfilled',
  },
  {
    id: 'ob-02',
    party: 'EU Data Protection Authorities (Supervisory Authorities)',
    type: 'Regulatory Mandate',
    commitment: 'GDPR Article 33 72-hour breach notification & Article 30 Records of Processing Activities (RoPA).',
    penaltyClause: 'Fines up to €20M or 4% of annual global turnover.',
    renewalDate: 'Continuous',
    status: 'Fulfilled',
  },
];

export const INITIAL_RACI_ROLES: RaciRole[] = [
  {
    id: 'raci-01',
    roleName: 'Chief Information Security Officer (CISO)',
    designatedPerson: 'Dr. Marcus Vance, CISSP, CISA',
    contact: 'ciso@company.com',
    responsibleFor: ['Master Security Strategy', 'Threat Modeling', 'Zero Trust Architecture'],
    accountableFor: ['All SOC 2 & ISO 27001 Controls', 'Incident Containment'],
    consulted: ['Executive Leadership', 'Board Audit Committee'],
    informed: ['All Company Personnel'],
  },
  {
    id: 'raci-02',
    roleName: 'Data Protection Officer (DPO)',
    designatedPerson: 'Elena Rostova, CIPP/E, CIPM',
    contact: 'dpo@company.com',
    responsibleFor: ['GDPR RoPA Ledger', 'Data Subject Access Requests (DSARs)', 'DPIA Assessments'],
    accountableFor: ['Regulatory Privacy Compliance', 'Supervisory Authority Liaison'],
    consulted: ['Product Engineering', 'Marketing Leads'],
    informed: ['Customer Success'],
  },
  {
    id: 'raci-03',
    roleName: 'Crypto & Digital Asset Compliance Officer',
    designatedPerson: 'Julian Wright, CAMS, CBP',
    contact: 'crypto-compliance@company.com',
    responsibleFor: ['FinCEN MSB Filings', 'MiCA Travel Rule Protocol', 'Smart Contract Audits'],
    accountableFor: ['AML/CFT Transaction Surveillance', 'Custodial Segregation'],
    consulted: ['Web3 Engineering', 'Legal Counsel'],
    informed: ['Treasury Desk'],
  },
];

export const INITIAL_TASKS: ComplianceTask[] = [
  {
    id: 'tsk-01',
    title: 'Run Weekly Trivy & Gitleaks CI/CD Scan Audit',
    category: 'Vulnerability Management',
    priority: 'High',
    assignee: 'DevSecOps Automation',
    dueDate: '2026-11-02',
    status: 'Done',
    freeAutomationRunner: 'GitHub Actions (#291)',
  },
  {
    id: 'tsk-02',
    title: 'Verify HSTS & CSP Headers via 1-Compliance Scanner',
    category: 'Infrastructure Security',
    priority: 'High',
    assignee: 'SecOps Team',
    dueDate: '2026-11-05',
    status: 'Done',
    freeAutomationRunner: '1-Compliance Live Scanner',
  },
  {
    id: 'tsk-03',
    title: 'Execute AWS Prowler SOC 2 CIS Audit in CloudShell',
    category: 'Cloud Posture',
    priority: 'Urgent',
    assignee: 'Infrastructure Lead',
    dueDate: '2026-11-10',
    status: 'In Progress',
    freeAutomationRunner: 'prowler aws --compliance soc2',
  },
  {
    id: 'tsk-04',
    title: 'Collect Employee Annual Security Attestations',
    category: 'Training & Awareness',
    priority: 'Medium',
    assignee: 'HR & People Operations',
    dueDate: '2026-11-20',
    status: 'Todo',
    freeAutomationRunner: 'CISA Training Logbook',
  },
];

export const INITIAL_TRAINING: TrainingRecord[] = [
  {
    id: 'trn-01',
    employeeName: 'Alex Chen',
    role: 'Lead Architect',
    module: 'OWASP Top 10',
    completedDate: '2026-09-12',
    score: 98,
    certificateHash: 'CERT-SEC-2026-8912',
    status: 'Passed',
  },
  {
    id: 'trn-02',
    employeeName: 'Sarah Miller',
    role: 'Product Manager',
    module: 'CISA Cyber Essentials',
    completedDate: '2026-09-14',
    score: 95,
    certificateHash: 'CERT-SEC-2026-8944',
    status: 'Passed',
  },
  {
    id: 'trn-03',
    employeeName: 'Julian Wright',
    role: 'Crypto Compliance Lead',
    module: 'Crypto AML / Anti-Fraud',
    completedDate: '2026-10-02',
    score: 100,
    certificateHash: 'CERT-AML-2026-1102',
    status: 'Passed',
  },
];
