import type { TabItem } from '@/components/ui/Tabs';
import type { Category } from './types';

// Home + one tab per niche (category)
export const buildNicheTabs = (categories: Category[]): TabItem[] => [
  { key: 'home', label: 'Home', href: '/' },
  ...categories.map((c) => ({ key: c.slug, label: c.name, href: `/category/${c.slug}` })),
];

export function activeTabKey(pathname: string): string {
  if (pathname === '/') return 'home';
  return /^\/category\/([^/]+)/.exec(pathname)?.[1] ?? '';
}
