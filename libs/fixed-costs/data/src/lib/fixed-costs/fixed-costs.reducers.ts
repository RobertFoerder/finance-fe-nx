import { RequestStatus, SerializedError } from '@finance-fe-nx/core';
import { FixedCostEntity } from './fixed-costs.models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as FixedCostsActions from './fixed-costs.actions';

export const FIXED_COSTS_FEATURE_KEY = 'fixed-costs';

export interface State extends EntityState<FixedCostEntity> {
  readRequestStatus: RequestStatus;
  addRequestStatus: RequestStatus;
  deleteRequestStatus: RequestStatus;
  editRequestStatus: RequestStatus;
  loadError?: SerializedError;
  addError?: SerializedError;
  deleteError?: SerializedError;
  editError?: SerializedError;
}

export interface FixedCostsPartialState {
  readonly [FIXED_COSTS_FEATURE_KEY]: State;
}

export const fixedCostsAdapter: EntityAdapter<FixedCostEntity> =
  createEntityAdapter<FixedCostEntity>();

export const initialState: State = fixedCostsAdapter.getInitialState({
  readRequestStatus: 'initial',
  addRequestStatus: 'initial',
  deleteRequestStatus: 'initial',
  editRequestStatus: 'initial',
  loadError: undefined,
  addError: undefined,
  deleteError: undefined,
  editError: undefined,
});

const fixedCostsReducer = createReducer(
  initialState,
  on(FixedCostsActions.load, (state) => ({
    ...state,
    readRequestStatus: 'pending',
    loadError: undefined,
  })),
  on(FixedCostsActions.loadFixedCostsSuccess, (state, { fixedCosts }) =>
    fixedCostsAdapter.setAll(fixedCosts, {
      ...state,
      readRequestStatus: 'successful',
    })
  ),
  on(FixedCostsActions.loadFixedCostsFailure, (state, { error }) => ({
    ...state,
    loadError: error,
    readRequestStatus: 'failed',
  })),
  on(FixedCostsActions.add, (state) => ({
    ...state,
    addRequestStatus: 'pending',
    addError: undefined,
  })),
  on(FixedCostsActions.addFixedCostSuccess, (state, { fixedCost }) =>
    fixedCostsAdapter.setOne(fixedCost, {
      ...state,
      addRequestStatus: 'successful',
    })
  ),
  on(FixedCostsActions.addFixedCostFailure, (state, { error }) => ({
    ...state,
    addRequestStatus: 'failed',
    addError: error,
  })),
  on(FixedCostsActions.deleteFixedCost, (state) => ({
    ...state,
    deleteRequestStatus: 'pending',
    deleteError: undefined,
  })),
  on(FixedCostsActions.deleteFixedCostSuccess, (state, { id }) =>
    fixedCostsAdapter.removeOne(id, {
      ...state,
      deleteRequestStatus: 'successful',
    })
  ),
  on(FixedCostsActions.deleteFixedCostFailure, (state, { error }) => ({
    ...state,
    deleteRequestStatus: 'failed',
    deleteError: error,
  })),
  on(FixedCostsActions.editFixedCost, (state) => ({
    ...state,
    editRequestStatus: 'pending',
    editError: undefined,
  })),
  on(FixedCostsActions.editFixedCostSuccess, (state, { fixedCost }) =>
    fixedCostsAdapter.upsertOne(fixedCost, {
      ...state,
      editRequestStatus: 'successful',
    })
  ),
  on(FixedCostsActions.editFixedCostFailure, (state, { error }) => ({
    ...state,
    editRequestStatus: 'failed',
    editError: error,
  })),
  on(FixedCostsActions.resetFixedCosts, (state) => ({
    ...state,
    loadError: undefined,
    readRequestStatus: 'initial',
  })),
  on(FixedCostsActions.resetAdd, (state) => ({
    ...state,
    addError: undefined,
    addRequestStatus: 'initial',
  })),
  on(FixedCostsActions.resetDelete, (state) => ({
    ...state,
    deleteError: undefined,
    deleteRequestStatus: 'initial',
  })),
  on(FixedCostsActions.resetEdit, (state) => ({
    ...state,
    editError: undefined,
    editRequestStatus: 'initial',
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return fixedCostsReducer(state, action);
}
