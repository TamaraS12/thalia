import { Component } from '@angular/core';
import {
  IonApp,
  IonContent,
  IonHeader, IonIcon, IonItem, IonLabel,
  IonList,
  IonMenu, IonMenuToggle,
  IonRouterOutlet,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon, RouterLink, IonMenuToggle],
})
export class AppComponent {
  constructor() {}
}
