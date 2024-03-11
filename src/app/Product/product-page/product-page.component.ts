import { Component, Input, Signal, computed } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model';
import { CartService } from '../../services/cart.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignInDialogComponent } from '../../Login/sign-in-dialog/sign-in-dialog.component';
import { AuthLocalStorageService } from '../../services/auth-local-storage/auth-local-storage.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  productId: number;
  product: Product;
  quantity: number = 1;
  productQuantity: number;
  loggedIn: Signal<boolean> = computed(() =>
    this.authLocalStorageService.isAuthenticated()
  );
  isAdmin: Signal<boolean> = computed(() =>
    this.authLocalStorageService.isAdmin()
  );

  constructor(
    public route: ActivatedRoute,
    private productService: ProductService,
    private authLocalStorageService: AuthLocalStorageService,
    private cartService: CartService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.productId = params['productId'];
    });
    this.loadProduct(this.productId);
  }
  loadProduct(id: number) {
    // this.product=this.productService.getProductByIdServer(this.productId);

    this.productService
      .getProductByIdDB(this.productId)
      .subscribe((product1: Product) => {
        this.product = product1;
        this.productQuantity = product1.numberInStock;
      });
  }

  addToCart() {
    this.cartService.addToCart(this.product.productId, this.quantity);
  }

  increase() {
    if (this.quantity < this.productQuantity) {
      this.quantity++;
    }
  }

  decrease() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  openSignInDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '60%';
    dialogConfig.height = '60%';

    this.dialog.open(SignInDialogComponent, dialogConfig);
  }
}
