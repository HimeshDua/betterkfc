'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import {formatDistanceToNow} from 'date-fns';
import {toast} from 'sonner';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import {Badge} from '@/components/ui/badge';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';

import {
  MapPin,
  Clock,
  Users,
  DollarSign,
  ListOrdered,
  ClipboardList
} from 'lucide-react';

import {useSessions} from '@/contexts/UserContext';
import {OrderInterface, UserInterface} from '@/types/global-types';
import {categories} from '@/data/data';

export default function AdminDashboardPage() {
  const [isClient, setIsClient] = useState(false);
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [errorOrders, setErrorOrders] = useState('');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [productForm, setProductForm] = useState({
    name: '',
    price: '',
    image: '',
    description: '',
    category: ''
  });
  const [loadingProductUpload, setLoadingProductUpload] = useState(false);

  const {user} = useSessions();
  const router = useRouter();
  const orderRoute = '/api/admin/orders';
  const productUploadRoute = '/api/admin/products';

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function fetchOrdersData() {
      if (!user || user.role !== 'admin') return;
      setLoadingOrders(true);
      try {
        const res = await fetch(orderRoute);
        const data = await res.json();
        if (data.success) {
          setUsers(data.users);
        } else {
          setErrorOrders(data.error || 'Failed to fetch orders');
        }
      } catch (error: any) {
        console.error('Error fetching orders:', error.message);
        setErrorOrders('Failed to connect to server for orders.');
      } finally {
        setLoadingOrders(false);
      }
    }
    if (user?.role === 'admin') {
      fetchOrdersData();
    }
  }, [user]);

  const handleProductFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {id, value} = e.target;
    setProductForm((prev) => ({...prev, [id]: value}));
  };

  const handleProductCategoryChange = (value: string) => {
    setProductForm((prev) => ({...prev, category: value}));
  };

  const handleProductUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingProductUpload(true);
    try {
      const res = await fetch(productUploadRoute, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          ...productForm,
          price: parseFloat(productForm.price)
        })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Product Uploaded!', {
          description: `${productForm.name} has been added to the menu.`
        });
        setProductForm({
          name: '',
          price: '',
          image: '',
          description: '',
          category: ''
        });
        setIsProductModalOpen(false);
      } else {
        toast.error('Upload Failed', {
          description: data.error || 'Could not upload product.'
        });
      }
    } catch (error: any) {
      console.error('Error uploading product:', error);
      toast.error('Error', {
        description:
          error.message || 'An unexpected error occurred during product upload.'
      });
    } finally {
      setLoadingProductUpload(false);
    }
  };

  const handleOrderStatusUpdate = async (
    order: OrderInterface,
    status: string
  ) => {
    if (status === order.status) return;
    const orderId = order._id;

    try {
      const res = await fetch(`${orderRoute}/${orderId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({status})
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Order Status Updated', {
          description: `Order ${orderId} status set to ${data.order.status}.`
        });
      }

      setUsers((prev) =>
        prev.map((u) => ({
          ...u,
          orders: u.orders.map((o) =>
            o._id === order._id
              ? {
                  ...o,
                  status: data.order.status
                }
              : o
          )
        }))
      );
    } catch (error: any) {
      setUsers((prev) =>
        prev.map((u) => ({
          ...u,
          orders: u.orders.map((o) =>
            o._id === order._id ? {...o, status: o.status} : o
          )
        }))
      );

      toast.error('Error', {
        description: 'An unexpected error occurred during status update.'
      });
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="p-6 text-center text-muted-foreground">
        Access Denied. Redirecting...
      </div>
    );
  }

  const totalOrdersCount = users.reduce(
    (acc, user) => acc + user.orders.length,
    0
  );
  const pendingOrdersCount = users.reduce(
    (acc, user) =>
      acc + user.orders.filter((order) => order.status === 'pending').length,
    0
  );
  const totalRevenue = users.reduce(
    (acc, user) =>
      acc +
      user.orders.reduce((orderAcc, order) => orderAcc + order.totalAmount, 0),
    0
  );

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-4 px-6 md:py-6 md:px-10 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-0">
          Admin Dashboard
        </h1>
        <Dialog open={isProductModalOpen} onOpenChange={setIsProductModalOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-semibold min-w-[200px]"
            >
              Add New Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] md:max-w-[700px]">
            <DialogHeader>
              <DialogTitle>Upload New Product</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new item to your menu.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={handleProductUpload}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4"
            >
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="e.g., Zinger Burger"
                  value={productForm.name}
                  onChange={handleProductFormChange}
                  required
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="price">Price (Rs.)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="e.g., 599.00"
                  value={productForm.price}
                  onChange={handleProductFormChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>
              <div className="grid gap-2 col-span-full">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  type="url"
                  placeholder="https://example.com/product.jpg"
                  value={productForm.image}
                  onChange={handleProductFormChange}
                  required
                />
              </div>
              <div className="grid gap-2 col-span-full">
                <Label htmlFor="category">Category</Label>
                <Select
                  onValueChange={handleProductCategoryChange}
                  value={productForm.category}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.slug} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 col-span-full">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  placeholder="Crispy, spicy chicken fillet with fresh lettuce and a special sauce."
                  value={productForm.description}
                  onChange={handleProductFormChange}
                  required
                />
              </div>
              <DialogFooter className="col-span-full pt-4">
                <Button type="submit" disabled={loadingProductUpload}>
                  {loadingProductUpload ? 'Uploading...' : 'Upload Product'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </header>

      <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 bg-muted/50">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-sm border-l-4 border-primary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Orders
              </CardTitle>
              <ListOrdered className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {totalOrdersCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Across all customers
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-l-4 border-accent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pending Orders
              </CardTitle>
              <Clock className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                {pendingOrdersCount}
              </div>
              <p className="text-xs text-muted-foreground">
                Awaiting processing
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-l-4 border-secondary">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">
                Rs. {totalRevenue.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                From all delivered orders
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border shadow-lg rounded-lg flex flex-col bg-card">
          <CardHeader className="pb-4 pt-6 px-6 border-b border-border">
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
              <ClipboardList className="h-6 w-6 text-primary" /> Customer Orders
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage and update the status of incoming and past orders.
            </CardDescription>
            <div className="mt-4 flex gap-2">
              <Input
                placeholder="Search by customer email..."
                className="max-w-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {/* <Button variant="outline">Filter</Button> */}
            </div>
          </CardHeader>
          <CardContent className="p-6 flex-grow flex flex-col">
            {loadingOrders ? (
              <div className="flex-grow flex items-center justify-center text-muted-foreground">
                <p>Loading orders...</p>
              </div>
            ) : errorOrders ? (
              <div className="flex-grow flex items-center justify-center text-destructive">
                <p>{errorOrders}</p>
              </div>
            ) : !filteredUsers.length ? (
              <div className="flex-grow flex items-center justify-center text-muted-foreground">
                <p>No orders found.</p>
              </div>
            ) : (
              <div className="pr-2 space-y-6">
                {filteredUsers.map((user) => (
                  <Card
                    key={user._id}
                    className="group relative border bg-background shadow-sm rounded-md transition-all duration-300 hover:shadow-md"
                  >
                    <CardHeader className="p-4 border-b border-border/80 flex flex-col sm:flex-row justify-between sm:items-center bg-muted/40">
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold text-foreground">
                          {user.name}
                        </h3>
                      </div>
                      <Badge
                        variant="secondary"
                        className="px-3 py-1 text-sm font-semibold mt-2 sm:mt-0"
                      >
                        Total Orders: {user.orders.length}
                      </Badge>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 space-y-5">
                      <div className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:items-center sm:gap-4 flex-wrap">
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-medium text-foreground">
                            {user.location}
                          </span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="font-medium text-foreground">
                            {user.email}
                          </span>{' '}
                          &bull;{' '}
                          <span className="font-medium text-foreground">
                            {user.phone}
                          </span>
                        </p>
                        <p className="flex items-center gap-2 mt-2 sm:mt-0">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          Last order:{' '}
                          {isClient && user.orders.length > 0
                            ? formatDistanceToNow(
                                new Date(
                                  user.orders[user.orders.length - 1].orderedAt
                                ),
                                {addSuffix: true}
                              )
                            : 'Never'}
                        </p>
                      </div>
                      <Separator className="my-4" />
                      <div className="space-y-5">
                        {user.orders.map((order) => (
                          <Card
                            key={order._id}
                            className="bg-card border rounded-lg shadow-sm transition-shadow duration-200 hover:shadow-md"
                          >
                            <CardContent className="p-4 space-y-4">
                              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-border">
                                <div className="flex flex-col">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge
                                      variant={
                                        order.status === 'delivered'
                                          ? 'secondary'
                                          : order.status === 'cancelled'
                                          ? 'destructive'
                                          : 'default'
                                      }
                                      className="capitalize text-sm font-semibold min-w-[80px] justify-center"
                                    >
                                      {order.status}
                                    </Badge>
                                    <span className="text-sm font-medium text-muted-foreground">
                                      Order ID:{' '}
                                      <span className="font-mono text-xs text-foreground/80">
                                        {order._id.substring(0, 10)}...
                                      </span>
                                    </span>
                                  </div>
                                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-muted-foreground" />
                                    Ordered{' '}
                                    {isClient &&
                                      formatDistanceToNow(
                                        new Date(order.orderedAt),
                                        {addSuffix: false}
                                      )}{' '}
                                  </p>
                                  <p className="text-sm mt-1 flex items-center gap-1 text-muted-foreground">
                                    <MapPin className="w-4 h-4 text-primary" />
                                    Delivery:{' '}
                                    <span className="font-medium text-foreground">
                                      {order.deliveryAddress}
                                    </span>
                                  </p>
                                </div>
                                <p className="font-extrabold text-3xl text-primary mt-2 sm:mt-0">
                                  Rs. {order.totalAmount}
                                </p>
                              </div>

                              <h4 className="text-md font-semibold text-foreground mt-4 mb-2">
                                Items:
                              </h4>
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                                {order.products.map((prod, i) => (
                                  <div
                                    key={i}
                                    className="flex flex-col items-center text-center p-3 bg-muted rounded-lg border border-border/60 transition-transform transform hover:scale-105"
                                  >
                                    <Image
                                      height={72}
                                      width={72}
                                      src={prod.image}
                                      alt={prod.name}
                                      className="w-18 h-18 object-cover rounded-md border border-border/50 shadow-sm mb-2"
                                    />
                                    <p className="text-sm font-medium leading-tight text-foreground">
                                      {prod.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                      Qty: {prod.quantity}
                                    </p>
                                  </div>
                                ))}
                              </div>

                              <Separator className="my-4" />

                              <div className="flex flex-wrap gap-2 pt-2 justify-center sm:justify-start">
                                {[
                                  'pending',
                                  'preparing',
                                  'delivered',
                                  'cancelled'
                                ].map((statusOption) => (
                                  <Button
                                    key={statusOption}
                                    variant={
                                      order.status === statusOption
                                        ? 'default'
                                        : 'outline'
                                    }
                                    size="sm"
                                    onClick={() =>
                                      handleOrderStatusUpdate(
                                        order,
                                        statusOption
                                      )
                                    }
                                    className="capitalize min-w-[90px]"
                                  >
                                    {statusOption}
                                  </Button>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
