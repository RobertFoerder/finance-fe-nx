import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateService } from './services/date.service';
import { MonthToDatePipe, SumUpService } from '..';
import { ValueInputComponent } from './components/value-input/value-input.component';
import { FormsModule } from '@angular/forms';
import { AppUpdateService } from './services/app-update.service';

@NgModule({
  declarations: [MonthToDatePipe, ValueInputComponent],
  imports: [CommonModule, FormsModule],
  exports: [MonthToDatePipe, ValueInputComponent],
  providers: [DateService, AppUpdateService, SumUpService],
})
export class SharedModule {}
