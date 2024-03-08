import { Component } from '@angular/core'
import { User } from '../../model'
import { AuthLocalStorageService } from '../../services/auth-local-storage/auth-local-storage.service'
import IUserDetails from '../../services/auth/user-response.interface'

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent {
  user: IUserDetails = this.authLocalStorageService.userDetails

  constructor (private authLocalStorageService: AuthLocalStorageService) {}
}
