'use client';
import { useEffect, useState } from 'react';
import { API_URL } from '@/lib/api';
import { getVisitorId } from '@/lib/utils';
import { Button } from '@/components/ui';

interface LikeState { liked: boolean; count: number }

export default function LikeButton({ slug, initialCount = 0 }: { slug: string; initialCount?: number }) {
  const [state, setState] = useState<LikeState>({ liked: false, count: initialCount });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/posts/${slug}/like?visitorId=${getVisitorId()}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d: LikeState | null) => d && setState(d))
      .catch(() => {});
  }, [slug]);

  async function toggle() {
    if (busy) return;
    setBusy(true);
    setState((s) => ({ liked: !s.liked, count: s.count + (s.liked ? -1 : 1) })); // optimistic
    try {
      const r = await fetch(`${API_URL}/posts/${slug}/like`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorId: getVisitorId() }),
      });
      if (r.ok) setState((await r.json()) as LikeState);
    } catch { /* keep the optimistic state if the API is unreachable (demo mode) */ } finally { setBusy(false); }
  }

  return (
    <Button onClick={toggle} aria-pressed={state.liked} data-track="like:story" variant={state.liked ? 'primary' : 'default'}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill={state.liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <path d="M12 21s-7-4.6-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.4-9.5 9-9.5 9z" />
      </svg>
      {state.liked ? 'Liked' : 'Like'} &middot; {state.count}
    </Button>
  );
}
