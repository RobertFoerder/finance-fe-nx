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

export const reset = createAction('[Finance-Entries] Reset');

export const setSelectedYear = createAction(
  '[Selected year] set selected year',
  props<{ year: number }>()
);
