// import verifyAuth from '@/lib/auth';
import '@/models/Order.model';
import connectToDB from '@/lib/connectTodb';
import User from '@/models/User.model';
import {NextResponse} from 'next/server';

export async function GET() {
  try {
    // const {user, valid} = await verifyAuth(['admin']);
    // if (!valid || user?.role !== 'admin') {
    //   return NextResponse.json(
    //     {success: false, error: 'Only Admins can access this route'},
    //     {status: 401}
    //   );
    // }

    await connectToDB();
    const allUsers = await User.find().select('-password').populate({
      path: 'orders',
      select: 'products totalAmount status orderedAt deliveryAddress'
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Users fetched successfully.',
        users: allUsers
      },
      {status: 200}
    );
  } catch (error: any) {
    return NextResponse.json(
      {success: false, error: error.message || 'Something went wrong'},
      {status: 500}
    );
  }
}
