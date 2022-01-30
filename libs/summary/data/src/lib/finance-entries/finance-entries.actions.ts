import { SerializedError } from '@finance-fe-nx/core';
import { createAction, props } from '@ngrx/store';
import { FinanceEntryEntity } from './finance-entries.models';

export const load = createAction(
  '[Finance-Entries/API] Load finance entries',
  props<{ year: number }>()
);
export const loadEntriesSuccess = createAction(
  '[Finance-Entries/API] Load finance entries success',
  props<{ entries: FinanceEntryEntity[] }>()
);
export const loadEntriesFailure = createAction(
  '[Finance-Entries/API] Load finance entries failure',
  props<{ error: SerializedError }>()
);
export const resetEntries = createAction('[Finance-Entries] Reset');

export const add = createAction(
  '[Finance-Entries/API] Add',
  props<{ entry: FinanceEntryEntity }>()
);
export const addEntrySuccess = createAction(
  '[Finance-Entries/API] Add finance entry success',
  props<{ entry: FinanceEntryEntity }>()
);
export const addEntryFailure = createAction(
  '[Finance-Entries/API] Add finance entry failure',
  props<{ error: SerializedError }>()
);
export const resetAdd = createAction('[Finance-Entries] Reset add');

export const deleteEntry = createAction(
  '[Finance-Entries/API] Delete',
  props<{ id: string }>()
);
export const deleteEntrySuccess = createAction(
  '[Finance-Entries/API] Delete entry success',
  props<{ id: string }>()
);
export const deleteEntryFailure = createAction(
  '[Finance-Entries/API] Delete entry failure',
  props<{ error: SerializedError }>()
);
export const resetDelete = createAction('[Finannce-Entries] Reset delete');

export const editEntry = createAction(
  '[Finance-Entries/API] Edit',
  props<{ id: string; entry: FinanceEntryEntity }>()
);
export const editEntrySuccess = createAction(
  '[Finance-Entries/API] Edit entry success',
  props<{ entry: FinanceEntryEntity }>()
);
export const editEntryFailure = createAction(
  '[Finance-Entries/API] Edit entry failure',
  props<{ error: SerializedError }>()
);
export const resetEdit = createAction('[Finance-Entries] Reset edit');

export const setSelectedYear = createAction(
  '[Selected year] set selected year',
  props<{ year: number }>()
);

export const setSelectedMonth = createAction(
  '[Selected month] Set selected month',
  props<{ month: number | undefined }>()
);
