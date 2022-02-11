import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FixedCostsComponent } from './fixed-costs/fixed-costs.component';
import { FixedCostsModule } from './fixed-costs/fixed-costs.module';
import { AddFixedCostComponent } from './add-fixed-cost/add-fixed-cost.component';
import { AddFixedCostModule } from './add-fixed-cost/add-fixed-cost.module';
import { EditFixedCostComponent } from './edit-fixed-cost/edit-fixed-cost.component';
import { EditFixedCostModule } from './edit-fixed-cost/edit-fixed-cost.module';
import { FixedCostsDataModule } from '@finance-fe-nx/fixed-costs/data';

export const ROUTES: Routes = [
  { path: '', component: FixedCostsComponent },
  { path: 'add', component: AddFixedCostComponent },
  { path: 'edit/:fixedCostId', component: EditFixedCostComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    FixedCostsModule,
    AddFixedCostModule,
    EditFixedCostModule,
    FixedCostsDataModule,
  ],
})
export class FixedCostsViewsModule {}
