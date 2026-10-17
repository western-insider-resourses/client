import { afterEach, describe, expect, it, vi } from 'vitest';

afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.resetModules(); });

describe('data layer', () => {
  it('uses dummy data by default', async () => {
    const fetchSpy = vi.fn();
    vi.stubGlobal('fetch', fetchSpy);
    const data = await import('@/lib/data');
    expect(data.USE_DUMMY).toBe(true);
    expect((await data.getCategories()).map((c) => c.slug)).toContain('investment');
    expect((await data.getPosts({ category: 'finance' }))!.posts.every((p) => p.category_slug === 'finance')).toBe(true);
    expect((await data.getPost('negotiating-a-raise'))!.title).toMatch(/raise/);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('calls the API when dummy data is switched off', async () => {
    vi.stubEnv('NEXT_PUBLIC_USE_DUMMY_DATA', 'false');
    const fetchSpy = vi.fn(async () => ({ ok: true, json: async () => ({ posts: [], page: 1, pages: 1, total: 0 }) }));
    vi.stubGlobal('fetch', fetchSpy);
    const data = await import('@/lib/data');
    expect(data.USE_DUMMY).toBe(false);
    await data.getPosts({ category: 'career', page: 2, limit: 5 });
    const calls = fetchSpy.mock.calls as unknown as Array<[string]>;
    expect(calls[0]![0]).toContain('/posts?category=career&page=2&limit=5');
  });

  it('degrades to empty results when the API is down', async () => {
    vi.stubEnv('NEXT_PUBLIC_USE_DUMMY_DATA', 'false');
    vi.stubGlobal('fetch', vi.fn(async () => { throw new Error('down'); }));
    const data = await import('@/lib/data');
    expect(await data.getCategories()).toEqual([]);
    expect(await data.getPosts()).toBeNull();
    expect(await data.getPost('x')).toBeNull();
  });
});
