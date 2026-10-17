import { getSocialLinks } from '@/lib/data';

export default async function SocialLinks({ title = 'Follow us', tone = 'light' }: { title?: string; tone?: 'light' | 'dark' }) {
  const links = await getSocialLinks();
  if (!links.length) return null;
  return (
    <div>
      {title && <h3 className="mb-3 font-serif text-xl font-bold">{title}</h3>}
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
