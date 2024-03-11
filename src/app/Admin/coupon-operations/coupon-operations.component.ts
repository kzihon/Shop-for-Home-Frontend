import { Component, Signal, computed } from '@angular/core';
import { Coupon } from '../../model';
import { ActivatedRoute } from '@angular/router';
import { CouponService } from '../../services/coupon.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CouponFormComponent } from '../coupon-form/coupon-form.component';

@Component({
  standalone: true,
  selector: 'app-coupon-operations',
  templateUrl: './coupon-operations.component.html',
  styleUrl: './coupon-operations.component.scss'
})
export class CouponOperationsComponent {
  clickedId: number;
  couponsSignal: Signal<Coupon[]> = computed(() =>
    this.couponService.couponsSignal()
  );

  constructor(
    public route: ActivatedRoute,
    private couponService: CouponService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    console.log(this.couponsSignal());
  }

  openCreateCoupon() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      formType: 'Create Coupon',
    };
    this.dialog.open(CouponFormComponent, dialogConfig);
  }
  openEditCoupon(coupon: Coupon) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      formType: 'Edit Coupon',
      coupon: coupon,
    };
    this.dialog.open(CouponFormComponent, dialogConfig);
  }

  deleteCoupon(coupon: Coupon) {
    this.couponService.deleteCouponFrontend(coupon);
    this.couponService.deleteCoupon(coupon.id).subscribe((res) => {
      console.log(res);
    });
  }
}
