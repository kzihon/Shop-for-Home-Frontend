import { Component, Signal, computed } from '@angular/core';
import { AppService } from '../../app.service';
import { UserService } from '../../services/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignInDialogComponent } from '../../Login/sign-in-dialog/sign-in-dialog.component';
import { SignUpDialogComponent } from '../../Login/sign-up-dialog/sign-up-dialog.component';

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
  styleUrl: './profile-button.component.scss',
})
export class ProfileButtonComponent {
  isAdmin: Signal<boolean> = computed(() => this.userService.isAdmin());
  loggedIn: Signal<boolean> = computed(() => this.userService.loggedIn());

  constructor(private userService: UserService, private dialog: MatDialog) {
    console.log(this.isAdmin(), this.loggedIn());
  }

  openSignInDialog() {
    console.log('trying to open dialog');
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
    this.userService.logout();
  }
}
