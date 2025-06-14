'use client';

import Slider from 'react-slick';
import ProductCardCircle from '@/components/ProductCardCircle';
import {ArrowLeft, ArrowRight} from 'lucide-react';
import {exploreMenu} from '@/data/data';

const PrevArrow = ({onClick}: any) => (
  <div
    onClick={onClick}
    className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-black/60 p-2 rounded-full cursor-pointer hover:bg-black"
  >
    <ArrowLeft size={20} color="white" />
  </div>
);

const NextArrow = ({onClick}: any) => (
  <div
    onClick={onClick}
    className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-black/60 p-2 rounded-full cursor-pointer hover:bg-black"
  >
    <ArrowRight size={20} color="white" />
  </div>
);

export default function ExploreMenuSlider() {
  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <section className="container mx-auto py-16 px-4">
      <h2 className="uppercase text-3xl md:text-4xl font-bold text-start mb-4">
        Explore Menu
      </h2>
      <div className="w-[5rem] h-1 bg-red-600 mb-8"></div>

      <Slider {...settings} className="relative">
        {exploreMenu.map((offer) => (
          <div key={offer.slug} className="px-2">
            <ProductCardCircle
              slug={offer.slug}
              image={offer.image}
              name={offer.name}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}
