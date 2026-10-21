import type { Metadata } from 'next';
import StoryFeed from '@/components/StoryFeed';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = { title: 'Search' };

export default async function Search(props: { searchParams?: Promise<{ q?: string }> }) {
  const searchParams = await props.searchParams;
  const q = (searchParams?.q || '').trim();
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <StoryFeed params={q ? { q, limit: 24 } : undefined} heading={q ? `Results for "${q}"` : 'Search stories'} showEmptyQuery />
      <Sidebar />
    </div>
  );
}
