import { Component, OnInit } from '@angular/core';
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
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SignUpDialogComponent } from '../sign-up-dialog/sign-up-dialog.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-dialog',
  templateUrl: './sign-in-dialog.component.html',
  styleUrl: './sign-in-dialog.component.scss',
})
export class SignInDialogComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SignInDialogComponent>,
    public userService: UserService,
    public authService: AuthService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.loginForm = this.fb.group({
    //   email: ['', [Validators.required]],
    //   password: ['', [Validators.required]]
    // })

    // ADMIN TEST
    this.loginForm = this.fb.group({
      email: ['admin@test.com', [Validators.required]],
      password: ['admin', [Validators.required]],
    });
  }

  openSignUpDialog() {
    this.closeDialog();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.height = '80%';

    this.dialog.open(SignUpDialogComponent, dialogConfig);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  signIn() {
    const email = this.loginForm.get(['email'])!.value;
    const password = this.loginForm.get(['password'])!.value;

    this.authService.login(email, password).subscribe({
      next: (role) => {
        // @TODO customer dashboard if customer?
        this.router.navigateByUrl(role === 'ADMIN' ? '/admin' : '/');

        this.loginForm.reset();
      },
      error: (message) => {
        console.log(message);

        // @TODO implementation
        // if (error status == 406) "Account does not exist"
        // else { "Bad credentials"}
      },
    });
    this.closeDialog();
  }
}
