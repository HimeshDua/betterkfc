import {AddToBucketButton} from '@/components/AddToBucketButton';
import CardShowCase from '@/components/CardShowCase';
import {Badge} from '@/components/ui/badge';
import {Card} from '@/components/ui/card';
import {Separator} from '@/components/ui/separator';
import {products} from '@/data/data';
import {ArrowLeft} from 'lucide-react';
import {Metadata} from 'next';
import Image from 'next/image';
import Link from 'next/link';
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
    <div className="bg-background min-h-[calc(100vh-64px)]">
      <div className="bg-background py-4 px-4 sm:px-6 md:py-6 border-b border-border flex items-center justify-between shadow-sm">
        <Link
          href="/"
          prefetch
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Menu
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-foreground">
          {product.name}
        </h1>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <Card className="shadow-lg p-4 md:p-8 flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          <div className="w-full md:w-1/2 flex justify-center items-center bg-card rounded-lg relative aspect-square overflow-hidden border border-border">
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className="object-contain w-full h-full p-4 md:p-6"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="w-full md:w-1/2 space-y-6">
            <div className="flex flex-col gap-3">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary leading-tight">
                {product.name}
              </h2>
              <Badge
                variant="outline"
                className="text-sm px-3 py-1 rounded-full border-primary text-primary self-start"
              >
                {categoryMap[product.category]}
              </Badge>
            </div>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4 text-foreground">
              <span className="text-2xl md:text-3xl font-bold">
                Rs. {product.price}
              </span>
              <span className="text-sm md:text-base text-muted-foreground">
                Tax included
              </span>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              <Badge variant="secondary" className="px-3 py-1 rounded-full">
                Popular
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 rounded-full">
                In Stock
              </Badge>
            </div>

            <Separator className="bg-border" />

            <div className="w-full pt-2">
              <AddToBucketButton product={product} />
            </div>
          </div>
        </Card>
        {mayLike.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6 text-center lg:text-left">
              You may also like
            </h2>
            <div className="flex gap-4 overflow-x-auto -mx-4 px-4 pb-2 sm:pb-4 snap-x scroll-smooth scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              {mayLike.map((item) => (
                <div
                  key={item.slug}
                  className="min-w-[200px] sm:min-w-[240px] md:min-w-[280px] snap-center"
                >
                  <CardShowCase item={item} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default menuSlugPage;
