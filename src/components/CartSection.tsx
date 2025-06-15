'use client';
import React, {useState} from 'react';
import {Button} from './ui/button';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';

import {ScrollArea} from './ui/scroll-area';
import {useCart} from '@/contexts/CartContext';
import Image from 'next/image';

const CartSection = () => {
  const {cart, completeTotals, removeFromCart, updateQuantity} = useCart();
  const [open, setOpen] = useState(false);

  const CartContent = (
    <>
      <CardHeader>
        <CardTitle>Your Bucket</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[55vh] space-y-4 p-4">
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
                    <Link href={`/menu/${item.slug}`} className="bg-accent/60">
                      <Image
                        height={50}
                        width={50}
                        alt={item.name}
                        src={item.image}
                        className="rounded object-cover w-12 h-12"
                      />
                    </Link>
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <div className="flex gap-x-2 text-lg font-semibold text-muted-foreground">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateQuantity(item.slug, -1)}
                        >
                          -
                        </Button>
                        <span className="inline-block w-4 text-center">
                          {item.quantity ?? 1}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => updateQuantity(item.slug, 1)}
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
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <div className="flex justify-between gap-3 w-full text-sm">
          <div className="flex w-fit gap-x-1.5 justify-between">
            <span>Total Items:</span>
            <span className="font-medium">{completeTotals.totalItems}</span>
          </div>
          <div className="flex gap-x-1.5 justify-between">
            <span>Total Price:</span>
            <span className="font-medium">Rs {completeTotals.totalPrice}</span>
          </div>
        </div>
        <Link href="/menu/bucket" className="w-full">
          <Button className="w-full mt-2" onClick={() => setOpen(false)}>
            View Bucket
          </Button>
        </Link>
      </CardFooter>
    </>
  );

  return (
    <>
      {/* Bottom Sheet for mobile */}
      <div className="fixed bottom-4 right-8 lg:hidden z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="lg" className="rounded-full shadow-lg">
              Your Bucket
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] overflow-y-auto p-0">
            <SheetHeader>
              <SheetTitle className="sr-only">Your Bucket</SheetTitle>
            </SheetHeader>
            {CartContent}
          </SheetContent>
        </Sheet>
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden lg:block w-full md:w-80 xl:w-96 h-[88vh] sticky top-18">
        <Card className="h-full">{CartContent}</Card>
      </div>
    </>
  );
};

export default CartSection;
