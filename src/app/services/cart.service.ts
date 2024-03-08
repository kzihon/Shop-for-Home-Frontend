import { Injectable, WritableSignal, signal } from '@angular/core';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  storageKey: string = 'cart-details';
  cart: WritableSignal<Map<number, number>> = signal(null);
  cartSize: WritableSignal<number> = signal(0);

  constructor() {
    this.loadCart();
  }

  getCartSize() {
    let count = 0;
    for (let item of this.cart().values()) {
      count += item;
    }
    return count;
  }

  loadCart() {
    const cartStringified = this.getSavedCart();
    if (cartStringified == null) {
      this.cart.set(new Map<number, number>());
      this.cartSize.set(0);
    } else {
      this.cart.set(new Map(JSON.parse(cartStringified)));
      this.cartSize.set(this.getCartSize());
    }
  }

  getSavedCart() {
    return localStorage.getItem(this.storageKey) || null;
  }

  addToCart(productId: number, quantity: number) {
    if (this.cart().has(productId)) {
      this.cart().set(productId, this.cart().get(productId) + quantity);
    } else {
      this.cart().set(productId, quantity);
    }
    this.cartSize.set(this.cartSize() + quantity);
    localStorage.setItem(this.storageKey, JSON.stringify([...this.cart()]));
  }

  emptyCart() {
    this.cart.set(new Map<number, number>());
    this.cartSize.set(0);
    localStorage.removeItem(this.storageKey);
  }

  removeFromCart(id: number) {
    this.cart().delete(id);
    this.cartSize.set(this.cartSize() - this.cart().get(id));
    localStorage.setItem(this.storageKey, JSON.stringify([...this.cart()]));
  }
}
