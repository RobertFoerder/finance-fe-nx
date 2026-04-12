import { Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'summary' },
  {
    path: 'summary',
    loadChildren: () =>
      import('@finance-fe-nx/summary/views').then((m) => m.SUMMARY_ROUTES),
    canActivate: [MsalGuard],
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('@finance-fe-nx/accounts/views').then((m) => m.ACCOUNTS_ROUTES),
    canActivate: [MsalGuard],
  },
  {
    path: 'fixed-costs',
    loadChildren: () =>
      import('@finance-fe-nx/fixed-costs/views').then(
        (m) => m.FIXED_COSTS_ROUTES,
      ),
    canActivate: [MsalGuard],
  },
];
