import { ScannerResult } from '../types/compliance';

export async function runWebsiteScan(url: string): Promise<ScannerResult> {
  const res = await fetch('/api/scanner/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });

  if (!res.ok) {
    throw new Error(`Scanner error: HTTP ${res.status}`);
  }

  return await res.json();
}

export async function askComplianceAI(action: string, payload: any): Promise<{ result: string; fallback?: boolean; error?: string }> {
  try {
    const res = await fetch('/api/ai/compliance-assist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, payload }),
    });

    if (!res.ok) {
      throw new Error(`AI Advisor error: HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    console.warn('API error, returning local guidance:', err);
    return {
      fallback: true,
      result: `Analysis generated for ${payload?.companyName || 'your organization'}: Ensure 2FA is active, deploy open-source Trivy & Gitleaks in CI/CD, and inject security headers via Cloudflare free tier.`,
    };
  }
}
