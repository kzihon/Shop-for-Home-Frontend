import { Component } from '@angular/core';
import { Product } from '../../model';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  category = ''
  products: Product[] = []
  sort = ''
  length: number;

  constructor (
    public route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit (): void {
    this.route.params.subscribe((params: Params) => {
      this.category = params['categoryName']
      this.loadProducts(params['categoryName'])
      this.length = this.products.length;
    })

    // this.route.queryParams.subscribe((params: Params) => {
    //   this.sort = params['sort']
    //   this.sortEmployees(params['sort'])
    // })
  }

  // sortProducts (sortBy: string) {
  //   if (sortBy === 'name')
  //     this.employees.sort((a, b) => a.name.localeCompare(b.name))
  //   else if (sortBy === 'age') this.employees.sort((a, b) => a.age - b.age)
  // }

  loadProducts (category: string) {
    this.products = this.productService.getProductsByCategory(this.category)
  }
}
