import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SITE_NAME } from '@/lib/api';
import navyLogo from '@/assets/navy_logo_transparent.png';
import whiteLogo from '@/assets/white_logo_transparent.png';
import { getCategories } from '@/lib/data';
import NavTabs from '@/components/NavTabs';
import Tracker from '@/components/Tracker';
import AdSlot from '@/components/AdSlot';
import SocialLinks from '@/components/SocialLinks';

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const categories = await getCategories();
  return (
    <>
      <Tracker />
      <header className="border-b-4 border-crimson bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 pt-4">
          <Link href="/" aria-label={`${SITE_NAME} home`} className="inline-flex items-center">
            <Image src={navyLogo} alt="" width={147} height={111} priority className="h-16 w-auto object-contain" />
            <span className="ml-2 max-w-36 font-serif text-sm font-extrabold leading-tight text-ink sm:max-w-none sm:text-lg">
              {SITE_NAME}
            </span>
          </Link>
          <form action="/search" className="hidden sm:block">
            <label htmlFor="q" className="sr-only">Search stories</label>
            <input id="q" name="q" placeholder="Search stories" className="input w-64" />
          </form>
        </div>
        <div className="mx-auto max-w-6xl px-4"><NavTabs categories={categories} /></div>
      </header>

      <div className="mx-auto max-w-6xl px-4 pt-6"><AdSlot placement="header" /></div>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>

      <footer className="mt-10 bg-ink text-white">
        <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
          <AdSlot placement="footer" />
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="flex items-center">
                <Image src={whiteLogo} alt="" width={147} height={111} className="h-16 w-auto object-contain" />
                <span className="ml-2 max-w-40 font-serif text-lg font-extrabold leading-tight text-white">
                  {SITE_NAME}
                </span>
              </div>
              <p className="mt-1 max-w-sm text-sm text-white/70">Stories that matter, as they happen.</p>
            </div>
            <SocialLinks title="" tone="dark" />
          </div>
          <p className="text-xs text-white/50">&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
