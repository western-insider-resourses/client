'use client';

import { trackEventApi } from '../../services/api/tracking.api';
import type { TrackEventPayload } from '../../services/api/types';
import { useClientMutation } from './clientQuery';

export function useTrackEvent() {
  return useClientMutation((payload: TrackEventPayload) => trackEventApi(payload));
}
