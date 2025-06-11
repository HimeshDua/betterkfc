'use client';

import React from 'react';
import ProductCardMenu from '@/components/ProductCardMenu';
import {products} from '@/data/data';
import {useCart} from '@/contexts/CartContext';
import {addToCookieCart} from '@/actions/addToCookieCart.action';

const categories = [
  {slug: 'all', name: 'All Products'},
  {slug: 'promotion', name: 'Promotion'},
  {slug: 'everyday-value', name: 'Everyday Value'},
  {slug: 'ala-cc', name: 'Ala-Carte-&-Combos'},
  {slug: 'signature', name: 'Signature'},
  {slug: 'sharing', name: 'Sharing'},
  {slug: 's-n-b', name: 'Snacks-&-Beverages'},
  {slug: 'mid', name: 'Midnight (Start at 12 am)'}
];

export default function MenuPage() {
  const {addToCart} = useCart();
  return (
    <section className="flex-1 lg:w-3/5">
      {categories.map((category) => {
        if (category.slug === 'all') return null;

        const items = products.filter(
          (product) => product.category === category.slug
        );
        if (!items.length) return null;

        return (
          <section
            key={category.slug}
            id={category.slug}
            className="mb-12 pt-4"
          >
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              {category.name}
            </h2>
            <div className="grid gap-6 grid-cols-2 md:grid-cols-3">
              {items.map((item) => (
                <ProductCardMenu
                  key={item.slug}
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
