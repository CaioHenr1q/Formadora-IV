import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { firebaseConfig } from './app/services/firebase.service';

const baseProviders = [
  { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  provideIonicAngular(),
  provideRouter(routes, withPreloading(PreloadAllModules)),
  provideHttpClient(),
];

// Se houver configuração do Firebase (apiKey), adiciona os providers
const firebaseProviders = firebaseConfig && firebaseConfig.apiKey
  ? [provideFirebaseApp(() => initializeApp(firebaseConfig)), provideDatabase(() => getDatabase())]
  : [];

bootstrapApplication(AppComponent, {
  providers: [
    ...baseProviders,
    ...firebaseProviders,
  ],
});
