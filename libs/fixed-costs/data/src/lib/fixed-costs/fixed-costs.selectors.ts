import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  fixedCostsAdapter,
  FIXED_COSTS_FEATURE_KEY,
  State,
} from './fixed-costs.reducers';

export const getFixedCostsState = createFeatureSelector<State>(
  FIXED_COSTS_FEATURE_KEY
);

const { selectAll, selectEntities } = fixedCostsAdapter.getSelectors();

export const getFixedCostsLoading = createSelector(
  getFixedCostsState,
  (state: State) => state.readRequestStatus === 'pending'
);

export const getFixedCostsLoaded = createSelector(
  getFixedCostsState,
  (state: State) => state.readRequestStatus === 'successful'
);

export const getFixedCostsLoadError = createSelector(
  getFixedCostsState,
  (state: State) => state.loadError
);

export const getFixedCosts = createSelector(
  getFixedCostsState,
  (state: State) => selectAll(state)
);

export const getFixedCostsEntities = createSelector(
  getFixedCostsState,
  (state: State) => selectEntities(state)
);

export const getFixedCostsDeleting = createSelector(
  getFixedCostsState,
  (state: State) => state.deleteRequestStatus === 'pending'
);

export const getFixedCostsDeleteError = createSelector(
  getFixedCostsState,
  (state: State) => state.deleteError
);

export const getFixedCostsAdding = createSelector(
  getFixedCostsState,
  (state: State) => state.addRequestStatus === 'pending'
);

export const getFixedCostsAdded = createSelector(
  getFixedCostsState,
  (state: State) => state.addRequestStatus === 'successful'
);

export const getFixedCostsAddError = createSelector(
  getFixedCostsState,
  (state: State) => state.addError
);

export const getFixedCostsEditing = createSelector(
  getFixedCostsState,
  (state: State) => state.editRequestStatus === 'pending'
);

export const getFixedCostsEdited = createSelector(
  getFixedCostsState,
  (state: State) => state.editRequestStatus === 'successful'
);

export const getFixedCostsEditError = createSelector(
  getFixedCostsState,
  (state: State) => state.editError
);
