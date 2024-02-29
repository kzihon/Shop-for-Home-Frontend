import { Component } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogConfig,
} from '@angular/material/dialog';
import { SignInPageComponent } from '../sign-in-page/sign-in-page.component';
import { UserService } from '../../services/user.service';
import { FormControl } from '@angular/forms';
import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';

@Component({
  selector: 'app-sign-in-dialog',
  templateUrl: './sign-in-dialog.component.html',
  styleUrl: './sign-in-dialog.component.scss'
})
export class SignInDialogComponent {
  email = new FormControl('');
  
  constructor(public dialogRef: MatDialogRef<SignInDialogComponent>, public userService: UserService, private dialog: MatDialog) {
  }

  openSignUpDialog() {
    this.closeDialog()
    const dialogConfig = new MatDialogConfig();
        dialogConfig.width = "60%";
        dialogConfig.height = "80%";
  
        this.dialog.open(SignUpDialogComponent, dialogConfig);
  
  }

  closeDialog() {
    this.dialogRef.close();
  }

  signIn() {
    // just added for easy sign in while testing
    if (this.email.value == '') {
      this.userService.signIn('sami@gmail.com', "pw");
    } else {
      this.userService.signIn(this.email.value, "pw");
    }
    

    this.dialogRef.close();
    }



}
