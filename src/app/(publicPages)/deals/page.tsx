import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import Image from 'next/image';
import {deals} from '@/data/data';
import Link from 'next/link';

export default function DealsPage() {
  return (
    <section className="container mx-auto py-16 px-4">
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-primary mb-6 leading-tight">
          Today's Hot Deals
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
          Craving something delicious? Check out our limited-time offers and
          enjoy your favorites at unbeatable prices!
        </p>
      </div>

      {/* Deals Cards Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {deals.map((deal) => (
          <Card className="relative">
            <div className="relative w-full h-48 sm:h-56 flex items-center justify-center">
              <span className="absolute -top-6 flex flex-row gap-2">
                <span className="w-3.5 bg-primary h-6"></span>
                <span className="w-3.5 bg-primary h-6"></span>
                <span className="w-3.5 bg-primary h-6"></span>
              </span>

              <Image
                src={deal.image}
                alt={deal.name}
                width={200}
                height={150}
                className="object-contain max-w-[90%] max-h-[90%]"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                loading="lazy"
              />
            </div>
            <CardContent className=" text-center flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {deal.name}
              </h3>
              {deal.description && (
                <p className="text-sm line-clamp-2 text-muted-foreground mb-2">
                  {deal.description}
                </p>
              )}
              {deal.price && (
                <p className="text-lg text-start font-bold  mb-4">
                  Rs. {deal.price}
                </p>
              )}
              <Link href={`/menu/${deal.slug}`}>
                <Button className="mt-auto w-full">View Product</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center max-w-xl mx-auto py-12">
        <h3 className="text-3xl font-bold text-foreground mb-4">
          Want More Options?
        </h3>
        <p className="text-muted-foreground text-base mb-6">
          Explore our full menu for a wider variety of delicious meals and
          customize your perfect order.
        </p>
        <Link href="/menu">
          <Button
            variant="outline"
            className="text-lg px-8 py-4 border-2 font-semibold"
          >
            View Full Menu
          </Button>
        </Link>
      </div>
    </section>
  );
}
