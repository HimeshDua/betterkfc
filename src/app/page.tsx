'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProductCardHome from '@/components/ProductCardHome';
import ProductCardCircle from '@/components/ProductCardCircle';
import {exploremenu} from '@/data/exploreMenu';
import {newsLetterImages} from '@/data/newsLetterImages';

export default function Home() {
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

      <section className="container mx-auto py-16 px-4">
        <h2 className="uppercase text-3xl md:text-4xl font-bold text-start mb-4">
          Explore Menu
        </h2>
        <div className="w-[5rem] h-1 bg-red-600 mb-8"></div>
        <div className="justify-center grid sm:grid-cols-2 lg:grid-cols-4">
          {exploremenu.map((offer) => (
            <ProductCardCircle
              key={offer.id}
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
              key={offer.id}
              imageSrc={offer.image || '/images/card/burger.jpg'}
              imageAlt={offer.name}
              title={offer.name}
              description={offer.description}
              buttonLink={offer.image}
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
