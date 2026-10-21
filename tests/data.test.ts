import { afterEach, describe, expect, it, vi } from 'vitest';
import { api } from '@/services/client';
import { listCategoriesApi } from '@/services/api/categories.api';
import { listPostsApi, getPostApi, listTrendingPostsApi } from '@/services/api/posts.api';
import { listCommentsApi, createCommentApi } from '@/services/api/comments.api';
import { getLikeApi, toggleLikeApi } from '@/services/api/likes.api';
import { listAdsApi } from '@/services/api/ads.api';
import { listSocialLinksApi } from '@/services/api/social.api';
import { trackEventApi } from '@/services/api/tracking.api';

afterEach(() => vi.restoreAllMocks());

describe('public API services', () => {
  it('requests categories, posts, trending stories, and an encoded post slug', async () => {
    const get = vi.spyOn(api, 'get').mockResolvedValue({ data: [] });

    await listCategoriesApi();
    await listPostsApi({ category: 'career', page: 2, limit: 5 });
    await listTrendingPostsApi();
    await getPostApi('slug/with space');

    expect(get).toHaveBeenNthCalledWith(1, '/v1/categories');
    expect(get).toHaveBeenNthCalledWith(2, '/v1/posts', {
      params: { category: 'career', page: 2, limit: 5 },
    });
    expect(get).toHaveBeenNthCalledWith(3, '/v1/posts/trending');
    expect(get).toHaveBeenNthCalledWith(4, '/v1/posts/slug%2Fwith%20space');
  });

  it('supports comments, likes, ads, social links, and tracking requests', async () => {
    const get = vi.spyOn(api, 'get').mockResolvedValue({ data: [] });
    const post = vi.spyOn(api, 'post').mockResolvedValue({ data: { ok: true } });

    await listCommentsApi('story/example');
    await createCommentApi('story/example', { name: 'Jane', body: 'Hello' });
    await getLikeApi('story/example', 'visitor-1');
    await toggleLikeApi('story/example', 'visitor-1');
    await listAdsApi('sidebar');
    await listSocialLinksApi();
    await trackEventApi({ type: 'view', path: '/', visitorId: 'visitor-1' });

    expect(get).toHaveBeenNthCalledWith(1, '/v1/posts/story%2Fexample/comments');
    expect(post).toHaveBeenNthCalledWith(1, '/v1/posts/story%2Fexample/comments', {
      name: 'Jane', body: 'Hello',
    });
    expect(get).toHaveBeenNthCalledWith(2, '/v1/posts/story%2Fexample/like', {
      params: { visitorId: 'visitor-1' },
    });
    expect(post).toHaveBeenNthCalledWith(2, '/v1/posts/story%2Fexample/like', {
      visitorId: 'visitor-1',
    });
    expect(get).toHaveBeenNthCalledWith(3, '/v1/ads', { params: { placement: 'sidebar' } });
    expect(get).toHaveBeenNthCalledWith(4, '/v1/social');
    expect(post).toHaveBeenNthCalledWith(3, '/v1/track', {
      type: 'view', path: '/', visitorId: 'visitor-1',
    });
  });
});
