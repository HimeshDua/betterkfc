import {AddToBucketButton} from '@/components/AddToBucketButton';
import CardShowCase from '@/components/CardShowCase';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {products} from '@/data/data';
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

async function menuSlugPage({params}: {params: Promise<{slug: string}>}) {
  const resolvedParams = await params;
  const product = products.find((p) => p.slug === resolvedParams.slug);
  if (!product) return notFound();
  // const {addToCart} = useCart();

  const categoryMap: Record<string, string> = {
    promotion: 'Promotion',
    'everyday-value': 'Everyday Value',
    'ala-cc': 'Ala-Carte-&-Combos',
    signature: 'Signature',
    sharing: 'Sharing',
    's-n-b': 'Snacks-&-Beverages',
    mid: 'Midnight (Start at 12 am)',
    all: 'All Products'
  };

  const mayLike = products
    .filter((p) => p.category === product.category)
    .filter((p) => p.slug !== product.slug);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="w-full">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={400}
            className="rounded-2xl object-cover w-full h-[260px] sm:h-[360px] md:h-[420px] lg:h-[480px]"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Product Info Section */}
        <Card className="w-full">
          <CardContent className="p-6 space-y-5">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold text-primary">
                {product.name}
              </h1>
              <Badge variant="outline" className="text-xs">
                {categoryMap[product.category]}
              </Badge>
            </div>

            <p className="text-muted-foreground text-sm sm:text-base">
              {product.description}
            </p>

            <div className="flex items-center gap-4">
              <span className="text-lg sm:text-xl font-semibold text-foreground">
                Rs. {product.price}
              </span>
              <span className="text-sm text-muted-foreground">
                Tax included
              </span>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              <Badge variant="secondary">Popular</Badge>
              <Badge variant="secondary">In Stock</Badge>
            </div>

            <Separator />

            <div className="w-full">
              <AddToBucketButton product={product} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Section */}
      {mayLike.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg sm:text-xl font-bold mb-4">
            You may also like
          </h2>
          <div className="flex gap-4 overflow-x-auto -mx-4 px-4 pb-2 sm:pb-4 snap-x scroll-smooth scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
            {mayLike.map((item) => (
              <CardShowCase key={item.slug} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default menuSlugPage;
