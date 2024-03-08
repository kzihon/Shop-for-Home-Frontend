import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { SignInDialogComponent } from '../sign-in-dialog/sign-in-dialog.component';

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrl: './sign-up-dialog.component.scss',
})
export class SignUpDialogComponent {
  email = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<SignUpDialogComponent>,
    public userService: UserService,
    private dialog: MatDialog
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  openSignInDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.height = '60%';

    this.dialog.open(SignInDialogComponent, dialogConfig);
  }

  signIn() {
    // this.userService.signIn(this.email.value, "pw");

    this.dialogRef.close();
  }
}
