import {Schema} from 'mongoose';

export interface ProductInterface {
  slug: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  quantity?: number;
}

export type FormDataType = {
  name: string;
  email: string;
  password: string;
};

// User Schema Interfaces
export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'user' | 'admin';
  location: string;
  orders: OrderInterface[];
}

// Order Schema Interfaces
// export interface OrderedProduct {
//   productData: {
//     slug: string;
//     name: string;
//     image: string;
//     price: number;
//   };
//   quantity: number;
//   // selectedOptions?: Record<string, any>;
//   priceAtOrderTime: number;
// }

export interface OrderedProduct {
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface OrderInterface {
  _id: string;
  userId: Schema.Types.ObjectId;
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

// locations page
export type Store = {
  id: number;
  name: string;
  position: [number, number];
  address: string;
  hours: string;
  phone?: string;
};
