import { api } from '../client';
import { PUBLIC_ENDPOINT } from './public.api';
import type { TrackEventPayload } from './types';

export async function trackEventApi(payload: TrackEventPayload): Promise<void> {
  await api.post(`${PUBLIC_ENDPOINT}/track`, payload);
}
