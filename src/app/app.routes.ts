import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    title: 'auth',
    children: [
      {
        path: 'login',
        canActivate: [loggedGuard],
        loadComponent: () =>
          import('./pages/login/login.component').then((c) => c.LoginComponent),
        title: 'login',
      },
      {
        path: 'register',
        canActivate: [loggedGuard],
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        title: 'register',
      },
      {
        path: 'forgetPassword',
        canActivate: [loggedGuard],
        loadComponent: () =>
          import('./pages/forget-password/forget-password.component').then(
            (c) => c.ForgetPasswordComponent
          ),
        title: 'forgetPassword',
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    title: 'blank',
    children: [
      {
        path: 'home',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
        title: 'home',
      },
      {
        path: 'products',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (c) => c.ProductsComponent
          ),
        title: 'products',
      },
      {
        path: 'details/:id',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/details/details.component').then(
            (c) => c.DetailsComponent
          ),
        title: 'product Details',
      },
      {
        path: 'cart',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/cart/cart.component').then((c) => c.CartComponent),
        title: 'cart',
      },
      {
        path: 'brands',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (c) => c.BrandsComponent
          ),
        title: 'brands',
      },
      {
        path: 'wishList',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./pages/wish-list/wish-list.component').then(
            (c) => c.WishListComponent
          ),
        title: 'favourite',
      },
      {
        path: 'cat/:catname',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
        title: 'cat',
      },

      {
        path: '**',
        loadComponent: () =>
          import('./pages/not-found/not-found.component').then(
            (c) => c.NotFoundComponent
          ),
        title: 'not-found',
      },
    ],
  },
];
