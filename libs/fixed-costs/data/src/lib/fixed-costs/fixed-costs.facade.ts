import { Injectable } from '@angular/core';
import { FixedCost } from '@finance-fe-nx/finance-api';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs';
import * as FixedCostsActions from './fixed-costs.actions';
import * as FixedCostsSelectors from './fixed-costs.selectors';

@Injectable()
export class FixedCostsFacade {
  public readonly loading$ = this.store.pipe(
    select(FixedCostsSelectors.getFixedCostsLoading)
  );
  public readonly loaded$ = this.store.pipe(
    select(FixedCostsSelectors.getFixedCostsLoaded)
  );
  public readonly collection$ = this.store.pipe(
    select(FixedCostsSelectors.getFixedCosts)
  );
  public readonly entities$ = this.store.pipe(
    select(FixedCostsSelectors.getFixedCostsEntities)
  );
  public readonly loadError$ = this.store.pipe(
    select(FixedCostsSelectors.getFixedCostsLoadError)
  );
  public readonly deleting$ = this.store.pipe(
    select(FixedCostsSelectors.getFixedCostsDeleting)
  );
  public readonly deleteError$ = this.store.pipe(
    select(FixedCostsSelectors.getFixedCostsDeleteError)
  );
  public readonly adding$ = this.store.pipe(
    select(FixedCostsSelectors.getFixedCostsAdding)
  );
  public readonly added$ = this.store.pipe(
    select(FixedCostsSelectors.getFixedCostsAdded)
  );
  public readonly addError$ = this.store.pipe(
    select(FixedCostsSelectors.getFixedCostsAddError)
  );
  public readonly editing$ = this.store.pipe(
    select(FixedCostsSelectors.getFixedCostsEditing)
  );
  public readonly edited$ = this.store.pipe(
    select(FixedCostsSelectors.getFixedCostsEdited)
  );
  public readonly editError$ = this.store.pipe(
    select(FixedCostsSelectors.getFixedCostsEditError)
  );

  constructor(private readonly store: Store) {}

  public init(): void {
    this.loaded$.pipe(take(1)).subscribe((loaded) => {
      if (!loaded) {
        this.store.dispatch(FixedCostsActions.load());
      }
    });
  }

  public resetFixedCosts(): void {
    this.store.dispatch(FixedCostsActions.resetFixedCosts());
  }

  public resetAdd(): void {
    this.store.dispatch(FixedCostsActions.resetAdd());
  }

  public resetDelete(): void {
    this.store.dispatch(FixedCostsActions.resetDelete());
  }

  public resetEdit(): void {
    this.store.dispatch(FixedCostsActions.resetEdit());
  }

  public addFixedCost(fixedCost: FixedCost): void {
    this.store.dispatch(FixedCostsActions.add({ fixedCost }));
  }

  public editFixedCost(fixedCost: FixedCost): void {
    if (fixedCost.id) {
      this.store.dispatch(
        FixedCostsActions.editFixedCost({ id: fixedCost.id, fixedCost })
      );
    }
  }

  public deleteFixedCost(id: string | undefined): void {
    if (id) {
      this.store.dispatch(FixedCostsActions.deleteFixedCost({ id }));
    }
  }
}
