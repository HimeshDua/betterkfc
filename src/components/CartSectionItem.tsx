'use client';
import Image from 'next/image';
import React from 'react';
import {Button} from './ui/button';
import {useCart} from '@/contexts/CartContext';

function CartSectionItem() {
  const {cart, setCart, removeFromCart} = useCart();
  const updateValue = (itemId: string, delta: number) => {
    const updatedCart = cart
      .map((i) =>
        i.slug === itemId
          ? {...i, quantity: Math.max(0, (i.quantity ?? 1) + delta)}
          : i
      )
      .filter((i) => (i.quantity ?? 0) > 0);
    setCart(updatedCart);
  };

  return (
    <>
      {cart.length === 0 ? (
        <p className="text-muted-foreground text-center">
          Your bucket is empty.
        </p>
      ) : (
        cart.map((item) => (
          <div
            key={item.slug}
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
                    onClick={() => updateValue(item.slug, -1)}
                  >
                    -
                  </Button>
                  <p className="inline-block w-4 text-center">
                    {item.quantity ?? 1}
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => updateValue(item.slug, 1)}
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
                onClick={() => removeFromCart(item.slug)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default CartSectionItem;
