import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, NgForm } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import {
  AddProduct,
  CategoryType,
  FileHandle,
  ImageModel,
  Product,
} from '../../model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthorizedHttpService } from '../../services/authorized-http/authorized-http.service';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrl: './general-form.component.scss',
})
export class GeneralFormComponent {
  formType: string;
  categories = [
    { displayName: 'Tables', value: CategoryType.TABLE },
    { displayName: 'Chairs', value: CategoryType.CHAIRS },
    { displayName: 'Lamps', value: CategoryType.LAMPS },
    { displayName: 'Plants', value: CategoryType.PLANTS },
    { displayName: 'Decor', value: CategoryType.DECOR },
    { displayName: 'Couches', value: CategoryType.COUCHES },
    { displayName: 'Rugs', value: CategoryType.RUGS },
  ];
  id: FormControl<number> = new FormControl();

  name: FormControl<string> = new FormControl('');
  price: FormControl<number> = new FormControl();
  description: FormControl<string> = new FormControl('');
  category: CategoryType;
  numberInStock: FormControl<number> = new FormControl();
  supplierName: FormControl<string> = new FormControl('');
  img: FormControl<string> = new FormControl('');
  imgModel: ImageModel = {
    id: null,
    name: '',
    type: '',
    filePath: '',
  };

  email = new FormControl('');
  product: Product;
  selectedImageFile: File | null = null;

  // product1: AddProduct = {
  //   name: '',
  //   price: 0,
  //   description: '',
  //   category: '',
  //   numberInStock: 0,
  //   supplierName: '',
  //   productImage: null,
  // };

  constructor(
    private productService: ProductService,
    public dialogRef: MatDialogRef<GeneralFormComponent>,
    private authorizedHttp: AuthorizedHttpService,
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
    this.setImage();
    console.log(this.product);
  }

  setImage() {
    this.imgModel.id = this.product.imageModel.id;
    this.imgModel.name = this.product.imageModel.name;
    this.imgModel.type = this.product.imageModel.type;
    this.imgModel.filePath = this.product.imageModel.filePath;
  }

  closeDialog() {
    this.dialogRef.close();
  }
  selectCategory() {}

  handleImageUpload($event: Event) {
    const files = ($event?.target as HTMLInputElement)?.files ?? null;
    this.selectedImageFile = files && files.length > 0 ? files[0] : null;
    console.log(this.selectedImageFile);
    // this.imgModel.id = this.product.imageModel.id;
    // this.imgModel.name = this.product.imageModel.name;
    // this.imgModel.type = this.product.imageModel.type;
    // this.imgModel.filePath = this.product.imageModel.filePath;
  }

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
          this.supplierName.value,
          this.selectedImageFile
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
      this.price.value == null ||
      this.price.value <= 0 ||
      this.description.value == '' ||
      this.category == null ||
      this.numberInStock.value == null ||
      this.numberInStock.value <= 0 ||
      this.supplierName.value == ''
    ) {
      console.log('fill out required fields');
    } else {
      console.log(
        'submitting edit product',
        this.product.productId,
        this.name.value,
        this.price.value,
        this.description.value,
        this.category,
        this.numberInStock.value,
        this.supplierName.value
      );
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

  // onFileSelected(event) {
  //   if (event.target.files) {
  //     const file = event.target.files[0];
  //     const fileHandle: FileHandle = {
  //       file: file,
  //       // url:this.sanitizer.bypassSecurityTrustHtml(window.URL.createObjectURL(file))
  //     };
  //     this.product1.productImage = fileHandle;
  //   }
  //   // console.log(event);
  // }
  // // loadCustomers() {
  // //   this.authorizedHttpService.get('/customer/').subscribe({
  // //     next: (res) => {
  // //       console.log(res);
  // //       this.customers = res;
  // //     },
  // //     error: (errorMessage) => {
  // //       console.log(errorMessage);
  // //     },
  // //   });
  // // }

  // addProduct(productForm: NgForm) {
  //   const productFormData = this.prepareFormData(this.product1);
  //   this.authorizedHttp.post('/product/create', productFormData).subscribe(
  //     (response) => {
  //       productForm.reset();
  //     },
  //     (error: HttpErrorResponse) => {
  //       console.log(error);
  //     }
  //   );
  //   // this.productService.addProduct(productFormData).subscribe(
  //   //   (response) => {
  //   //     productForm.reset();
  //   //   },
  //   //   (error: HttpErrorResponse) => {
  //   //     console.log(error);
  //   //   }
  //   // );
  // }
  // prepareFormData(product: AddProduct): FormData {
  //   const formData = new FormData();
  //   formData.append(
  //     'product',
  //     // this.name.value,
  //     //     this.price.value,
  //     //     this.description.value,
  //     //     this.category,
  //     //     this.numberInStock.value,
  //     //     this.supplierName.value,
  //     new Blob([JSON.stringify(product)], { type: 'application/json' })
  //   );
  //   formData.append(
  //     'imageFile',
  //     product.productImage.file,
  //     product.productImage.file.name
  //   );
  //   return formData;
  // }
}
