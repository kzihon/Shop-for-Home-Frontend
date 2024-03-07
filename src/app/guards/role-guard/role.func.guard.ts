/* import { CanActivateFn } from '@angular/router'
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router'
import { LocalStorageService } from '../../services/local-storage/local-storage.service'


export const roleGuard: CanActivateFn = (route, state, router: Router): boolean | UrlTree => {
  const localStorageService = new LocalStorageService()

  if (!localStorageService.isAuthenticated) {
    console.log('YOU MUST SIGN IN TO ACCESS THIS PAGE!')
    return this.router.parseUrl('/login')
  }

  const requiredRole = route.data.requiredRole

  if (requiredRole === 'admin' && !localStorageService.isAdmin) {
    console.log('YOU ARE NOT AUTHORIZED TO ACCESS ADMIN PAGE.')
    return this.router.parseUrl('/customer-dashboard')
  }

  // Additional logic for other roles can be added here.

  return true
}
 */
