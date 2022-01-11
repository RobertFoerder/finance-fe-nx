import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ContainerComponent } from '@finance-fe-nx/core';
import { DateService } from '@finance-fe-nx/shared';
import { FinanceEntriesFacade } from '@finance-fe-nx/summary/data';
import { map, Observable } from 'rxjs';

@Component({
  templateUrl: './summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryComponent extends ContainerComponent implements OnInit {
  public year = new Date().getFullYear();
  public availableYears: number[] = [];
  public availableMonths$: Observable<number[]> =
    this.facade.selectedYear$.pipe(
      map((selectedYear) => this.dateService.getAvailableMonths(selectedYear))
    );
  public total = 0;

  constructor(
    public readonly facade: FinanceEntriesFacade,
    private readonly dateService: DateService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.loadAvailableYears();

    this.subscribeTo(this.facade.total$, (total) => {
      if (total) {
        this.total = total;
      }
    });

    this.useLatest(
      this.facade.selectedYear$,
      (selectedYear) => (this.year = selectedYear)
    );

    this.facade.init();
  }

  public selectedYearChanged(year: number): void {
    this.facade.setSelectedYear(year);
    this.year = year;
  }

  private loadAvailableYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 100; year--) {
      this.availableYears.push(year);
    }
  }
}
