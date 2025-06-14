'use client';

import Slider from 'react-slick';
import ProductCardHome from '@/components/ProductCardHome';
import {ProductInterface} from '@/types/global-types';
import {ArrowLeft, ArrowRight} from 'lucide-react';
import {useState} from 'react';
import {useCart} from '@/contexts/CartContext';
import CartModal from '../CartModal';
import {moreDeliciousDeals} from '@/data/data';

const PrevArrow = ({onClick}: any) => (
  <div
    onClick={onClick}
    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full cursor-pointer hover:bg-black"
  >
    <ArrowLeft size={20} color="white" />
  </div>
);

const NextArrow = ({onClick}: any) => (
  <div
    onClick={onClick}
    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full cursor-pointer hover:bg-black"
  >
    <ArrowRight size={20} color="white" />
  </div>
);

export default function DeliciousDealsSlider() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {cart, addToCart} = useCart();

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: false,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <>
      <CartModal
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
      />
      <section className="container mx-auto py-16 px-4">
        <h2 className="uppercase text-3xl md:text-4xl font-bold text-start mb-4">
          More Delicious Deals
        </h2>
        <div className="w-[5rem] h-1 bg-red-600 mb-8"></div>

        <Slider {...settings} className="relative">
          {moreDeliciousDeals.map((offer: ProductInterface) => (
            <div key={offer.slug} className="px-2">
              <ProductCardHome
                name={offer.name}
                image={offer.image}
                price={offer.price}
                description={offer.description}
                addToBucket={() => {
                  addToCart(offer);
                  setIsCartOpen(true);
                }}
              />
            </div>
          ))}
        </Slider>
      </section>
    </>
  );
}
