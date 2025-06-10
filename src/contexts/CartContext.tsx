'use client';
import {ProductInterface} from '@/types/global-types';
import {setCookie} from 'cookies-next';
import {createContext, useContext, useState, useEffect} from 'react';

interface CartContextType {
  cart: ProductInterface[];
  setCart: (cart: ProductInterface[]) => void;
  addToCart: (product: ProductInterface) => void;
  removeFromCart: (slug: string) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({
  children,
  initialCart
}: {
  children: React.ReactNode;
  initialCart: ProductInterface[];
}) => {
  const [cart, setCart] = useState<ProductInterface[]>(initialCart || []);

  const addToCart = (item: ProductInterface) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.slug === item.slug);
      if (exists) {
        return prev.map((i) =>
          i.slug === item.slug ? {...i, quantity: (i.quantity ?? 1) + 1} : i
        );
      }
      return [...prev, {...item, quantity: 1}];
    });
  };

  const removeFromCart = (slug: string) => {
    setCart((prev) => prev.filter((p) => p.slug !== slug));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCookie('cart', JSON.stringify(cart), {maxAge: 60 * 60 * 24});
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{cart, setCart, addToCart, removeFromCart}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
