import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, signal } from '@angular/core';
import { AuthorizedHttpService } from './authorized-http/authorized-http.service';
import { Coupon } from '../model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  
  constructor(private http: HttpClient,
    private authorizedHttpService: AuthorizedHttpService) {
    this.loadCoupons();
    
  }
  couponsSignal: WritableSignal<Coupon[]> = signal(new Array<Coupon>());
  loadingCoupons: boolean = true;

  loadCoupons() {
    this.getAllCoupons().subscribe((coupons: Coupon[]) => {
      coupons.forEach((el: Coupon) => {
        this.couponsSignal().push(el);
      });
    });
  }
  public getAllCoupons(){
    return this.authorizedHttpService.get(`/coupons`)
   }

   deleteCouponFrontend(coupon: Coupon) {
    console.log('deleting coupon frontend');
    let index = this.couponsSignal().indexOf(coupon);
    if (index > -1) {
      this.couponsSignal().splice(index, 1);
    }
  }
  verifyCouponByCode(couponCode:string){
    return this.authorizedHttpService.get(`/coupons/verify/${couponCode}`)
  }
  deleteCoupon(id: number): Observable<ArrayBuffer> {
    return this.authorizedHttpService.delete(`/coupons/${id}`);
  }
  createCouponFrontend(coupon) {
    console.log('creating coupon frontend: ', coupon);
    this.couponsSignal().push(coupon);
  }
  editCouponFrontend(oldCoupon: Coupon, order) {
    let index = this.couponsSignal().indexOf(oldCoupon);
    if (index > -1) {
      this.couponsSignal()[index] = order;
    }
  }

  // public editProduct(
  //   id: number,
  //   name: string,
  //   price: number,
  //   description: string,
  //   category: CategoryType,
  //   numberInStock: number,
  //   supplierName: string
  // ): Observable<any> {
  //   return this.authorizedHttpService.put(
  //     `/product/${id}`,
  //     { name, price, description, category, numberInStock, supplierName }

  //     // { headers: 'response' }
  //   );
  //}
}
