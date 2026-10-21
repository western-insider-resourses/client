import type { Metadata } from 'next';
import CategoryFeed from '@/components/CategoryFeed';
import Sidebar from '@/components/Sidebar';

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ page?: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  await params;
  return { title: 'Category' };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams?: SearchParams;
}) {
  const { slug } = await params;
  const sp = (await searchParams) ?? {};

  const page = Number(sp.page) || 1;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <CategoryFeed slug={slug} page={page} />
      <Sidebar />
    </div>
  );
}