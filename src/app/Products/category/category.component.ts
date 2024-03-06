import { Component } from '@angular/core';
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
  sort: string = '';
  sortTypes: string[] = ['Low to High', 'High to Low'];
  length: number;

  constructor(
    public route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.category = params['categoryName'];
      this.loadProducts(params['categoryName']);
      this.length = this.products.length;
    });
  }

  sortProducts() {
    if (this.sort === 'High to Low') {
      this.products.sort((a, b) => b.price - a.price);
    } else if (this.sort === 'Low to High') {
      this.products.sort((a, b) => a.price - b.price);
    }
  }

  loadProducts(category: string) {
    this.products = this.productService.getProductsByCategory(this.category);
  }
}
