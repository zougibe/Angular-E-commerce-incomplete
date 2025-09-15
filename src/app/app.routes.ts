import { Routes } from '@angular/router';
import { AuthLayout } from '../Features/layouts/auth-layout/auth-layout';
import { MainLayout } from '../Features/layouts/main-layout/main-layout';
import { authGuard } from '../core/guard/auth/auth-guard';
import { checkTokenGuard } from '../core/guard/checkToken/check-token-guard';

export const routes: Routes = [
  {
    path: '', component: AuthLayout, canActivate: [checkTokenGuard], children: [
      { path: 'login', loadComponent: () => import('../Features/auth/login/login').then((c) => c.Login), title: "Login" },
      { path: 'sign-up', loadComponent: () => import('../Features/auth/register/register').then((c) => c.Register), title: "Sign up" },
      { path: 'resetPassword', loadComponent: () => import('../Features/auth/resetPassword/reset-password').then((c) => c.ResetPasswords), title: "ResetPassword" },
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '', component: MainLayout, children: [
      { path: 'home', loadComponent: () => import('../Features/pages/home/home').then((c) => c.Home), title: "Home" },
      { path: 'cart', loadComponent: () => import('../Features/pages/cart/cart').then((c) => c.Carts), canActivate: [authGuard], title: "Cart" },
      { path: 'allOrders', loadComponent: () => import('../Features/pages/all-orders/all-orders').then((c) => c.AllOrders), canActivate: [authGuard], title: "All Orders" },
      { path: 'checkout/:id', loadComponent: () => import('../Features/pages/checkout/checkout').then((c) => c.Checkout), canActivate: [authGuard], title: "Checkout" },
      { path: 'product', loadComponent: () => import('../Features/pages/products/products').then((c) => c.Products), title: "Products" },
      { path: 'product-details/:id', loadComponent: () => import('../Features/pages/products-details/products-details').then((c) => c.ProductsDetails), title: "Products Details" },
      { path: 'brands', loadComponent: () => import('../Features/pages/brands/brands').then((c) => c.Brands), title: "Brands" },
      { path: 'categories', loadComponent: () => import('../Features/pages/categories/categories').then((c) => c.Categories), title: "Categories" },
    ]
  }
];
