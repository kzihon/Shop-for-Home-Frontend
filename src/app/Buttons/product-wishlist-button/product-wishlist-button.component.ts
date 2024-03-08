import { Component, Input, Signal, computed } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { SignInDialogComponent } from '../../Login/sign-in-dialog/sign-in-dialog.component';
import { Product } from '../../model';

@Component({
  selector: 'app-product-wishlist-button',
  templateUrl: './product-wishlist-button.component.html',
  styleUrl: './product-wishlist-button.component.scss',
})
export class ProductWishlistButtonComponent {
  @Input() productId: number;

  inWishlist: boolean;
  loggedIn: Signal<boolean> = computed(() => this.userService.loggedIn());
  isAdmin: Signal<boolean> = computed(() => this.userService.isAdmin());

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.inWishlist =
      this.isAdmin() || !this.loggedIn()
        ? null
        : this.userService.isInWishlist(this.productId);
  }

  heartClick() {
    if (this.inWishlist) {
      this.userService.removeFromWishlist(this.productId);
      this.inWishlist = false;
    } else {
      this.userService.addToWishlist(this.productId);
      this.inWishlist = true;
    }
  }

  openSignInDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.height = '60%';

    this.dialog.open(SignInDialogComponent, dialogConfig);
  }
}
