import { Injectable, WritableSignal, signal } from '@angular/core';
import { AuthLocalStorageService } from '../auth-local-storage/auth-local-storage.service';
import { Observable, of } from 'rxjs';
import { Product } from '../../model';
import { AuthorizedHttpService } from '../authorized-http/authorized-http.service';
import { ProductService } from '../product.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private cachedWishlist: Product[];
  wishlistSignal: WritableSignal<Product[]> = signal(new Array<Product>());

  constructor(
    private authLocalStorageService: AuthLocalStorageService,
    private authorizedHttpService: AuthorizedHttpService,
    private productService: ProductService
  ) {
    if (
      this.authLocalStorageService.isAuthenticated() == true &&
      this.authLocalStorageService.isAdmin() == false
    ) {
      this.loadWishlist();
    }
  }

  addToWishlistFE(productId: number) {
    this.productService
      .getProductByIdDB(productId)
      .subscribe((product: Product) => {
        this.wishlistSignal().push(product);
      });
  }

  addToWishlist(productId: number): Observable<any> {
    this.invalidateCache();

    const customerId = this.authLocalStorageService.userDetails.id;
    // @PostMapping("/{customer_id}/wish_list/{product_id}")
    const endpoint = `/customer/${customerId}/wish_list/${productId}`;
    return this.authorizedHttpService.post(endpoint, null);
  }

  removeFromWishListFE(productId: number) {
    let index;
    for (let i in this.wishlistSignal()) {
      if (this.wishlistSignal()[i].productId == productId) {
        index = i;
      }
    }
    if (index > -1) {
      this.wishlistSignal().splice(index, 1);
    }
  }

  removeFromWishlist(productId: number): Observable<any> {
    this.invalidateCache();
    const customerId = this.authLocalStorageService.userDetails.id;
    // @DeleteMapping("/{customer_id}/wish_list/{property_id}")
    // @Q  is property_id productId?
    const endpoint = `/customer/${customerId}/wish_list/${productId}`;
    return this.authorizedHttpService.delete(endpoint);
  }

  loadWishlist() {
    this.getWishlist().subscribe((res) => {
      this.wishlistSignal.set(res);
    });
  }

  getWishlist(): Observable<any> {
    if (this.cachedWishlist) return of(this.cachedWishlist);

    const customerId = this.authLocalStorageService.userDetails.id;
    // @GetMapping("/{customer_id}/wish_list")
    const endpoint = `/customer/${customerId}/wish_list`;

    return this.authorizedHttpService.get(endpoint);
  }

  private invalidateCache(): void {
    this.cachedWishlist = null;
  }
}
