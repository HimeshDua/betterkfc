// components/ProductCardMenu.jsx (or .tsx)
import {Card, CardContent, CardFooter} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import Image from 'next/image';
import {Heart} from 'lucide-react';

// Adjust ProductCardProps to match the `Product` interface from MenuPage
type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  onAdd: (product: any) => void;
  priority?: boolean;
};

export default function ProductCardMenu({
  id,
  name,
  price,
  image,
  description,
  onAdd,
  priority = false
}: ProductCardProps) {
  const formattedPrice = `Rs. ${price.toLocaleString()}`;

  return (
    <Card className="relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex flex-col h-full bg-card text-card-foreground group">
      <Heart className="absolute right-4 hover:text-primary/50 duration-100 z-5" />
      <div className="relative w-full h-48 sm:h-56 overflow-hidden">
        <Image
          src={'/images/card/ramen.png' || image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
        />
      </div>

      {/* Product Details - CardContent */}
      <CardContent className="p-4 pt-5 flex flex-col flex-grow text-left">
        <h3 className="text-xl font-bold mb-1 line-clamp-2 text-foreground">
          {name}
        </h3>
        {description && (
          <p className="text-sm mb-2 flex-grow line-clamp-3 text-muted-foreground">
            {description}
          </p>
        )}
      </CardContent>

      {/* Price and Add to Cart Button - CardFooter */}
      <CardFooter className="flex justify-between items-center p-4 pt-0">
        <p className="text-xl font-extrabold text-primary">{formattedPrice}</p>
        <Button
          onClick={() => onAdd({id, name, price, image, description})}
          className="font-semibold px-4 py-2 text-sm md:text-base rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Add to Bucket
        </Button>
      </CardFooter>
    </Card>
  );
}
