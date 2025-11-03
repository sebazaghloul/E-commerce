import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth-guard';
import { isLoggedGuard } from './core/guards/is-logged-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // 🔹 صفحات تسجيل الدخول والتسجيل
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [isLoggedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./core/auth/login/login.component').then(m => m.LoginComponent),
        title: 'login page',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./core/auth/register/register.component').then(m => m.RegisterComponent),
        title: 'register page',
      },
      {
        path: 'forgetPassword',
        loadComponent: () =>
          import('./core/auth/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent),
        title: 'forgetPassword page',
      },
    ],
  },

  // 🔹 الصفحات الداخلية (بعد تسجيل الدخول)
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then(m => m.HomeComponent),
        title: 'home page',
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./features/cart/cart.component').then(m => m.CartComponent),
        title: 'cart page',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./features/brands/brands.component').then(m => m.BrandsComponent),
        title: 'brands page',
      },
      {
        path: 'brands/:id', 
        loadComponent: () =>
           import('./features/brandDetails/brand-details/brand-details.component').then(m => m.BrandDetailsComponent),
        title: 'brand details page',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./features/categories/categories.component').then(m => m.CategoriesComponent),
        title: 'categories page',
      },
      {
        path: 'categories/:id',
        loadComponent: () =>
          import('./features/categorydetails/category-details/category-details.component').then(m => m.CategoryDetailsComponent),
        title: 'category details page',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/allorders/allorders.component').then(m => m.AllordersComponent),
        title: 'allorders page',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component').then(m => m.ProductsComponent),
        title: 'products page',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./features/checkout/checkout.component').then(m => m.CheckoutComponent),
        title: 'checkout page',
      },
      {
        path: 'details/:slug/:id',
        loadComponent: () =>
          import('./features/details/details.component').then(m => m.DetailsComponent),
        title: 'details page',
      },
    ],
  },

  // 🔹 صفحة not found
  {
    path: '**',
    loadComponent: () =>
      import('./features/notfound/notfound.component').then(m => m.NotfoundComponent),
    title: 'notfound page',
  },
];
