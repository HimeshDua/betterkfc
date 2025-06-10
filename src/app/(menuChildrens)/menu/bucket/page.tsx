'use client';

import React, {useMemo, useState} from 'react';
import {useCart} from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';

const BucketPage: React.FC = () => {
  const {cart} = useCart();
  const currentCart = cart || [];
  const totalItems = useMemo(
    () => currentCart.reduce((sum, i) => sum + (i.quantity ?? 1), 0),
    [currentCart]
  );
  const totalPrice = useMemo(
    () => currentCart.reduce((sum, i) => sum + i.price * (i.quantity ?? 1), 0),
    [currentCart]
  );
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <main className="max-w-4xl mx-auto flex flex-col gap-10 py-10">
      <h1 className="text-4xl font-bold text-center text-primary mb-4">
        Your Bucket
      </h1>
      <section className="bg-card p-6 rounded-2xl shadow-lg border max-w-2xl mx-auto w-full">
        <div className="flex flex-col space-y-1.5 p-0 mb-4">
          <h3 className="text-2xl font-semibold">Delivery Details</h3>
          <p className="text-sm text-muted-foreground">
            Please provide your delivery information.
          </p>
        </div>
        <div className="p-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Delivery Address"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Phone Number"
            />
          </div>
          <div className="mb-6">
            <textarea
              placeholder="Order Notes (optional)"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Order Notes"
            />
          </div>
        </div>
        <div className="flex items-center p-0 justify-between pt-4 border-t border-border mt-4">
          <div className="space-y-1">
            <p>
              Total Items:{' '}
              <span className="font-medium text-foreground">{totalItems}</span>
            </p>
            <p>
              Total Price:{' '}
              <span className="font-medium text-foreground">
                Rs {totalPrice.toFixed(2)}
              </span>
            </p>
          </div>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-8 py-3 text-lg bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={currentCart.length === 0}
            aria-label="Place Order"
          >
            Place Order
          </button>
        </div>
      </section>
      <section className="w-full">
        <h2 className="text-2xl font-semibold mb-6">Your Items</h2>
        {currentCart.length === 0 ? (
          <p className="text-muted-foreground text-center text-lg py-10 rounded-lg border border-dashed">
            No items in your bucket yet. Start adding some delicious food!
          </p>
        ) : (
          <div className="flex overflow-x-auto space-x-6 pb-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {currentCart.map((item) => (
              <div
                key={item.slug}
                className="flex-shrink-0 w-72 bg-card rounded-xl shadow-md border overflow-hidden"
              >
                <Link href={item.slug}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={288}
                    height={180}
                    className="rounded-t-xl object-cover w-full h-48"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/288x180/6B7280/FFFFFF?text=Image+Error`;
                      e.currentTarget.alt = `Image for ${item.name} failed to load`;
                    }}
                  />
                </Link>
                <div className="p-4 flex flex-col space-y-3">
                  <h3 className="font-semibold text-lg truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Rs {item.price.toFixed(2)} each
                  </p>
                  <p className="font-medium text-base">
                    Quantity:{' '}
                    <span className="text-foreground">
                      {item.quantity ?? 1}
                    </span>
                  </p>
                  <p className="font-medium text-base">
                    Subtotal:{' '}
                    <span className="text-foreground">
                      Rs {(item.price * (item.quantity ?? 1)).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default BucketPage;
