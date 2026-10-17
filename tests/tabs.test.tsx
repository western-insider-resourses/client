import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { activeTabKey, buildNicheTabs } from '@/lib/tabs';
import { DUMMY_CATEGORIES } from '@/lib/dummyData';
import { Tabs } from '@/components/ui';
import NavTabs from '@/components/NavTabs';

let path = '/';
vi.mock('next/navigation', () => ({ usePathname: () => path }));

describe('buildNicheTabs / activeTabKey', () => {
  it('starts with Home then one tab per niche', () => {
    const tabs = buildNicheTabs(DUMMY_CATEGORIES);
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
    render(<Tabs items={items} activeKey="b" label="Demo" trackPrefix="nav" />);
    expect(screen.getByRole('navigation', { name: 'Demo' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Beta' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Alpha' })).not.toHaveAttribute('aria-current');
    expect(screen.getByRole('link', { name: 'Alpha' })).toHaveAttribute('data-track', 'nav:a');
  });
  it('omits tracking when no prefix is given', () => {
    render(<Tabs items={items} activeKey="a" label="Demo" />);
    expect(screen.getByRole('link', { name: 'Alpha' })).not.toHaveAttribute('data-track');
  });
});

describe('<NavTabs> (site header)', () => {
  it('shows the five niche tabs plus Home', () => {
    path = '/';
    render(<NavTabs categories={DUMMY_CATEGORIES} />);
    const names = screen.getAllByRole('link').map((l) => l.textContent);
    expect(names).toEqual(['Home', 'Business', 'Career', 'Technology', 'Investment', 'Finance']);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
  });
  it('highlights the niche you are on', () => {
    path = '/category/career';
    render(<NavTabs categories={DUMMY_CATEGORIES} />);
    expect(screen.getByRole('link', { name: 'Career' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
  });
});
