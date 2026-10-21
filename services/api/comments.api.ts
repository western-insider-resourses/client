import { api } from '../client';
import { PUBLIC_ENDPOINT } from './public.api';
import type {
  CommentResponse,
  CommentsResponse,
  CreateCommentPayload,
} from './types';

function commentsEndpoint(slug: string): string {
  return `${PUBLIC_ENDPOINT}/posts/${encodeURIComponent(slug)}/comments`;
}

export async function listCommentsApi(slug: string): Promise<CommentsResponse> {
  const { data } = await api.get<CommentsResponse>(commentsEndpoint(slug));
  return data;
}

export async function createCommentApi(
  slug: string,
  payload: CreateCommentPayload,
): Promise<CommentResponse> {
  const { data } = await api.post<CommentResponse>(commentsEndpoint(slug), payload);
  return data;
}
