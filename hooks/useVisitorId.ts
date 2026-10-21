'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'western-insider-visitor-id';

function createId(): string {
  return typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function useVisitorId(): string {
  const [visitorId, setVisitorId] = useState('');

  useEffect(() => {
    let id: string;
    try {
      id = localStorage.getItem(STORAGE_KEY) || createId();
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      id = createId();
    }
    setVisitorId(id);
  }, []);

  return visitorId;
}
