import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as postsApi from '@/services/api/posts.api';
import * as likesApi from '@/services/api/likes.api';
import { clientQueryKeys } from '@/hooks/api/clientQuery';
import { usePosts } from '@/hooks/api/usePosts';
import { useToggleLike } from '@/hooks/api/useLikes';
import type { ReactNode } from 'react';

afterEach(() => vi.restoreAllMocks());

function createWrapper(queryClient: QueryClient) {
  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe('API React Query hooks', () => {
  it('loads posts through the public API hook', async () => {
    const response = { posts: [], page: 1, pages: 1, total: 0 };
    const request = vi.spyOn(postsApi, 'listPostsApi').mockResolvedValue(response);
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const { result } = renderHook(() => usePosts({ category: 'career', page: 2 }), {
      wrapper: createWrapper(queryClient),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(request).toHaveBeenCalledWith({ category: 'career', page: 2 });
    expect(result.current.data).toEqual(response);
    queryClient.clear();
  });

  it('runs the like mutation and invalidates related query caches', async () => {
    const response = { liked: true, count: 3 };
    const request = vi.spyOn(likesApi, 'toggleLikeApi').mockResolvedValue(response);
    const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const likesKey = clientQueryKeys.likes('sample-story', 'visitor');
    queryClient.setQueryData(likesKey, { liked: false, count: 2 });
    queryClient.setQueryData(clientQueryKeys.postsList(), []);

    const { result } = renderHook(() => useToggleLike('sample-story', 'visitor'), {
      wrapper: createWrapper(queryClient),
    });

    await act(async () => {
      await result.current.mutateAsync();
    });

    expect(request).toHaveBeenCalledWith('sample-story', 'visitor');
    expect(queryClient.getQueryState(likesKey)?.isInvalidated).toBe(true);
    expect(queryClient.getQueryState(clientQueryKeys.postsList())?.isInvalidated).toBe(true);
    queryClient.clear();
  });
});
