import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { SITE_NAME, SITE_URL } from '@/lib/site';
import QueryProvider from '@/services/query';

const serif = Playfair_Display({ subsets: ['latin'], variable: '--font-serif', weight: ['600', '700', '800'] });
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: `Latest stories from ${SITE_NAME}.`,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body><QueryProvider>{children}</QueryProvider></body>
    </html>
  );
}
