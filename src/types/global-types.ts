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
    | 'mid'
    | string;
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

// verifyAuth.... :3

export type decodedResultType = {
  userId: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  location: string;
};

// useContext Typess ...... :3
// useSessions User type

export interface UserContextValueType {
  user: UserType | null;
  valid: boolean;
  error?: string;
}

export type UserType = {
  userId: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  location: string;
};
