import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  FINANCE_ENTRIES_FEATURE_KEY,
  reducer,
  FinanceEntriesEffects,
  FinanceEntriesFacade,
} from '@finance-fe-nx/summary/data';
import { SummaryComponent } from './summary/summary.component';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { EditEntryComponent } from './edit-entry/edit-entry.component';

export const SUMMARY_ROUTES: Routes = [
  {
    path: '',
    providers: [
      provideState(FINANCE_ENTRIES_FEATURE_KEY, reducer),
      provideEffects(FinanceEntriesEffects),
      FinanceEntriesFacade,
    ],
    children: [
      { path: '', component: SummaryComponent },
      { path: 'add', component: AddEntryComponent },
      { path: 'edit/:entryId', component: EditEntryComponent },
    ],
  },
];
