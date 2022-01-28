import { RequestStatus, SerializedError } from '@finance-fe-nx/core';
import { AccountEntity } from './accounts.models';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as AccountsActions from './accounts.actions';

export const ACCOUNTS_FEATURE_KEY = 'accounts';

export interface State extends EntityState<AccountEntity> {
  readRequestStatus: RequestStatus;
  addRequestStatus: RequestStatus;
  deleteRequestStatus: RequestStatus;
  editRequestStatus: RequestStatus;
  loadError?: SerializedError;
  addError?: SerializedError;
  deleteError?: SerializedError;
  editError?: SerializedError;
}

export interface AccountsPartialState {
  readonly [ACCOUNTS_FEATURE_KEY]: State;
}

export const accountsAdapter: EntityAdapter<AccountEntity> =
  createEntityAdapter<AccountEntity>();

export const initialState: State = accountsAdapter.getInitialState({
  readRequestStatus: 'initial',
  addRequestStatus: 'initial',
  deleteRequestStatus: 'initial',
  editRequestStatus: 'initial',
  loadError: undefined,
  addError: undefined,
  deleteError: undefined,
  editError: undefined,
});

const accountsReducer = createReducer(
  initialState,
  on(AccountsActions.load, (state) => ({
    ...state,
    readRequestStatus: 'pending',
    loadError: undefined,
  })),
  on(AccountsActions.loadAccountsSuccess, (state, { accounts }) =>
    accountsAdapter.setAll(accounts, {
      ...state,
      readRequestStatus: 'successful',
    })
  ),
  on(AccountsActions.loadAccountsFailure, (state, { error }) => ({
    ...state,
    loadError: error,
    readRequestStatus: 'failed',
  })),
  on(AccountsActions.add, (state) => ({
    ...state,
    addRequestStatus: 'pending',
    addError: undefined,
  })),
  on(AccountsActions.addAccountSuccess, (state, { account }) =>
    accountsAdapter.setOne(account, {
      ...state,
      addRequestStatus: 'successful',
    })
  ),
  on(AccountsActions.addAccountFailure, (state, { error }) => ({
    ...state,
    addRequestStatus: 'failed',
    addError: error,
  })),
  on(AccountsActions.deleteAccount, (state) => ({
    ...state,
    deleteRequestStatus: 'pending',
    deleteError: undefined,
  })),
  on(AccountsActions.deleteAccountSuccess, (state, { id }) =>
    accountsAdapter.removeOne(id, {
      ...state,
      deleteRequestStatus: 'successful',
    })
  ),
  on(AccountsActions.deleteAccountFailure, (state, { error }) => ({
    ...state,
    deleteRequestStatus: 'failed',
    deleteError: error,
  })),
  on(AccountsActions.editAccount, (state) => ({
    ...state,
    editRequestStatus: 'pending',
    editError: undefined,
  })),
  on(AccountsActions.editAccountSuccess, (state, { account }) =>
    accountsAdapter.upsertOne(account, {
      ...state,
      editRequestStatus: 'successful',
    })
  ),
  on(AccountsActions.editAccountFailure, (state, { error }) => ({
    ...state,
    editRequestStatus: 'failed',
    editError: error,
  })),
  on(AccountsActions.resetAccounts, (state) => ({
    ...state,
    loadError: undefined,
    readRequestStatus: 'initial',
  })),
  on(AccountsActions.resetAdd, (state) => ({
    ...state,
    addError: undefined,
    addRequestStatus: 'initial',
  })),
  on(AccountsActions.resetDelete, (state) => ({
    ...state,
    deleteError: undefined,
    deleteRequestStatus: 'initial',
  })),
  on(AccountsActions.resetEdit, (state) => ({
    ...state,
    editError: undefined,
    editRequestStatus: 'initial',
  }))
);

export function reducer(state: State | undefined, action: Action): State {
  return accountsReducer(state, action);
}
