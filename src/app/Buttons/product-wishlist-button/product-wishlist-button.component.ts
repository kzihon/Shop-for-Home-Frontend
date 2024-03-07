import { Component, Input, Signal, computed } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { SignInDialogComponent } from '../../Login/sign-in-dialog/sign-in-dialog.component'
import { Product } from '../../model'
import { AuthLocalStorageService } from '../../services/auth-local-storage/auth-local-storage.service'
import { WishlistService } from '../../services/wishlist/wishlist.service'

@Component({
  selector: 'app-product-wishlist-button',
  templateUrl: './product-wishlist-button.component.html',
  styleUrl: './product-wishlist-button.component.scss'
})
export class ProductWishlistButtonComponent {
  @Input() productId: number

  inWishlist: boolean
  loggedIn: Signal<boolean> = computed(() =>
    this.authLocalStorageService.isAuthenticated()
  )

  constructor (
    private dialog: MatDialog,
    private authLocalStorageService: AuthLocalStorageService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit (): void {
    if (
      this.authLocalStorageService.isAuthenticated &&
      !this.authLocalStorageService.isAdmin
    ) {
      this.wishlistService.getWishlist().subscribe((wishlist: any) => {
        this.inWishlist = wishlist.includes(this.productId)
      })
    }
  }

  heartClick () {
    // if (this.inWishlist) {
    //   this.userService.removeFromWishlist(this.productId)
    //   this.inWishlist = false
    // } else {
    //   this.userService.addToWishlist(this.productId)
    //   this.inWishlist = true
    // }
  }

  openSignInDialog () {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '60%'
    dialogConfig.height = '60%'

    this.dialog.open(SignInDialogComponent, dialogConfig)
  }
}
