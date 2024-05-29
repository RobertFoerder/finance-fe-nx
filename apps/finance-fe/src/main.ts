import { enableProdMode } from '@angular/core';
import { environment } from '@finance-fe-nx/shared';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { APP_CONFIG } from './app/app.config';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, APP_CONFIG);
