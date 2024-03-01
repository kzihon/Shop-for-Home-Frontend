import { Component, Signal, computed } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Product } from '../../model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrl: './shopping-cart-page.component.scss',
})
export class ShoppingCartPageComponent {
  public productIds: number[];
  public cartMap: Signal<Map<number, number>> = computed(() =>
    this.cartService.cart()
  );
  public numItems: number;

  constructor(
    private userService: UserService,
    private cartService: CartService
  ) {
    this.productIds = Array.from(this.cartMap().keys());
  }
}
