import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';
import {
  NgxAwesomePopupModule,
  ConfirmBoxConfigModule,
} from '@costlydeveloper/ngx-awesome-popup';
import { GenericApiEffects } from '@finance-fe-nx/core';
import {
  FinanceApiModule,
  FinanceConfiguration,
} from '@finance-fe-nx/finance-api';
import { LayoutModule } from '@finance-fe-nx/layout';
import { environment, SharedModule } from '@finance-fe-nx/shared';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { APP_ROUTES } from './app.routes';

export const APP_CONFIG: ApplicationConfig = {
  providers: [
    provideRouter(APP_ROUTES),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom([
      BrowserModule,
      MsalModule.forRoot(
        new PublicClientApplication({
          auth: {
            clientId: '0328ffcf-3e10-46af-bbcb-b0304f3ad068',
            authority:
              'https://login.microsoftonline.com/b0ea035c-6cd2-489c-941b-081faffe69e1',
            redirectUri: environment.loginRedirectUri,
          },
          cache: {
            cacheLocation: 'localStorage',
          },
        }),
        {
          interactionType: InteractionType.Redirect,
          authRequest: {
            scopes: ['user.read'],
          },
        },
        {
          interactionType: InteractionType.Redirect,
          protectedResourceMap: new Map([
            [
              'https://finance-app-function-app.azurewebsites.net/api/*',
              ['api://b4dcf01c-7c63-4131-933c-7f359c4a0c58/user_impersonation'],
            ],
          ]),
        },
      ),
      StoreModule.forRoot(
        {},
        {
          runtimeChecks: {
            strictStateImmutability: true,
            strictActionImmutability: true,
            strictStateSerializability: true,
            strictActionSerializability: true,
            strictActionTypeUniqueness: true,
          },
        },
      ),
      EffectsModule.forRoot([GenericApiEffects]),
      environment.production ? [] : StoreDevtoolsModule.instrument(),
      StoreRouterConnectingModule.forRoot(),
      FinanceApiModule.forRoot(
        () => new FinanceConfiguration({ basePath: environment.basePath }),
      ),
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.production,
        // Register the ServiceWorker as soon as the app is stable
        // or after 30 seconds (whichever comes first).
        registrationStrategy: 'registerWhenStable:30000',
      }),
      LayoutModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot(),
      NgxAwesomePopupModule.forRoot(),
      ConfirmBoxConfigModule.forRoot(),
      SharedModule,
    ]),
  ],
};
