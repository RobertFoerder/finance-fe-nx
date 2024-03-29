import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import * as fromFinanceEntries from './finance-entries/finance-entries.reducers';
import { FinanceEntriesEffects } from './finance-entries/finance-entries.effects';
import { EffectsModule } from '@ngrx/effects';
import { FinanceEntriesFacade } from './finance-entries/finance-entries.facade';
import { SharedModule } from '@finance-fe-nx/shared';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromFinanceEntries.FINANCE_ENTRIES_FEATURE_KEY,
      fromFinanceEntries.reducer
    ),
    EffectsModule.forFeature([FinanceEntriesEffects]),
    SharedModule,
  ],
  providers: [FinanceEntriesFacade],
})
export class SummaryDataModule {}
