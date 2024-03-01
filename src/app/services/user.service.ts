import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '../model';
import { Subject } from 'rxjs';
import { ProductService } from './product.service';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  emptyUser: User = {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isAdmin: null,
    cart: null,
    wishlist: null,
  };

  loggedIn: WritableSignal<boolean> = signal(false);
  isAdmin: WritableSignal<boolean> = signal(false);
  user: User = this.emptyUser;
  storageKey: string = 'user-details';

  constructor(private cartService: CartService) {
    this.loadUser();
    this.loggedIn.set(this.user.firstName == '' ? false : true);
    this.isAdmin.set(this.user.isAdmin == true ? true : false);
  }

  loadUser() {
    const userStringified = this.getSavedUser();
    if (userStringified == null) {
      this.user = this.emptyUser;
    } else {
      this.user = JSON.parse(userStringified);
    }
  }

  getSavedUser(): string {
    console.log('getting saved user');
    console.log(localStorage.getItem(this.storageKey));

    return localStorage.getItem(this.storageKey) || null;
  }

  setLoggedIn(loggedIn: boolean) {
    this.loggedIn.set(loggedIn);
  }

  getLoggedIn() {
    return this.loggedIn;
  }

  setAdmin(isAdmin: boolean) {
    this.isAdmin.set(isAdmin);
  }

  getAdmin() {
    return this.isAdmin;
  }

  signIn(email: string, password: string) {
    // do authentication here
    this.user = this.getUserByEmail(email);
    this.loggedIn.set(this.user.firstName == '' ? false : true);
    this.isAdmin.set(this.user.isAdmin == true ? true : false);
    localStorage.setItem(this.storageKey, JSON.stringify(this.user));
  }

  logout() {
    // this doesn't do anything rn bc not saving user to database
    this.user.cart = this.cartService.cart();
    this.cartService.emptyCart();
    this.user = this.emptyUser;
    this.loggedIn.set(false);
    this.isAdmin.set(false);
    localStorage.removeItem(this.storageKey);
  }

  getUserByEmail(email: string) {
    for (let user of this.users) {
      if (user.email == email) {
        return user;
      }
    }
    console.log("couldn't find user by email");
  }

  users: User[] = [
    {
      id: null,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      isAdmin: null,
      cart: null,
      wishlist: null,
    },
    {
      id: 100,
      firstName: 'samiCustomer',
      lastName: 'oh',
      email: 'sami@gmail.com',
      password: 'pw',
      isAdmin: false,
      cart: null,
      wishlist: [4, 5],
    },
    {
      id: 100,
      firstName: 'samiAdmin',
      lastName: 'oh',
      email: 'admin@gmail.com',
      password: 'pw',
      isAdmin: true,
      cart: new Map(),
      wishlist: [4, 5],
    },
  ];
}
