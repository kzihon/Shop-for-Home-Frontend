import { Component, Signal, computed } from '@angular/core';
import { AppService } from '../../app.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignInDialogComponent } from '../../Login/sign-in-dialog/sign-in-dialog.component';
import { SignUpDialogComponent } from '../../Login/sign-up-dialog/sign-up-dialog.component';
import { AuthLocalStorageService } from '../../services/auth-local-storage/auth-local-storage.service';

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrl: './profile-button.component.scss',
})
export class ProfileButtonComponent {
  isAdmin: Signal<boolean> = computed(() =>
    this.authLocalStorageService.isAdmin()
  );
  isAuthenticated: Signal<boolean> = computed(() =>
    this.authLocalStorageService.isAuthenticated()
  );

  constructor(
    private dialog: MatDialog,
    private authLocalStorageService: AuthLocalStorageService
  ) {}

  openSignInDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.height = '60%';

    this.dialog.open(SignInDialogComponent, dialogConfig);
  }

  openSignUpDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.height = '80%';

    this.dialog.open(SignUpDialogComponent, dialogConfig);
  }

  logout() {
    this.authLocalStorageService.signout();
  }
}
