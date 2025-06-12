'use server';
import {decodedResultType} from '@/types/global-types';
import {verify} from 'jsonwebtoken';
import {cookies} from 'next/headers';

const verifyAuth = async (allowedRole: string[]) => {
  const JWT_SECRET = process.env.JWT_SECRET!;
  try {
    const token = (await cookies()).get('token')?.value;

    if (!token) {
      return {valid: false, user: null, error: 'Unauthorized'};
    }
    const decoded = verify(token, JWT_SECRET) as decodedResultType;

    if (!allowedRole.includes(decoded.role)) {
      return {valid: false, user: null, error: 'Forbidden'};
    }
    return {valid: true, user: decoded};
  } catch (err: any) {
    return {
      valid: false,
      user: null,
      error: err.message || 'Invalid or expired token'
    };
  }
};

export default verifyAuth;
