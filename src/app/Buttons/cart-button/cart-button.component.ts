import { Component, Signal, computed } from '@angular/core';
import { AppService } from '../../app.service';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignInDialogComponent } from '../../Login/sign-in-dialog/sign-in-dialog.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-button',
  templateUrl: './cart-button.component.html',
  styleUrl: './cart-button.component.scss',
})
export class CartButtonComponent {
  loggedIn: Signal<boolean> = computed(() => this.userService.loggedIn());
  cartSize: Signal<number> = computed(() => this.cartService.getCartSize());

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private cartService: CartService
  ) {}

  openSignInDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.height = '60%';

    this.dialog.open(SignInDialogComponent, dialogConfig);
  }
}
