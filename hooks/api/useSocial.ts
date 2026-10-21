'use client';

import { useQuery } from '@tanstack/react-query';
import { listSocialLinksApi } from '../../services/api/social.api';
import { clientQueryKeys } from './clientQuery';

export function useSocialLinks() {
  return useQuery({
    queryKey: clientQueryKeys.social(),
    queryFn: listSocialLinksApi,
  });
}
