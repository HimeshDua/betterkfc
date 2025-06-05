// pages/deals.js (or app/deals/page.js for Next.js 13+)
'use client';

import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button';

export default function DealsPage() {
  const deals = [
    {
      id: 1,
      title: 'Zinger Box Meal',
      description:
        'The classic Zinger, regular fries, 1 pc chicken, and a drink. A complete meal!',
      image: '/images/deal-zinger-box.jpg', // Placeholder
      price: 'PKR 999', // Example price
      buttonText: 'Order Now',
      link: '/menu/zinger-box-meal',
      new: true // Mark as new deal
    },
    {
      id: 2,
      title: 'Wow Combo',
      description: '1 Zinger, 1 Pc Chicken, 1 Regular Fries, 1 Regular Drink',
      image: '/images/deal-wow-combo.jpg', // Placeholder
      price: 'PKR 1250',
      buttonText: 'Add to Cart',
      link: '/menu/wow-combo'
    },
    {
      id: 3,
      title: 'Family Feast 4 Pc',
      description:
        '4 pieces of our famous fried chicken, 2 large fries, 2 drinks. Perfect for small families.',
      image: '/images/deal-family-4pc.jpg', // Placeholder
      price: 'PKR 2100',
      buttonText: 'Order Now',
      link: '/menu/family-feast-4pc'
    },
    {
      id: 4,
      title: 'Twister Meal',
      description: 'Our delicious Twister wrap, regular fries, and a drink.',
      image: '/images/deal-twister-meal.jpg', // Placeholder
      price: 'PKR 750',
      buttonText: 'Order Now',
      link: '/menu/twister-meal'
    },
    {
      id: 5,
      title: 'Hot Wings Bucket (10 Pc)',
      description: '10 fiery Hot Wings for an extra kick! Comes with a dip.',
      image: '/images/deal-hotwings-10pc.jpg', // Placeholder
      price: 'PKR 900',
      buttonText: 'Order Now',
      link: '/menu/hot-wings-bucket',
      seasonal: true // Mark as seasonal
    },
    {
      id: 6,
      title: 'Mega Deal',
      description:
        '2 Zinger Burgers, 2 Pc Chicken, 4 Hot Wings, Large Fries & 1.5L Drink.',
      image: '/images/deal-mega-deal.jpg', // Placeholder
      price: 'PKR 2800',
      buttonText: 'Order Now',
      link: '/menu/mega-deal'
    }
  ];

  return (
    <>
      {/* Hero Banner for Deals */}
      <section
        className="relative w-full h-[40vh] md:h-[50vh] bg-cover bg-center"
        style={{backgroundImage: "url('/images/deals-hero-banner.jpg')"}}
      >
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
              Deals & Promotions
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
              Grab your favorites for less! Discover our latest irresistible
              offers.
            </p>
            <div className="mt-8">
              <Link href="/menu">
                <Button className="bg-red-600 hover:bg-red-700 px-8 py-4 text-lg md:text-xl rounded-full shadow-lg transition-transform transform hover:scale-105">
                  View Full Menu
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Deals Grid Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
          Current Offers
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-200"
            >
              <div className="relative w-full h-60 sm:h-52 overflow-hidden">
                <Image
                  src={deal.image}
                  alt={deal.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                />
                {deal.new && (
                  <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    NEW!
                  </span>
                )}
                {deal.seasonal && (
                  <span className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    SEASONAL
                  </span>
                )}
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {deal.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {deal.description}
                </p>
                <p className="text-red-600 font-bold text-3xl mb-6">
                  {deal.price}
                </p>
                <Link href={deal.link}>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full text-lg font-semibold shadow-md">
                    {deal.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {deals.length === 0 && (
          <div className="text-center py-10 text-gray-600 text-xl">
            No deals available at the moment. Please check back soon!
          </div>
        )}
      </section>

      {/* Call to Action: Find a Store */}
      <section className="bg-gray-100 py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
            Ready to Grab Your Deal?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Find your nearest KFC restaurant to enjoy these amazing offers!
          </p>
          <Link href="/locations">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xl rounded-full shadow-lg transition-transform transform hover:scale-105">
              Find a Store
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
