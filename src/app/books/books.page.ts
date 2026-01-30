import {Component, inject, OnInit, viewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonBadge,
  IonButton, IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonMenuButton, IonPopover, IonRadio, IonRadioGroup,
  IonRow, IonSearchbar, IonSelect, IonSelectOption, IonThumbnail,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Book} from "./model/book.model";
import {BookService} from "./service/book-service";
import {BookFilterParams} from "./model/book-filter-params.model";
import {Author} from "./model/author.model";
import {AuthorService} from "./service/author-service";
import {GenreService} from "./service/genre-service";
import {Genre} from "./model/genre.model";
import {RouterLink} from "@angular/router";

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
    IonGrid,
    IonRow,
    IonCol,
    IonSearchbar,
    IonButton,
    IonIcon,
    IonPopover,
    IonList,
    IonItem,
    IonRadioGroup,
    IonRadio,
    IonSelect,
    IonSelectOption,
    IonMenuButton,
    IonButtons,
    IonBadge,
    IonThumbnail,
    IonImg,
    IonLabel,
    RouterLink,
  ]
})
export class BooksPage implements OnInit {

  apiBaseUrl = 'http://localhost:8080';

  books: Book[] = [];
  authors: Author[] = [];
  genres: Genre[] = [];

  filters: any = {
    authorId: null,
    genreId: null,
    title: null,
    sort: 'price,asc'
  };

  isFilterPanelOpened = false;

  private bookService = inject(BookService);
  private authorService = inject(AuthorService);
  private genreService = inject(GenreService);
  popover = viewChild(IonPopover);

  cartItemsSize = 0;

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
    this.authorService.getAllAuthors()
      .subscribe(res => this.authors = res);
  }

  loadGenres() {
    this.genreService.getAllGenres()
      .subscribe(res => this.genres = res);
  }

  handleSortChange() {
    this.popover()?.dismiss();
    this.loadBooks();
  }
}
