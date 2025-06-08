'use client';

import React, {useState} from 'react';
import ProductCardMenu from '@/components/ProductCardMenu';
import {products} from '@/data/products';
import CartSection from '@/components/CartSection';

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
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  return (
    <main className="container mx-auto py-8 px-4 flex flex-col lg:flex-row gap-8 bg-background">
      <section className="flex-1 lg:w-3/4">
        {categories.map((category) => {
          if (category.id === 'all') return null;

          const items = products.filter(
            (product) => product.category === category.id
          );
          if (!items.length) return null;

          return (
            <section key={category.id} id={category.id} className="mb-12 pt-4">
              <h2 className="text-3xl font-bold mb-6 text-foreground">
                {category.name}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {items.map((item) => (
                  <ProductCardMenu
                    key={item.id}
                    {...item}
                    onAdd={() => setSelectedItem(item)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </section>

      <CartSection item={selectedItem} />
    </main>
  );
}
