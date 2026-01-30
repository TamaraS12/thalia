import {bootstrapApplication} from '@angular/platform-browser';
import {RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules} from '@angular/router';
import {IonicRouteStrategy, provideIonicAngular} from '@ionic/angular/standalone';

import {routes} from './app/app.routes';
import {AppComponent} from './app/app.component';
import {provideHttpClient} from "@angular/common/http";
import {addIcons} from "ionicons";
import {arrowDownOutline, arrowUpOutline, book, cart, filter, funnel, newspaper, power} from "ionicons/icons";

addIcons({
  'funnel': funnel,
  'filter': filter,
  'arrow-down-outline': arrowDownOutline,
  'arrow-up-outline': arrowUpOutline,
  'book': book,
  'newspaper': newspaper,
  'cart': cart,
  'power': power

});

bootstrapApplication(AppComponent, {
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient()
  ],
});
