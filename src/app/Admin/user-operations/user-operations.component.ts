import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Signal, computed } from '@angular/core';
import { AuthorizedHttpService } from '../../services/authorized-http/authorized-http.service';
import IUserDetails from '../../services/auth/user-response.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Product, User } from '../../model';
import { ProductFormComponent } from '../product-form/product-form.component';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  standalone: true,
  selector: 'app-user-operations',
  templateUrl: './user-operations.component.html',
  styleUrl: './user-operations.component.scss',
})
export class UserOperationsComponent implements OnInit {
  customers;
  constructor(
    private authorizedHttpService: AuthorizedHttpService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCustomers();
  }
  clickedId: number;

  openCreateCustomer() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      formType: 'Create Customer',
    };
    this.dialog.open(UserFormComponent, dialogConfig);
  }
  openEditCustomer(customer: User) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      formType: 'Edit Customer',
      customer: customer,
    };
    this.dialog.open(UserFormComponent, dialogConfig);
  }

  deleteCustomer(customer: User) {
    // this.productService.deleteProductFrontend(product);
    // this.productService.deleteProduct(product.productId).subscribe((res) => {
    //   console.log(res);
    // });
  }

  loadCustomers() {
    this.authorizedHttpService.get('/customer/').subscribe({
      next: (res) => {
        console.log(res);
        this.customers = res;
      },
      error: (errorMessage) => {
        console.log(errorMessage);
      },
    });
  }
}
