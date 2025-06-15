import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import Image from 'next/image';

type ProductCardProps = {
  name: string;
  image: string;
  price: number;
  description: string;
  addToBucket: () => void;
};

export default function ProductCardHome({
  name,
  image,
  price,
  description,
  addToBucket
}: ProductCardProps) {
  return (
    <Card className="relative">
      <div className="relative w-full h-48 sm:h-56 flex items-center justify-center">
        <span className="absolute -top-6 flex flex-row gap-2">
          <span className="w-3.5 bg-primary h-6"></span>
          <span className="w-3.5 bg-primary h-6"></span>
          <span className="w-3.5 bg-primary h-6"></span>
        </span>

        <Image
          src={image}
          alt={name}
          width={200}
          height={150}
          className="object-contain max-w-[90%] max-h-[90%]"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          loading="lazy"
        />
      </div>
      <CardContent className=" text-center flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{name}</h3>
        {description && (
          <p className="text-sm line-clamp-2 text-muted-foreground mb-2">
            {description}
          </p>
        )}
        {price && (
          <p className="text-lg text-start font-bold  mb-4">Rs. {price}</p>
        )}
        <Button onClick={() => addToBucket()} className="mt-auto w-full">
          + Add To Bucket
        </Button>
      </CardContent>
    </Card>
  );
}
