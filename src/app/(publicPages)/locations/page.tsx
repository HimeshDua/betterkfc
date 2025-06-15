'use client';

import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {ArrowLeft} from 'lucide-react'; // For the back arrow icon
import Link from 'next/link';

type Store = {
  id: number;
  name: string;
  position: [number, number];
  address: string;
  hours: string;
  phone?: string;
};

const stores: Store[] = [
  {
    id: 1,
    name: 'KFC Saddar Karachi',
    position: [24.855891547657794, 67.02978965857143],
    address: 'Plot No. 7, Abdullah Haroon Road, Saddar, Karachi',
    hours: '11:00 AM - 12:00 AM',
    phone: '(021) 111-532-532'
  },
  {
    id: 2,
    name: 'KFC Gulshan-e-Iqbal',
    position: [24.9235, 67.0822],
    address: 'Block 5, Rashid Minhas Road, Gulshan-e-Iqbal, Karachi',
    hours: '10:00 AM - 2:00 AM',
    phone: '(021) 111-532-532'
  },
  {
    id: 3,
    name: 'KFC DHA Phase 6',
    position: [24.7985, 67.0676],
    address: '26th St, Tauheed Commercial Area, DHA Phase 6, Karachi',
    hours: '24 Hours',
    phone: '(021) 111-532-532'
  },
  {
    id: 4,
    name: 'KFC Malir Cantt',
    position: [24.9125, 67.1818],
    address: 'Main Malir Cantt Road, Karachi',
    hours: '11:00 AM - 1:00 AM',
    phone: '(021) 111-532-532'
  },
  {
    id: 5,
    name: 'KFC Clifton',
    position: [24.8142, 67.0264],
    address: 'Ocean Mall, G-3, Block 9, Clifton, Karachi',
    hours: '11:00 AM - 12:00 AM',
    phone: '(021) 111-532-532'
  },
  {
    id: 6,
    name: 'KFC Shahra-e-Faisal',
    position: [24.8569, 67.0617],
    address: 'P.E.C.H.S. Block 2, Shahra-e-Faisal, Karachi',
    hours: '24 Hours',
    phone: '(021) 111-532-532'
  }
];

// Fix for default Leaflet icon paths
delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png'
});

export default function LocationsPage() {
  const defaultCenter: [number, number] = [24.87, 67.08];

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
        <h1 className="text-xl md:text-2xl font-bold text-foreground">
          Locations
        </h1>
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
        <section className="w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden border-2 border-border shadow-lg bg-card">
          <MapContainer
            center={defaultCenter}
            zoom={12}
            scrollWheelZoom={true}
            className="w-full h-full z-0"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {stores.map((store) => (
              <Marker key={store.id} position={store.position}>
                <Popup>
                  <div className="font-sans text-foreground">
                    <h4 className="text-lg font-semibold text-primary mb-1">
                      {store.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {store.address}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Hours:{' '}
                      <strong className="text-foreground">{store.hours}</strong>
                    </p>
                    {store.phone && (
                      <p className="text-sm text-muted-foreground">
                        Phone:{' '}
                        <a
                          href={`tel:${store.phone}`}
                          className="text-primary hover:underline"
                        >
                          {store.phone}
                        </a>
                      </p>
                    )}
                    <Button
                      variant="link"
                      className="p-0 h-auto text-primary justify-start mt-2"
                      asChild
                    >
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${store.position[0]},${store.position[1]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </section>

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
