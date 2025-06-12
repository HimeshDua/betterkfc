'use client';

import {Card, CardContent} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {ScrollArea} from '@/components/ui/scroll-area';
import {Separator} from '@/components/ui/separator';
import {formatDistanceToNow} from 'date-fns';
import {useEffect, useState} from 'react';
import {UserInterface} from '@/types/global-types';
import {useSessions} from '@/contexts/UserContext';
import {useRouter} from 'next/navigation';
import Image from 'next/image';

export default function AdminOrdersPage() {
  const [isClient, setIsClient] = useState(false);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const {user} = useSessions();
  const router = useRouter();
  const [updatedStatus, setUpdatedStatus] = useState('');
  const orderRoute = '/api/admin/orders';

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(orderRoute);
        const data = await res.json();
        if (data.success) {
          setUsers(data.users);
        } else {
          throw new Error(data.error || 'Failed to fetch orders');
        }
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Loading orders...
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="p-6 text-center text-muted-foreground">
        No orders found.
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Order Management</h1>
      <ScrollArea className="h-[80vh] pr-2">
        {users.map((user) => (
          <Card key={user._id} className="mb-6 border shadow-sm rounded-2xl">
            <CardContent className="p-6 space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {user.email} — {user.phone}
                </p>
                <p className="text-sm text-muted-foreground">
                  Location: {user.location}
                </p>
                <p className="text-sm text-muted-foreground">
                  Last order:{' '}
                  {isClient && user.orders.length > 0
                    ? formatDistanceToNow(
                        new Date(user.orders[user.orders.length - 1].orderedAt)
                      ) + ' ago'
                    : 'Never'}
                </p>
                <p className="text-sm font-medium">
                  Total Orders: {user.orders.length}
                </p>
              </div>
              <Separator />
              <div className="space-y-6">
                {user.orders.map((order) => (
                  <Card
                    key={order._id}
                    className="bg-muted/40 border rounded-xl"
                  >
                    <CardContent className="p-4 space-y-4">
                      <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-2">
                        <div className="space-y-1">
                          <Badge
                            variant="outline"
                            className="capitalize text-sm"
                          >
                            {order.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground">
                            Ordered{' '}
                            {isClient &&
                              formatDistanceToNow(
                                new Date(order.orderedAt)
                              )}{' '}
                            ago
                          </p>
                          <p className="text-sm">
                            Delivery: {order.deliveryAddress}
                          </p>
                        </div>
                        <p className="font-semibold text-lg">
                          Rs. {order.totalAmount}
                        </p>
                      </div>

                      {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {order.products.map((prod, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center text-center"
                          >
                            <Image
                              height={64}
                              width={64}
                              src={prod.image}
                              alt={prod.name}
                              className="w-16 h-16 object-cover rounded shadow"
                            />
                            <p className="text-sm font-medium mt-1">
                              {prod.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Qty: {prod.quantity}
                            </p>
                          </div>
                        ))}
                      </div> */}

                      <div className="flex flex-wrap gap-2 pt-3">
                        {['pending', 'preparing', 'delivered', 'cancelled'].map(
                          (status) => (
                            <Button
                              key={status}
                              variant={
                                order.status === status ? 'default' : 'outline'
                              }
                              size="sm"
                              onClick={async () => {
                                if (status === order.status) return;

                                const res = await fetch(
                                  `${orderRoute}/${order._id}`,
                                  {
                                    method: 'PATCH',
                                    headers: {
                                      'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({status})
                                  }
                                );
                                const data = await res.json();
                                setUsers((prev) =>
                                  prev.map((u) => ({
                                    ...u,
                                    orders: u.orders.map((o) =>
                                      o._id === order._id
                                        ? {...o, status: data.order.status}
                                        : o
                                    )
                                  }))
                                );
                                // data.upStatus || status
                              }}
                            >
                              {status}
                            </Button>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </div>
  );
}
