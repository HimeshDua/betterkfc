import {Card} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

type ProductData = {
  name: string;
  image: string;
};

export default function ProductCardCircle({name, image}: ProductData) {
  return (
    <Link
      className="rounded-t-full rounded-bl-full h-64 w-64"
      href="/menu"
      prefetch
    >
      <Card className="flex flex-col items-center justify-start gap-0 rounded-t-full rounded-bl-full h-64 w-64">
        <div className="flex items-center justify-center w-52 h-52 mt-4 mb-2 relative">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-full"
            sizes="208px"
            priority
          />
        </div>
        <span className="text-center text-base font-semibold px-2">
          {name}
          <div className="w-16 h-1 bg-red-600 rounded-full mt-1" />
        </span>
      </Card>
    </Link>
  );
}
