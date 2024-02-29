import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../model';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent {
  constructor(private userService: UserService) {

  }

  user: User = this.userService.user;
}
