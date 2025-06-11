import {OrderInterface} from '@/types/global-types';
import {model, models, Schema} from 'mongoose';

const orderSchema = new Schema<OrderInterface>(
  {
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},

    products: [
      {
        slug: {type: String, required: true},
        name: {type: String, required: true},
        image: {type: String, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true}
      }
    ],
    totalAmount: {type: Number, required: true},
    status: {
      type: String,
      enum: ['pending', 'preparing', 'delivered', 'cancelled'],
      default: 'pending'
    },
    paymentMethod: {
      type: String,
      enum: ['cod', 'card'],
      default: 'cod'
    },
    orderedAt: {type: Date, default: Date.now},
    deliveryAddress: {type: String, required: true}
  },
  {timestamps: true}
);

const Order = models.Order || model<OrderInterface>('Order', orderSchema);
export default Order;
