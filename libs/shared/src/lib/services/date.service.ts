import { Injectable } from '@angular/core';

@Injectable()
export class DateService {
  public getAvailableMonths(year: number | undefined): number[] {
    const availableMonths = [];

    const currentDate = new Date();
    let maxMonth = 11;

    if (!year || year === currentDate.getFullYear()) {
      maxMonth = currentDate.getMonth();
    }

    for (let month = maxMonth; month >= 0; month--) {
      availableMonths.push(month);
    }

    return availableMonths;
  }
}
