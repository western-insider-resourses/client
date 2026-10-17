import { api } from './api';
import { DUMMY_CATEGORIES, DUMMY_SOCIAL, findDummyPost, queryDummyPosts, trendingDummy } from './dummyData';
import type { Ad, AdPlacement, Category, PostDetail, PostsPage, PostSummary, SocialLink } from './types';

// One place every page reads from. Dummy data is on unless NEXT_PUBLIC_USE_DUMMY_DATA=false.
export const USE_DUMMY = process.env.NEXT_PUBLIC_USE_DUMMY_DATA !== 'false';

export interface PostQuery { category?: string; q?: string; page?: number; limit?: number }

export async function getCategories(): Promise<Category[]> {
  if (USE_DUMMY) return DUMMY_CATEGORIES;
  return (await api<Category[]>('/categories', 120)) ?? [];
}

export async function getPosts(opts: PostQuery = {}): Promise<PostsPage | null> {
  if (USE_DUMMY) return queryDummyPosts(opts);
  const params = new URLSearchParams();
  if (opts.category) params.set('category', opts.category);
  if (opts.q) params.set('q', opts.q);
  if (opts.page) params.set('page', String(opts.page));
  if (opts.limit) params.set('limit', String(opts.limit));
  return api<PostsPage>(`/posts?${params}`, opts.q ? 0 : 30);
}

export async function getTrending(): Promise<PostSummary[]> {
  if (USE_DUMMY) return trendingDummy();
  return (await api<PostSummary[]>('/posts/trending', 60)) ?? [];
}

export async function getPost(slug: string): Promise<PostDetail | null> {
  if (USE_DUMMY) return findDummyPost(slug);
  return api<PostDetail>(`/posts/${slug}`);
}

export async function getAds(placement: AdPlacement): Promise<Ad[]> {
  if (USE_DUMMY) return [];
  return (await api<Ad[]>(`/ads?placement=${placement}`, 60)) ?? [];
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  if (USE_DUMMY) return DUMMY_SOCIAL;
  return (await api<SocialLink[]>('/social', 60)) ?? [];
}
