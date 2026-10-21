'use client';

import { useState, type FormEvent } from 'react';
import { useComments, useCreateComment } from '@/hooks/api/useComments';
import { getErrorMessage } from '@/services/client';
import type { CommentNode } from '@/lib/types';
import { Button, SectionHeading } from '@/components/ui';
import { fmtDate } from '@/lib/utils';

function CommentForm({ slug, parentId, onCancel }: {
  slug: string;
  parentId?: number | null;
  onCancel?: () => void;
}) {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const mutation = useCreateComment(slug);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    mutation.mutate(
      { name: name.trim(), body: body.trim(), parentId: parentId ?? null },
      { onSuccess: () => setBody('') },
    );
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <input
        className="input"
        placeholder="Your name"
        value={name}
        maxLength={60}
        onChange={(event) => setName(event.target.value)}
        aria-label="Your name"
        required
      />
      <textarea
        className="input min-h-24"
        placeholder={parentId ? 'Write a reply' : 'Share your thoughts'}
        value={body}
        maxLength={2000}
        onChange={(event) => setBody(event.target.value)}
        aria-label="Comment"
        required
      />
      {mutation.error && <p role="alert" className="text-sm text-red-700">{getErrorMessage(mutation.error)}</p>}
      <div className="flex gap-2">
        <Button type="submit" variant="primary" disabled={mutation.isPending} data-track={parentId ? 'comment:reply' : 'comment:post'}>
          {mutation.isPending ? 'Posting...' : parentId ? 'Post reply' : 'Post comment'}
        </Button>
        {onCancel && <Button type="button" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  );
}

function Comment({ comment, slug, depth = 0 }: {
  comment: CommentNode;
  slug: string;
  depth?: number;
}) {
  const [replying, setReplying] = useState(false);
  return (
    <li className="mt-4">
      <div className="rounded-xl bg-slate-50 p-4">
        <p className="text-sm">
          <span className="font-bold">{comment.name}</span>
          <span className="text-mute"> &middot; {fmtDate(comment.created_at)}</span>
        </p>
        <p className="mt-1 whitespace-pre-line break-words text-[15px] leading-relaxed">{comment.body}</p>
        <button type="button" className="mt-2 text-sm font-semibold text-crimson" onClick={() => setReplying((value) => !value)}>
          {replying ? 'Cancel reply' : 'Reply'}
        </button>
        {replying && (
          <div className="mt-3">
            <CommentForm slug={slug} parentId={comment.id} onCancel={() => setReplying(false)} />
          </div>
        )}
      </div>
      {comment.replies?.length > 0 && (
        <ul className={depth < 4 ? 'ml-5 border-l-2 border-slate-200 pl-4' : ''}>
          {comment.replies.map((reply) => (
            <Comment key={reply.id} comment={reply} slug={slug} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Comments({ slug }: { slug: string }) {
  const query = useComments(slug);
  const comments = query.data?.comments ?? [];
  const count = query.data?.total ?? 0;

  return (
    <section aria-labelledby="comments-h" className="mt-10">
      <SectionHeading id="comments-h">Comments ({count})</SectionHeading>
      <div className="mt-4"><CommentForm slug={slug} /></div>
      {query.isPending && <p role="status" className="mt-4 text-mute">Loading comments...</p>}
      {query.error && <p role="alert" className="mt-3 text-sm text-red-700">{getErrorMessage(query.error)}</p>}
      {!query.isPending && !query.error && comments.length === 0 && (
        <p className="mt-6 text-mute">No comments yet. Start the conversation.</p>
      )}
      <ul>
        {comments.map((comment) => <Comment key={comment.id} comment={comment} slug={slug} />)}
      </ul>
    </section>
  );
}
