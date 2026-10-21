'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getPostApi,
  listPostsApi,
  listTrendingPostsApi,
} from '../../services/api/posts.api';
import type { PostQuery } from '../../services/api/types';
import { clientQueryKeys } from './clientQuery';

export function usePosts(params: PostQuery = {}, enabled = true) {
  return useQuery({
    queryKey: clientQueryKeys.postsList(params),
    queryFn: () => listPostsApi(params),
    enabled,
  });
}

export function useTrendingPosts() {
  return useQuery({
    queryKey: clientQueryKeys.trending(),
    queryFn: listTrendingPostsApi,
  });
}

export function usePost(slug: string) {
  return useQuery({
    queryKey: clientQueryKeys.post(slug),
    queryFn: () => getPostApi(slug),
    enabled: Boolean(slug),
  });
}
