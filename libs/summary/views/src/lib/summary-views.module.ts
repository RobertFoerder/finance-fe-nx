import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { SummaryModule } from './summary/summary.module';

export const ROUTES: Routes = [{ path: '', component: SummaryComponent }];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES), SummaryModule],
})
export class SummaryViewsModule {}
