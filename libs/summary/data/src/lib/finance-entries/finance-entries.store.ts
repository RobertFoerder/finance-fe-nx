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
import { EntriesService, FinanceEntry } from '@finance-fe-nx/finance-api';
import { SumUpService } from '@finance-fe-nx/shared';
import { FinanceEntryEntity } from './finance-entries.models';

type FinanceEntriesState = {
  readRequestStatus: RequestStatus;
  addRequestStatus: RequestStatus;
  deleteRequestStatus: RequestStatus;
  editRequestStatus: RequestStatus;
  selectedYear: number;
  selectedMonth: number | undefined;
  _loadError: SerializedError | undefined;
  _addError: SerializedError | undefined;
  _deleteError: SerializedError | undefined;
  _editError: SerializedError | undefined;
};

const initialState: FinanceEntriesState = {
  readRequestStatus: 'initial',
  addRequestStatus: 'initial',
  deleteRequestStatus: 'initial',
  editRequestStatus: 'initial',
  selectedYear: new Date().getFullYear(),
  selectedMonth: new Date().getMonth(),
  _loadError: undefined,
  _addError: undefined,
  _deleteError: undefined,
  _editError: undefined,
};

export const FinanceEntriesStore = signalStore(
  withState(initialState),
  withEntities<FinanceEntryEntity>(),
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
      total: computed(() => sumUp.financeEntries(store.entities())),
    };
  }),
  withMethods((store) => {
    const service = inject(EntriesService);

    return {
      load: rxMethod<number>(
        pipe(
          tap(() =>
            patchState(store, {
              readRequestStatus: 'pending',
              _loadError: undefined,
            }),
          ),
          switchMap((year) =>
            service.getEntries(year).pipe(
              tapResponse({
                next: (entries) =>
                  patchState(
                    store,
                    setAllEntities(entries as FinanceEntryEntity[]),
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
      addEntry: rxMethod<FinanceEntry>(
        pipe(
          tap(() =>
            patchState(store, {
              addRequestStatus: 'pending',
              _addError: undefined,
            }),
          ),
          switchMap((entry) =>
            service.postEntry(entry).pipe(
              tapResponse({
                next: (result) =>
                  patchState(store, addEntity(result as FinanceEntryEntity), {
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
      deleteEntry: rxMethod<string>(
        pipe(
          tap(() =>
            patchState(store, {
              deleteRequestStatus: 'pending',
              _deleteError: undefined,
            }),
          ),
          switchMap((id) =>
            service.deleteEntry(id).pipe(
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
      editEntry: rxMethod<{ id: string; entry: FinanceEntry }>(
        pipe(
          tap(() =>
            patchState(store, {
              editRequestStatus: 'pending',
              _editError: undefined,
            }),
          ),
          switchMap(({ id, entry }) =>
            service.putEntry(id, entry).pipe(
              tapResponse({
                next: (result) =>
                  patchState(
                    store,
                    updateEntity({
                      id,
                      changes: result as FinanceEntryEntity,
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
      setSelectedMonth(month: number | undefined) {
        patchState(store, { selectedMonth: month });
      },
      resetEntries() {
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
    setSelectedYear(year: number) {
      let selectedMonth = 11;
      const currentDate = new Date();
      if (year === currentDate.getFullYear()) {
        selectedMonth = currentDate.getMonth();
      }
      patchState(store, { selectedYear: year, selectedMonth });
      store.load(year);
    },
    init() {
      if (!store.loaded()) {
        store.load(store.selectedYear());
      }
    },
  })),
);
