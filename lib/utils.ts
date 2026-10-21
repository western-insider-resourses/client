// Ask Cloudinary for a resized, auto-format version of an uploaded image
export function cl(url: string | null | undefined, width = 800): string {
  if (!url) return '';
  if (!url.includes('/upload/')) return url;
  return url.replace('/upload/', `/upload/f_auto,q_auto,w_${width}/`);
}

export const fmtDate = (d?: string | null): string =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

export const PLATFORMS = ['Facebook', 'X', 'Instagram', 'TikTok', 'YouTube', 'WhatsApp', 'Telegram', 'LinkedIn', 'Google News'];
