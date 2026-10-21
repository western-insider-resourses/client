'use client';

import Link from 'next/link';
import { useTrendingPosts } from '@/hooks/api/usePosts';
import { Card, SectionHeading } from '@/components/ui';
import AdSlot from './AdSlot';
import SocialLinks from './SocialLinks';
import { getErrorMessage } from '@/services/client';

export default function Sidebar() {
  const query = useTrendingPosts();
  const trending = query.data ?? [];
  return (
    <div className="space-y-6">
      <AdSlot placement="sidebar" />
      {query.isPending && <p role="status" className="text-sm text-mute">Loading trending stories...</p>}
      {query.error && <p role="alert" className="text-sm text-red-700">{getErrorMessage(query.error)}</p>}
      {trending.length > 0 && (
        <Card as="section" className="p-5">
          <SectionHeading as="h3">Trending now</SectionHeading>
          <ol className="space-y-3">
            {trending.map((p) => (
              <li key={p.id}>
                <Link href={`/post/${p.slug}`} data-track={`post:${p.slug}`}
                  className="block text-sm font-semibold leading-snug text-ink hover:text-crimson">{p.title}</Link>
                <span className="text-xs text-mute">{p.views.toLocaleString()} reads</span>
              </li>
            ))}
          </ol>
        </Card>
      )}
      <Card as="section" className="p-5"><SocialLinks title="Follow us" /></Card>
      <AdSlot placement="sidebar" />
    </div>
  );
}
