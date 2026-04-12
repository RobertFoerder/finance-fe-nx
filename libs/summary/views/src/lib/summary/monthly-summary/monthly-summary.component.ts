import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerComponent } from '@finance-fe-nx/core';
import { FinanceEntriesFacade } from '@finance-fe-nx/summary/data';
import { map, Observable } from 'rxjs';
import {
  ConfirmBoxEvokeService,
  IConfirmBoxPublicResponse,
} from '@costlydeveloper/ngx-awesome-popup';
import { FinanceEntry } from '@finance-fe-nx/finance-api';
import { SumUpService } from '@finance-fe-nx/shared';
import { toSignal } from '@angular/core/rxjs-interop';

interface EntriesPerCategory {
  category: string | undefined;
  entries: FinanceEntry[];
}

@Component({
  selector: 'finance-fe-monthly-summary',
  templateUrl: './monthly-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, DatePipe],
})
export class MonthlySummaryComponent
  extends ContainerComponent
  implements OnInit, OnDestroy
{
  public readonly facade = inject(FinanceEntriesFacade);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly confirmBox = inject(ConfirmBoxEvokeService);
  private readonly sumUp = inject(SumUpService);

  public month = input(new Date().getMonth());

  private selectedYear = toSignal(this.facade.selectedYear$);

  private monthlyEntries$: Observable<FinanceEntry[]> =
    this.facade.collection$.pipe(
      map((entries) => entries.filter((entry) => entry.month === this.month())),
    );

  public expanded$: Observable<boolean> = this.facade.selectedMonth$.pipe(
    map((selectedMonth) => selectedMonth === this.month()),
  );

  public total = 0;
  public date = computed<Date>(() => {
    const date = new Date();
    date.setFullYear(this.selectedYear() as number);
    date.setDate(1);
    date.setMonth(this.month());
    return date;
  });

  public monthlyEntriesGroupedByCategory$: Observable<EntriesPerCategory[]> =
    this.monthlyEntries$.pipe(
      map((entries) => this.groupEntriesByCategory(entries)),
    );

  public monthlyTotal$: Observable<number | undefined> =
    this.monthlyEntries$.pipe(
      map((entries: FinanceEntry[]) => this.sumUp.financeEntries(entries)),
    );

  public ngOnInit(): void {
    this.subscribeTo(this.monthlyTotal$, (total) => {
      if (total) {
        this.total = total;
      }
    });
  }

  public addEntry(category?: string): void {
    this.facade.setSelectedMonth(this.month());
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
        selectedMonth = this.month();
      }
      this.facade.setSelectedMonth(selectedMonth);
    });
  }

  public deleteEntry(
    id: string | undefined,
    description: string | undefined,
  ): void {
    this.confirmBox
      .danger(
        'Delete entry',
        `Should entry "${description}" really be deleted?`,
        'Yes',
        'Cancel',
      )
      .subscribe((resp: IConfirmBoxPublicResponse) => {
        if (resp.success) {
          this.facade.deleteEntry(id);
        }
      });
  }

  public editEntry(id: string | undefined): void {
    this.router.navigate(['edit', id], { relativeTo: this.activatedRoute });
  }

  private groupEntriesByCategory(
    allEntries: FinanceEntry[],
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
          return e1.date.localeCompare(e2.date);
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
