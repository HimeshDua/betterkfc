'use client';

import React from 'react';
import ProductCardMenu from '@/components/ProductCardMenu';
import {products} from '@/data/products';
import {useCart} from '@/contexts/CartContext';
import {addToCookieCart} from '@/actions/addToCookieCart.action';

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

export default function MenuPage() {
  const {addToCart} = useCart();
  return (
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
                  onAdd={async () => {
                    await addToCookieCart(item);
                    addToCart(item);
                  }}
                />
              ))}
            </div>
          </section>
        );
      })}
    </section>
  );
}
