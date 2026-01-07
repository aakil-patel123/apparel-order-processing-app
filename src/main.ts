import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { AppComponent } from './app/app.component';
import { routes } from './app/app-routing.module';

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyB_ExsUOsdvUtkXet-tgCXOxzFd8s99ANc",
      authDomain: "apparel-order-processing-app.firebaseapp.com",
      projectId: "apparel-order-processing-app",
      storageBucket: "apparel-order-processing-app.firebasestorage.app",
      messagingSenderId: "609191963046",
      appId: "1:609191963046:web:991fb2e03a73cd66918767"
    })),
    provideFirestore(() => getFirestore())
  ]
});
