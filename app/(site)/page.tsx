import { getPosts } from '@/lib/data';
import StoryList from '@/components/StoryList';
import Sidebar from '@/components/Sidebar';
import Pagination from '@/components/Pagination';

export const revalidate = 30;

type SearchParams = Promise<{ page?: string }>;

export default async function Home({ searchParams }: { searchParams?: SearchParams }) {
  const sp = (await searchParams) ?? {};
  const page = Number(sp.page) || 1;
  const data = await getPosts({ page, limit: 11 });
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div>
        <h1 className="sr-only">Latest stories</h1>
        <StoryList posts={data?.posts} withFeatured={page === 1} />
        <Pagination page={data?.page || 1} pages={data?.pages || 1} base="/" />
      </div>
      <Sidebar />
    </div>
  );
}