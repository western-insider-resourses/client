import type { Metadata } from 'next';
import PostDetailView from '@/components/PostDetailView';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Story' };

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  return <PostDetailView slug={slug} />;
}
