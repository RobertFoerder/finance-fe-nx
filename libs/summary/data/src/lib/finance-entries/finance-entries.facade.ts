import { Injectable } from '@angular/core';
import { FinanceEntry } from '@finance-fe-nx/finance-api';
import { select, Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import * as FinanceEntriesActions from './finance-entries.actions';
import { EntriesPerCategory } from './finance-entries.models';
import * as FinanceEntriesSelectors from './finance-entries.selectors';

@Injectable()
export class FinanceEntriesFacade {
  public readonly loading$ = this.store.pipe(
    select(FinanceEntriesSelectors.getFinanceEntriesLoading)
  );
  public readonly loaded$ = this.store.pipe(
    select(FinanceEntriesSelectors.getFinanceEntriesLoaded)
  );
  public readonly collection$ = this.store.pipe(
    select(FinanceEntriesSelectors.getFinanceEntries)
  );
  public readonly entities$ = this.store.pipe(
    select(FinanceEntriesSelectors.getFinanceEntriesEntities)
  );
  public readonly error$ = this.store.pipe(
    select(FinanceEntriesSelectors.getFinanceEntriesError)
  );
  public readonly selectedYear$ = this.store.pipe(
    select(FinanceEntriesSelectors.getSelectedYear)
  );

  constructor(private readonly store: Store) {}

  public init(): void {
    this.loaded$.pipe(take(1)).subscribe((loaded) => {
      if (!loaded) {
        this.selectedYear$
          .pipe(take(1))
          .subscribe((selectedYear) =>
            this.store.dispatch(
              FinanceEntriesActions.load({ year: selectedYear })
            )
          );
      }
    });
  }

  public setSelectedYear(year: number): void {
    this.store.dispatch(FinanceEntriesActions.setSelectedYear({ year }));
  }

  public getMonthlyTotal(month: number): Observable<number | undefined> {
    return this.getMonthlyEntries(month).pipe(
      map((entries: FinanceEntry[]) => {
        if (!entries || entries.length === 0) {
          return 0;
        }

        return entries
          .map((entry) => entry.value)
          .reduce((a, b) => {
            if (!a || !b) {
              return 0;
            }

            return a + b;
          });
      })
    );
  }

  public getMonthlyEntriesGroupedByCategory(
    month: number
  ): Observable<EntriesPerCategory[]> {
    return this.getMonthlyEntries(month).pipe(
      map((entries) => this.groupEntriesByCategory(entries))
    );
  }

  public addEntry(entry: FinanceEntry): void {
    this.store.dispatch(FinanceEntriesActions.add({ entry }));
  }

  public deleteEntry(id: string | undefined): void {
    if (id) {
      this.store.dispatch(FinanceEntriesActions.deleteEntry({ id }));
    }
  }

  private getMonthlyEntries(month: number): Observable<FinanceEntry[]> {
    return this.collection$.pipe(
      map((entries) => entries.filter((entry) => entry.month === month))
    );
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
