import type {
  Ad,
  AdPlacement,
  Category,
  CommentNode,
  PostDetail,
  PostsPage,
  PostSummary,
  SocialLink,
} from '../../lib/types';

export interface PostQuery {
  category?: string;
  q?: string;
  page?: number;
  limit?: number;
}

export interface CreateCommentPayload {
  name: string;
  body: string;
  parentId?: number | null;
}

export interface LikeState {
  liked: boolean;
  count: number;
}

export interface TrackEventPayload {
  type: 'view' | 'click';
  path: string;
  target?: string;
  visitorId?: string | null;
  referrer?: string;
}

export type CategoriesResponse = Category[];
export type PostsResponse = PostsPage;
export type TrendingPostsResponse = PostSummary[];
export type PostResponse = PostDetail;
export type CommentsResponse = { comments: CommentNode[]; total: number };
export type CommentResponse = CommentNode;
export type LikeResponse = LikeState;
export type AdsResponse = Ad[];
export type SocialLinksResponse = SocialLink[];
export type PublicAdPlacement = AdPlacement;
