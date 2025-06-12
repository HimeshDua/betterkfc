'use client';
import React from 'react';
import {ThemeProvider} from 'next-themes';
import {CartProvider} from '@/contexts/CartContext';
import {UserProvider} from '@/contexts/UserContext';
import {ProductInterface, UserContextValueType} from '@/types/global-types';
import Header from '@/components/Header';
import {useRouter} from 'next/navigation';
// import Footer from '@/components/Footer';

interface PageShellProps {
  children: React.ReactNode;
  authValue: UserContextValueType;
  cartData: ProductInterface[];
}

async function AdminPageShell({children, authValue, cartData}: PageShellProps) {
  // console.log('authValue PageShell: ', authValue);

  // const isAdmin = authValue.user?.role === 'admin';
  // if (!isAdmin) {
  //   useRouter().back();
  // }

  return (
    <div className="min-h-screen w-full bg-background">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <UserProvider value={authValue}>
          <CartProvider initialCart={cartData}>
            <Header />
            {children}
            {/* <Footer /> */}
          </CartProvider>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}

export default AdminPageShell;
