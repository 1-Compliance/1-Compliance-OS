export type FrameworkId =
  | 'soc2'
  | 'iso27001'
  | 'hipaa'
  | 'gdpr'
  | 'pcidss'
  | 'nistcsf'
  | 'eu_ai_act'
  | 'mica_crypto'
  | 'cmmc';

export type IndustryType =
  | 'saas'
  | 'fintech_crypto'
  | 'healthcare'
  | 'ecommerce'
  | 'manufacturing'
  | 'enterprise'
  | 'defense_gov'
  | 'law_firm'
  | 'cpa_accounting';

export type CompanyScale = 'startup_small' | 'mid_market' | 'enterprise_global';

export interface Framework {
  id: FrameworkId;
  name: string;
  fullName: string;
  description: string;
  totalControls: number;
  compliantControls: number;
  standardVersion: string;
  badge: string;
}

export type ControlStatus = 'compliant' | 'in_progress' | 'action_needed' | 'not_applicable';

export interface ControlItem {
  id: string;
  code: string;
  title: string;
  category:
    | 'Access & Identity'
    | 'Infrastructure & Cloud'
    | 'Data Protection'
    | 'Application Security'
    | 'Governance & People'
    | 'Risk & Incident'
    | 'AI Governance'
    | 'Cryptocurrency & Digital Assets'
    | 'Digital Forensics & Incident Response'
    | 'IT Asset Management';
  description: string;
  frameworks: string[];
  status: ControlStatus;
  evidenceCount: number;
  freeTool: string;
  freeToolCategory: string;
  automatedCheck: string;
  remediationSnippet?: string;
  lastChecked: string;
}

export interface PolicyDocument {
  id: string;
  title: string;
  category: string;
  version: string;
  status: 'approved' | 'draft' | 'needs_review';
  lastReviewed: string;
  frameworks: string[];
  owner: string;
  summary: string;
  content: string;
}

export interface EvidenceItem {
  id: string;
  controlId: string;
  controlTitle: string;
  title: string;
  source: string;
  freeRunner: string;
  status: 'verified' | 'pending' | 'flagged';
  timestamp: string;
  details: string;
  payload?: any;
}

export interface VendorItem {
  id: string;
  name: string;
  category: string;
  riskTier: 'Critical' | 'High' | 'Medium' | 'Low';
  dataShared: string;
  soc2Status: 'Compliant (SOC 2 Type II)' | 'SOC 3 Public' | 'Self-Attested' | 'Pending Review';
  isoStatus: 'ISO 27001 Certified' | 'Not Certified' | 'In Progress';
  dpaSigned: boolean;
  freeVerifyUrl: string;
  notes: string;
  vettingStatus?: 'approved' | 'in_review' | 'action_required' | 'rejected' | 'invite_sent';
  vettingScore?: number;
  inviteToken?: string;
  cyberInsuranceLimit?: string;
  hasVendorPassport?: boolean;
  lastVettedDate?: string;
  vendorContactEmail?: string;
  departmentSponsor?: string;
}

export interface RiskItem {
  id: string;
  title: string;
  category: string;
  likelihood: 1 | 2 | 3 | 4 | 5;
  impact: 1 | 2 | 3 | 4 | 5;
  score: number;
  inherentRisk: 'Low' | 'Medium' | 'High' | 'Critical';
  treatment: 'Mitigate' | 'Accept' | 'Transfer' | 'Avoid';
  mitigatingControl: string;
  residualRisk: 'Low' | 'Medium' | 'High';
  status: 'Active' | 'Mitigated';
}

export interface FreeToolBlueprint {
  id: string;
  category: string;
  paidAlternative: string;
  paidCostAnnual: string;
  freeTool: string;
  license: string;
  description: string;
  setupMinutes: number;
  installationSnippet: string;
  verificationMethod: string;
  frameworksSatisfied: string[];
}

export interface ScannerCheck {
  id: string;
  category: string;
  name: string;
  frameworks: string[];
  status: 'pass' | 'warning' | 'fail';
  score: number;
  maxScore: number;
  details: string;
  remediation: string;
}

export interface ScannerResult {
  success: boolean;
  domain: string;
  url: string;
  timestamp: string;
  score: number;
  status: string;
  checks: ScannerCheck[];
  rawHeaders: Record<string, string>;
  stats: {
    passCount: number;
    warningCount: number;
    failCount: number;
  };
  error?: string;
}

// -----------------------------------------------------------------------------
// The 28 Notion / 1-Compliance Core Topics Data Models
// -----------------------------------------------------------------------------
export interface AssetSystemItem {
  id: string;
  name: string;
  type: 'Cloud Service' | 'Database' | 'Internal Process' | 'API Gateway' | 'Smart Contract' | 'Network';
  criticality: 'Tier 1 - Mission Critical' | 'Tier 2 - Business Operational' | 'Tier 3 - Non-Critical';
  owner: string;
  dataClassification: 'Restricted (PII/Card/Health)' | 'Confidential' | 'Internal' | 'Public';
  location: string;
  backupCadence: string;
  lastAudited: string;
}

