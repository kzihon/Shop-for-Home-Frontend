import { Component, Signal, computed } from '@angular/core';
import { GeneralFormComponent } from '../general-form/general-form.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '../../model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-operations',
  templateUrl: './product-operations.component.html',
  styleUrl: './product-operations.component.scss',
})
export class ProductOperationsComponent {
  category = '';
  products: Product[] = [];
  sort: string = '';
  sortTypes: string[] = ['Low to High', 'High to Low'];
  length: number;
  clickedId: number;
  productsSignal: Signal<Product[]> = computed(() =>
    this.productService.productsSignal()
  );

  constructor(
    public route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog
  ) {
    // this.products = this.productService.getProducts();
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
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

  openCreateProduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.data = {
      formType: 'Create Product',
    };
    this.dialog.open(GeneralFormComponent, dialogConfig);
  }
  openEditProduct(product: Product) {
    // this.clickedId = id;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.data = {
      formType: 'Edit Product',
      // id: this.clickedId,
      product: product,
    };
    this.dialog.open(GeneralFormComponent, dialogConfig);
  }

  deleteProduct(productId: number) {
    if (productId == null) {
      console.log('no id');
    } else {
      this.productService.deleteProduct(productId).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
