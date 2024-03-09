import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AddProduct, CategoryType, FileHandle } from '../../model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorizedHttpService } from '../../services/authorized-http/authorized-http.service';
import { ProductService } from '../../services/product.service';
import { GeneralFormComponent } from '../general-form/general-form.component';

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

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<GeneralFormComponent>,
    private authorizedHttp: AuthorizedHttpService,
    private fb: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formType = this.data.formType;
  }

  ngOnInit(): void {
    if (this.formType == 'Edit Product') {
      let selectedProduct = this.data.product;
      this.productForm = this.fb.group({
        name: [selectedProduct.name, [Validators.required]],
        price: [selectedProduct.price, [Validators.required]],
        description: [selectedProduct.description, [Validators.required]],
        numberInStock: [selectedProduct.numberInStock, [Validators.required]],
        supplier: [selectedProduct.supplier, [Validators.required]],
      });
      this.category = selectedProduct.category;
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
          console.log(product);
          this.productForm.reset();
        },
        error: (errorMessage) => {
          console.log(errorMessage);
        },
      });
    }
  }

  prepareFormData(product: AddProduct): FormData {
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
      this.productImage == null
    ) {
      return true;
    } else {
      return false;
    }
  }
}