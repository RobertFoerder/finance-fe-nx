import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MonthlySummaryComponent } from './monthly-summary/monthly-summary.component';
import { SummaryComponent } from './summary.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [SummaryComponent, MonthlySummaryComponent],
})
export class SummaryModule {}
