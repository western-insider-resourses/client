'use client';

import { useQuery } from '@tanstack/react-query';
import { createCommentApi, listCommentsApi } from '../../services/api/comments.api';
import type { CreateCommentPayload } from '../../services/api/types';
import { clientQueryKeys, useClientMutation } from './clientQuery';

export function useComments(slug: string) {
  return useQuery({
    queryKey: clientQueryKeys.comments(slug),
    queryFn: () => listCommentsApi(slug),
    enabled: Boolean(slug),
  });
}

export function useCreateComment(slug: string) {
  return useClientMutation(
    (payload: CreateCommentPayload) => createCommentApi(slug, payload),
    [clientQueryKeys.comments(slug), clientQueryKeys.post(slug), clientQueryKeys.posts()],
  );
}
