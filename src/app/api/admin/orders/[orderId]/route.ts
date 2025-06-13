// app/api/admin/orders/[orderId]/route.ts
import {NextRequest, NextResponse} from 'next/server';
import connectToDB from '@/lib/connectTodb';
import Order from '@/models/Order.model';

export async function PATCH(
  req: NextRequest,
  context: {params: {orderId: string}}
) {
  try {
    await connectToDB();
    const {orderId} = context.params;
    const {status} = await req.json();

    const updatedStatus = await Order.findByIdAndUpdate(
      orderId,
      {status},
      {new: true}
    ).select('status');

    if (!updatedStatus) {
      return NextResponse.json(
        {success: false, error: 'Order not found'},
        {status: 404}
      );
    }

    return NextResponse.json(
      {success: true, message: 'Order status updated', order: updatedStatus},
      {status: 200}
    );
  } catch (error: any) {
    return NextResponse.json(
      {success: false, error: error.message || 'Update failed'},
      {status: 500}
    );
  }
}
