import { api } from '../client';
import { PUBLIC_ENDPOINT } from './public.api';
import type { AdsResponse, PublicAdPlacement } from './types';

export async function listAdsApi(placement?: PublicAdPlacement): Promise<AdsResponse> {
  const { data } = await api.get<AdsResponse>(`${PUBLIC_ENDPOINT}/ads`, {
    params: placement ? { placement } : undefined,
  });
  return data;
}
