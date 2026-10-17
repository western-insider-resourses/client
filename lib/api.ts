export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Western Insider Resources';

// Server-side fetch used by pages. Returns null if the API is down so pages still render.
export async function api<T>(path: string, revalidate = 30): Promise<T | null> {
  try {
    const res = await fetch(API_URL + path, { next: { revalidate } });
    return res.ok ? ((await res.json()) as T) : null;
  } catch {
    return null;
  }
}
