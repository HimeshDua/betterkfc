'use server';

import {cookies} from 'next/headers';

export async function getCartFromCookie() {
  const storedCookie = await cookies();
  const cartData = storedCookie.get('cart')?.value;
  return cartData ? JSON.parse(cartData) : [];
}
