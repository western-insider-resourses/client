import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { activeTabKey, buildNicheTabs } from '@/lib/tabs';
import { Tabs } from '@/components/ui';
import NavTabs from '@/components/NavTabs';

const { categories } = vi.hoisted(() => ({
  categories: [
  { id: 1, name: 'Business', slug: 'business' },
  { id: 2, name: 'Career', slug: 'career' },
  { id: 3, name: 'Technology', slug: 'technology' },
  { id: 4, name: 'Investment', slug: 'investment' },
  { id: 5, name: 'Finance', slug: 'finance' },
  ],
}));
let path = '/';
vi.mock('next/navigation', () => ({ usePathname: () => path }));
vi.mock('@/hooks/api/useCategories', () => ({
  useCategories: () => ({ data: categories, isPending: false, error: null }),
}));

describe('buildNicheTabs / activeTabKey', () => {
  it('starts with Home then one tab per niche', () => {
    const tabs = buildNicheTabs(categories);
    expect(tabs.map((t) => t.label)).toEqual(['Home', 'Business', 'Career', 'Technology', 'Investment', 'Finance']);
    expect(tabs[3]).toEqual({ key: 'technology', label: 'Technology', href: '/category/technology' });
  });
  it('maps paths to the active tab', () => {
    expect(activeTabKey('/')).toBe('home');
    expect(activeTabKey('/category/finance')).toBe('finance');
    expect(activeTabKey('/category/finance/')).toBe('finance');
    expect(activeTabKey('/post/some-story')).toBe('');
    expect(activeTabKey('/search')).toBe('');
  });
});

describe('<Tabs>', () => {
  const items = [{ key: 'a', label: 'Alpha', href: '/a' }, { key: 'b', label: 'Beta', href: '/b' }];
  it('renders links and marks only the active one', () => {
    render(<Tabs items={items} activeKey="b" label="Demo" />);
    expect(screen.getByRole('navigation', { name: 'Demo' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Beta' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Alpha' })).not.toHaveAttribute('aria-current');
  });
});

describe('<NavTabs> (site header)', () => {
  it('shows the five niche tabs plus Home', () => {
    path = '/';
    render(<NavTabs />);
    const names = screen.getAllByRole('link').map((l) => l.textContent);
    expect(names).toEqual(['Home', 'Business', 'Career', 'Technology', 'Investment', 'Finance']);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  });
  it('highlights the niche you are on', () => {
    path = '/category/career';
    render(<NavTabs />);
    expect(screen.getByRole('link', { name: 'Career' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
  });
});
