import { describe, expect, it } from 'vitest';
import { cl, fmtDate } from '@/lib/utils';

describe('utils', () => {
  it('cl() adds Cloudinary transforms only to Cloudinary URLs', () => {
    expect(cl('https://res.cloudinary.com/x/image/upload/v1/a.jpg', 300)).toContain('/upload/f_auto,q_auto,w_300/');
    expect(cl('https://picsum.photos/a.jpg')).toBe('https://picsum.photos/a.jpg');
    expect(cl(null)).toBe('');
  });
  it('fmtDate handles empty values', () => { expect(fmtDate(null)).toBe(''); expect(fmtDate('2026-10-01T00:00:00Z')).toMatch(/2026/); });
});
