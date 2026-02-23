import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  IonBackButton, IonButton,
  IonButtons, IonCol,
  IonContent,
  IonGrid,
  IonHeader, IonIcon, IonImg, IonInput, IonItem, IonRow,
  IonTitle,
  IonToolbar, ToastController
} from '@ionic/angular/standalone';
import {Order} from "../../model/order.model";
import {CartService} from "../../service/cart-service";
import {OrderService} from "../../service/order-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonBackButton, IonGrid, IonRow, IonCol, IonItem, IonImg, IonInput, IonButton, IonIcon, ReactiveFormsModule]
})
export class OrderPage implements OnInit {
  private formBuilder = inject(FormBuilder);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  private toastController = inject(ToastController);

  form = this.formBuilder.group({
    country: '',
    city: '',
    address: ''
  });

  constructor() {
  }

  ngOnInit() {
  }

  handleAddOrder() {
    const order: Order = {
      country: this.form.get('country')?.value as string,
      city: this.form.get('city')?.value as string,
      address: this.form.get('address')?.value as string,
      totalAmount: this.cartService.cart().totalAmount,
      items: this.cartService.cart().items.map(item=>{
        return {
          amount: item.amount,
          bookId: item.book.id,
          quantity: item.quantity
        }
      }),
    }
    this.orderService.add(order).subscribe(res => {
      this.cartService.resetCart();
      this.router.navigate(['books']).then(async () => {
        const toast = await this.toastController.create({
          message: 'Order created successfully!',
          duration: 1500,
          position: 'bottom',
          icon: 'checkmark-circle-outline'
        });

        await toast.present();
      })
    });
  }
}
