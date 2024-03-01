import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  storageKey: string = 'cart-details';
  // cart: Map<number, number>;
  cart: WritableSignal<Map<number, number>> = signal(null);

  constructor() {
    this.loadCart();
  }
  loadCart() {
    const cartStringified = this.getSavedCart();
    if (cartStringified == null) {
      this.cart.set(new Map<number, number>());
    } else {
      this.cart.set(new Map(JSON.parse(cartStringified)));
    }
  }

  getSavedCart() {
    console.log('getting saved cart');
    console.log(localStorage.getItem(this.storageKey));
    return localStorage.getItem(this.storageKey) || null;
  }

  addToCart(productId: number, quantity: number) {
    if (this.cart().has(productId)) {
      this.cart().set(productId, this.cart().get(productId) + quantity);
    } else {
      this.cart().set(productId, quantity);
    }
    localStorage.setItem(this.storageKey, JSON.stringify([...this.cart()]));
  }

  emptyCart() {
    this.cart.set(new Map<number, number>());
    localStorage.removeItem(this.storageKey);
  }

  removeFromCart(id: number) {
    this.cart().delete(id);
    localStorage.setItem(this.storageKey, JSON.stringify([...this.cart()]));
  }
}
