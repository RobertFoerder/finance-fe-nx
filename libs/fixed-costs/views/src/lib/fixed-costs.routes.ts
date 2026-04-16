import { Routes } from '@angular/router';
import { FixedCostsStore } from '@finance-fe-nx/fixed-costs/data';
import { FixedCostsComponent } from './fixed-costs/fixed-costs.component';
import { AddFixedCostComponent } from './add-fixed-cost/add-fixed-cost.component';
import { EditFixedCostComponent } from './edit-fixed-cost/edit-fixed-cost.component';

export const FIXED_COSTS_ROUTES: Routes = [
  {
    path: '',
    providers: [FixedCostsStore],
    children: [
      { path: '', component: FixedCostsComponent },
      { path: 'add', component: AddFixedCostComponent },
      { path: 'edit/:fixedCostId', component: EditFixedCostComponent },
    ],
  },
];
