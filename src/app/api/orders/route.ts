import verifyAuth from '@/lib/auth';
import connectToDB from '@/lib/connectTodb';
import Order from '@/models/Order.model';
import User from '@/models/User.model';
import {NextRequest, NextResponse} from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const {
      address,
      phone,
      currentCart: productsCart,
      totalPrice
    } = await req.json();

    const authValue = await verifyAuth(['user', 'admin']);
    const userId = authValue.user?.userId;
    // console.log('USER ID:', userId);

    if (!address?.trim() || !phone?.trim()) {
      return NextResponse.json(
        {success: false, error: 'All fields are required.'},
        {status: 400}
      );
    }

    await connectToDB();
    const newOrder = await Order.create({
      userId,
      products: productsCart,
      totalAmount: totalPrice || 0,
      status: 'pending',
      orderedAt: new Date(),
      deliveryAddress: address
    });

    await User.findByIdAndUpdate(userId, {
      $push: {orders: newOrder._id}
    });

    return NextResponse.json(
      {success: true, message: 'Order is Placed Successfully.'},
      {status: 200}
    );
  } catch (error: any) {
    return NextResponse.json(
      {success: false, error: error.message || 'Something went wrong'},
      {status: 500}
    );
  }
}
