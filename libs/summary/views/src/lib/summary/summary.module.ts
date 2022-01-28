import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@finance-fe-nx/shared';
import { CategorySummaryComponent } from './category-summary/category-summary.component';
import { MonthlySummaryComponent } from './monthly-summary/monthly-summary.component';
import { SummaryComponent } from './summary.component';

@NgModule({
  imports: [CommonModule, FormsModule, SharedModule],
  declarations: [
    SummaryComponent,
    MonthlySummaryComponent,
    CategorySummaryComponent,
  ],
})
export class SummaryModule {}
