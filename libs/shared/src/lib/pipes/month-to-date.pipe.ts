import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'monthToDate' })
export class MonthToDatePipe implements PipeTransform {
  transform(value: number): Date {
    const date = new Date();
    date.setMonth(value);
    return date;
  }
}
