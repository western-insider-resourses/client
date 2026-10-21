import { api } from '../client';
import { PUBLIC_ENDPOINT } from './public.api';
import type { LikeResponse } from './types';

function likeEndpoint(slug: string): string {
  return `${PUBLIC_ENDPOINT}/posts/${encodeURIComponent(slug)}/like`;
}

export async function getLikeApi(slug: string, visitorId: string): Promise<LikeResponse> {
  const { data } = await api.get<LikeResponse>(likeEndpoint(slug), {
    params: { visitorId },
  });
  return data;
}

export async function toggleLikeApi(slug: string, visitorId: string): Promise<LikeResponse> {
  const { data } = await api.post<LikeResponse>(likeEndpoint(slug), { visitorId });
  return data;
}
