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
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { FinanceEntry } from '@finance-fe-nx/finance-api';
import { SumUpService } from '@finance-fe-nx/shared';

interface EntriesPerCategory {
  category: string | undefined;
  entries: FinanceEntry[];
}

@Component({
  selector: 'finance-fe-monthly-summary',
  templateUrl: './monthly-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthlySummaryComponent
  extends ContainerComponent
  implements OnInit, OnDestroy
{
  private _month = new Date().getMonth();
  private _year = new Date().getFullYear();

  private monthlyEntries$: Observable<FinanceEntry[]> =
    this.facade.collection$.pipe(
      map((entries) => entries.filter((entry) => entry.month === this.month))
    );

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

  public monthlyEntriesGroupedByCategory$: Observable<EntriesPerCategory[]> =
    this.monthlyEntries$.pipe(
      map((entries) => this.groupEntriesByCategory(entries))
    );

  public monthlyTotal$: Observable<number | undefined> =
    this.monthlyEntries$.pipe(
      map((entries: FinanceEntry[]) => this.sumUp.financeEntries(entries))
    );

  constructor(
    public readonly facade: FinanceEntriesFacade,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly confirmBox: ConfirmBoxEvokeService,
    private readonly sumUp: SumUpService
  ) {
    super();
  }

  public ngOnInit(): void {
    this.useLatest(this.facade.selectedYear$, (selectedYear) =>
      this.date.setFullYear(selectedYear)
    );
    this.subscribeTo(this.monthlyTotal$, (total) => {
      if (total) {
        this.total = total;
      }
    });
  }

  public addEntry(category?: string): void {
    this.facade.setSelectedMonth(this._month);
    let queryParams = null;
    if (category) {
      queryParams = { category };
    }
    this.router.navigate(['add'], {
      relativeTo: this.activatedRoute,
      queryParams,
    });
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

  public deleteEntry(id: string | undefined): void {
    this.confirmBox
      .danger('Delete entry', 'Are you sure?', 'Yes', 'Cancel')
      .subscribe((resp) => {
        if (resp) {
          this.facade.deleteEntry(id);
        }
      });
  }

  public editEntry(id: string | undefined): void {
    this.router.navigate(['edit', id], { relativeTo: this.activatedRoute });
  }

  private groupEntriesByCategory(
    allEntries: FinanceEntry[]
  ): EntriesPerCategory[] {
    const groupedEntries: EntriesPerCategory[] = [];

    if (!allEntries) {
      return groupedEntries;
    }

    for (const entry of allEntries) {
      if (groupedEntries.some((e) => e.category === entry.category)) {
        continue;
      }

      const entriesPerCategory: FinanceEntry[] = allEntries
        .filter((e) => e.category === entry.category)
        .sort((e1, e2) => {
          if (!e1.date || !e2.date) {
            return 0;
          }
          return e1.date.toString().localeCompare(e2.date.toString());
        });

      groupedEntries.push({
        category: entry.category,
        entries: entriesPerCategory,
      });
    }

    return groupedEntries.sort((e1, e2) => {
      if (!e1.category || !e2.category) {
        return 0;
      }
      return e1.category.localeCompare(e2.category);
    });
  }
}
