import { Injectable, WritableSignal, signal } from '@angular/core';
import IUserDetails from '../auth/user-response.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthLocalStorageService {
  private TOKEN = 'token';
  private IS_AUTHENTICATED = 'isAuthenticated';
  private USER_DETAILS = 'userDetails';

  isAuthenticated: WritableSignal<boolean> = signal(this.isAuthenticatedLS);
  isAdmin: WritableSignal<boolean> = signal(this.isAdminLS);

  get isAuthenticatedLS(): boolean {
    return localStorage.getItem(this.IS_AUTHENTICATED) === 'true';
  }

  get isAdminLS(): boolean {
    return this.userDetails.role === 'ADMIN';
  }

  setIsAuthenticated(isAuthenticated: boolean) {
    this.isAuthenticated.set(isAuthenticated);
    localStorage.setItem(
      this.IS_AUTHENTICATED,
      JSON.stringify(isAuthenticated)
    );
  }

  get userDetails(): IUserDetails {
    const storedDetails = localStorage.getItem(this.USER_DETAILS);
    return storedDetails ? JSON.parse(storedDetails) : {};
  }

  setUserDetails(userDetails: any) {
    localStorage.removeItem(this.USER_DETAILS);
    localStorage.setItem(this.USER_DETAILS, JSON.stringify(userDetails));
    this.isAdmin.set(this.isAdminLS);
  }

  get token(): string | null {
    return localStorage.getItem(this.TOKEN);
  }

  setToken(token: string): void {
    localStorage.removeItem(this.TOKEN);
    localStorage.setItem(this.TOKEN, token);
  }

  signIn(token: string, userDetails: any) {
    this.setIsAuthenticated(true);
    this.setToken(token);
    this.setUserDetails(userDetails);
  }

  signout() {
    localStorage.removeItem(this.IS_AUTHENTICATED);
    localStorage.removeItem(this.TOKEN);
    localStorage.removeItem(this.USER_DETAILS);

    this.setIsAuthenticated(false);
  }
}
