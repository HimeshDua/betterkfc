'use client';
import {ProductInterface} from '@/types/global-types';
import {setCookie} from 'cookies-next';
import {createContext, useContext, useState, useEffect} from 'react';

interface CartContextType {
  cart: ProductInterface[];
  addToCart: (product: ProductInterface) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  completeTotals: {totalItems: number; totalPrice: number};
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

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.slug === itemId
            ? {...i, quantity: Math.max(0, (i.quantity ?? 1) + delta)}
            : i
        )
        .filter((i) => (i.quantity ?? 0) > 0)
    );
  };
  const clearCart = () => {
    setCart([]);
  };

  const totalItems: number = cart.reduce(
    (total, item) => total + (item.quantity ?? 1),
    0
  );

  const totalPrice: number = cart.reduce(
    (total, item) => total + item.price * (item.quantity ?? 1),
    0
  );

  const completeTotals = {totalItems, totalPrice};

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCookie('cart', JSON.stringify(cart), {maxAge: 60 * 60 * 24});
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        completeTotals
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
