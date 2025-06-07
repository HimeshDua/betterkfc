'use client';
import React, {useState, useMemo} from 'react';
import {Button} from '@/components/ui/button';
import ProductCardMenu from '@/components/ProductCardMenu';
import {products} from '@/data/products';

const categories = [
  {id: 'all', name: 'All Products'},
  {id: 'promotion', name: 'Promotion'},
  {id: 'everyday-value', name: 'Everyday Value'},
  {id: 'ala-cc', name: 'Ala-Carte-&-Combos'},
  {id: 'signature', name: 'Signature'},
  {id: 'sharing', name: 'Sharing'},
  {id: 's-n-b', name: 'Snacks-&-Beverages'},
  {id: 'mid', name: 'Midnight (Start at 12 am)'}
];

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  quantity?: number;
}

export default function MenuPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const groupedProducts = useMemo(() => {
    const grouped: {[key: string]: Product[]} = {};
    products.forEach((product) => {
      if (!grouped[product.category]) {
        grouped[product.category] = [];
      }
      grouped[product.category].push(product);
    });
    return grouped;
  }, []);

  const addToCart = (item: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? {...i, quantity: (i.quantity ?? 0) + 1} : i
        );
      }
      return [...prev, {...item, quantity: 1}];
    });
  };

  const updateItemQuantity = (itemId: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev
        .map((i) =>
          i.id === itemId
            ? {...i, quantity: newQuantity > 0 ? newQuantity : 0}
            : i
        )
        .filter((i) => (i.quantity ?? 0) > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartItems = useMemo(
    () => cartItems.reduce((total, item) => total + (item.quantity ?? 0), 0),
    [cartItems]
  );

  const totalCartPrice = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * (item.quantity ?? 0),
        0
      ),
    [cartItems]
  );

  return (
    <main className="container mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8 bg-background">
      <section className="flex-1 lg:w-3/4">
        {categories.map((category) => {
          if (category.id === 'all') return null;
          const items = groupedProducts[category.id];
          if (!items || items.length === 0) return null;

          return (
            <section key={category.id} id={category.id} className="mb-12 pt-4">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {category.name}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {items.map((item) => (
                  <article key={item.id}>
                    <ProductCardMenu
                      id={item.id}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      description={item.description}
                      onAdd={() => addToCart(item)}
                    />
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        {Object.values(groupedProducts).every((arr) => arr.length === 0) && (
          <p className="text-center py-10 text-muted-foreground text-xl">
            No products available in the menu.
          </p>
        )}
      </section>

      <aside className="w-full  lg:w-1/4 flex-shrink-0">
        <div className="lg:sticky lg:top-[180px] bg-card p-4 lg:p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-foreground">
            Your Bucket
          </h2>
          {cartItems.length === 0 ? (
            <p className="text-muted-foreground">Your bucket is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-2"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {item.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Qty: {item.quantity}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Price: Rs. {item.price * (item.quantity ?? 0)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateItemQuantity(item.id, (item.quantity ?? 0) - 1)
                      }
                      aria-label="Decrease quantity"
                    >
                      -
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateItemQuantity(item.id, (item.quantity ?? 0) + 1)
                      }
                      aria-label="Increase quantity"
                    >
                      +
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}

              <footer className="pt-4 border-t-2 border-dashed border-border">
                <div className="flex justify-between text-lg font-bold text-foreground">
                  <span>Total Items:</span>
                  <span>{totalCartItems}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-foreground mt-2">
                  <span>Total Price:</span>
                  <span>Rs. {totalCartPrice}</span>
                </div>
                <Button className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                  Proceed to Checkout
                </Button>
              </footer>
            </div>
          )}
        </div>
      </aside>
    </main>
  );
}
