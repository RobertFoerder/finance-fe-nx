import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EntriesService } from '@finance-fe-nx/finance-api';

import * as FinanceEntriesActions from './finance-entries.actions';
import { map, switchMap, catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { serializeErrorResponse } from '@finance-fe-nx/core';

@Injectable()
export class FinanceEntriesEffects {
  private readonly actions$ = inject(Actions);
  private readonly service = inject(EntriesService);

  public readonly load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceEntriesActions.load),
      switchMap(({ year }) =>
        this.service.getEntries(year).pipe(
          map((entries) =>
            FinanceEntriesActions.loadEntriesSuccess({ entries })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceEntriesActions.loadEntriesFailure({
                error: serializeErrorResponse(error),
              })
            )
          )
        )
      )
    )
  );

  public readonly add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceEntriesActions.add),
      switchMap(({ entry }) =>
        this.service.postEntry(entry).pipe(
          map((entry) => FinanceEntriesActions.addEntrySuccess({ entry })),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceEntriesActions.addEntryFailure({
                error: serializeErrorResponse(error),
              })
            )
          )
        )
      )
    )
  );

  public readonly delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceEntriesActions.deleteEntry),
      switchMap(({ id }) =>
        this.service.deleteEntry(id).pipe(
          map(() => FinanceEntriesActions.deleteEntrySuccess({ id })),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceEntriesActions.deleteEntryFailure({
                error: serializeErrorResponse(error),
              })
            )
          )
        )
      )
    )
  );

  public readonly edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceEntriesActions.editEntry),
      switchMap(({ id, entry }) =>
        this.service.putEntry(id, entry).pipe(
          map((entry) => FinanceEntriesActions.editEntrySuccess({ entry })),
          catchError((error: HttpErrorResponse) =>
            of(
              FinanceEntriesActions.editEntryFailure({
                error: serializeErrorResponse(error),
              })
            )
          )
        )
      )
    )
  );

  public readonly loadEntriesOnYearChanged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceEntriesActions.setSelectedYear),
      switchMap(({ year }) => of(FinanceEntriesActions.load({ year })))
    )
  );

  public readonly setSelectedMonthOnYearChanged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceEntriesActions.setSelectedYear),
      switchMap(({ year }) => {
        let selectedMonth = 11;
        const currentDate = new Date();
        if (year === currentDate.getFullYear()) {
          selectedMonth = currentDate.getMonth();
        }
        return of(
          FinanceEntriesActions.setSelectedMonth({
            month: selectedMonth,
          })
        );
      })
    )
  );
}
