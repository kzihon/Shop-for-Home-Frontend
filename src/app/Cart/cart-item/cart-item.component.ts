import { Component, Input, input } from '@angular/core';
import { Product } from '../../model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() id: number
  public product: Product;

  constructor(private productService: ProductService) {
    
  }

  ngOnInit (): void {
      this.product = this.productService.getProductById(this.id)
  }
}
