export interface Product {
  productId: number;
  name: string;
  price: number;
  description: string;
  category: CategoryType;
  numberInStock: number;
  supplier: string;
  imageModel: ImageModel;
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

export interface ImageModel {
  id: number;
  name: string;
  type: string;
  filePath: string;
}
export enum CategoryType {
  TABLE,
  CHAIRS,
  LAMPS,
  PLANTS,
  DECOR,
  COUCHES,
  RUGS,
}
export enum IsActive{
  true,
  false

}
export interface AddProduct {
  name: string;
  price: number;
  description: string;
  category: string;
  numberInStock: number;
  supplier: string;
}
export interface FileHandle {
  file: File;
}

export interface EditProductWOImage {
  productId: number;
  name: string;
  price: number;
  description: string;
  category: CategoryType;
  numberInStock: number;
  supplier: string;
}
export interface Order{
  orderId:number
 subTotal:number
  discount:number
  totalBeforeTax:number
  estimatedTaxToBeCollected:number
  orderTotal:number

}
export interface Coupon {
id:number
couponName:string,
code:string
discount:number
active:boolean
}
export interface AddCoupon {
  couponName:string,
  code:string
  discount:number
  active:boolean
  }
export interface ShoppingCart {
  cartItems: CartItem[];
}

export interface CartItem {
  productId: number;
  quantity: number;
}