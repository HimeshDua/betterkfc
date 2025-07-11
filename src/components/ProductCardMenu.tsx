'use client';
import {Card, CardContent, CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import Image from 'next/image';
import {Heart} from 'lucide-react';
import Link from 'next/link';
import {useCart} from '@/contexts/CartContext';
import {ProductInterface} from '@/types/global-types';

export default function ProductCardMenu({item}: {item: ProductInterface}) {
  const {addToCart} = useCart();
  const {price, slug, description, name, image} = item;
  const formattedPrice = `Rs. ${price.toLocaleString()}`;

  return (
    <Card className="relative p-2 pb-7 group">
      <Link prefetch href={`menu/${slug}`}>
        <Heart className="absolute right-4 top-4 hover:text-primary/50 transition-colors duration-150 z-10" />
        <div className="relative w-full h-48 sm:h-56 overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        </div>

        <CardContent className="px-0 pb-1 flex flex-col gap-y-1.5">
          <h3 className="text-base font-bold line-clamp-2">{name}</h3>
          {description && (
            <p className="text-xs text-muted-foreground line-clamp-2">
              {description}
            </p>
          )}
          <span className="text-base text-start font-semibold">
            {formattedPrice}
          </span>
        </CardContent>
      </Link>
      <CardFooter className="absolute -bottom-5 left-0 flex justify-center items-end w-full pb-3">
        <Button
          className="rounded-lg"
          size="sm"
          onClick={async () => {
            addToCart(item);
          }}
        >
          + Add To Bucket
        </Button>
      </CardFooter>
    </Card>
  );
}
