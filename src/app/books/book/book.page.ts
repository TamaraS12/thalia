import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  IonBadge, IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonCol,
  IonContent,
  IonHeader, IonIcon, IonInput, IonMenuButton, IonRow, IonText,
  IonTitle,
  IonToolbar, ToastController
} from '@ionic/angular/standalone';
import {Book} from "../../model/book.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {BookService} from "../../service/book-service";
import {CartService} from "../../service/cart-service";
import {CartItem} from "../../model/cart.model";

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
    IonInput, RouterLink, ReactiveFormsModule]
})
export class BookPage implements OnInit {
  apiBaseUrl = 'http://localhost:8080';
  book: Book | undefined;
  route = inject(ActivatedRoute);
  router = inject(Router);
  bookService = inject(BookService);
  cartService = inject(CartService);
  toastController = inject(ToastController);

  cartSize = this.cartService.cartSize;

  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    quantity: 0
  });

  cartItem: CartItem | undefined;

  constructor() {
  }

  ngOnInit() {
    const id: number = this.route.snapshot.params['id'];
    this.bookService.getById(id)
      .subscribe(res => this.book = res);

    const cartItemId: number = this.route.snapshot.params['cartItemId'];
    if (cartItemId) {
      this.cartItem = this.cartService.getCartItem(cartItemId);
      this.form.get('quantity')?.patchValue(this.cartItem ? this.cartItem.quantity : 0);
    }
  }

  handleCartItemClicked() {
    if (this.cartItem) {
      this.editCartItem();
    } else {
      this.addCartItem();
    }

  }

  private addCartItem(): void {
    if (this.book) {
      const quantity: number = this.form.get('quantity')?.value as number;
      const cartItem: CartItem = {
        id: this.cartSize() + 1,
        book: this.book,
        quantity: quantity,
        amount: this.book.price * quantity
      }
      this.cartService.addCartItem(cartItem);
      this.router.navigate(['cart']).then(async () => {
        const toast = await this.toastController.create({
          message: 'Cart item added successfully!',
          duration: 1500,
          position: 'bottom',
          icon: 'checkmark-circle-outline'
        });

        await toast.present();
      });
    }
  }

  private editCartItem() {
    if (this.book && this.cartItem) {
      const quantity: number = this.form.get('quantity')?.value as number;
      const updatedCartItem: CartItem = {
        ...this.cartItem,
        quantity: quantity,
        amount: this.book.price * quantity
      }
      this.cartService.updateCartItem(updatedCartItem);
      this.router.navigate(['cart']).then(async () => {
        const toast = await this.toastController.create({
          message: 'Cart item updated successfully!',
          duration: 1500,
          position: 'bottom',
          icon: 'checkmark-circle-outline'
        });

        await toast.present();
      });
    }
  }
}
