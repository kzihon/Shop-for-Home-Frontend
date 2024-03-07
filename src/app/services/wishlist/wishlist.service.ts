// wishlist.service.ts
import { Injectable } from '@angular/core'
import { env } from '../../env'
import { HttpClient } from '@angular/common/http'
import { AuthLocalStorageService } from '../auth-local-storage/auth-local-storage.service'
import { Observable, of } from 'rxjs'
import { Product } from '../../model'

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private cachedWishlist: Product[]

  constructor (
    private http: HttpClient,
    private authLocalStorageService: AuthLocalStorageService
  ) {}

  addToWishlist (productId: number): Observable<any> {
    this.invalidateCache()

    const customerId = this.authLocalStorageService.userDetails.id
    const endpoint = `${env.SERVER_URI}/wishlist/add/${customerId}/${productId}`
    return this.http.post(endpoint, null)
  }

  removeFromWishlist (productId: number): Observable<any> {
    this.invalidateCache()

    const customerId = this.authLocalStorageService.userDetails.id
    const endpoint = `${env.SERVER_URI}/wishlist/remove/${customerId}/${productId}`
    return this.http.delete(endpoint)
  }

  getWishlist (): Observable<any> {
    if (this.cachedWishlist) return of(this.cachedWishlist)

    const customerId = this.authLocalStorageService.userDetails.id
    const endpoint = `${env.SERVER_URI}/wishlist/${customerId}`
    return this.http.get(endpoint)
  }

  private invalidateCache (): void {
    this.cachedWishlist = null
  }
}
