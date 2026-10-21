'use client';

import { useQuery } from '@tanstack/react-query';
import { getLikeApi, toggleLikeApi } from '../../services/api/likes.api';
import { clientQueryKeys, useClientMutation } from './clientQuery';

export function useLike(slug: string, visitorId: string) {
  return useQuery({
    queryKey: clientQueryKeys.likes(slug, visitorId),
    queryFn: () => getLikeApi(slug, visitorId),
    enabled: Boolean(slug && visitorId),
  });
}

export function useToggleLike(slug: string, visitorId: string) {
  return useClientMutation(
    () => toggleLikeApi(slug, visitorId),
    [
      clientQueryKeys.likes(slug, visitorId),
      clientQueryKeys.post(slug),
      clientQueryKeys.posts(),
      clientQueryKeys.trending(),
    ],
  );
}
