'use client';

import React, {useEffect, useMemo, useState} from 'react';
import {Button} from './ui/button';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  quantity?: number;
}

function CartSection({item}: {item: Product | null}) {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    if (item) {
      setCartItems((prev) => {
        const exists = prev.find((i) => i.id === item.id);
        if (exists) {
          return prev.map((i) =>
            i.id === item.id ? {...i, quantity: (i.quantity ?? 0) + 1} : i
          );
        }
        return [...prev, {...item, quantity: 1}];
      });
    }
  }, [item]);

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.id === itemId ? {...i, quantity: Math.max(0, newQuantity)} : i
        )
        .filter((i) => (i.quantity ?? 0) > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartItems = useMemo(
    () => cartItems.reduce((total, item) => total + (item.quantity ?? 0), 0),
    [cartItems]
  );

  const totalCartPrice = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * (item.quantity ?? 0),
        0
      ),
    [cartItems]
  );

  return (
    <aside className="w-full lg:w-1/4 flex-shrink-0">
      <div className="lg:sticky lg:top-[180px] bg-card p-4 lg:p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Your Bucket</h2>
        {cartItems.length === 0 ? (
          <p className="text-muted-foreground">Your bucket is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Price: Rs. {item.price * (item.quantity ?? 0)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateItemQuantity(item.id, (item.quantity ?? 0) - 1)
                    }
                    aria-label="Decrease quantity"
                  >
                    -
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      updateItemQuantity(item.id, (item.quantity ?? 0) + 1)
                    }
                    aria-label="Increase quantity"
                  >
                    +
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    aria-label="Remove item"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            <footer className="pt-4 border-t-2 border-dashed border-border">
              <div className="flex justify-between text-lg font-bold text-foreground">
                <span>Total Items:</span>
                <span>{totalCartItems}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-foreground mt-2">
                <span>Total Price:</span>
                <span>Rs. {totalCartPrice}</span>
              </div>
              <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                Proceed to Checkout
              </Button>
            </footer>
          </div>
        )}
      </div>
    </aside>
  );
}

export default CartSection;
