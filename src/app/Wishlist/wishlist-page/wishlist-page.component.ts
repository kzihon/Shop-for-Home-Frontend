import { Component, OnInit } from '@angular/core'
import { Product } from '../../model'
import { ProductService } from '../../services/product.service'
import { AuthLocalStorageService } from '../../services/auth-local-storage/auth-local-storage.service'
import { WishlistService } from '../../services/wishlist/wishlist.service'

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.scss'
})
export class WishlistPageComponent implements OnInit {
  public wishlist: Product[] = []

  constructor (private wishlistService: WishlistService) {}

  ngOnInit (): void {
    this.getCustomerWishlist()
  }

  getCustomerWishlist () {
    this.wishlistService.getWishlist().subscribe({
      next: (wishlist: Product[]) => (this.wishlist = wishlist),
      error: error => console.error({ error })
    })
  }
}
