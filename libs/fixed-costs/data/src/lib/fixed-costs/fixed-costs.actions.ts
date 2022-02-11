import { SerializedError } from '@finance-fe-nx/core';
import { createAction, props } from '@ngrx/store';
import { FixedCostEntity } from './fixed-costs.models';

export const load = createAction('[Fixed-Costs/API] Load fixed costs');
export const loadFixedCostsSuccess = createAction(
  '[Fixed-Costs/API] Load fixed costs success',
  props<{ fixedCosts: FixedCostEntity[] }>()
);
export const loadFixedCostsFailure = createAction(
  '[Fixed-Costs/API] Load fixed costs failure',
  props<{ error: SerializedError }>()
);
export const resetFixedCosts = createAction('[Fixed-Costs] Reset');

export const add = createAction(
  '[Fixed-Costs/API] Add',
  props<{ fixedCost: FixedCostEntity }>()
);
export const addFixedCostSuccess = createAction(
  '[Fixed-Costs/API] Add fixed cost success',
  props<{ fixedCost: FixedCostEntity }>()
);
export const addFixedCostFailure = createAction(
  '[Fixed-Costs/API] Add fixed cost failure',
  props<{ error: SerializedError }>()
);
export const resetAdd = createAction('[Fixed-Costs] Reset add');

export const deleteFixedCost = createAction(
  '[Fixed-Costs/API] Delete',
  props<{ id: string }>()
);
export const deleteFixedCostSuccess = createAction(
  '[Fixed-Costs/API] Delete fixed cost success',
  props<{ id: string }>()
);
export const deleteFixedCostFailure = createAction(
  '[Fixed-Costs/API] Delete fixed cost failure',
  props<{ error: SerializedError }>()
);
export const resetDelete = createAction('[Fixed-Costs] Reset delete');

export const editFixedCost = createAction(
  '[Fixed-Costs/API] Edit',
  props<{ id: string; fixedCost: FixedCostEntity }>()
);
export const editFixedCostSuccess = createAction(
  '[Fixed-Costs/API] Edit fixed cost success',
  props<{ fixedCost: FixedCostEntity }>()
);
export const editFixedCostFailure = createAction(
  '[Fixed-Costs/API] Edit fixed cost failure',
  props<{ error: SerializedError }>()
);
export const resetEdit = createAction('[Fixed-Costs] Reset edit');
