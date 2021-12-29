import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';
import { genericApiError } from './generic-actions';

@Injectable()
export class GenericApiEffects {
  public genericApiError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(genericApiError),
        map(({ error }) => {
          // Trigger error logging here
          console.log('NOOOOO', error);
        })
      ),
    { dispatch: false }
  );

  constructor(private readonly actions$: Actions) {}
}
