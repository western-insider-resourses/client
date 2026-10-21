'use client';

import Link from 'next/link';
import { usePost } from '@/hooks/api/usePosts';
import { getErrorMessage } from '@/services/client';
import { cl, fmtDate } from '@/lib/utils';
import type { PostImage } from '@/lib/types';
import { SectionHeading } from '@/components/ui';
import Sidebar from '@/components/Sidebar';
import AdSlot from '@/components/AdSlot';
import PostCard from '@/components/PostCard';
import ShareBar from '@/components/ShareBar';
import LikeButton from '@/components/LikeButton';
import Comments from '@/components/Comments';

function Figure({ img }: { img: PostImage }) {
  return (
    <figure className="my-6">
      <img src={cl(img.url, 1000)} alt={img.caption || ''} loading="lazy" className="w-full rounded-xl" />
      {img.caption && <figcaption className="mt-2 text-sm text-mute">{img.caption}</figcaption>}
    </figure>
  );
}

export default function PostDetailView({ slug }: { slug: string }) {
  const query = usePost(slug);
  const post = query.data;

  if (query.isPending) return <p role="status" className="text-mute">Loading story...</p>;
  if (query.error) return <p role="alert" className="text-red-700">{getErrorMessage(query.error)}</p>;
  if (!post) return <p role="alert" className="text-mute">Story not found.</p>;

  const paragraphs = post.body.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const [hero, ...extra] = post.images;
  const slots: Record<number, PostImage[]> = {};
  extra.forEach((image, index) => {
    const at = Math.max(Math.min(index === 0 ? 2 : 5, paragraphs.length) - 1, 0);
    (slots[at] ||= []).push(image);
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <article>
        <div className="card p-5 sm:p-8">
          <nav aria-label="Breadcrumb" className="mb-3 text-sm text-mute">
            <Link href="/" className="hover:text-crimson">Home</Link>
            {post.category_slug && <> / <Link href={`/category/${post.category_slug}`} className="hover:text-crimson">{post.category_name}</Link></>}
          </nav>
          <h1 className="font-serif text-3xl font-extrabold leading-tight sm:text-4xl">{post.title}</h1>
          <p className="mt-3 text-sm text-mute">
            By {post.author} &nbsp;|&nbsp; {fmtDate(post.published_at)} &nbsp;|&nbsp; {post.views.toLocaleString()} reads
          </p>
          {post.excerpt && <p className="mt-4 text-lg font-medium text-mute">{post.excerpt}</p>}
          {hero && <Figure img={hero} />}

          <div className="story">
            {paragraphs.map((paragraph, index) => (
              <div key={index}>
                <p>{paragraph}</p>
                {slots[index]?.map((image) => <Figure key={image.url} img={image} />)}
                {index === 2 && <AdSlot placement="in_article" className="my-6" />}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-start gap-4 border-t border-slate-200 pt-6">
            <LikeButton slug={post.slug} initialCount={post.likes} />
            <div className="flex-1"><ShareBar title={post.title} /></div>
          </div>
        </div>

        <div className="card mt-6 p-5 sm:p-8"><Comments slug={post.slug} /></div>

        {post.related?.length > 0 && (
          <section className="mt-8" aria-labelledby="rel-h">
            <SectionHeading id="rel-h">Related stories</SectionHeading>
            <div className="grid gap-6 sm:grid-cols-2">
              {post.related.map((related) => <PostCard key={related.id} post={related} compact />)}
            </div>
          </section>
        )}
      </article>
      <Sidebar />
    </div>
  );
}
