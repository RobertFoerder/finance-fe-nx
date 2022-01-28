import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateService } from './services/date.service';
import { MonthToDatePipe } from '..';
import { ValueInputComponent } from './components/value-input/value-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [MonthToDatePipe, ValueInputComponent],
  imports: [CommonModule, FormsModule],
  exports: [MonthToDatePipe, ValueInputComponent],
  providers: [DateService],
})
export class SharedModule {}
