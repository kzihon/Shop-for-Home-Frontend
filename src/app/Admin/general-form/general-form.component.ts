import { Component, Inject, Input } from '@angular/core';
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { CategoryType, Product } from '../../model';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrl: './general-form.component.scss',
})
export class GeneralFormComponent {
  formType: string;
  categories = [
    { displayName: 'Chairs', value: CategoryType.CHAIRS },
    { displayName: 'Couches', value: CategoryType.COUCHES },

    // 'CHAIRS',
    // CategoryType.COUCHES,
    // CategoryType.DECOR,
    // CategoryType.LAMPS,
    // CategoryType.PLANTS,
    // CategoryType.RUGS,
    // CategoryType.TABLE,
  ];
  id: FormControl<number> = new FormControl();

  name: FormControl<string> = new FormControl('');
  price: FormControl<number> = new FormControl();
  description: FormControl<string> = new FormControl('');
  category: CategoryType;
  numberInStock: FormControl<number> = new FormControl();
  supplierName: FormControl<string> = new FormControl('');
  img: FormControl<string> = new FormControl('');

  email = new FormControl('');
  product: Product;

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<GeneralFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.categories);
    this.formType = this.data.formType;
    if (this.formType == 'Edit Product') {
      this.fillFields();
    }
  }

  fillFields() {
    this.product = this.data.product;
    this.name.setValue(this.product.name);
    this.price.setValue(this.product.price);
    this.description.setValue(this.product.description);
    this.category = this.product.category;
    this.numberInStock.setValue(this.product.numberInStock);
    this.supplierName.setValue(this.product.supplier);
    console.log(this.product);
  }

  closeDialog() {
    this.dialogRef.close();
  }
  selectCategory() {}

  createProduct() {
    if (
      this.name.value == '' ||
      (this.price.value == null && this.price.value <= 0) ||
      this.description.value == '' ||
      this.category == null ||
      (this.numberInStock.value == null && this.numberInStock.value <= 0) ||
      this.supplierName.value == ''
    ) {
      console.log('fill out required fields');
    } else {
      this.productService
        .createProduct(
          this.name.value,
          this.price.value,
          this.description.value,
          this.category,
          this.numberInStock.value,
          this.supplierName.value
        )
        .subscribe({
          next: (product) => {
            console.log(product);
            this.productService.createProductFrontend(product);
          },
          error: (message) => {
            console.log(message);
          },
        });
      this.closeDialog();
    }
  }

  editProduct() {
    if (
      this.name.value == '' ||
      (this.price.value == null && this.price.value <= 0) ||
      this.description.value == '' ||
      this.category == null ||
      (this.numberInStock.value == null && this.numberInStock.value <= 0) ||
      this.supplierName.value == ''
    ) {
      console.log('fill out required fields');
    } else {
      this.productService
        .editProduct(
          this.product.productId,
          this.name.value,
          this.price.value,
          this.description.value,
          this.category,
          this.numberInStock.value,
          this.supplierName.value
        )
        .subscribe({
          next: (product) => {
            this.productService.editProductFrontend(this.product, product);
            console.log(product);
          },
          error: (message) => {
            console.log(message);
          },
        });

      this.closeDialog();
    }
  }
}