export interface ITAssetItem {
  id: string;
  assetTag: string;
  name: string;
  category: 'Workstation' | 'Mobile' | 'Cloud VM' | 'SaaS License' | 'Hardware Security Module (HSM)';
  assignedUser: string;
  osVersion: string;
  encryptionStatus: 'Encrypted (FileVault / BitLocker)' | 'Unencrypted' | 'Cloud KMS Managed';
  edrStatus: 'Active (Defender/ClamAV/Wazuh)' | 'Pending';
  lastSeen: string;
}

export interface CryptoComplianceRecord {
  id: string;
  assetName: string;
  symbol: string;
  classification: 'Utility Token' | 'Payment Token' | 'Governance' | 'Stablecoin' | 'DeFi Protocol';
  regulatoryStatus: 'MiCA Compliant' | 'FinCEN MSB Registered' | 'Travel Rule Active' | 'Under Review';
  amlCftControls: string;
  smartContractAuditStatus: 'Audited (Slither / Mythril / OpenZeppelin)' | 'Formal Verification' | 'Pending';
  custodyModel: 'Non-Custodial' | 'Multi-Sig (Safe)' | 'Institutional MPC';
  jurisdiction: string;
}

export interface IncidentRecord {
  id: string;
  incidentNumber: string;
  title: string;
  threatType: 'Ransomware' | 'Phishing / Credential Theft' | 'DDoS' | 'Unauthorized Access' | 'Insider Threat' | 'Misconfiguration';
  severity: 'P1 - Critical (Breach)' | 'P2 - High' | 'P3 - Medium' | 'P4 - Low';
  status: 'Resolved & Closed' | 'Containment' | 'Eradication' | 'Post-Incident RCA';
  reportedAt: string;
  leadInvestigator: string;
  slaBreach: boolean;
  notifiedAuthorities: string;
  rootCause: string;
}

export interface ForensicPreservation {
  id: string;
  caseNumber: string;
  targetSystem: string;
  evidenceType: 'Memory Dump' | 'Disk Image (RAW/E01)' | 'PCAP Network Capture' | 'Cloud Audit Logs';
  sha256Hash: string;
  custodian: string;
  preservationDate: string;
  chainOfCustodyVerified: boolean;
  notes: string;
}

export interface ComplianceCalendarEvent {
  id: string;
  title: string;
  category: 'Audit' | 'Access Review' | 'Pen-Test' | 'Policy Review' | 'Regulatory Filing' | 'Training Sprint';
  dueDate: string;
  frequency: 'Quarterly' | 'Annual' | 'Bi-Annual' | 'Monthly';
  assignee: string;
  status: 'Upcoming' | 'In Progress' | 'Completed' | 'Overdue';
  frameworks: string[];
}

export interface LegalUpdateItem {
  id: string;
  jurisdiction: 'United States (SEC / FTC / FinCEN)' | 'European Union (GDPR / NIS2 / DORA / AI Act)' | 'United Kingdom' | 'Global / Multi-National';
  regulation: string;
  summary: string;
  impactLevel: 'Critical' | 'High' | 'Medium';
  effectiveDate: string;
  actionRequired: string;
  status: 'Addressed' | 'In Progress' | 'Monitoring';
}

export interface ObligationItem {
  id: string;
  party: string;
  type: 'Customer Security Exhibit' | 'Regulatory Mandate' | 'SLA Agreement' | 'Vendor DPA';
  commitment: string;
  penaltyClause: string;
  renewalDate: string;
  status: 'Fulfilled' | 'At Risk';
}

export interface RaciRole {
  id: string;
  roleName: string;
  designatedPerson: string;
  contact: string;
  responsibleFor: string[];
  accountableFor: string[];
  consulted: string[];
  informed: string[];
}

export interface ComplianceTask {
  id: string;
  title: string;
  category: string;
  priority: 'Urgent' | 'High' | 'Medium' | 'Routine';
  assignee: string;
  dueDate: string;
  status: 'Todo' | 'In Progress' | 'Review' | 'Done';
  freeAutomationRunner?: string;
}

export interface TrainingRecord {
  id: string;
  employeeName: string;
  role: string;
  module: 'CISA Cyber Essentials' | 'OWASP Top 10' | 'HIPAA Privacy & Security' | 'Crypto AML / Anti-Fraud' | 'Phishing Simulation';
  completedDate: string;
  score: number;
  certificateHash: string;
  status: 'Passed' | 'Required';
}

export interface CompanyBrandingConfig {
  companyName: string;
  portalSubtitle: string;
  logoUrl?: string;
  primaryColor: string;
  accentColor: string;
  themePreset: 'default' | 'corporate_blue' | 'emerald_health' | 'amber_defense' | 'purple_fintech' | 'custom';
  welcomeMessage: string;
  allowedEmailDomains: string[];
  isWhiteLabelActive: boolean;
  corporateDomain: string;
}

export type JurisdictionRegion =
  | 'all'
  | 'us_federal'
  | 'us_ca'
  | 'us_ny'
  | 'us_il'
  | 'us_tx'
  | 'us_other_states'
  | 'eu'
  | 'uk'
  | 'canada'
  | 'australia'
  | 'apac'
  | 'brazil_lgpd'
  | 'switzerland_fadp'
  | 'global';

export interface JurisdictionProfile {
  id: string;
  code: JurisdictionRegion;
  name: string;
  flag: string;
  type: 'federal' | 'state' | 'country' | 'economic_bloc';
  privacyStandard: string;
  employmentDoctrine: string;
  mandatoryTrainings: string[];
  keyAuthorities: string[];
}

