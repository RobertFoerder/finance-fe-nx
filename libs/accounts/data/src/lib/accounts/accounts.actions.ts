import { SerializedError } from '@finance-fe-nx/core';
import { createAction, props } from '@ngrx/store';
import { AccountEntity } from './accounts.models';

export const load = createAction('[Accounts/API] Load accounts');
export const loadAccountsSuccess = createAction(
  '[Accounts/API] Load accounts success',
  props<{ accounts: AccountEntity[] }>()
);
export const loadAccountsFailure = createAction(
  '[Accounts/API] Load accounts failure',
  props<{ error: SerializedError }>()
);
export const resetAccounts = createAction('[Accounts] Reset');

export const add = createAction(
  '[Accounts/API] Add',
  props<{ account: AccountEntity }>()
);
export const addAccountSuccess = createAction(
  '[Account/API] Add account success',
  props<{ account: AccountEntity }>()
);
export const addAccountFailure = createAction(
  '[Accounts/API] Add account failure',
  props<{ error: SerializedError }>()
);
export const resetAdd = createAction('[Accounts] Reset add');

export const deleteAccount = createAction(
  '[Accounts/API] Delete',
  props<{ id: string }>()
);
export const deleteAccountSuccess = createAction(
  '[Accounts/API] Delete account success',
  props<{ id: string }>()
);
export const deleteAccountFailure = createAction(
  '[Accounts/API] Delete account failure',
  props<{ error: SerializedError }>()
);
export const resetDelete = createAction('[Accounts] Reset delete');

export const editAccount = createAction(
  '[Accounts/API] Edit',
  props<{ id: string; account: AccountEntity }>()
);
export const editAccountSuccess = createAction(
  '[Accounts/API] Edit account success',
  props<{ account: AccountEntity }>()
);
export const editAccountFailure = createAction(
  '[Accounts/API] Edit account failure',
  props<{ error: SerializedError }>()
);
export const resetEdit = createAction('[Accounts] Reset edit');
