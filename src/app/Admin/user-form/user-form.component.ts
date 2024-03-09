import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProduct, FileHandle } from '../../model';
import { AuthorizedHttpService } from '../../services/authorized-http/authorized-http.service';
import { ProductService } from '../../services/product.service';
import { GeneralFormComponent } from '../general-form/general-form.component';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  customerForm!: FormGroup;
  formType: string;

  productForCreate: AddProduct = {
    name: '',
    price: 0,
    description: '',
    category: '',
    numberInStock: 0,
    supplier: '',
  };

  constructor(
    public dialogRef: MatDialogRef<GeneralFormComponent>,
    private authorizedHttp: AuthorizedHttpService,
    private fb: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formType = this.data.formType;
  }

  ngOnInit(): void {
    if (this.formType == 'Edit Customer') {
      let selectedCustomer = this.data.customer;
      this.customerForm = this.fb.group({
        email: [selectedCustomer.email, [Validators.required]],
        firstname: [selectedCustomer.firstname, [Validators.required]],
        lastname: [selectedCustomer.lastname, [Validators.required]],
      });
    } else {
      this.customerForm = this.fb.group({
        email: ['', [Validators.required]],
        firstname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        password: ['', [Validators.required]],
      });
    }
  }

  addCustomer() {
    if (this.isIncomplete()) {
      console.log('fill out required fields');
    } else {
    }
  }

  isIncomplete() {
    if (
      this.customerForm.get(['email'])!.value == '' ||
      this.customerForm.get(['firstname'])!.value == '' ||
      this.customerForm.get(['lastname'])!.value == '' ||
      this.customerForm.get(['password'])!.value == ''
    ) {
      return true;
    } else {
      return false;
    }
  }
}