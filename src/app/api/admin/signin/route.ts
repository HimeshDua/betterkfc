import {NextRequest, NextResponse} from 'next/server';
import User from '@/models/User.model';
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';
import {serialize} from 'cookie';
import connectToDB from '@/lib/connectTodb';

const ADMIN_SECRET = 'Himesh123';
export async function POST(req: NextRequest) {
  const JWT_SECRET = process.env.JWT_SECRET!;
  try {
    const {email, password, secret} = await req.json();

    if (!email?.trim() || !password?.trim() || !secret?.trim()) {
      return NextResponse.json(
        {success: false, error: 'Email and password are required'},
        {status: 400}
      );
    }

    if (secret !== ADMIN_SECRET) {
      return NextResponse.json(
        {success: false, error: 'Invalid Secret'},
        {status: 401}
      );
    }

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    await connectToDB();

    const user = await User.findOne({email: trimmedEmail});

    if (!user) {
      return NextResponse.json(
        {success: false, error: 'Invalid credentials'},
        {status: 401}
      );
    }

    const isMatch = await compare(trimmedPassword, user.password);

    if (!isMatch) {
      return NextResponse.json(
        {success: false, error: 'Invalid credentials'},
        {status: 401}
      );
    }

    const {password: _password, ...userWithoutPassword} = user.toObject();

    const token = sign(
      {
        userId: user._id,
        role: 'admin',
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location
      },
      JWT_SECRET
    );

    const cookie = serialize('token', token, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1 * 24 * 60 * 60
    });

    const res = NextResponse.json(
      {
        success: true,
        message: 'Signed in successfully',
        user: userWithoutPassword
      },
      {status: 200}
    );
    res.headers.set('Set-Cookie', cookie);
    return res;
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: `Failed to sign in: ${error.message}`
      },
      {status: 500}
    );
  }
}
