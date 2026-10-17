import Link from 'next/link';

export interface TabItem { key: string; label: string; href: string }

interface Props {
  items: TabItem[];
  activeKey: string;
  label: string;
  /** prefix for analytics clicks, e.g. "nav" gives data-track="nav:business" */
  trackPrefix?: string;
}

// Presentational tab bar. The parent decides which tab is active, so this works anywhere and is easy to test.
export default function Tabs({ items, activeKey, label, trackPrefix }: Props) {
  return (
    <nav aria-label={label} className="tabs -mx-4 flex gap-1 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      {items.map((t) => {
        const active = t.key === activeKey;
        return (
          <Link key={t.key} href={t.href} aria-current={active ? 'page' : undefined}
            data-track={trackPrefix ? `${trackPrefix}:${t.key}` : undefined}
            className={`whitespace-nowrap border-b-4 px-3 py-3 text-sm font-bold uppercase tracking-wide transition ${
              active ? 'border-crimson text-crimson' : 'border-transparent text-ink hover:text-crimson'}`}>
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
