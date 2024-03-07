import { Component } from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms'
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef
} from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { SignInDialogComponent } from '../sign-in-dialog/sign-in-dialog.component'
import { AuthService } from '../../services/auth/auth.service'

@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  styleUrl: './sign-up-dialog.component.scss'
})
export class SignUpDialogComponent {
  registerForm!: FormGroup

  constructor (
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SignUpDialogComponent>,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit () {
    const { required, email } = Validators

    this.registerForm = this.fb.group({
      firstname: ['customer', [required]],
      lastname: ['badass', [required]],
      email: ['customer@email.com', [required, email]],
      password: ['12345', [required]]
    })
  }

  openSignInDialog () {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '60%'
    dialogConfig.height = 'fit-content'

    this.dialog.open(SignInDialogComponent, dialogConfig)
  }

  closeDialog () {
    this.dialogRef.close()
  }

  register () {
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.snackBar.open('Registration successful!', 'Close', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: 'success-snackbar'
        })

        this.dialogRef.close()
        this.registerForm.reset()
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
