import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountsDataModule } from '@finance-fe-nx/accounts/data';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountsModule } from './accounts/accounts.module';
import { AddAccountComponent } from './add-account/add-account.component';
import { AddAccountModule } from './add-account/add-account.module';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { EditAccountModule } from './edit-account/edit-account.module';

export const ROUTES: Routes = [
  { path: '', component: AccountsComponent },
  { path: 'add', component: AddAccountComponent },
  { path: 'edit/:accountId', component: EditAccountComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AccountsModule,
    AddAccountModule,
    EditAccountModule,
    AccountsDataModule,
  ],
})
export class AccountsViewsModule {}
