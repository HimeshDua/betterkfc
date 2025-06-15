import '@/styles/globals.css';
import {ReactNode} from 'react';
import {Roboto_Condensed} from 'next/font/google';
import PageShell from '@/components/provider/PageShell';
import {getCartFromCookie} from '@/actions/getCartFromCookie.action';
import verifyAuth from '@/lib/auth';
import {UserContextValueType} from '@/types/global-types';

const roboto_condensed = Roboto_Condensed({subsets: ['latin'], preload: true});

export const metadata = {
  title: 'Better KFC Clone',
  description: 'Delicious fast food. Built with ShadCN and Next.js',
  keywords: ['kfc', 'fast food', 'burger', 'chicken', 'Zinger', 'Fries'],
  authors: [{name: 'Himesh Dua', url: 'https://betterkfc.vercel.app'}],
  openGraph: {
    title: 'Better KFC Clone',
    description: 'Delicious fast food. Built with ShadCN and Next.js',
    type: 'article',
    locale: 'en_US',
    url: `https://betterkfc.vercel.app`
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Better KFC Clone',
    description: 'Delicious fast food. Built with ShadCN and Next.js',
    images: [`https://betterkfc.vercel.app`],
    creator: '@HimeshDua'
  },
  metadataBase: new URL('https://betterkfc.vercel.app')
};

export default async function RootLayout({children}: {children: ReactNode}) {
  const authValue: UserContextValueType = await verifyAuth(['user', 'admin']);
  const cartData = await getCartFromCookie();
  // console.log('authValue: ', authValue);

  // console.log('cartdasta: ', cartData);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto_condensed.className}>
        <PageShell authValue={authValue} cartData={cartData}>
          <main className="mx-auto px-4 py-6">{children}</main>
        </PageShell>
      </body>
    </html>
  );
}
