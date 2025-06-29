'use client';

import Image from 'next/image';
import Link from 'next/link';
import {useEffect} from 'react';
import HeroSlider from '@/components/home/HeroSlider';
import DeliciousDealsSlider from '@/components/home/DeliciousDealsSlider';
import ExploreMenuSlider from '@/components/home/ExploreMenuSlider';
import {newsLetterImages} from '@/data/data';

export default function Home() {
  useEffect(() => {
    if (
      typeof window !== undefined &&
      localStorage.getItem('theme') === undefined
    ) {
      localStorage.setItem('theme', 'system');
    }
  }, []);

  // Chai pi lo friends
  return (
    <>
      <HeroSlider />
      <ExploreMenuSlider />
      <DeliciousDealsSlider />

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
