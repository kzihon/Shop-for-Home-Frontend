import { Component, Signal, computed, effect } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { Coupon, Order } from '../../model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderComponent } from '../../order/order.component';
import { AuthLocalStorageService } from '../../services/auth-local-storage/auth-local-storage.service';
import { CouponService } from '../../services/coupon.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cart-total',
  templateUrl: './cart-total.component.html',
  styleUrl: './cart-total.component.scss',
})
export class CartTotalComponent {
  // public cartMap: Map<number, number>;

 
   couponCode=new FormControl('');
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
    private couponService: CouponService,
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
    //console.log(this.couponCode);
    
     this.couponService.verifyCouponByCode(this.couponCode.value).
     subscribe((coupon:Coupon)=>{
      console.log("servery coupon ",coupon)
      if(coupon !=null && coupon.active==true){
        this.isVerified=true;
      }else if(coupon ==null || coupon.active==false){
        this.isVerified=false;
     }});
     //console.log("my couponnsss",coupon);
     
   
     // if(coupon.active)
    }

 order:Order;


openCheckOutDialog() {
  
 
  let customerId = this.authLocalStorageService.userDetails.id;

  if(this.isVerified==false || this.couponCode.value==''){
    this.cartService.sendCartToServerWithOutCoupons(customerId).subscribe((order: Order) => {
      console.log("Inside server response", order);
  
      // Open the dialog only after receiving the server response
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "100%";
      dialogConfig.height = "100%";
      dialogConfig.data = {
        order: order
      };
  
      this.dialog.open(OrderComponent, dialogConfig);
    });
  } else if(this.isVerified==true){
    this.cartService.sendCartToServerWithCoupons(customerId, this.couponCode.value).subscribe((order: Order) => {
      console.log("Inside server response", order);
  
      // Open the dialog only after receiving the server response
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "100%";
      dialogConfig.height = "100%";
      dialogConfig.data = {
        order: order
      };
  
      this.dialog.open(OrderComponent, dialogConfig);
    });
  }
  this.cartService.emptyCart();
}
}
