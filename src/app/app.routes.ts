import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full',
  },
  {
    path: 'books',
    loadComponent: () => import('./books/books.page').then( m => m.BooksPage)
  },
  {
    path: 'books/:id',
    loadComponent: () => import('./books/book/book.page').then( m => m.BookPage)
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.page').then( m => m.CartPage)
  },
  {
    path: 'books/:id/cart/items/:cartItemId',
    loadComponent: () => import('./books/book/book.page').then( m => m.BookPage)
  },
];
