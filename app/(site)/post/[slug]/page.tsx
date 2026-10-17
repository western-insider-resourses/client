import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/api';
import { getPost } from '@/lib/data';
import { cl, fmtDate } from '@/lib/utils';
import type { PostImage } from '@/lib/types';
import { SectionHeading } from '@/components/ui';
import Sidebar from '@/components/Sidebar';
import AdSlot from '@/components/AdSlot';
import PostCard from '@/components/PostCard';
import ShareBar from '@/components/ShareBar';
import LikeButton from '@/components/LikeButton';
import Comments from '@/components/Comments';

export const revalidate = 30;

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Story not found' };
  const image = post.images?.[0]?.url && cl(post.images[0].url, 1200);
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article', siteName: SITE_NAME, images: image ? [image] : [] },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt, images: image ? [image] : [] },
  };
}

function Figure({ img }: { img: PostImage }) {
  return (
    <figure className="my-6">
      <img src={cl(img.url, 1000)} alt={img.caption || ''} loading="lazy" className="w-full rounded-xl" />
      {img.caption && <figcaption className="mt-2 text-sm text-mute">{img.caption}</figcaption>}
    </figure>
  );
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const paragraphs = post.body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const [hero, ...extra] = post.images;
  // image 2 goes after paragraph 2, image 3 after paragraph 5 (or the last paragraph on short stories);
  // the in-article ad sits after paragraph 3
  const slots: Record<number, PostImage[]> = {};
  extra.forEach((img, k) => {
    const at = Math.max(Math.min(k === 0 ? 2 : 5, paragraphs.length) - 1, 0);
    (slots[at] ||= []).push(img);
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
            {paragraphs.map((p, i) => (
              <div key={i}>
                <p>{p}</p>
                {slots[i]?.map((img) => <Figure key={img.url} img={img} />)}
                {i === 2 && <AdSlot placement="in_article" className="my-6" />}
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
              {post.related.map((p) => <PostCard key={p.id} post={p} compact />)}
            </div>
          </section>
        )}
      </article>
      <Sidebar />
    </div>
  );
}
