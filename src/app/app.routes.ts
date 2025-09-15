import { Routes } from '@angular/router';
import { AuthLayout } from '../Features/layouts/auth-layout/auth-layout';
import { Login } from '../Features/auth/login/login';
import { Register } from '../Features/auth/register/register';
import { MainLayout } from '../Features/layouts/main-layout/main-layout';
import { Home } from '../Features/pages/home/home';
import { Carts } from '../Features/pages/cart/cart';
import { Products } from '../Features/pages/products/products';
import { ProductsDetails } from '../Features/pages/products-details/products-details';
import { Brands } from '../Features/pages/brands/brands';
import { Categories } from '../Features/pages/categories/categories';
import { authGuard } from '../core/guard/auth/auth-guard';
import { checkTokenGuard } from '../core/guard/checkToken/check-token-guard';
import { AllOrders } from '../Features/pages/all-orders/all-orders';
import { Checkout } from '../Features/pages/checkout/checkout';
import { ResetPasswords } from '../Features/auth/resetPassword/reset-password';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '', component: AuthLayout, canActivate: [checkTokenGuard], children: [
      { path: 'login', component: Login, title: "Login" },
      { path: 'sign-up', component: Register, title: "Sign up" },
      { path: 'resetPassword', component: ResetPasswords, title: "ResetPassword" },
    ]
  },
  {
    path: '', component: MainLayout, children: [
      { path: 'home', component: Home, title: "Home" },
      { path: 'cart', component: Carts, canActivate: [authGuard], title: "Cart" },
      { path: 'allOrders', component: AllOrders, canActivate: [authGuard], title: "All Orders" },
      { path: 'checkout/:id', component: Checkout, canActivate: [authGuard], title: "Checkout" },
      { path: 'product', component: Products, title: "Products" },
      { path: 'product-details/:id', component: ProductsDetails, title: "Products Details" },
      { path: 'brands', component: Brands, title: "Brands" },
      { path: 'categories', component: Categories, title: "Categories" },
    ]
  }
];
