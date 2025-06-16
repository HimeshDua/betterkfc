'use client';

import React, {useEffect, useState} from 'react';
import Link from 'next/link';
import {ArrowLeft} from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {Alert, AlertDescription} from '@/components/ui/alert';
import {Badge} from '@/components/ui/badge';
import {Separator} from '@/components/ui/separator';
import {ScrollArea} from '@/components/ui/scroll-area';
import {useSessions} from '@/contexts/UserContext';
import Image from 'next/image';
import {formatDistanceToNow} from 'date-fns';

export default function ProfilePage() {
  const {user, valid} = useSessions();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.location || '');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    async function handleOrdersList() {
      if (!user?.userId) return;
      try {
        const res = await fetch('/api/u/orders', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({userId: user.userId})
        });
        const data = await res.json();
        if (data.success && Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          setError(data.error || 'No orders found.');
        }
      } catch (error: any) {
        setError(error.message || 'Failed to fetch orders');
      }
    }

    handleOrdersList();
  }, [user?.userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      setError('All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const res = await new Promise((resolve) =>
        setTimeout(() => resolve({success: true}), 1500)
      );
      if ((res as any).success) setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Error updating profile.');
    } finally {
      setLoading(false);
    }
  };

  if (!valid) {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center">
        <Card className="max-w-md w-full text-center p-6">
          <CardTitle className="text-2xl">Access Denied</CardTitle>
          <CardDescription>
            You must sign in to view your profile.
          </CardDescription>
          <CardContent className="mt-4 space-y-3">
            <Button asChild className="w-full">
              <Link href="/signin">Sign In</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/signup">Create Account</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="bg-background container mx-auto text-foreground min-h-[90vh] px-4 py-8 md:px-12 lg:px-20">
      <div className="mb-10 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Home
        </Link>
        <h1 className="text-2xl font-bold">My Profile</h1>
      </div>

      {/* Personal Info */}
      <Card className="mb-10">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert className="mb-4 border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
              <AlertDescription>Profile updated successfully!</AlertDescription>
            </Alert>
          )}
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} disabled />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="col-span-full">
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? 'Updating...' : 'Save Changes'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Orders History */}
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>Review your past orders</CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-muted-foreground">
              You haven’t placed any orders yet.
            </p>
          ) : (
            <ScrollArea className="max-h-[70vh] pr-2">
              <div className="space-y-6">
                {orders.map((order) => (
                  <Card key={order._id} className="border bg-muted/10">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex flex-wrap justify-between items-center gap-4">
                        <div>
                          <Badge className="capitalize">{order.status}</Badge>
                          <p className="text-sm text-muted-foreground">
                            Ordered{' '}
                            {formatDistanceToNow(new Date(order.orderedAt))} ago
                          </p>
                          <p className="text-sm">
                            Delivery: {order.deliveryAddress}
                          </p>
                        </div>
                        <div className="font-semibold text-lg text-right">
                          Rs. {order.totalAmount}
                        </div>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {order.products.map((prod: any, i: number) => (
                          <div key={i} className="text-center">
                            <Image
                              src={prod.image}
                              alt={prod.name}
                              width={64}
                              height={64}
                              className="mx-auto rounded shadow object-cover"
                            />
                            <p className="text-sm font-medium mt-1">
                              {prod.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {prod.quantity}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
