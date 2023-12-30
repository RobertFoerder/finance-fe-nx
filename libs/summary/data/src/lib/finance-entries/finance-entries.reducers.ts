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
  editRequestStatus: RequestStatus;
  selectedYear: number;
  selectedMonth: number | undefined;
  loadError?: SerializedError;
  addError?: SerializedError;
  deleteError?: SerializedError;
  editError?: SerializedError;
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
  editRequestStatus: 'initial',
  selectedYear: new Date().getFullYear(),
  selectedMonth: new Date().getMonth(),
  loadError: undefined,
  addError: undefined,
  deleteError: undefined,
  editError: undefined,
});

const financeEntriesReducer = createReducer(
  initialState,
  on(FinanceEntriesActions.setSelectedYear, (state, { year }) => ({
    ...state,
    selectedYear: year,
  })),
  on(FinanceEntriesActions.setSelectedMonth, (state, { month }) => ({
    ...state,
    selectedMonth: month,
  })),
  on(FinanceEntriesActions.load, (state) => ({
    ...state,
    readRequestStatus: 'pending' as const,
    loadError: undefined,
  })),
  on(FinanceEntriesActions.loadEntriesSuccess, (state, { entries }) =>
    financeEntriesAdapter.setAll(entries, {
      ...state,
      readRequestStatus: 'successful' as const,
    })
  ),
  on(FinanceEntriesActions.loadEntriesFailure, (state, { error }) => ({
    ...state,
    loadError: error,
    readRequestStatus: 'failed' as const,
  })),
  on(FinanceEntriesActions.add, (state) => ({
    ...state,
    addRequestStatus: 'pending' as const,
    addError: undefined,
  })),
  on(FinanceEntriesActions.addEntrySuccess, (state, { entry }) =>
    financeEntriesAdapter.setOne(entry, {
      ...state,
      addRequestStatus: 'successful' as const,
    })
  ),
  on(FinanceEntriesActions.addEntryFailure, (state, { error }) => ({
    ...state,
    addRequestStatus: 'failed' as const,
    addError: error,
  })),
  on(FinanceEntriesActions.deleteEntry, (state) => ({
    ...state,
    deleteRequestStatus: 'pending' as const,
    deleteError: undefined,
  })),
  on(FinanceEntriesActions.deleteEntrySuccess, (state, { id }) =>
    financeEntriesAdapter.removeOne(id, {
      ...state,
      deleteRequestStatus: 'successful' as const,
    })
  ),
  on(FinanceEntriesActions.deleteEntryFailure, (state, { error }) => ({
    ...state,
    deleteRequestStatus: 'failed' as const,
    deleteError: error,
  })),
  on(FinanceEntriesActions.editEntry, (state) => ({
    ...state,
    editRequestStatus: 'pending' as const,
    editError: undefined,
  })),
  on(FinanceEntriesActions.editEntrySuccess, (state, { entry }) =>
    financeEntriesAdapter.upsertOne(entry, {
      ...state,
      editRequestStatus: 'successful' as const,
    })
  ),
  on(FinanceEntriesActions.editEntryFailure, (state, { error }) => ({
    ...state,
    editRequestStatus: 'failed' as const,
    editError: error,
  })),
  on(FinanceEntriesActions.resetEntries, (state) => ({
    ...state,
    loadError: undefined,
    readRequestStatus: 'initial' as const,
  })),
  on(FinanceEntriesActions.resetAdd, (state) => ({
    ...state,
    addError: undefined,
    addRequestStatus: 'initial' as const,
  })),
  on(FinanceEntriesActions.resetDelete, (state) => ({
    ...state,
    deleteError: undefined,
    deleteRequestStatus: 'initial' as const,
  })),
  on(FinanceEntriesActions.resetEdit, (state) => ({
    ...state,
    editError: undefined,
    editRequestStatus: 'initial' as const,
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return financeEntriesReducer(state, action);
}
