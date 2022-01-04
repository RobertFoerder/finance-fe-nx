import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { SummaryModule } from './summary/summary.module';
import { SummaryDataModule } from '@finance-fe-nx/summary/data';

export const ROUTES: Routes = [{ path: '', component: SummaryComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SummaryModule,
    SummaryDataModule,
  ],
})
export class SummaryViewsModule {}
