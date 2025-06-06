'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProductCardHome from '@/components/ProductCardHome';

export default function Home() {
  const featuredOffers = [
    {
      id: 1,
      title: 'Zinger Combo',
      description: 'Our iconic Zinger Burger, crispy fries & a drink.',
      image: '/images/promo-zinger-combo.jpg',
      link: '/menu/zinger-combo',
      buttonText: 'See Details'
    },
    {
      id: 2,
      title: 'Family Feast',
      description: 'Perfect for sharing! A delicious spread for everyone.',
      image: '/images/promo-family-feast.jpg',
      link: '/menu/family-feast',
      buttonText: 'Order Now'
    },
    {
      id: 3,
      title: 'New Crispy Strips',
      description: 'Juicy, tender, and perfectly crispy chicken strips.',
      image: '/images/promo-crispy-strips.jpg',
      link: '/menu/crispy-strips',
      buttonText: 'Try It Now'
    },
    {
      id: 4,
      title: 'Sweet Treats',
      description: 'End your meal on a high note with our delectable desserts.',
      image: '/images/promo-desserts.jpg',
      link: '/menu?category=desserts',
      buttonText: 'Browse Desserts'
    }
  ];

  // const popularItems = [
  //   {
  //     id: 1,
  //     name: 'Zinger Burger',
  //     description: 'End your meal on a high note with our delectable desserts.',
  //     price: 'Rs 550',
  //     image: '/images/item-zinger.jpg',
  //     link: '/menu/zinger-burger',
  //     buttonText: 'Add to Cart'
  //   },
  //   {
  //     id: 2,
  //     name: 'Kentucky Fried Chicken',
  //     price: 'Rs 650 (2pc)',
  //     description: 'End your meal on a high note with our delectable desserts.',

  //     image: '/images/item-kentucky-fried-chicken.jpg',
  //     link: '/menu/kentucky-fried-chicken',
  //     buttonText: 'Add to Cart'
  //   },
  //   {
  //     id: 3,
  //     name: 'Hot & Crispy Fries',
  //     price: 'Rs 220',
  //     image: '/images/item-fries.jpg',
  //     description: 'End your meal on a high note with our delectable desserts.',

  //     link: '/menu/hot-crispy-fries',
  //     buttonText: 'Add to Cart'
  //   },
  //   {
  //     id: 4,
  //     name: 'Family Bucket (8 Pcs)',
  //     description: 'End your meal on a high note with our delectable desserts.',
  //     price: 'Rs 2599',
  //     image: '/images/item-family-bucket.jpg',
  //     link: '/menu/family-bucket',
  //     buttonText: 'Add to Cart'
  //   }
  // ];

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
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary">
          Deals and Combos Just For You!
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredOffers.map((offer) => (
            <ProductCardHome
              key={offer.id}
              imageSrc={offer.image || '/images/card/burger.jpg'}
              imageAlt={offer.title}
              title={offer.title}
              description={offer.description}
              buttonLink={offer.link}
              buttonText={offer.buttonText}
              priority={offer.id === 1} // Prioritize first image for LCP
            />
          ))}
        </div>
      </section>

      {/* Reusing the same data and ProductCard component for the second "Deals and Combos" section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
          More Delicious Deals!
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredOffers.map((offer) => (
            <ProductCardHome
              key={offer.id}
              imageSrc={offer.image || '/images/card/burger.jpg'} // Fallback image
              imageAlt={offer.title}
              title={offer.title}
              description={offer.description}
              buttonLink={offer.link}
              buttonText={offer.buttonText}
            />
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-red-700 to-red-900 py-16">
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
