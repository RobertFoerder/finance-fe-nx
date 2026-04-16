import { Routes } from '@angular/router';
import { AccountsStore } from '@finance-fe-nx/accounts/data';
import { AccountsComponent } from './accounts/accounts.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';

export const ACCOUNTS_ROUTES: Routes = [
  {
    path: '',
    providers: [AccountsStore],
    children: [
      { path: '', component: AccountsComponent },
      { path: 'add', component: AddAccountComponent },
      { path: 'edit/:accountId', component: EditAccountComponent },
    ],
  },
];
