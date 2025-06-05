'use client';

import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button'; // Assuming this is your custom Button component
import {Card} from '@/components/ui/card';

// For a real-world KFC.com clone, you'd use a dedicated slider library
// like 'react-slick' or 'swiper' for the hero section.
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const heroBanners = {
    id: 1,
    heading: "Finger Lickin' Good!",
    subheading: 'Experience the original recipe chicken, freshly prepared.',
    image: '/images/hero-banner.jpg',
    primaryLink: '/menu',
    primaryBtnText: 'Order Now',
    secondaryLink: '/about',
    secondaryBtnText: 'Learn More'
  };

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

  const categories = [
    {
      name: 'Chicken',
      image: '/images/category-chicken.jpg',
      link: '/menu?category=chicken'
    },
    {
      name: 'Sandwiches',
      image: '/images/category-burgers.jpg', // Reusing image, ideally specific
      link: '/menu?category=sandwiches'
    },
    {
      name: 'Buckets & Meals',
      image: '/images/category-buckets.jpg',
      link: '/menu?category=buckets-meals'
    },
    {
      name: 'Sides',
      image: '/images/category-sides.jpg',
      link: '/menu?category=sides'
    },
    {
      name: 'Desserts',
      image: '/images/category-desserts.jpg', // New image needed
      link: '/menu?category=desserts'
    },
    {
      name: 'Drinks',
      image: '/images/category-beverages.jpg',
      link: '/menu?category=drinks'
    }
  ];

  const popularItems = [
    {
      id: 1,
      name: 'Zinger Burger',
      price: 'PKR 550', // Replace with dynamic price from API
      image: '/images/item-zinger.jpg',
      link: '/menu/zinger-burger',
      buttonText: 'Add to Cart' // Functionality for adding to cart
    },
    {
      id: 2,
      name: 'Kentucky Fried Chicken',
      price: 'PKR 650 (2pc)',
      image: '/images/item-kentucky-fried-chicken.jpg', // New image needed
      link: '/menu/kentucky-fried-chicken',
      buttonText: 'Add to Cart'
    },
    {
      id: 3,
      name: 'Hot & Crispy Fries',
      price: 'PKR 220',
      image: '/images/item-fries.jpg', // New image needed
      link: '/menu/hot-crispy-fries',
      buttonText: 'Add to Cart'
    },
    {
      id: 4,
      name: 'Family Bucket (8 Pcs)',
      price: 'PKR 2599',
      image: '/images/item-family-bucket.jpg', // New image needed
      link: '/menu/family-bucket',
      buttonText: 'Add to Cart'
    }
  ];

  return (
    <>
      <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden bg-gray-900">
        <div
          key={heroBanners.id}
          className="relative h-[70vh] md:h-[85vh] w-full"
        >
          <Image
            src={heroBanners.image}
            alt={heroBanners.heading}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
            <h1 className="text-4xl md:text-7xl font-extrabold leading-tight drop-shadow-2xl">
              {heroBanners.heading}
            </h1>
            <p className="mt-4 text-lg md:text-2xl max-w-3xl mx-auto drop-shadow-lg">
              {heroBanners.subheading}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Button size="lg" variant="destructive" asChild>
                <Link
                  href={heroBanners.primaryLink}
                  aria-label={heroBanners.primaryBtnText}
                >
                  {heroBanners.primaryBtnText}
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link
                  href={heroBanners.secondaryLink}
                  aria-label={heroBanners.secondaryBtnText}
                >
                  {heroBanners.secondaryBtnText}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Offers / Latest Deals Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
          Deals and Combos Just For You!
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredOffers.map((offer) => (
            <Card
              key={offer.id}
              className="overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <div className="relative w-full h-56">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  priority={offer.id === 1}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <div className="p-6 text-center flex-1 flex flex-col">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {offer.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6 flex-1">
                  {offer.description}
                </p>
                <Button
                  asChild
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-full text-lg font-semibold shadow-md"
                >
                  <Link href={offer.link}>{offer.buttonText}</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
      {/* Popular Items Section (often combined with "Most Loved") */}
      <section className="bg-gradient-to-br from-red-700 to-red-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">
            Our Fan Favorites
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {popularItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100"
              >
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-red-600 font-bold text-2xl mb-4">
                    {item.price}
                  </p>
                  <Link href={item.link}>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-full text-base font-semibold shadow-md">
                      {item.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Explore Categories Section */}
      <section className="container mx-auto py-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
          Discover Our Full Menu
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6">
          {categories.map((category) => (
            <Link key={category.name} href={category.link}>
              <div className="group relative overflow-hidden rounded-xl shadow-md cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border border-gray-200">
                <div className="relative w-full h-40 overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-white text-xl font-bold text-center px-4">
                    {category.name}
                  </h3>
                </div>
                <div className="p-3 text-center bg-white">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {category.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      {/* About Us / Our Story Section (Common on brand websites) */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <Image
              src="/images/colonel-sanders.jpg" // Placeholder image for Colonel Sanders or brand story
              alt="Colonel Sanders"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl object-cover w-full h-auto"
            />
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Our Story, Our Legacy
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              For over 80 years, KFC has been serving up Colonel Sanders&apos;
              secret recipe chicken, made with 11 herbs and spices. It&apos;s a
              taste that&apos; loved around the world, and a legacy built on
              passion, quality, and a commitment to flavor.
            </p>
            <Link href="/about">
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xl rounded-full shadow-lg transition-transform transform hover:scale-105">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Find a Store Section - More prominent as on kfc.com */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Find Your Nearest KFC
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Ready for some Finger Lickin&apos; Goodness? Find a KFC restaurant
            near you for dine-in, drive-thru, or delivery.
          </p>
          <Link href="/locations">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-10 py-5 text-xl rounded-full shadow-lg transition-transform transform hover:scale-105">
              Find a Store
            </Button>
          </Link>
          {/* Placeholder for an interactive map or a static map image */}
          <div className="mt-12 rounded-xl overflow-hidden shadow-2xl max-w-5xl mx-auto border border-gray-200">
            {/* In a real application, this would be an embedded map (e.g., Google Maps iframe or library) */}
            <Image
              src="/images/map-placeholder.jpg" // Generic map placeholder
              alt="KFC Store Locations Map"
              width={1200}
              height={600}
              className="w-full h-auto object-cover"
            />
          </div>
          <p className="text-sm text-gray-500 mt-4">
            (Map functionality requires integration with a mapping service API)
          </p>
        </div>
      </section>
      {/* Newsletter / Stay Connected Section */}
      <section className="bg-red-800 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Join Our Colonel&apos;s Club!
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Sign up for exclusive offers, news, and more delivered straight to
            your inbox.
          </p>
          <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full sm:flex-1 px-6 py-4 border border-red-700 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent text-lg text-gray-800"
              aria-label="Email for newsletter subscription"
            />
            <Button
              type="submit"
              className="bg-white hover:bg-gray-200 text-red-800 px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
            >
              Subscribe
            </Button>
          </form>
          <p className="text-sm mt-6 opacity-80">
            By subscribing, you agree to our{' '}
            <Link href="/privacy" className="underline hover:text-white">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
