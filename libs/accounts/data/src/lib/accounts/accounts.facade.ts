import { Injectable } from '@angular/core';
import { Account } from '@finance-fe-nx/finance-api';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs';
import * as AccountsActions from './accounts.actions';
import * as AccountsSelectors from './accounts.selectors';

@Injectable()
export class AccountsFacade {
  public readonly loading$ = this.store.pipe(
    select(AccountsSelectors.getAccountsLoading)
  );
  public readonly loaded$ = this.store.pipe(
    select(AccountsSelectors.getAccountsLoaded)
  );
  public readonly collection$ = this.store.pipe(
    select(AccountsSelectors.getAccounts)
  );
  public readonly entities$ = this.store.pipe(
    select(AccountsSelectors.getAccountsEntities)
  );
  public readonly loadError$ = this.store.pipe(
    select(AccountsSelectors.getAccountsLoadError)
  );
  public readonly deleting$ = this.store.pipe(
    select(AccountsSelectors.getAccountsDeleting)
  );
  public readonly deleteError$ = this.store.pipe(
    select(AccountsSelectors.getAccountsDeleteError)
  );
  public readonly adding$ = this.store.pipe(
    select(AccountsSelectors.getAccountsAdding)
  );
  public readonly added$ = this.store.pipe(
    select(AccountsSelectors.getAccountsAdded)
  );
  public readonly addError$ = this.store.pipe(
    select(AccountsSelectors.getAccountsAddError)
  );
  public readonly editing$ = this.store.pipe(
    select(AccountsSelectors.getAccountsEditing)
  );
  public readonly edited$ = this.store.pipe(
    select(AccountsSelectors.getAccountsEdited)
  );
  public readonly editError$ = this.store.pipe(
    select(AccountsSelectors.getAccountsEditError)
  );

  constructor(private readonly store: Store) {}

  public init(): void {
    this.loaded$.pipe(take(1)).subscribe((loaded) => {
      if (!loaded) {
        this.store.dispatch(AccountsActions.load());
      }
    });
  }

  public resetAccounts(): void {
    this.store.dispatch(AccountsActions.resetAccounts());
  }

  public resetAdd(): void {
    this.store.dispatch(AccountsActions.resetAdd());
  }

  public resetDelete(): void {
    this.store.dispatch(AccountsActions.resetDelete());
  }

  public resetEdit(): void {
    this.store.dispatch(AccountsActions.resetEdit());
  }

  public addAccount(account: Account): void {
    this.store.dispatch(AccountsActions.add({ account }));
  }

  public editAccount(account: Account): void {
    if (account.id) {
      this.store.dispatch(
        AccountsActions.editAccount({ id: account.id, account })
      );
    }
  }

  public deleteAccount(id: string | undefined): void {
    if (id) {
      this.store.dispatch(AccountsActions.deleteAccount({ id }));
    }
  }
}
