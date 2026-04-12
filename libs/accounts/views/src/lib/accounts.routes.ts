import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  ACCOUNTS_FEATURE_KEY,
  reducer,
  AccountsEffects,
  AccountsFacade,
} from '@finance-fe-nx/accounts/data';
import { AccountsComponent } from './accounts/accounts.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';

export const ACCOUNTS_ROUTES: Routes = [
  {
    path: '',
    providers: [
      provideState(ACCOUNTS_FEATURE_KEY, reducer),
      provideEffects(AccountsEffects),
      AccountsFacade,
    ],
    children: [
      { path: '', component: AccountsComponent },
      { path: 'add', component: AddAccountComponent },
      { path: 'edit/:accountId', component: EditAccountComponent },
    ],
  },
];
