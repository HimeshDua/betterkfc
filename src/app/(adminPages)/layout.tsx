import '@/styles/globals.css';
import {ReactNode} from 'react';
import {Roboto_Condensed} from 'next/font/google';
import AdminPageShell from '@/components/provider/AdminPageShell';
import {getCartFromCookie} from '@/actions/getCartFromCookie.action';
import {UserContextValueType} from '@/types/global-types';
import verifyAuth from '@/lib/auth';

const roboto_condensed = Roboto_Condensed({subsets: ['latin'], preload: true});

export const metadata = {
  title: 'Admin - Better KFC Clone',
  description: 'Delicious fast food. Built with ShadCN and Next.js',
  keywords: ['kfc', 'fast food', 'burger', 'chicken', 'Zinger', 'Fries'],
  authors: [{name: 'Himesh Dua', url: 'https://betterkfc.vercel.app/admin'}],
  openGraph: {
    title: 'Admin - Better KFC Clone',
    description: 'Delicious fast food. Built with ShadCN and Next.js',
    type: 'article',
    locale: 'en_US',
    url: `https://betterkfc.vercel.app/admin`
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Admin - Better KFC Clone',
    description: 'Delicious fast food. Built with ShadCN and Next.js',
    images: [`https://betterkfc.vercel.app/admin`],
    creator: '@HimeshDua'
  },
  metadataBase: new URL('https://betterkfc.vercel.app/admin')
};

export default async function AdminPageLayout({
  children
}: {
  children: ReactNode;
}) {
  const authValue: UserContextValueType = await verifyAuth(['admin']);
  const cartData = await getCartFromCookie();
  // console.log('authValue: ', authValue);

  // console.log('cartdasta: ', cartData);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={roboto_condensed.className}>
        <AdminPageShell authValue={authValue} cartData={cartData}>
          <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
        </AdminPageShell>
      </body>
    </html>
  );
}
