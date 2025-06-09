import '../globals.css';
import {ReactNode} from 'react';
import {Roboto_Condensed} from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {ThemeProvider} from 'next-themes';
import {CartProvider} from '@/contexts/CartContext';
import {getCartFromCookie} from '@/actions/getCartFromCookie.action';
import CartSection from '@/components/CartSection';

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
  const cartData = await getCartFromCookie();
  // console.log('cartdasta: ', cartData);
  return (
    <html lang="en">
      <body className={roboto_condensed.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <CartProvider initialCart={cartData}>
            <div className="min-h-screen w-full bg-background">
              <Header />
              <main className="container mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8 bg-background">
                {children}
                <CartSection />
              </main>
              <Footer />
            </div>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
