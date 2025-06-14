'use client';
import React from 'react';
import {Card, CardContent} from './ui/card';
import Link from 'next/link';
import Image from 'next/image';
import {ProductInterface} from '@/types/global-types';

function CardShowCase({item}: {item: ProductInterface}) {
  return (
    <Card
      key={item.slug}
      className="flex-shrink-0 w-64 sm:w-72 rounded-xl shadow-md border overflow-hidden"
    >
      <Link href={item.slug}>
        <Image
          src={item.image}
          alt={item.name}
          width={288}
          height={180}
          className="rounded-t-xl object-cover w-full h-40 sm:h-48"
          onError={(e) => {
            e.currentTarget.src = `https://placehold.co/288x180/6B7280/FFFFFF?text=Image+Error`;
            e.currentTarget.alt = `Image for ${item.name} failed to load`;
          }}
        />
      </Link>
      <CardContent className="flex flex-col space-y-2 p-4">
        <h3 className="font-semibold text-base sm:text-lg truncate">
          {item.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          Rs {item.price.toFixed(2)} each
        </p>
      </CardContent>
    </Card>
  );
}
export default CardShowCase;
