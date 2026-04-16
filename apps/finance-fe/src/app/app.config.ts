import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  MsalInterceptor,
  MsalModule,
} from '@azure/msal-angular';
import {
  InteractionType,
  PublicClientApplication,
} from '@azure/msal-browser';
import { provideToastr } from 'ngx-toastr';
import { provideServiceWorker } from '@angular/service-worker';
import {
  NgxAwesomePopupModule,
  ConfirmBoxConfigModule,
} from '@costlydeveloper/ngx-awesome-popup';
import { environment } from '@finance-fe-nx/shared';
import { FinanceConfiguration } from '@finance-fe-nx/finance-api';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(appRoutes, withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideToastr(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000',
    }),
    importProvidersFrom(
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
              [
                'api://b4dcf01c-7c63-4131-933c-7f359c4a0c58/user_impersonation',
              ],
            ],
          ]),
        },
      ),
      NgxAwesomePopupModule.forRoot(),
      ConfirmBoxConfigModule.forRoot(),
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    {
      provide: FinanceConfiguration,
      useFactory: () =>
        new FinanceConfiguration({ basePath: environment.basePath }),
    },
  ],
};
