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
import { FixedCost, FixedCostsService } from '@finance-fe-nx/finance-api';
import { FixedCostEntity } from './fixed-costs.models';

type FixedCostsState = {
  readRequestStatus: RequestStatus;
  addRequestStatus: RequestStatus;
  deleteRequestStatus: RequestStatus;
  editRequestStatus: RequestStatus;
  _loadError: SerializedError | undefined;
  _addError: SerializedError | undefined;
  _deleteError: SerializedError | undefined;
  _editError: SerializedError | undefined;
};

const initialState: FixedCostsState = {
  readRequestStatus: 'initial',
  addRequestStatus: 'initial',
  deleteRequestStatus: 'initial',
  editRequestStatus: 'initial',
  _loadError: undefined,
  _addError: undefined,
  _deleteError: undefined,
  _editError: undefined,
};

export const FixedCostsStore = signalStore(
  withState(initialState),
  withEntities<FixedCostEntity>(),
  withComputed((store) => ({
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
  })),
  withMethods((store) => {
    const service = inject(FixedCostsService);

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
            service.getFixedCost().pipe(
              tapResponse({
                next: (fixedCosts) =>
                  patchState(
                    store,
                    setAllEntities(fixedCosts as FixedCostEntity[]),
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
      addFixedCost: rxMethod<FixedCost>(
        pipe(
          tap(() =>
            patchState(store, {
              addRequestStatus: 'pending',
              _addError: undefined,
            }),
          ),
          switchMap((fixedCost) =>
            service.postFixedCost(fixedCost).pipe(
              tapResponse({
                next: (result) =>
                  patchState(store, addEntity(result as FixedCostEntity), {
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
      deleteFixedCost: rxMethod<string>(
        pipe(
          tap(() =>
            patchState(store, {
              deleteRequestStatus: 'pending',
              _deleteError: undefined,
            }),
          ),
          switchMap((id) =>
            service.deleteFixedCost(id).pipe(
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
      editFixedCost: rxMethod<{ id: string; fixedCost: FixedCost }>(
        pipe(
          tap(() =>
            patchState(store, {
              editRequestStatus: 'pending',
              _editError: undefined,
            }),
          ),
          switchMap(({ id, fixedCost }) =>
            service.putFixedCost(id, fixedCost).pipe(
              tapResponse({
                next: (result) =>
                  patchState(
                    store,
                    updateEntity({
                      id,
                      changes: result as FixedCostEntity,
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
      resetFixedCosts() {
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
