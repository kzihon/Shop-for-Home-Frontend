import { Component, Signal, computed, effect } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Coupon, Order } from '../../model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderComponent } from '../../order/order.component';
import { AuthLocalStorageService } from '../../services/auth-local-storage/auth-local-storage.service';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrl: './cart-total.component.scss',
})
export class CartTotalComponent {
  // public cartMap: Map<number, number>;

  dummyorder:Order={
    orderId:122,
   subTotal:899,
    discount:34,
    totalBeforeTax:790,
    estimatedTaxToBeCollected:10,
    orderTotal:1000
  } 
   couponCode:string=''
   isVerified:boolean=false


  public cartMap: Signal<Map<number, number>> = computed(() =>
    this.cartService.cart()
  );
  public numItems: number;
  subtotal: Signal<number> = computed(() => this.calculateSubtotal());
  // subtotal: number;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private dialog: MatDialog,
    private authLocalStorageService:AuthLocalStorageService
  ) {
    effect(() => {
      this.calculateSubtotal();
    });
    // this.cartMap = this.cartService.cart;
    // this.subtotal.set(this.calculateSubtotal());
    // console.log('testing', this.cartMap().size);
  }

  calculateSubtotal() {
    let total = 0;
    for (let [id, quantity] of this.cartMap()) {
      let product = this.productService.getProductById(id);
      total += product.price * quantity;
    }
    return Math.round(total * 100) / 100;
  }

  coupon:Coupon;
  verifyCoupon(){
    console.log(this.couponCode);
    
    // coupon=this.cartService.verifyCoupon(this.couponCode).subscribe((res)=>console.log(res));
    if(this.coupon ==null){
      this.isVerified=false;
    }else{
     // if(coupon.active)
    }
}
 order:Order;
// openCheckOutDialog() {
  
//   let customerId=this.authLocalStorageService.userDetails.id;
//   this.cartService.sendCartToServerWithOutCoupons(customerId).subscribe((order: Order) => {
//     console.log("inside server response "+order);
    
//     this.order = order;
//   });
//   //const order1= this.cartService.sendCartToServerWithOutCoupons(1).subscribe((res)=>console.log(res));
  
  
//    const dialogConfig = new MatDialogConfig();
//        dialogConfig.width = "60%";
//        dialogConfig.height = "80%";
//        dialogConfig.data = {
//          order: this.order
         
//        };
//        this.dialog.open(OrderComponent, dialogConfig);
 
//  }

openCheckOutDialog() {
  let customerId = this.authLocalStorageService.userDetails.id;

  this.cartService.sendCartToServerWithOutCoupons(customerId).subscribe((order: Order) => {
    console.log("Inside server response", order);

    // Open the dialog only after receiving the server response
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "90%";
    dialogConfig.height = "100%";
    dialogConfig.data = {
      order: order
    };

    this.dialog.open(OrderComponent, dialogConfig);
  });
}
}
