import { Component, Signal, computed } from '@angular/core';
import { AppService } from '../../app.service';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignInDialogComponent } from '../../Login/sign-in-dialog/sign-in-dialog.component';

@Component({
  selector: 'app-wishlist-button',
  templateUrl: './wishlist-button.component.html',
  styleUrl: './wishlist-button.component.scss',
})
export class WishlistButtonComponent {
  isAdmin: Signal<boolean> = computed(() => this.userService.isAdmin());
  loggedIn: Signal<boolean> = computed(() => this.userService.loggedIn());

  constructor(private userService: UserService, private dialog: MatDialog) {}

  openSignInDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.height = '60%';

    this.dialog.open(SignInDialogComponent, dialogConfig);
  }
}
