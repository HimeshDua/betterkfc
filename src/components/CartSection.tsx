import React from 'react';
import {Button} from './ui/button';
import Link from 'next/link';
import CartSectionItem from './CartSectionItem';
import {ProductInterface} from '@/types/global-types';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import {ScrollArea} from './ui/scroll-area';

const CartSection = async (cartData: {cartData: ProductInterface[]}) => {
  const {cartData: cart} = cartData;
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
        <ScrollArea className="h-[55vh] space-y-4">
          <CartSectionItem />
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
