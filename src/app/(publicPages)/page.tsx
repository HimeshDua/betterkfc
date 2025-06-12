'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import ProductCardHome from '@/components/ProductCardHome';
import ProductCardCircle from '@/components/ProductCardCircle';
import CartModal from '@/components/CartModal';
import {ProductInterface} from '@/types/global-types';
import {exploremenu, newsLetterImages} from '@/data/data';

export default function Home() {
  const [cartItems, setCartItems] = useState<ProductInterface[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: ProductInterface) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.slug === product.slug);
      if (existing) {
        return prev.map((item) =>
          item.slug === product.slug
            ? {...item, quantity: (item.quantity ?? 1) + 1}
            : item
        );
      }
      return [...prev, {...product, quantity: 1}];
    });
    setIsCartOpen(true);
  };

  useEffect(() => {
    if (
      typeof window !== undefined &&
      localStorage.getItem('theme') === undefined
    ) {
      localStorage.setItem('theme', 'system');
    }
  }, []);

  return (
    <>
      <section className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[72vh] overflow-hidden">
        <Image
          src="/images/hero-banner-2.png"
          alt="Finger Lickin' Good!"
          priority
          fill
          className="object-cover"
        />
      </section>

      <CartModal
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
      />

      <section className="container mx-auto py-16 px-4">
        <h2 className="uppercase text-3xl md:text-4xl font-bold text-start mb-4">
          Explore Menu
        </h2>
        <div className="w-[5rem] h-1 bg-red-600 mb-8"></div>
        <div className="justify-center grid sm:grid-cols-2 lg:grid-cols-4">
          {exploremenu.map((offer) => (
            <ProductCardCircle
              key={offer.slug}
              slug={offer.slug}
              image={offer.image}
              name={offer.name}
            />
          ))}
        </div>
      </section>

      <section className="container mx-auto py-16 px-4">
        <h2 className="uppercase text-3xl md:text-4xl font-bold text-start mb-4">
          More Delicious Deals
        </h2>
        <div className="w-[5rem] h-1 bg-red-600 mb-8"></div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {exploremenu.map((offer) => (
            <ProductCardHome
              key={offer.slug}
              name={offer.name}
              image={offer.image}
              price={offer.price}
              description={offer.description}
              addToBucket={() => addToCart(offer)}
            />
          ))}
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mx-2">
            {newsLetterImages.map((item, index) => (
              <div key={index} className="w-full md:w-1/2 p-2 mt-4">
                {item.src && item.alt && (
                  <Link
                    href={item.link}
                    target={item.external ? '_blank' : '_self'}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    aria-label={item.alt}
                    className="block rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200"
                  >
                    <div
                      className="relative w-full"
                      style={{paddingBottom: '56.25%'}}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index < 2}
                        quality={85}
                      />
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
