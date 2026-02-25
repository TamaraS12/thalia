import {bootstrapApplication} from '@angular/platform-browser';
import {RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules} from '@angular/router';
import {IonicRouteStrategy, provideIonicAngular} from '@ionic/angular/standalone';

import {routes} from './app/app.routes';
import {AppComponent} from './app/app.component';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {addIcons} from "ionicons";
import {
  arrowDownOutline,
  arrowUpOutline,
  book,
  cart, checkmarkCircleOutline, cloudDone,
  create,
  filter,
  funnel,
  newspaper, paperPlane,
  power,
  trash
} from "ionicons/icons";
import {AuthInterceptor} from "./app/interceptor/auth-interceptor";

addIcons({
  'funnel': funnel,
  'filter': filter,
  'arrow-down-outline': arrowDownOutline,
  'arrow-up-outline': arrowUpOutline,
  'book': book,
  'newspaper': newspaper,
  'cart': cart,
  'power': power,
  'trash': trash,
  'create': create,
  'paper-plane': paperPlane,
  'checkmark-circle-outline': checkmarkCircleOutline,
  'cloud-done': cloudDone

});

bootstrapApplication(AppComponent, {
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
});
