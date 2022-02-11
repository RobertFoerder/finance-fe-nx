import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';

import * as fromFixedCosts from './fixed-costs/fixed-costs.reducers';
import { FixedCostsEffects } from './fixed-costs/fixed-costs.effects';
import { EffectsModule } from '@ngrx/effects';
import { FixedCostsFacade } from './fixed-costs/fixed-costs.facade';
import { SharedModule } from '@finance-fe-nx/shared';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromFixedCosts.FIXED_COSTS_FEATURE_KEY,
      fromFixedCosts.reducer
    ),
    EffectsModule.forFeature([FixedCostsEffects]),
    SharedModule,
  ],
  providers: [FixedCostsFacade],
})
export class FixedCostsDataModule {}
