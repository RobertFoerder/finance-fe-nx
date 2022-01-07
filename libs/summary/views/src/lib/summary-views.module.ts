import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';
import { SummaryModule } from './summary/summary.module';
import { SummaryDataModule } from '@finance-fe-nx/summary/data';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { AddEntryModule } from './add-entry/add-entry.module';

export const ROUTES: Routes = [
  { path: '', component: SummaryComponent },
  { path: 'add', component: AddEntryComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SummaryModule,
    AddEntryModule,
    SummaryDataModule,
  ],
})
export class SummaryViewsModule {}
