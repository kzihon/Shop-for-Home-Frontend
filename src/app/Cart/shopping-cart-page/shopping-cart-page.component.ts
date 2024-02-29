import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Product } from '../../model';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrl: './shopping-cart-page.component.scss'
})
export class ShoppingCartPageComponent {
  public productIds: number[];
  
  constructor(userService: UserService) {
    this.productIds = userService.user.cart;
  }



}
