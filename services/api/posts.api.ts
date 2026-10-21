import { api } from '../client';
import { PUBLIC_ENDPOINT } from './public.api';
import type {
  PostQuery,
  PostResponse,
  PostsResponse,
  TrendingPostsResponse,
} from './types';

export async function listPostsApi(params: PostQuery = {}): Promise<PostsResponse> {
  const { data } = await api.get<PostsResponse>(`${PUBLIC_ENDPOINT}/posts`, { params });
  return data;
}

export async function listTrendingPostsApi(): Promise<TrendingPostsResponse> {
  const { data } = await api.get<TrendingPostsResponse>(`${PUBLIC_ENDPOINT}/posts/trending`);
  return data;
}

export async function getPostApi(slug: string): Promise<PostResponse> {
  const { data } = await api.get<PostResponse>(
    `${PUBLIC_ENDPOINT}/posts/${encodeURIComponent(slug)}`,
  );
  return data;
}
