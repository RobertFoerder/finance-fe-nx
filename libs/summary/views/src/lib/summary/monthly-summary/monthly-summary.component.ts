import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ContainerComponent } from '@finance-fe-nx/core';
import { FinanceEntry } from '@finance-fe-nx/finance-api';
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

  @Input() expanded = false;
  @Input() get month() {
    return this._month;
  }
  set month(value: number) {
    this._month = value;
    this.date.setMonth(value);
  }
  @Input() get year(): number {
    return this._year;
  }
  set year(value: number) {
    this._year = value;
    this.date.setFullYear(value);
  }

  public total = 0;
  public date = new Date();

  constructor(public readonly facade: FinanceEntriesFacade) {
    super();
  }

  public ngOnInit(): void {
    this.subscribeTo(this.facade.getMonthlyTotal(this._month), (total) => {
      if (total) {
        this.total = total;
      }
    });
  }
}
