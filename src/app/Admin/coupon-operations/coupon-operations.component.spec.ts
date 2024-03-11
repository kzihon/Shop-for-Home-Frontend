import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponOperationsComponent } from './coupon-operations.component';

describe('CouponOperationsComponent', () => {
  let component: CouponOperationsComponent;
  let fixture: ComponentFixture<CouponOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CouponOperationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CouponOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
