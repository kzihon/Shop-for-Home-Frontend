import { Injectable, WritableSignal, signal } from '@angular/core';
import { ProductService } from './product.service';
import { HttpClient } from '@angular/common/http';
import { AuthorizedHttpService } from './authorized-http/authorized-http.service';
import { ShoppingCart } from '../model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  storageKey: string = 'cart-details';
  cart: WritableSignal<Map<number, number>> = signal(null);
  cartSize: WritableSignal<number> = signal(0);

  constructor(private http: HttpClient,
    private authorizedHttpService: AuthorizedHttpService) {
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
  public addProduct(product: FormData) {
    return this.authorizedHttpService.post('/product/create', product);
  }
  getShoppingCart(): ShoppingCart {
    const shoppingCartMap = this.cart();
  
    return {
      cartItems: Array.from(shoppingCartMap.entries()).map(([productId, quantity]) => ({
        productId,
        quantity,
      })),
    };
  }
  sendCartToServerWithOutCoupons(customerId: number){
    let shoppingcart:ShoppingCart=this.getShoppingCart();
    return this.authorizedHttpService.post(`/customer/${customerId}/shopping-cart/`,shoppingcart);

   // return this.authorizedHttpService.post(`/customer/${customerId}/shopping-cart/`,{ cartItems: [...this.cart()] });

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

  removeFromCart(productId: number) {
    let count=this.cart().get(productId);
    this.cart().delete(productId);
    this.cartSize.set(this.cartSize() - count);
    localStorage.setItem(this.storageKey, JSON.stringify([...this.cart()]));
  }
}
