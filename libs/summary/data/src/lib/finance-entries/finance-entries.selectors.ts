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

export const getFinanceEntriesLoaded = createSelector(
  getFinanceEntriesState,
  (state: State) => state.readRequestStatus === 'successful'
);

export const getFinanceEntriesLoadError = createSelector(
  getFinanceEntriesState,
  (state: State) => state.loadError
);

export const getFinanceEntries = createSelector(
  getFinanceEntriesState,
  (state: State) => selectAll(state)
);

export const getFinanceEntriesEntities = createSelector(
  getFinanceEntriesState,
  (state: State) => selectEntities(state)
);

export const getFinanceEntriesDeleting = createSelector(
  getFinanceEntriesState,
  (state: State) => state.deleteRequestStatus === 'pending'
);

export const getFinanceEntriesDeleteError = createSelector(
  getFinanceEntriesState,
  (state: State) => state.deleteError
);

export const getFinanceEntriesAdding = createSelector(
  getFinanceEntriesState,
  (state: State) => state.addRequestStatus === 'pending'
);

export const getFinanceEntriesAdded = createSelector(
  getFinanceEntriesState,
  (state: State) => state.addRequestStatus === 'successful'
);

export const getFinanceEntriesAddError = createSelector(
  getFinanceEntriesState,
  (state: State) => state.addError
);

export const getFinanceEntriesEditing = createSelector(
  getFinanceEntriesState,
  (state: State) => state.editRequestStatus === 'pending'
);

export const getFinanceEntriesEdited = createSelector(
  getFinanceEntriesState,
  (state: State) => state.editRequestStatus === 'successful'
);

export const getFinanceEntriesEditError = createSelector(
  getFinanceEntriesState,
  (state: State) => state.editError
);

export const getSelectedYear = createSelector(
  getFinanceEntriesState,
  (state: State) => state.selectedYear
);

export const getSelectedMonth = createSelector(
  getFinanceEntriesState,
  (state: State) => state.selectedMonth
);
