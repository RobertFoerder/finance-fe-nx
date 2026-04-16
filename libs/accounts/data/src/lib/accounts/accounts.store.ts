import { computed, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  addEntity,
  removeEntity,
  setAllEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import {
  RequestStatus,
  SerializedError,
  serializeErrorResponse,
} from '@finance-fe-nx/core';
import { Account, AccountsService } from '@finance-fe-nx/finance-api';
import { SumUpService } from '@finance-fe-nx/shared';
import { AccountEntity } from './accounts.models';

type AccountsState = {
  readRequestStatus: RequestStatus;
  addRequestStatus: RequestStatus;
  deleteRequestStatus: RequestStatus;
  editRequestStatus: RequestStatus;
  _loadError: SerializedError | undefined;
  _addError: SerializedError | undefined;
  _deleteError: SerializedError | undefined;
  _editError: SerializedError | undefined;
};

const initialState: AccountsState = {
  readRequestStatus: 'initial',
  addRequestStatus: 'initial',
  deleteRequestStatus: 'initial',
  editRequestStatus: 'initial',
  _loadError: undefined,
  _addError: undefined,
  _deleteError: undefined,
  _editError: undefined,
};

export const AccountsStore = signalStore(
  withState(initialState),
  withEntities<AccountEntity>(),
  withComputed((store) => {
    const sumUp = inject(SumUpService);
    return {
      loading: computed(() => store.readRequestStatus() === 'pending'),
      loaded: computed(() => store.readRequestStatus() === 'successful'),
      loadError: computed(() => store._loadError()),
      adding: computed(() => store.addRequestStatus() === 'pending'),
      added: computed(() => store.addRequestStatus() === 'successful'),
      addError: computed(() => store._addError()),
      deleting: computed(() => store.deleteRequestStatus() === 'pending'),
      deleteError: computed(() => store._deleteError()),
      editing: computed(() => store.editRequestStatus() === 'pending'),
      edited: computed(() => store.editRequestStatus() === 'successful'),
      editError: computed(() => store._editError()),
      total: computed(() => sumUp.accounts(store.entities())),
    };
  }),
  withMethods((store) => {
    const service = inject(AccountsService);

    return {
      load: rxMethod<void>(
        pipe(
          tap(() =>
            patchState(store, {
              readRequestStatus: 'pending',
              _loadError: undefined,
            }),
          ),
          switchMap(() =>
            service.getAccounts().pipe(
              tapResponse({
                next: (accounts) =>
                  patchState(
                    store,
                    setAllEntities(accounts as AccountEntity[]),
                    { readRequestStatus: 'successful' },
                  ),
                error: (error: HttpErrorResponse) =>
                  patchState(store, {
                    _loadError: serializeErrorResponse(error),
                    readRequestStatus: 'failed',
                  }),
              }),
            ),
          ),
        ),
      ),
      addAccount: rxMethod<Account>(
        pipe(
          tap(() =>
            patchState(store, {
              addRequestStatus: 'pending',
              _addError: undefined,
            }),
          ),
          switchMap((account) =>
            service.postAccount(account).pipe(
              tapResponse({
                next: (result) =>
                  patchState(store, addEntity(result as AccountEntity), {
                    addRequestStatus: 'successful',
                  }),
                error: (error: HttpErrorResponse) =>
                  patchState(store, {
                    _addError: serializeErrorResponse(error),
                    addRequestStatus: 'failed',
                  }),
              }),
            ),
          ),
        ),
      ),
      deleteAccount: rxMethod<string>(
        pipe(
          tap(() =>
            patchState(store, {
              deleteRequestStatus: 'pending',
              _deleteError: undefined,
            }),
          ),
          switchMap((id) =>
            service.deleteAccount(id).pipe(
              tapResponse({
                next: () =>
                  patchState(store, removeEntity(id), {
                    deleteRequestStatus: 'successful',
                  }),
                error: (error: HttpErrorResponse) =>
                  patchState(store, {
                    _deleteError: serializeErrorResponse(error),
                    deleteRequestStatus: 'failed',
                  }),
              }),
            ),
          ),
        ),
      ),
      editAccount: rxMethod<{ id: string; account: Account }>(
        pipe(
          tap(() =>
            patchState(store, {
              editRequestStatus: 'pending',
              _editError: undefined,
            }),
          ),
          switchMap(({ id, account }) =>
            service.putAccount(id, account).pipe(
              tapResponse({
                next: (result) =>
                  patchState(
                    store,
                    updateEntity({
                      id,
                      changes: result as AccountEntity,
                    }),
                    { editRequestStatus: 'successful' },
                  ),
                error: (error: HttpErrorResponse) =>
                  patchState(store, {
                    _editError: serializeErrorResponse(error),
                    editRequestStatus: 'failed',
                  }),
              }),
            ),
          ),
        ),
      ),
      resetAccounts() {
        patchState(store, {
          readRequestStatus: 'initial',
          _loadError: undefined,
        });
      },
      resetAdd() {
        patchState(store, {
          addRequestStatus: 'initial',
          _addError: undefined,
        });
      },
      resetDelete() {
        patchState(store, {
          deleteRequestStatus: 'initial',
          _deleteError: undefined,
        });
      },
      resetEdit() {
        patchState(store, {
          editRequestStatus: 'initial',
          _editError: undefined,
        });
      },
    };
  }),
  withMethods((store) => ({
    init() {
      if (!store.loaded()) {
        store.load();
      }
    },
  })),
);
