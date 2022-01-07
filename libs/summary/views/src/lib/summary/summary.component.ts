import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ContainerComponent } from '@finance-fe-nx/core';
import { DateService } from '@finance-fe-nx/shared';
import { FinanceEntriesFacade } from '@finance-fe-nx/summary/data';

@Component({
  templateUrl: './summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent extends ContainerComponent implements OnInit {
  public year = new Date().getFullYear();
  public availableMonths: number[] = [];
  public availableYears: number[] = [];

  constructor(
    public readonly facade: FinanceEntriesFacade,
    private readonly dateService: DateService
  ) {
    super();
  }

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
    this.availableMonths = this.dateService.getAvailableMonths(this.year);
  }

  private loadFinanceEntries(): void {
    this.useLatest(this.facade.financeEntriesLoaded(this.year), (loaded) => {
      if (!loaded) {
        this.facade.loadFinanceEntries(this.year);
      }
    });
  }
}
