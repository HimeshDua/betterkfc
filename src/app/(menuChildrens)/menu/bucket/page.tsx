'use client';

import React, {useMemo, useState} from 'react';
import {useCart} from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {useSessions} from '@/contexts/UserContext';
import {editCookies} from '@/lib/editCookie';

const BucketPage: React.FC = () => {
  const {cart} = useCart();
  const {user} = useSessions();
  const storedAddress = user?.location;
  const storedPhone = user?.phone;
  const currentCart = cart || [];
  const totalItems = useMemo(
    () => currentCart.reduce((sum, i) => sum + (i.quantity ?? 1), 0),
    [currentCart]
  );
  const totalPrice = useMemo(
    () => currentCart.reduce((sum, i) => sum + i.price * (i.quantity ?? 1), 0),
    [currentCart]
  );
  const [address, setAddress] = useState(storedAddress ?? '');
  const [phone, setPhone] = useState(storedPhone ?? '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    setError(null);
    setSuccess(false);
    if (!address.trim() || !phone.trim()) {
      setError('Please provide both address and phone number.');
      return;
    }
    setLoading(true);
    try {
      const requestData = {address, phone, currentCart, totalPrice};
      await editCookies(address.trim(), phone.trim());
      // console.log('requestData: ', requestData);
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestData)
      });
      const data = await res.json();
      // console.log('requestData bodiiiii: ', res);
      if (!data.success) {
        console.log(data.error);
        throw new Error(`${data.error}`);
      }
      console.log(data.message);
      setSuccess(true);
      setAddress('');
      setPhone('');
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    // <main
    //   className="sm:max-w-xl md:max-w-4xl  mx-auto flex flex-col gap-y-10 py-10  xl:max-w-4xl
    //     [@media(min-width:581px)]:[@media(max-width:640px)]:w-[34rem]
    //     [@media(min-width:481px)]:[@media(max-width:580px)]:w-[29rem]
    //     [@media(min-width:421px)]:[@media(max-width:480px)]:w-[26rem]
    //     [@media(max-width:420px)]:w-[20rem]
    //     [@media(max-width:1200px)]:w-[48rem]
    //     [@media(max-width:1150px)]:w-[46rem]
    //     [@media(min-width:1024px)]:[@media(max-width:1060px)]:w-[43rem]
    // "
    <main className="mx-auto flex flex-col gap-y-10 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-4">
        Your Bucket
      </h1>

      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Delivery Details</CardTitle>
          <CardDescription>
            Please provide your delivery information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="default" className="mb-4 border-green-500">
              <AlertDescription className="text-green-500">
                Order placed successfully!
              </AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              aria-label="Delivery Address"
              disabled={loading}
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-label="Phone Number"
              disabled={loading}
            />
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4">
          <div className="space-y-1 text-sm">
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
          <Button
            size="lg"
            className="w-full sm:w-auto"
            disabled={currentCart.length === 0 || loading}
            aria-label="Place Order"
            onClick={handleSubmit}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </Button>
        </CardFooter>
      </Card>

      <section className="w-full">
        <h2 className="text-2xl font-semibold mb-6">Your Items</h2>
        {currentCart.length === 0 ? (
          <Card className="text-muted-foreground text-center text-lg py-10 rounded-lg border border-dashed">
            <CardContent>
              No items in your bucket yet. Start adding some delicious food!
            </CardContent>
          </Card>
        ) : (
          <div className="flex overflow-x-auto space-x-4 pb-4 -mx-4 px-4 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {currentCart.map((item) => (
              <Card
                key={item.slug}
                className="flex-shrink-0 w-64 sm:w-72 rounded-xl shadow-md border overflow-hidden"
              >
                <Link href={item.slug}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={288}
                    height={180}
                    className="rounded-t-xl object-cover w-full h-40 sm:h-48"
                    onError={(e) => {
                      e.currentTarget.src = `https://placehold.co/288x180/6B7280/FFFFFF?text=Image+Error`;
                      e.currentTarget.alt = `Image for ${item.name} failed to load`;
                    }}
                  />
                </Link>
                <CardContent className="flex flex-col space-y-2 p-4">
                  <h3 className="font-semibold text-base sm:text-lg truncate">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Rs {item.price.toFixed(2)} each
                  </p>
                  <p className="text-sm font-medium">
                    Quantity: <span>{item.quantity ?? 1}</span>
                  </p>
                  <p className="text-sm font-medium">
                    Subtotal:{' '}
                    <span>
                      Rs {(item.price * (item.quantity ?? 1)).toFixed(2)}
                    </span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default BucketPage;
