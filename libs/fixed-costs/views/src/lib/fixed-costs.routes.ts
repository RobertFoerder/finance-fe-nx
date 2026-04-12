import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  FIXED_COSTS_FEATURE_KEY,
  reducer,
  FixedCostsEffects,
  FixedCostsFacade,
} from '@finance-fe-nx/fixed-costs/data';
import { FixedCostsComponent } from './fixed-costs/fixed-costs.component';
import { AddFixedCostComponent } from './add-fixed-cost/add-fixed-cost.component';
import { EditFixedCostComponent } from './edit-fixed-cost/edit-fixed-cost.component';

export const FIXED_COSTS_ROUTES: Routes = [
  {
    path: '',
    providers: [
      provideState(FIXED_COSTS_FEATURE_KEY, reducer),
      provideEffects(FixedCostsEffects),
      FixedCostsFacade,
    ],
    children: [
      { path: '', component: FixedCostsComponent },
      { path: 'add', component: AddFixedCostComponent },
      { path: 'edit/:fixedCostId', component: EditFixedCostComponent },
    ],
  },
];
