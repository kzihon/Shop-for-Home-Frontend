import { Component, Signal, computed } from '@angular/core';
import { Product } from '../../model';
import { ProductService } from '../../services/product.service';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrl: './product-data.component.scss',
  imports: [NgIf],
})
export class ProductDataComponent {
  productsSignal: Signal<Product[]> = computed(() =>
    this.productService.productsSignal()
  );

  constructor(private productService: ProductService) {
    console.log(this.productsSignal());
  }
}
