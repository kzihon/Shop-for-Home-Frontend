import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  loggedIn: boolean = false
  admin: boolean = false

  setLoggedIn (loggedIn: boolean) {
    this.loggedIn = loggedIn
  }

  getLoggedIn () {
    return this.loggedIn
  }

  setAdmin (admin: boolean) {
    this.admin = admin
  }

  getAdmin () {
    return this.admin
  }
}
