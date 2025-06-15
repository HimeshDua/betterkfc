'use client';

import React, {useMemo, useState} from 'react';
import {useCart} from '@/contexts/CartContext'; // Assuming this path is correct
import Image from 'next/image';
import Link from 'next/link';
import {ArrowLeft} from 'lucide-react'; // For the back arrow icon
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
// Separator is removed for consistent design
import {Alert, AlertDescription} from '@/components/ui/alert';
import {useSessions} from '@/contexts/UserContext'; // Assuming this path is correct
import {editCookies} from '@/lib/editCookie'; // Assuming this path is correct

const BucketPage: React.FC = () => {
  const {cart, removeFromCart, updateQuantity, clearCart} = useCart();
  const {user, valid} = useSessions();
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
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(requestData)
      });
      const data = await res.json();
      if (!data.success) {
        throw new Error(`${data.error}`);
      }
      setSuccess(true);
      clearCart();
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-background text-foreground min-h-[calc(100vh-64px)]">
      {/* Top Bar with Back Arrow and Title */}
      <div className="sticky top-0 z-20 bg-background py-4 px-4 sm:px-6 md:py-6 border-b border-border flex items-center justify-center shadow-sm">
        <Link
          href="/menu" // Assuming back to menu or previous page
          className="absolute left-4 p-2 rounded-full hover:bg-accent/20 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-foreground">
          Your Bucket
        </h1>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl space-y-8">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight">
            Review Your Order
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-2">
            Confirm your delicious selections and delivery details before
            placing your order.
          </p>
        </section>

        {!user && !valid ? (
          <Card className="w-full max-w-md mx-auto bg-card border border-border shadow-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl md:text-3xl text-foreground">
                Unauthenticated
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Sign in to proceed with checkout and save your details.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col px-6 pb-6 gap-4">
              <Button variant="default" className="w-full" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button
                variant="outline"
                className="w-full border-primary text-primary hover:bg-primary/10"
                asChild
              >
                <Link href="/signup">Create an Account</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full bg-card border border-border shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl text-foreground">
                Delivery Details
              </CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Please confirm your delivery address and phone number.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription className="text-red-500">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert className="mb-4 border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                  <AlertDescription>
                    Order placed successfully! Your bucket is now empty.
                  </AlertDescription>
                </Alert>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Delivery Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  aria-label="Delivery Address"
                  disabled={loading}
                  className="bg-input text-foreground border-input"
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  aria-label="Phone Number"
                  disabled={loading}
                  className="bg-input text-foreground border-input"
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t border-border mt-0">
              <div className="space-y-1 text-base text-muted-foreground">
                <p>
                  Total Items:{' '}
                  <span className="font-semibold text-foreground">
                    {totalItems}
                  </span>
                </p>
                <p>
                  Total Price:{' '}
                  <span className="font-semibold text-foreground">
                    Rs {totalPrice.toFixed(2)}
                  </span>
                </p>
              </div>
              <Button
                size="lg"
                className="w-full sm:w-auto text-lg px-6 py-3"
                disabled={
                  currentCart.length === 0 ||
                  loading ||
                  !address.trim() ||
                  !phone.trim()
                }
                aria-label="Place Order"
                onClick={handleSubmit}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </Button>
            </CardFooter>
          </Card>
        )}

        <section className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center">
            Your Delicious Selections
          </h2>
          {currentCart.length === 0 ? (
            <Card className="text-muted-foreground text-center text-lg py-10 rounded-xl border border-dashed bg-card">
              <CardContent className="p-4">
                No items in your bucket yet. Start adding some delicious food!
                <Link href="/menu">
                  <Button
                    variant="link"
                    className="mt-4 text-primary hover:underline"
                  >
                    Browse Menu
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentCart.map((item) => (
                <Card
                  key={item.slug}
                  className={`rounded-xl shadow-md border border-border overflow-hidden bg-card ${
                    !user && !valid && 'pointer-events-none opacity-60'
                  }`}
                >
                  <Link href={`/menu/${item.slug}`}>
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        onError={(e) => {
                          e.currentTarget.src = `https://placehold.co/400x300/6B7280/FFFFFF?text=Image+Error`;
                          e.currentTarget.alt = `Image for ${item.name} failed to load`;
                        }}
                      />
                    </div>
                  </Link>
                  <CardContent className="flex flex-col space-y-3 p-4">
                    <h3 className="font-semibold text-lg sm:text-xl text-foreground truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Price:{' '}
                      <span className="font-medium text-foreground">
                        Rs {item.price.toFixed(2)}
                      </span>
                    </p>
                    <p className="text-sm font-medium text-muted-foreground">
                      Quantity:{' '}
                      <span className="text-foreground">
                        {item.quantity ?? 1}
                      </span>
                    </p>
                    <p className="text-base font-semibold text-foreground">
                      Subtotal: Rs{' '}
                      {(item.price * (item.quantity ?? 1)).toFixed(2)}
                    </p>

                    <div className="flex justify-between items-center mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.slug, -1)}
                        disabled={(item.quantity || 1) <= 1}
                      >
                        -
                      </Button>
                      <span className="text-lg font-bold">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.slug, +1)}
                      >
                        +
                      </Button>
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
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default BucketPage;
