import { createAction, props } from '@ngrx/store';
import { SerializedError } from './serialize-error-response';

export const genericApiError = createAction(
  '[Generic/API] Request failure',
  props<{ error: SerializedError }>()
);
