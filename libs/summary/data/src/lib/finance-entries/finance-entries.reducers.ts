import { RequestStatus, SerializedError } from '@finance-fe-nx/core';
import { FinanceEntryEntity } from './finance-entries.models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as FinanceEntriesActions from './finance-entries.actions';

export const FINANCE_ENTRIES_FEATURE_KEY = 'financeEntries';

export interface State extends EntityState<FinanceEntryEntity> {
  readRequestStatus: RequestStatus;
  addRequestStatus: RequestStatus;
  deleteRequestStatus: RequestStatus;
  selectedYear: number;
  selectedMonth: number;
  error?: SerializedError;
}

export interface FinanceEntriesPartialState {
  readonly [FINANCE_ENTRIES_FEATURE_KEY]: State;
}

export const financeEntriesAdapter: EntityAdapter<FinanceEntryEntity> =
  createEntityAdapter<FinanceEntryEntity>();

export const initialState: State = financeEntriesAdapter.getInitialState({
  readRequestStatus: 'initial',
  addRequestStatus: 'initial',
  deleteRequestStatus: 'initial',
  selectedYear: new Date().getFullYear(),
  selectedMonth: new Date().getMonth(),
  error: undefined,
});

const financeEntriesReducer = createReducer(
  initialState,
  on(FinanceEntriesActions.load, (state, { year }) => ({
    ...state,
    selectedYear: year,
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
  on(FinanceEntriesActions.add, (state) => ({
    ...state,
    addRequestStatus: 'pending',
    error: undefined,
  })),
  on(FinanceEntriesActions.addEntrySuccess, (state, { entry }) =>
    financeEntriesAdapter.setOne(entry, {
      ...state,
      addRequestStatus: 'successful',
    })
  ),
  on(FinanceEntriesActions.addEntryFailure, (state, { error }) => ({
    ...state,
    addRequestStatus: 'failed',
    error,
  })),
  on(FinanceEntriesActions.deleteEntry, (state) => ({
    ...state,
    deleteRequestStatus: 'pending',
    error: undefined,
  })),
  on(FinanceEntriesActions.deleteEntrySuccess, (state, { id }) =>
    financeEntriesAdapter.removeOne(id, {
      ...state,
      deleteRequestStatus: 'successful',
    })
  ),
  on(FinanceEntriesActions.deleteEntryFailure, (state, { error }) => ({
    ...state,
    deleteRequestStatus: 'failed',
    error,
  })),
  on(FinanceEntriesActions.reset, () => initialState)
);

export function reducer(state: State | undefined, action: Action): State {
  return financeEntriesReducer(state, action);
}
