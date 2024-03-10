import { Component,Inject,Signal, computed } from '@angular/core';
import { CartService } from '../services/cart.service'; 
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Order } from '../model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  order: Order;

  subTotal: number;
  discount=6;
  totalBeforeTax=460;
  estimatedTaxToBeCollected=460;
  orderTotal=4650;


  public cartMap: Signal<Map<number, number>> = computed(() =>
    this.cartService.cart()
  );

   constructor(private cartService: CartService,
    public dialogRef: MatDialogRef<OrderComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    

    console.log("Inside order constructor "+this.data.order.subTotal);
   // if (this.data && this.data.order) {
      //this.order = this.data.order;
      this.subTotal = this.data.order.subTotal;
      this.discount = this.data.order.discount;
      this.totalBeforeTax = this.data.order.totalBeforeTax;
      this.estimatedTaxToBeCollected = this.data.order.estimatedTaxToBeCollected;
      this.orderTotal = this.data.order.orderTotal;
      console.log(this.subTotal)
    //}
   }

  // constructor(
  //   private productService: ProductService,public dialogRef: MatDialogRef<GeneralFormComponent>,@Inject(MAT_DIALOG_DATA) public data: any
  // ) {
  //   console.log(this.data);
  //   this.formType = this.data.formType;
  // }


  closeDialog() {
    this.dialogRef.close();
  }
}
