import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountsDataModule } from '@finance-fe-nx/accounts/data';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountsModule } from './accounts/accounts.module';
import { AddAccountComponent } from './add-account/add-account.component';
import { AddAccountModule } from './add-account/add-account.module';

export const ROUTES: Routes = [
  { path: '', component: AccountsComponent },
  { path: 'add', component: AddAccountComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AccountsModule,
    AddAccountModule,
    AccountsDataModule,
  ],
})
export class AccountsViewsModule {}
