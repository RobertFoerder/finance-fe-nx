import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
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
  public readonly error$ = this.store.pipe(
    select(FinanceEntriesSelectors.getFinanceEntriesError)
  );

  constructor(private readonly store: Store) {}

  public loadFinanceEntries(year: number) {
    this.store.dispatch(FinanceEntriesActions.load({ year }));
  }
}
