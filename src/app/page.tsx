'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProductCardHome from '@/components/ProductCardHome';
import ProductCardCircle from '@/components/ProductCardCircle';

export default function Home() {
  const featuredOffers = [
    {
      id: 'ramen-wings',
      name: 'Ramen Wings',
      price: 1800,
      image: '/images/products/ramen-wings.png',
      category: 'promotion',
      description:
        '8 x Hot and crispy wings glazed in spicy Ramen Sauce and topped with crunchy noodles.'
    },
    {
      id: '3rilling',
      name: '3rilling',
      price: 3500,
      image: '/images/products/3rilling.png',
      category: 'promotion',
      description:
        '3 Zinger Burgers, 3 Chicken Drumsticks, 1 Bucket of Fries, and 3 Regular Drinks.'
    },
    {
      id: 'krunch-burger',
      name: 'Krunch Burger',
      price: 2200,
      image: '/images/products/krunch-burger.png',
      category: 'everyday-value',
      description:
        'Enjoy the crispy chicken fillet in a soft bun with our signature sauce with fresh lettuce.'
    },
    {
      id: 'krunch-burger-+-drink',
      name: 'Krunch Burger + Drink',
      price: 410,
      image: '/images/products/krunch-burger-+-drink.png',
      category: 'everyday-value',
      description:
        'Enjoy a crispy crunchy chicken fillet on a bed of lettuce with a soft bun, topped with the signature sauce. Served with a drink.'
    }
  ];

  const newsLetterImages = [
    {
      src: '/images/newsletters/fingers.png',
      alt: 'Delicious KFC chicken fingers',
      link: '/menu/fingers'
    },
    {
      src: '/images/newsletters/operation.png',
      alt: 'KFC operation behind the scenes',
      link: '/about/operations'
    },
    {
      src: '/images/newsletters/playstore.webp',
      alt: 'Download KFC app on Play Store',
      link: 'https://play.google.com/store/apps/details?id=com.kfc.pk',
      external: true
    },
    {
      src: '/images/hero-banner-2.png',
      alt: 'Another great offer',
      link: '/deals'
    }
  ];

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
          {featuredOffers.map((offer) => (
            <ProductCardCircle image={offer.image} name={offer.name} />
          ))}
        </div>
      </section>

      {/* Reusing the same data and ProductCard component for the second "Deals and Combos" section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
          More Delicious Deals!
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* {featuredOffers.map((offer) => (
            <ProductCardHome
              key={offer.id}
              imageSrc={offer.image || '/images/card/burger.jpg'} // Fallback image
              imageAlt={offer.title}
              title={offer.title}
              description={offer.description}
              buttonLink={offer.link}
              buttonText={offer.buttonText}
            />
          ))} */}
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
