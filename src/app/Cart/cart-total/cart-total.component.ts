import { Component, Signal, computed } from '@angular/core'
import { CartService } from '../../services/cart.service'
import { ProductService } from '../../services/product.service'

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrl: './cart-total.component.scss'
})
export class CartTotalComponent {
  // public cartMap: Map<number, number>;
  public cartMap: Signal<Map<number, number>> = computed(() =>
    this.cartService.cart()
  )
  public numItems: number
  subtotal: Signal<number> = computed(() => this.calculateSubtotal())
  // subtotal: number;

  constructor (
    private cartService: CartService,
    private productService: ProductService
  ) {
    // this.cartMap = this.cartService.cart;
    // this.subtotal.set(this.calculateSubtotal());
  }

  calculateSubtotal () {
    let total = 0
    for (let [id, quantity] of this.cartMap()) {
      let product = this.productService.getProductById(id)
      total += product.price * quantity
    }
    return Math.round(total * 100) / 100
  }
}
