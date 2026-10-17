import { afterEach, describe, expect, it, vi } from 'vitest';
import { cl, errorMessage, fmtDate, getCookie, getVisitorId, removeLegacyLocalStorage, setCookie, timeAgo } from '@/lib/utils';

describe('utils', () => {
  afterEach(() => {
    document.cookie = 'vid=; Path=/; Max-Age=0';
    document.cookie = 'commenter=; Path=/; Max-Age=0';
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('cl() adds Cloudinary transforms only to Cloudinary URLs', () => {
    expect(cl('https://res.cloudinary.com/x/image/upload/v1/a.jpg', 300)).toContain('/upload/f_auto,q_auto,w_300/');
    expect(cl('https://picsum.photos/a.jpg')).toBe('https://picsum.photos/a.jpg');
    expect(cl(null)).toBe('');
  });
  it('fmtDate handles empty values', () => { expect(fmtDate(null)).toBe(''); expect(fmtDate('2026-10-01T00:00:00Z')).toMatch(/2026/); });
  it('timeAgo is human', () => {
    expect(timeAgo(new Date().toISOString())).toBe('just now');
    expect(timeAgo(new Date(Date.now() - 2 * 3600_000).toISOString())).toBe('2 hours ago');
  });
  it('errorMessage falls back for non-errors', () => {
    expect(errorMessage(new Error('boom'))).toBe('boom');
    expect(errorMessage('x')).toBe('Something went wrong.');
  });
  it('reads the visitor id from a cookie', () => {
    document.cookie = 'vid=existing-id; Path=/';
    expect(getVisitorId()).toBe('existing-id');
  });
  it('creates and stores a visitor id in a cookie when none exists', () => {
    vi.spyOn(crypto, 'randomUUID').mockReturnValue('new-id');
    expect(getVisitorId()).toBe('new-id');
    expect(document.cookie).toContain('vid=new-id');
  });
  it('reads and writes encoded cookie values', () => {
    setCookie('commenter', 'Jane Doe', 3600);
    expect(getCookie('commenter')).toBe('Jane Doe');
  });
  it('moves legacy visitor and commenter values into cookies and removes them from localStorage', () => {
    localStorage.setItem('vid', 'legacy-visitor');
    localStorage.setItem('commenter', 'Jane Doe');
    removeLegacyLocalStorage();
    expect(getCookie('vid')).toBe('legacy-visitor');
    expect(getCookie('commenter')).toBe('Jane Doe');
    expect(localStorage.getItem('vid')).toBeNull();
    expect(localStorage.getItem('commenter')).toBeNull();
  });
});
