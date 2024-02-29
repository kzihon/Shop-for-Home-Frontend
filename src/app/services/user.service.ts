import { Injectable, WritableSignal, signal } from '@angular/core';
import { User } from '../model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  emptyUser: User = 
  {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isAdmin: null,
    cart: null,
    wishlist: null
}

  loggedIn: WritableSignal<boolean> = signal(false);
  isAdmin: WritableSignal<boolean> = signal(false);
  user: User = this.emptyUser;

  constructor() {
    this.loggedIn.set(this.user.firstName == '' ? false : true);
    this.isAdmin.set(this.user.isAdmin == true ? true : false)
   }


  setLoggedIn(loggedIn: boolean) {
      this.loggedIn.set(loggedIn)
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
    this.user = this.getUserByEmail(email)
    console.log(this.user)
    this.loggedIn.set(this.user.firstName == '' ? false : true);
    this.isAdmin.set(this.user.isAdmin == true ? true : false)
  }

  logout() {
    this.user = this.emptyUser;
    this.loggedIn.set(false);
    this.isAdmin.set(false);
  }


   getUserByEmail(email: string) {
    for (let user of this.users) {
      if (user.email == email) {
        return user;
      }
    }
    console.log("couldn't find user by email")
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
      wishlist: null
    },
    {
      id: 100,
      firstName: 'samiCustomer',
      lastName: 'oh',
      email: 'sami@gmail.com',
      password: 'pw',
      isAdmin: false,
      cart: [1, 2, 3],
      wishlist: [4, 5]
    },
    {
      id: 100,
      firstName: 'samiAdmin',
      lastName: 'oh',
      email: 'admin@gmail.com',
      password: 'pw',
      isAdmin: true,
      cart: [1, 2, 3],
      wishlist: [4, 5]
    }
   ]
}
