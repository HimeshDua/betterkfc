import {NextRequest} from 'next/server';
import User from '@/models/User.model';
import {genSalt, hash} from 'bcryptjs';
import {serialize} from 'cookie';
import {sign} from 'jsonwebtoken';
import {NextResponse} from 'next/server';
import connectToDB from '@/lib/connectTodb';

export async function POST(req: NextRequest) {
  const JWT_SECRET = process.env.JWT_SECRET!;
  try {
    const {name, email, password, location, phone} = await req.json();

    if (!name?.trim() || !email?.trim() || !password?.trim()) {
      return NextResponse.json(
        {success: false, error: 'Missing fields'},
        {status: 400}
      );
    }

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    const trimmedLocation = location.trim();
    const trimmedPhone = phone.trim();

    const salt = await genSalt();
    const hashedPass = await hash(trimmedPassword, salt);
    await connectToDB();

    const existingEmail = await User.findOne({email: trimmedEmail}).select(
      'email'
    );

    if (existingEmail) {
      return NextResponse.json(
        {success: false, error: 'Email already exists'},
        {status: 400}
      );
    }

    const existingPhone = await User.findOne({phone: trimmedPhone}).select(
      'phone'
    );

    if (existingPhone) {
      return NextResponse.json(
        {success: false, error: 'Phone already exists'},
        {status: 400}
      );
    }

    const newUser = await User.create({
      name: trimmedName,
      password: hashedPass,
      email: trimmedEmail,
      location: trimmedLocation,
      phone: trimmedPhone
    });

    const {password: _password, ...userWithoutPassword} = newUser.toObject();

    const token = sign(
      {
        userId: newUser._id,
        role: newUser.role,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        location: newUser.location
      },
      JWT_SECRET
    );

    const cookie = serialize('token', token, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 60 * 60 * 24
    });

    const res = NextResponse.json(
      {
        success: true,
        message: 'User created succesfully',
        user: userWithoutPassword
      },
      {status: 200}
    );
    res.headers.set('Set-Cookie', cookie);
    return res;
  } catch (error: any) {
    return NextResponse.json(
      {success: false, error: `Failed to create user: ${error.message}`},
      {status: 500}
    );
  }
}
