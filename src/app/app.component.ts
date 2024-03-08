import { Component, Signal, computed } from '@angular/core';
import { Product, User } from './model';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ShopForHome';
  productsSignal: Signal<Product[]> = computed(() =>
    this.productService.productsSignal()
  );
  constructor(private productService: ProductService) {}
}
