import { Injectable } from '@angular/core'
import { env } from '../../env'
import { AuthLocalStorageService } from '../auth-local-storage/auth-local-storage.service'
import { Observable, of } from 'rxjs'
import { Product } from '../../model'
import { AuthorizedHttpService } from '../authorized-http/authorized-http.service'

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private cachedWishlist: Product[]

  constructor (
    private authLocalStorageService: AuthLocalStorageService,
    private authorizedHttpService: AuthorizedHttpService
  ) {}

  addToWishlist (productId: number): Observable<any> {
    this.invalidateCache()

    const customerId = this.authLocalStorageService.userDetails.id
    // @PostMapping("/{customer_id}/wish_list/{product_id}")
    const endpoint = `/customer/${customerId}/wish_list/${productId}`
    return this.authorizedHttpService.post(endpoint, null)
  }

  removeFromWishlist (productId: number): Observable<any> {
    this.invalidateCache()

    const customerId = this.authLocalStorageService.userDetails.id
    // @DeleteMapping("/{customer_id}/wish_list/{property_id}")
    // @TODO fix
    const endpoint = `/customer/${customerId}/wish_list/property_id?;`
    return this.authorizedHttpService.delete(endpoint)
  }

  getWishlist (): Observable<any> {
    if (this.cachedWishlist) return of(this.cachedWishlist)

    const customerId = this.authLocalStorageService.userDetails.id
    // @GetMapping("/{customer_id}/wish_list")
    const endpoint = `/customer/${customerId}/wish_list`

    return this.authorizedHttpService.get(endpoint)
  }

  private invalidateCache (): void {
    this.cachedWishlist = null
  }
}
