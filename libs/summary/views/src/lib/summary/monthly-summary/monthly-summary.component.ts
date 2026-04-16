import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinanceEntriesStore } from '@finance-fe-nx/summary/data';
import {
  ConfirmBoxEvokeService,
  IConfirmBoxPublicResponse,
} from '@costlydeveloper/ngx-awesome-popup';
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
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
})
export class MonthlySummaryComponent {
  readonly store = inject(FinanceEntriesStore);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly confirmBox = inject(ConfirmBoxEvokeService);
  private readonly sumUp = inject(SumUpService);

  public month = input(new Date().getMonth());

  readonly expanded = computed(
    () => this.store.selectedMonth() === this.month(),
  );

  readonly date = computed<Date>(() => {
    const date = new Date();
    date.setFullYear(this.store.selectedYear());
    date.setDate(1);
    date.setMonth(this.month());
    return date;
  });

  private readonly monthlyEntries = computed(() =>
    this.store.entities().filter((entry) => entry.month === this.month()),
  );

  readonly monthlyEntriesGroupedByCategory = computed(() =>
    this.groupEntriesByCategory(this.monthlyEntries()),
  );

  readonly monthlyTotal = computed(() =>
    this.sumUp.financeEntries(this.monthlyEntries()),
  );

  public addEntry(category?: string): void {
    this.store.setSelectedMonth(this.month());
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
    const expanded = this.expanded();
    this.store.setSelectedMonth(expanded ? undefined : this.month());
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
        if (resp.success && id) {
          this.store.deleteEntry(id);
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
