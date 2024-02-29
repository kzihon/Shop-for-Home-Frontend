import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SignInDialogComponent } from '../sign-in-dialog/sign-in-dialog.component';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss'
})
export class SignInPageComponent {
  // constructor(public dialogRef: MatDialogRef<SignInPageComponent>) {}
  constructor(public dialog: MatDialog) {}
  
  openDialog() {
    const dialogConfig = new MatDialogConfig();
        dialogConfig.hasBackdrop = true;
        dialogConfig.width = "60%";
        dialogConfig.height = "60%";
        dialogConfig.position = {
          left: '20vw'
        }

        this.dialog.open(SignInDialogComponent, dialogConfig);

  }

}
