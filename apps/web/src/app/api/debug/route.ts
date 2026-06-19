import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl = process.env.API_URL ?? 'NOT SET';
  const nextAuthUrl = process.env.NEXTAUTH_URL ?? 'NOT SET';
  const publicApiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'NOT SET';

  // Try to actually call the API
  let apiReachable = false;
  let apiError = '';
  try {
    const res = await fetch(`${apiUrl}/api/v1/health`, { signal: AbortSignal.timeout(5000) });
    apiReachable = res.ok;
    if (!res.ok) apiError = `HTTP ${res.status}`;
  } catch (e) {
    apiError = String(e);
  }

  return NextResponse.json({
    API_URL: apiUrl,
    NEXTAUTH_URL: nextAuthUrl,
    NEXT_PUBLIC_API_URL: publicApiUrl,
    apiReachable,
    apiError,
  });
}
