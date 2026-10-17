import Link from 'next/link';
import { getTrending } from '@/lib/data';
import { Card, SectionHeading } from '@/components/ui';
import AdSlot from './AdSlot';
import SocialLinks from './SocialLinks';

export default async function Sidebar() {
  const trending = await getTrending();
  return (
    <div className="space-y-6">
      <AdSlot placement="sidebar" />
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
