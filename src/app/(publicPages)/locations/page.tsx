'use client';

import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';

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

delete (L.Icon.Default as any).prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/leaflet/marker-icon-2x.png',
  iconUrl: '/leaflet/marker-icon.png',
  shadowUrl: '/leaflet/marker-shadow.png'
});

export default function LocationsPage() {
  const defaultCenter: [number, number] = [24.87, 67.08];

  return (
    <section className="min-h-screen bg-background text-foreground px-4 py-12 md:px-12 lg:px-20 space-y-16">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
          Finger Lickin' Good, Always Nearby
        </h1>
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          Craving KFC? Find your nearest restaurant effortlessly! Explore our
          locations across Karachi and plan your next delicious meal.
        </p>
      </div>

      <div className="w-full h-[500px] md:h-[600px] rounded-xl overflow-hidden border-2 border-border shadow-lg">
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
                    Hours: <strong>{store.hours}</strong>
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
      </div>

      <div className="text-center max-w-3xl mx-auto pt-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          Our Karachi Restaurants
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  <span className="font-medium">Hours:</span> {store.hours}
                </p>
                {store.phone && (
                  <p className="text-sm text-muted-foreground mt-1">
                    <span className="font-medium">Phone:</span>{' '}
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
                  className="mt-4 w-full text-sm font-semibold"
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
      </div>
    </section>
  );
}
