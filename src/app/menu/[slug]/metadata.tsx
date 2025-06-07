import {products} from '@/data/products';
import type {Metadata} from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{slug: string}>;
}): Promise<Metadata> {
  const ressolvedParams = await params;
  const product = products.find((p) => p.id === ressolvedParams.slug);
  if (!product) return {};

  return {
    title: `${product.name} | KFC Clone`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [`https://betterkfc.vercel.app${product.image}`]
    }
  };
}
