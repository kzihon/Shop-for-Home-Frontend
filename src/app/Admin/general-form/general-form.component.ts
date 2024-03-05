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

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrl: './general-form.component.scss',
})
export class GeneralFormComponent {
  formType: string;
  categories: string[] = [
    'tables',
    'chairs',
    'lamps',
    'plants',
    'decor',
    'couches',
    'rugs',
  ];
  id: FormControl<number> = new FormControl();

  name: FormControl<string> = new FormControl('');
  price: FormControl<number> = new FormControl();
  description: FormControl<string> = new FormControl('');
  category: string = '';
  numberInStock: FormControl<number> = new FormControl();
  supplierName: FormControl<string> = new FormControl('');
  img: FormControl<string> = new FormControl('');

  email = new FormControl('');

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<GeneralFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);
    this.formType = this.data.formType;
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
      this.category == '' ||
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
          },
          error: (message) => {
            console.log(message);
          },
        });

      this.closeDialog();
    }
  }

  // deleteProduct() {
  //   if (this.id.value == null) {
  //     console.log('fill out required fields');
  //   } else {
  //     this.productService.deleteProduct(this.id.value).subscribe({
  //       next: (product) => {
  //         console.log(product);
  //       },
  //       error: (message) => {
  //         console.log(message);
  //       },
  //     });
  //     this.closeDialog();
  //   }
  // }
}
