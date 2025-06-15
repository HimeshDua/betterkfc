'use client';

import Slider from 'react-slick';
import Image from 'next/image';
import {ArrowLeft, ArrowRight} from 'lucide-react';

const images = [
  '/images/hero/banner-1.jpg',
  '/images/hero/banner-2.jpg',
  '/images/hero/banner-3.png',
  '/images/hero/banner-4.jpg'
];

const NextArrow = (props: any) => {
  const {onClick} = props;
  return (
    <div
      onClick={onClick}
      className="absolute right-4 top-1/2 z-10 -translate-y-1/2 bg-black/60 p-2 rounded-full cursor-pointer hover:bg-black"
    >
      <ArrowRight color="white" size={20} />
    </div>
  );
};

const PrevArrow = (props: any) => {
  const {onClick} = props;
  return (
    <div
      onClick={onClick}
      className="absolute left-4 top-1/2 z-10 -translate-y-1/2 bg-black/60 p-2 rounded-full cursor-pointer hover:bg-black"
    >
      <ArrowLeft color="white" size={20} />
    </div>
  );
};

export default function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <section className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[72vh] overflow-hidden">
      <Slider {...settings} className="h-full">
        {images.map((src, idx) => (
          <div
            key={idx}
            className="relative w-full h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[72vh]"
          >
            <Image
              src={src}
              alt={`Slide ${idx + 1}`}
              fill
              className="object-cover"
              priority={idx === 0}
            />
          </div>
        ))}
      </Slider>
    </section>
  );
}
