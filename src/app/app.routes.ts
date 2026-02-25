import { Routes } from '@angular/router';
import {authGuard} from "./guard/auth-guard-guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full',
  },
  {
    path: 'books',
    loadComponent: () => import('./books/books.page').then( m => m.BooksPage),
    canActivate: [authGuard]
  },
  {
    path: 'books/:id',
    loadComponent: () => import('./books/book/book.page').then( m => m.BookPage),
    canActivate: [authGuard]
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.page').then( m => m.CartPage),
    canActivate: [authGuard]
  },
  {
    path: 'books/:id/cart/items/:cartItemId',
    loadComponent: () => import('./books/book/book.page').then( m => m.BookPage),
    canActivate: [authGuard]
  },
  {
    path: 'order',
    loadComponent: () => import('./orders/order/order.page').then( m => m.OrderPage),
    canActivate: [authGuard]
  },
  {
    path: 'orders',
    loadComponent: () => import('./orders/orders.page').then( m => m.OrdersPage),
    canActivate: [authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.page').then( m => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register.page').then( m => m.RegisterPage),
  },
];
