import {Component, inject} from '@angular/core';
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
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem, IonLabel, IonIcon, RouterLink, IonMenuToggle],
})
export class AppComponent {
  private router = inject(Router);

  constructor() {}

  handleLogout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
