import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Signal, computed } from '@angular/core';
import { AuthorizedHttpService } from '../../services/authorized-http/authorized-http.service';
import IUserDetails from '../../services/auth/user-response.interface';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Product, User } from '../../model';
import { ProductFormComponent } from '../../product-form/product-form.component';
import { UserFormComponent } from '../../user-form/user-form.component';
import { IUserResponse, UserService } from '../../services/user.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-user-operations',
  templateUrl: './user-operations.component.html',
  styleUrl: './user-operations.component.scss',
})
export class UserOperationsComponent implements OnInit {
  // customers;
  customers: Signal<IUserResponse[]> = computed(() =>
    this.userService.customers()
  );
  constructor(
    private authorizedHttpService: AuthorizedHttpService,
    private dialog: MatDialog,
    private userService: UserService
  ) {}

  ngOnInit(): void {}
  clickedId: number;

  openCreateCustomer() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      formType: 'Create Customer',
    };
    this.dialog.open(UserFormComponent, dialogConfig);
  }
  openEditCustomer(customer: IUserResponse) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      formType: 'Edit Customer',
      customer: customer,
    };
    this.dialog.open(UserFormComponent, dialogConfig);
  }

  deleteCustomer(customer: IUserResponse) {
    this.userService.deleteCustomerFrontend(customer);
    this.userService.deleteCustomer(customer.id).subscribe((res) => {
      console.log(res);
    });
  }
}
