import '../globals.css';
import {ReactNode} from 'react';
import {Roboto_Condensed} from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {ThemeProvider} from 'next-themes';
import {CartProvider} from '@/contexts/CartContext';
import {getCartFromCookie} from '@/actions/getCartFromCookie.action';

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
  const cartData = await getCartFromCookie();
  console.log('cartdasta: ', cartData);
  return (
    <html lang="en">
      <body className={roboto_condensed.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CartProvider initialCart={cartData}>
            <div className="min-h-screen w-full bg-background">
              <Header />
              <main className="mx-auto px-4 py-6">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
