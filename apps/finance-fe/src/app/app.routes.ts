import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

export const APP_ROUTES: Routes = [
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
        (m) => m.AccountsViewsModule,
      ),
    canActivate: [MsalGuard],
  },
  {
    path: 'fixed-costs',
    loadChildren: () =>
      import('@finance-fe-nx/fixed-costs/views').then(
        (m) => m.FixedCostsViewsModule,
      ),
    canActivate: [MsalGuard],
  },
];
