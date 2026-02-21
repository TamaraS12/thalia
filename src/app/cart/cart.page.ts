import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonBadge, IonButton,
  IonButtons, IonCol,
  IonContent, IonGrid,
  IonHeader, IonIcon, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList,
  IonMenuButton, IonRow, IonThumbnail,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {CartService} from "../service/cart-service";
import {CartItem} from "../model/cart.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonMenuButton, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonList, IonItemSliding, IonItem, IonThumbnail, IonImg, IonLabel, IonItemOptions, IonItemOption]
})
export class CartPage implements OnInit {
  apiBaseUrl = 'http://localhost:8080';
  private cartService: CartService = inject(CartService);
  private router: Router = inject(Router);

  cart = this.cartService.cart;

  constructor() {
  }

  ngOnInit() {
  }

  handleEdit(item: CartItem) {
    this.router.navigate(['books', item.book.id, 'cart', 'items', item.id]);
  }

  handleDelete(item: CartItem) {
    this.cartService.deleteCartItem(item);
  }

  handleOrder() {

  }
}
