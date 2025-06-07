import {products} from '@/data/products';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import React from 'react';

export async function generateStaticParams() {
  return products.map((item) => ({slug: item.id}));
}

async function page({params}: {params: Promise<{slug: string}>}) {
  const resolvedParams = await params;
  const product = products.find((p) => p.id === resolvedParams.slug);
  if (!product) return notFound();

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <Image
        src={product.image}
        alt={product.name}
        width={600}
        height={400}
        className="rounded-xl mt-4"
      />
      <p className="mt-2 text-gray-600">{product.description}</p>
      <p className="mt-4 font-semibold text-xl">Rs. {product.price}</p>
    </div>
  );
}

export default page;
