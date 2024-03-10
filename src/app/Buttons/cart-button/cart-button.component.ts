import { Component, Signal, computed } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignInDialogComponent } from '../../Login/sign-in-dialog/sign-in-dialog.component';
import { AuthLocalStorageService } from '../../services/auth-local-storage/auth-local-storage.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.scss',
})
export class CartButtonComponent {
  loggedIn: Signal<boolean> = computed(() =>
    this.authLocalStorageService.isAuthenticated()
  );
  isAdmin: Signal<boolean> = computed(() =>
    this.authLocalStorageService.isAdmin()
  );
  cartSize: Signal<number> = computed(() => this.cartService.cartSize());

  constructor(
    private dialog: MatDialog,
    private authLocalStorageService: AuthLocalStorageService,
    private cartService: CartService
  ) {}

  openSignInDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.height = '60%';

    this.dialog.open(SignInDialogComponent, dialogConfig);
  }
}
