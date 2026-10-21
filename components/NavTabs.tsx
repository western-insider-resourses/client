'use client';
import { usePathname } from 'next/navigation';
import { activeTabKey, buildNicheTabs } from '@/lib/tabs';
import { Tabs } from '@/components/ui';
import { useCategories } from '@/hooks/api/useCategories';
import { getErrorMessage } from '@/services/client';

// Header tabs: Home + the niches (Business, Career, Technology, Investment, Finance)
export default function NavTabs() {
  const pathname = usePathname();
  const query = useCategories();
  return (
    <>
      {query.error && <p role="alert" className="py-1 text-xs text-red-700">{getErrorMessage(query.error)}</p>}
      {query.data && <Tabs label="Niches" items={buildNicheTabs(query.data)} activeKey={activeTabKey(pathname)} trackPrefix="nav" />}
    </>
  );
}
