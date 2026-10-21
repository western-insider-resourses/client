'use client';

import { getErrorMessage } from '@/services/client';
import { useCategories } from '@/hooks/api/useCategories';
import { usePosts } from '@/hooks/api/usePosts';
import StoryList from '@/components/StoryList';
import Pagination from '@/components/Pagination';

export default function CategoryFeed({ slug, page }: { slug: string; page: number }) {
  const categories = useCategories();
  const posts = usePosts({ category: slug, page, limit: 12 });
  const category = categories.data?.find((item) => item.slug === slug);
  const error = categories.error || posts.error;

  return (
    <section>
      {category && <h1 className="mb-1 font-serif text-4xl font-extrabold">{category.name}</h1>}
      {category && <div className="mb-6 h-1 w-16 bg-crimson" />}
      {(categories.isPending || posts.isPending) && <p role="status" className="text-mute">Loading stories...</p>}
      {error && <p role="alert" className="text-sm text-red-700">{getErrorMessage(error)}</p>}
      {categories.data && !category && !categories.isPending && (
        <p role="alert" className="text-mute">This category could not be found.</p>
      )}
      {posts.data && category && (
        <>
          <StoryList posts={posts.data.posts} />
          <Pagination page={posts.data.page} pages={posts.data.pages} base={`/category/${slug}`} />
        </>
      )}
    </section>
  );
}
