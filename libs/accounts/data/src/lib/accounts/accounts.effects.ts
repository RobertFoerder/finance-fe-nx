import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountsService } from '@finance-fe-nx/finance-api';

import * as AccountsActions from './accounts.actions';
import { map, switchMap, catchError, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { serializeErrorResponse } from '@finance-fe-nx/core';

@Injectable()
export class AccountsEffects {
  private readonly actions$ = inject(Actions);
  private readonly service = inject(AccountsService);

  public readonly load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.load),
      switchMap(() =>
        this.service.getAccounts().pipe(
          map((accounts) =>
            AccountsActions.loadAccountsSuccess({ accounts })
          ),
          catchError((error: HttpErrorResponse) =>
            of(
              AccountsActions.loadAccountsFailure({
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
      ofType(AccountsActions.add),
      switchMap(({ account }) =>
        this.service.postAccount(account).pipe(
          map((account) => AccountsActions.addAccountSuccess({ account })),
          catchError((error: HttpErrorResponse) =>
            of(
              AccountsActions.addAccountFailure({
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
      ofType(AccountsActions.deleteAccount),
      switchMap(({ id }) =>
        this.service.deleteAccount(id).pipe(
          map(() => AccountsActions.deleteAccountSuccess({ id })),
          catchError((error: HttpErrorResponse) =>
            of(
              AccountsActions.deleteAccountFailure({
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
      ofType(AccountsActions.editAccount),
      switchMap(({ id, account }) =>
        this.service.putAccount(id, account).pipe(
          map((account) => AccountsActions.editAccountSuccess({ account })),
          catchError((error: HttpErrorResponse) =>
            of(
              AccountsActions.editAccountFailure({
                error: serializeErrorResponse(error),
              })
            )
          )
        )
      )
    )
  );
}
