import '../globals.css';
import {ReactNode} from 'react';
import {Inter} from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {ThemeProvider} from 'next-themes';

const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: 'KFC Pakistan Clone',
  description: 'Delicious fast food. Built with ShadCN and Next.js'
};

export default function AdminLayout({children}: {children: ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="flex flex-col min-h-screen">
            <Header />
            <h1>This is admin header</h1>
            <main className="flex-1 container mx-auto px-4 py-6">
              {children}
            </main>
            <h1>This is admin footer</h1>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
