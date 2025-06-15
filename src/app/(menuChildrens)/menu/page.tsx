import React from 'react';
import ProductCardMenu from '@/components/ProductCardMenu';
import {products} from '@/data/data';

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
  const hour = new Date().getHours();
  const midNight = hour >= 0 && hour <= 4;

  return (
    <section>
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
            className={`mb-12 pt-4 px-0 sm:px-4 md:px-4
                ${
                  category.slug === 'mid' &&
                  !midNight &&
                  'pointer-events-none opacity-50 '
                }`}
          >
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              {category.name}
            </h2>
            <div className="grid gap-2 sm:gap-3 md:gap-4 lg:gap-5 grid-cols-2 md:grid-cols-3">
              {items.map((item) => (
                <ProductCardMenu key={item.slug} item={item} />
              ))}
            </div>
          </section>
        );
      })}
    </section>
  );
}
