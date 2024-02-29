import { Component } from '@angular/core';
import { Product } from '../../model';
import { UserService } from '../../services/user.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.scss'
})
export class WishlistPageComponent {
  public productIds: number[];
  public products: Product[];
  
  constructor(userService: UserService, private productService: ProductService) {
    this.productIds = userService.user.cart;
    this.loadProducts(this.productIds)
  }


  loadProducts (productIds: number[]) {
    this.products = this.productService.getProductsByIds(this.productIds)
  }
}
