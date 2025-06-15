'use client';

import Image from 'next/image';
import Link from 'next/link';
import {Button} from '@/components/ui/button';

export default function AboutPage() {
  return (
    <>
      <section
        className="relative w-full h-[40vh] md:h-[55vh] bg-cover bg-center"
        style={{backgroundImage: "url('/images/about-hero-banner.jpg')"}}
      >
        <div className="absolute inset-0 bg-[color:var(--background)]/60 flex items-center justify-center">
          <div className="text-center text-[color:var(--foreground)] px-4">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
              Our Story
            </h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">
              The Finger Lickin&apos; Good legacy of Colonel Sanders.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-16 px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <Image
              src="/images/colonel-sanders-young.jpg"
              alt="Young Colonel Sanders"
              width={600}
              height={400}
              className="rounded-xl shadow-2xl object-cover w-full h-auto"
            />
          </div>
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-4xl font-bold mb-6 text-[color:var(--foreground)]">
              Colonel Sanders: A Taste of Determination
            </h2>
            <p className="text-lg text-[color:var(--muted-foreground)] leading-relaxed mb-6">
              Our journey began with Harland Sanders, born in Indiana in 1890.
              From humble beginnings, he started cooking for hungry travelers at
              a roadside motel in Corbin, Kentucky, perfecting his secret blend
              of 11 herbs and spices. It was here, in the midst of the Great
              Depression, that the iconic taste of Kentucky Fried Chicken was
              born.
            </p>
            <p className="text-lg text-[color:var(--muted-foreground)] leading-relaxed">
              At the age of 65, with only a Social Security check to his name,
              Colonel Sanders began franchising his chicken business, traveling
              across the country to cook his chicken for restaurant owners. His
              dedication and the unique flavor quickly made KFC a household
              name.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--muted)] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-[color:var(--foreground)]">
            Our Commitment to Quality
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-semibold text-[color:var(--foreground)] mb-4">
                Freshly Prepared, Every Day
              </h3>
              <p className="text-lg text-[color:var(--muted-foreground)] leading-relaxed mb-6">
                At KFC, we believe in real food, prepared by real cooks. Our
                chicken is hand-breaded and freshly prepared in our kitchens
                throughout the day, ensuring that unique taste you love. We use
                only the finest ingredients to deliver that Finger Lickin&apos;
                Good flavor in every single bite.
              </p>
              <Link
                href="/menu"
                aria-label="See our menu and discover our freshly prepared chicken"
              >
                <Button className="bg-[color:var(--primary)] hover:bg-[color:var(--ring)] text-[color:var(--primary-foreground)] px-8 py-3 rounded-full text-lg font-semibold shadow-md">
                  Taste the Quality
                </Button>
              </Link>
            </div>
            <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-xl">
              <Image
                src="/images/fresh-chicken-prep.jpg"
                alt="Fresh chicken preparation"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-[color:var(--foreground)]">
          Making a Difference in Our Communities
        </h2>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-xl">
            <Image
              src="/images/kfc-community.jpg"
              alt="KFC Community Involvement"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-semibold text-[color:var(--foreground)] mb-4">
              Committed to Goodness
            </h3>
            <p className="text-lg text-[color:var(--muted-foreground)] leading-relaxed mb-6">
              Beyond serving delicious food, KFC is dedicated to giving back to
              the communities we serve. Through various initiatives and
              partnerships, we strive to make a positive impact, support local
              causes, and contribute to a better future.
            </p>
            <Link
              href="/community"
              aria-label="Learn about KFC's community initiatives and how we make a difference"
            >
              <Button
                variant="outline"
                className="px-8 py-3 rounded-full text-lg font-semibold border-[color:var(--primary)] text-[color:var(--primary)] hover:bg-[color:var(--primary)] hover:text-[color:var(--primary-foreground)] transition-colors duration-200"
              >
                Learn About Our Initiatives
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--muted)] py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[color:var(--foreground)]">
            Join Our Team
          </h2>
          <p className="text-lg text-[color:var(--muted-foreground)] mb-8 max-w-2xl mx-auto">
            Passionate about food and people? Explore career opportunities at
            KFC and become part of our Finger Lickin&apos; Good family.
          </p>
          <Link
            href="/careers"
            aria-label="Explore career opportunities at KFC and join our team"
          >
            <Button className="bg-[color:var(--primary)] hover:bg-[color:var(--ring)] text-[color:var(--primary-foreground)] px-8 py-4 text-xl rounded-full shadow-lg transition-transform transform hover:scale-105">
              Explore Careers
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
