import { describe, expect, it } from 'vitest';
import { DUMMY_CATEGORIES, DUMMY_POSTS, findDummyPost, queryDummyPosts, trendingDummy } from '@/lib/dummyData';

const NICHES = ['business', 'career', 'technology', 'investment', 'finance'];

describe('dummy niches', () => {
  it('are exactly Business, Career, Technology, Investment and Finance', () => {
    expect(DUMMY_CATEGORIES.map((c) => c.slug)).toEqual(NICHES);
    expect(DUMMY_CATEGORIES.map((c) => c.name)).toEqual(['Business', 'Career', 'Technology', 'Investment', 'Finance']);
  });
  it('each niche has stories', () => {
    for (const slug of NICHES) expect(queryDummyPosts({ category: slug }).total).toBeGreaterThanOrEqual(3);
  });
  it('every story belongs to a niche and has unique slug and a body', () => {
    expect(new Set(DUMMY_POSTS.map((p) => p.slug)).size).toBe(DUMMY_POSTS.length);
    for (const p of DUMMY_POSTS) { expect(NICHES).toContain(p.category_slug); expect(p.body.length).toBeGreaterThan(50); }
  });
});

describe('queryDummyPosts', () => {
  it('filters by niche', () => {
    const { posts } = queryDummyPosts({ category: 'technology' });
    expect(posts.length).toBeGreaterThan(0);
    expect(posts.every((p) => p.category_slug === 'technology')).toBe(true);
  });
  it('searches title and excerpt, case-insensitively', () => {
    expect(queryDummyPosts({ q: 'PASSWORD' }).posts.some((p) => p.slug === 'password-managers-explained')).toBe(true);
    expect(queryDummyPosts({ q: 'zzzz-no-match' }).total).toBe(0);
  });
  it('paginates', () => {
    const p1 = queryDummyPosts({ limit: 4, page: 1 });
    const p2 = queryDummyPosts({ limit: 4, page: 2 });
    expect(p1.pages).toBe(Math.ceil(DUMMY_POSTS.length / 4));
    expect(p1.posts).toHaveLength(4);
    expect(p2.posts[0]!.id).not.toBe(p1.posts[0]!.id);
  });
  it('puts the featured story first and keeps summaries free of body text', () => {
    const first = queryDummyPosts().posts[0]!;
    expect(first.featured).toBe(true);
    expect('body' in first).toBe(false);
  });
});

describe('single story helpers', () => {
  it('finds a story with related stories, preferring the same niche', () => {
    const post = findDummyPost('index-funds-for-beginners')!;
    expect(post.title).toMatch(/Index funds/);
    expect(post.related).toHaveLength(4);
    expect(post.related[0]!.category_slug).toBe('investment');
    expect(post.related.some((r) => r.id === post.id)).toBe(false);
  });
  it('returns null for unknown slugs', () => expect(findDummyPost('nope')).toBeNull());
  it('trending returns five, most viewed first', () => {
    const t = trendingDummy();
    expect(t).toHaveLength(5);
    expect(t[0]!.views).toBeGreaterThanOrEqual(t[4]!.views);
  });
});
