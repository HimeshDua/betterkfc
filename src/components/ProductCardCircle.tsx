import {Card} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

type ProductData = {
  name: string;
  image: string;
};

export default function ProductCardCircle({name, image}: ProductData) {
  return (
    <Link href="/menu" prefetch>
      <Card className="flex flex-col items-center justify-center rounded-tr-full rounded-tl-full  rounded-bl-full w-56 h-56 p-0 overflow-hidden">
        <div className="relative w-32 h-32 rounded-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="128px"
            priority={true}
          />
        </div>
        <span className="mt-2 text-center text-sm font-semibold line-clamp-1 px-2">
          {name}
          <div className="w-[5rem] h-1 bg-red-600 mb-8 mt-1"></div>
        </span>
      </Card>
    </Link>
  );
}
