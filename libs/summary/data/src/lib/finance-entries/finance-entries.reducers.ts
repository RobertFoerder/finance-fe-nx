import { RequestStatus, SerializedError } from '@finance-fe-nx/core';
import { FinanceEntryEntity } from './finance-entries.models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as FinanceEntriesActions from './finance-entries.actions';

export const FINANCE_ENTRIES_FEATURE_KEY = 'financeEntries';

export interface State extends EntityState<FinanceEntryEntity> {
  readRequestStatus: RequestStatus;
  year: number;
  error?: SerializedError;
}

export interface FinanceEntriesPartialState {
  readonly [FINANCE_ENTRIES_FEATURE_KEY]: State;
}

export const financeEntriesAdapter: EntityAdapter<FinanceEntryEntity> =
  createEntityAdapter<FinanceEntryEntity>();

export const initialState: State = financeEntriesAdapter.getInitialState({
  readRequestStatus: 'initial',
  year: new Date().getFullYear(),
  error: undefined,
});

const financeEntriesReducer = createReducer(
  initialState,
  on(FinanceEntriesActions.load, (state, { year }) => ({
    ...state,
    year,
    readRequestStatus: 'pending',
    error: undefined,
  })),
  on(FinanceEntriesActions.loadEntriesSuccess, (state, { entries }) =>
    financeEntriesAdapter.setAll(entries, {
      ...state,
      readRequestStatus: 'successful',
    })
  ),
  on(FinanceEntriesActions.loadEntriesFailure, (state, { error }) => ({
    ...state,
    error,
    readRequestStatus: 'failed',
  })),
  on(FinanceEntriesActions.reset, () => initialState)
);

export function reducer(state: State | undefined, action: Action): State {
  return financeEntriesReducer(state, action);
}
