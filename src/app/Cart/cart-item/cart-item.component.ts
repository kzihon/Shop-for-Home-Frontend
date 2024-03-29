import { Component, Input, input } from '@angular/core';
import { Product } from '../../model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  @Input() productId: number;
  @Input() quantity: number;
  public product: Product;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProduct(this.productId);
  }
  loadProduct(id: number) {
    this.productService.getProductByIdServer(this.productId).subscribe((product: Product) => {
      this.product = product;
    });
  }



  removeItem() {
    this.cartService.removeFromCart(this.productId);
  }

  increase() {
    if (this.quantity < this.product.numberInStock) {
      this.quantity++;
      this.cartService.addToCart(this.product.productId, 1);
    }
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
      this.cartService.addToCart(this.product.productId, -1);
    }
  }

  round(price: number) {
    return Math.round(price * 100) / 100;
  }
}
