import { Injectable } from '@angular/core'
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router'
import { AuthLocalStorageService } from '../../services/auth-local-storage/auth-local-storage.service'

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor (
    private router: Router,
    private authLocalStorageService: AuthLocalStorageService
  ) {}

  canActivate (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (!this.authLocalStorageService.isAuthenticated) {
      console.log('YOU MUST SIGN IN TO ACCESS THIS PAGE!')
      this.router.navigateByUrl('/login')
      return false
    }

    const requiredRole = route.data['requiredRole']

    if (requiredRole === 'ADMIN' && !this.authLocalStorageService.isAdmin) {
      console.log('YOU ARE NOT AUTHORIZED TO ACCESS ADMIN PAGE.')
      this.router.navigateByUrl('/customer-dashboard')
      return false
    }

    if (requiredRole === 'CUSTOMER' && this.authLocalStorageService.isAdmin) {
      console.log('YOU ARE AN ADMIN.')
      this.router.navigateByUrl('/admin-dashboard')
      return false
    }

    // Additional logic for other roles can be added here.

    return true
  }
}
