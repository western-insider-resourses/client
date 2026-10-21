"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const clientQueryRoot = ["client"] as const;

export const clientQueryKeys = {
  categories: () => [...clientQueryRoot, "categories"] as const,
  posts: () => [...clientQueryRoot, "posts"] as const,
  postsList: (params: object = {}) =>
    [...clientQueryRoot, "posts", "list", params] as const,
  trending: () => [...clientQueryRoot, "trending"] as const,
  post: (slug: string) =>
    [...clientQueryRoot, "posts", "detail", slug] as const,
  comments: (slug: string) => [...clientQueryRoot, "comments", slug] as const,
  commentsRoot: () => [...clientQueryRoot, "comments"] as const,
  likes: (slug: string, visitorId: string) =>
    [...clientQueryRoot, "likes", slug, visitorId] as const,
  likesRoot: () => [...clientQueryRoot, "likes"] as const,
  ads: (placement?: string) =>
    [...clientQueryRoot, "ads", placement ?? "all"] as const,
  social: () => [...clientQueryRoot, "social"] as const,
};

export function useClientMutation<TVariables, TResult>(
  mutationFn: (variables: TVariables) => Promise<TResult>,
  invalidate?: readonly (readonly unknown[])[],
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: async () => {
      await Promise.all(
        (invalidate ?? []).map((queryKey) =>
          queryClient.invalidateQueries({ queryKey }),
        ),
      );
    },
  });
}
