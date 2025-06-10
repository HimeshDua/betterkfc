'use server';
import {decodedResultType} from '@/types/global-types';
import {verify} from 'jsonwebtoken';
import {cookies} from 'next/headers';

const verifyAuth = async (allowedRole: string[]) => {
  const JWT_SECRET = process.env.JWT_SECRET!;
  const token = (await cookies()).get('token')?.value;

  if (!token) {
    return {valid: false, user: null, error: 'Unauthorized'};
  }
  const decoded = verify(token, JWT_SECRET) as decodedResultType;

  if (!allowedRole.includes(decoded.role)) {
    return {valid: false, user: null, error: 'Forbidden'};
  }
  return {valid: true, user: decoded};
};

export default verifyAuth;
