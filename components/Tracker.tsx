'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { API_URL } from '@/lib/api';
import { getVisitorId, removeLegacyLocalStorage } from '@/lib/utils';
import { USE_DUMMY } from '@/lib/data';

type Payload = { type: 'view' | 'click'; path: string; target?: string; referrer?: string };

function send(payload: Payload): void {
  if (USE_DUMMY) return; // demo mode has no API to report to
  const body = JSON.stringify({ ...payload, visitorId: getVisitorId() });
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(`${API_URL}/track`, new Blob([body], { type: 'application/json' }));
    } else {
      fetch(`${API_URL}/track`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body, keepalive: true });
    }
  } catch { /* analytics must never break the page */ }
}

// Counts a page view on every route change, and a click on anything marked data-track="..."
export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    removeLegacyLocalStorage();
    send({ type: 'view', path: pathname, referrer: document.referrer });
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>('[data-track]');
      if (el?.dataset.track) send({ type: 'click', path: location.pathname, target: el.dataset.track });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  return null;
}
