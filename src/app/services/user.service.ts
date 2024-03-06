import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '../model';
import { Subject } from 'rxjs';
import { ProductService } from './product.service';
import { CartService } from './cart.service';

interface IUser {
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
  private TOKEN = 'token';

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

  get token(): string | null {
    return localStorage.getItem(this.TOKEN);
  }

  setToken(token: string): void {
    localStorage.removeItem(this.TOKEN);
    localStorage.setItem(this.TOKEN, token);
  }

  signIn(bearerToken: string, userDetails: IUser) {
    this.user = {
      id: null,
      firstName: userDetails.firstname,
      lastName: userDetails.lastname,
      email: userDetails.email,
      password: '', // delete
      isAdmin: userDetails.role === 'ADMIN',
      cart: null,
      wishlist: userDetails.wishlist,
    };

    // this.user = this.getUserByEmail(email)
    this.loggedIn.set(this.user.firstName == '' ? false : true);
    this.isAdmin.set(this.user.isAdmin);
    localStorage.setItem(this.storageKey, JSON.stringify(this.user));

    this.setToken(bearerToken);
  }

  logout() {
    // this doesn't do anything rn bc not saving user to database
    this.user.cart = this.cartService.cart();
    this.cartService.emptyCart();
    this.user = this.emptyUser;
    this.loggedIn.set(false);
    this.isAdmin.set(false);
    localStorage.removeItem(this.storageKey);

    localStorage.removeItem(this.TOKEN);
  }

  getUserByEmail(email: string) {
    for (let user of this.users) {
      if (user.email == email) {
        return user;
      }
    }
    console.log("couldn't find user by email");
  }

  isInWishlist(productId: number) {
    console.log(productId, this.user.wishlist.includes(productId));
    return this.user.wishlist.includes(productId);
  }

  removeFromWishlist(productId: number) {
    let index = this.user.wishlist.indexOf(productId);
    if (index > -1) {
      this.user.wishlist.splice(index, 1);
    }
  }

  addToWishlist(productId: number) {
    this.user.wishlist.push(productId);
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
