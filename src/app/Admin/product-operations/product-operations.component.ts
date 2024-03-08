import { Component, Signal, computed } from '@angular/core';
import { GeneralFormComponent } from '../general-form/general-form.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoryType, Product } from '../../model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-operations',
  templateUrl: './product-operations.component.html',
  styleUrl: './product-operations.component.scss',
})
export class ProductOperationsComponent {
  // products: Product[] = [];
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
    // for (let product of this.productsSignal()) {
    //   console.log('one item in admin products', product.name);
    // }
    // this.productsSignal().forEach((product) => console.log('item', product));
    // console.log(
    //   'all items in admin backend',
    //   this.productsSignal(),
    //   this.productsSignal().length,
    //   typeof this.productsSignal()
    // );
  }

  ngOnInit() {
    // this.products = this.productService.getProducts();
    this.productsSignal().forEach((product) =>
      console.log('item', product, product.imageModel)
    );
    console.log(
      'all items in admin backend',
      this.productsSignal(),
      this.productsSignal().length,
      typeof this.productsSignal()
    );
  }

  // sortProducts() {
  //   if (this.sort === 'High to Low') {
  //     this.products.sort((a, b) => b.price - a.price);
  //   } else if (this.sort === 'Low to High') {
  //     this.products.sort((a, b) => a.price - b.price);
  //   }
  // }

  // loadProducts(category: CategoryType) {
  //   this.products = this.productService.getProductsByCategory(this.category);
  // }

  openCreateProduct() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.data = {
      formType: 'Create Product',
    };
    this.dialog.open(GeneralFormComponent, dialogConfig);
  }
  openEditProduct(product: Product) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.data = {
      formType: 'Edit Product',
      product: product,
    };
    this.dialog.open(GeneralFormComponent, dialogConfig);
  }

  deleteProduct(product: Product) {
    if (product.productId == null) {
      console.log('no id');
    } else {
      this.productService.deleteProductFrontend(product);
      this.productService.deleteProduct(product.productId).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
