import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonBadge, IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol,
  IonContent,
  IonHeader, IonIcon, IonInput, IonMenuButton, IonRow, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Book} from "../model/book.model";
import {ActivatedRoute} from "@angular/router";
import {BookService} from "../service/book-service";

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
  standalone: true,
  imports: [IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonChip,
    IonButtons,
    IonMenuButton,
    IonBadge,
    IonButton,
    IonIcon,
    IonText,
    IonRow,
    IonCol,
    IonInput]
})
export class BookPage implements OnInit {
  apiBaseUrl = 'http://localhost:8080';
  book: Book | undefined;
  route = inject(ActivatedRoute);
  bookService = inject(BookService);

  cartItemsSize = 0;

  constructor() {
  }

  ngOnInit() {
    const id: number = this.route.snapshot.params['id'];
    this.bookService.getById(id)
      .subscribe(res => this.book = res);
  }

}
