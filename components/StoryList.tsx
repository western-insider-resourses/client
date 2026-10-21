import { EmptyState } from "@/components/ui";
import PostCard, { FeaturedCard } from "./PostCard";
import type { PostSummary } from "@/lib/types";

export default function StoryList({
  posts,
  withFeatured = false,
}: {
  posts?: PostSummary[];
  withFeatured?: boolean;
}) {
  if (!posts?.length) {
    return <EmptyState>No stories here yet. Check back soon.</EmptyState>;
  }
  const [first, ...rest] = posts;
  const list = withFeatured ? rest : posts;
  return (
    <div className="space-y-6">
      {withFeatured && first && <FeaturedCard post={first} />}
      <div className="grid gap-6 sm:grid-cols-2">
        {list.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
