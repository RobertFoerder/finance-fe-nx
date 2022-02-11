import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FixedCostsService } from '@finance-fe-nx/finance-api';

import { fetch } from '@nrwl/angular';

import * as FixedCostsActions from './fixed-costs.actions';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { serializeErrorResponse } from '@finance-fe-nx/core';

@Injectable()
export class FixedCostsEffects {
  public readonly load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FixedCostsActions.load),
      fetch({
        run: () =>
          this.service
            .getFixedCost()
            .pipe(
              map((fixedCosts) =>
                FixedCostsActions.loadFixedCostsSuccess({ fixedCosts })
              )
            ),
        onError: (_, error: HttpErrorResponse) =>
          FixedCostsActions.loadFixedCostsFailure({
            error: serializeErrorResponse(error),
          }),
      })
    )
  );

  public readonly add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FixedCostsActions.add),
      fetch({
        run: ({ fixedCost }) =>
          this.service
            .postFixedCost(fixedCost)
            .pipe(
              map((fixedCost) =>
                FixedCostsActions.addFixedCostSuccess({ fixedCost })
              )
            ),
        onError: (_, error: HttpErrorResponse) =>
          FixedCostsActions.addFixedCostFailure({
            error: serializeErrorResponse(error),
          }),
      })
    )
  );

  public readonly delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FixedCostsActions.deleteFixedCost),
      fetch({
        run: ({ id }) =>
          this.service
            .deleteFixedCost(id)
            .pipe(map(() => FixedCostsActions.deleteFixedCostSuccess({ id }))),
        onError: (_, error: HttpErrorResponse) =>
          FixedCostsActions.deleteFixedCostFailure({
            error: serializeErrorResponse(error),
          }),
      })
    )
  );

  public readonly edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FixedCostsActions.editFixedCost),
      fetch({
        run: ({ id, fixedCost }) =>
          this.service
            .putFixedCost(id, fixedCost)
            .pipe(
              map((fixedCost) =>
                FixedCostsActions.editFixedCostSuccess({ fixedCost })
              )
            ),
        onError: (_, error: HttpErrorResponse) =>
          FixedCostsActions.editFixedCostFailure({
            error: serializeErrorResponse(error),
          }),
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly service: FixedCostsService
  ) {}
}
