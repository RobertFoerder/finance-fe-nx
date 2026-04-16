import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { FinanceEntry } from '@finance-fe-nx/finance-api';
import { DateService, MonthToDatePipe, SumUpService } from '@finance-fe-nx/shared';
import { FinanceEntriesStore } from '@finance-fe-nx/summary/data';

interface EntryMonth {
  month: number;
  sum: number | undefined;
}

interface EntryDescription {
  name: string | undefined;
  value: number | undefined;
  monthlyAverage: number;
  expanded: boolean;
  months: EntryMonth[];
}

interface EntryCategory {
  name: string | undefined;
  value: number | undefined;
  descriptions: EntryDescription[];
  expanded: boolean;
  monthlyAverage: number;
}

@Component({
  selector: 'finance-fe-category-summary',
  templateUrl: './category-summary.component.html',
  styleUrls: ['./category-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CurrencyPipe, DatePipe, MonthToDatePipe],
})
export class CategorySummaryComponent {
  private readonly store = inject(FinanceEntriesStore);
  private readonly sumUp = inject(SumUpService);
  private readonly dateService = inject(DateService);

  private readonly availableMonthsCount = computed(
    () => this.dateService.getAvailableMonths(this.store.selectedYear()).length,
  );

  readonly entriesGroupedByCategory = computed(() =>
    this.groupEntriesByCategory(this.store.entities()),
  );

  private groupEntriesByCategory(entries: FinanceEntry[]): EntryCategory[] {
    const groupedEntries: EntryCategory[] = [];

    const categories: (string | undefined)[] = entries
      .map((entry) => entry.category?.trim())
      .filter(this.distinct);

    for (const category of categories) {
      const entriesPerCategory: FinanceEntry[] = entries.filter(
        (entry) => entry.category?.trim() === category,
      );

      const sum = this.sumUp.financeEntries(entriesPerCategory);

      groupedEntries.push({
        name: category,
        value: sum,
        descriptions: this.groupEntriesByDescription(entriesPerCategory),
        expanded: false,
        monthlyAverage: this.getMonthlyAverage(sum),
      });
    }

    return groupedEntries.sort((e1, e2) => {
      if (!e1.name || !e2.name) {
        return 0;
      }
      return e1.name.localeCompare(e2.name);
    });
  }

  private groupEntriesByDescription(
    entries: FinanceEntry[],
  ): EntryDescription[] {
    const groupedEntries: EntryDescription[] = [];

    const descriptions: (string | undefined)[] = entries
      .map((entry) => entry.description?.trim())
      .filter(this.distinct);

    for (const description of descriptions) {
      const entriesPerDescription = entries.filter(
        (entry) => entry.description?.trim() === description,
      );

      const sum = this.sumUp.financeEntries(entriesPerDescription);

      groupedEntries.push({
        name: description,
        value: sum,
        monthlyAverage: this.getMonthlyAverage(sum),
        expanded: false,
        months: this.groupEntriesByMonth(entriesPerDescription),
      });
    }

    return groupedEntries.sort((e1, e2) => {
      if (!e1.name || !e2.name) {
        return 0;
      }
      return e1.name.localeCompare(e2.name);
    });
  }

  private groupEntriesByMonth(entries: FinanceEntry[]): EntryMonth[] {
    const groupedEntries: EntryMonth[] = [];

    for (let month = 0; month < 12; month++) {
      const entriesPerMonth = entries.filter((entry) => entry.month === month);

      if (entriesPerMonth.length > 0) {
        groupedEntries.push({
          month,
          sum: this.sumUp.financeEntries(entriesPerMonth),
        });
      }
    }

    return groupedEntries;
  }

  private getMonthlyAverage(sum: number | undefined): number {
    if (!sum) {
      return 0;
    }

    return sum / this.availableMonthsCount();
  }

  private distinct(
    value: string | undefined,
    index: number,
    self: (string | undefined)[],
  ) {
    return self.indexOf(value) === index;
  }
}
