import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {
  AddProduct,
  CategoryType,
  EditProductWOImage,
  FileHandle,
  Product,
} from '../model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorizedHttpService } from '../services/authorized-http/authorized-http.service';
import { ProductService } from '../services/product.service';
import { GeneralFormComponent } from '../Admin/general-form/general-form.component';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  productForm!: FormGroup;
  formType: string;
  categories = [
    'TABLE',
    'CHAIRS',
    'LAMPS',
    'PLANTS',
    'DECOR',
    'COUCHES',
    'RUGS',
  ];
  category: CategoryType = null;

  productForCreate: AddProduct = {
    name: '',
    price: 0,
    description: '',
    category: '',
    numberInStock: 0,
    supplier: '',
  };
  productImage: FileHandle;
  selectedProduct: Product;

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductFormComponent>,
    private authorizedHttp: AuthorizedHttpService,
    private fb: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formType = this.data.formType;
  }

  ngOnInit(): void {
    if (this.formType == 'Edit Product') {
      this.selectedProduct = this.data.product;
      this.productForm = this.fb.group({
        name: [this.selectedProduct.name, [Validators.required]],
        price: [this.selectedProduct.price, [Validators.required]],
        description: [this.selectedProduct.description, [Validators.required]],
        numberInStock: [
          this.selectedProduct.numberInStock,
          [Validators.required],
        ],
        supplier: [this.selectedProduct.supplier, [Validators.required]],
      });
      this.category = this.selectedProduct.category;
    } else {
      this.productForm = this.fb.group({
        name: ['', [Validators.required]],
        price: [null, [Validators.required]],
        description: ['', [Validators.required]],
        numberInStock: [null, [Validators.required]],
        supplier: ['', [Validators.required]],
      });
    }
  }

  onFileSelected(event) {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileHandle: FileHandle = {
        file: file,
      };
      this.productImage = fileHandle;
    }
  }

  addProduct() {
    if (this.isIncomplete()) {
      console.log('fill out required fields');
    } else {
      this.productForCreate.name = this.productForm.get(['name'])!.value;
      this.productForCreate.price = this.productForm.get(['price'])!.value;
      this.productForCreate.description = this.productForm.get([
        'description',
      ])!.value;
      this.productForCreate.category = this.category
        ? this.category.toString()
        : null;
      this.productForCreate.numberInStock = this.productForm.get([
        'numberInStock',
      ])!.value;
      this.productForCreate.supplier = this.productForm.get([
        'supplier',
      ])!.value;
      const productFormData = this.prepareFormData(this.productForCreate);

      this.authorizedHttp.post('/product/create', productFormData).subscribe({
        next: (product) => {
          this.productService.createProductFrontend(product);
          this.closeDialog();
          console.log(product);
          this.productForm.reset();
        },
        error: (errorMessage) => {
          console.log(errorMessage);
        },
      });
    }
  }

  editProduct() {
    if (this.productImage == null) {
      return this.editProductWOImage();
    }
    if (this.isIncomplete()) {
      console.log(
        'fill out required fields',
        this.productForm.get(['name'])!.value
      );
    } else {
      let prod = {
        productId: this.selectedProduct.productId,
        name: this.productForm.get(['name'])!.value,
        price: this.productForm.get(['price'])!.value,
        description: this.productForm.get(['description'])!.value,
        category: this.category,
        numberInStock: this.productForm.get(['numberInStock'])!.value,
        supplier: this.productForm.get(['supplier'])!.value,
      };

      const productFormData = this.prepareFormData(prod);

      this.authorizedHttp
        .put(`/product/${this.selectedProduct.productId}`, productFormData)
        .subscribe({
          next: (product) => {
            this.productService.editProductFrontend(
              this.selectedProduct,
              product
            );
            this.closeDialog();
            console.log(product);
            this.productForm.reset();
          },
          error: (errorMessage) => {
            console.log(errorMessage);
          },
        });
    }
  }

  editProductWOImage() {
    if (this.isIncomplete()) {
      console.log('fill out required fields');
    } else {
      let prod: EditProductWOImage = {
        productId: this.selectedProduct.productId,
        name: this.productForm.get(['name'])!.value,
        price: this.productForm.get(['price'])!.value,
        description: this.productForm.get(['description'])!.value,
        category: this.category,
        numberInStock: this.productForm.get(['numberInStock'])!.value,
        supplier: this.productForm.get(['supplier'])!.value,
      };
      this.authorizedHttp
        .put(
          `/product/updateWithNoImage/${this.selectedProduct.productId}`,
          prod
        )
        .subscribe({
          next: (product) => {
            this.productService.editProductFrontend(
              this.selectedProduct,
              product
            );
            this.closeDialog();
            console.log(product);
            this.productForm.reset();
          },
          error: (errorMessage) => {
            console.log(errorMessage);
          },
        });
    }
  }

  prepareFormData(product): FormData {
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );
    formData.append(
      'imageFile',
      this.productImage.file,
      this.productImage.file.name
    );
    return formData;
  }

  isIncomplete() {
    if (
      this.productForm.get(['name'])!.value == '' ||
      this.productForm.get(['price'])!.value == null ||
      this.productForm.get(['price'])!.value <= 0 ||
      this.productForm.get(['description'])!.value == '' ||
      this.category == null ||
      this.productForm.get(['numberInStock'])!.value == null ||
      this.productForm.get(['numberInStock'])!.value <= 0 ||
      this.productForm.get(['supplier'])!.value == '' ||
      (this.formType == 'Edit Product' ? false : this.productImage == null)
    ) {
      return true;
    } else {
      return false;
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
