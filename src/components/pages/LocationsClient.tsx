'use client';
import React from 'react';
import 'leaflet/dist/leaflet.css';

import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import L from 'leaflet';
import {stores} from '@/data/data';
import {Button} from '../ui/button';

// delete (L.Icon.Default as any).prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: '/leaflet/marker-icon-2x.png',
//   iconUrl: '/leaflet/marker-icon.png',
//   shadowUrl: '/leaflet/marker-shadow.png'
// });

function LocationsClient() {
  const defaultCenter: [number, number] = [24.87, 67.08];

  return (
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
                <p className="text-sm text-muted-foreground">{store.address}</p>
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
  );
}

export default LocationsClient;
