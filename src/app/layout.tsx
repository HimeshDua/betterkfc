import './globals.css';
import {ReactNode} from 'react';
import {Roboto_Condensed} from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {ThemeProvider} from 'next-themes';

const roboto_condensed = Roboto_Condensed({subsets: ['latin'], preload: true});

export const metadata = {
  title: 'KFC Pakistan Clone',
  description: 'Delicious fast food. Built with ShadCN and Next.js'
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <body className={roboto_condensed.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="min-h-screen w-full bg-background">
            <Header />
            <main className="mx-auto px-4 py-6">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
