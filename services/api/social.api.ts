import { api } from '../client';
import { PUBLIC_ENDPOINT } from './public.api';
import type { SocialLinksResponse } from './types';

export async function listSocialLinksApi(): Promise<SocialLinksResponse> {
  const { data } = await api.get<SocialLinksResponse>(`${PUBLIC_ENDPOINT}/social`);
  return data;
}
