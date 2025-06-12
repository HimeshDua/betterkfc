import '@/styles/globals.css';
import {ReactNode} from 'react';
import {Roboto_Condensed} from 'next/font/google';
import CartSection from '@/components/CartSection';
import PageShell from '@/components/provider/PageShell';
import {getCartFromCookie} from '@/actions/getCartFromCookie.action';
import {UserContextValueType} from '@/types/global-types';
import verifyAuth from '@/lib/auth';

const roboto_condensed = Roboto_Condensed({subsets: ['latin'], preload: true});

export const metadata = {
  title: 'Menu - Better KFC Clone',
  description: 'Delicious fast food. Built with ShadCN and Next.js',
  keywords: ['kfc', 'fast food', 'burger', 'chicken', 'Zinger', 'Fries'],
  authors: [{name: 'Himesh Dua', url: 'https://betterkfc.vercel.app/menu'}],
  openGraph: {
    title: 'Menu - Better KFC Clone',
    description: 'Delicious fast food. Built with ShadCN and Next.js',
    type: 'article',
    locale: 'en_US',
    url: `https://betterkfc.vercel.app/menu`
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Menu - Better KFC Clone',
    description: 'Delicious fast food. Built with ShadCN and Next.js',
    images: [`https://betterkfc.vercel.app/menu`],
    creator: '@HimeshDua'
  },
  metadataBase: new URL('https://betterkfc.vercel.app/menu')
};

export default async function MenuPageLayout({
  children
}: {
  children: ReactNode;
}) {
  const authValue: UserContextValueType = await verifyAuth(['user', 'admin']);
  const cartData = await getCartFromCookie();
  // console.log('authValue: ', authValue);
  // console.log('cartdasta: ', cartData);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto_condensed.className}>
        <PageShell authValue={authValue} cartData={cartData}>
          <main className="min-h-[90vh] max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
            {children}
            <CartSection />
          </main>
        </PageShell>
      </body>
    </html>
  );
}
