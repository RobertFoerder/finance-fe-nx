import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateService } from './services/date.service';
import { MonthToDatePipe } from '..';

@NgModule({
  declarations: [MonthToDatePipe],
  imports: [CommonModule],
  exports: [MonthToDatePipe],
  providers: [DateService],
})
export class SharedModule {}
