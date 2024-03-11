import { Injectable, WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthorizedHttpService } from './authorized-http/authorized-http.service';

export interface IUserResponse {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  role: 'ADMIN' | 'CUSTOMER';
  wishlist?: Array<any>; // any is IProduct interface
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  customers: WritableSignal<IUserResponse[]> = signal(
    new Array<IUserResponse>()
  );

  constructor(private authorizedHttpService: AuthorizedHttpService) {
    this.loadCustomers();
  }

  loadCustomers() {
    this.authorizedHttpService.get('/customer/').subscribe({
      next: (res: IUserResponse[]) => {
        this.customers.set(res);
      },
      error: (errorMessage) => {
        console.log(errorMessage);
      },
    });
  }

  addCustomerFrontend(customer: IUserResponse) {
    this.customers().push(customer);
  }

  editCustomerFrontend(oldCustomer, customer) {
    let index = this.customers().indexOf(oldCustomer);
    if (index > -1) {
      this.customers()[index] = customer;
    }
  }

  deleteCustomer(id: number): Observable<ArrayBuffer> {
    return this.authorizedHttpService.delete(`/customer/${id}`);
  }

  deleteCustomerFrontend(customer: IUserResponse) {
    console.log('deleting product frontend');
    let index = this.customers().indexOf(customer);
    if (index > -1) {
      this.customers().splice(index, 1);
    }
  }
}
