import { Injectable } from '@angular/core';
import { FinanceEntry } from '@finance-fe-nx/finance-api';
import { SumUpService } from '@finance-fe-nx/shared';
import { select, Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import * as FinanceEntriesActions from './finance-entries.actions';
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
  public readonly editing$ = this.store.pipe(
    select(FinanceEntriesSelectors.getFinanceEntriesEditing)
  );
  public readonly edited$ = this.store.pipe(
    select(FinanceEntriesSelectors.getFinanceEntriesEdited)
  );
  public readonly editError$ = this.store.pipe(
    select(FinanceEntriesSelectors.getFinanceEntriesEditError)
  );
  public readonly selectedYear$ = this.store.pipe(
    select(FinanceEntriesSelectors.getSelectedYear)
  );
  public readonly selectedMonth$ = this.store.pipe(
    select(FinanceEntriesSelectors.getSelectedMonth)
  );
  public readonly total$ = this.collection$.pipe(
    map((entries) => this.sumUp.financeEntries(entries))
  );

  constructor(
    private readonly store: Store,
    private readonly sumUp: SumUpService
  ) {}

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

  public resetEdit(): void {
    this.store.dispatch(FinanceEntriesActions.resetEdit());
  }

  public setSelectedYear(year: number): void {
    this.store.dispatch(FinanceEntriesActions.setSelectedYear({ year }));
  }

  public setSelectedMonth(month: number | undefined): void {
    this.store.dispatch(FinanceEntriesActions.setSelectedMonth({ month }));
  }

  public addEntry(entry: FinanceEntry): void {
    this.store.dispatch(FinanceEntriesActions.add({ entry }));
  }

  public deleteEntry(id: string | undefined): void {
    if (id) {
      this.store.dispatch(FinanceEntriesActions.deleteEntry({ id }));
    }
  }

  public editEntry(entry: FinanceEntry): void {
    if (entry.id) {
      this.store.dispatch(
        FinanceEntriesActions.editEntry({ id: entry.id, entry })
      );
    }
  }
}
