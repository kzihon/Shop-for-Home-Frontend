import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LayoutComponent } from './Layout/layout/layout.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomePageComponent } from './Home/home-page/home-page.component';
import { CategoryCardComponent } from './Home/category-card/category-card.component';
import { AppRoutingModule } from './app-routing.module';
import { SignInPageComponent } from './Login/sign-in-page/sign-in-page.component';
import { SignInDialogComponent } from './Login/sign-in-dialog/sign-in-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ShoppingCartPageComponent } from './Cart/shopping-cart-page/shopping-cart-page.component';
import { WishlistPageComponent } from './Wishlist/wishlist-page/wishlist-page.component';
import { CategoryComponent } from './Products/category/category.component';
import { CategoriesComponent } from './Home/categories/categories.component';
import { ProductCardComponent } from './Products/product-card/product-card.component';
import { ProductPageComponent } from './Product/product-page/product-page.component';
import { ProfileButtonComponent } from './Buttons/profile-button/profile-button.component';
import { HeaderComponent } from './Layout/header/header.component';
import { CustomerDetailsComponent } from './Customer/customer-details/customer-details.component';
import { CartButtonComponent } from './Buttons/cart-button/cart-button.component';
import { WishlistButtonComponent } from './Buttons/wishlist-button/wishlist-button.component';
import { CartItemComponent } from './Cart/cart-item/cart-item.component';
import { CartTotalComponent } from './Cart/cart-total/cart-total.component';
import { SignUpDialogComponent } from './Login/sign-up-dialog/sign-up-dialog.component';
import { QuantityComponentComponent } from './Buttons/quantity-component/quantity-component.component';
import { ButtonComponentComponent } from './Buttons/button-component/button-component.component';
import { GeneralFormComponent } from './Admin/general-form/general-form.component';
import { ProductWishlistButtonComponent } from './Buttons/product-wishlist-button/product-wishlist-button.component';
import { RoundPricePipe } from './pipes/round-price/round-price.pipe';
import { ProductFormComponent } from './Admin/product-form/product-form.component';
import { UserFormComponent } from './Admin/user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomePageComponent,
    CategoryCardComponent,
    SignInPageComponent,
    SignInDialogComponent,
    ShoppingCartPageComponent,
    WishlistPageComponent,
    CategoryComponent,
    CategoriesComponent,
    ProductCardComponent,
    ProductPageComponent,
    ProfileButtonComponent,
    HeaderComponent,
    CustomerDetailsComponent,
    CartButtonComponent,
    WishlistButtonComponent,
    CartItemComponent,
    CartTotalComponent,
    SignUpDialogComponent,
    QuantityComponentComponent,
    ButtonComponentComponent,
    GeneralFormComponent,
    ProductWishlistButtonComponent,
    ProductFormComponent,
    UserFormComponent,
  ],
  providers: [provideAnimationsAsync()],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    MatIconModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatMenuModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    HttpClientModule,
    RoundPricePipe,
  ],
})
export class AppModule {}
