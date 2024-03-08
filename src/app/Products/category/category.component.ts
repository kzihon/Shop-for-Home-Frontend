import { Component, Signal, computed } from '@angular/core';
import { CategoryType, Product } from '../../model';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  category: CategoryType;
  products: Product[] = [];
  productsSignal: Signal<Product[]> = computed(() =>
    this.productService.productsSignal()
  );
  sort: string = '';
  sortTypes: string[] = ['Low to High', 'High to Low'];

  constructor(
    public route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.category = params['categoryName'];
    });
    this.loadProducts(this.category);
  }

  sortProducts() {
    if (this.sort === 'High to Low') {
      this.products.sort((a, b) => b.price - a.price);
    } else if (this.sort === 'Low to High') {
      this.products.sort((a, b) => a.price - b.price);
    }
  }

  loadProducts(category: CategoryType) {
    if (category.toString() === 'ALL PRODUCTS') {
      this.products = this.productsSignal();
    } else {
      this.products = this.productService.getProductsByCategory(category);
    }
  }
}
