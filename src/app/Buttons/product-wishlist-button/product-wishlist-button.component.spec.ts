import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWishlistButtonComponent } from './product-wishlist-button.component';

describe('ProductWishlistButtonComponent', () => {
  let component: ProductWishlistButtonComponent;
  let fixture: ComponentFixture<ProductWishlistButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductWishlistButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductWishlistButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
