import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AccountsService } from '@finance-fe-nx/finance-api';
import { fetch } from '@nrwl/angular';

import * as AccountsActions from './accounts.actions';
import { map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { serializeErrorResponse } from '@finance-fe-nx/core';

@Injectable()
export class AccountsEffects {
  public readonly load$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.load),
      fetch({
        run: () =>
          this.service
            .getAccounts()
            .pipe(
              map((accounts) =>
                AccountsActions.loadAccountsSuccess({ accounts })
              )
            ),
        onError: (_, error: HttpErrorResponse) =>
          AccountsActions.loadAccountsFailure({
            error: serializeErrorResponse(error),
          }),
      })
    )
  );

  public readonly add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.add),
      fetch({
        run: ({ account }) =>
          this.service
            .postAccount(account)
            .pipe(
              map((account) => AccountsActions.addAccountSuccess({ account }))
            ),
        onError: (_, error: HttpErrorResponse) =>
          AccountsActions.addAccountFailure({
            error: serializeErrorResponse(error),
          }),
      })
    )
  );

  public readonly delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.deleteAccount),
      fetch({
        run: ({ id }) =>
          this.service
            .deleteAccount(id)
            .pipe(map(() => AccountsActions.deleteAccountSuccess({ id }))),
        onError: (_, error: HttpErrorResponse) =>
          AccountsActions.deleteAccountFailure({
            error: serializeErrorResponse(error),
          }),
      })
    )
  );

  public readonly edit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsActions.editAccount),
      fetch({
        run: ({ account }) =>
          this.service
            .putAccount(account.id, account)
            .pipe(
              map((account) => AccountsActions.editAccountSuccess({ account }))
            ),
        onError: (_, error: HttpErrorResponse) =>
          AccountsActions.editAccountFailure({
            error: serializeErrorResponse(error),
          }),
      })
    )
  );

  constructor(
    private readonly actions$: Actions,
    private readonly service: AccountsService
  ) {}
}
