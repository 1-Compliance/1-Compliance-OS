import React, { useState, useMemo } from 'react';
import { CompanyBrandingConfig, JurisdictionRegion } from '../types/compliance';

interface EmploymentAndLocalLawsViewProps {
  branding?: CompanyBrandingConfig;
  onOpenSentinelHub?: (sentinelId?: string) => void;
  onNavigateTab?: (tab: string) => void;
}

export interface StatutoryLawItem {
  id: string;
  name: string;
  jurisdiction: string;
  jurisdictionCode: JurisdictionRegion;
  regionFlag: string;
  category:
    | 'Privacy & Data Rights'
    | 'Employment & Labor'
    | 'AI & Automated Decisions'
    | 'Corporate Governance & BOI'
    | 'Workplace Safety & Health'
    | 'ESG & Whistleblower';
  regulatoryBody: string;
  statutoryReference: string;
  applicability: string;
  penaltyRisk: string;
  status: 'compliant' | 'in_progress' | 'action_needed';
  summary: string;
  remediationSteps: string[];
  mandatoryNotices?: string;
  keyEnforcementDates?: string;
}

export const EmploymentAndLocalLawsView: React.FC<EmploymentAndLocalLawsViewProps> = ({
  branding,
  onOpenSentinelHub,
  onNavigateTab,
}) => {
  const companyName = branding?.companyName || '1-Compliance';

  // Multi-Jurisdiction Footprint Filter State
  const [selectedRegion, setSelectedRegion] = useState<JurisdictionRegion>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLawModal, setActiveLawModal] = useState<StatutoryLawItem | null>(null);

  // Active Company Footprint Configuration (allows business to customize its multi-state / international reach)
  const [activeFootprint, setActiveFootprint] = useState<JurisdictionRegion[]>([
    'us_federal',
    'us_ny',
    'us_ca',
    'eu',
  ]);

  // Master Global & Multi-State Statutory Repository
  const [laws, setLaws] = useState<StatutoryLawItem[]>([
    // ==========================================
    // 1. UNITED STATES - FEDERAL
    // ==========================================
    {
      id: 'fed-01',
      name: 'Corporate Transparency Act (CTA): FinCEN Beneficial Ownership (BOI)',
      jurisdiction: 'United States - Federal',
      jurisdictionCode: 'us_federal',
      regionFlag: '🇺🇸',
      category: 'Corporate Governance & BOI',
      regulatoryBody: 'Financial Crimes Enforcement Network (U.S. Dept of Treasury)',
      statutoryReference: '31 U.S.C. § 5336; 31 C.F.R. § 1010.380',
      applicability: 'All non-exempt corporations, LLCs, and entities created or registered to do business in the United States.',
      penaltyRisk: '$591 per day civil penalty; criminal fines up to $10,000 and up to 2 years imprisonment.',
      status: 'compliant',
      summary: 'Mandates filing a federal report disclosing beneficial owners (individuals holding 25%+ equity or exercising substantial control) and company applicants with FinCEN. Requires reporting updates within 30 days of changes.',
      remediationSteps: [
        'Identify all beneficial owners holding 25%+ direct/indirect equity or C-level officers with substantial control.',
        'Collect legal name, date of birth, current residential address, and government photo ID (passport/drivers license).',
        'Submit initial BOI report via FinCEN BOI E-Filing System.',
        'Set calendar trigger to file an updated report within 30 days of any change in ownership, executive leadership, or address.',
      ],
      mandatoryNotices: 'FinCEN Beneficial Ownership Information Filing Confirmation Receipt',
      keyEnforcementDates: 'Effective Jan 1, 2024; Ongoing 30-day update mandate',
    },
    {
      id: 'fed-02',
      name: 'Fair Labor Standards Act (FLSA): Overtime & Wage Classification',
      jurisdiction: 'United States - Federal',
      jurisdictionCode: 'us_federal',
      regionFlag: '🇺🇸',
      category: 'Employment & Labor',
      regulatoryBody: 'U.S. Department of Labor (Wage and Hour Division)',
      statutoryReference: '29 U.S.C. § 201 et seq.',
      applicability: 'All private and public employers across all 50 U.S. states.',
      penaltyRisk: 'Liquidated damages (200% back wages), attorney fees, and civil money penalties up to $2,374 per willful violation.',
      status: 'compliant',
      summary: 'Establishes federal minimum wage, 1.5x overtime pay for non-exempt workers over 40 hours per week, child labor protections, and the salary basis and duties tests for executive, administrative, and professional exemptions.',
      remediationSteps: [
        'Audit all workers classified as Exempt to ensure they satisfy the duties test and federal/state salary minimums.',
        'Enforce strict digital timekeeping protocols prohibiting unapproved off-the-clock work.',
        'Ensure non-exempt remote workers track all working hours accurately including email and Slack communications.',
      ],
      mandatoryNotices: 'Official U.S. DOL FLSA Employee Rights Poster',
    },
    {
      id: 'fed-03',
      name: 'Equal Employment Opportunity (EEOC Title VII, ADA, ADEA, PWFA)',
      jurisdiction: 'United States - Federal',
      jurisdictionCode: 'us_federal',
      regionFlag: '🇺🇸',
      category: 'Employment & Labor',
      regulatoryBody: 'Equal Employment Opportunity Commission (EEOC)',
      statutoryReference: '42 U.S.C. § 2000e; 42 U.S.C. § 12101; 42 U.S.C. § 2000gg',
      applicability: 'All employers with 15 or more employees (ADEA applies to 20+).',
      penaltyRisk: 'Compensatory and punitive damages up to $300,000 per claimant; mandatory EEOC consent decrees.',
      status: 'compliant',
      summary: 'Prohibits discrimination based on race, color, religion, sex, pregnancy (Pregnant Workers Fairness Act), national origin, age (40+), disability, or genetic information. Mandates interactive accommodation dialogue.',
      remediationSteps: [
        'Distribute compliant EEO policy statements across employee handbooks and offer letters.',
        'Establish interactive accommodation procedures for pregnant employees and workers with disabilities.',
        'Display the "Know Your Rights: Workplace Discrimination is Illegal" poster physically and electronically.',
      ],
      mandatoryNotices: 'EEOC "Know Your Rights: Workplace Discrimination is Illegal" Notice',
    },
    {
      id: 'fed-04',
      name: 'OSHA Workplace Safety, Hazard Communication & Form 300 Logs',
      jurisdiction: 'United States - Federal',
      jurisdictionCode: 'us_federal',
      regionFlag: '🇺🇸',
      category: 'Workplace Safety & Health',
      regulatoryBody: 'Occupational Safety and Health Administration (U.S. Dept of Labor)',
      statutoryReference: '29 U.S.C. § 654; 29 CFR Part 1904',
      applicability: 'All employers with 11 or more employees (general safety rules apply to all employers).',
      penaltyRisk: 'Up to $16,131 per serious violation; up to $161,323 for repeat or willful violations.',
      status: 'compliant',
      summary: 'Requires maintaining safe workplaces free from recognized hazards, displaying the Job Safety and Health poster, and maintaining OSHA 300 logs of work-related injuries and illnesses.',
      remediationSteps: [
        'Display the official OSHA "Job Safety and Health: It\'s the Law!" poster in employee common areas.',
        'Maintain annual OSHA 300/300A injury logs and post summary between February 1 and April 30.',
        'Implement Ergonomic and Hazard Communication protocols for office and remote personnel.',
      ],
      mandatoryNotices: 'OSHA Form 300 / 300A Workplace Injury and Illness Record',
    },
    {
      id: 'fed-05',
      name: 'FTC Act Section 5: AI Bias, Truth in Advertising & Data Deception',
      jurisdiction: 'United States - Federal',
      jurisdictionCode: 'us_federal',
      regionFlag: '🇺🇸',
      category: 'AI & Automated Decisions',
      regulatoryBody: 'Federal Trade Commission (FTC - Bureau of Consumer Protection)',
      statutoryReference: '15 U.S.C. § 45',
      applicability: 'Any commercial business deploying AI models, marketing AI tools, or handling customer data in the U.S.',
      penaltyRisk: 'Civil penalties up to $50,120 per violation; FTC algorithmic disgorgement orders (forced model deletion).',
      status: 'compliant',
      summary: 'Enforces against deceptive AI claims (overpromising AI accuracy), algorithmic bias without substantiation, and deceptive data collection practices contrary to privacy disclosures.',
      remediationSteps: [
        'Substantiate all AI product capability claims with independent benchmark data.',
        'Conduct algorithmic impact reviews before claiming automated tools are "unbiased" or "secure".',
        'Audit customer disclosures to ensure no secret training of generative models on sensitive customer inputs.',
      ],
      mandatoryNotices: 'FTC Algorithmic Accountability & Truthful Representation Statement',
    },

    // ==========================================
    // 2. UNITED STATES - CALIFORNIA (CA)
    // ==========================================
    {
      id: 'ca-01',
      name: 'California Consumer Privacy Act & CPRA (CCPA / CPRA)',
      jurisdiction: 'United States - California',
      jurisdictionCode: 'us_ca',
      regionFlag: '🌴',
      category: 'Privacy & Data Rights',
      regulatoryBody: 'California Privacy Protection Agency (CPPA) & California AG',
      statutoryReference: 'Cal. Civ. Code § 1798.100 et seq.; 11 CCR § 7000 et seq.',
      applicability: 'For-profit businesses doing business in CA with >$25M revenue, 100k+ consumer records, or deriving 50%+ revenue from data sales/sharing.',
      penaltyRisk: '$2,500 per negligent violation; $7,500 per intentional violation; $100–$750 statutory damages per consumer for data breaches.',
      status: 'compliant',
      summary: 'Broadest consumer privacy regime in the U.S. Grants CA residents rights to know, delete, correct personal data, opt-out of data sale/sharing, and limit the use of Sensitive Personal Information (SPI). Extends to employee and B2B data.',
      remediationSteps: [
        'Deploy prominent "Do Not Sell or Share My Personal Information" link and support Universal Opt-Out Mechanisms (GPC).',
        'Issue California Notice at Collection to both website visitors and CA-based job applicants and employees.',
        'Conduct Data Protection Impact Assessments (DPIA) for high-risk data processing and automated decision-making.',
        'Execute compliant CCPA/CPRA Data Processing Agreements (DPAs) with all vendors and service providers.',
      ],
      mandatoryNotices: 'California Notice at Collection & CCPA Privacy Rights Statement',
    },
    {
      id: 'ca-02',
      name: 'California SB 553: Mandatory Workplace Violence Prevention Plan (WVPP)',
      jurisdiction: 'United States - California',
      jurisdictionCode: 'us_ca',
      regionFlag: '🌴',
      category: 'Workplace Safety & Health',
      regulatoryBody: 'Cal/OSHA (California Division of Occupational Safety and Health)',
      statutoryReference: 'Cal. Labor Code § 6401.9',
      applicability: 'Nearly all California employers with employees physically working in the state.',
      penaltyRisk: 'Cal/OSHA citations ranging from $15,873 (general) to $158,727 (willful) per violation.',
      status: 'compliant',
      summary: 'Mandates creating and maintaining a written, site-specific Workplace Violence Prevention Plan (WVPP), maintaining an active Violent Incident Log, and conducting annual interactive employee training.',
      remediationSteps: [
        'Adopt the 1-Compliance California WVPP Policy document tailored to facility and remote staff.',
        'Establish confidential reporting procedures for workplace violence threats without fear of retaliation.',
        'Maintain the required Violent Incident Log documenting incident date, type of violence, and corrective actions taken.',
        'Deliver annual interactive workplace violence prevention training to all California staff.',
      ],
      mandatoryNotices: 'California Workplace Violence Prevention Plan (WVPP) & Incident Log',
      keyEnforcementDates: 'Mandatory Compliance Effective July 1, 2024',
    },
    {
      id: 'ca-03',
      name: 'California SB 616: Paid Sick Leave Expansion (5 Days / 40 Hours)',
      jurisdiction: 'United States - California',
      jurisdictionCode: 'us_ca',
      regionFlag: '🌴',
      category: 'Employment & Labor',
      regulatoryBody: 'California Labor Commissioner (DIR - Division of Labor Standards Enforcement)',
      statutoryReference: 'Cal. Labor Code § 245 et seq. (amended by SB 616)',
      applicability: 'All employers with employees working in California for 30 or more days within a year.',
      penaltyRisk: 'Administrative penalties, 3x unpaid wages or $250, up to $4,000 maximum per employee.',
      status: 'compliant',
      summary: 'Increases mandatory paid sick leave from 3 days (24 hours) to 5 days (40 hours) annually. Employees accrue at least 1 hour per 30 hours worked or receive upfront grant on Jan 1.',
      remediationSteps: [
        'Update employee handbook policy to reflect 40 hours / 5 days annual paid sick leave entitlement.',
        'Display current sick leave balance on employee wage stubs each pay period.',
        'Refrain from requiring documentation for sick leave unless absent for more than 3 consecutive days.',
      ],
      mandatoryNotices: 'California DLSE Paid Sick Leave Notice (DIR Poster)',
    },
    {
      id: 'ca-04',
      name: 'California SB 1162: Salary Transparency & Annual Pay Data Reporting',
      jurisdiction: 'United States - California',
      jurisdictionCode: 'us_ca',
      regionFlag: '🌴',
      category: 'Employment & Labor',
      regulatoryBody: 'California Civil Rights Department (CRD)',
      statutoryReference: 'Cal. Labor Code § 432.3; Cal. Gov. Code § 12999',
      applicability: 'Pay scale disclosure: 15+ employees. Pay data reporting: 100+ employees (including labor contractor workers).',
      penaltyRisk: 'Civil penalties of $100 to $10,000 per job posting violation; up to $200 per employee for failure to file pay data.',
      status: 'compliant',
      summary: 'Employers must include the pay scale (salary or hourly wage range) in any job posting for positions that can be performed in California. Employers with 100+ workers must submit annual payroll demographic data.',
      remediationSteps: [
        'Audit all active job listings (internal and external) to ensure good-faith wage ranges are stated.',
        'Maintain job title history and wage rate history for every employee for duration of employment + 3 years.',
        'Prepare annual CRD Payroll Employee and Labor Contractor Pay Data Reports by second Wednesday of May.',
      ],
      mandatoryNotices: 'California Pay Scale Disclosure & CRD Annual Filing Ledger',
    },

    // ==========================================
    // 3. UNITED STATES - NEW YORK (NY & NYC)
    // ==========================================
    {
      id: 'ny-01',
      name: 'NYC Local Law 144: Automated Employment Decision Tools (AEDT)',
      jurisdiction: 'United States - New York',
      jurisdictionCode: 'us_ny',
      regionFlag: '🗽',
      category: 'AI & Automated Decisions',
      regulatoryBody: 'NYC Department of Consumer and Worker Protection (DCWP)',
      statutoryReference: 'NYC Admin. Code § 20-870 et seq.',
      applicability: 'Any business hiring in NYC using AI, algorithms, or automated software to screen resumes or rank applicants.',
      penaltyRisk: '$500 for first violation; up to $1,500 for each subsequent daily violation per candidate.',
      status: 'compliant',
      summary: 'Mandates an independent annual bias audit for AI resume screening tools, publishing summary audit metrics on the company website, and providing 10 business days advance written notice to job applicants before using automated assessment tools.',
      remediationSteps: [
        'Confirm if your ATS (Greenhouse, Lever, Workday) uses automated resume scoring or AI sorting.',
        'Obtain independent annual bias audit report from software vendor confirming impact ratios across gender and race categories.',
        'Post link to summary bias audit report on company careers portal.',
        'Embed mandatory 10-day advance notice disclosure into NYC job application forms.',
      ],
      mandatoryNotices: 'NYC Local Law 144 Pre-Employment AI Assessment Disclosure Notice',
    },
    {
      id: 'ny-02',
      name: 'NYS Civil Rights Law § 52-c: Employee Electronic Monitoring Disclosure',
      jurisdiction: 'United States - New York',
      jurisdictionCode: 'us_ny',
      regionFlag: '🗽',
      category: 'Employment & Labor',
      regulatoryBody: 'New York State Attorney General / Labor Bureau',
      statutoryReference: 'NYS Civil Rights Law § 52-c',
      applicability: 'All private employers in New York State with one or more employees.',
      penaltyRisk: '$500 for 1st offense, $1,000 for 2nd offense, $3,000 for each subsequent violation.',
      status: 'compliant',
      summary: 'Employers monitoring employee telephone calls, email, internet usage, or computing equipment must provide written notice upon hire and obtain an electronic or written signed acknowledgment.',
      remediationSteps: [
        'Provide mandatory statutory disclosure in the 1-Compliance Employee Handbook (Chapter 6).',
        'Require electronic signed acknowledgment from all new hires prior to issuing laptop or email accounts.',
        'Post conspicuous electronic monitoring notice on intranet and employee portal.',
      ],
      mandatoryNotices: 'Mandatory Notice of Employee Electronic Monitoring (NYS CRL § 52-c)',
    },
    {
      id: 'ny-03',
      name: 'NYC Earned Safe & Sick Time Act (ESSTA) & NYS Paid Sick Leave',
      jurisdiction: 'United States - New York',
      jurisdictionCode: 'us_ny',
      regionFlag: '🗽',
      category: 'Employment & Labor',
      regulatoryBody: 'NYC DCWP & NYS Department of Labor',
      statutoryReference: 'NYC Admin. Code Title 20, Ch. 8; NYS Labor Law § 196-b',
      applicability: 'All employers with workers in NYC or NY State (including remote workers residing in the state).',
      penaltyRisk: '$500 per employee failure to notice; 3x unpaid sick wages; statutory fines up to $2,500.',
      status: 'compliant',
      summary: 'Employees accrue 1 hour of paid safe/sick leave per 30 hours worked (up to 40 or 56 hours annually based on company size). Retaliation strictly prohibited.',
      remediationSteps: [
        'Track sick and safe leave accruals on monthly pay stubs.',
        'Provide official NYC Notice of Employee Rights in employee primary language upon hire.',
        'Train managers that employees may not be disciplined or required to find shift replacements.',
      ],
      mandatoryNotices: 'NYC Notice of Employee Rights: Earned Safe and Sick Time Act',
    },
    {
      id: 'ny-04',
      name: 'NYS Labor Law § 201-g: Mandatory Annual Sexual Harassment Prevention',
      jurisdiction: 'United States - New York',
      jurisdictionCode: 'us_ny',
      regionFlag: '🗽',
      category: 'Employment & Labor',
      regulatoryBody: 'NYS Division of Human Rights & NYS Dept of Labor',
      statutoryReference: 'NYS Labor Law § 201-g; NYC Admin. Code § 8-107.13',
      applicability: 'All employers in New York State regardless of company size.',
      penaltyRisk: 'Statutory non-compliance fines; forfeiture of Faragher/Ellerth affirmative defense in litigation.',
      status: 'compliant',
      summary: 'Employers must provide interactive sexual harassment prevention training annually to all employees and distribute a compliant written policy upon hire and during annual training.',
      remediationSteps: [
        'Assign the 1-Compliance Gamified Training Quest on Sexual Harassment Prevention to all staff.',
        'Collect digital completion certificates and retain in the audit ledger for 3 years.',
        'Provide the compliant Harassment Complaint Form and reporting flow to all staff.',
      ],
      mandatoryNotices: 'Model Sexual Harassment Policy & Complaint Form (NYS / NYC Dual-Compliant)',
    },

    // ==========================================
    // 4. UNITED STATES - ILLINOIS (IL)
    // ==========================================
    {
      id: 'il-01',
      name: 'Illinois Biometric Information Privacy Act (BIPA)',
      jurisdiction: 'United States - Illinois',
      jurisdictionCode: 'us_il',
      regionFlag: '🌽',
      category: 'Privacy & Data Rights',
      regulatoryBody: 'Illinois State Courts (Private Right of Action)',
      statutoryReference: '740 ILCS 14/1 et seq.',
      applicability: 'Any entity capturing, storing, or using biometric identifiers (fingerprints, voiceprints, retina/iris scans, facial geometry) of Illinois residents.',
      penaltyRisk: 'Statutory liquidated damages of $1,000 per negligent violation; $5,000 per reckless/intentional violation (amended in 2024 to per-person recovery).',
      status: 'compliant',
      summary: 'Requires written informed consent prior to collecting biometric data, a publicly available written retention schedule and destruction policy, and strictly bans profiting from or selling biometric data.',
      remediationSteps: [
        'Audit all biometric touchpoints (timeclocks with fingerprint scanners, video facial recognition, identity verification).',
        'Publish BIPA Biometric Information Retention and Destruction Policy (max 3 years retention).',
        'Obtain signed written BIPA consent forms from every Illinois worker before collecting any biometric data.',
      ],
      mandatoryNotices: 'Illinois BIPA Biometric Information Consent & Retention Notice',
    },
    {
      id: 'il-02',
      name: 'Illinois Paid Leave for All Workers Act (PLAWA)',
      jurisdiction: 'United States - Illinois',
      jurisdictionCode: 'us_il',
      regionFlag: '🌽',
      category: 'Employment & Labor',
      regulatoryBody: 'Illinois Department of Labor (IDOL)',
      statutoryReference: '820 ILCS 192/1 et seq.',
      applicability: 'All employers with employees in Illinois (unless exempt under Cook County / Chicago municipal ordinances).',
      penaltyRisk: 'Damages of actual underpayment, statutory compensatory damages of $500–$1,000, and $2,500 IDOL penalties.',
      status: 'compliant',
      summary: 'Requires employers to provide up to 40 hours of paid leave per 12-month period. Crucially, workers may use this leave for ANY reason whatsoever without providing documentation or justification.',
      remediationSteps: [
        'Update leave policy granting 1 hour paid leave per 40 hours worked (or 40 hours upfront).',
        'Train supervisors that employees cannot be required to provide a reason or medical note for PLAWA leave.',
        'Post the IDOL Paid Leave for All Workers Act notice physically and electronically.',
      ],
      mandatoryNotices: 'Illinois IDOL Paid Leave for All Workers Notice',
      keyEnforcementDates: 'Effective January 1, 2024',
    },
    {
      id: 'il-03',
      name: 'Illinois Artificial Intelligence Video Interview Act',
      jurisdiction: 'United States - Illinois',
      jurisdictionCode: 'us_il',
      regionFlag: '🌽',
      category: 'AI & Automated Decisions',
      regulatoryBody: 'Illinois Department of Labor (IDOL)',
      statutoryReference: '820 ILCS 42/1 et seq.',
      applicability: 'Any employer asking Illinois applicants to submit video interviews analyzed by AI algorithms.',
      penaltyRisk: 'Civil liability, administrative penalties, and applicant discrimination claims.',
      status: 'compliant',
      summary: 'Employers using AI to analyze candidate video interviews must notify applicants in advance, explain how the AI evaluates characteristics, obtain prior consent, and delete video files within 30 days of request.',
      remediationSteps: [
        'Provide written AI video interview disclosure explaining evaluation metrics prior to candidate recording.',
        'Collect candidate affirmative electronic consent.',
        'Maintain automated 30-day deletion pipeline for all candidate video recordings upon request.',
      ],
      mandatoryNotices: 'Illinois AI Video Interview Disclosure & Consent Protocol',
    },

    // ==========================================
    // 5. UNITED STATES - TEXAS (TX)
    // ==========================================
    {
      id: 'tx-01',
      name: 'Texas Data Privacy and Security Act (TDPSA)',
      jurisdiction: 'United States - Texas',
      jurisdictionCode: 'us_tx',
      regionFlag: '🤠',
      category: 'Privacy & Data Rights',
      regulatoryBody: 'Office of the Texas Attorney General',
      statutoryReference: 'Tex. Bus. & Com. Code § 541.001 et seq.',
      applicability: 'Any person/business conducting business in Texas or producing products/services consumed by Texas residents (no revenue threshold; applies to non-small businesses under SBA standards).',
      penaltyRisk: 'Civil penalties up to $7,500 per violation; Attorney General injunctions with no private right of action.',
      status: 'compliant',
      summary: 'Broad consumer privacy act establishing consumer rights to access, correct, delete, port data, and opt-out of targeted advertising, sale of personal data, and profiling. Requires Data Protection Assessments.',
      remediationSteps: [
        'Post comprehensive privacy notice with clear disclosures on sale/sharing of biometric or sensitive personal data.',
        'Conduct Data Protection Assessments for processing that presents heightened risk of harm.',
        'Implement 30-day cure response workflow for Texas Attorney General civil investigative inquiries.',
      ],
      mandatoryNotices: 'Texas Consumer Data Privacy Notice & Opt-Out Mechanism',
      keyEnforcementDates: 'Effective July 1, 2024',
    },
    {
      id: 'tx-02',
      name: 'Texas Payday Law & Timely Payment Mandate',
      jurisdiction: 'United States - Texas',
      jurisdictionCode: 'us_tx',
      regionFlag: '🤠',
      category: 'Employment & Labor',
      regulatoryBody: 'Texas Workforce Commission (TWC)',
      statutoryReference: 'Tex. Labor Code Ann. Ch. 61',
      applicability: 'All employers operating in Texas.',
      penaltyRisk: 'Order of wages owed plus administrative penalties up to $1,000 per violation for bad-faith non-payment.',
      status: 'compliant',
      summary: 'Regulates wage payment frequency (non-exempt must be paid at least semi-monthly; exempt at least monthly). Requires designated paydays and written authorization for any payroll deductions.',
      remediationSteps: [
        'Designate and post official paydays in prominent workplace locations and employee portals.',
        'Execute written signed wage deduction authorizations before making any non-statutory payroll deductions.',
        'Issue final paychecks within 6 calendar days for involuntary terminations, or next regular payday for voluntary resignations.',
      ],
      mandatoryNotices: 'Texas Workforce Commission Payday Notice Poster',
    },

    // ==========================================
    // 6. UNITED STATES - COLORADO & WASHINGTON
    // ==========================================
    {
      id: 'co-01',
      name: 'Colorado Artificial Intelligence Act (SB 24-205)',
      jurisdiction: 'United States - Other US States',
      jurisdictionCode: 'us_other_states',
      regionFlag: '🏔️',
      category: 'AI & Automated Decisions',
      regulatoryBody: 'Colorado Attorney General',
      statutoryReference: 'C.R.S. § 6-1-1701 et seq.',
      applicability: 'Developers and deployers of high-risk AI systems doing business in Colorado.',
      penaltyRisk: 'Classified as deceptive trade practice under CCPA; civil penalties up to $20,000 per violation.',
      status: 'compliant',
      summary: 'First comprehensive state law imposing affirmative duty of care on deployers of high-risk AI systems to avoid algorithmic discrimination in employment, education, housing, and financial services. Requires impact assessments.',
      remediationSteps: [
        'Implement risk management policy for all high-risk AI systems influencing hiring or promotion decisions.',
        'Complete annual Algorithmic Discrimination Impact Assessment.',
        'Provide notice to consumers/employees when high-risk AI makes consequential decisions.',
      ],
      mandatoryNotices: 'Colorado High-Risk AI System Consequential Decision Notice',
      keyEnforcementDates: 'Effective February 1, 2026',
    },
    {
      id: 'wa-01',
      name: 'Washington My Health My Data Act (MHMDA)',
      jurisdiction: 'United States - Other US States',
      jurisdictionCode: 'us_other_states',
      regionFlag: '🌲',
      category: 'Privacy & Data Rights',
      regulatoryBody: 'Washington State Attorney General & Private Right of Action',
      statutoryReference: 'RCW 19.373 et seq.',
      applicability: 'Any legal entity conducting business in Washington or targeting Washington consumers that collects consumer health data.',
      penaltyRisk: 'Per se violation of WA Consumer Protection Act; actual damages, treble damages up to $25,000, and attorney fees.',
      status: 'compliant',
      summary: 'Strict protection for non-HIPAA consumer health data (wellness, fitness, biometric, reproductive health). Strictly bans geofencing around medical facilities and requires opt-in consent for health data collection.',
      remediationSteps: [
        'Publish dedicated Consumer Health Data Privacy Policy on website with prominent homepage link.',
        'Obtain explicit opt-in consent prior to collecting or sharing any biometric, wellness, or consumer health data.',
        'Audit company apps and advertising beacons to ensure zero geofencing around health care facilities.',
      ],
      mandatoryNotices: 'Washington Consumer Health Data Privacy Policy',
      keyEnforcementDates: 'Fully Enforced for all entities since June 30, 2024',
    },

    // ==========================================
    // 7. EUROPEAN UNION & EEA (EU)
    // ==========================================
    {
      id: 'eu-01',
      name: 'EU General Data Protection Regulation (GDPR)',
      jurisdiction: 'European Union',
      jurisdictionCode: 'eu',
      regionFlag: '🇪🇺',
      category: 'Privacy & Data Rights',
      regulatoryBody: 'European Data Protection Board (EDPB) & National Data Protection Authorities (CNIL, DPC, BfDI)',
      statutoryReference: 'Regulation (EU) 2016/679',
      applicability: 'Any organization processing personal data of EU residents, regardless of where the company is physically located (Article 3 extraterritorial reach).',
      penaltyRisk: 'Tier 1: Up to €10,000,000 or 2% global turnover. Tier 2: Up to €20,000,000 or 4% of total worldwide annual turnover.',
      status: 'compliant',
      summary: 'Gold standard global data privacy law. Mandates lawful basis (consent/legitimate interest), data subject rights (access, erasure, portability), 72-hour breach notification, and Standard Contractual Clauses (SCCs) for cross-border data transfers.',
      remediationSteps: [
        'Maintain comprehensive Record of Processing Activities (ROPA / Article 30 ledger).',
        'Execute EU Standard Contractual Clauses (SCCs) and Transfer Impact Assessments (TIAs) with all sub-processors.',
        'Implement Cookie Consent Management supporting opt-in before non-essential tracking cookies fire.',
        'Appoint EU Data Protection Officer (DPO) or EU Article 27 Representative if required.',
      ],
      mandatoryNotices: 'GDPR Article 13/14 Privacy Notice & Record of Processing Activities (ROPA)',
    },
    {
      id: 'eu-02',
      name: 'EU Artificial Intelligence Act (EU AI Act)',
      jurisdiction: 'European Union',
      jurisdictionCode: 'eu',
      regionFlag: '🇪🇺',
      category: 'AI & Automated Decisions',
      regulatoryBody: 'European AI Office & National Market Surveillance Authorities',
      statutoryReference: 'Regulation (EU) 2024/1689',
      applicability: 'Providers placing AI systems on the EU market and deployers located or using AI systems within the EU.',
      penaltyRisk: 'Prohibited AI: Up to €35M or 7% global turnover. High-Risk non-compliance: Up to €15M or 3% global turnover.',
      status: 'compliant',
      summary: 'World\'s first comprehensive risk-based AI law. Categorizes AI systems into Prohibited (social scoring, biometric categorization), High-Risk (employment recruitment, biometric identification), and General Purpose AI (GPAI transparency).',
      remediationSteps: [
        'Screen AI systems against Article 5 Prohibited AI practices list to ensure zero prohibited models are deployed.',
        'Prepare CE marking and conformity assessment documentation for any High-Risk AI recruitment tools.',
        'Establish AI governance, human-in-the-loop oversight protocols, and technical cybersecurity documentation.',
      ],
      mandatoryNotices: 'EU AI Act Risk Classification & Fundamental Rights Impact Assessment',
      keyEnforcementDates: 'Prohibited AI: Nov 2024; GPAI: Aug 2025; Full High-Risk: Aug 2026',
    },
    {
      id: 'eu-03',
      name: 'EU Whistleblowing Directive & Reporting Channels',
      jurisdiction: 'European Union',
      jurisdictionCode: 'eu',
      regionFlag: '🇪🇺',
      category: 'ESG & Whistleblower',
      regulatoryBody: 'EU Member State National Authorities',
      statutoryReference: 'Directive (EU) 2019/1937',
      applicability: 'All legal entities in the EU private sector with 50 or more workers.',
      penaltyRisk: 'National financial penalties, employer liability for damages, and severe sanctions for retaliation.',
      status: 'compliant',
      summary: 'Mandates establishing secure, confidential internal reporting channels allowing employees, contractors, and job applicants to report EU law breaches. Strictly prohibits any form of retaliation.',
      remediationSteps: [
        'Deploy confidential whistleblower intake channel (email/portal) guaranteeing anonymity upon request.',
        'Acknowledge whistleblower reports within 7 days and provide diligent feedback within 3 months.',
        'Adopt absolute anti-retaliation and whistleblower protection policy in employee manual.',
      ],
      mandatoryNotices: 'EU Whistleblower Reporting Channel Protocol & Non-Retaliation Policy',
    },

    // ==========================================
    // 8. UNITED KINGDOM (UK)
    // ==========================================
    {
      id: 'uk-01',
      name: 'UK GDPR & Data Protection Act 2018',
      jurisdiction: 'United Kingdom',
      jurisdictionCode: 'uk',
      regionFlag: '🇬🇧',
      category: 'Privacy & Data Rights',
      regulatoryBody: 'Information Commissioner\'s Office (ICO)',
      statutoryReference: 'UK GDPR; Data Protection Act 2018',
      applicability: 'Organizations established in the UK, or organizations offering goods/services or monitoring behavior of individuals in the UK.',
      penaltyRisk: 'Up to £17,500,000 or 4% of total worldwide annual turnover, whichever is higher.',
      status: 'compliant',
      summary: 'Post-Brexit UK data protection regime closely aligned with EU GDPR. Mandates accountability principles, International Data Transfer Agreements (IDTAs), and prompt ICO notification of high-risk security breaches.',
      remediationSteps: [
        'Maintain UK Record of Processing Activities and update UK Privacy Notices.',
        'Execute UK International Data Transfer Agreements (IDTAs) or UK Addendum to EU SCCs for data exports.',
        'Appoint a UK Representative if company is located outside the UK but targets UK data subjects.',
      ],
      mandatoryNotices: 'UK ICO-Compliant Privacy Notice & International Transfer Agreement',
    },
    {
      id: 'uk-02',
      name: 'UK Bribery Act 2010 (Corporate Failure to Prevent Bribery)',
      jurisdiction: 'United Kingdom',
      jurisdictionCode: 'uk',
      regionFlag: '🇬🇧',
      category: 'Corporate Governance & BOI',
      regulatoryBody: 'Serious Fraud Office (SFO) & Crown Prosecution Service (CPS)',
      statutoryReference: 'Bribery Act 2010 (c. 23)',
      applicability: 'All UK commercial organizations and foreign entities carrying on business in the UK.',
      penaltyRisk: 'Unlimited corporate fines; debarment from public procurement; up to 10 years imprisonment for directors.',
      status: 'compliant',
      summary: 'World-renowned anti-corruption legislation. Imposes strict corporate criminal liability under Section 7 for failure to prevent bribery by persons associated with the company, anywhere in the world.',
      remediationSteps: [
        'Establish top-level commitment and anti-bribery / anti-corruption policy.',
        'Implement risk-based due diligence procedures for third-party agents, intermediaries, and partners.',
        'Maintain gift and hospitality register with clear monetary approval thresholds.',
      ],
      mandatoryNotices: 'UK Anti-Bribery & Corruption Policy and Gift Register Protocol',
    },
    {
      id: 'uk-03',
      name: 'UK Modern Slavery Act 2015 (Section 54 Transparency Statement)',
      jurisdiction: 'United Kingdom',
      jurisdictionCode: 'uk',
      regionFlag: '🇬🇧',
      category: 'ESG & Whistleblower',
      regulatoryBody: 'Home Office & UK High Court',
      statutoryReference: 'Modern Slavery Act 2015 (c. 30), § 54',
      applicability: 'Commercial organizations carrying on business in the UK with annual turnover of £36 million or more.',
      penaltyRisk: 'High Court injunctions, public naming-and-shaming, brand reputational damage, and supply chain exclusion.',
      status: 'compliant',
      summary: 'Requires commercial entities to prepare and publish an annual Modern Slavery Statement on their website homepage, outlining steps taken to ensure no slavery or human trafficking exists in their business or supply chains.',
      remediationSteps: [
        'Conduct supply chain vendor risk tiering for human trafficking and forced labor risks.',
        'Draft annual Modern Slavery Statement approved by the Board of Directors and signed by a Director.',
        'Publish prominent link to the statement on the website homepage footer.',
      ],
      mandatoryNotices: 'UK Annual Modern Slavery and Human Trafficking Statement',
    },

    // ==========================================
    // 9. CANADA (CA)
    // ==========================================
    {
      id: 'can-01',
      name: 'Canada PIPEDA & Quebec Law 25 (Data Privacy Modernization)',
      jurisdiction: 'Canada',
      jurisdictionCode: 'canada',
      regionFlag: '🍁',
      category: 'Privacy & Data Rights',
      regulatoryBody: 'Office of the Privacy Commissioner of Canada (OPC) & Commission d\'accès à l\'information du Québec (CAI)',
      statutoryReference: 'PIPEDA (S.C. 2000, c. 5); Quebec Act Respecting the Protection of Personal Information (amended by Law 25)',
      applicability: 'Private sector organizations collecting, using, or disclosing personal information in commercial activities in Canada.',
      penaltyRisk: 'Quebec Law 25 penalties up to $25,000,000 CAD or 4% of worldwide turnover; statutory damages in civil court.',
      status: 'compliant',
      summary: 'Regulates commercial personal data collection across Canada. Quebec Law 25 mirrors European GDPR, requiring mandatory Privacy Impact Assessments (PIAs), default privacy settings, and appointment of a designated Privacy Officer.',
      remediationSteps: [
        'Designate a Chief Privacy Officer with contact information published on website privacy notice.',
        'Conduct Privacy Impact Assessments before transferring personal data outside of Quebec or Canada.',
        'Implement robust mandatory breach logging and notification to OPC / CAI.',
      ],
      mandatoryNotices: 'Canada PIPEDA / Quebec Law 25 Privacy Policy & PIA Documentation',
    },
    {
      id: 'can-02',
      name: 'Ontario Employment Standards Act: Right to Disconnect & Electronic Monitoring',
      jurisdiction: 'Canada',
      jurisdictionCode: 'canada',
      regionFlag: '🍁',
      category: 'Employment & Labor',
      regulatoryBody: 'Ontario Ministry of Labour, Immigration, Training and Skills Development',
      statutoryReference: 'Employment Standards Act, 2000 (S.O. 2000, c. 41), Part VII.0.1 & VII.0.2',
      applicability: 'Employers with 25 or more employees in Ontario.',
      penaltyRisk: 'Ministry of Labour compliance orders, administrative penalties, and employee constructive dismissal claims.',
      status: 'compliant',
      summary: 'Requires employers to have a written "Right to Disconnect" policy regarding work-related communications outside working hours, as well as a written policy disclosing whether and how employees are electronically monitored.',
      remediationSteps: [
        'Adopt written Right to Disconnect policy outlining clear expectations regarding after-hours emails and calls.',
        'Provide written electronic monitoring disclosure describing software, tracking metrics, and purpose of monitoring.',
        'Distribute copies to all Ontario workers within 30 days of hiring.',
      ],
      mandatoryNotices: 'Ontario Statutory Right to Disconnect & Electronic Monitoring Policy',
    },

    // ==========================================
    // 10. AUSTRALIA (AU)
    // ==========================================
    {
      id: 'au-01',
      name: 'Australia Privacy Act 1988 (Australian Privacy Principles - APPs)',
      jurisdiction: 'Australia',
      jurisdictionCode: 'australia',
      regionFlag: '🇦🇺',
      category: 'Privacy & Data Rights',
      regulatoryBody: 'Office of the Australian Information Commissioner (OAIC)',
      statutoryReference: 'Privacy Act 1988 (Cth); Privacy Legislation Amendment Act 2022',
      applicability: 'Australian entities and foreign businesses with an Australian link having annual turnover >$3 million AUD (or handling health/biometric data).',
      penaltyRisk: 'Civil penalties for serious or repeated interferences with privacy up to $50,000,000 AUD, or 3x the benefit obtained, or 30% of adjusted turnover.',
      status: 'compliant',
      summary: 'Sets out 13 Australian Privacy Principles (APPs) governing open and transparent management of personal information, cross-border disclosures (APP 8), and Notifiable Data Breaches (NDB scheme).',
      remediationSteps: [
        'Publish APP 1 compliant Privacy Policy outlining handling of Australian personal information.',
        'Maintain Notifiable Data Breaches (NDB) response procedure for assessment within 30 days.',
        'Implement reasonable steps to protect personal information against misuse, loss, and unauthorized access.',
      ],
      mandatoryNotices: 'Australian Privacy Principles (APP) Privacy Statement & NDB Plan',
    },
    {
      id: 'au-02',
      name: 'Australia Fair Work Act: Statutory "Right to Disconnect" & NES',
      jurisdiction: 'Australia',
      jurisdictionCode: 'australia',
      regionFlag: '🇦🇺',
      category: 'Employment & Labor',
      regulatoryBody: 'Fair Work Ombudsman (FWO) & Fair Work Commission (FWC)',
      statutoryReference: 'Fair Work Act 2009 (amended by Fair Work Legislation Amendment Closing Loopholes No. 2 Act 2024)',
      applicability: 'All national system employers in Australia (effective August 2024 for non-small business; August 2025 for small business).',
      penaltyRisk: 'Fair Work Commission stop orders; civil court fines up to $93,900 AUD per contravention.',
      status: 'compliant',
      summary: 'Gives employees a workplace right to refuse to monitor, read, or respond to employer or client contact outside of working hours, unless the refusal is unreasonable.',
      remediationSteps: [
        'Audit after-hours contact expectations and adjust manager communication protocols.',
        'Incorporate the Right to Disconnect terms into Australian employment contracts and handbooks.',
        'Establish an internal dispute resolution procedure for after-hours contact disagreements.',
      ],
      mandatoryNotices: 'Australian Fair Work Right to Disconnect Guideline',
      keyEnforcementDates: 'Effective August 26, 2024 (Small businesses: August 26, 2025)',
    },

    // ==========================================
    // 11. SINGAPORE & ASIA-PACIFIC (SG / APAC)
    // ==========================================
    {
      id: 'sg-01',
      name: 'Singapore Personal Data Protection Act (PDPA 2012)',
      jurisdiction: 'Singapore / APAC',
      jurisdictionCode: 'apac',
      regionFlag: '🇸🇬',
      category: 'Privacy & Data Rights',
      regulatoryBody: 'Personal Data Protection Commission (PDPC)',
      statutoryReference: 'Personal Data Protection Act 2012 (Act 26 of 2012)',
      applicability: 'All private sector organizations collecting, using, or disclosing personal data in Singapore.',
      penaltyRisk: 'Financial penalties up to $1,000,000 SGD or 10% of annual gross turnover in Singapore (whichever is higher).',
      status: 'compliant',
      summary: 'Comprises nine main data protection obligations including Consent, Purpose Limitation, Notification, Access & Correction, Accuracy, Protection, Retention Limitation, Transfer Limitation, and Accountability. Mandates DPO appointment.',
      remediationSteps: [
        'Appoint Data Protection Officer (DPO) and register DPO contact info with Accounting and Corporate Regulatory Authority (ACRA).',
        'Deploy 72-hour mandatory data breach notification workflow for significant harm incidents.',
        'Ensure consent is obtained prior to data collection with clear notification of purpose.',
      ],
      mandatoryNotices: 'Singapore PDPC-Compliant Privacy Policy & DPO Registration',
    },
  ]);

  // Jurisdiction definitions for tabs & filters
  const JURISDICTIONS: { code: JurisdictionRegion; label: string; flag: string; count: number }[] = [
    { code: 'all', label: 'All Jurisdictions', flag: '🌍', count: laws.length },
    { code: 'us_federal', label: 'US Federal', flag: '🇺🇸', count: laws.filter((l) => l.jurisdictionCode === 'us_federal').length },
    { code: 'us_ca', label: 'California', flag: '🌴', count: laws.filter((l) => l.jurisdictionCode === 'us_ca').length },
    { code: 'us_ny', label: 'New York / NYC', flag: '🗽', count: laws.filter((l) => l.jurisdictionCode === 'us_ny').length },
    { code: 'us_il', label: 'Illinois', flag: '🌽', count: laws.filter((l) => l.jurisdictionCode === 'us_il').length },
    { code: 'us_tx', label: 'Texas', flag: '🤠', count: laws.filter((l) => l.jurisdictionCode === 'us_tx').length },
    { code: 'us_other_states', label: 'CO & WA States', flag: '🏔️', count: laws.filter((l) => l.jurisdictionCode === 'us_other_states').length },
    { code: 'eu', label: 'European Union', flag: '🇪🇺', count: laws.filter((l) => l.jurisdictionCode === 'eu').length },
    { code: 'uk', label: 'United Kingdom', flag: '🇬🇧', count: laws.filter((l) => l.jurisdictionCode === 'uk').length },
    { code: 'canada', label: 'Canada', flag: '🍁', count: laws.filter((l) => l.jurisdictionCode === 'canada').length },
    { code: 'australia', label: 'Australia', flag: '🇦🇺', count: laws.filter((l) => l.jurisdictionCode === 'australia').length },
    { code: 'apac', label: 'Singapore & APAC', flag: '🇸🇬', count: laws.filter((l) => l.jurisdictionCode === 'apac').length },
  ];

  const CATEGORIES = [
    { id: 'all', label: 'All Subjects' },
    { id: 'Privacy & Data Rights', label: 'Privacy & Data Rights' },
    { id: 'Employment & Labor', label: 'Employment & Wage/Hour' },
    { id: 'AI & Automated Decisions', label: 'AI & Algorithms' },
    { id: 'Corporate Governance & BOI', label: 'Governance & BOI' },
    { id: 'Workplace Safety & Health', label: 'Workplace Safety & OSHA' },
    { id: 'ESG & Whistleblower', label: 'ESG & Whistleblower' },
  ];

  // Toggle footprint regions
  const handleToggleFootprint = (code: JurisdictionRegion) => {
    setActiveFootprint((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  // Filtered Laws
  const filteredLaws = useMemo(() => {
    return laws.filter((law) => {
      const matchesRegion = selectedRegion === 'all' || law.jurisdictionCode === selectedRegion;
      const matchesCategory = selectedCategory === 'all' || law.category === selectedCategory;
      const matchesSearch =
        searchQuery === '' ||
        law.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.statutoryReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.regulatoryBody.toLowerCase().includes(searchQuery.toLowerCase()) ||
        law.summary.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesRegion && matchesCategory && matchesSearch;
    });
  }, [laws, selectedRegion, selectedCategory, searchQuery]);

  // Coverage statistics for active company footprint
  const footprintLaws = useMemo(() => {
    return laws.filter((l) => activeFootprint.includes(l.jurisdictionCode));
  }, [laws, activeFootprint]);

  const compliantInFootprint = footprintLaws.filter((l) => l.status === 'compliant').length;
  const footprintReadiness = footprintLaws.length > 0 ? Math.round((compliantInFootprint / footprintLaws.length) * 100) : 100;

  const handleUpdateStatus = (id: string, newStatus: 'compliant' | 'in_progress' | 'action_needed') => {
    setLaws((prev) =>
      prev.map((law) => (law.id === id ? { ...law, status: newStatus } : law))
    );
    if (activeLawModal && activeLawModal.id === id) {
      setActiveLawModal((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  const handleExportCSV = () => {
    const headers = [
      'ID',
      'Law Name',
      'Jurisdiction',
      'Category',
      'Statutory Citation',
      'Regulatory Authority',
      'Status',
      'Penalty Risk',
      'Summary',
    ];
    const rows = filteredLaws.map((l) => [
      `"${l.id}"`,
      `"${l.name.replace(/"/g, '""')}"`,
      `"${l.jurisdiction}"`,
      `"${l.category}"`,
      `"${l.statutoryReference}"`,
      `"${l.regulatoryBody}"`,
      `"${l.status.toUpperCase()}"`,
      `"${l.penaltyRisk.replace(/"/g, '""')}"`,
      `"${l.summary.replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `1-compliance_global_statutory_laws_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* ========================================================================= */}
      {/* 1. GLOBAL MULTI-JURISDICTION HEADER BANNER                                */}
      {/* ========================================================================= */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 border-2 border-indigo-400/50 shadow-2xl text-white relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-cyan-500/10 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/40 text-indigo-300 text-xs font-mono font-bold">
              <span>🌍 Global & Multi-State Legal Conformance Engine</span>
              <span>•</span>
              <span>Universal Enterprise Architecture</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Multi-Jurisdiction Regulatory & Statutory Laws
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              1-Compliance OS is built to adapt across state lines and international borders. Whether your company is in <strong>New York, California, Texas, Illinois, the European Union, the United Kingdom, Canada, Australia, or Singapore</strong>, this hub tracks your statutory obligations across employment standards, consumer privacy, AI governance, and corporate transparency.
            </p>
          </div>

          {/* Active Company Footprint Readiness Widget */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border border-indigo-400/40 shrink-0 text-center min-w-[220px]">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-extrabold mb-1">
              Your Active Footprint
            </div>
            <div className="text-3xl font-black text-cyan-400">
              {footprintReadiness}%
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 mt-2 overflow-hidden">
              <div
                className="bg-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${footprintReadiness}%` }}
              />
            </div>
            <div className="text-[10px] text-slate-400 mt-2 font-mono">
              {compliantInFootprint} of {footprintLaws.length} mandates in compliance
            </div>
            <button
              onClick={handleExportCSV}
              className="mt-3 w-full py-1.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-[10px] font-bold transition-colors cursor-pointer shadow-xs"
            >
              📥 Export Statutory Ledger (.CSV)
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ACTIVE COMPANY FOOTPRINT CONFIGURATOR                                   */}
      {/* ========================================================================= */}
      <div className="p-5 rounded-2xl bg-white border-2 border-indigo-200 shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-black text-slate-950 flex items-center gap-2">
              <span>🗺️ Configure Your Company Operating Footprint</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900 font-black">
                {activeFootprint.length} Active Regions
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Click to toggle the jurisdictions where your business operates, employs remote staff, or serves consumers:
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveFootprint(JURISDICTIONS.filter((j) => j.code !== 'all').map((j) => j.code))}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold transition-colors"
            >
              Select All
            </button>
            <button
              onClick={() => setActiveFootprint(['us_federal'])}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold transition-colors"
            >
              Reset to US Fed
            </button>
          </div>
        </div>

        {/* Footprint Toggle Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {JURISDICTIONS.filter((j) => j.code !== 'all').map((j) => {
            const isActive = activeFootprint.includes(j.code);
            return (
              <button
                key={j.code}
                onClick={() => handleToggleFootprint(j.code)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs ${
                  isActive
                    ? 'bg-indigo-600 text-white border-2 border-indigo-700 ring-2 ring-indigo-300/40'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200 opacity-60'
                }`}
              >
                <span>{j.flag}</span>
                <span>{j.label}</span>
                <span
                  className={`text-[9px] font-mono px-1 rounded ${
                    isActive ? 'bg-indigo-800 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {j.count}
                </span>
                {isActive ? <span>✓</span> : <span>+</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MULTI-JURISDICTION FILTER BAR & SEARCH                                 */}
      {/* ========================================================================= */}
      <div className="space-y-4">
        {/* Jurisdiction Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
          {JURISDICTIONS.map((j) => {
            const isSelected = selectedRegion === j.code;
            return (
              <button
                key={j.code}
                onClick={() => setSelectedRegion(j.code)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap shadow-xs ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-indigo-500/25 scale-102'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{j.flag}</span>
                <span>{j.label}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    isSelected ? 'bg-indigo-950/60 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {j.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category & Search Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-3.5 rounded-2xl bg-white border-2 border-indigo-100 shadow-sm">
          {/* Subject Category Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-cyan-300 font-black'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative shrink-0 md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search laws, citations (e.g. BIPA, LL144, GDPR)..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
            <span className="absolute left-3 top-2 text-slate-400 text-xs">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. STATUTORY MANDATES MATRIX GRID                                         */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredLaws.map((law) => {
          const isFootprintActive = activeFootprint.includes(law.jurisdictionCode);
          return (
            <div
              key={law.id}
              className={`p-5 rounded-3xl bg-white border-2 transition-all flex flex-col justify-between shadow-md hover:shadow-xl relative ${
                isFootprintActive
                  ? 'border-indigo-200 ring-1 ring-indigo-500/20'
                  : 'border-slate-200 opacity-90'
              }`}
            >
              <div>
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base">{law.regionFlag}</span>
                    <span className="text-[11px] font-mono font-bold text-slate-700">
                      {law.jurisdiction}
                    </span>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black border ${
                      law.status === 'compliant'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : law.status === 'in_progress'
                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                        : 'bg-rose-50 text-rose-800 border-rose-300'
                    }`}
                  >
                    {law.status === 'compliant'
                      ? '✓ Compliant'
                      : law.status === 'in_progress'
                      ? '⏳ In Progress'
                      : '⚠️ Action Needed'}
                  </span>
                </div>

                {/* Law Title */}
                <h3 className="text-base font-black text-slate-950 mb-1 leading-snug">
                  {law.name}
                </h3>

                {/* Statutory Citation & Regulatory Body */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 mb-3 text-[11px]">
                  <div className="flex items-center gap-1.5 text-indigo-900 font-mono font-bold truncate">
                    <span>📜</span>
                    <span className="truncate">{law.statutoryReference}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-600 truncate">
                    <span>🏛️</span>
                    <span className="truncate">{law.regulatoryBody}</span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-xs text-slate-600 line-clamp-3 mb-3 leading-relaxed">
                  {law.summary}
                </p>

                {/* Penalty Risk Callout */}
                <div className="p-2 rounded-xl bg-rose-50/80 border border-rose-200 text-[11px] text-rose-900 space-y-0.5 mb-4">
                  <div className="font-bold flex items-center gap-1">
                    <span>⚠️</span>
                    <span>Statutory Penalty Risk:</span>
                  </div>
                  <div className="font-mono text-[10px] leading-tight text-rose-950">
                    {law.penaltyRisk}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setActiveLawModal(law)}
                  className="w-full py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>View Remediation Checklist & Notice</span>
                  <span>→</span>
                </button>

                <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 font-mono">
                  <span>Mark status:</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleUpdateStatus(law.id, 'compliant')}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        law.status === 'compliant'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 hover:bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      Compliant
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(law.id, 'in_progress')}
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        law.status === 'in_progress'
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-100 hover:bg-amber-100 text-amber-800'
                      }`}
                    >
                      In Progress
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 5. STATUTORY DETAIL MODAL (REMEDIATION & MANDATORY NOTICE)                */}
      {/* ========================================================================= */}
      {activeLawModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl border-2 border-indigo-200 max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{activeLawModal.regionFlag}</span>
                  <span className="text-xs font-mono font-bold text-slate-600 uppercase">
                    {activeLawModal.jurisdiction} · {activeLawModal.category}
                  </span>
                </div>
                <h2 className="text-xl font-black text-slate-950 leading-tight">
                  {activeLawModal.name}
                </h2>
              </div>
              <button
                onClick={() => setActiveLawModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm shrink-0"
              >
                ✕
              </button>
            </div>

            {/* Statutory Details Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-500 text-[10px] font-mono uppercase">Statutory Citation</div>
                <div className="font-bold text-slate-900 mt-0.5">{activeLawModal.statutoryReference}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <div className="font-bold text-slate-500 text-[10px] font-mono uppercase">Regulatory Body</div>
                <div className="font-bold text-slate-900 mt-0.5">{activeLawModal.regulatoryBody}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 sm:col-span-2">
                <div className="font-bold text-slate-500 text-[10px] font-mono uppercase">Who Must Comply (Applicability)</div>
                <div className="text-slate-800 mt-0.5">{activeLawModal.applicability}</div>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 sm:col-span-2">
                <div className="font-bold text-rose-800 text-[10px] font-mono uppercase">Financial & Legal Sanctions</div>
                <div className="font-bold text-rose-950 mt-0.5">{activeLawModal.penaltyRisk}</div>
              </div>
            </div>

            {/* Summary */}
            <div>
              <h4 className="text-xs font-mono uppercase font-black text-slate-700 mb-1.5">
                Executive Legal Summary
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100">
                {activeLawModal.summary}
              </p>
            </div>

            {/* Remediation Steps Checklist */}
            <div>
              <h4 className="text-xs font-mono uppercase font-black text-slate-700 mb-2">
                Statutory Conformance Action Steps
              </h4>
              <div className="space-y-2">
                {activeLawModal.remediationSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3 text-xs"
                  >
                    <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-900 font-mono font-bold flex items-center justify-center shrink-0 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="text-slate-800">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mandatory Notice */}
            {activeLawModal.mandatoryNotices && (
              <div className="p-4 rounded-2xl bg-cyan-50 border border-cyan-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">📄</span>
                    <span className="font-bold text-xs text-cyan-950">
                      Mandatory Disclosure Document: {activeLawModal.mandatoryNotices}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-200 text-cyan-900 text-[10px] font-mono font-black">
                    Audit Ready
                  </span>
                </div>
                <p className="text-[11px] text-cyan-800">
                  This statutory disclosure has been synthesized directly into the 1-Compliance Employee Handbook and Audit Package.
                </p>
              </div>
            )}

            {/* Modal Footer Controls */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-bold">Update Status:</span>
                <button
                  onClick={() => handleUpdateStatus(activeLawModal.id, 'compliant')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                    activeLawModal.status === 'compliant'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                  }`}
                >
                  ✓ Mark Compliant
                </button>
                <button
                  onClick={() => handleUpdateStatus(activeLawModal.id, 'in_progress')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold ${
                    activeLawModal.status === 'in_progress'
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  ⏳ Mark In Progress
                </button>
              </div>

              <button
                onClick={() => setActiveLawModal(null)}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
