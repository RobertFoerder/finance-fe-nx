import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  financeEntriesAdapter,
  FINANCE_ENTRIES_FEATURE_KEY,
  State,
} from './finance-entries.reducers';

export const getFinanceEntriesState = createFeatureSelector<State>(
  FINANCE_ENTRIES_FEATURE_KEY
);

const { selectAll, selectEntities } = financeEntriesAdapter.getSelectors();

export const getFinanceEntriesLoading = createSelector(
  getFinanceEntriesState,
  (state: State) => state.readRequestStatus === 'pending'
);

export const getFinanceEntriesLoaded = (year: number) =>
  createSelector(
    getFinanceEntriesState,
    (state: State) =>
      state.readRequestStatus === 'successful' && state.year === year
  );

export const getFinanceEntriesError = createSelector(
  getFinanceEntriesState,
  (state: State) => state.error
);

export const getFinanceEntries = createSelector(
  getFinanceEntriesState,
  (state: State) => selectAll(state)
);

export const getFinanceEntriesEntities = createSelector(
  getFinanceEntriesState,
  (state: State) => selectEntities(state)
);
