import { Component, Signal, computed, effect } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrl: './cart-total.component.scss',
})
export class CartTotalComponent {
  // public cartMap: Map<number, number>;
  public cartMap: Signal<Map<number, number>> = computed(() =>
    this.cartService.cart()
  );
  public numItems: number;
  subtotal: Signal<number> = computed(() => this.calculateSubtotal());
  // subtotal: number;

  constructor(
    private userService: UserService,
    private cartService: CartService,
    private productService: ProductService
  ) {
    effect(() => {
      this.calculateSubtotal();
    });
    // this.cartMap = this.cartService.cart;
    // this.subtotal.set(this.calculateSubtotal());
    // console.log('testing', this.cartMap().size);
  }

  calculateSubtotal() {
    let total = 0;
    for (let [id, quantity] of this.cartMap()) {
      let product = this.productService.getProductById(id);
      total += product.price * quantity;
    }
    return Math.round(total * 100) / 100;
  }
}
