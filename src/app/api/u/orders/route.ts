// /api/u/orders
import connectToDB from '@/lib/connectTodb';
import Order from '@/models/Order.model';
import {NextRequest, NextResponse} from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const {userId} = await req.json();

    if (!userId) {
      return NextResponse.json(
        {success: false, message: 'User ID is required'},
        {status: 400}
      );
    }

    await connectToDB();
    const orders = await Order.find({userId}).sort({orderedAt: -1}).lean(true);

    if (!orders) {
      return NextResponse.json(
        {success: false, message: 'Orders not found.'},
        {status: 404}
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Orders fetched successfully',
        orders
      },
      {status: 200}
    );
  } catch (error: any) {
    console.error('Error fetching user orders:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error.message || 'An unexpected error occurred while fetching orders.'
      },
      {status: 500}
    );
  }
}
