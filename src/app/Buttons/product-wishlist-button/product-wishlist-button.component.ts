import { Component, Input, Signal, computed } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignInDialogComponent } from '../../Login/sign-in-dialog/sign-in-dialog.component';
import { Product } from '../../model';
import { AuthLocalStorageService } from '../../services/auth-local-storage/auth-local-storage.service';
import { WishlistService } from '../../services/wishlist/wishlist.service';

@Component({
  selector: 'app-product-wishlist-button',
  templateUrl: './product-wishlist-button.component.html',
  styleUrl: './product-wishlist-button.component.scss',
})
export class ProductWishlistButtonComponent {
  @Input() productId: number;

  inWishlist: boolean = false;
  loggedIn: Signal<boolean> = computed(() =>
    this.authLocalStorageService.isAuthenticated()
  );
  isAdmin: Signal<boolean> = computed(() =>
    this.authLocalStorageService.isAdmin()
  );

  constructor(
    private dialog: MatDialog,
    private authLocalStorageService: AuthLocalStorageService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    if (this.loggedIn() && !this.isAdmin()) {
      this.wishlistService.getWishlist().subscribe((wishlist: any) => {
        wishlist.forEach((element) => {
          if (element.productId == this.productId) {
            this.inWishlist = true;
          }
        });
      });
    }
  }

  heartClick() {
    if (this.inWishlist) {
      this.wishlistService.removeFromWishlist(this.productId).subscribe({
        next: (res) => {},
        error: (errorMessage) => {},
      });
      this.wishlistService.removeFromWishListFE(this.productId);
      this.inWishlist = false;
    } else {
      this.wishlistService.addToWishlist(this.productId).subscribe({
        next: (res) => {},
        error: (errorMessage) => {},
      });
      this.inWishlist = true;
      this.wishlistService.addToWishlistFE(this.productId);
    }
  }

  openSignInDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.height = '60%';

    this.dialog.open(SignInDialogComponent, dialogConfig);
  }
}
