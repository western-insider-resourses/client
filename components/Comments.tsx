'use client';
import { useEffect, useState, type FormEvent } from 'react';
import { API_URL } from '@/lib/api';
import { errorMessage, getCookie, setCookie, timeAgo } from '@/lib/utils';
import type { CommentNode } from '@/lib/types';
import { Button, SectionHeading } from '@/components/ui';

interface FormProps {
  slug: string;
  parentId?: number | null;
  onPosted: (c: CommentNode) => void;
  onCancel?: () => void;
  autoFocus?: boolean;
}

function Form({ slug, parentId = null, onPosted, onCancel, autoFocus }: FormProps) {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => { setName(getCookie('commenter') || ''); }, []);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setError('');
    try {
      const r = await fetch(`${API_URL}/posts/${slug}/comments`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, body, parentId }),
      });
      const data = (await r.json()) as CommentNode & { error?: string };
      if (!r.ok) throw new Error(data.error || 'Could not post your comment.');
      setCookie('commenter', name, 31_536_000);
      setBody(''); onPosted(data);
    } catch (err) { setError(errorMessage(err)); } finally { setBusy(false); }
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <input className="input" placeholder="Your name" value={name} maxLength={60} onChange={(e) => setName(e.target.value)} aria-label="Your name" required />
      <textarea className="input min-h-24" placeholder={parentId ? 'Write a reply' : 'Share your thoughts'} value={body}
        maxLength={2000} onChange={(e) => setBody(e.target.value)} aria-label="Comment" autoFocus={autoFocus} required />
      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="flex gap-2">
        <Button type="submit" variant="primary" disabled={busy} data-track={parentId ? 'comment:reply' : 'comment:post'}>{busy ? 'Posting...' : parentId ? 'Post reply' : 'Post comment'}</Button>
        {onCancel && <Button onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  );
}

function Comment({ c, slug, depth, onReply }: { c: CommentNode; slug: string; depth: number; onReply: (parentId: number, node: CommentNode) => void }) {
  const [replying, setReplying] = useState(false);
  return (
    <li className="mt-4">
      <div className="rounded-xl bg-slate-50 p-4">
        <p className="text-sm"><span className="font-bold">{c.name}</span> <span className="text-mute">&middot; {timeAgo(c.created_at)}</span></p>
        <p className="mt-1 whitespace-pre-line break-words text-[15px] leading-relaxed">{c.body}</p>
        <button className="mt-2 text-sm font-semibold text-crimson" onClick={() => setReplying(!replying)}>Reply</button>
        {replying && (
          <div className="mt-3">
            <Form slug={slug} parentId={c.id} autoFocus onCancel={() => setReplying(false)}
              onPosted={(n) => { onReply(c.id, n); setReplying(false); }} />
          </div>
        )}
      </div>
      {c.replies?.length > 0 && (
        <ul className={`${depth < 4 ? 'ml-5 border-l-2 border-slate-200 pl-4' : ''}`}>
          {c.replies.map((r) => <Comment key={r.id} c={r} slug={slug} depth={depth + 1} onReply={onReply} />)}
        </ul>
      )}
    </li>
  );
}

const addReply = (list: CommentNode[], parentId: number, node: CommentNode): CommentNode[] =>
  list.map((c) => c.id === parentId
    ? { ...c, replies: [...c.replies, node] }
    : { ...c, replies: addReply(c.replies, parentId, node) });

export default function Comments({ slug }: { slug: string }) {
  const [data, setData] = useState<{ comments: CommentNode[]; total: number }>({ comments: [], total: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/posts/${slug}/comments`).then((r) => r.json() as Promise<{ comments: CommentNode[]; total: number }>).then(setData).catch(() => {}).finally(() => setLoaded(true));
  }, [slug]);

  return (
    <section aria-labelledby="comments-h" className="mt-10">
      <SectionHeading id="comments-h">Comments ({data.total})</SectionHeading>
      <div className="mt-4">
        <Form slug={slug} onPosted={(n) => setData((d) => ({ comments: [n, ...d.comments], total: d.total + 1 }))} />
      </div>
      {loaded && data.comments.length === 0 && <p className="mt-6 text-mute">No comments yet. Start the conversation.</p>}
      <ul>
        {data.comments.map((c) => (
          <Comment key={c.id} c={c} slug={slug} depth={0}
            onReply={(pid, n) => setData((d) => ({ comments: addReply(d.comments, pid, n), total: d.total + 1 }))} />
        ))}
      </ul>
    </section>
  );
}
