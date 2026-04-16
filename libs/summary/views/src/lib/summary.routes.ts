import { Routes } from '@angular/router';
import { FinanceEntriesStore } from '@finance-fe-nx/summary/data';
import { SummaryComponent } from './summary/summary.component';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { EditEntryComponent } from './edit-entry/edit-entry.component';

export const SUMMARY_ROUTES: Routes = [
  {
    path: '',
    providers: [FinanceEntriesStore],
    children: [
      { path: '', component: SummaryComponent },
      { path: 'add', component: AddEntryComponent },
      { path: 'edit/:entryId', component: EditEntryComponent },
    ],
  },
];
