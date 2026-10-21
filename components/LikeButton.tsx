'use client';

import { useLike, useToggleLike } from '@/hooks/api/useLikes';
import { useVisitorId } from '@/hooks/useVisitorId';
import { getErrorMessage } from '@/services/client';
import { Button } from '@/components/ui';

export default function LikeButton({ slug, initialCount = 0 }: { slug: string; initialCount?: number }) {
  const visitorId = useVisitorId();
  const query = useLike(slug, visitorId);
  const mutation = useToggleLike(slug, visitorId);
  const liked = query.data?.liked ?? false;
  const count = query.data?.count ?? initialCount;

  return (
    <div>
      <Button
        onClick={() => mutation.mutate()}
        disabled={!visitorId || query.isPending || mutation.isPending}
        aria-pressed={liked}
        data-track="like:story"
        variant={liked ? 'primary' : 'default'}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.4-9.5 9-9.5 9z" />
        </svg>
        {liked ? 'Liked' : 'Like'} &middot; {count}
      </Button>
      {(query.error || mutation.error) && (
        <p role="alert" className="mt-2 text-sm text-red-700">
          {getErrorMessage(mutation.error ?? query.error)}
        </p>
      )}
    </div>
  );
}
