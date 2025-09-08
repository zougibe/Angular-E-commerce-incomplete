import { Routes } from '@angular/router';
import { AuthLayout } from '../Features/layouts/auth-layout/auth-layout';
import { Login } from '../Features/auth/login/login';
import { Register } from '../Features/auth/register/register';
import { MainLayout } from '../Features/layouts/main-layout/main-layout';
import { Home } from '../Features/pages/home/home';
import { Cart } from '../Features/pages/cart/cart';
import { Products } from '../Features/pages/products/products';
import { ProductsDetails } from '../Features/pages/products-details/products-details';
import { Brands } from '../Features/pages/brands/brands';
import { Categories } from '../Features/pages/categories/categories';

export const routes: Routes = [
  {
    path: '', component: AuthLayout, children: [
      { path: 'login', component: Login, title: "Login" },
      { path: 'sign-up', component: Register, title: "Sign up" }
    ]
  },
  {
    path: '', component: MainLayout, children: [
      { path: '', component: Home, title: "Home" },
      { path: 'home', component: Home, title: "Home" },
      { path: 'cart', component: Cart, title: "Cart" },
      { path: 'product', component: Products, title: "Products" },
      { path: 'product-details', component: ProductsDetails, title: "Products Details" },
      { path: 'brands', component: Brands, title: "Brands" },
      { path: 'categories', component: Categories, title: "Categories" },
    ]
  }
];
