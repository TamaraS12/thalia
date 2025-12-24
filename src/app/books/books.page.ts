import {Component, inject, OnInit, viewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader, IonIcon, IonItem, IonList, IonPopover, IonRadio, IonRadioGroup,
  IonRow, IonSearchbar, IonSelect, IonSelectOption,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Book} from "./model/book.model";
import {BookService} from "./service/book-service";
import {BookFilterParams} from "./model/book-filter-params.model";

@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonGrid,
    IonRow,
    IonCol,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonChip,
    IonSearchbar,
    IonButton,
    IonIcon,
    IonPopover,
    IonList,
    IonItem,
    IonRadioGroup,
    IonRadio,
    IonSelect,
    IonSelectOption
  ]
})
export class BooksPage implements OnInit {

  apiBaseUrl = 'http://localhost:8080';

  books: Book[] = [];
  authors: any[] = [];
  genres: any[] = [];

  filters: any = {
    authorId: null,
    genreId: null,
    title: null,
    sort: 'price,asc'
  };

  isFilterPanelOpened = false;

  private bookService = inject(BookService);
  popover = viewChild(IonPopover);

  ngOnInit() {
    this.loadAuthors();
    this.loadGenres();
    this.loadBooks();
  }

  loadBooks() {
    const params: BookFilterParams = {};

    if (this.filters.title) {
      params.title = this.filters.title;
    }

    if (this.filters.authorId) {
      params.authorId = this.filters.authorId;
    }

    if (this.filters.genreId) {
      params.genreId = this.filters.genreId;
    }

    if (this.filters.sort) {
      params.sort = this.filters.sort;
    }

    this.bookService.searchBooks(params)
      .subscribe(res => this.books = res.content);
  }

  loadAuthors() {
    // GET /api/authors
    this.authors = [
      { id: 1, name: 'George Orwell' },
      { id: 2, name: 'Jane Austen' }
    ];
  }

  loadGenres() {
    // GET /api/genres
    this.genres = [
      { id: 1, name: 'Novel' },
      { id: 2, name: 'Science Fiction' }
    ];
  }

  onSearch() {
    this.loadBooks();
  }

  handleSortChange() {
    this.popover()?.dismiss();
    this.loadBooks();
  }
}
