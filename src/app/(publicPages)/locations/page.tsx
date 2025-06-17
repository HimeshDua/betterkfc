import 'leaflet/dist/leaflet.css';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {ArrowLeft} from 'lucide-react';
import Link from 'next/link';
import {Separator} from '@/components/ui/separator';
import {stores} from '@/data/data';
import LocationsClient from '@/components/pages/LocationsClient';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Find KFC Near You | Better KFC Locations in Karachi',
  description:
    'Discover Better KFC Clone restaurant locations across Karachi including Saddar, Clifton, Gulshan, and DHA. View hours, addresses, and get real-time directions.',
  keywords: [
    'KFC Karachi',
    'Better KFC Clone',
    'KFC near me',
    'fast food locations',
    'Zinger Burger',
    'chicken fries',
    'Karachi food',
    'KFC map',
    'restaurant finder',
    'leaflet map'
  ],
  authors: [{name: 'Himesh Dua', url: 'https://betterkfc.vercel.app'}],
  openGraph: {
    title: 'Better KFC Locations in Karachi',
    description:
      'Explore our Karachi branches including Saddar, Clifton, Gulshan-e-Iqbal and more. Get hours, directions and contact info.',
    type: 'website',
    locale: 'en_US',
    url: 'https://betterkfc.vercel.app/locations',
    siteName: 'Better KFC Clone'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find KFC Near You | Karachi Locations',
    description:
      'Locate your nearest KFC Clone branch in Karachi. Browse store hours, addresses and Google Map directions.',
    images: ['https://betterkfc.vercel.app/og-location.png'],
    creator: '@HimeshDua'
  },
  metadataBase: new URL('https://betterkfc.vercel.app')
};

export default function LocationsPage() {
  return (
    <div className="bg-background text-foreground min-h-[calc(100vh-64px)]">
      <div className="sticky top-14 z-20 bg-background mb-2">
        <div className=" py-4 px-4 sm:px-6 md:py-6 flex items-center justify-center">
          <Link
            href="/"
            className="absolute left-4 p-2 rounded-full hover:bg-accent/20 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="h-6 w-6 text-foreground" />
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Locations
          </h1>
        </div>
        <Separator />
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl space-y-12">
        {/* Intro Section */}
        <section className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
            Finger Lickin' Good, Always Nearby
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Craving KFC? Find your nearest restaurant effortlessly! Explore our
            locations across Karachi and plan your next delicious meal.
          </p>
        </section>
        {/* Map Section */}

        <LocationsClient />
        {/* Stores List Section */}
        <section className="text-center pt-4">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Our Karachi Restaurants
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stores.map((store) => (
              <Card
                key={store.id}
                className="bg-card border border-border rounded-xl p-5 shadow-md flex flex-col items-start text-left hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="p-0 mb-3 w-full">
                  <CardTitle className="text-xl font-semibold text-primary">
                    {store.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-grow w-full">
                  <p className="text-sm text-muted-foreground mb-1">
                    {store.address}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Hours:</span>{' '}
                    {store.hours}
                  </p>
                  {store.phone && (
                    <p className="text-sm text-muted-foreground mt-1">
                      <span className="font-medium text-foreground">
                        Phone:
                      </span>{' '}
                      <a
                        href={`tel:${store.phone}`}
                        className="text-primary hover:underline"
                      >
                        {store.phone}
                      </a>
                    </p>
                  )}
                  <Button
                    variant="outline"
                    className="mt-4 w-full text-sm font-semibold border-primary text-primary hover:bg-primary/10"
                    asChild
                  >
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${store.position[0]},${store.position[1]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Map & Get Directions
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
