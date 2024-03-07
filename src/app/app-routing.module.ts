import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HomePageComponent } from './Home/home-page/home-page.component'
import { RouterModule, Routes } from '@angular/router'
import { SignInPageComponent } from './Login/sign-in-page/sign-in-page.component'
import { ShoppingCartPageComponent } from './Cart/shopping-cart-page/shopping-cart-page.component'
import { WishlistPageComponent } from './Wishlist/wishlist-page/wishlist-page.component'
import { CategoryComponent } from './Products/category/category.component'
import { ProductPageComponent } from './Product/product-page/product-page.component'
import { CustomerDetailsComponent } from './Customer/customer-details/customer-details.component'
import { AdminPageComponent } from './Admin/admin-page/admin-page.component'
import { RoleGuard } from './guards/role-guard/role.guard'

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'home', redirectTo: '/' },
  { path: 'signin', component: SignInPageComponent },
  { path: 'cart', component: ShoppingCartPageComponent },
  { path: 'wishlist', component: WishlistPageComponent },
  { path: 'categories/:categoryName', component: CategoryComponent },
  { path: 'product/:productId', component: ProductPageComponent },
  { path: 'accountInfo', component: CustomerDetailsComponent },
  {
    path: 'admin',
    loadComponent: () => AdminPageComponent,
    canActivate: [RoleGuard],
    data: { requiredRole: 'ADMIN' }
  }

  /**  @NOTE: sample for a customer guard implementation:
  {
    path: 'customer-dashboard',
    loadComponent: () => CustomerDashboardComponent,
    canActivate: [RoleGuard],
    data: { requiredRole: 'CUSTOMER' }
  } 
  **/
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
