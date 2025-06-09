'use client';

import React, {useMemo, memo} from 'react';
import {useCart} from '@/contexts/CartContext';
import {Button} from './ui/button';
import Image from 'next/image';
import Link from 'next/link';

const CartSection = () => {
  const {cart, setCart, removeFromCart} = useCart();

  const totalCartItems = useMemo(
    () => cart.reduce((total, item) => total + (item.quantity ?? 1), 0),
    [cart]
  );

  const totalCartPrice = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + item.price * (item.quantity ?? 1),
        0
      ),
    [cart]
  );

  const updateValue = (itemId: string, delta: number) => {
    const updatedCart = cart
      .map((i) =>
        i.id === itemId
          ? {...i, quantity: Math.max(0, (i.quantity ?? 1) + delta)}
          : i
      )
      .filter((i) => (i.quantity ?? 0) > 0);
    setCart(updatedCart);
  };

  return (
    <aside className="w-full lg:w-1/4 flex-shrink-0 lg:sticky lg:top-[190px] h-[75vh] p-4 bg-background rounded-xl shadow-xl border">
      <h2 className="text-2xl font-bold mb-6 text-primary">🧺 Your Bucket</h2>

      <section className="overflow-y-auto h-[55vh] space-y-4 pr-1">
        {cart.length === 0 ? (
          <p className="text-muted-foreground text-center">
            Your bucket is empty.
          </p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 p-3 rounded-lg border hover:shadow-sm transition"
            >
              <div className="flex items-center gap-3">
                <Image
                  height={50}
                  width={50}
                  alt={item.name}
                  src={item.image}
                  className="rounded object-cover w-12 h-12"
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <span className="flex gap-x-2 text-lg font-semibold text-center text-muted-foreground">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateValue(item.id, -1)}
                    >
                      -
                    </Button>
                    <p className="inline-block w-4 text-center">
                      {item.quantity ?? 1}
                    </p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => updateValue(item.id, 1)}
                    >
                      +
                    </Button>
                  </span>
                </div>
              </div>

              <div>
                <p className="font-semibold text-end text-muted-foreground">
                  Rs {item.price ?? 0}
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))
        )}
      </section>

      <div className="flex justify-between items-start mt-6 border-t pt-4">
        <div className="space-y-1">
          <p className="text-base">
            <span className="font-medium">🛒 Total Items:</span>{' '}
            {totalCartItems}
          </p>
          <p className="text-base">
            <span className="font-medium">💰 Total Price:</span> Rs{' '}
            {totalCartPrice}
          </p>
        </div>
        <Link href="/menu/bucket">
          <Button className="ml-4">View Bucket</Button>
        </Link>
      </div>
    </aside>
  );
};

export default memo(CartSection);
