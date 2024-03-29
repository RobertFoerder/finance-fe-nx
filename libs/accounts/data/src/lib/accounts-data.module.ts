import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import * as fromAccounts from './accounts/accounts.reducers';
import { AccountsEffects } from './accounts/accounts.effects';
import { EffectsModule } from '@ngrx/effects';
import { AccountsFacade } from './accounts/accounts.facade';
import { SharedModule } from '@finance-fe-nx/shared';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromAccounts.ACCOUNTS_FEATURE_KEY,
      fromAccounts.reducer
    ),
    EffectsModule.forFeature([AccountsEffects]),
    SharedModule,
  ],
  providers: [AccountsFacade],
})
export class AccountsDataModule {}
