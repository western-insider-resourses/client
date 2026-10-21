'use client';

import { useSocialLinks } from '@/hooks/api/useSocial';
import { getErrorMessage } from '@/services/client';

export default function SocialLinks({ title = 'Follow us', tone = 'light' }: { title?: string; tone?: 'light' | 'dark' }) {
  const query = useSocialLinks();
  const links = query.data ?? [];
  if (!links.length && !query.error && !query.isPending) return null;
  return (
    <div>
      {title && <h3 className="mb-3 font-serif text-xl font-bold">{title}</h3>}
      {query.isPending && <p role="status" className="text-sm text-mute">Loading social links...</p>}
      {query.error && <p role="alert" className="text-sm text-red-700">{getErrorMessage(query.error)}</p>}
      <ul className="flex flex-wrap gap-2">
        {links.map((l) => (
          <li key={l.id}>
            <a href={l.url} target="_blank" rel="noopener noreferrer" data-track={`social:${l.platform.toLowerCase()}`}
              className={`inline-block rounded-full border px-3.5 py-1.5 text-sm font-semibold transition ${
                tone === 'dark' ? 'border-white/30 text-white hover:bg-white/10' : 'border-slate-300 bg-white text-ink hover:border-crimson hover:text-crimson'}`}>
              {l.platform}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
