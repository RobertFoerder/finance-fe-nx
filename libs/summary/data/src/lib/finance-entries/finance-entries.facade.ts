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
  public readonly loadError$ = this.store.pipe(
    select(FinanceEntriesSelectors.getFinanceEntriesLoadError)
  );
  public readonly deleting$ = this.store.pipe(
    select(FinanceEntriesSelectors.getFinanceEntriesDeleting)
  );
  public readonly deleteError$ = this.store.pipe(
    select(FinanceEntriesSelectors.getFinanceEntriesDeleteError)
  );
  public readonly adding$ = this.store.pipe(
    select(FinanceEntriesSelectors.getFinanceEntriesAdding)
  );
  public readonly added$ = this.store.pipe(
    select(FinanceEntriesSelectors.getFinanceEntriesAdded)
  );
  public readonly addError$ = this.store.pipe(
    select(FinanceEntriesSelectors.getFinanceEntriesAddError)
  );
  public readonly selectedYear$ = this.store.pipe(
    select(FinanceEntriesSelectors.getSelectedYear)
  );
  public readonly selectedMonth$ = this.store.pipe(
    select(FinanceEntriesSelectors.getSelectedMonth)
  );
  public readonly total$ = this.collection$.pipe(
    map((entries) => this.sumUp(entries))
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

  public resetEntries(): void {
    this.store.dispatch(FinanceEntriesActions.resetEntries());
  }

  public resetAdd(): void {
    this.store.dispatch(FinanceEntriesActions.resetAdd());
  }

  public resetDelete(): void {
    this.store.dispatch(FinanceEntriesActions.resetDelete());
  }

  public setSelectedYear(year: number): void {
    this.store.dispatch(FinanceEntriesActions.setSelectedYear({ year }));
  }

  public setSelectedMonth(month: number | undefined): void {
    this.store.dispatch(FinanceEntriesActions.setSelectedMonth({ month }));
  }

  public getMonthlyTotal(month: number): Observable<number | undefined> {
    return this.getMonthlyEntries(month).pipe(
      map((entries: FinanceEntry[]) => this.sumUp(entries))
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

  private sumUp(entries: FinanceEntry[]): number | undefined {
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
  }
}
