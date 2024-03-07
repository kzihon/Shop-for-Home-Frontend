import { Component, OnInit } from '@angular/core'
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogConfig
} from '@angular/material/dialog'
import { SignInPageComponent } from '../sign-in-page/sign-in-page.component'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component'
import { AuthService } from '../../services/auth/auth.service'
import { Router } from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-sign-in-dialog',
  templateUrl: './sign-in-dialog.component.html',
  styleUrl: './sign-in-dialog.component.scss'
})
export class SignInDialogComponent implements OnInit {
  loginForm!: FormGroup

  constructor (
    public dialogRef: MatDialogRef<SignInDialogComponent>,
    private snackBar: MatSnackBar,
    public authService: AuthService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit (): void {
    /* this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    }) */

    // @TEST ADMIN
    this.loginForm = this.fb.group({
      email: ['admin@test.com', [Validators.required]],
      password: ['admin', [Validators.required]]
    })

    // @TEST CUSTOMER
    // this.loginForm = this.fb.group({
    //   email: ['gago@test.com', [Validators.required]],
    //   password: ['gago', [Validators.required]]
    // })
  }

  openSignUpDialog () {
    this.closeDialog()
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '60%'
    dialogConfig.height = '80%'

    this.dialog.open(SignUpDialogComponent, dialogConfig)
  }

  closeDialog () {
    this.dialogRef.close()
  }

  signIn () {
    const email = this.loginForm.get(['email'])!.value
    const password = this.loginForm.get(['password'])!.value

    this.authService.login(email, password).subscribe({
      next: role => {
        this.router.navigateByUrl(role === 'ADMIN' ? '/admin' : '/')
        this.dialogRef.close()
        this.loginForm.reset()
      },
      error: errorMessage => {
        this.snackBar.open(errorMessage || 'Uknown error occured.', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: 'error-snackbar'
        })
      }
    })
  }
}
