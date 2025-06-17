import {Card} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

type ProductData = {
  slug: string;
  name: string;
  image: string;
};

export default function ProductCardUnique({slug, name, image}: ProductData) {
  return (
    <div>
      <Card className="group mx-auto h-64 w-64 rounded-t-full rounded-bl-full shadow-md transition-transform duration-200 hover:shadow-lg flex flex-col items-center justify-start">
        <div className="relative w-48 h-48 mt-4">
          <Link href={`/menu/${slug}`}>
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover rounded-full border-4 border-background group-hover:border-primary transition-all duration-200"
              sizes="192px"
              priority
            />
          </Link>
        </div>

        <div className="mt-2 text-center px-2 bg-red-5000">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
            <Link href={`/menu/${slug}`}>{name}</Link>
          </h3>
          <div className="w-12 h-1 mt-1 bg-primary mx-auto rounded-full" />
        </div>
      </Card>
    </div>
  );
}
