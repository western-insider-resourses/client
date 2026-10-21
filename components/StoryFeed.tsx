"use client";

import { getErrorMessage } from "@/services/client";
import { usePosts } from "@/hooks/api/usePosts";
import type { PostQuery } from "@/services/api/types";
import StoryList from "@/components/StoryList";
import Pagination from "@/components/Pagination";

interface Props {
  params?: PostQuery;
  withFeatured?: boolean;
  base?: string;
  heading: string;
  showEmptyQuery?: boolean;
}

export default function StoryFeed({
  params,
  withFeatured = false,
  base = "/",
  heading,
  showEmptyQuery = false,
}: Props) {
  const query = usePosts(params ?? {}, !showEmptyQuery || Boolean(params?.q));

  return (
    <section>
      <h1
        className={
          showEmptyQuery ? "mb-6 font-serif text-3xl font-extrabold" : "sr-only"
        }
      >
        {heading}
      </h1>
      {showEmptyQuery && !params?.q && (
        <p className="text-mute">Type a word in the search box above.</p>
      )}
      {query.isPending && (!showEmptyQuery || params?.q) && (
        <p role="status" className="text-mute">
          Loading stories...
        </p>
      )}
      {query.error && (
        <p role="alert" className="text-sm text-red-700">
          {getErrorMessage(query.error)}
        </p>
      )}
      {params && query.data && (
        <>
          <StoryList posts={query.data.posts} withFeatured={withFeatured} />
          <Pagination
            page={query.data.page}
            pages={query.data.pages}
            base={base}
          />
        </>
      )}
    </section>
  );
}
