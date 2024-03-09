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
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  standalone: true,
  selector: 'app-product-operations',
  templateUrl: './product-operations.component.html',
  styleUrl: './product-operations.component.scss',
})
export class ProductOperationsComponent {
  clickedId: number;
  productsSignal: Signal<Product[]> = computed(() =>
    this.productService.productsSignal()
  );

  constructor(
    public route: ActivatedRoute,
    private productService: ProductService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}

  openCreateProduct() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      formType: 'Create Product',
    };
    this.dialog.open(ProductFormComponent, dialogConfig);
  }
  openEditProduct(product: Product) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      formType: 'Edit Product',
      product: product,
    };
    this.dialog.open(ProductFormComponent, dialogConfig);
  }

  deleteProduct(product: Product) {
    this.productService.deleteProductFrontend(product);
    this.productService.deleteProduct(product.productId).subscribe((res) => {
      console.log(res);
    });
  }
}
