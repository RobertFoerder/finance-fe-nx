import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FinanceEntriesFacade } from '@finance-fe-nx/summary/data';

@Component({
  selector: 'finance-fe-summary',
  templateUrl: './summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent implements OnInit {
  public year = new Date().getFullYear();
  public availableMonths: number[] = [];
  public availableYears: number[] = [];

  constructor(public readonly facade: FinanceEntriesFacade) {}

  public ngOnInit(): void {
    this.loadAvailableYears();
    this.loadAvailableMonths();
    this.loadFinanceEntries();
  }

  public selectedYearChanged(year: number): void {
    this.year = year;
    this.loadAvailableMonths();
    this.loadFinanceEntries();
  }

  private loadAvailableYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 100; year--) {
      this.availableYears.push(year);
    }
  }

  private loadAvailableMonths(): void {
    this.availableMonths = [];

    const currentDate = new Date();
    let maxMonth = 11;

    if (this.year === currentDate.getFullYear()) {
      maxMonth = currentDate.getMonth();
    }

    for (let month = maxMonth; month >= 0; month--) {
      this.availableMonths.push(month);
    }
  }

  private loadFinanceEntries(): void {
    this.facade.loadFinanceEntries(this.year);
  }
}
