import React, { useState } from 'react';
import { CompanyBrandingConfig } from '../types/compliance';

interface EmployeeHandbookSynthesizerProps {
  branding?: CompanyBrandingConfig;
  onOpenSentinelHub?: (sentinelId?: string) => void;
  onNavigateTab?: (tab: string) => void;
}

interface HandbookChapter {
  id: string;
  number: number;
  title: string;
  category: 'Legal Mandatory' | 'Employment Law' | 'Security & IT' | 'Workplace Conduct' | 'Local Law';
  mandatoryLawCitation: string;
  summary: string;
  content: string;
  isCustomized: boolean;
}

export const EmployeeHandbookSynthesizer: React.FC<EmployeeHandbookSynthesizerProps> = ({
  branding,
  onOpenSentinelHub,
  onNavigateTab,
}) => {
  const companyName = branding?.companyName || '1-Compliance';
  const companyDomain = branding?.corporateDomain || '1-compliance.com';

  // State: Tab view (Handbook Reader / Customizer / Upload Enhancer / Signatures / Multi-State Addenda)
  const [activeSubTab, setActiveSubTab] = useState<'reader' | 'synthesizer' | 'signatures' | 'multi_state_addenda'>('reader');
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ch1');
  const [searchQuery, setSearchQuery] = useState('');

  // Upload & Synthesizer State
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesisProgress, setSynthesisProgress] = useState(0);
  const [synthesisSuccess, setSynthesisSuccess] = useState(false);
  const [customPolicyInput, setCustomPolicyInput] = useState('');

  // Digital Sign-Off State
  const [employeeSignName, setEmployeeSignName] = useState('');
  const [employeeSignEmail, setEmployeeSignEmail] = useState('');
  const [hasAgreedTerms, setHasAgreedTerms] = useState(false);
  const [signedRecords, setSignedRecords] = useState<{ id: string; name: string; email: string; date: string; hash: string }[]>([
    { id: 'sig-01', name: 'Sarah Chen', email: `sarah.c@${companyDomain}`, date: '2026-10-15 09:30 AM', hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
    { id: 'sig-02', name: 'Marcus Vance', email: `marcus.v@${companyDomain}`, date: '2026-10-18 02:14 PM', hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4' },
    { id: 'sig-03', name: 'Elena Rostova', email: `elena.r@${companyDomain}`, date: '2026-10-22 11:05 AM', hash: 'a1b2c3d4e5f60718293a4b5c6d7e8f90123456789abcdef0123456789abcdef0' },
  ]);
  const [signSuccessNotice, setSignSuccessNotice] = useState(false);

  // Master 10-Chapter Compliance-Enhanced Handbook
  const [chapters, setChapters] = useState<HandbookChapter[]>([
    {
      id: 'ch1',
      number: 1,
      title: 'Welcome & At-Will Employment Relationship',
      category: 'Legal Mandatory',
      mandatoryLawCitation: 'Common Law Doctrine & Federal At-Will Framework',
      summary: 'Establishes the voluntary nature of employment, disclaims implied contracts, and sets organizational purpose.',
      content: `1.1 WELCOME TO ${companyName.toUpperCase()}
Welcome to our team! We are thrilled to have you with us. This Employee Handbook outlines the core workplace policies, standards, and compliance obligations that govern our operations.

1.2 AT-WILL EMPLOYMENT DOCTRINE
Employment with ${companyName} is on an "at-will" basis. This means that either you or ${companyName} may terminate the employment relationship at any time, for any lawful reason or no reason, with or without prior notice or cause. Nothing in this handbook, in company communications, or during interviews creates an expressed or implied contract of continued employment.

1.3 POLICY PURPOSE & MODIFICATIONS
This Handbook supersedes all prior unwritten practices and verbal assurances. ${companyName} reserves the right to amend, supplement, or rescind any policy at its sole discretion upon written notice to team members.`,
      isCustomized: true,
    },
    {
      id: 'ch2',
      number: 2,
      title: 'Equal Employment Opportunity (EEO) & Anti-Discrimination',
      category: 'Legal Mandatory',
      mandatoryLawCitation: 'Title VII of the Civil Rights Act of 1964; ADEA; ADA; NYC Human Rights Law',
      summary: 'Strict zero-tolerance policy against discrimination based on race, color, religion, sex, age, disability, or local protected categories.',
      content: `2.1 COMMITMENT TO EQUAL OPPORTUNITY
${companyName} is an Equal Opportunity Employer. We recruit, hire, train, promote, and compensate employees without regard to race, creed, color, religion, national origin, sex, gender identity or expression, sexual orientation, age, mental or physical disability, pregnancy, marital status, military or veteran status, genetic information, or any other characteristic protected by federal, state, or municipal law.

2.2 LOCAL JURISDICTION PROTECTIONS (NYC & REGIONAL EXTENSIONS)
In compliance with the New York City Human Rights Law (NYCHRL) and applicable state laws, our non-discrimination standards explicitly protect:
• Arrest and conviction records (Fair Chance Act / "Ban the Box")
• Caregiver status and family responsibilities
• Credit history in non-exempt hiring decisions
• Salary history inquiry prohibitions
• Protective hairstyles and cultural grooming traits (CROWN Act)

2.3 REASONABLE ACCOMMODATIONS
${companyName} actively participates in an interactive dialogue to provide reasonable accommodations for qualified individuals with disabilities, pregnant employees (Pregnant Workers Fairness Act), and for sincerely held religious beliefs, provided such accommodations do not impose undue hardship on operations.`,
      isCustomized: true,
    },
    {
      id: 'ch3',
      number: 3,
      title: 'Anti-Harassment, Discrimination & Sexual Harassment Prevention',
      category: 'Legal Mandatory',
      mandatoryLawCitation: 'NYS Labor Law § 201-g; NYC Admin. Code § 8-107.13; EEOC Guidelines',
      summary: 'Mandatory annual training, complaint investigation procedures, whistleblower confidentiality, and strict non-retaliation protections.',
      content: `3.1 SEXUAL HARASSMENT PREVENTION POLICY
Sexual harassment and all forms of unlawful harassment are strictly prohibited at ${companyName}. Every employee is entitled to a safe workplace free from unwelcome sexual advances, requests for sexual favors, or visual/verbal conduct that creates an intimidating or hostile work environment.

3.2 WHAT CONSTITUTES PROHIBITED CONDUCT
Harassment includes conduct that subjects an individual to inferior terms, conditions, or privileges of employment based on protected status. This applies in the office, during business travel, at work-related social events, and over electronic communications (Slack, Zoom, email).

3.3 REPORTING & INVESTIGATION PROCEDURE
If you experience or witness harassment or discrimination:
1. Immediately report the conduct to your direct manager, People Operations, or via our Confidential Compliance Hotline (compliance@${companyDomain}).
2. Reports may be verbal or submitted via our Confidential Complaint Form.
3. ${companyName} conducts prompt, thorough, and confidential investigations of all reported matters.

3.4 ABSOLUTE NON-RETALIATION PLEDGE
Federal and New York State law strictly prohibit retaliation against any individual who reports discrimination or assists in an investigation. Any employee found to have engaged in retaliatory behavior will face immediate disciplinary action up to and including termination.`,
      isCustomized: true,
    },
    {
      id: 'ch4',
      number: 4,
      title: 'Hours of Work, Overtime, Timekeeping & Pay Practices',
      category: 'Employment Law',
      mandatoryLawCitation: 'Fair Labor Standards Act (FLSA); NYS Wage Theft Prevention Act (WTPA)',
      summary: 'Worker classification (exempt vs. non-exempt), accurate time recording, meal and rest periods, and overtime compensation rules.',
      content: `4.1 EMPLOYEE CLASSIFICATION (FLSA & STATE LAW)
All employees are designated as either "Exempt" or "Non-Exempt" in accordance with the Fair Labor Standards Act and applicable state wage orders:
• Non-Exempt Employees: Entitled to statutory overtime pay (1.5x regular rate of pay) for all hours worked exceeding 40 hours in a defined workweek.
• Exempt Employees: Hold bona fide executive, administrative, professional, or computer specialist roles meeting statutory salary threshold tests.

4.2 STRICT ACCURATE TIMEKEEPING
Non-exempt employees must accurately log all hours worked via our approved timekeeping system. Working "off-the-clock" is strictly prohibited. Managers may not authorize or permit unrecorded work.

4.3 MEAL AND REST PERIODS
Non-exempt employees working shifts of six (6) hours or more are provided an uninterrupted, unpaid meal period of at least 30 to 60 minutes in compliance with state statutory scheduling orders.

4.4 PAYDAY & WAGE STATEMENTS (WTPA COMPLIANCE)
Wages are paid semi-monthly. With every paycheck, employees receive a comprehensive itemized wage statement detailing gross wages, hourly rates, overtime hours, and all legally mandated tax and benefit deductions.`,
      isCustomized: true,
    },
    {
      id: 'ch5',
      number: 5,
      title: 'Paid Safe and Sick Leave, Family Leave & Time Off',
      category: 'Local Law',
      mandatoryLawCitation: 'NYC Earned Safe and Sick Time Act (ESSTA); NYS Paid Family Leave (PFL); FMLA',
      summary: 'Accrual rates for safe and sick leave, permissible use for medical and domestic safety needs, and paid family leave entitlements.',
      content: `5.1 EARNED SAFE AND SICK TIME (NYC ESSTA & NYS SICK LEAVE)
${companyName} complies fully with the NYC Earned Safe and Sick Time Act and applicable state leave statutes:
• Accrual Rate: Employees accrue one (1) hour of paid safe and sick leave for every 30 hours worked, up to a minimum of 40 to 56 hours per calendar year based on organizational headcount.
• Permissible Sick Use: Personal mental or physical illness, medical appointments, diagnosis, care of family members (children, spouses, parents, siblings, domestic partners).
• Permissible Safe Leave Use: Legal, housing, medical, or counseling services related to domestic violence, stalking, sexual assault, or human trafficking.

5.2 NO ADVANCE DOCUMENTATION FOR BRIEF ABSENCES
Under NYC law, employers cannot require medical documentation unless the employee has been absent for more than three (3) consecutive scheduled workdays.

5.3 PAID FAMILY LEAVE (PFL) & FMLA
Eligible employees may take job-protected paid leave to bond with a newborn, adopted, or fostered child, care for a close family member with a serious health condition, or assist when a family member is deployed abroad on active military duty.`,
      isCustomized: true,
    },
    {
      id: 'ch6',
      number: 6,
      title: 'Electronic Monitoring & Digital Communications Disclosure',
      category: 'Security & IT',
      mandatoryLawCitation: 'NYS Civil Rights Law § 52-c; SOC 2 CC6.1; Wiretap & Electronic Privacy Laws',
      summary: 'Mandatory statutory notification regarding employer monitoring of emails, internet traffic, corporate devices, and digital assets.',
      content: `6.1 MANDATORY NOTICE OF ELECTRONIC MONITORING (NYS CRL § 52-c)
Pursuant to New York State Civil Rights Law § 52-c and corporate security compliance standards, all employees are hereby formally advised that:
"Any and all telephone conversations or transmissions, radio or television transmissions, electronic mail or transmissions, or internet access or usage by an employee by any electronic device or system, including but not limited to the use of a computer, telephone, wire, radio or electromagnetic, photoelectronic or photo-optical systems may be subject to monitoring at any and all times and by any lawful means."

6.2 ACCEPTABLE USE & DEVICE INTEGRITY
Company-provided laptops, email accounts, and communication channels (Slack, Google Workspace, GitHub) are business assets provided for business purposes. Employees must not use company equipment to engage in illegal activity, intellectual property infringement, or transmitting defamatory materials.

6.3 ENCRYPTION & DATA SECURITY (SOC 2 & ISO 27001)
All laptops and mobile endpoints connecting to ${companyName} networks must have full-disk encryption (FileVault / BitLocker) active, screen lock set to 5 minutes, and Multi-Factor Authentication (MFA) enabled.`,
      isCustomized: true,
    },
    {
      id: 'ch7',
      number: 7,
      title: 'Remote Work, Telecommuting & Mobile Endpoint Security',
      category: 'Security & IT',
      mandatoryLawCitation: 'SOC 2 CC6.6; ISO 27001 A.6.2; NIST SP 800-46',
      summary: 'Requirements for home office network security, public Wi-Fi prohibitions, confidential document disposal, and expense reimbursement.',
      content: `7.1 ELIGIBILITY & WORKPLACE STANDARDS
Remote employees are expected to maintain the same high productivity, availability, and adherence to timekeeping rules as in-office personnel.

7.2 SECURE HOME ENVIRONMENT
When working remotely:
• Public Wi-Fi Warning: Never connect corporate laptops to open, password-free Wi-Fi without an active company VPN.
• Screen Privacy: Keep client files and confidential data shielded from non-employee household members and visitors.
• Device Exclusivity: Family members and third parties are strictly prohibited from using corporate devices.

7.3 LOSS OR THEFT REPORTING (1-HOUR SLA)
If any corporate device or storage media is lost, stolen, or suspected of compromise, the employee must report the incident to IT Sentinel (it-security@${companyDomain}) within one (1) hour so remote wipe commands can be executed.`,
      isCustomized: true,
    },
    {
      id: 'ch8',
      number: 8,
      title: 'Workplace Safety, Hazard Communication & Emergency Protocols',
      category: 'Legal Mandatory',
      mandatoryLawCitation: 'OSHA 29 U.S.C. § 654 (General Duty Clause); Local Fire & Building Codes',
      summary: 'Occupational safety standards, ergonomic health, emergency evacuation procedures, and immediate injury reporting.',
      content: `8.1 SAFETY AS A CORE PRIORITY
${companyName} is committed to maintaining clean, healthy, and hazard-free facilities. In compliance with the Occupational Safety and Health Act (OSHA), all employees must follow safety guidelines, operate equipment responsibly, and report potential hazards immediately.

8.2 INJURY & ACCIDENT REPORTING (WORKERS COMPENSATION)
Any workplace accident, injury, or occupational illness—regardless of how minor—must be reported to your supervisor and HR within 24 hours to ensure immediate medical care and proper workers' compensation documentation.

8.3 EMERGENCY EVACUATION & FACILITY SAFETY
Familiarize yourself with emergency exits, fire extinguishers, and first-aid kits in your work area. In the event of fire, severe weather, or facility emergencies, follow designated evacuation routes and assemble at the designated emergency muster point.`,
      isCustomized: true,
    },
    {
      id: 'ch9',
      number: 9,
      title: 'Confidentiality, Intellectual Property & Non-Disclosure',
      category: 'Workplace Conduct',
      mandatoryLawCitation: 'Defend Trade Secrets Act (DTSA); Uniform Trade Secrets Act (UTSA); GDPR Art. 28',
      summary: 'Protection of proprietary code, customer lists, trade secrets, work-for-hire assignments, and Defend Trade Secrets Act statutory notice.',
      content: `9.1 PROPRIETARY & CONFIDENTIAL INFORMATION
During your employment, you may access proprietary business information, client records, source code, financial data, and strategic roadmaps. You agree to hold all such information in strict confidence and not disclose it to any unauthorized third party during or after employment.

9.2 INVENTIONS & WORK-FOR-HIRE
All intellectual property, software code, processes, documentation, and inventions conceived or developed during your employment that relate to ${companyName}'s business are the sole property of ${companyName} as "work made for hire."

9.3 STATUTORY IMMUNITY UNDER DEFEND TRADE SECRETS ACT (DTSA)
Notice is hereby provided that under 18 U.S.C. § 1833(b), an individual shall not be held criminally or civilly liable under any federal or state trade secret law for the disclosure of a trade secret that is made in confidence to a government official or attorney solely for the purpose of reporting or investigating a suspected violation of law.`,
      isCustomized: true,
    },
    {
      id: 'ch10',
      number: 10,
      title: 'Employee Acknowledgment & Digital Sign-Off Form',
      category: 'Legal Mandatory',
      mandatoryLawCitation: 'Federal ESIGN Act; UETA; SOC 2 CC2.2; NYS WTPA Verification',
      summary: 'Legally binding digital signature verifying that the employee has read, understands, and agrees to comply with the Employee Handbook.',
      content: `10.1 ANNUAL MANDATORY ACKNOWLEDGMENT
Every employee of ${companyName} must review and execute this acknowledgment upon hire and annually thereafter.

EMPLOYEE RECEIPT & ACKNOWLEDGMENT PLEDGE:
"I hereby acknowledge that I have received, read, and understand the ${companyName} Employee Handbook. I understand that:
1. My employment is at-will and may be terminated by either party at any time.
2. I am subject to electronic monitoring in accordance with NYS Civil Rights Law § 52-c.
3. I have read the Sexual Harassment Prevention Policy and understand how to report incidents.
4. I agree to safeguard all confidential information and adhere to corporate cybersecurity and acceptable use policies."

Executed digitally with audit-ready timestamp and verification hash.`,
      isCustomized: true,
    },
  ]);

  interface StateAddendum {
    id: string;
    regionName: string;
    flag: string;
    title: string;
    statutoryCitations: string;
    summary: string;
    content: string;
    isAttached: boolean;
  }

  const [stateAddenda, setStateAddenda] = useState<StateAddendum[]>([
    {
      id: 'add-ca',
      regionName: 'California',
      flag: '🌴',
      title: 'California State Employment & Workplace Addendum',
      statutoryCitations: 'Cal. Labor Code § 6401.9 (SB 553 WVPP); Cal. Labor Code § 245 (SB 616); CCPA / CPRA; 8 CCR § 3395',
      summary: 'Mandatory Workplace Violence Prevention Plan (WVPP), 40 hours/5 days annual paid sick leave, Cal/OSHA heat illness, and CCPA personnel privacy disclosures.',
      isAttached: false,
      content: `CALIFORNIA STATE COMPLIANCE ADDENDUM FOR ${companyName.toUpperCase()}
This Addendum applies to all ${companyName} employees residing in or physically performing work in the State of California.

1. WORKPLACE VIOLENCE PREVENTION PLAN (WVPP - SB 553 / CAL. LABOR CODE § 6401.9)
${companyName} maintains a site-specific written Workplace Violence Prevention Plan. Employees have the right to report workplace violence, threats, or concerning behavior without fear of retaliation. All reported incidents are recorded in our confidential Violent Incident Log. Annual interactive training is mandatory for all California personnel.

2. EXPANDED PAID SICK LEAVE (SB 616 / CAL. LABOR CODE § 245)
California employees receive five (5) days (40 hours) of paid sick leave per 12-month period. Sick leave accrues at the rate of at least 1 hour for every 30 hours worked. Sick leave may be used for diagnosis, care, or treatment of an existing health condition or preventive care for the employee or their designated family members, or for victims of domestic violence or sexual assault.

3. MEAL & REST BREAK STATUTORY PREMIUMS (CAL. LABOR CODE § 226.7)
Non-exempt California employees are provided an uninterrupted 30-minute unpaid meal break for shifts over 5 hours, and a 10-minute paid rest period for every 4 hours worked. If ${companyName} fails to provide an authorized break, the employee receives one additional hour of pay at their regular rate as a statutory premium.

4. CALIFORNIA CONSUMER PRIVACY ACT (CCPA / CPRA) NOTICE TO PERSONNEL
Pursuant to the CCPA/CPRA, California employees and applicants have the right to know the categories of personal information collected, the business purpose for collection, and the right to request deletion or correction of inaccurate personal data.`
    },
    {
      id: 'add-ny',
      regionName: 'New York & NYC',
      flag: '🗽',
      title: 'New York State & New York City Statutory Addendum',
      statutoryCitations: 'NYC Admin. Code Title 20, Ch. 8 (ESSTA); NYS Civil Rights Law § 52-c; NYS Labor Law § 201-g',
      summary: 'NYC Earned Safe & Sick Time (up to 56 hours), electronic monitoring notice, and NYS model sexual harassment prevention policy.',
      isAttached: false,
      content: `NEW YORK STATE & NYC COMPLIANCE ADDENDUM FOR ${companyName.toUpperCase()}
This Addendum applies to all employees operating in New York State and New York City.

1. EARNED SAFE AND SICK TIME ACT (ESSTA)
Employees accrue up to 56 hours of paid safe/sick leave per calendar year (accruing 1 hour per 30 hours worked). Leave may be used for physical/mental health care and domestic safe time needs. Retaliation is strictly prohibited by NYC DCWP.

2. NOTICE OF EMPLOYEE ELECTRONIC MONITORING (NYS CRL § 52-c)
All telephone conversations, emails, and internet access on corporate networks or equipment are subject to monitoring at all times by any lawful means.

3. MODEL SEXUAL HARASSMENT PREVENTION POLICY (NYS LABOR LAW § 201-g)
${companyName} complies with the New York State model sexual harassment prevention policy. Interactive training is mandated annually for all staff, with direct complaint channels to the NYS Division of Human Rights.`
    },
    {
      id: 'add-il',
      regionName: 'Illinois',
      flag: '🌽',
      title: 'Illinois State Statutory Addendum',
      statutoryCitations: '740 ILCS 14/ (BIPA); 820 ILCS 192/ (PLAWA); 820 ILCS 42/ (AI Video Interview Act)',
      summary: 'Biometric Information Privacy Act (BIPA) consent & retention rules, Paid Leave for All Workers (PLAWA 40 hours for ANY reason), and AI interview transparency.',
      isAttached: false,
      content: `ILLINOIS STATE COMPLIANCE ADDENDUM FOR ${companyName.toUpperCase()}
This Addendum applies to all employees operating in the State of Illinois.

1. BIOMETRIC INFORMATION PRIVACY ACT (BIPA - 740 ILCS 14/)
${companyName} does not collect, capture, purchase, or store biometric identifiers (fingerprints, retina scans, facial geometry) without prior written informed consent and a publicly posted retention schedule. Biometric data is never sold or traded.

2. PAID LEAVE FOR ALL WORKERS ACT (PLAWA - 820 ILCS 192/)
Illinois employees earn up to 40 hours of paid leave per year. Crucially, under Illinois law, employees may use this leave for ANY purpose without providing documentation, justification, or finding a replacement worker.

3. ARTIFICIAL INTELLIGENCE VIDEO INTERVIEW ACT (820 ILCS 42/)
If AI is used to analyze candidate video submissions, applicants receive advance written disclosure of AI scoring metrics, provide explicit consent, and retain the right to have all recordings permanently purged within 30 days.`
    },
    {
      id: 'add-tx',
      regionName: 'Texas',
      flag: '🤠',
      title: 'Texas State Employment & Payday Addendum',
      statutoryCitations: 'Tex. Labor Code Ann. Ch. 61 (Payday Law); Tex. Labor Code § 21.1095 (CROWN Act); TDPSA',
      summary: 'Texas Payday Law frequency and written payroll deduction authorizations, Texas CROWN Act hairstyle protections, and TDPSA consumer privacy.',
      isAttached: false,
      content: `TEXAS STATE COMPLIANCE ADDENDUM FOR ${companyName.toUpperCase()}
This Addendum applies to all employees operating in the State of Texas.

1. TEXAS PAYDAY LAW & WAGE SCHEDULES (TEX. LABOR CODE CH. 61)
Non-exempt employees in Texas are paid on designated semi-monthly paydays. No deductions are made from wages unless authorized in writing by the employee or required by law or court order.

2. TEXAS CROWN ACT (TEX. LABOR CODE § 21.1095)
${companyName} prohibits discrimination against employees based on hair textures or protective hairstyles historically associated with race, including braids, locks, and twists.

3. TEXAS DATA PRIVACY AND SECURITY ACT (TDPSA)
Texas employees and consumers possess statutory rights to confirm processing, access, correct, and delete personal data held by ${companyName}.`
    },
    {
      id: 'add-eu-uk',
      regionName: 'European Union & United Kingdom',
      flag: '🇪🇺🇬🇧',
      title: 'European Union & United Kingdom International Addendum',
      statutoryCitations: 'Regulation (EU) 2016/679 (GDPR); UK Data Protection Act 2018; Directive (EU) 2019/1937; Working Time Regulations 1998',
      summary: 'GDPR / UK GDPR data subject rights, 48-hour working time limitations, and EU Whistleblowing Directive confidential reporting channels.',
      isAttached: false,
      content: `EUROPEAN UNION & UNITED KINGDOM INTERNATIONAL ADDENDUM
This Addendum applies to personnel employed by or performing services in the EU, EEA, or UK.

1. DATA PROTECTION & EMPLOYEE PRIVACY (GDPR & UK GDPR)
Employees have statutory rights to access personal files (Subject Access Request), request erasure or rectification, and be informed of the legal basis for all HR data processing. Data transfers outside the EEA/UK rely on Standard Contractual Clauses (SCCs) or UK IDTAs.

2. WORKING TIME REGULATIONS & 48-HOUR MAXIMUM
Employees are protected by the maximum 48-hour average work week under the Working Time Directive, unless an individual employee signs a voluntary, written opt-out agreement.

3. WHISTLEBLOWER PROTECTION (DIRECTIVE (EU) 2019/1937)
Employees can report breaches of EU/UK law via our secure, confidential whistleblowing reporting channel with absolute protection against dismissal or adverse treatment.`
    },
    {
      id: 'add-ca-au',
      regionName: 'Canada & Australia',
      flag: '🍁🇦🇺',
      title: 'Canada & Australia International Addendum',
      statutoryCitations: 'Ontario ESA 2000 (Right to Disconnect & Monitoring); Australia Fair Work Act 2009 (Right to Disconnect 2024)',
      summary: 'Statutory Right to Disconnect from after-hours communications in Ontario and Australia, plus electronic monitoring disclosures.',
      isAttached: false,
      content: `CANADA & AUSTRALIA INTERNATIONAL ADDENDUM
This Addendum applies to personnel employed in Canada (including Ontario) and Australia.

1. STATUTORY RIGHT TO DISCONNECT (ONTARIO ESA & AUSTRALIA FAIR WORK ACT)
Employees have the statutory right to disconnect from work-related communications (emails, phone calls, messages) outside of regular working hours. Employees in Australia have a statutory workplace right to refuse to read or respond to employer or client contact after hours, unless the refusal is unreasonable.

2. ELECTRONIC MONITORING POLICY (ONTARIO ESA PART VII.0.2)
${companyName} provides full written transparency regarding the software, tools, and metrics used to monitor employee computer activity, keystrokes, and email transmissions.

3. AUSTRALIAN NATIONAL EMPLOYMENT STANDARDS (NES)
Australian employees are guaranteed 11 minimum National Employment Standards covering maximum weekly hours, flexible working arrangements, and statutory paid annual and personal leave.`
    }
  ]);

  const handleToggleAddendum = (addendumId: string) => {
    setStateAddenda((prev) =>
      prev.map((a) => {
        if (a.id === addendumId) {
          const willAttach = !a.isAttached;
          if (willAttach) {
            const newChapter: HandbookChapter = {
              id: a.id,
              number: chapters.length + 1,
              title: `${a.regionName} Statutory Addendum`,
              category: 'Local Law',
              mandatoryLawCitation: a.statutoryCitations,
              summary: a.summary,
              content: a.content,
              isCustomized: true,
            };
            setChapters((c) => [...c, newChapter]);
          } else {
            setChapters((c) => c.filter((ch) => ch.id !== a.id));
          }
          return { ...a, isAttached: willAttach };
        }
        return a;
      })
    );
  };

  // Handle Upload of Existing Handbook for AI Enhancement
  const handleUploadHandbook = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      setIsSynthesizing(true);
      setSynthesisProgress(10);

      const interval = setInterval(() => {
        setSynthesisProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsSynthesizing(false);
            setSynthesisSuccess(true);
            return 100;
          }
          return prev + 20;
        });
      }, 400);
    }
  };

  // Handle Employee Digital Sign-Off
  const handleExecuteSignOff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeSignName || !employeeSignEmail || !hasAgreedTerms) return;

    const newRecord = {
      id: `sig-${Date.now()}`,
      name: employeeSignName,
      email: employeeSignEmail,
      date: new Date().toLocaleString(),
      hash: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + '8e2b',
    };

    setSignedRecords([newRecord, ...signedRecords]);
    setSignSuccessNotice(true);
    setEmployeeSignName('');
    setEmployeeSignEmail('');
    setHasAgreedTerms(false);
    setTimeout(() => setSignSuccessNotice(false), 4000);
  };

  const selectedChapter = chapters.find((c) => c.id === selectedChapterId) || chapters[0];

  const filteredChapters = chapters.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.mandatoryLawCitation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-[#0b1426] border-2 border-indigo-500/50 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-black bg-indigo-500/20 text-indigo-300 border border-indigo-400/50">
              📖 Module 11: Workplace Governance & Labor Law
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
              Local Laws & Statutory Handbooks
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
              Audit-Ready Sign-Off Tracking
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            {companyName} Employee Manual & Statutory Policy Synthesizer
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Every business must adhere to mandatory <strong>Employment Law</strong>, <strong>Local Law statutes</strong> (e.g., NYC ESSTA, NYS CRL § 52-c Electronic Monitoring, Mandatory Annual Harassment Training), and corporate governance rules. Upload your existing handbook or let 1-Compliance OS synthesize a customized, legally enhanced workplace manual with digital employee sign-offs.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveSubTab('synthesizer')}
              className="px-4 py-2 text-xs font-black text-slate-950 bg-gradient-to-r from-cyan-400 to-indigo-300 hover:opacity-95 rounded-xl transition-all shadow-md cursor-pointer"
            >
              ⚡ Upload & Enhance Existing Handbook
            </button>
            <button
              onClick={() => setActiveSubTab('signatures')}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>✍️ View Sign-Off Log ({signedRecords.length})</span>
            </button>
            <button
              onClick={() => setActiveSubTab('multi_state_addenda')}
              className="px-4 py-2 text-xs font-bold text-amber-300 bg-amber-950/60 hover:bg-amber-900 border border-amber-700/60 rounded-xl transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>🌐 Multi-State & Global Addenda Suite</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex items-center gap-2 border-b border-slate-700 pb-2 overflow-x-auto text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('reader')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'reader'
              ? 'bg-indigo-600 text-white font-black shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span>📖 Active Employee Handbook ({chapters.length} Chapters)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('multi_state_addenda')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'multi_state_addenda'
              ? 'bg-amber-400 text-slate-950 font-black shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span>🌐 Multi-State & Global Addenda (CA, NY, IL, TX, EU, UK, AU)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('synthesizer')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'synthesizer'
              ? 'bg-cyan-500 text-slate-950 font-black shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span>⚡ Upload & Policy Synthesizer Engine</span>
        </button>

        <button
          onClick={() => setActiveSubTab('signatures')}
          className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeSubTab === 'signatures'
              ? 'bg-emerald-500 text-slate-950 font-black shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <span>✍️ Digital Sign-Off & Attestations ({signedRecords.length})</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: HANDBOOK READER & CHAPTER EXPLORER                            */}
      {/* ========================================================================= */}
      {activeSubTab === 'reader' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Chapters Navigation & Search (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search chapters, laws (e.g. sick leave, monitoring)..."
                className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="space-y-1.5 max-h-[720px] overflow-y-auto pr-1">
              {filteredChapters.map((ch) => {
                const isSelected = ch.id === selectedChapterId;
                return (
                  <button
                    key={ch.id}
                    onClick={() => setSelectedChapterId(ch.id)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer flex flex-col gap-1 ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-950 to-slate-900 border-indigo-400 shadow-md text-white'
                        : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                        Chapter {ch.number}
                      </span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-400">
                        {ch.category}
                      </span>
                    </div>
                    <div className="text-xs font-bold leading-tight">
                      {ch.title}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {ch.mandatoryLawCitation}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Active Chapter Content Display (8 Cols) */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-indigo-500/20 text-indigo-300 border border-indigo-400/40">
                    CHAPTER {selectedChapter.number}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-emerald-400 border border-slate-700">
                    {selectedChapter.category}
                  </span>
                </div>
                <h3 className="text-xl font-black text-white mt-2">
                  {selectedChapter.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(selectedChapter.content);
                    alert(`✓ Copied Chapter ${selectedChapter.number} to clipboard!`);
                  }}
                  className="px-3 py-1.5 text-xs font-bold text-slate-300 bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700 transition-colors"
                >
                  📋 Copy Text
                </button>
                <button
                  type="button"
                  onClick={() => setActiveSubTab('signatures')}
                  className="px-3 py-1.5 text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors"
                >
                  ✍️ Sign-Off
                </button>
              </div>
            </div>

            {/* Legal Authority Citation Callout */}
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 space-y-1 text-xs">
              <div className="text-[11px] font-mono font-bold text-indigo-300 uppercase flex items-center gap-1.5">
                <span>🏛️ Statutory Legal Authority & Audit Mapping</span>
              </div>
              <div className="text-white font-semibold">
                {selectedChapter.mandatoryLawCitation}
              </div>
              <div className="text-slate-400 text-[11px]">
                {selectedChapter.summary}
              </div>
            </div>

            {/* Chapter Body Text */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 font-mono text-xs leading-relaxed text-slate-200 whitespace-pre-wrap">
              {selectedChapter.content}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800 text-xs">
              <span className="text-slate-400">
                Conformed for: <strong className="text-white">{companyName}</strong>
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const fullText = chapters.map((c) => `=== CHAPTER ${c.number}: ${c.title} ===\nCitation: ${c.mandatoryLawCitation}\n\n${c.content}\n\n`).join('\n');
                    const blob = new Blob([fullText], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${companyName.replace(/\s+/g, '_')}_Employee_Handbook_2026.txt`;
                    a.click();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
                >
                  <span>📥 Export Complete Manual (.TXT)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: UPLOAD & POLICY SYNTHESIZER ENGINE                             */}
      {/* ========================================================================= */}
      {activeSubTab === 'synthesizer' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-xl">
          <div className="max-w-2xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span>⚡</span>
              <span>Upload Existing Policy Manual & AI Legal Enhancer</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Have an existing company employee manual from previous years? Upload your file or paste your text below. 1-Compliance OS will analyze your current rules, preserve your company culture and specific benefits, and automatically integrate missing mandatory statutory employment and local laws.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upload Box */}
            <div className="p-6 rounded-2xl bg-slate-900 border-2 border-dashed border-indigo-500/50 hover:border-cyan-400 transition-all text-center space-y-4 flex flex-col justify-center items-center">
              <div className="w-14 h-14 rounded-full bg-indigo-950 flex items-center justify-center text-2xl border border-indigo-700">
                📄
              </div>
              <div>
                <div className="text-sm font-bold text-white">Upload Existing Company Manual</div>
                <div className="text-xs text-slate-400 mt-1">Accepts PDF, DOCX, TXT, or Markdown (up to 25MB)</div>
              </div>

              <label className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-400 hover:bg-cyan-300 text-slate-950 cursor-pointer shadow-md transition-all">
                <span>Browse & Select File</span>
                <input
                  type="file"
                  accept=".txt,.pdf,.doc,.docx,.md"
                  onChange={handleUploadHandbook}
                  className="hidden"
                />
              </label>

              {uploadedFileName && (
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
                  Attached: {uploadedFileName}
                </div>
              )}
            </div>

            {/* Paste Text Box */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col">
              <label className="text-xs font-bold text-white block">
                Or Paste Specific Company Rules / Custom Policies:
              </label>
              <textarea
                value={customPolicyInput}
                onChange={(e) => setCustomPolicyInput(e.target.value)}
                placeholder="Paste your specific company rules (e.g. 401(k) matching rules, office dog policy, summer Friday hours, travel expense stipends, specific equity vesting rules)..."
                rows={6}
                className="w-full flex-1 p-3 text-xs rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
              />
              <button
                type="button"
                onClick={() => {
                  if (!customPolicyInput.trim()) {
                    alert('Please paste some company rules or upload a file first.');
                    return;
                  }
                  setIsSynthesizing(true);
                  setSynthesisProgress(15);
                  setTimeout(() => setSynthesisProgress(50), 600);
                  setTimeout(() => setSynthesisProgress(85), 1200);
                  setTimeout(() => {
                    setSynthesisProgress(100);
                    setIsSynthesizing(false);
                    setSynthesisSuccess(true);
                  }, 1800);
                }}
                className="w-full py-2.5 rounded-xl text-xs font-black text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-300 hover:opacity-95 shadow-md cursor-pointer transition-all"
              >
                Synthesize & Inject Mandatory Legal Clauses ➔
              </button>
            </div>
          </div>

          {/* Synthesis Progress Indicator */}
          {isSynthesizing && (
            <div className="p-5 rounded-2xl bg-indigo-950/80 border border-indigo-400 space-y-2 animate-fadeIn">
              <div className="flex items-center justify-between text-xs font-mono text-cyan-300 font-bold">
                <span>Auditing Company Policies for Statutory Deficiencies...</span>
                <span>{synthesisProgress}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${synthesisProgress}%` }}
                />
              </div>
              <div className="text-[11px] text-slate-300 font-mono">
                Injecting: NYS Electronic Monitoring (§ 52-c) · NYC ESSTA Sick & Safe Time · FLSA Overtime Rules · EEO Harassment Defense
              </div>
            </div>
          )}

          {/* Success Callout */}
          {synthesisSuccess && (
            <div className="p-5 rounded-2xl bg-emerald-950/80 border-2 border-emerald-500 space-y-3 animate-fadeIn">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                <span>✓</span>
                <span>Synthesizer Enhancement Complete: 10 Statutory Chapters Ready!</span>
              </div>
              <p className="text-xs text-slate-300">
                1-Compliance OS preserved your company culture and specific benefits while inserting <strong>6 missing statutory compliance clauses</strong> required under federal, New York State, and municipal laws. Your team can now review the finalized manual or send digital sign-off requests.
              </p>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveSubTab('reader')}
                  className="px-4 py-1.5 text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors cursor-pointer"
                >
                  Read Final Enhanced Manual
                </button>
                <button
                  onClick={() => setActiveSubTab('signatures')}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                >
                  Send Employee Sign-Offs
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: DIGITAL SIGN-OFF & ATTESTATION TRACKER                         */}
      {/* ========================================================================= */}
      {activeSubTab === 'signatures' && (
        <div className="space-y-6">
          {/* Sign-Off Execution Form */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-xl">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span>✍️</span>
                <span>Employee Handbook Digital Execution & Acknowledgment</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Auditors and labor regulators require documented proof that every employee has received, read, and acknowledged company policies upon hire and annually. Employees execute their acknowledgment below:
              </p>
            </div>

            {signSuccessNotice && (
              <div className="p-3.5 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-500 text-xs font-bold animate-fadeIn">
                ✓ Acknowledgment Recorded! Digital signature and SHA-256 evidence log archived.
              </div>
            )}

            <form onSubmit={handleExecuteSignOff} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Employee Full Name:
                </label>
                <input
                  type="text"
                  required
                  value={employeeSignName}
                  onChange={(e) => setEmployeeSignName(e.target.value)}
                  placeholder="e.g. Alexandra Morgan"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-300 block mb-1">
                  Company Work Email:
                </label>
                <input
                  type="email"
                  required
                  value={employeeSignEmail}
                  onChange={(e) => setEmployeeSignEmail(e.target.value)}
                  placeholder={`e.g. alex@${companyDomain}`}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="md:col-span-2 pt-1">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300 select-none">
                  <input
                    type="checkbox"
                    required
                    checked={hasAgreedTerms}
                    onChange={(e) => setHasAgreedTerms(e.target.checked)}
                    className="mt-0.5 accent-cyan-400 rounded"
                  />
                  <span>
                    I confirm that I have reviewed the <strong>{companyName} Employee Handbook</strong>, understand the at-will employment relationship, acknowledge electronic monitoring under NYS CRL § 52-c, and agree to uphold all security, harassment prevention, and workplace policies.
                  </span>
                </label>
              </div>

              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-black text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-all shadow-md cursor-pointer"
                >
                  ✍️ Execute Binding Electronic Acknowledgment
                </button>
              </div>
            </form>
          </div>

          {/* Audit Verification Log */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <span>📜</span>
                  <span>Audit-Ready Attestation Ledger (SOC 2 CC2.2 & WTPA Proof)</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Immutable record of completed employee policy sign-offs for auditors, wage boards, and HR compliance.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  const csv = ['Name,Email,Timestamp,SHA256_Evidence_Hash', ...signedRecords.map(r => `"${r.name}","${r.email}","${r.date}","${r.hash}"`)].join('\n');
                  const blob = new Blob([csv], { type: 'text/csv' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Handbook_Attestations_${Date.now()}.csv`;
                  a.click();
                }}
                className="px-3.5 py-1.5 text-xs font-bold text-slate-300 bg-slate-900 hover:bg-slate-850 rounded-lg border border-slate-700 transition-colors cursor-pointer"
              >
                📥 Export Ledger (.CSV)
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-900/80 text-slate-400 font-mono text-[11px] uppercase">
                  <tr>
                    <th className="p-3">Employee Name</th>
                    <th className="p-3">Work Email</th>
                    <th className="p-3">Execution Timestamp</th>
                    <th className="p-3">Audit Hash</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {signedRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">{r.name}</td>
                      <td className="p-3 font-mono text-cyan-300">{r.email}</td>
                      <td className="p-3 font-mono text-slate-400">{r.date}</td>
                      <td className="p-3 font-mono text-[10px] text-slate-500 truncate max-w-[140px]" title={r.hash}>
                        {r.hash.slice(0, 16)}...
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                          ✓ Verified
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: MULTI-STATE & GLOBAL STATUTORY ADDENDA SUITE                   */}
      {/* ========================================================================= */}
      {activeSubTab === 'multi_state_addenda' && (
        <div className="p-6 md:p-8 rounded-3xl bg-slate-950 border border-slate-800 space-y-6 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-mono font-bold mb-2">
                <span>🌐 Multi-Jurisdiction Statutory Addenda</span>
                <span>•</span>
                <span>Ready-To-Adopt Legal Clauses</span>
              </div>
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <span>Multi-State & Global Statutory Addenda Suite</span>
              </h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Companies operating across multiple U.S. states or international borders must attach jurisdiction-specific addenda to their standard employee handbook. Click <strong>"Attach to Active Handbook"</strong> to automatically inject that jurisdiction's mandatory clauses into your company's live employee manual.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-700 text-center shrink-0 min-w-[180px]">
              <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Attached Addenda</div>
              <div className="text-2xl font-black text-amber-400">
                {stateAddenda.filter((a) => a.isAttached).length} of {stateAddenda.length}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Active in Employee Reader</div>
            </div>
          </div>

          {/* Addenda Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {stateAddenda.map((addendum) => (
              <div
                key={addendum.id}
                className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                  addendum.isAttached
                    ? 'bg-slate-900/90 border-amber-400 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{addendum.flag}</span>
                      <span className="font-mono text-xs font-black text-white">
                        {addendum.regionName}
                      </span>
                    </div>

                    {addendum.isAttached ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-black bg-amber-400 text-slate-950 flex items-center gap-1">
                        <span>✓ Attached</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-slate-400 border border-slate-700">
                        Available
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1.5">{addendum.title}</h4>

                  <div className="p-2 rounded-lg bg-slate-950 text-[10px] font-mono text-cyan-300 border border-slate-800 mb-2 truncate">
                    📜 {addendum.statutoryCitations}
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {addendum.summary}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 max-h-36 overflow-y-auto font-mono text-[11px] whitespace-pre-line leading-relaxed mb-4">
                    {addendum.content}
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                  <button
                    onClick={() => handleToggleAddendum(addendum.id)}
                    className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      addendum.isAttached
                        ? 'bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-800'
                        : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md'
                    }`}
                  >
                    {addendum.isAttached ? '✕ Detach from Handbook' : '+ Attach to Active Handbook'}
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(addendum.content);
                      alert(`✓ Copied ${addendum.regionName} addendum text to clipboard!`);
                    }}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs border border-slate-700 cursor-pointer"
                    title="Copy Addendum Text to Clipboard"
                  >
                    📋 Copy
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
