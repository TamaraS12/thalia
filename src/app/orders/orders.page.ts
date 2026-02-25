import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {
  IonAccordion, IonAccordionGroup, IonBadge, IonButton, IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader, IonIcon,
  IonItem, IonLabel,
  IonMenuButton,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Order} from "../model/order.model";
import {OrderService} from "../service/order-service";
import {RouterLink} from "@angular/router";
import {CartService} from "../service/cart-service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonGrid, IonRow, IonCol, IonItem, IonLabel, IonIcon, IonAccordion, IonAccordionGroup, IonButtons, IonMenuButton, IonBadge, IonButton, RouterLink]
})
export class OrdersPage implements OnInit {
  private orderService = inject(OrderService);
  private cartService = inject(CartService);

  cartSize = this.cartService.cartSize;
  orders: Order[] = [];

  constructor() {
  }

  ngOnInit() {
    this.loadOrders();
  }

  private loadOrders() {
    this.orderService.getAll()
      .subscribe(res => this.orders = res);
  }
}
