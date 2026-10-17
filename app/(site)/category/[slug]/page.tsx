import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getCategories, getPosts } from '@/lib/data';
import StoryList from '@/components/StoryList';
import Sidebar from '@/components/Sidebar';
import Pagination from '@/components/Pagination';

export const revalidate = 30;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cats = await getCategories();
  const c = cats.find((x) => x.slug === params.slug);
  return { title: c ? c.name : 'Category' };
}

export default async function CategoryPage({ params, searchParams }: { params: { slug: string }; searchParams?: { page?: string } }) {
  const cats = await getCategories();
  const cat = cats.find((c) => c.slug === params.slug);
  if (!cat) notFound();
  const page = Number(searchParams?.page) || 1;
  const data = await getPosts({ category: cat.slug, page, limit: 12 });
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <div>
        <h1 className="mb-1 font-serif text-4xl font-extrabold">{cat.name}</h1>
        <div className="mb-6 h-1 w-16 bg-crimson" />
        <StoryList posts={data?.posts} />
        <Pagination page={data?.page || 1} pages={data?.pages || 1} base={`/category/${cat.slug}`} />
      </div>
      <Sidebar />
    </div>
  );
}
