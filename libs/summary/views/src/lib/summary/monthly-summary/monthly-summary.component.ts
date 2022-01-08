import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerComponent } from '@finance-fe-nx/core';
import { FinanceEntriesFacade } from '@finance-fe-nx/summary/data';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'finance-fe-monthly-summary',
  templateUrl: './monthly-summary.component.html',
  styleUrls: ['./monthly-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthlySummaryComponent
  extends ContainerComponent
  implements OnInit, OnDestroy
{
  private _month = new Date().getMonth();
  private _year = new Date().getFullYear();

  public expanded$: Observable<boolean> = this.facade.selectedMonth$.pipe(
    map((selectedMonth) => selectedMonth === this._month)
  );

  @Input() get month() {
    return this._month;
  }
  set month(value: number) {
    this._month = value;
    this.date.setMonth(value);
  }

  public total = 0;
  public date = new Date();

  constructor(
    public readonly facade: FinanceEntriesFacade,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) {
    super();
  }

  public ngOnInit(): void {
    this.useLatest(this.facade.selectedYear$, (selectedYear) =>
      this.date.setFullYear(selectedYear)
    );
    this.subscribeTo(this.facade.getMonthlyTotal(this._month), (total) => {
      if (total) {
        this.total = total;
      }
    });
  }

  public addEntry(): void {
    this.facade.setSelectedMonth(this._month);
    this.router.navigate(['add'], { relativeTo: this.activatedRoute });
  }

  public toggleExpand(): void {
    this.useLatest(this.expanded$, (expanded) => {
      let selectedMonth = undefined;
      if (!expanded) {
        selectedMonth = this._month;
      }
      this.facade.setSelectedMonth(selectedMonth);
    });
  }
}
