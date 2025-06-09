'use client';

import {Button} from '@/components/ui/button';
import {useCart} from '@/contexts/CartContext';
import {ProductInterface} from '@/types/ProductType';

export function AddToBucketButton({product}: {product: ProductInterface}) {
  const {addToCart} = useCart();
  return (
    <Button className="mt-6 w-full md:w-fit" onClick={() => addToCart(product)}>
      Add to Bucket
    </Button>
  );
}
