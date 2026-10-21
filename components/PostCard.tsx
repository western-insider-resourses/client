import Link from "next/link";
import { cl, fmtDate } from "@/lib/utils";
import type { PostSummary } from "@/lib/types";
import { Badge, Card } from "@/components/ui";

function Stats({ post }: { post: PostSummary }) {
  return (
    <span className="text-xs text-mute">
      {post.likes} like{post.likes === 1 ? "" : "s"} &nbsp;|&nbsp;{" "}
      {post.comments} comment{post.comments === 1 ? "" : "s"}
    </span>
  );
}

export function FeaturedCard({ post }: { post: PostSummary }) {
  return (
    <Card as="article" className="overflow-hidden border-l-8 border-l-crimson">
      <Link
        href={`/post/${post.slug}`}
        data-track={`post:${post.slug}`}
        className="grid md:grid-cols-5"
      >
        {post.cover && (
          <img
            src={cl(post.cover, 900)}
            alt=""
            className="h-60 w-full object-cover md:col-span-2 md:h-full"
          />
        )}
        <div className="p-6 md:col-span-3 md:p-8">
          {post.category_name && <Badge>{post.category_name}</Badge>}
          <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-ink md:text-4xl">
            {post.title}
          </h2>
          <p className="mt-3 line-clamp-3 text-lg text-mute">{post.excerpt}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-mute">
            <span>{fmtDate(post.published_at)}</span>
            <Stats post={post} />
          </div>
        </div>
      </Link>
    </Card>
  );
}

export default function PostCard({
  post,
  compact = false,
}: {
  post: PostSummary;
  compact?: boolean;
}) {
  return (
    <Card
      as="article"
      className="flex flex-col overflow-hidden transition hover:border-ink/40"
    >
      <Link
        href={`/post/${post.slug}`}
        data-track={`post:${post.slug}`}
        className="flex h-full flex-col"
      >
        {post.cover && (
          <img
            src={cl(post.cover, 600)}
            alt=""
            loading="lazy"
            className={`w-full object-cover ${compact ? "h-36" : "h-48"}`}
          />
        )}
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center gap-2">
            {post.category_name && <Badge>{post.category_name}</Badge>}
            <span className="text-xs text-mute">
              {fmtDate(post.published_at)}
            </span>
          </div>
          <h3 className="mt-3 text-lg font-bold leading-snug text-ink">
            {post.title}
          </h3>
          {!compact && (
            <p className="mt-2 line-clamp-3 text-sm text-mute">
              {post.excerpt}
            </p>
          )}
          <div className="mt-auto pt-4">
            <Stats post={post} />
          </div>
        </div>
      </Link>
    </Card>
  );
}
