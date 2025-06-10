import React from 'react';
import {Button} from './ui/button';
import Link from 'next/link';
import CartSectionItem from './CartSectionItem';
import {ProductInterface} from '@/types/global-types';

const CartSection = async (cartData: {cartData: ProductInterface[]}) => {
  const {cartData: cart} = cartData;
  const totalCartItems = cart.reduce(
    (total, item) => total + (item.quantity ?? 1),
    0
  );

  const totalCartPrice = cart.reduce(
    (total, item) => total + item.price * (item.quantity ?? 1),
    0
  );

  return (
    <aside className="w-full lg:w-1/3 flex-shrink-0 lg:sticky lg:top-[120px] h-[75vh] p-4 bg-background rounded-xl shadow-xl border">
      <h2 className="text-2xl font-bold mb-6 ps-2 text-primary">Your Bucket</h2>

      <section
        className="overflow-y-auto h-[55vh] space-y-4 pr-1"
        style={{scrollbarWidth: 'thin'}}
      >
        <CartSectionItem />
      </section>

      <div className="mt-4 pt-4 border-t flex flex-col space-y-2">
        <div className="flex justify-between">
          <span>Total Items:</span>
          <span className="font-medium">{0 || totalCartItems}</span>
        </div>
        <div className="flex justify-between">
          <span>Total Price:</span>
          <span className="font-medium">Rs {0 || totalCartPrice}</span>
        </div>
        <Link href="/menu/bucket">
          <Button className="w-full mt-2">View Bucket</Button>
        </Link>
      </div>
    </aside>
  );
};

export default CartSection;
