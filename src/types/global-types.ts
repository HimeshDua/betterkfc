export interface ProductInterface {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity?: number;
}

export type FormDataType = {
  name: string;
  email: string;
  password: string;
};
