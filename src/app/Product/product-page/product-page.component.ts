import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {
  productName = '';
  product: Product;

  constructor (
    public route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit (): void {
    this.route.params.subscribe((params: Params) => {
      this.productName = params['productId']
      this.product = this.productService.getProductById(params['productId'])
    })

    console.log(this.product);
}
}