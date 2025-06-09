'use server';

import {cookies} from 'next/headers';

export async function addToCookieCart(product: any) {
  const cookieStore = await cookies();
  const cart = JSON.parse(cookieStore.get('cart')?.value || '[]');
  cart.push(product);
  cookieStore.set('cart', JSON.stringify(cart), {
    httpOnly: false,
    path: '/',
    maxAge: 60 * 60 * 24
  });
}
