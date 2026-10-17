'use client';
import { useEffect, useRef } from 'react';
import { cl } from '@/lib/utils';
import type { Ad } from '@/lib/types';

// Renders either an uploaded banner (tracked on click) or pasted ad code such as AdSense.
export default function AdView({ ad, width = 900 }: { ad: Ad; width?: number }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ad.html_code || !box.current) return;
    const frag = document.createRange().createContextualFragment(ad.html_code); // runs <script> tags
    box.current.replaceChildren(frag);
  }, [ad.html_code]);

  if (ad.html_code) return <div ref={box} data-track={`ad:${ad.id}`} className="flex justify-center overflow-hidden" />;

  const img = <img src={cl(ad.image_url, width)} alt={ad.name} loading="lazy" className="mx-auto h-auto max-w-full rounded-lg" />;
  return ad.link_url ? (
    <a href={ad.link_url} target="_blank" rel="sponsored noopener noreferrer" data-track={`ad:${ad.id}`}>{img}</a>
  ) : img;
}
