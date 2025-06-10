import React from 'react';
import {ThemeProvider} from 'next-themes';
import {CartProvider} from '@/contexts/CartContext';
import {UserProvider} from '@/contexts/UserContext';
import {ProductInterface, UserContextValueType} from '@/types/global-types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface PageShellProps {
  children: React.ReactNode;
  authValue: UserContextValueType;
  cartData: ProductInterface[];
}

async function PageShell({children, authValue, cartData}: PageShellProps) {
  // console.log('authValue PageShell: ', authValue);
  return (
    <div className="min-h-screen w-full bg-background">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <UserProvider value={authValue}>
          <CartProvider initialCart={cartData}>
            <Header />
            {children}
            <Footer />
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

export default PageShell;
