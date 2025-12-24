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
];
