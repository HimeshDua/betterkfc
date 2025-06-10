import {AddToBucketButton} from '@/components/AddToBucketButton';
import {products} from '@/data/products';
import {Metadata} from 'next';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import React from 'react';

export async function generateStaticParams() {
  return products.map((item) => ({slug: item.slug}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{slug: string}>;
}): Promise<Metadata> {
  const ressolvedParams = await params;
  const product = products.find((p) => p.slug === ressolvedParams.slug);
  if (!product) {
    return {
      title: 'Product not found'
    };
  }
  return {
    title: product.name,
    description: product.description,
    keywords: [
      'kfc',
      product.name,
      'fast food',
      'burger',
      'chicken',
      'Zinger',
      'Fries'
    ],
    authors: [{name: 'Himesh Dua', url: 'https://betterkfc.vercel.app'}],
    openGraph: {
      title: product.name,
      description: product.description,
      images: [`https://betterkfc.vercel.app${product.image}`],
      type: 'article',
      locale: 'en_US',
      url: `https://betterkfc.vercel.app/menu/${product.slug}`
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [`https://betterkfc.vercel.app${product.image}`],
      creator: '@HimeshDua'
    },
    metadataBase: new URL('https://betterkfc.vercel.app')
  };
}

async function page({params}: {params: Promise<{slug: string}>}) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);
  if (!product) return notFound();
  // const {addToCart} = useCart();

  return (
    <div className="p-4 sm:p-6 max-w-full md:max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 flex-shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            width={500}
            height={350}
            className="rounded-xl object-cover w-full h-56 sm:h-72 md:h-80 lg:h-96"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        <div className="flex flex-col justify-between py-2 gap-4 w-full md:w-1/2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-primary">
              {product.name}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              {product.description}
            </p>
            <p className="mt-4 text-base sm:text-lg text-foreground font-semibold">
              Rs. {product.price}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Category: {product.category}
            </p>
          </div>
          <div className="w-full">
            <AddToBucketButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
