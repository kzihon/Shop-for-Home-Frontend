import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddCoupon, Coupon } from '../../model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GeneralFormComponent } from '../general-form/general-form.component';
import { AuthorizedHttpService } from '../../services/authorized-http/authorized-http.service'; 
import { CouponService } from '../../services/coupon.service';

@Component({
  selector: 'app-coupon-form',
  templateUrl: './coupon-form.component.html',
  styleUrl: './coupon-form.component.scss'
})
export class CouponFormComponent {
  couponForm!: FormGroup;
  formType: string;

  couponForCreate: AddCoupon = {
    couponName:'',
    code:'',
    discount:0,
    active:false,
    
  };
  
  selectedCoupon: Coupon;

  constructor(
   // private productService: ProductService,
   public couponService:CouponService,
    public dialogRef: MatDialogRef<CouponFormComponent>,
    private authorizedHttp: AuthorizedHttpService,
    private fb: FormBuilder,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formType = this.data.formType;
  }

  ngOnInit(): void {
    if (this.formType == 'Edit Coupon') {
      this.selectedCoupon = this.data.coupon;
      this.couponForm = this.fb.group({
        couponName: [this.selectedCoupon.couponName, [Validators.required]],
        code: [this.selectedCoupon.code, [Validators.required]],
        discount: [this.selectedCoupon.discount, [Validators.required]],
        active: [this.selectedCoupon.active, [Validators.required]],
      });
      
    } else {
      this.couponForm = this.fb.group({
        couponName: ['', [Validators.required]],
        code: ['', [Validators.required]],
        discount: [0, [Validators.required]],
        active: [false, [Validators.required]],
        
      });
    }
  }

  // onFileSelected(event) {
  //   if (event.target.files) {
  //     const file = event.target.files[0];
  //     const fileHandle: FileHandle = {
  //       file: file,
  //     };
  //     this.productImage = fileHandle;
  //   }
  // }

  addCoupon() {
    if (this.isIncomplete()) {
      console.log('fill out required fields');
    } else {
      this.couponForCreate.couponName = this.couponForm.get(['couponName'])!.value;
      this.couponForCreate.code = this.couponForm.get(['code'])!.value;
      this.couponForCreate.discount = this.couponForm.get([
        'discount',
      ])!.value;
      
      this.couponForCreate.active = this.couponForm.get([
        'active',
      ])!.value;
      
      //const couponFormData = this.prepareFormData(this.couponForCreate);

      this.authorizedHttp.post('/coupons', this.couponForCreate).subscribe({
        next: (coupon) => {
          this.couponService.createCouponFrontend(coupon);
          this.closeDialog()

          console.log(coupon);
          this.couponForm.reset();
        },
        error: (errorMessage) => {
          console.log(errorMessage);
        },
      });
    }
  }

  editCoupon() {
    if (this.isIncomplete()) {
      console.log('fill out required fields');
    } else {
      let coupon={
        id: this.selectedCoupon.id,
        couponName: this.couponForm.get(['couponName'])!.value,
        code: this.couponForm.get(['code'])!.value,
        discount: this.couponForm.get(['discount'])!.value,
        active: this.couponForm.get(['active'])!.value
      };
      console.log("my coupon: ", coupon);
      
      this.authorizedHttp
        .put(
          `/coupons/${this.selectedCoupon.id}`,
          coupon

        )
        .subscribe({
          next: (coupon) => {
            this.couponService.editCouponFrontend(
              this.selectedCoupon,
              coupon
            );

            console.log(coupon);
            this.closeDialog()
            this.couponForm.reset();
          },
          error: (errorMessage) => {
            console.log(errorMessage);
          },
        });
    }
  }

  // prepareFormData(product): FormData {
  //   const formData = new FormData();
  //   formData.append(
  //     'product',
  //     new Blob([JSON.stringify(product)], { type: 'application/json' })
  //   );
  //   formData.append(
  //     'imageFile',
  //     this.productImage.file,
  //     this.productImage.file.name
  //   );
  //   return formData;
  // }

  isIncomplete() {
    if (
      this.couponForm.get(['couponName'])!.value == '' ||
      this.couponForm.get(['code'])!.value == '' ||
      this.couponForm.get(['discount'])!.value <= 0 ||
      this.couponForm.get(['active'])!.value == '' 
     
    ) {
      return true;
    } else {
      return false;
    }
  }
  
  closeDialog() {
    this.dialogRef.close();
  }
}
