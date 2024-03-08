import { Component } from '@angular/core';

@Component({
  selector: 'app-quantity-component',
  templateUrl: './quantity-component.component.html',
  styleUrl: './quantity-component.component.scss',
})
export class QuantityComponentComponent {
  quantity: number = 1;
  productQuantity: number;

  increase() {
    if (this.quantity < this.productQuantity) {
      this.quantity++;
    }
  }

  decrease() {
    if (this.quantity > 2) {
      this.quantity--;
    }
  }
}
