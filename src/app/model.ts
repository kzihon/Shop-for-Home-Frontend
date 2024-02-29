export interface Product {
    name: string
    price: number
    category: string
    img: string
    id: number
  }

export interface Category {
    name: string,
    img: string
}
  
export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isAdmin: boolean,
    cart: number[],
    wishlist: number[]

}
