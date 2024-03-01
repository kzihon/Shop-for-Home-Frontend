export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  numberInStock: number;
  supplierName: string;
  img: string;
}

export interface Category {
  name: string;
  img: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  cart: Map<number, number>;
  wishlist: number[];
}
