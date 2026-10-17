import { getAds } from '@/lib/data';
import type { AdPlacement } from '@/lib/types';
import AdView from './AdView';

// placement: header | sidebar | in_article | footer (set in Admin > Ads)
export default async function AdSlot({ placement, className = '' }: { placement: AdPlacement; className?: string }) {
  const ads = await getAds(placement);
  const ad = ads[0];
  if (!ad) return null;
  return (
    <aside aria-label="Advertisement" className={className}>
      <p className="mb-1 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">Advertisement</p>
      <AdView ad={ad} width={placement === 'sidebar' ? 420 : 1000} />
    </aside>
  );
}
