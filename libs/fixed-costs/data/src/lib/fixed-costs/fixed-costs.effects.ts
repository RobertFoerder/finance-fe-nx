import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { FixedCostsService } from '@finance-fe-nx/finance-api';

import * as FixedCostsActions from './fixed-costs.actions';
import { map, switchMap, catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { serializeErrorResponse } from '@finance-fe-nx/core';

@Injectable()
export class FixedCostsEffects {
  public readonly load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FixedCostsActions.load),
      switchMap(() =>
        this.service.getFixedCost().pipe(
          map((fixedCosts) =>
            FixedCostsActions.loadFixedCostsSuccess({ fixedCosts })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FixedCostsActions.loadFixedCostsFailure({
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
      ofType(FixedCostsActions.add),
      switchMap(({ fixedCost }) =>
        this.service.postFixedCost(fixedCost).pipe(
          map((fixedCost) =>
            FixedCostsActions.addFixedCostSuccess({ fixedCost })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FixedCostsActions.addFixedCostFailure({
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
      ofType(FixedCostsActions.deleteFixedCost),
      switchMap(({ id }) =>
        this.service.deleteFixedCost(id).pipe(
          map(() => FixedCostsActions.deleteFixedCostSuccess({ id })),
          catchError((error: HttpErrorResponse) =>
            of(
              FixedCostsActions.deleteFixedCostFailure({
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
      ofType(FixedCostsActions.editFixedCost),
      switchMap(({ id, fixedCost }) =>
        this.service.putFixedCost(id, fixedCost).pipe(
          map((fixedCost) =>
            FixedCostsActions.editFixedCostSuccess({ fixedCost })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              FixedCostsActions.editFixedCostFailure({
                error: serializeErrorResponse(error),
              })
            )
          )
        )
      )
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly service: FixedCostsService
  ) {}
}
