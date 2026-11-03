# 1-Compliance OS

> **The Autonomous Compliance & Governance Operating System for Modern Enterprises**  
> Continuous automated audit-readiness across SOC 2 Type II, ISO 27001, HIPAA, GDPR, PCI DSS v4, NIST CSF, and CMMC.

[![License](https://img.shields.io/badge/license-Proprietary-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Square Subscriptions](https://img.shields.io/badge/Square-Subscriptions_API-006AFF.svg?logo=square&logoColor=white)](https://developer.squareup.com/)

---

## 🌟 Overview

**1-Compliance OS** is a unified, enterprise-grade compliance operating system designed to replace legacy per-seat GRC platforms (such as Vanta and Drata) with an autonomous, flat-rate platform.

Powered by a squad of **5 Autonomous Sentinels** led by **Jax (Chief Sentinel)**, 1-Compliance OS continuously monitors, collects cryptographic chain-of-custody evidence, automates policy generation, and scopes compliance across all company departments—from the factory floor to DevOps and HR.

---

## 🛡️ Autonomous Sentinel Network

* **Jax (Chief Sentinel & Orchestrator):** Cross-framework coordinator, audit binder compiler, executive risk briefings.
* **IT / DevOps Sentinel:** Infrastructure continuous monitoring, container scanning (Trivy, Gitleaks, Prowler), CSP & TLS posture checks.
* **Privacy Sentinel:** GDPR, CCPA, HIPAA, cookie consent mapping, and data subject access requests (DSAR).
* **Risky (Third-Party Vendor Sentinel):** Automated supplier vetting, SOC 2 verification, zero-seat guest vendor portals.
* **HR Sentinel:** Employee compliance onboarding, policy attestations, background check verifications, security quests.

---

## 💳 Commercial SaaS Pricing & Cohort Structure

1-Compliance OS operates on a transparent, flat-rate pricing model without per-seat penalties:

| Plan Tier | Target Headcount | Monthly Rate | Annual Rate (2 Mo Free) | Ideal For |
| :--- | :--- | :--- | :--- | :--- |
| **Solo / Founder** | 1 User (Single Login) | **$149 / mo** | $1,490 / yr ($124/mo) | Solo founders, independent consultants, single CISO |
| **Team Compliance** | Up to 5 Users | **$299 / mo** | $2,990 / yr ($249/mo) | Early startups, cross-department leads |
| **Enterprise Scale** | 6 to 100 Users | **$999 / mo** | $9,990 / yr ($832/mo) | Mid-market businesses (all departments included) |
| **Mega Enterprise** | 101+ Users | **+$999 / 100 users** | +$832 / mo per cohort | Large enterprises (e.g. 120 users = $1,998/mo; 201 users = $2,997/mo) |
| **Vendor Passport** | Third-Party Vendors | **$49 / mo** | $490 / yr ($41/mo) | Pre-vetted digital trust badge across all subscribers |

### Square Auto-Tally Formula:
$$\text{Cohorts} = \left\lceil \frac{\text{User Count}}{100} \right\rceil$$
$$\text{Monthly Total} = \text{Cohorts} \times \$999$$

---

## 🏢 Enterprise Multi-Tenant & White-Label Architecture

1. **Company User-Approved Model:** Single corporate subscription billed to the enterprise. Approved employees join effortlessly via:
   * **Domain Auto-Approval Whitelist** (`@company.com`)
   * **Corporate Magic Invite Link** (`app.1-compliance.com/join/acme-org-9821`)
   * **Bulk CSV Employee Roster Import**
2. **White-Label Customization:**
   * Custom Company Name & Logo Badge
   * Internal Portal Title (e.g., *"Acme Internal Compliance OS"*)
   * Brand Color Palettes (Corporate Navy, HealthTech Emerald, Defense Amber, FinTech Purple, or custom hex)
   * Custom Subdomain CNAME (`compliance.yourcompany.com` -> `app.1-compliance.com`)

---

## 🚀 Quickstart & Local Development

### Prerequisites
* Node.js 20+ or 22+
* npm 10+

### Installation

```bash
# 1. Clone repository
git clone https://github.com/<your-username>/1-compliance-os.git
cd 1-compliance-os

# 2. Install dependencies
npm install

# 3. Start development server (Port 3000)
npm run dev
```

Visit `http://localhost:3000` in your browser.

### Production Build

```bash
# Build production bundle
npm run build

# Start production server
npm run start
```

---

## 🌐 Deploying to www.1-compliance.com

### Option A: Vercel / Netlify / Cloudflare (Recommended for Zero-DevOps)

1. Push this repository to your GitHub account (`github.com/<username>/1-compliance-os`).
2. Log into [Vercel](https://vercel.com) or [Netlify](https://netlify.com) and click **"Add New Project"**.
3. Select your GitHub repository `1-compliance-os`.
4. Set Build Settings:
   * **Framework Preset:** Vite
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
5. Under **Domains Settings**, add your custom domains:
   * Marketing Website: `www.1-compliance.com`
   * App Portal: `app.1-compliance.com`
6. Add DNS Records in your domain registrar (GoDaddy, Namecheap, Cloudflare):
   * `CNAME` for `app` -> `cname.vercel-dns.com`
   * `CNAME` for `www` -> `cname.vercel-dns.com`

### Option B: Docker Container (Self-Hosted / On-Premise)

```bash
# Build Docker image
docker build -t 1-compliance-os:latest .

# Run container on port 3000
docker run -d -p 3000:3000 --name 1-compliance 1-compliance-os:latest
```

---

## 📖 Training Manual & Guidebook

A complete 10-chapter operational guidebook is built directly into the operating system under the **"📖 Training Manual"** navigation tab, featuring:
* Chapter 1: System Overview & Sentinel Squad
* Chapter 2: Daily Workflow for Compliance Officers
* Chapter 3: Factory Floor, HR, IT & Finance Scoping
* Chapter 4: Evidence Collection & Cryptographic Tamper-Proof Vault
* Chapter 5: Auditor Collaboration & Exporting 1-Click ZIP Packages
* Chapter 6: Policy Engine & AI Customizer
* Chapter 7: Vendor Risk Management (TPCRM)
* Chapter 8: White-Label Theming Setup
* Chapter 9: Square Subscriptions (+100 Users) Configuration
* Chapter 10: Troubleshooting & FAQs

---

## 🔒 Security & Privacy

* Zero telemetry tracking or third-party cookies.
* Cryptographic SHA-256 evidence chain-of-custody verification.
* Built-in TLS, HSTS, CSP, and Security Header diagnostics.
* Role-Based Access Control (RBAC) with department scoping.

---

© 2026 1-Compliance. All rights reserved. Built for modern autonomous enterprise compliance.
