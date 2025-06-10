import {Schema} from 'mongoose';

export interface ProductInterface {
  slug: string;
  name: string;
  price: number;
  image: string;
  category:
    | 'all'
    | 'promotion'
    | 'everyday-value'
    | 'ala-cc'
    | 'signature'
    | 'sharing'
    | 's-n-b'
    | 'mid';
  quantity?: number;
}

export type FormDataType = {
  name: string;
  email: string;
  password: string;
};

// User Schema Interfaces
export interface UserInterface {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'user' | 'admin';
  location: string;
  orders: Schema.Types.ObjectId[];
}

// Order Schema Interfaces
export interface OrderedProduct {
  productData: {
    slug: string;
    name: string;
    image: string;
    price: number;
  };
  quantity: number;
  // selectedOptions?: Record<string, any>;
  priceAtOrderTime: number;
}

export interface OrderInterface {
  products: OrderedProduct[];
  deliveryAddress: string;
  orderedAt: Date;
  totalAmount: number;
  paymentMethod: 'cod' | 'card';
  status: 'pending' | 'preparing' | 'delivered' | 'cancelled';
}
