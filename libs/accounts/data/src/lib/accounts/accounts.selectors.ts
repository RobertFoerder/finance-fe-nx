import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  accountsAdapter,
  ACCOUNTS_FEATURE_KEY,
  State,
} from './accounts.reducers';

export const getAccountsState =
  createFeatureSelector<State>(ACCOUNTS_FEATURE_KEY);

const { selectAll, selectEntities } = accountsAdapter.getSelectors();

export const getAccountsLoading = createSelector(
  getAccountsState,
  (state: State) => state.readRequestStatus === 'pending'
);

export const getAccountsLoaded = createSelector(
  getAccountsState,
  (state: State) => state.readRequestStatus === 'successful'
);

export const getAccountsLoadError = createSelector(
  getAccountsState,
  (state: State) => state.loadError
);

export const getAccounts = createSelector(getAccountsState, (state: State) =>
  selectAll(state)
);

export const getAccountsEntities = createSelector(
  getAccountsState,
  (state: State) => selectEntities(state)
);

export const getAccountsDeleting = createSelector(
  getAccountsState,
  (state: State) => state.deleteRequestStatus === 'pending'
);

export const getAccountsDeleteError = createSelector(
  getAccountsState,
  (state: State) => state.deleteError
);

export const getAccountsAdding = createSelector(
  getAccountsState,
  (state: State) => state.addRequestStatus === 'pending'
);

export const getAccountsAdded = createSelector(
  getAccountsState,
  (state: State) => state.addRequestStatus === 'successful'
);

export const getAccountsAddError = createSelector(
  getAccountsState,
  (state: State) => state.addError
);

export const getAccountsEditing = createSelector(
  getAccountsState,
  (state: State) => state.editRequestStatus === 'pending'
);

export const getAccountsEdited = createSelector(
  getAccountsState,
  (state: State) => state.editRequestStatus === 'successful'
);

export const getAccountsEditError = createSelector(
  getAccountsState,
  (state: State) => state.editError
);
