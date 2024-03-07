import { Component, Signal, computed } from '@angular/core'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog'
import { SignInDialogComponent } from '../../Login/sign-in-dialog/sign-in-dialog.component'
import { AuthLocalStorageService } from '../../services/auth-local-storage/auth-local-storage.service'

@Component({
  selector: 'app-wishlist-button',
  templateUrl: './wishlist-button.component.html',
  styleUrl: './wishlist-button.component.scss'
})
export class WishlistButtonComponent {
  loggedIn: Signal<boolean> = computed(() =>
    this.authLocalStorageService.isAuthenticated()
  )

  constructor (
    private authLocalStorageService: AuthLocalStorageService,
    private dialog: MatDialog
  ) {}

  openSignInDialog () {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '60%'
    dialogConfig.height = '60%'

    this.dialog.open(SignInDialogComponent, dialogConfig)
  }
}
