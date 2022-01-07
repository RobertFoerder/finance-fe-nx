import { SerializedError } from '@finance-fe-nx/core';
import { createAction, props } from '@ngrx/store';
import { FinanceEntryEntity } from './finance-entries.models';

export const load = createAction(
  '[Finance-Entries Page] Load',
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

export const reset = createAction('[Finance-Entries] Reset');
