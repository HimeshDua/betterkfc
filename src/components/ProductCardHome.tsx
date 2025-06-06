import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

type ProductCardProps = {
  imageSrc: string;
  imageAlt: string;
  title: string;
  description?: string;
  price?: string;
  buttonLink: string;
  buttonText: string;
  priority?: boolean;
};

export default function ProductCardHome({
  imageSrc,
  imageAlt,
  title,
  description,
  price,
  buttonLink,
  buttonText,
  priority = false
}: ProductCardProps) {
  return (
    <Card className="relative ">
      <div className="relative w-full h-48 sm:h-56 flex items-center justify-center">
        <span className="absolute -top-6 flex flex-row gap-2">
          <span className="w-3.5 bg-primary h-6"></span>
          <span className="w-3.5 bg-primary h-6"></span>
          <span className="w-3.5 bg-primary h-6"></span>
        </span>
        <Image
          src={'/images/card/CrispyDuoBox.png' || imageSrc}
          alt={imageAlt}
          width={200}
          height={150}
          className="object-contain max-w-[90%] max-h-[90%]"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          priority={priority}
        />
      </div>
      <CardContent className=" text-center flex flex-col flex-grow">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        {description && (
          <p className="text-sm text-muted-foreground mb-2 flex-grow">
            {description}
          </p>
        )}
        {price && <p className="text-lg text-start font-bold  mb-4">{price}</p>}
        <Button asChild className="mt-auto w-full">
          <Link href={buttonLink}>{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
}
