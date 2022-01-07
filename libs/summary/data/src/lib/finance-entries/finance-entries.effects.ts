import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EntriesService } from '@finance-fe-nx/finance-api';
import { fetch } from '@nrwl/angular';

import * as FinanceEntriesActions from './finance-entries.actions';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { serializeErrorResponse } from '@finance-fe-nx/core';

@Injectable()
export class FinanceEntriesEffects {
  public readonly load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceEntriesActions.load),
      fetch({
        run: ({ year }) =>
          this.service
            .getEntries(year)
            .pipe(
              map((entries) =>
                FinanceEntriesActions.loadEntriesSuccess({ entries })
              )
            ),
        onError: (_, error: HttpErrorResponse) =>
          FinanceEntriesActions.loadEntriesFailure({
            error: serializeErrorResponse(error),
          }),
      })
    )
  );

  public readonly add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FinanceEntriesActions.add),
      fetch({
        run: ({ entry }) =>
          this.service
            .postEntry(entry)
            .pipe(
              map((entry) => FinanceEntriesActions.addEntrySuccess({ entry }))
            ),
        onError: (_, error: HttpErrorResponse) =>
          FinanceEntriesActions.addEntryFailure({
            error: serializeErrorResponse(error),
          }),
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly service: EntriesService
  ) {}
}
