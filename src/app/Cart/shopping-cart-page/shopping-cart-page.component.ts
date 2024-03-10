import { Component, OnInit, Signal, computed } from '@angular/core';
import { Product } from '../../model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrl: './shopping-cart-page.component.scss',
})
export class ShoppingCartPageComponent implements OnInit {
  public productIds: number[];
  public cartMap: Signal<Map<number, number>> = computed(() =>
    this.cartService.cart()
  );
  public numItems: number;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.productIds = Array.from(this.cartMap().keys());
    console.log(this.productIds, this.cartMap());
  }
}
