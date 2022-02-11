import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MsalGuard, MsalInterceptor, MsalModule } from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { StoreModule } from '@ngrx/store';
import { environment } from '../environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import {
  NgxAwesomePopupModule,
  ConfirmBoxConfigModule,
} from '@costlydeveloper/ngx-awesome-popup';

import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ReactiveComponentModule } from '@ngrx/component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LayoutModule } from '@finance-fe-nx/layout';
import { GenericApiEffects } from '@finance-fe-nx/core';
import {
  FinanceApiModule,
  FinanceConfiguration,
} from '@finance-fe-nx/finance-api';
import { SharedModule } from '@finance-fe-nx/shared';

const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'summary' },
  {
    path: 'summary',
    loadChildren: () =>
      import('@finance-fe-nx/summary/views').then((m) => m.SummaryViewsModule),
    canActivate: [MsalGuard],
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('@finance-fe-nx/accounts/views').then(
        (m) => m.AccountsViewsModule
      ),
    canActivate: [MsalGuard],
  },
  {
    path: 'fixed-costs',
    loadChildren: () =>
      import('@finance-fe-nx/fixed-costs/views').then(
        (m) => m.FixedCostsViewsModule
      ),
    canActivate: [MsalGuard],
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules }),
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
      }
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
      }
    ),
    EffectsModule.forRoot([GenericApiEffects]),
    environment.production ? [] : StoreDevtoolsModule.instrument(),
    StoreRouterConnectingModule.forRoot(),
    ReactiveComponentModule,
    FinanceApiModule.forRoot(
      () => new FinanceConfiguration({ basePath: environment.basePath })
    ),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    LayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxAwesomePopupModule.forRoot(),
    ConfirmBoxConfigModule.forRoot(),
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
