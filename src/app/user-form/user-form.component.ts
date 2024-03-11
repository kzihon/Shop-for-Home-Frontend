import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddProduct, FileHandle } from '../model';
import { AuthorizedHttpService } from '../services/authorized-http/authorized-http.service';
import { ProductService } from '../services/product.service';
import { GeneralFormComponent } from '../Admin/general-form/general-form.component';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  customerForm!: FormGroup;
  formType: string;
  selectedCustomer;

  productForCreate: AddProduct = {
    name: '',
    price: 0,
    description: '',
    category: '',
    numberInStock: 0,
    supplier: '',
  };

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    private authorizedHttp: AuthorizedHttpService,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formType = this.data.formType;
  }

  ngOnInit(): void {
    if (this.formType == 'Edit Customer') {
      this.selectedCustomer = this.data.customer;
      this.customerForm = this.fb.group({
        firstname: [this.selectedCustomer.firstname, [Validators.required]],
        lastname: [this.selectedCustomer.lastname, [Validators.required]],
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
      this.authService.register(this.customerForm.value).subscribe({
        next: (res) => {
          this.userService.addCustomerFrontend(res.user);
          console.log(res);
          this.snackBar.open('Registration successful!', 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: 'success-snackbar',
          });
          this.closeDialog();
          this.dialogRef.close();
          this.customerForm.reset();
        },
        error: (errorMessage) => {
          this.snackBar.open(errorMessage || 'Uknown error occured.', 'Close', {
            duration: 5000,
            verticalPosition: 'top',
            panelClass: 'error-snackbar',
          });
        },
      });
    }
  }

  editCustomer() {
    if (this.isIncomplete()) {
      console.log('fill out required fields');
    } else {
      console.log(this.customerForm.value);
      this.authorizedHttp
        .put(
          `/customer/update/${this.selectedCustomer.id}`,
          this.customerForm.value
        )
        .subscribe({
          next: (user) => {
            this.userService.editCustomerFrontend(this.selectedCustomer, user);
            this.closeDialog();
            console.log(user);
            this.customerForm.reset();
          },
          error: (errorMessage) => {
            console.log(errorMessage);
          },
        });
    }
  }

  isIncomplete() {
    if (
      (this.formType == 'Edit Customer'
        ? false
        : this.customerForm.get(['email'])!.value == '') ||
      this.customerForm.get(['firstname'])!.value == '' ||
      this.customerForm.get(['lastname'])!.value == '' ||
      (this.formType == 'Edit Customer'
        ? false
        : this.customerForm.get(['password'])!.value == '')
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
