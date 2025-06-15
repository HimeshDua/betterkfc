import {Card, CardContent} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import Image from 'next/image';
import {deals} from '@/data/data';
import Link from 'next/link';
import {ArrowLeft} from 'lucide-react';

export default function DealsPage() {
  return (
    <div className="bg-background text-foreground min-h-[calc(100vh-64px)]">
      <div className="sticky top-14 z-20 bg-background py-4 px-4 sm:px-6 md:py-6 border-b border-border flex items-center justify-center shadow-sm">
        <Link
          href="/"
          className="absolute left-4 p-2 rounded-full hover:bg-accent/20 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-6 w-6 text-foreground" />
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-foreground">Deals</h1>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl space-y-12 md:space-y-16">
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4 leading-tight">
            Today's Hot Deals
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Craving something delicious? Check out our limited-time offers and
            enjoy your favorites at unbeatable prices!
          </p>
        </section>

        <section className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal) => (
            <Card
              key={deal.slug}
              className="bg-card border border-border rounded-xl p-4 shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-full h-48 sm:h-56 flex items-center justify-center mb-4 overflow-hidden rounded-md">
                <Image
                  src={deal.image}
                  alt={deal.name}
                  width={250}
                  height={200}
                  className="object-contain w-full h-full p-2"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                />
              </div>
              <CardContent className="p-0 flex flex-col flex-grow w-full">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {deal.name}
                </h3>
                {deal.description && (
                  <p className="text-sm line-clamp-2 text-muted-foreground mb-3">
                    {deal.description}
                  </p>
                )}
                {deal.price && (
                  <p className="text-xl text-foreground font-bold mb-4">
                    Rs. {deal.price}
                  </p>
                )}
                <Link href={`/menu/${deal.slug}`} className="mt-auto w-full">
                  <Button className="w-full">View Deal</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="text-center max-w-xl mx-auto py-8 space-y-4">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground">
            Want More Options?
          </h3>
          <p className="text-muted-foreground text-base md:text-lg">
            Explore our full menu for a wider variety of delicious meals and
            customize your perfect order.
          </p>
          <Link href="/menu">
            <Button
              variant="outline"
              size="lg"
              className="mt-4 border-2 font-semibold border-primary text-primary hover:bg-primary/10"
            >
              View Full Menu
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
