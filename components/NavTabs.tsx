'use client';
import { usePathname } from 'next/navigation';
import { activeTabKey, buildNicheTabs } from '@/lib/tabs';
import type { Category } from '@/lib/types';
import { Tabs } from '@/components/ui';

// Header tabs: Home + the niches (Business, Career, Technology, Investment, Finance)
export default function NavTabs({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  return <Tabs label="Niches" items={buildNicheTabs(categories)} activeKey={activeTabKey(pathname)} trackPrefix="nav" />;
}
