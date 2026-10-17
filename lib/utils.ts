// Ask Cloudinary for a resized, auto-format version of an uploaded image
export function cl(url: string | null | undefined, width = 800): string {
  if (!url) return '';
  if (!url.includes('/upload/')) return url;
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
}

export const fmtDate = (d?: string | null): string =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

export function timeAgo(d: string): string {
  const s = Math.max(1, Math.floor((Date.now() - new Date(d).getTime()) / 1000));
  const steps: Array<[number, string]> = [[31536000, 'year'], [2592000, 'month'], [86400, 'day'], [3600, 'hour'], [60, 'minute']];
  for (const [n, label] of steps) {
    if (s >= n) { const v = Math.floor(s / n); return `${v} ${label}${v > 1 ? 's' : ''} ago`; }
  }
  return 'just now';
}

export function getVisitorId(): string | null {
  if (typeof document === 'undefined') return null;
  const existing = getCookie('vid');
  if (existing) return existing;

  const id = crypto.randomUUID();
  setCookie('vid', id, 31_536_000);
  return id;
}

export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const entry = document.cookie.split('; ').find((cookie) => cookie.startsWith(`${name}=`));
  if (!entry) return null;
  try {
    return decodeURIComponent(entry.slice(name.length + 1));
  } catch {
    return null;
  }
}

export function setCookie(name: string, value: string, maxAge: number): void {
  if (typeof document === 'undefined') return;
  const secure = location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `${name}=${encodeURIComponent(value)}; Path=/; Max-Age=${maxAge}; SameSite=Lax${secure}`;
}

export function removeLegacyLocalStorage(): void {
  if (typeof window === 'undefined') return;
  for (const key of ['vid', 'commenter']) {
    try {
      const oldValue = localStorage.getItem(key);
      if (oldValue && !getCookie(key)) setCookie(key, oldValue, 31_536_000);
      localStorage.removeItem(key);
    } catch {
      continue;
    }
  }
}

export const errorMessage = (e: unknown): string => (e instanceof Error ? e.message : 'Something went wrong.');

export const PLATFORMS = ['Facebook', 'X', 'Instagram', 'TikTok', 'YouTube', 'WhatsApp', 'Telegram', 'LinkedIn', 'Google News'];
