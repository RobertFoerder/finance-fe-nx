import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FinanceEntry } from '@finance-fe-nx/finance-api';
import { SumUpService } from '@finance-fe-nx/shared';
import { FinanceEntriesFacade } from '@finance-fe-nx/summary/data';
import { map, Observable } from 'rxjs';

interface EntryDescription {
  name: string | undefined;
  value: number | undefined;
}

interface EntryCategory {
  name: string | undefined;
  value: number | undefined;
  descriptions: EntryDescription[];
  expanded: boolean;
}

@Component({
  selector: 'finance-fe-category-summary',
  templateUrl: './category-summary.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategorySummaryComponent {
  public entriesGroupedByCategory$: Observable<EntryCategory[]> =
    this.facade.collection$.pipe(
      map((entries) => this.groupEntriesByCategory(entries))
    );

  constructor(
    private readonly facade: FinanceEntriesFacade,
    private sumUp: SumUpService
  ) {}

  private groupEntriesByCategory(entries: FinanceEntry[]): EntryCategory[] {
    const groupedEntries: EntryCategory[] = [];

    const categories: (string | undefined)[] = entries
      .map((entry) => entry.category?.trim())
      .filter(this.distinct);

    for (const category of categories) {
      const entriesPerCategory: FinanceEntry[] = entries.filter(
        (entry) => entry.category?.trim() === category
      );

      groupedEntries.push({
        name: category,
        value: this.sumUp.financeEntries(entriesPerCategory),
        descriptions: this.groupEntriesByDescription(entriesPerCategory),
        expanded: false,
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
    entries: FinanceEntry[]
  ): EntryDescription[] {
    const groupedEntries: EntryDescription[] = [];

    const descriptions: (string | undefined)[] = entries
      .map((entry) => entry.description?.trim())
      .filter(this.distinct);

    for (const description of descriptions) {
      const entriesPerDescription = entries.filter(
        (entry) => entry.description?.trim() === description
      );

      groupedEntries.push({
        name: description,
        value: this.sumUp.financeEntries(entriesPerDescription),
      });
    }

    return groupedEntries.sort((e1, e2) => {
      if (!e1.name || !e2.name) {
        return 0;
      }
      return e1.name.localeCompare(e2.name);
    });
  }

  private distinct(
    value: string | undefined,
    index: number,
    self: (string | undefined)[]
  ) {
    return self.indexOf(value) === index;
  }
}
