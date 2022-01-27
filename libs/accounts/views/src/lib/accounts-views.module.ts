import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AccountsDataModule } from '@finance-fe-nx/accounts/data';
import { AccountsComponent } from './accounts/accounts.component';
import { AccountsModule } from './accounts/accounts.module';

export const ROUTES: Routes = [{ path: '', component: AccountsComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    AccountsModule,
    AccountsDataModule,
  ],
})
export class AccountsViewsModule {}
