'use server';
import {decodedResultType} from '@/types/global-types';
import {sign, verify} from 'jsonwebtoken';
import {cookies} from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function editCookies(location: string, phone: string) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return {valid: false, user: null, error: 'Unauthorized'};
  }

  let decoded: decodedResultType;
  try {
    decoded = verify(token, JWT_SECRET) as decodedResultType;
  } catch (err) {
    return {valid: false, user: null, error: 'Invalid or expired token'};
  }

  const isAdmin = decoded.role === 'admin';
  const days = isAdmin ? 1 : 7;

  const payload = {
    userId: decoded.userId,
    role: decoded.role,
    name: decoded.name,
    email: decoded.email,
    phone: phone,
    location: location
  };

  const editedToken = sign(payload, JWT_SECRET, {expiresIn: `${days}d`});

  cookieStore.set('token', editedToken, {
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'strict',
    maxAge: days * 60 * 60 * 24
  });

  return {valid: true, user: payload};
}
