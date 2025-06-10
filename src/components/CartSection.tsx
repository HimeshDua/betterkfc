'use client';
import React from 'react';
import {Button} from './ui/button';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import {ScrollArea} from './ui/scroll-area';
import {useCart} from '@/contexts/CartContext';
import Image from 'next/image';

const CartSection = () => {
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

  const totalItems = cart.reduce(
    (total, item) => total + (item.quantity ?? 1),
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity ?? 1),
    0
  );

  return (
    <Card className="w-full md:w-80 lg:w-96 h-[88vh] sticky top-18">
      {/* w-full lg:w-1/3 flex-shrink-0 lg:sticky lg:top-[80px] h-[75vh]  */}
      <CardHeader>
        <CardTitle>Your Bucket</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[55vh] space-y-4 p-4">
          {/* <CartSectionItem /> */}
          {cart.length === 0 ? (
            <Card>
              <CardContent>
                <p className="text-muted-foreground text-center">
                  Your bucket is empty.
                </p>
              </CardContent>
            </Card>
          ) : (
            cart.map((item) => (
              <Card key={item.slug} className="overflow-hidden">
                <CardContent className="flex items-center justify-between gap-4">
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
                      <div className="flex gap-x-2 text-lg font-semibold text-muted-foreground">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateValue(item.slug, -1)}
                        >
                          -
                        </Button>
                        <span className="inline-block w-4 text-center">
                          {item.quantity ?? 1}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateValue(item.slug, 1)}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-muted-foreground">
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
                </CardContent>
              </Card>
            ))
          )}
          {/* <CartSectionItem /> */}
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="flex justify-between gap-3">
          <div className="flex w-fit gap-x-1.5 justify-between">
            <span>Total Items:</span>
            <span className="font-medium">{totalItems}</span>
          </div>
          <div className="flex gap-x-1.5 justify-between">
            <span>Total Price:</span>
            <span className="font-medium">Rs {totalPrice}</span>
          </div>
        </div>
        <Link href="/menu/bucket" className="w-full">
          <Button className="w-full mt-2">View Bucket</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CartSection;
