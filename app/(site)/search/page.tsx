import type { Metadata } from 'next';
import { getPosts } from '@/lib/data';
import StoryList from '@/components/StoryList';
import Sidebar from '@/components/Sidebar';

export const metadata: Metadata = { title: 'Search' };

export default async function Search({ searchParams }: { searchParams?: { q?: string } }) {
  const q = (searchParams?.q || '').trim();
  const data = q ? await getPosts({ q, limit: 24 }) : null;
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div>
        <h1 className="mb-6 font-serif text-3xl font-extrabold">{q ? `Results for "${q}"` : 'Search stories'}</h1>
        {q ? <StoryList posts={data?.posts} /> : <p className="text-mute">Type a word in the search box above.</p>}
      </div>
      <Sidebar />
    </div>
  );
}
